import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.9;
  }
`;

const Navigation = styled.nav`
  /* Mobile: Slide-in Drawer */
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;
  background: linear-gradient(150deg, #6066d8 0%, #6b4092 100%);
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
  @media (min-width: 768px) {
    position: static;
    flex-direction: row;
    gap: 1rem;
    width: auto;
    background: none;
    box-shadow: none;
    padding: 0;
    height: auto;
    transform: none;
  }
`;

const NavButton = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: 500;
  padding: 0.6rem 1.5rem;
  border-radius: 50px;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  font-size: 0.9rem;

  &.signin {
    background: white;
    color: #764ba2;
    &:hover {
      background: #f1f5f9;
      transform: translateY(-1px);
    }
  }

  &.signup {
    border: 2px solid white;
    &:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-1px);
    }
  }
`;

const HamburgerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 110; /* Must be higher than the navigation drawer */
  color: white;

  /* Hide on desktop */
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
  z-index: 99; /* Below the nav, above the content */
  opacity: ${props => props.isOpen ? '1' : '0'};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;

  @media (min-width: 768px) {
    display: none;
  }
`;

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Effect to lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup function to reset style if component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">Alumni Heritage</Logo>
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
        <Navigation isOpen={isMenuOpen}>
          <NavButton to="/login" className="signin" onClick={closeMenu}>Sign In</NavButton>
          <NavButton to="/signup" className="signup" onClick={closeMenu}>Sign Up</NavButton>
        </Navigation>
        <Overlay isOpen={isMenuOpen} onClick={closeMenu} />
      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header;