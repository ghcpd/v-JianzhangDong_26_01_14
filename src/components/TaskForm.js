import React, { useState, useEffect } from 'react';

/**
 * TaskForm Component
 * Features 1 & 2: Add new task or Edit existing task
 * Handles form validation and submission
 */
function TaskForm({ task, onSubmit, onCancel }) {
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: ''
  });

  const [errors, setErrors] = useState({});

  // Populate form if editing existing task
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate
      });
    }
  }, [task]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      if (task) {
        // Editing existing task
        onSubmit({ ...task, ...formData });
      } else {
        // Adding new task
        onSubmit(formData);
      }
      
      // Reset form
      setFormData({ title: '', description: '', dueDate: '' });
      setErrors({});
    }
  };

  return (
    <div className="task-form-container" data-testid="task-form">
      <div className="task-form-card">
        <h2 className="form-title">
          {task ? '✏️ Edit Task' : '➕ Add New Task'}
        </h2>
        
        <form onSubmit={handleSubmit} className="task-form">
          {/* Title Input */}
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Task Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className={`form-input ${errors.title ? 'input-error' : ''}`}
              placeholder="e.g., Complete project documentation"
              value={formData.title}
              onChange={handleChange}
              data-testid="task-title-input"
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          {/* Description Input */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description <span className="required">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              className={`form-input form-textarea ${errors.description ? 'input-error' : ''}`}
              placeholder="Describe the task in detail..."
              value={formData.description}
              onChange={handleChange}
              rows="4"
              data-testid="task-description-input"
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          {/* Due Date Input */}
          <div className="form-group">
            <label htmlFor="dueDate" className="form-label">
              Due Date <span className="required">*</span>
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              className={`form-input ${errors.dueDate ? 'input-error' : ''}`}
              value={formData.dueDate}
              onChange={handleChange}
              data-testid="task-duedate-input"
            />
            {errors.dueDate && <span className="error-message">{errors.dueDate}</span>}
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={onCancel}
              data-testid="cancel-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              data-testid="submit-button"
            >
              {task ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
