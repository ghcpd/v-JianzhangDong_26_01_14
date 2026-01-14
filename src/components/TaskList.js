import React from 'react';

/**
 * TaskList Component
 * Displays all tasks with options to:
 * - Feature 3: Toggle completion status
 * - Feature 2: Edit task
 * - Feature 4: Delete task
 */
function TaskList({ tasks, onToggleComplete, onEdit, onDelete }) {
  // Sort tasks: pending first, then completed
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Check if task is overdue
  const isOverdue = (dueDate, completed) => {
    if (completed) return false;
    return new Date(dueDate) < new Date();
  };

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3 className="empty-title">No tasks yet</h3>
        <p className="empty-text">Start by adding your first task!</p>
      </div>
    );
  }

  return (
    <div className="task-list" data-testid="task-list">
      <h2 className="section-title">Your Tasks</h2>
      
      <div className="tasks-container">
        {sortedTasks.map(task => (
          <div
            key={task.id}
            className={`task-card ${task.completed ? 'task-completed' : ''} ${
              isOverdue(task.dueDate, task.completed) ? 'task-overdue' : ''
            }`}
            data-testid={`task-${task.id}`}
          >
            {/* Task Header */}
            <div className="task-header">
              <div className="task-checkbox-container">
                {/* Feature 3: Toggle Completion Checkbox */}
                <input
                  type="checkbox"
                  className="task-checkbox"
                  checked={task.completed}
                  onChange={() => onToggleComplete(task.id)}
                  data-testid={`toggle-${task.id}`}
                />
                <label className="task-title-main">
                  {task.title}
                  {isOverdue(task.dueDate, task.completed) && (
                    <span className="overdue-badge">Overdue</span>
                  )}
                </label>
              </div>
              
              {/* Status Badge */}
              <span className={`status-badge ${task.completed ? 'status-completed' : 'status-pending'}`}>
                {task.completed ? '✓ Completed' : '⏳ Pending'}
              </span>
            </div>

            {/* Task Description */}
            <div className="task-description">
              {task.description}
            </div>

            {/* Task Footer */}
            <div className="task-footer">
              <div className="task-date">
                <span className="date-icon">📅</span>
                <span className="date-text">Due: {formatDate(task.dueDate)}</span>
              </div>
              
              {/* Task Actions */}
              <div className="task-actions">
                {/* Feature 2: Edit Button */}
                <button
                  className="btn-icon btn-edit"
                  onClick={() => onEdit(task)}
                  title="Edit task"
                  data-testid={`edit-${task.id}`}
                >
                  ✏️ Edit
                </button>
                
                {/* Feature 4: Delete Button */}
                <button
                  className="btn-icon btn-delete"
                  onClick={() => onDelete(task.id)}
                  title="Delete task"
                  data-testid={`delete-${task.id}`}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
