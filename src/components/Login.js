import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import userService from '../services/userService';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
`;

const LoginCard = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 100%;
  max-width: 480px;
  text-align: center;
`;

const Logo = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    color: #1e293b;
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
  }
  
  p {
    color: #64748b;
    margin: 0.5rem 0 0 0;
    font-size: 0.9rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  text-align: left;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #374151;
    font-weight: 500;
    font-size: 0.9rem;
  }
  
  input {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;
    
    &:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
  }
`;

const LoginButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.875rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  color: #dc2626;
  background: #fef2f2;
  border: 1px solid #fecaca;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
  margin-top: 1rem;
`;

const DemoCredentials = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  
  h4 {
    margin: 0 0 0.5rem 0;
    color: #475569;
    font-size: 0.9rem;
  }
  
  p {
    margin: 0.25rem 0;
    color: #64748b;
  }
`;

const CredentialGroup = styled.div`
  margin-top: 0.75rem;
  text-align: left;

  &:not(:first-of-type) {
    border-top: 1px solid #e2e8f0;
    padding-top: 0.75rem;
  }

  p {
    font-size: 0.9rem;
    code {
      background: #eef2ff;
      color: #4338ca;
      padding: 2px 6px;
      border-radius: 4px;
    }
  }
`;

const SignUpLink = styled.p`
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #475569;

  a {
    color: #1f9c68ff;
    font-weight: 600;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const result = await userService.authenticateUser(email, password);

      if (result.success) {
        const user = result.data; // Use result.data as per the firebaseService change
        login(user); // Pass the full user object to the auth context

        // Redirect based on user role
        if (user.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/user-dashboard');
        }
      } else {
        setError(result.message || 'Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Logo>
          <h1>Alumni Heritage</h1>
          <p>Connect with Your Educational Legacy</p>
        </Logo>
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </FormGroup>
          
          <LoginButton type="submit" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </LoginButton>
        </Form>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <SignUpLink>
          Don't have an account? <Link to="/signup">Create one</Link>
        </SignUpLink>

        <DemoCredentials>
          <h4>Demo Credentials</h4>
          <CredentialGroup>
            <p><b>Role:</b> Alumni</p>
            <p><b>Email:</b> <code>john.doe@alumni.edu</code></p>
            <p><b>Password:</b> <code>password123</code></p>
          </CredentialGroup>
          <CredentialGroup>
            <p><b>Role:</b> Alumni</p>
            <p><b>Email:</b> <code>sarah.smith@alumni.edu</code></p>
            <p><b>Password:</b> <code>password123</code></p>
          </CredentialGroup>
          <CredentialGroup>
            <p><b>Role:</b> Admin</p>
            <p><b>Email:</b> <code>avadhutcpatil@gmail.com</code></p>
            <p><b>Password:</b> <code>password123</code></p>
          </CredentialGroup>
        </DemoCredentials>
      </LoginCard>
    </LoginContainer>
  );
}

export default Login;
