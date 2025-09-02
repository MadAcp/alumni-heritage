import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const WelcomeSection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  
  h1 {
    margin: 0 0 0.5rem 0;
    font-size: 2rem;
    font-weight: 700;
  }
  
  p {
    margin: 0;
    opacity: 0.9;
    font-size: 1.1rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  
  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 0.5rem;
  }
  
  .stat-label {
    color: #64748b;
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

const QuickActions = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  margin-bottom: 2rem;
  
  h2 {
    margin: 0 0 1rem 0;
    color: #1e293b;
    font-size: 1.25rem;
  }
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const ActionButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  text-decoration: none;
  color: #374151;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background: #eff6ff;
    border-color: #667eea;
    color: #667eea;
    transform: translateY(-1px);
  }
`;

const RecentActivity = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  
  h2 {
    margin: 0 0 1rem 0;
    color: #1e293b;
    font-size: 1.25rem;
  }
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 6px;
  
  .activity-icon {
    width: 40px;
    height: 40px;
    background: #667eea;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
    margin-right: 1rem;
  }
  
  .activity-content {
    flex: 1;
    
    .activity-title {
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 0.25rem;
    }
    
    .activity-date {
      color: #64748b;
      font-size: 0.875rem;
    }
  }
`;

function UserDashboard() {
  const { currentUser } = useAuth();
  const profile = currentUser?.profile;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <DashboardContainer>
      <WelcomeSection>
        <h1>Welcome back, {profile?.personalInfo?.firstName}!</h1>
        <p>Stay connected with your alma mater and fellow alumni</p>
      </WelcomeSection>

      <StatsGrid>
        <StatCard>
          <div className="stat-value">{profile?.academicInfo?.graduationYear}</div>
          <div className="stat-label">Graduation Year</div>
        </StatCard>
        
        <StatCard>
          <div className="stat-value">{profile?.professionalInfo?.yearsOfExperience}</div>
          <div className="stat-label">Years of Experience</div>
        </StatCard>
        
        <StatCard>
          <div className="stat-value">{profile?.alumniActivities?.donationHistory?.length || 0}</div>
          <div className="stat-label">Total Donations</div>
        </StatCard>
        
        <StatCard>
          <div className="stat-value">{profile?.alumniActivities?.volunteerWork?.length || 0}</div>
          <div className="stat-label">Volunteer Activities</div>
        </StatCard>
      </StatsGrid>

      <QuickActions>
        <h2>Quick Actions</h2>
        <ActionGrid>
          <ActionButton to="/profile">
            View Full Profile
          </ActionButton>
          <ActionButton to="/profile/edit">
            Update Information
          </ActionButton>
          <ActionButton to="/profile">
            View Achievements
          </ActionButton>
          <ActionButton to="/profile">
            Alumni Directory
          </ActionButton>
        </ActionGrid>
      </QuickActions>

      <RecentActivity>
        <h2>Recent Activity</h2>
        <ActivityList>
          {profile?.alumniActivities?.eventsAttended?.slice(0, 3).map((event, index) => (
            <ActivityItem key={index}>
              <div className="activity-icon">🎓</div>
              <div className="activity-content">
                <div className="activity-title">Attended {event}</div>
                <div className="activity-date">Recent</div>
              </div>
            </ActivityItem>
          ))}
          
          {profile?.alumniActivities?.donationHistory?.slice(0, 2).map((donation, index) => (
            <ActivityItem key={`donation-${index}`}>
              <div className="activity-icon">💝</div>
              <div className="activity-content">
                <div className="activity-title">Donated ${donation.amount} to {donation.purpose}</div>
                <div className="activity-date">{donation.year}</div>
              </div>
            </ActivityItem>
          ))}
        </ActivityList>
      </RecentActivity>
    </DashboardContainer>
  );
}

export default UserDashboard;
