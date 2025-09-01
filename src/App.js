import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import UserHeader from './components/UserHeader';
import { AuthProvider, useAuth } from './context/AuthContext';
import Welcome from './components/Welcome';
import SignUp from './components/SignUp';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';

const AppContainer = styled.div`
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <AppContainer>
      {isAuthenticated ? <UserHeader /> : <Header />}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={!isAuthenticated ? <SignUp /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile/edit" 
          element={
            <ProtectedRoute>
              <ProfileEdit />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </AppContainer>
  );
}

function App() {
  return (
    <AuthProvider>
        <ScrollToTop />
        <AppRoutes />
    </AuthProvider>
  );
}

export default App;
