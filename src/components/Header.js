import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.9;
  }
`;

const Navigation = styled.nav`
  display: flex;
  gap: 1rem;
  align-items: center;
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

function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">Alumni Heritage</Logo>
        <Navigation>
          <NavButton to="/login" className="signin">Sign In</NavButton>
          <NavButton to="/signup" className="signup">Sign Up</NavButton>
        </Navigation>
      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header;