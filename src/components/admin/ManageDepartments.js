import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
`;

function ManageDepartments() {
  return (
    <PageContainer>
      <Title>Manage Departments</Title>
      <p>This is where you will manage all Departments. (Coming Soon)</p>
    </PageContainer>
  );
}

export default ManageDepartments;
