import React, { createContext, useContext, useState } from 'react';
import userService from '../services/userService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Initialize user state from localStorage to persist login across page refreshes.
  const [currentUser, setCurrentUser] = useState(() => userService.getCurrentUser());

  const login = (userData) => {
    // The user data is already saved to localStorage in the Login component
    // before this function is called. We just need to update the state here.
    setCurrentUser(userData);
    userService.setCurrentUser(userData);
  };

  const logout = () => {
    setCurrentUser(null);
    userService.clearCurrentUser();
  };

  const value = {
    // isAuthenticated is now a derived value, ensuring it's always in sync with currentUser.
    isAuthenticated: !!currentUser,
    currentUser,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
