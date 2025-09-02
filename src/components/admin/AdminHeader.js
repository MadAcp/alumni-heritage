import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const HeaderContainer = styled.header`
  background: #1e293b; /* A darker, more "admin" feel */
  color: white;
  padding: 0 2rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  
  span {
    color: #93c5fd; /* A light blue accent */
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  color: #cbd5e1;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.2s;

  &:hover {
    color: white;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #93c5fd;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const WelcomeText = styled.span`
  color: #e2e8f0;
`;

const LogoutButton = styled.button`
  background: #ef4444; /* Red for logout */
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #dc2626;
  }
`;

function AdminHeader() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <HeaderContainer>
      <Logo to="/admin-dashboard">Admin<span>Panel</span></Logo>
      <Nav>
        <NavLink to="/admin-dashboard">Dashboard</NavLink>
        <NavLink to="/admin/users">Manage Users</NavLink>
        <NavLink to="/admin/events">Manage Events</NavLink>
        <NavLink to="/admin/settings">Settings</NavLink>
      </Nav>
      <UserMenu>
        <WelcomeText>
          Welcome, {currentUser?.profile?.personalInfo?.firstName || 'Admin'}
        </WelcomeText>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </UserMenu>
    </HeaderContainer>
  );
}

export default AdminHeader;
