import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const HeaderContainer = styled.header`
  background: white;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
`;

const Logo = styled(Link)`
  text-decoration: none;
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 700;
  
  &:hover {
    color: #667eea;
  }
`;

const Navigation = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #64748b;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.2s;
  
  &:hover {
    color: #1e293b;
    background: #f1f5f9;
  }
  
  &.active {
    color: #667eea;
    background: #eff6ff;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserInfo = styled.div`
  text-align: right;
  
  .user-name {
    color: #1e293b;
    font-weight: 600;
    font-size: 0.9rem;
  }
  
  .user-role {
    color: #64748b;
    font-size: 0.8rem;
  }
`;

const LogoutButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background: #dc2626;
  }
`;

function UserHeader() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          Alumni Heritage
        </Logo>
        
        <Navigation>
          <NavLink to="/user-dashboard" className={window.location.pathname === '/user-dashboard' ? 'active' : ''}>
            Dashboard
          </NavLink>
          <NavLink to="/profile" className={window.location.pathname === '/profile' ? 'active' : ''}>
            Profile
          </NavLink>
        </Navigation>
        
        <UserSection>
          <UserInfo>
            <div className="user-name">
              {currentUser?.profile?.personalInfo?.firstName} {currentUser?.profile?.personalInfo?.lastName}
            </div>
            <div className="user-role">
              {currentUser?.profile?.alumniActivities?.membershipLevel}
            </div>
          </UserInfo>
          
          <LogoutButton onClick={handleLogout}>
            Logout
          </LogoutButton>
        </UserSection>
      </HeaderContent>
    </HeaderContainer>
  );
}

export default UserHeader;
