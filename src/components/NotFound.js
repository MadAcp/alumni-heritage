import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 64px); /* Full height minus header */
  text-align: center;
  background-color: #f8fafc;
`;

const ErrorCode = styled.h1`
  font-size: 6rem;
  font-weight: 900;
  color: #6366f1;
  margin: 0;
`;

const Message = styled.p`
  font-size: 1.5rem;
  color: #334155;
  margin: 1rem 0;
`;

const HomeLink = styled(Link)`
  background-color: #6366f1;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4f46e5;
  }
`;

function NotFound() {
  return (
    <NotFoundContainer>
      <ErrorCode>404</ErrorCode>
      <Message>Oops! The page you're looking for doesn't exist.</Message>
      <HomeLink to="/">Go Back Home</HomeLink>
    </NotFoundContainer>
  );
}

export default NotFound;