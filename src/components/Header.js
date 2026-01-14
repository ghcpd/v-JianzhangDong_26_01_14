/**
 * Header Component
 * 
 * Displays the application header with:
 * - App title and branding
 * - Add new task button
 * 
 * Design Notes:
 * - Fixed height header for consistent layout
 * - Primary blue gradient background for visual impact
 * - White text for contrast and readability
 * - Responsive padding adjustments
 * 
 * @file src/components/Header.js
 */

import React from 'react';
import './Header.css';

/**
 * Header Component
 * 
 * @param {Object} props
 * @param {Function} props.onAddTask - Callback function to trigger add task modal
 * @returns {JSX.Element} Header with title and add button
 */
function Header({ onAddTask }) {
  return (
    <header className="header" data-testid="header">
      {/* Left side: App branding */}
      <div className="header-brand">
        {/* Task icon SVG */}
        <svg 
          className="header-icon" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        
        {/* App title */}
        <h1 className="header-title">Task Dashboard</h1>
      </div>
      
      {/* Right side: Add task button */}
      <button 
        className="header-add-btn"
        onClick={onAddTask}
        data-testid="add-task-btn"
        aria-label="Add new task"
      >
        {/* Plus icon */}
        <svg 
          className="btn-icon" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        <span className="btn-text">Add Task</span>
      </button>
    </header>
  );
}

export default Header;
