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

function ManageEvents() {
  return (
    <PageContainer>
      <Title>Manage Events</Title>
      <p>This is where you will create, edit, and manage alumni events. (Coming Soon)</p>
    </PageContainer>
  );
}

export default ManageEvents;