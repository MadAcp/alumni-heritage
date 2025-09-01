import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import userService from './services/userService';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Create an async function to initialize services and then render the app
const initializeAndRenderApp = async () => {
  // Wait for the user service to finish its async setup
  await userService.initialize();

  root.render(
    <React.StrictMode>
      <BrowserRouter basename="/alumni">
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}
// Call the initialization function
initializeAndRenderApp();
