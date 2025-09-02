import React, { useState, useEffect } from 'react';
import { Link, NavLink as RouterNavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const HeaderContainer = styled.header`
  background: #1e293b; /* A darker, more "admin" feel */
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 2rem;
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

const MenuContainer = styled.div`
  /* Mobile: Slide-in Drawer */
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;
  background: #1e293b;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 280px;
  padding: 6rem 2rem 2rem;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease-in-out;
  z-index: 100;

  /* Desktop styles */
  @media (min-width: 992px) { /* Using a wider breakpoint for admin panel */
    position: static;
    flex-direction: row;
    align-items: center;
    gap: 1.5rem;
    height: auto;
    width: auto;
    background: none;
    box-shadow: none;
    padding: 0;
    transform: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  @media (min-width: 992px) {
    flex-direction: row;
    align-items: center;
    gap: 1.5rem;
    width: auto;
  }
`;

const NavLink = styled(RouterNavLink)`
  color: #cbd5e1;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.2s;

  &:hover {
    color: white;
  }

  &.active {
    color: white;
  }

  &.active::after,
  &:hover::after {
    width: 100%;
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
`;

const UserMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  width: 100%;
  border-top: 1px solid #334155;
  padding-top: 2rem;

  @media (min-width: 992px) {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    width: auto;
    border-top: none;
    padding-top: 0;
  }
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

const HamburgerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 110;
  color: white;

  @media (min-width: 992px) {
    display: none;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
  opacity: ${props => props.isOpen ? '1' : '0'};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;

  @media (min-width: 992px) {
    display: none;
  }
`;

function AdminHeader() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    closeMenu();
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/admin-dashboard">Admin<span>Panel</span></Logo>

        <HamburgerButton
          onClick={() => setIsMenuOpen(prev => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          )}
        </HamburgerButton>

        <MenuContainer isOpen={isMenuOpen}>
          <Nav>
            <NavLink to="/admin-dashboard" onClick={closeMenu}>Dashboard</NavLink>
            <NavLink to="/admin/users" onClick={closeMenu}>Manage Users</NavLink>
            <NavLink to="/admin/events" onClick={closeMenu}>Manage Events</NavLink>
            <NavLink to="/admin/settings" onClick={closeMenu}>Settings</NavLink>
          </Nav>
          <UserMenu>
            <WelcomeText>
              Welcome, {currentUser?.profile?.personalInfo?.firstName || 'Admin'}
            </WelcomeText>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </UserMenu>
        </MenuContainer>

        <Overlay isOpen={isMenuOpen} onClick={closeMenu} />
      </HeaderContent>
    </HeaderContainer>
  );
}

export default AdminHeader;
