import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import firebaseService from '../../services/firebaseService';
// import { useAuth } from '../../context/AuthContext';

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
`;

const FilterContainer = styled.div`
  margin-bottom: 2rem;
`;

const FilterLabel = styled.label`
  font-weight: 600;
  color: #475569;
  margin-right: 0.5rem;
`;

const FilterSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
`;

const ActionButton = styled.button`
  padding: 0.25rem 0.5rem;
  margin-right: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;

  &.approve { background-color: #22c55e; }
  &.reject { background-color: #ef4444; }
  &.suspend { background-color: #f97316; }
  &.reactivate { background-color: #3b82f6; }

  &:hover {
    opacity: 0.9;
  }
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.6rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: capitalize;

  ${({ status }) => {
    switch (status) {
      case 'active':
        return `
          background-color: #dcfce7;
          color: #166534;
        `;
      case 'pending':
        return `
          background-color: #fef9c3;
          color: #854d0e;
        `;
      case 'suspended':
        return `
          background-color: #fee2e2;
          color: #991b1b;
        `;
      case 'rejected':
        return `
          background-color: #e5e7eb;
          color: #4b5563;
        `;
      default:
        return '';
    }
  }}
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 1.5fr;
  gap: 1rem;
  padding: 0 1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #475569;

  @media (max-width: 992px) {
    display: none;
  }
`;

const UserRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 1.5fr;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);

  @media (max-width: 992px) {
    grid-template-columns: 1fr 1fr;
    gap: 1rem 2rem;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const UserInfoCell = styled.div`
  & > p {
    font-size: 0.875rem;
    color: #64748b;
  }
`;

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // const { user: adminUser } = useAuth(); // Use your actual auth context
  const adminUser = { role: 'admin' }; // Placeholder for admin user

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await firebaseService.getAllFirebaseUsers();
        if (response.success) {
          setUsers(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError('Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (filterStatus === 'all') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter(user => user.status === filterStatus));
    }
  }, [users, filterStatus]);

  const handleStatusChange = async (userId, newStatus) => {
    const response = await firebaseService.updateUserStatus(adminUser.role, userId, newStatus);
    if (response.success) {
      // Update the user's status in the local state for an immediate UI update
      setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
    } else {
      alert(`Error: ${response.message}`);
    }
  };

  const renderActions = (user) => {
    switch (user.status) {
      case 'pending':
        return (
          <>
            <ActionButton className="approve" onClick={() => handleStatusChange(user.id, 'active')}>Approve</ActionButton>
            <ActionButton className="reject" onClick={() => handleStatusChange(user.id, 'rejected')}>Reject</ActionButton>
          </>
        );
      case 'active':
        // Prevent admin from suspending themselves
        if (user.role === 'admin') return 'N/A';
        return <ActionButton className="suspend" onClick={() => handleStatusChange(user.id, 'suspended')}>Suspend</ActionButton>;
      case 'suspended':
        return <ActionButton className="reactivate" onClick={() => handleStatusChange(user.id, 'active')}>Re-activate</ActionButton>;
      default:
        return 'N/A';
    }
  };

  if (loading) return <PageContainer><p>Loading users...</p></PageContainer>;
  if (error) return <PageContainer><p style={{ color: 'red' }}>{error}</p></PageContainer>;

  return (
    <PageContainer>
      <HeaderContainer>
        <Title>Manage Users</Title>
      </HeaderContainer>

      <FilterContainer>
        <FilterLabel htmlFor="status-filter">Filter by status:</FilterLabel>
        <FilterSelect id="status-filter" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="rejected">Rejected</option>
        </FilterSelect>
      </FilterContainer>

      <UserList>
        <ListHeader>
          <div>Name / Email</div>
          <div>Department</div>
          <div>Start Year</div>
          <div>Status</div>
          <div>Actions</div>
        </ListHeader>
        {filteredUsers.map(user => (
          <UserRow key={user.id}>
            <UserInfoCell>
              <strong>{`${user.profile.personalInfo.firstName} ${user.profile.personalInfo.lastName}`}</strong>
              <p>{user.email}</p>
            </UserInfoCell>
            <div>{user.departmentName}</div>
            <div>{user.startYear}</div>
            <div>
              <StatusBadge status={user.status}>{user.status}</StatusBadge>
            </div>
            <div>{renderActions(user)}</div>
          </UserRow>
        ))}
      </UserList>
    </PageContainer>
  );
}

export default ManageUsers;