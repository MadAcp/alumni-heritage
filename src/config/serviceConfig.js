// Service Configuration
// Change this flag to switch between localStorage and API
export const USE_LOCAL_STORAGE = true;

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
};

// Local Storage Configuration
export const STORAGE_CONFIG = {
  USERS_KEY: 'alumni_users_data',
  CURRENT_USER_KEY: 'alumni_current_user',
  SESSION_KEY: 'alumni_session',
};

// Feature Flags
export const FEATURES = {
  ENABLE_OFFLINE_MODE: true,
  ENABLE_DATA_SYNC: false,
  ENABLE_CACHE: true,
  ENABLE_ANALYTICS: false,
};

// Environment Configuration
export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_TEST: process.env.NODE_ENV === 'test',
};

// Debug Configuration
export const DEBUG = {
  ENABLE_LOGGING: ENV.IS_DEVELOPMENT,
  ENABLE_PERFORMANCE_MONITORING: ENV.IS_PRODUCTION,
  ENABLE_ERROR_TRACKING: ENV.IS_PRODUCTION,
};
