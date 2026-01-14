/**
 * Main Application Entry Point
 * 
 * This file serves as the entry point for the React application.
 * It renders the main App component into the DOM.
 * 
 * @file src/index.js
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Create root element and render the application
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
