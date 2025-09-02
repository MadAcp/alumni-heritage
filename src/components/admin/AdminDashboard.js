import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { FaUsers, FaRegNewspaper, FaDollarSign, FaChartBar } from 'react-icons/fa';

const DashboardContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const DashboardHeader = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
  }

  p {
    font-size: 1.1rem;
    color: #64748b;
    margin-top: 0.5rem;
  }
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 1.5rem;

  .icon-wrapper {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    color: white;
  }

  .content {
    .value {
      font-size: 2rem;
      font-weight: 700;
      color: #1e293b;
    }
    .label {
      font-size: 1rem;
      color: #64748b;
    }
  }
`;

const QuickLinksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const QuickLinkCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  
  h3 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: #1e293b;
  }

  p {
    color: #64748b;
    margin-bottom: 1.5rem;
  }

  button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }
  }
`;

function AdminDashboard() {
  const { currentUser } = useAuth();

  const stats = [
    { label: 'Total Alumni', value: '1,254', icon: <FaUsers />, color: '#3b82f6' },
    { label: 'New Signups (30d)', value: '42', icon: <FaRegNewspaper />, color: '#10b981' },
    { label: 'Total Donations', value: '$84,320', icon: <FaDollarSign />, color: '#f59e0b' },
    { label: 'Events Hosted', value: '12', icon: <FaChartBar />, color: '#8b5cf6' },
  ];

  return (
    <DashboardContainer>
      <DashboardHeader>
        <h1>Admin Dashboard</h1>
        <p>Welcome back, {currentUser?.profile?.personalInfo?.firstName}. Here's a summary of the platform.</p>
      </DashboardHeader>

      <StatGrid>
        {stats.map((stat, index) => (
          <StatCard key={index}>
            <div className="icon-wrapper" style={{ backgroundColor: stat.color }}>
              {stat.icon}
            </div>
            <div className="content">
              <div className="value">{stat.value}</div>
              <div className="label">{stat.label}</div>
            </div>
          </StatCard>
        ))}
      </StatGrid>

      <QuickLinksGrid>
        <QuickLinkCard>
          <h3>Manage Users</h3>
          <p>View, edit, or remove alumni profiles from the system.</p>
          <button>Go to User Management</button>
        </QuickLinkCard>
        <QuickLinkCard>
          <h3>Content Moderation</h3>
          <p>Review and approve user-generated content like posts and comments.</p>
          <button>Review Content</button>
        </QuickLinkCard>
        <QuickLinkCard>
          <h3>Analytics & Reports</h3>
          <p>Generate reports on user engagement, donations, and site traffic.</p>
          <button>View Analytics</button>
        </QuickLinkCard>
      </QuickLinksGrid>
    </DashboardContainer>
  );
}

export default AdminDashboard;
