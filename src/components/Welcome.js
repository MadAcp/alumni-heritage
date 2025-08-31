import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 2rem;
`;

const ContentWrapper = styled.div`
  animation: ${fadeIn} 1s ease-out;
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
`;

const ActionButton = styled.button`
  background: white;
  color: #764ba2;
  border: none;
  padding: 0.875rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
  }
`;

function Welcome() {
  const navigate = useNavigate();

  return (
    <WelcomeContainer>
      <ContentWrapper>
        <Title>Welcome to Alumni Heritage</Title>
        <Subtitle>Reconnect with your past, engage with your present, and inspire the future.</Subtitle>
        {/* <ButtonContainer>
          <ActionButton onClick={() => navigate('/login')}>Sign In</ActionButton>
          <ActionButton onClick={() => navigate('/signup')} style={{background: 'transparent', border: '2px solid white', color: 'white'}}>Sign Up</ActionButton>
        </ButtonContainer> */}
      </ContentWrapper>
    </WelcomeContainer>
  );
}

export default Welcome;