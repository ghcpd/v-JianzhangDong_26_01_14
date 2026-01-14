/**
 * TaskList Component
 * 
 * Displays a list of tasks with filtering and actions:
 * - Task cards with title, description, due date, and status
 * - Toggle complete/pending status
 * - Edit and delete actions
 * - Filter by status (All, Pending, Completed)
 * 
 * Design Notes:
 * - Card-based design for each task
 * - Clear visual distinction between completed and pending tasks
 * - Responsive layout adapts to screen size
 * - Smooth animations for task state changes
 * 
 * @file src/components/TaskList.js
 */

import React, { useState, useMemo } from 'react';
import './TaskList.css';

/**
 * Filter options for task list
 */
const FILTER_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' }
];

/**
 * TaskCard Component
 * Displays a single task with its details and actions
 * 
 * @param {Object} props
 * @param {Object} props.task - Task object
 * @param {Function} props.onToggleComplete - Toggle completion callback
 * @param {Function} props.onEdit - Edit task callback
 * @param {Function} props.onDelete - Delete task callback
 */
function TaskCard({ task, onToggleComplete, onEdit, onDelete }) {
  /**
   * Format date for display
   * 
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date (e.g., "Jan 14, 2026")
   */
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  /**
   * Check if task is overdue
   * Only applicable to pending tasks
   */
  const isOverdue = !task.completed && new Date(task.dueDate) < new Date().setHours(0, 0, 0, 0);

  /**
   * Check if task is due today
   */
  const isDueToday = new Date(task.dueDate).toDateString() === new Date().toDateString();

  return (
    <article 
      className={`task-card ${task.completed ? 'task-card--completed' : ''} ${isOverdue ? 'task-card--overdue' : ''}`}
      data-testid={`task-card-${task.id}`}
    >
      {/* Completion Checkbox */}
      <button
        className={`task-checkbox ${task.completed ? 'task-checkbox--checked' : ''}`}
        onClick={() => onToggleComplete(task.id)}
        aria-label={task.completed ? 'Mark as pending' : 'Mark as completed'}
        data-testid={`task-toggle-${task.id}`}
      >
        {task.completed && (
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3"
            className="check-icon"
            aria-hidden="true"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Task Content */}
      <div className="task-content">
        <h3 className="task-title" data-testid={`task-title-${task.id}`}>
          {task.title}
        </h3>
        
        {task.description && (
          <p className="task-description" data-testid={`task-description-${task.id}`}>
            {task.description}
          </p>
        )}
        
        <div className="task-meta">
          {/* Due Date Badge */}
          <span className={`task-due-date ${isDueToday ? 'due-today' : ''} ${isOverdue ? 'overdue' : ''}`}>
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              className="meta-icon"
              aria-hidden="true"
            >
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span data-testid={`task-due-date-${task.id}`}>
              {isOverdue ? 'Overdue: ' : isDueToday ? 'Today: ' : ''}
              {formatDate(task.dueDate)}
            </span>
          </span>

          {/* Status Badge */}
          <span className={`task-status ${task.completed ? 'status-completed' : 'status-pending'}`}>
            {task.completed ? 'Completed' : 'Pending'}
          </span>
        </div>
      </div>

      {/* Task Actions */}
      <div className="task-actions">
        {/* Edit Button */}
        <button
          className="action-btn action-btn--edit"
          onClick={() => onEdit(task)}
          aria-label="Edit task"
          data-testid={`task-edit-${task.id}`}
        >
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>

        {/* Delete Button */}
        <button
          className="action-btn action-btn--delete"
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
          data-testid={`task-delete-${task.id}`}
        >
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </article>
  );
}

/**
 * TaskList Component
 * 
 * @param {Object} props
 * @param {Array} props.tasks - Array of task objects
 * @param {Function} props.onToggleComplete - Toggle task completion
 * @param {Function} props.onEdit - Edit task callback
 * @param {Function} props.onDelete - Delete task callback
 * @returns {JSX.Element} Task list with filters
 */
function TaskList({ tasks, onToggleComplete, onEdit, onDelete }) {
  /**
   * Current filter state
   */
  const [filter, setFilter] = useState('all');

  /**
   * Filtered tasks based on current filter selection
   */
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'pending':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  /**
   * Sort tasks: pending first, then by due date
   */
  const sortedTasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      // Completed tasks go to bottom
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      // Sort by due date (earliest first)
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  }, [filteredTasks]);

  return (
    <section className="task-list-section" data-testid="task-list-section">
      {/* Section Header with Filters */}
      <div className="task-list-header">
        <h2 className="section-title">
          <svg 
            className="section-title-icon" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Tasks
          <span className="task-count" data-testid="task-count">
            ({filteredTasks.length})
          </span>
        </h2>

        {/* Filter Buttons */}
        <div className="filter-group" role="group" aria-label="Filter tasks">
          {FILTER_OPTIONS.map(option => (
            <button
              key={option.value}
              className={`filter-btn ${filter === option.value ? 'filter-btn--active' : ''}`}
              onClick={() => setFilter(option.value)}
              data-testid={`filter-${option.value}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="task-list" data-testid="task-list">
        {sortedTasks.length > 0 ? (
          sortedTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div className="empty-state" data-testid="empty-state">
            <svg 
              className="empty-icon" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <h3 className="empty-title">
              {filter === 'all' ? 'No tasks yet' : `No ${filter} tasks`}
            </h3>
            <p className="empty-text">
              {filter === 'all' 
                ? 'Add your first task to get started!'
                : `You don't have any ${filter} tasks.`
              }
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default TaskList;
