import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ProfileHeader = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  margin-bottom: 2rem;
  text-align: center;
`;

const ProfileAvatar = styled.div`
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
  font-size: 3rem;
  font-weight: 700;
`;

const ProfileName = styled.h1`
  margin: 0 0 0.5rem 0;
  color: #1e293b;
  font-size: 2.5rem;
  font-weight: 700;
`;

const ProfileTitle = styled.p`
  margin: 0 0 1rem 0;
  color: #64748b;
  font-size: 1.2rem;
`;

const ProfileMeta = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  
  .meta-item {
    text-align: center;
    
    .meta-label {
      color: #64748b;
      font-size: 0.875rem;
      margin-bottom: 0.25rem;
    }
    
    .meta-value {
      color: #1e293b;
      font-weight: 600;
      font-size: 1rem;
    }
  }
`;

const EditButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
`;

const ProfileSections = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
`;

const ProfileSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  
  h2 {
    margin: 0 0 1.5rem 0;
    color: #1e293b;
    font-size: 1.5rem;
    font-weight: 600;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 0.75rem;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const InfoItem = styled.div`
  .info-label {
    color: #64748b;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .info-value {
    color: #1e293b;
    font-size: 1rem;
    font-weight: 500;
  }
`;

const ListItem = styled.div`
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  border-left: 3px solid #667eea;
  
  .item-title {
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.25rem;
  }
  
  .item-description {
    color: #64748b;
    font-size: 0.875rem;
  }
`;

const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SkillTag = styled.span`
  background: #eff6ff;
  color: #1d4ed8;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid #dbeafe;
`;

const AchievementItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
  margin-bottom: 1rem;
  border-left: 4px solid #10b981;
  
  .achievement-icon {
    width: 40px;
    height: 40px;
    background: #10b981;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
    margin-right: 1rem;
  }
  
  .achievement-content {
    flex: 1;
    
    .achievement-title {
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 0.25rem;
    }
    
    .achievement-year {
      color: #64748b;
      font-size: 0.875rem;
    }
  }
`;

function Profile() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const profile = currentUser?.profile;

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileAvatar>
          {getInitials(profile.personalInfo?.firstName, profile.personalInfo?.lastName)}
        </ProfileAvatar>
        <ProfileName>
          {profile.personalInfo?.firstName} {profile.personalInfo?.lastName}
        </ProfileName>
        <ProfileTitle>
          {profile.professionalInfo?.currentPosition} at {profile.professionalInfo?.currentCompany}
        </ProfileTitle>
        <ProfileMeta>
          <div className="meta-item">
            <div className="meta-label">Student ID</div>
            <div className="meta-value">{profile.academicInfo?.studentId}</div>
          </div>
          <div className="meta-item">
            <div className="meta-label">Graduation Year</div>
            <div className="meta-value">{profile.academicInfo?.graduationYear}</div>
          </div>
          <div className="meta-item">
            <div className="meta-label">Membership Level</div>
            <div className="meta-value">{profile.alumniActivities?.membershipLevel}</div>
          </div>
        </ProfileMeta>
        
        <EditButton onClick={() => navigate('/profile/edit')}>
          Edit Profile
        </EditButton>
      </ProfileHeader>

      <ProfileSections>
        {/* Personal Information */}
        <ProfileSection>
          <h2>Personal Information</h2>
          <InfoGrid>
            <InfoItem>
              <div className="info-label">Full Name</div>
              <div className="info-value">
                {profile.personalInfo?.firstName} {profile.personalInfo?.middleName} {profile.personalInfo?.lastName}
              </div>
            </InfoItem>
            <InfoItem>
              <div className="info-label">Date of Birth</div>
              <div className="info-value">{formatDate(profile.personalInfo?.dateOfBirth)}</div>
            </InfoItem>
            <InfoItem>
              <div className="info-label">Gender</div>
              <div className="info-value">{profile.personalInfo?.gender}</div>
            </InfoItem>
            <InfoItem>
              <div className="info-label">Nationality</div>
              <div className="info-value">{profile.personalInfo?.nationality}</div>
            </InfoItem>
            <InfoItem>
              <div className="info-label">Email</div>
              <div className="info-value">{profile.personalInfo?.contactInfo?.email}</div>
            </InfoItem>
            <InfoItem>
              <div className="info-label">Phone</div>
              <div className="info-value">{profile.personalInfo?.contactInfo?.phone}</div>
            </InfoItem>
          </InfoGrid>
          
          <div style={{ marginTop: '1.5rem' }}>
            <div className="info-label">Address</div>
            <div className="info-value">
              {profile.personalInfo?.contactInfo?.address?.street}<br />
              {profile.personalInfo?.contactInfo?.address?.city}, {profile.personalInfo?.contactInfo?.address?.state} {profile.personalInfo?.contactInfo?.address?.zipCode}<br />
              {profile.personalInfo?.contactInfo?.address?.country}
            </div>
          </div>
        </ProfileSection>

        {/* Academic Information */}
        <ProfileSection>
          <h2>Academic Information</h2>
          <InfoGrid>
            <InfoItem>
              <div className="info-label">Degree</div>
              <div className="info-value">{profile.academicInfo?.degree}</div>
            </InfoItem>
            <InfoItem>
              <div className="info-label">Major</div>
              <div className="info-value">{profile.academicInfo?.major}</div>
            </InfoItem>
            <InfoItem>
              <div className="info-label">Minor</div>
              <div className="info-value">{profile.academicInfo?.minor || 'N/A'}</div>
            </InfoItem>
            <InfoItem>
              <div className="info-label">GPA</div>
              <div className="info-value">{profile.academicInfo?.gpa}</div>
            </InfoItem>
            <InfoItem>
              <div className="info-label">Honors</div>
              <div className="info-value">{profile.academicInfo?.honors}</div>
            </InfoItem>
            <InfoItem>
              <div className="info-label">Thesis</div>
              <div className="info-value">{profile.academicInfo?.thesis}</div>
            </InfoItem>
          </InfoGrid>
          
          <div style={{ marginTop: '1.5rem' }}>
            <div className="info-label">Academic Awards</div>
            {profile.academicInfo?.academicAwards?.map((award, index) => (
              <ListItem key={index}>
                <div className="item-title">{award}</div>
              </ListItem>
            ))}
          </div>
        </ProfileSection>

        {/* Professional Information */}
        <ProfileSection>
          <h2>Professional Information</h2>
          <InfoGrid>
            <InfoItem>
              <div className="info-label">Current Position</div>
              <div className="info-value">{profile.professionalInfo?.currentPosition}</div>
            </InfoItem>
            <InfoItem>
              <div className="info-label">Company</div>
              <div className="info-value">{profile.professionalInfo?.currentCompany}</div>
            </InfoItem>
            <InfoItem>
              <div className="info-label">Industry</div>
              <div className="info-value">{profile.professionalInfo?.industry}</div>
            </InfoItem>
            <InfoItem>
              <div className="info-label">Years of Experience</div>
              <div className="info-value">{profile.professionalInfo?.yearsOfExperience}</div>
            </InfoItem>
          </InfoGrid>
          
          <div style={{ marginTop: '1.5rem' }}>
            <div className="info-label">Skills</div>
            <SkillsGrid>
              {profile.professionalInfo?.skills?.map((skill, index) => (
                <SkillTag key={index}>{skill}</SkillTag>
              ))}
            </SkillsGrid>
          </div>
          
          <div style={{ marginTop: '1.5rem' }}>
            <div className="info-label">Certifications</div>
            {profile.professionalInfo?.certifications?.map((cert, index) => (
              <ListItem key={index}>
                <div className="item-title">{cert}</div>
              </ListItem>
            ))}
          </div>
        </ProfileSection>

        {/* Alumni Activities */}
        <ProfileSection>
          <h2>Alumni Activities</h2>
          <InfoGrid>
            <InfoItem>
              <div className="info-label">Membership Level</div>
              <div className="info-value">{profile.alumniActivities?.membershipLevel}</div>
            </InfoItem>
            <InfoItem>
              <div className="info-label">Total Donations</div>
              <div className="info-value">
                ${profile.alumniActivities?.donationHistory?.reduce((sum, d) => sum + d.amount, 0) || 0}
              </div>
            </InfoItem>
          </InfoGrid>
          
          <div style={{ marginTop: '1.5rem' }}>
            <div className="info-label">Donation History</div>
            {profile.alumniActivities?.donationHistory?.map((donation, index) => (
              <ListItem key={index}>
                <div className="item-title">${donation.amount} - {donation.purpose}</div>
                <div className="item-description">Year: {donation.year}</div>
              </ListItem>
            ))}
          </div>
          
          <div style={{ marginTop: '1.5rem' }}>
            <div className="info-label">Volunteer Work</div>
            {profile.alumniActivities?.volunteerWork?.map((work, index) => (
              <ListItem key={index}>
                <div className="item-title">{work}</div>
              </ListItem>
            ))}
          </div>
          
          <div style={{ marginTop: '1.5rem' }}>
            <div className="info-label">Events Attended</div>
            {profile.alumniActivities?.eventsAttended?.map((event, index) => (
              <ListItem key={index}>
                <div className="item-title">{event}</div>
              </ListItem>
            ))}
          </div>
        </ProfileSection>

        {/* Achievements */}
        <ProfileSection>
          <h2>Achievements & Recognition</h2>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <div className="info-label" style={{ marginBottom: '1rem' }}>Professional Achievements</div>
            {profile.achievements?.professional?.map((achievement, index) => (
              <AchievementItem key={index}>
                <div className="achievement-icon">🏆</div>
                <div className="achievement-content">
                  <div className="achievement-title">{achievement}</div>
                </div>
              </AchievementItem>
            ))}
          </div>
          
          <div>
            <div className="info-label" style={{ marginBottom: '1rem' }}>Community Recognition</div>
            {profile.achievements?.community?.map((achievement, index) => (
              <AchievementItem key={index}>
                <div className="achievement-icon">🌟</div>
                <div className="achievement-content">
                  <div className="achievement-title">{achievement}</div>
                </div>
              </AchievementItem>
            ))}
          </div>
        </ProfileSection>
      </ProfileSections>
    </ProfileContainer>
  );
}

export default Profile;
