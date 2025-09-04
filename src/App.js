import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Welcome from './components/Welcome';
import Header from './components/Header';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './components/NotFound';
import UserDashboard from './components/user/UserDashboard';
import Profile from './components/user/Profile';
import ProfileEdit from './components/user/ProfileEdit';
import UserHeader from './components/user/UserHeader';
import AdminHeader from './components/admin/AdminHeader';
import AdminDashboard from './components/admin/AdminDashboard';
import ManageUsers from './components/admin/ManageUsers';
import ManageDepartments from './components/admin/ManageDepartments';
import DepartmentEditor from './components/admin/DepartmentEditor';
import ManageEvents from './components/admin/ManageEvents';
import Settings from './components/admin/Settings'
import { AuthProvider, useAuth } from './context/AuthContext';

const AppContainer = styled.div`
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// A protected route specifically for admin users
const AdminRoute = ({ children }) => {
  const { isAuthenticated, currentUser } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  // If authenticated but not an admin, redirect to the user dashboard
  return currentUser?.role === 'admin' ? children : <Navigate to="/user-dashboard" />;
};

function AppRoutes() {
  const { isAuthenticated, currentUser } = useAuth();

  const renderHeader = () => {
    if (!isAuthenticated) {
      return <Header />;
    }
    return currentUser?.role === 'admin' ? <AdminHeader /> : <UserHeader />;
  };

  const defaultAuthenticatedPath = currentUser?.role === 'admin' ? '/admin-dashboard' : '/user-dashboard';

  return (
    <AppContainer>
      {renderHeader()}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={!isAuthenticated ? <SignUp /> : <Navigate to={defaultAuthenticatedPath} />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to={defaultAuthenticatedPath} />} />
        
        {/* Alumni Routes */}
        <Route 
          path="/user-dashboard" 
          element={
            <ProtectedRoute>
              <UserDashboard />
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

        {/* Admin Routes */}
        <Route 
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route 
          path="/admin/users"
          element={
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          }
        />
        <Route 
          path="/admin/departments"
          element={
            <AdminRoute>
              <ManageDepartments />
            </AdminRoute>
          }
        />
        <Route 
          path="/admin/department/:id"
          element={
            <AdminRoute>
              <DepartmentEditor />
            </AdminRoute>
          }
        />
        <Route 
          path="/admin/events"
          element={
            <AdminRoute>
              <ManageEvents />
            </AdminRoute>
          }
        />
        <Route 
          path="/admin/settings"
          element={
            <AdminRoute>
              <Settings />
            </AdminRoute>
          }
        />

        {/* Catch-all 404 Route */}
        <Route path="*" element={<NotFound />} />
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
