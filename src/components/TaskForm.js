/**
 * TaskForm Component
 * 
 * A form for creating new tasks or editing existing ones.
 * Features:
 * - Title input (required)
 * - Description textarea (optional)
 * - Due date picker (required)
 * - Form validation
 * - Submit and cancel actions
 * 
 * Design Notes:
 * - Clean, spacious form layout
 * - Clear visual hierarchy with labels
 * - Accessible form controls with proper labeling
 * - Validation feedback
 * 
 * @file src/components/TaskForm.js
 */

import React, { useState, useEffect } from 'react';
import './TaskForm.css';

/**
 * TaskForm Component
 * 
 * @param {Object} props
 * @param {Object|null} props.task - Existing task for edit mode, null for add mode
 * @param {Function} props.onSubmit - Callback with form data on submission
 * @param {Function} props.onCancel - Callback when form is cancelled
 * @returns {JSX.Element} Task form
 */
function TaskForm({ task, onSubmit, onCancel }) {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  
  /**
   * Form data state
   * Initialized with empty values for add mode, or task data for edit mode
   */
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: ''
  });

  /**
   * Form validation errors state
   */
  const [errors, setErrors] = useState({});

  /**
   * Form touched state for showing validation errors only after interaction
   */
  const [touched, setTouched] = useState({});

  // ============================================
  // EFFECTS
  // ============================================

  /**
   * Initialize form with task data when in edit mode
   */
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        dueDate: task.dueDate || ''
      });
    }
  }, [task]);

  // ============================================
  // VALIDATION
  // ============================================

  /**
   * Validate a single field
   * 
   * @param {string} name - Field name
   * @param {string} value - Field value
   * @returns {string} Error message or empty string
   */
  const validateField = (name, value) => {
    switch (name) {
      case 'title':
        if (!value.trim()) {
          return 'Title is required';
        }
        if (value.trim().length < 3) {
          return 'Title must be at least 3 characters';
        }
        if (value.trim().length > 100) {
          return 'Title must be less than 100 characters';
        }
        return '';
      
      case 'dueDate':
        if (!value) {
          return 'Due date is required';
        }
        return '';
      
      case 'description':
        if (value.length > 500) {
          return 'Description must be less than 500 characters';
        }
        return '';
      
      default:
        return '';
    }
  };

  /**
   * Validate all form fields
   * 
   * @returns {Object} Errors object
   */
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    return newErrors;
  };

  // ============================================
  // EVENT HANDLERS
  // ============================================

  /**
   * Handle input field changes
   * Updates form data and validates the changed field
   * 
   * @param {Event} e - Change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate field if it has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  /**
   * Handle field blur for validation
   * Marks field as touched and shows validation error
   * 
   * @param {Event} e - Blur event
   */
  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  /**
   * Handle form submission
   * Validates all fields and calls onSubmit if valid
   * 
   * @param {Event} e - Submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      title: true,
      description: true,
      dueDate: true
    });

    // Validate all fields
    const formErrors = validateForm();
    setErrors(formErrors);

    // If no errors, submit form
    if (Object.keys(formErrors).length === 0) {
      onSubmit({
        title: formData.title.trim(),
        description: formData.description.trim(),
        dueDate: formData.dueDate
      });
    }
  };

  // ============================================
  // RENDER
  // ============================================

  /**
   * Get today's date in YYYY-MM-DD format for min date attribute
   */
  const today = new Date().toISOString().split('T')[0];

  return (
    <form 
      className="task-form" 
      onSubmit={handleSubmit}
      data-testid="task-form"
      noValidate
    >
      {/* Title Field */}
      <div className={`form-group ${errors.title && touched.title ? 'has-error' : ''}`}>
        <label htmlFor="title" className="form-label">
          Task Title <span className="required">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter task title..."
          className="form-input"
          data-testid="task-title-input"
          autoFocus
        />
        {errors.title && touched.title && (
          <span className="form-error" data-testid="title-error">
            {errors.title}
          </span>
        )}
      </div>

      {/* Description Field */}
      <div className={`form-group ${errors.description && touched.description ? 'has-error' : ''}`}>
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter task description (optional)..."
          className="form-textarea"
          rows="4"
          data-testid="task-description-input"
        />
        {errors.description && touched.description && (
          <span className="form-error" data-testid="description-error">
            {errors.description}
          </span>
        )}
        <span className="form-hint">
          {formData.description.length}/500 characters
        </span>
      </div>

      {/* Due Date Field */}
      <div className={`form-group ${errors.dueDate && touched.dueDate ? 'has-error' : ''}`}>
        <label htmlFor="dueDate" className="form-label">
          Due Date <span className="required">*</span>
        </label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          onBlur={handleBlur}
          min={today}
          className="form-input"
          data-testid="task-due-date-input"
        />
        {errors.dueDate && touched.dueDate && (
          <span className="form-error" data-testid="due-date-error">
            {errors.dueDate}
          </span>
        )}
      </div>

      {/* Form Actions */}
      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
          data-testid="cancel-btn"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          data-testid="submit-btn"
        >
          {task ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
