/**
 * Automated Test Suite for Task Management Dashboard
 * 
 * This test file covers all 5 main features of the application:
 * 1. Add a new task with title, description, and due date
 * 2. Edit an existing task's details
 * 3. Mark a task as completed or pending
 * 4. Delete a task
 * 5. Display a summary dashboard with statistics and charts
 * 
 * Test Categories:
 * - Normal input tests: Valid inputs and expected behavior
 * - Edge case tests: Boundary conditions and error handling
 * 
 * Test Framework: Jest with React Testing Library
 * 
 * @file test/auto_test.js
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../App';

// ============================================
// TEST UTILITIES
// ============================================

/**
 * Custom console logger to write test results
 * Formats logs with timestamps and test context
 */
const testLogger = {
  log: (message, type = 'INFO') => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${type}] ${message}`);
  },
  pass: (testName) => {
    testLogger.log(`✓ PASS: ${testName}`, 'PASS');
  },
  fail: (testName, error) => {
    testLogger.log(`✗ FAIL: ${testName} - ${error}`, 'FAIL');
  },
  section: (sectionName) => {
    console.log('\n' + '='.repeat(60));
    console.log(`  ${sectionName}`);
    console.log('='.repeat(60));
  }
};

/**
 * Helper function to get future date string
 * @param {number} daysFromNow - Number of days from today
 * @returns {string} Date in YYYY-MM-DD format
 */
const getFutureDate = (daysFromNow = 1) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
};

/**
 * Helper to open the add task modal
 */
const openAddTaskModal = async (user) => {
  const addButton = screen.getByTestId('add-task-btn');
  await user.click(addButton);
  await waitFor(() => {
    expect(screen.getByTestId('task-form')).toBeInTheDocument();
  });
};

/**
 * Helper to fill and submit the task form
 */
const fillTaskForm = async (user, { title, description = '', dueDate }) => {
  const titleInput = screen.getByTestId('task-title-input');
  const descriptionInput = screen.getByTestId('task-description-input');
  const dueDateInput = screen.getByTestId('task-due-date-input');

  if (title) {
    await user.clear(titleInput);
    await user.type(titleInput, title);
  }
  
  if (description) {
    await user.clear(descriptionInput);
    await user.type(descriptionInput, description);
  }
  
  if (dueDate) {
    await user.clear(dueDateInput);
    await user.type(dueDateInput, dueDate);
  }
};

// ============================================
// TEST SETUP
// ============================================

describe('Task Management Dashboard - Automated Test Suite', () => {
  let user;

  beforeAll(() => {
    testLogger.section('STARTING AUTOMATED TEST SUITE');
    testLogger.log('Test Environment: Jest + React Testing Library');
    testLogger.log('Application: Task Management Dashboard');
  });

  beforeEach(() => {
    user = userEvent.setup();
    testLogger.log('Setting up test environment...');
  });

  afterAll(() => {
    testLogger.section('TEST SUITE COMPLETED');
  });

  // ============================================
  // FEATURE 1: ADD NEW TASK
  // ============================================

  describe('Feature 1: Add New Task', () => {
    beforeAll(() => {
      testLogger.section('FEATURE 1: ADD NEW TASK TESTS');
    });

    test('1.1 Should add a new task with valid title, description, and due date', async () => {
      const testName = 'Add task with all valid fields';
      testLogger.log(`Running: ${testName}`);

      render(<App />);

      // Open add task modal
      await openAddTaskModal(user);

      // Fill form with valid data
      const taskData = {
        title: 'New Test Task',
        description: 'This is a test task description',
        dueDate: getFutureDate(7)
      };

      await fillTaskForm(user, taskData);

      // Submit form
      const submitBtn = screen.getByTestId('submit-btn');
      await user.click(submitBtn);

      // Verify task was added
      await waitFor(() => {
        expect(screen.getByText('New Test Task')).toBeInTheDocument();
      });

      testLogger.pass(testName);
    });

    test('1.2 Should add a task with only required fields (title and due date)', async () => {
      const testName = 'Add task with only required fields';
      testLogger.log(`Running: ${testName}`);

      render(<App />);

      await openAddTaskModal(user);

      await fillTaskForm(user, {
        title: 'Minimal Task',
        dueDate: getFutureDate(1)
      });

      const submitBtn = screen.getByTestId('submit-btn');
      await user.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText('Minimal Task')).toBeInTheDocument();
      });

      testLogger.pass(testName);
    });

    test('1.3 Edge Case: Should show validation error for empty title', async () => {
      const testName = 'Validation error for empty title';
      testLogger.log(`Running: ${testName}`);

      render(<App />);

      await openAddTaskModal(user);

      // Try to submit without filling title
      await fillTaskForm(user, {
        dueDate: getFutureDate(1)
      });

      const submitBtn = screen.getByTestId('submit-btn');
      await user.click(submitBtn);

      // Check for validation error
      await waitFor(() => {
        expect(screen.getByTestId('title-error')).toBeInTheDocument();
      });

      testLogger.pass(testName);
    });

    test('1.4 Edge Case: Should show validation error for title less than 3 characters', async () => {
      const testName = 'Validation error for short title';
      testLogger.log(`Running: ${testName}`);

      render(<App />);

      await openAddTaskModal(user);

      await fillTaskForm(user, {
        title: 'Ab',
        dueDate: getFutureDate(1)
      });

      const submitBtn = screen.getByTestId('submit-btn');
      await user.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByTestId('title-error')).toHaveTextContent('at least 3 characters');
      });

      testLogger.pass(testName);
    });

    test('1.5 Edge Case: Should show validation error for missing due date', async () => {
      const testName = 'Validation error for missing due date';
      testLogger.log(`Running: ${testName}`);

      render(<App />);

      await openAddTaskModal(user);

      await fillTaskForm(user, {
        title: 'Task Without Date'
      });

      const submitBtn = screen.getByTestId('submit-btn');
      await user.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByTestId('due-date-error')).toBeInTheDocument();
      });

      testLogger.pass(testName);
    });

    test('1.6 Should close modal when cancel button is clicked', async () => {
      const testName = 'Cancel button closes modal';
      testLogger.log(`Running: ${testName}`);

      render(<App />);

      await openAddTaskModal(user);

      const cancelBtn = screen.getByTestId('cancel-btn');
      await user.click(cancelBtn);

      await waitFor(() => {
        expect(screen.queryByTestId('task-form')).not.toBeInTheDocument();
      });

      testLogger.pass(testName);
    });

    test('1.7 Should close modal when clicking backdrop', async () => {
      const testName = 'Backdrop click closes modal';
      testLogger.log(`Running: ${testName}`);

      render(<App />);

      await openAddTaskModal(user);

      const backdrop = screen.getByTestId('modal-backdrop');
      await user.click(backdrop);

      await waitFor(() => {
        expect(screen.queryByTestId('task-form')).not.toBeInTheDocument();
      });

      testLogger.pass(testName);
    });
  });

  // ============================================
  // FEATURE 2: EDIT TASK
  // ============================================

  describe('Feature 2: Edit Existing Task', () => {
    beforeAll(() => {
      testLogger.section('FEATURE 2: EDIT TASK TESTS');
    });

    test('2.1 Should edit an existing task title', async () => {
      const testName = 'Edit task title';
      testLogger.log(`Running: ${testName}`);

      render(<App />);

      // Get the first task and click edit
      const taskCards = screen.getAllByTestId(/^task-card-/);
      expect(taskCards.length).toBeGreaterThan(0);

      const firstCard = taskCards[0];
      const editBtn = within(firstCard).getByRole('button', { name: /edit/i });
      await user.click(editBtn);

      // Wait for modal to open
      await waitFor(() => {
        expect(screen.getByTestId('task-form')).toBeInTheDocument();
      });

      // Update the title
      const titleInput = screen.getByTestId('task-title-input');
      await user.clear(titleInput);
      await user.type(titleInput, 'Updated Task Title');

      // Submit
      const submitBtn = screen.getByTestId('submit-btn');
      await user.click(submitBtn);

      // Verify update
      await waitFor(() => {
        expect(screen.getByText('Updated Task Title')).toBeInTheDocument();
      });

      testLogger.pass(testName);
    });

    test('2.2 Should edit task description', async () => {
      const testName = 'Edit task description';
      testLogger.log(`Running: ${testName}`);

      render(<App />);

      const taskCards = screen.getAllByTestId(/^task-card-/);
      const firstCard = taskCards[0];
      const editBtn = within(firstCard).getByRole('button', { name: /edit/i });
      await user.click(editBtn);

      await waitFor(() => {
        expect(screen.getByTestId('task-form')).toBeInTheDocument();
      });

      const descInput = screen.getByTestId('task-description-input');
      await user.clear(descInput);
      await user.type(descInput, 'New description for the task');

      const submitBtn = screen.getByTestId('submit-btn');
      await user.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText('New description for the task')).toBeInTheDocument();
      });

      testLogger.pass(testName);
    });

    test('2.3 Should preserve other fields when editing one field', async () => {
      const testName = 'Preserve fields during partial edit';
      testLogger.log(`Running: ${testName}`);

      render(<App />);

      const taskCards = screen.getAllByTestId(/^task-card-/);
      const firstCard = taskCards[0];
      
      // Get original title
      const originalTitle = within(firstCard).getByTestId(/^task-title-/).textContent;
      
      const editBtn = within(firstCard).getByRole('button', { name: /edit/i });
      await user.click(editBtn);

      await waitFor(() => {
        expect(screen.getByTestId('task-form')).toBeInTheDocument();
      });

      // Only edit description
      const descInput = screen.getByTestId('task-description-input');
      await user.clear(descInput);
      await user.type(descInput, 'Only changing description');

      const submitBtn = screen.getByTestId('submit-btn');
      await user.click(submitBtn);

      // Verify original title is preserved
      await waitFor(() => {
        expect(screen.getByText(originalTitle)).toBeInTheDocument();
      });

      testLogger.pass(testName);
    });

    test('2.4 Edge Case: Should validate edited fields', async () => {
      const testName = 'Validate edited fields';
      testLogger.log(`Running: ${testName}`);

      render(<App />);

      const taskCards = screen.getAllByTestId(/^task-card-/);
      const firstCard = taskCards[0];
      const editBtn = within(firstCard).getByRole('button', { name: /edit/i });
      await user.click(editBtn);

      await waitFor(() => {
        expect(screen.getByTestId('task-form')).toBeInTheDocument();
      });

      // Clear title
      const titleInput = screen.getByTestId('task-title-input');
      await user.clear(titleInput);

      const submitBtn = screen.getByTestId('submit-btn');
      await user.click(submitBtn);

      // Should show validation error
      await waitFor(() => {
        expect(screen.getByTestId('title-error')).toBeInTheDocument();
      });

      testLogger.pass(testName);
    });
  });

  // ============================================
  // FEATURE 3: TOGGLE TASK COMPLETION
  // ============================================

  describe('Feature 3: Mark Task as Completed/Pending', () => {
    beforeAll(() => {
      testLogger.section('FEATURE 3: TOGGLE TASK COMPLETION TESTS');
    });

    test('3.1 Should mark a pending task as completed', async () => {
      const testName = 'Mark task as completed';
      testLogger.log(`Running: ${testName}`);

      render(<App />);

      // Find a pending task and toggle it
      const pendingFilter = screen.getByTestId('filter-pending');
      await user.click(pendingFilter);

      await waitFor(() => {
        const taskCards = screen.queryAllByTestId(/^task-card-/);
        expect(taskCards.length).toBeGreaterThan(0);
      });

      const taskCards = screen.getAllByTestId(/^task-card-/);
      const firstCard = taskCards[0];
      const toggleBtn = within(firstCard).getByTestId(/^task-toggle-/);

      await user.click(toggleBtn);

      // Show all tasks and verify
      const allFilter = screen.getByTestId('filter-all');
      await user.click(allFilter);

      await waitFor(() => {
        const completedBadges = screen.getAllByText('Completed');
        expect(completedBadges.length).toBeGreaterThan(0);
      });

      testLogger.pass(testName);
    });

    test('3.2 Should mark a completed task as pending', async () => {
      const testName = 'Mark completed task as pending';
      testLogger.log(`Running: ${testName}`);

      render(<App />);

      // Find a completed task
      const completedFilter = screen.getByTestId('filter-completed');
      await user.click(completedFilter);

      await waitFor(() => {
        const taskCards = screen.queryAllByTestId(/^task-card-/);
        expect(taskCards.length).toBeGreaterThan(0);
      });

      const taskCards = screen.getAllByTestId(/^task-card-/);
      const firstCard = taskCards[0];
      const toggleBtn = within(firstCard).getByTestId(/^task-toggle-/);

      await user.click(toggleBtn);

      // Show all and verify
      const allFilter = screen.getByTestId('filter-all');
      await user.click(allFilter);

      await waitFor(() => {
        const pendingBadges = screen.getAllByText('Pending');
        expect(pendingBadges.length).toBeGreaterThan(0);
      });

      testLogger.pass(testName);
    });

    test('3.3 Should update dashboard statistics when toggling', async () => {
      const testName = 'Dashboard stats update on toggle';
      testLogger.log(`Running: ${testName}`);

      render(<App />);

      // Get initial completed count
      const initialCompleted = parseInt(
        screen.getByTestId('stat-completed-value').textContent
      );

      // Toggle a pending task to completed
      const pendingFilter = screen.getByTestId('filter-pending');
      await user.click(pendingFilter);

      await waitFor(() => {
        const taskCards = screen.queryAllByTestId(/^task-card-/);
        expect(taskCards.length).toBeGreaterThan(0);
      });

      const taskCards = screen.getAllByTestId(/^task-card-/);
      const toggleBtn = within(taskCards[0]).getByTestId(/^task-toggle-/);
      await user.click(toggleBtn);

      // Verify completed count increased
      await waitFor(() => {
        const newCompleted = parseInt(
          screen.getByTestId('stat-completed-value').textContent
        );
        expect(newCompleted).toBe(initialCompleted + 1);
      });

      testLogger.pass(testName);
    });
  });

  // ============================================
  // FEATURE 4: DELETE TASK
  // ============================================

  describe('Feature 4: Delete Task', () => {
    beforeAll(() => {
      testLogger.section('FEATURE 4: DELETE TASK TESTS');
    });

    test('4.1 Should delete a task', async () => {
      const testName = 'Delete a task';
      testLogger.log(`Running: ${testName}`);

      render(<App />);

      // Get initial task count
      const initialTotal = parseInt(
        screen.getByTestId('stat-total-value').textContent
      );

      // Delete first task
      const taskCards = screen.getAllByTestId(/^task-card-/);
      const firstCard = taskCards[0];
      const taskTitle = within(firstCard).getByTestId(/^task-title-/).textContent;
      const deleteBtn = within(firstCard).getByTestId(/^task-delete-/);

      await user.click(deleteBtn);

      // Verify task is removed
      await waitFor(() => {
        expect(screen.queryByText(taskTitle)).not.toBeInTheDocument();
      });

      // Verify total count decreased
      await waitFor(() => {
        const newTotal = parseInt(
          screen.getByTestId('stat-total-value').textContent
        );
        expect(newTotal).toBe(initialTotal - 1);
      });

      testLogger.pass(testName);
    });

    test('4.2 Should update pending count when deleting pending task', async () => {
      const testName = 'Pending count updates on delete';
      testLogger.log(`Running: ${testName}`);

      render(<App />);

      // Filter to pending tasks
      const pendingFilter = screen.getByTestId('filter-pending');
      await user.click(pendingFilter);

      await waitFor(() => {
        const taskCards = screen.queryAllByTestId(/^task-card-/);
        expect(taskCards.length).toBeGreaterThan(0);
      });

      const initialPending = parseInt(
        screen.getByTestId('stat-pending-value').textContent
      );

      const taskCards = screen.getAllByTestId(/^task-card-/);
      const deleteBtn = within(taskCards[0]).getByTestId(/^task-delete-/);
      await user.click(deleteBtn);

      await waitFor(() => {
        const newPending = parseInt(
          screen.getByTestId('stat-pending-value').textContent
        );
        expect(newPending).toBe(initialPending - 1);
      });

      testLogger.pass(testName);
    });

    test('4.3 Edge Case: Should show empty state when all tasks deleted', async () => {
      const testName = 'Empty state when all tasks deleted';
      testLogger.log(`Running: ${testName}`);

      render(<App />);

      // Delete all tasks
      let taskCards = screen.queryAllByTestId(/^task-card-/);
      
      while (taskCards.length > 0) {
        const deleteBtn = within(taskCards[0]).getByTestId(/^task-delete-/);
        await user.click(deleteBtn);
        
        await waitFor(() => {
          const currentCards = screen.queryAllByTestId(/^task-card-/);
          expect(currentCards.length).toBe(taskCards.length - 1);
        });
        
        taskCards = screen.queryAllByTestId(/^task-card-/);
      }

      // Verify empty state is shown
      await waitFor(() => {
        expect(screen.getByTestId('empty-state')).toBeInTheDocument();
      });

      testLogger.pass(testName);
    });
  });

  // ============================================
  // FEATURE 5: DASHBOARD STATISTICS
  // ============================================

  describe('Feature 5: Dashboard Statistics and Charts', () => {
    beforeAll(() => {
      testLogger.section('FEATURE 5: DASHBOARD TESTS');
    });

    test('5.1 Should display dashboard with task statistics', async () => {
      const testName = 'Dashboard displays statistics';
      testLogger.log(`Running: ${testName}`);

      render(<App />);

      // Verify dashboard elements exist
      expect(screen.getByTestId('dashboard')).toBeInTheDocument();
      expect(screen.getByTestId('stat-total')).toBeInTheDocument();
      expect(screen.getByTestId('stat-completed')).toBeInTheDocument();
      expect(screen.getByTestId('stat-pending')).toBeInTheDocument();
      expect(screen.getByTestId('completion-rate')).toBeInTheDocument();

      testLogger.pass(testName);
    });

    test('5.2 Should display correct total task count', async () => {
      const testName = 'Correct total task count';
      testLogger.log(`Running: ${testName}`);

      render(<App />);

      const taskCards = screen.getAllByTestId(/^task-card-/);
      const displayedTotal = parseInt(
        screen.getByTestId('stat-total-value').textContent
      );

      expect(displayedTotal).toBe(taskCards.length);

      testLogger.pass(testName);
    });

    test('5.3 Should calculate correct completion rate', async () => {
      const testName = 'Correct completion rate calculation';
      testLogger.log(`Running: ${testName}`);

      render(<App />);

      const total = parseInt(screen.getByTestId('stat-total-value').textContent);
      const completed = parseInt(screen.getByTestId('stat-completed-value').textContent);
      
      const expectedRate = total > 0 ? Math.round((completed / total) * 100) : 0;
      
      expect(screen.getByTestId('completion-rate')).toHaveTextContent(`${expectedRate}%`);

      testLogger.pass(testName);
    });

    test('5.4 Should display task distribution chart', async () => {
      const testName = 'Task distribution chart displayed';
      testLogger.log(`Running: ${testName}`);

      render(<App />);

      expect(screen.getByTestId('task-chart')).toBeInTheDocument();

      testLogger.pass(testName);
    });

    test('5.5 Edge Case: Dashboard shows zero stats when no tasks', async () => {
      const testName = 'Dashboard shows zeros when empty';
      testLogger.log(`Running: ${testName}`);

      render(<App />);

      // Delete all tasks
      let taskCards = screen.queryAllByTestId(/^task-card-/);
      
      while (taskCards.length > 0) {
        const deleteBtn = within(taskCards[0]).getByTestId(/^task-delete-/);
        await user.click(deleteBtn);
        await waitFor(() => {
          const currentCards = screen.queryAllByTestId(/^task-card-/);
          expect(currentCards.length).toBeLessThan(taskCards.length);
        });
        taskCards = screen.queryAllByTestId(/^task-card-/);
      }

      // Verify all stats are zero
      await waitFor(() => {
        expect(screen.getByTestId('stat-total-value')).toHaveTextContent('0');
        expect(screen.getByTestId('stat-completed-value')).toHaveTextContent('0');
        expect(screen.getByTestId('stat-pending-value')).toHaveTextContent('0');
      });

      testLogger.pass(testName);
    });
  });

  // ============================================
  // FILTER FUNCTIONALITY TESTS
  // ============================================

  describe('Filter Functionality', () => {
    beforeAll(() => {
      testLogger.section('FILTER FUNCTIONALITY TESTS');
    });

    test('Filter: Should filter to show only pending tasks', async () => {
      const testName = 'Filter pending tasks';
      testLogger.log(`Running: ${testName}`);

      render(<App />);

      const pendingFilter = screen.getByTestId('filter-pending');
      await user.click(pendingFilter);

      await waitFor(() => {
        const taskCards = screen.queryAllByTestId(/^task-card-/);
        taskCards.forEach(card => {
          expect(within(card).getByText('Pending')).toBeInTheDocument();
        });
      });

      testLogger.pass(testName);
    });

    test('Filter: Should filter to show only completed tasks', async () => {
      const testName = 'Filter completed tasks';
      testLogger.log(`Running: ${testName}`);

      render(<App />);

      const completedFilter = screen.getByTestId('filter-completed');
      await user.click(completedFilter);

      await waitFor(() => {
        const taskCards = screen.queryAllByTestId(/^task-card-/);
        taskCards.forEach(card => {
          expect(within(card).getByText('Completed')).toBeInTheDocument();
        });
      });

      testLogger.pass(testName);
    });

    test('Filter: Should show all tasks when All filter selected', async () => {
      const testName = 'Show all tasks';
      testLogger.log(`Running: ${testName}`);

      render(<App />);

      // First filter to pending
      const pendingFilter = screen.getByTestId('filter-pending');
      await user.click(pendingFilter);

      // Then switch to all
      const allFilter = screen.getByTestId('filter-all');
      await user.click(allFilter);

      const total = parseInt(screen.getByTestId('stat-total-value').textContent);
      const taskCards = screen.getAllByTestId(/^task-card-/);

      expect(taskCards.length).toBe(total);

      testLogger.pass(testName);
    });
  });

  // ============================================
  // UI/UX TESTS
  // ============================================

  describe('UI/UX Tests', () => {
    beforeAll(() => {
      testLogger.section('UI/UX TESTS');
    });

    test('UI: Header should be rendered correctly', async () => {
      const testName = 'Header rendered correctly';
      testLogger.log(`Running: ${testName}`);

      render(<App />);

      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByText('Task Dashboard')).toBeInTheDocument();
      expect(screen.getByTestId('add-task-btn')).toBeInTheDocument();

      testLogger.pass(testName);
    });

    test('UI: App container should be rendered', async () => {
      const testName = 'App container rendered';
      testLogger.log(`Running: ${testName}`);

      render(<App />);

      expect(screen.getByTestId('app-container')).toBeInTheDocument();

      testLogger.pass(testName);
    });

    test('UI: Task list section should be rendered', async () => {
      const testName = 'Task list section rendered';
      testLogger.log(`Running: ${testName}`);

      render(<App />);

      expect(screen.getByTestId('task-list-section')).toBeInTheDocument();
      expect(screen.getByTestId('task-list')).toBeInTheDocument();

      testLogger.pass(testName);
    });
  });
});
