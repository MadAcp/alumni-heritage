import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import userService from '../../services/userService';

const EditContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const EditHeader = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  margin-bottom: 2rem;
  text-align: center;
`;

const EditTitle = styled.h1`
  margin: 0 0 0.5rem 0;
  color: #1e293b;
  font-size: 2rem;
  font-weight: 700;
`;

const EditSubtitle = styled.p`
  margin: 0;
  color: #64748b;
  font-size: 1.1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
`;

const SaveButton = styled.button`
  background: #10b981;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #059669;
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const CancelButton = styled.button`
  background: #6b7280;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #4b5563;
    transform: translateY(-1px);
  }
`;

const EditSections = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
`;

const EditSection = styled.div`
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

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  .form-label {
    color: #64748b;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    display: block;
  }
  
  .form-input {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;
    background: #f8fafc;
    
    &:focus {
      outline: none;
      border-color: #667eea;
      background: white;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    
    &.error {
      border-color: #ef4444;
    }
  }
  
  .form-select {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;
    background: #f8fafc;
    
    &:focus {
      outline: none;
      border-color: #667eea;
      background: white;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
  }
  
  .form-textarea {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;
    background: #f8fafc;
    min-height: 100px;
    resize: vertical;
    
    &:focus {
      outline: none;
      border-color: #667eea;
      background: white;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
  }
`;

const SkillsSection = styled.div`
  margin-top: 1.5rem;
  
  .skills-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .add-skill-btn {
    background: #667eea;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
      background: #5a67d8;
    }
  }
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const SkillTag = styled.div`
  background: #eff6ff;
  color: #1d4ed8;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid #dbeafe;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .remove-skill {
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 0.75rem;
    
    &:hover {
      background: #dc2626;
    }
  }
`;

const AddSkillInput = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  
  input {
    flex: 1;
    padding: 0.5rem;
    border: 2px solid #e5e7eb;
    border-radius: 6px;
    font-size: 0.875rem;
    
    &:focus {
      outline: none;
      border-color: #667eea;
    }
  }
  
  button {
    background: #10b981;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.875rem;
    cursor: pointer;
    
    &:hover {
      background: #059669;
    }
  }
`;

const ListSection = styled.div`
  margin-top: 1.5rem;
  
  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .add-item-btn {
    background: #667eea;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
      background: #5a67d8;
    }
  }
`;

const ListItem = styled.div`
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  border: 1px solid #e2e8f0;
  
  .item-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .item-text {
    flex: 1;
    margin-right: 1rem;
  }
  
  .remove-item {
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    cursor: pointer;
    
    &:hover {
      background: #dc2626;
    }
  }
`;

const AddItemForm = styled.div`
  background: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
  border: 2px dashed #cbd5e1;
  margin-bottom: 1rem;
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem;
    align-items: end;
  }
  
  input, textarea {
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 0.875rem;
    
    &:focus {
      outline: none;
      border-color: #667eea;
    }
  }
  
  textarea {
    resize: vertical;
    min-height: 60px;
  }
  
  .form-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }
  
  .save-item-btn {
    background: #10b981;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.875rem;
    cursor: pointer;
    
    &:hover {
      background: #059669;
    }
  }
  
  .cancel-item-btn {
    background: #6b7280;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.875rem;
    cursor: pointer;
    
    &:hover {
      background: #4b5563;
    }
  }
