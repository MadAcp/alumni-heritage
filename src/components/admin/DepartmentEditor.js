import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import departmentService from '../../services/departmentService';
import { useAuth } from '../../context/AuthContext';

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #334155;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
  font-size: 1rem;
  &:disabled {
    background-color: #f1f5f9;
    cursor: not-allowed;
  }
`;

const CourseInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  align-self: flex-start;

  &.primary {
    background-color: #2563eb;
    &:hover { background-color: #1d4ed8; }
  }
  &.secondary {
    background-color: #64748b;
    &:hover { background-color: #475569; }
  }
  &.danger {
    background-color: #dc2626;
    &:hover { background-color: #b91c1c; }
    padding: 0.5rem;
    line-height: 1;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ErrorMessage = styled.p`
  color: #dc2626;
  font-weight: 500;
`;

function DepartmentEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = id !== 'new';

  // The useAuth hook provides the currently logged-in user's data from a global context.
  const { currentUser } = useAuth();

  const [department, setDepartment] = useState({ id: '', departmentName: '', courses: [''] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      setLoading(true);
      departmentService.getDepartmentById(id)
        .then(response => {
          if (response.success) {
            // Ensure courses is an array, even if it's empty in the DB
            setDepartment({ ...response.data, courses: response.data.courses || [''] });
          } else {
            setError(response.message);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment(prev => ({ ...prev, [name]: value }));
  };

  const handleCourseChange = (index, value) => {
    const newCourses = [...department.courses];
    newCourses[index] = value;
    setDepartment(prev => ({ ...prev, courses: newCourses }));
  };

  const addCourseInput = () => {
    setDepartment(prev => ({ ...prev, courses: [...prev.courses, ''] }));
  };

  const removeCourseInput = (index) => {
    if (department.courses.length <= 1) return; // Always keep at least one input
    const newCourses = department.courses.filter((_, i) => i !== index);
    setDepartment(prev => ({ ...prev, courses: newCourses }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const finalDepartmentData = {
      ...department,
      courses: department.courses.filter(course => course.trim() !== ''),
    };

    let response;
    if (isEditMode) {
      const { id: deptId, ...updateData } = finalDepartmentData;
      response = await departmentService.updateDepartment(currentUser.role, deptId, updateData);
    } else {
      if (!finalDepartmentData.id) {
        setError("Department ID is required.");
        setLoading(false);
        return;
      }
      response = await departmentService.createDepartment(currentUser.role, finalDepartmentData);
    }

    setLoading(false);
    if (response.success) {
      navigate('/admin/departments');
    } else {
      setError(response.message || 'An unknown error occurred.');
    }
  };

  if (loading && isEditMode) return <PageContainer><p>Loading department details...</p></PageContainer>;

  return (
    <PageContainer>
      <Title>{isEditMode ? 'Edit Department' : 'Add New Department'}</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="id">Department ID</Label>
          <Input type="text" name="id" value={department.id} onChange={handleChange} disabled={isEditMode} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="departmentName">Department Name</Label>
          <Input type="text" name="departmentName" value={department.departmentName} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Courses</Label>
          {department.courses.map((course, index) => (
            <CourseInputContainer key={index}>
              <Input
                type="text"
                value={course}
                onChange={(e) => handleCourseChange(index, e.target.value)}
                placeholder={`Course #${index + 1}`}
              />
              <Button type="button" className="danger" onClick={() => removeCourseInput(index)} disabled={department.courses.length <= 1}>
                &times;
              </Button>
            </CourseInputContainer>
          ))}
          <Button type="button" className="secondary" onClick={addCourseInput}>Add Course</Button>
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <ActionContainer>
          <Button type="submit" className="primary" disabled={loading}>
            {loading ? 'Saving...' : (isEditMode ? 'Update Department' : 'Create Department')}
          </Button>
          <Button type="button" className="secondary" onClick={() => navigate('/admin/departments')}>
            Cancel
          </Button>
        </ActionContainer>
      </Form>
    </PageContainer>
  );
}

export default DepartmentEditor;