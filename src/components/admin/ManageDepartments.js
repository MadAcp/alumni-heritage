import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import departmentService from '../../services/departmentService';
// We'll assume you have an AuthContext that provides the current user's info
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
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }

  &.delete {
    background-color: #dc2626;
    &:hover {
      background-color: #b91c1c;
    }
  }
`;

const DepartmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const CardSubtitle = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 1rem;
`;

const CourseList = styled.ul`
  list-style-type: disc;
  padding-left: 1.25rem;
  color: #475569;
  flex-grow: 1;
  margin-bottom: 1.5rem;
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
`;

function ManageDepartments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // const { user } = useAuth(); // Assuming user.role is available
  const user = { role: 'admin' }; // Placeholder for admin user

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const response = await departmentService.getAllDepartments();
        if (response.success) {
          setDepartments(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError('Failed to fetch departments.');
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      const response = await departmentService.deleteDepartment(user.role, id);
      if (response.success) {
        setDepartments(departments.filter(d => d.id !== id));
      } else {
        alert(`Error: ${response.message}`);
      }
    }
  };

  return (
    <PageContainer>
      <HeaderContainer>
        <Title>Manage Departments</Title>
        <Button onClick={() => navigate('/admin/department/new')}>Add New Department</Button>
      </HeaderContainer>

      {loading && <p>Loading departments...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <DepartmentGrid>
        {departments.map((dept) => (
          <Card key={dept.id}>
            <CardTitle>{dept.departmentName}</CardTitle>
            <CardSubtitle>ID: {dept.id}</CardSubtitle>
            <CourseList>
              {dept.courses.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </CourseList>
            <CardActions>
              <Button onClick={() => navigate(`/admin/department/${dept.id}`)}>Update</Button>
              <Button className="delete" onClick={() => handleDelete(dept.id)}>Delete</Button>
            </CardActions>
          </Card>
        ))}
      </DepartmentGrid>
    </PageContainer>
  );
}

export default ManageDepartments;