`;

const Notification = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
  
  &.success {
    background: #10b981;
  }
  
  &.error {
    background: #ef4444;
  }
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

function ProfileEdit() {
  const { currentUser, login } = useAuth();
  const navigate = useNavigate();
  const [editData, setEditData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [showAddAward, setShowAddAward] = useState(false);
  const [newAward, setNewAward] = useState('');
  const [showAddCertification, setShowAddCertification] = useState(false);
  const [newCertification, setNewCertification] = useState('');

  useEffect(() => {
    if (currentUser?.profile) {
      // Deep clone the profile data for editing
      setEditData(JSON.parse(JSON.stringify(currentUser.profile)));
    }
  }, [currentUser]);

  const handleInputChange = (section, field, value) => {
    setEditData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNestedChange = (section, nestedSection, field, value) => {
    setEditData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [nestedSection]: {
          ...prev[section]?.[nestedSection],
          [field]: value
        }
      }
    }));
  };

  const handleAddressChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        contactInfo: {
          ...prev.personalInfo?.contactInfo,
          address: {
            ...prev.personalInfo?.contactInfo?.address,
            [field]: value
          }
        }
      }
    }));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setEditData(prev => ({
        ...prev,
        professionalInfo: {
          ...prev.professionalInfo,
          skills: [...(prev.professionalInfo?.skills || []), newSkill.trim()]
        }
      }));
      setNewSkill('');
      setShowAddSkill(false);
    }
  };

  const removeSkill = (index) => {
    setEditData(prev => ({
      ...prev,
      professionalInfo: {
        ...prev.professionalInfo,
        skills: prev.professionalInfo?.skills?.filter((_, i) => i !== index) || []
      }
    }));
  };

  const addAward = () => {
    if (newAward.trim()) {
      setEditData(prev => ({
        ...prev,
        academicInfo: {
          ...prev.academicInfo,
          academicAwards: [...(prev.academicInfo?.academicAwards || []), newAward.trim()]
        }
      }));
      setNewAward('');
      setShowAddAward(false);
    }
  };

  const removeAward = (index) => {
    setEditData(prev => ({
      ...prev,
      academicInfo: {
        ...prev.academicInfo,
        academicAwards: prev.academicInfo?.academicAwards?.filter((_, i) => i !== index) || []
      }
    }));
  };

  const addCertification = () => {
    if (newCertification.trim()) {
      setEditData(prev => ({
        ...prev,
        professionalInfo: {
          ...prev.professionalInfo,
          certifications: [...(prev.professionalInfo?.certifications || []), newCertification.trim()]
        }
      }));
      setNewCertification('');
      setShowAddCertification(false);
    }
  };

  const removeCertification = (index) => {
    setEditData(prev => ({
      ...prev,
      professionalInfo: {
        ...prev.professionalInfo,
        certifications: prev.professionalInfo?.certifications?.filter((_, i) => i !== index) || []
      }
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const result = await userService.updateUserProfile(currentUser.id, editData);
      
      if (result.success) {
        // Update the auth context with the new user data
        login(result.user);
        
        setNotification({
          type: 'success',
          message: 'Profile updated successfully!'
        });
        
        setTimeout(() => {
          setNotification(null);
          navigate('/profile');
        }, 2000);
      } else {
        setNotification({
          type: 'error',
          message: result.message || 'Failed to update profile. Please try again.'
        });
      }
      
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to update profile. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  if (!editData.personalInfo) {
    return <div>Loading...</div>;
  }

  return (
    <EditContainer>
      {notification && (
        <Notification className={notification.type}>
          {notification.message}
        </Notification>
      )}

      <EditHeader>
        <EditTitle>Edit Profile Information</EditTitle>
        <EditSubtitle>Update your personal, academic, and professional details</EditSubtitle>
        
        <ActionButtons>
          <SaveButton onClick={handleSave} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </SaveButton>
          <CancelButton onClick={handleCancel}>
            Cancel
          </CancelButton>
        </ActionButtons>
      </EditHeader>

      <EditSections>
        {/* Personal Information */}
        <EditSection>
          <h2>Personal Information</h2>
          <FormGrid>
            <FormGroup>
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-input"
                value={editData.personalInfo?.firstName || ''}
                onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <label className="form-label">Middle Name</label>
              <input
                type="text"
                className="form-input"
                value={editData.personalInfo?.middleName || ''}
                onChange={(e) => handleInputChange('personalInfo', 'middleName', e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-input"
                value={editData.personalInfo?.lastName || ''}
                onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                className="form-input"
                value={editData.personalInfo?.dateOfBirth || ''}
                onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <label className="form-label">Gender</label>
              <select
                className="form-select"
                value={editData.personalInfo?.gender || ''}
                onChange={(e) => handleInputChange('personalInfo', 'gender', e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </FormGroup>
            
            <FormGroup>
              <label className="form-label">Nationality</label>
              <input
                type="text"
                className="form-input"
                value={editData.personalInfo?.nationality || ''}
                onChange={(e) => handleInputChange('personalInfo', 'nationality', e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                value={editData.personalInfo?.contactInfo?.email || ''}
                onChange={(e) => handleNestedChange('personalInfo', 'contactInfo', 'email', e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <label className="form-label">Phone</label>
              <input
                type="tel"
                className="form-input"
                value={editData.personalInfo?.contactInfo?.phone || ''}
                onChange={(e) => handleNestedChange('personalInfo', 'contactInfo', 'phone', e.target.value)}
              />
            </FormGroup>
          </FormGrid>
          
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#374151' }}>Address</h3>
            <FormGrid>
              <FormGroup>
                <label className="form-label">Street</label>
                <input
                  type="text"
                  className="form-input"
                  value={editData.personalInfo?.contactInfo?.address?.street || ''}
                  onChange={(e) => handleAddressChange('street', e.target.value)}
                />
              </FormGroup>
              
              <FormGroup>
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-input"
                  value={editData.personalInfo?.contactInfo?.address?.city || ''}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                />
              </FormGroup>
              
              <FormGroup>
                <label className="form-label">State</label>
                <input
                  type="text"
                  className="form-input"
                  value={editData.personalInfo?.contactInfo?.address?.state || ''}
                  onChange={(e) => handleAddressChange('state', e.target.value)}
                />
              </FormGroup>
              
              <FormGroup>
                <label className="form-label">ZIP Code</label>
                <input
                  type="text"
                  className="form-input"
                  value={editData.personalInfo?.contactInfo?.address?.zipCode || ''}
                  onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                />
              </FormGroup>
              
              <FormGroup>
                <label className="form-label">Country</label>
                <input
                  type="text"
                  className="form-input"
                  value={editData.personalInfo?.contactInfo?.address?.country || ''}
                  onChange={(e) => handleAddressChange('country', e.target.value)}
                />
              </FormGroup>
            </FormGrid>
          </div>
        </EditSection>

        {/* Academic Information */}
        <EditSection>
          <h2>Academic Information</h2>
          <FormGrid>
            <FormGroup>
              <label className="form-label">Student ID</label>
              <input
                type="text"
                className="form-input"
                value={editData.academicInfo?.studentId || ''}
                onChange={(e) => handleInputChange('academicInfo', 'studentId', e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <label className="form-label">Degree</label>
              <input
                type="text"
                className="form-input"
                value={editData.academicInfo?.degree || ''}
                onChange={(e) => handleInputChange('academicInfo', 'degree', e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <label className="form-label">Major</label>
              <input
                type="text"
                className="form-input"
                value={editData.academicInfo?.major || ''}
                onChange={(e) => handleInputChange('academicInfo', 'major', e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <label className="form-label">Minor</label>
              <input
                type="text"
                className="form-input"
                value={editData.academicInfo?.minor || ''}
                onChange={(e) => handleInputChange('academicInfo', 'minor', e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <label className="form-label">Graduation Year</label>
              <input
                type="number"
                className="form-input"
                value={editData.academicInfo?.graduationYear || ''}
                onChange={(e) => handleInputChange('academicInfo', 'graduationYear', parseInt(e.target.value) || '')}
                min="1950"
                max="2030"
              />
            </FormGroup>
            
            <FormGroup>
              <label className="form-label">GPA</label>
              <input
                type="text"
                className="form-input"
                value={editData.academicInfo?.gpa || ''}
                onChange={(e) => handleInputChange('academicInfo', 'gpa', e.target.value)}
                placeholder="e.g., 3.85"
              />
            </FormGroup>
            
            <FormGroup>
              <label className="form-label">Honors</label>
              <input
                type="text"
                className="form-input"
                value={editData.academicInfo?.honors || ''}
                onChange={(e) => handleInputChange('academicInfo', 'honors', e.target.value)}
              />
            </FormGroup>
          </FormGrid>
          
          <div style={{ marginTop: '1.5rem' }}>
            <label className="form-label">Thesis/Research Topic</label>
            <textarea
              className="form-textarea"
              value={editData.academicInfo?.thesis || ''}
              onChange={(e) => handleInputChange('academicInfo', 'thesis', e.target.value)}
              placeholder="Describe your thesis or research topic..."
            />
          </div>
          
          <ListSection>
            <div className="list-header">
              <label className="form-label">Academic Awards</label>
              <button 
                className="add-item-btn"
                onClick={() => setShowAddAward(!showAddAward)}
              >
                {showAddAward ? 'Cancel' : 'Add Award'}
              </button>
            </div>
            
            {showAddAward && (
              <AddItemForm>
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Enter academic award..."
                    value={newAward}
                    onChange={(e) => setNewAward(e.target.value)}
                  />
                  <div className="form-actions">
                    <button className="save-item-btn" onClick={addAward}>
                      Add
                    </button>
                    <button className="cancel-item-btn" onClick={() => setShowAddAward(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </AddItemForm>
            )}
            
            {editData.academicInfo?.academicAwards?.map((award, index) => (
              <ListItem key={index}>
                <div className="item-content">
                  <div className="item-text">{award}</div>
                  <button className="remove-item" onClick={() => removeAward(index)}>
                    Remove
                  </button>
                </div>
              </ListItem>
            ))}
          </ListSection>
        </EditSection>

        {/* Professional Information */}
        <EditSection>
          <h2>Professional Information</h2>
          <FormGrid>
            <FormGroup>
              <label className="form-label">Current Position</label>
              <input
                type="text"
                className="form-input"
                value={editData.professionalInfo?.currentPosition || ''}
                onChange={(e) => handleInputChange('professionalInfo', 'currentPosition', e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <label className="form-label">Company</label>
              <input
                type="text"
                className="form-input"
                value={editData.professionalInfo?.currentCompany || ''}
                onChange={(e) => handleInputChange('professionalInfo', 'currentCompany', e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <label className="form-label">Industry</label>
              <input
                type="text"
                className="form-input"
                value={editData.professionalInfo?.industry || ''}
                onChange={(e) => handleInputChange('professionalInfo', 'industry', e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <label className="form-label">Years of Experience</label>
              <input
                type="number"
                className="form-input"
                value={editData.professionalInfo?.yearsOfExperience || ''}
                onChange={(e) => handleInputChange('professionalInfo', 'yearsOfExperience', parseInt(e.target.value) || '')}
                min="0"
                max="50"
              />
            </FormGroup>
          </FormGrid>
          
          <SkillsSection>
            <div className="skills-header">
              <label className="form-label">Skills</label>
              <button 
                className="add-skill-btn"
                onClick={() => setShowAddSkill(!showAddSkill)}
              >
                {showAddSkill ? 'Cancel' : 'Add Skill'}
              </button>
            </div>
            
            {showAddSkill && (
              <AddSkillInput>
                <input
                  type="text"
                  placeholder="Enter skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <button onClick={addSkill}>Add</button>
              </AddSkillInput>
            )}
            
            <SkillsList>
              {editData.professionalInfo?.skills?.map((skill, index) => (
                <SkillTag key={index}>
                  {skill}
                  <button className="remove-skill" onClick={() => removeSkill(index)}>
                    ×
                  </button>
                </SkillTag>
              ))}
            </SkillsList>
          </SkillsSection>
          
          <ListSection>
            <div className="list-header">
              <label className="form-label">Certifications</label>
              <button 
                className="add-item-btn"
                onClick={() => setShowAddCertification(!showAddCertification)}
              >
                {showAddCertification ? 'Cancel' : 'Add Certification'}
              </button>
            </div>
            
            {showAddCertification && (
              <AddItemForm>
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Enter certification..."
                    value={newCertification}
                    onChange={(e) => setNewCertification(e.target.value)}
                  />
                  <div className="form-actions">
                    <button className="save-item-btn" onClick={addCertification}>
                      Add
                    </button>
                    <button className="cancel-item-btn" onClick={() => setShowAddCertification(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </AddItemForm>
            )}
            
            {editData.professionalInfo?.certifications?.map((cert, index) => (
              <ListItem key={index}>
                <div className="item-content">
                  <div className="item-text">{cert}</div>
                  <button className="remove-item" onClick={() => removeCertification(index)}>
                    Remove
                  </button>
                </div>
              </ListItem>
            ))}
          </ListSection>
        </EditSection>
      </EditSections>
    </EditContainer>
  );
}

export default ProfileEdit;
