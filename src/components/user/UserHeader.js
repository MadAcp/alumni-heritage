import React, { useState, useEffect } from 'react';
import { Link, NavLink as RouterNavLink, useNavigate } from 'react-router-dom';
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

const MenuContainer = styled.div`
  /* Mobile: Slide-in Drawer */
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;
  background: white;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 280px;
  padding: 6rem 2rem 2rem;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease-in-out;
  z-index: 100;

  /* Desktop styles */
  @media (min-width: 768px) {
    position: static;
    flex-direction: row;
    align-items: center;
    gap: 2rem;
    height: auto;
    width: auto;
    background: none;
    box-shadow: none;
    padding: 0;
    transform: none;
  }
`;

const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  /* Add separator for mobile view */
  border-top: 1px solid #e2e8f0;
  padding-top: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 2rem;
    width: auto;
    border-top: none;
    padding-top: 0;
    order: 1; /* Ensure navigation comes first on desktop */
  }
`;

const NavLink = styled(RouterNavLink)`
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
  /* Mobile: Stack items vertically */
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  width: 100%;

  @media (min-width: 768px) {
    /* Desktop: Align items horizontally */
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    width: auto;
    order: 2; /* Ensure user section comes after navigation on desktop */
  }
`;

const UserInfo = styled.div`
  /* Mobile: Align text to the left */
  text-align: left;
  
  .user-name {
    color: #1e293b;
    font-weight: 600;
    font-size: 0.9rem;
  }
  
  .user-role {
    color: #64748b;
    font-size: 0.8rem;
  }

  /* Desktop: Align text to the right */
  @media (min-width: 768px) {
    text-align: right;
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

const HamburgerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 110;
  color: #1e293b; /* Dark color for white background */

  @media (min-width: 768px) {
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

  @media (min-width: 768px) {
    display: none;
  }
`;

function UserHeader() {
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
    navigate('/');
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          Alumni Heritage
        </Logo>

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
          {/* User info is now the first item in the mobile menu */}
          <UserSection>
            <UserInfo>
              <div className="user-name">
                {currentUser?.profile?.personalInfo?.firstName} {currentUser?.profile?.personalInfo?.lastName}
              </div>
              <div className="user-role">
                {currentUser?.profile?.alumniActivities?.membershipLevel}
              </div>
            </UserInfo>
            
            <LogoutButton onClick={() => { handleLogout(); closeMenu(); }}>
              Logout
            </LogoutButton>
          </UserSection>

          {/* Navigation links appear after user info */}
          <Navigation>
            <NavLink to="/user-dashboard" onClick={closeMenu}>Dashboard</NavLink>
            <NavLink to="/profile" onClick={closeMenu}>Profile</NavLink>
          </Navigation>
        </MenuContainer>
        <Overlay isOpen={isMenuOpen} onClick={closeMenu} />
      </HeaderContent>
    </HeaderContainer>
  );
}

export default UserHeader;
