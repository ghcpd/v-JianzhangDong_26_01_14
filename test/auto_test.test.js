/**
 * Automated Test Suite for Task Management Dashboard
 * 
 * This test file covers all 5 features with comprehensive test cases:
 * Feature 1: Add a new task
 * Feature 2: Edit an existing task
 * Feature 3: Mark task as completed/pending
 * Feature 4: Delete a task
 * Feature 5: Display dashboard statistics
 * 
 * Test Framework: Jest with React Testing Library
 * Log Output: logs/test_run.log
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';
import fs from 'fs';
import path from 'path';

// Create logs directory if it doesn't exist
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Log file path
const logFilePath = path.join(logsDir, 'test_run.log');

// Custom logger function
function logTest(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  console.log(message);
  fs.appendFileSync(logFilePath, logMessage);
}

// Clear log file before starting tests
beforeAll(() => {
  fs.writeFileSync(logFilePath, '');
  logTest('========================================');
  logTest('Task Management Dashboard - Test Suite');
  logTest('========================================');
  logTest('Starting automated tests...\n');
});

// Clear localStorage before each test
beforeEach(() => {
  localStorage.clear();
  logTest('\n--- New Test Case ---');
});

// Log test completion
afterAll(() => {
  logTest('\n========================================');
  logTest('All tests completed!');
  logTest('========================================');
});

describe('Task Management Dashboard - Comprehensive Test Suite', () => {
  
  // ========================================
  // Feature 1: Add New Task
  // ========================================
  describe('Feature 1: Add New Task', () => {
    
    test('1.1 - Should successfully add a new task with valid inputs', async () => {
      logTest('TEST 1.1: Add new task with valid inputs');
      
      render(<App />);
      
      // Click Add New Task button
      const addButton = screen.getByTestId('add-task-button');
      fireEvent.click(addButton);
      logTest('  ✓ Clicked "Add New Task" button');
      
      // Fill in the form
      const titleInput = screen.getByTestId('task-title-input');
      const descInput = screen.getByTestId('task-description-input');
      const dueDateInput = screen.getByTestId('task-duedate-input');
      
      await userEvent.type(titleInput, 'Complete project documentation');
      await userEvent.type(descInput, 'Write comprehensive documentation for the project');
      await userEvent.type(dueDateInput, '2026-01-20');
      logTest('  ✓ Filled in task details: Title, Description, Due Date');
      
      // Submit the form
      const submitButton = screen.getByTestId('submit-button');
      fireEvent.click(submitButton);
      logTest('  ✓ Submitted the form');
      
      // Verify task appears in the list
      await waitFor(() => {
        expect(screen.getByText('Complete project documentation')).toBeInTheDocument();
      });
      logTest('  ✓ Task successfully added to the list');
      
      // Verify dashboard statistics
      expect(screen.getByTestId('total-tasks')).toHaveTextContent('1');
      expect(screen.getByTestId('pending-tasks')).toHaveTextContent('1');
      expect(screen.getByTestId('completed-tasks')).toHaveTextContent('0');
      logTest('  ✓ Dashboard statistics updated correctly');
      logTest('  ✅ TEST PASSED: Task added successfully');
    });
    
    test('1.2 - Should show validation errors for empty fields', async () => {
      logTest('TEST 1.2: Validation for empty fields');
      
      render(<App />);
      
      const addButton = screen.getByTestId('add-task-button');
      fireEvent.click(addButton);
      logTest('  ✓ Opened task form');
      
      // Submit empty form
      const submitButton = screen.getByTestId('submit-button');
      fireEvent.click(submitButton);
      logTest('  ✓ Submitted empty form');
      
      // Check for validation errors
      await waitFor(() => {
        expect(screen.getByText('Title is required')).toBeInTheDocument();
        expect(screen.getByText('Description is required')).toBeInTheDocument();
        expect(screen.getByText('Due date is required')).toBeInTheDocument();
      });
      logTest('  ✓ Validation errors displayed correctly');
      logTest('  ✅ TEST PASSED: Validation working properly');
    });
    
    test('1.3 - Should add multiple tasks', async () => {
      logTest('TEST 1.3: Add multiple tasks');
      
      render(<App />);
      
      const tasks = [
        { title: 'Task 1', description: 'Description 1', dueDate: '2026-01-15' },
        { title: 'Task 2', description: 'Description 2', dueDate: '2026-01-16' },
        { title: 'Task 3', description: 'Description 3', dueDate: '2026-01-17' }
      ];
      
      for (let i = 0; i < tasks.length; i++) {
        const addButton = screen.getByTestId('add-task-button');
        fireEvent.click(addButton);
        
        const titleInput = screen.getByTestId('task-title-input');
        const descInput = screen.getByTestId('task-description-input');
        const dueDateInput = screen.getByTestId('task-duedate-input');
        
        await userEvent.type(titleInput, tasks[i].title);
        await userEvent.type(descInput, tasks[i].description);
        await userEvent.type(dueDateInput, tasks[i].dueDate);
        
        const submitButton = screen.getByTestId('submit-button');
        fireEvent.click(submitButton);
        
        logTest(`  ✓ Added task ${i + 1}: ${tasks[i].title}`);
      }
      
      // Verify all tasks are present
      await waitFor(() => {
        expect(screen.getByTestId('total-tasks')).toHaveTextContent('3');
      });
      logTest('  ✓ All 3 tasks added successfully');
      logTest('  ✅ TEST PASSED: Multiple tasks can be added');
    });
  });
  
  // ========================================
  // Feature 2: Edit Existing Task
  // ========================================
  describe('Feature 2: Edit Existing Task', () => {
    
    test('2.1 - Should edit task title, description, and due date', async () => {
      logTest('TEST 2.1: Edit existing task details');
      
      render(<App />);
      
      // First, add a task
      const addButton = screen.getByTestId('add-task-button');
      fireEvent.click(addButton);
      
      await userEvent.type(screen.getByTestId('task-title-input'), 'Original Title');
      await userEvent.type(screen.getByTestId('task-description-input'), 'Original Description');
      await userEvent.type(screen.getByTestId('task-duedate-input'), '2026-01-15');
      
      fireEvent.click(screen.getByTestId('submit-button'));
      logTest('  ✓ Created initial task');
      
      // Wait for task to appear and click edit
      await waitFor(() => {
        expect(screen.getByText('Original Title')).toBeInTheDocument();
      });
      
      // Find and click the edit button (using a more reliable selector)
      const taskCards = screen.getByTestId('task-list');
      const editButtons = taskCards.querySelectorAll('[data-testid^="edit-"]');
      fireEvent.click(editButtons[0]);
      logTest('  ✓ Clicked edit button');
      
      // Clear and update fields
      const titleInput = screen.getByTestId('task-title-input');
      const descInput = screen.getByTestId('task-description-input');
      const dueDateInput = screen.getByTestId('task-duedate-input');
      
      await userEvent.clear(titleInput);
      await userEvent.type(titleInput, 'Updated Title');
      await userEvent.clear(descInput);
      await userEvent.type(descInput, 'Updated Description');
      await userEvent.clear(dueDateInput);
      await userEvent.type(dueDateInput, '2026-01-20');
      logTest('  ✓ Updated task fields');
      
      // Submit the update
      fireEvent.click(screen.getByTestId('submit-button'));
      logTest('  ✓ Submitted updated task');
      
      // Verify updates
      await waitFor(() => {
        expect(screen.getByText('Updated Title')).toBeInTheDocument();
        expect(screen.getByText('Updated Description')).toBeInTheDocument();
      });
      logTest('  ✓ Task updated successfully in the list');
      logTest('  ✅ TEST PASSED: Task editing works correctly');
    });
    
    test('2.2 - Should cancel edit without saving changes', async () => {
      logTest('TEST 2.2: Cancel edit operation');
      
      render(<App />);
      
      // Add a task
      fireEvent.click(screen.getByTestId('add-task-button'));
      await userEvent.type(screen.getByTestId('task-title-input'), 'Test Task');
      await userEvent.type(screen.getByTestId('task-description-input'), 'Test Description');
      await userEvent.type(screen.getByTestId('task-duedate-input'), '2026-01-15');
      fireEvent.click(screen.getByTestId('submit-button'));
      logTest('  ✓ Created test task');
      
      // Click edit
      await waitFor(() => {
        const taskCards = screen.getByTestId('task-list');
        const editButtons = taskCards.querySelectorAll('[data-testid^="edit-"]');
        fireEvent.click(editButtons[0]);
      });
      logTest('  ✓ Opened edit form');
      
      // Make changes but cancel
      const titleInput = screen.getByTestId('task-title-input');
      await userEvent.clear(titleInput);
      await userEvent.type(titleInput, 'Changed Title');
      logTest('  ✓ Made changes to title');
      
      // Click cancel
      fireEvent.click(screen.getByTestId('cancel-button'));
      logTest('  ✓ Clicked cancel button');
      
      // Verify original title is still there
      expect(screen.getByText('Test Task')).toBeInTheDocument();
      logTest('  ✓ Original task unchanged');
      logTest('  ✅ TEST PASSED: Cancel works correctly');
    });
  });
  
  // ========================================
  // Feature 3: Toggle Task Completion
  // ========================================
  describe('Feature 3: Toggle Task Completion', () => {
    
    test('3.1 - Should mark task as completed', async () => {
      logTest('TEST 3.1: Mark task as completed');
      
      render(<App />);
      
      // Add a task
      fireEvent.click(screen.getByTestId('add-task-button'));
      await userEvent.type(screen.getByTestId('task-title-input'), 'Task to Complete');
      await userEvent.type(screen.getByTestId('task-description-input'), 'This will be completed');
      await userEvent.type(screen.getByTestId('task-duedate-input'), '2026-01-15');
      fireEvent.click(screen.getByTestId('submit-button'));
      logTest('  ✓ Created task');
      
      // Verify initial state
      await waitFor(() => {
        expect(screen.getByTestId('completed-tasks')).toHaveTextContent('0');
        expect(screen.getByTestId('pending-tasks')).toHaveTextContent('1');
      });
      logTest('  ✓ Initial state: 0 completed, 1 pending');
      
      // Toggle completion
      const taskList = screen.getByTestId('task-list');
      const checkboxes = taskList.querySelectorAll('[data-testid^="toggle-"]');
      fireEvent.click(checkboxes[0]);
      logTest('  ✓ Clicked completion checkbox');
      
      // Verify completed state
      await waitFor(() => {
        expect(screen.getByTestId('completed-tasks')).toHaveTextContent('1');
        expect(screen.getByTestId('pending-tasks')).toHaveTextContent('0');
      });
      logTest('  ✓ Updated state: 1 completed, 0 pending');
      logTest('  ✅ TEST PASSED: Task marked as completed');
    });
    
    test('3.2 - Should toggle task between completed and pending', async () => {
      logTest('TEST 3.2: Toggle task between states');
      
      render(<App />);
      
      // Add a task
      fireEvent.click(screen.getByTestId('add-task-button'));
      await userEvent.type(screen.getByTestId('task-title-input'), 'Toggle Task');
      await userEvent.type(screen.getByTestId('task-description-input'), 'This will be toggled');
      await userEvent.type(screen.getByTestId('task-duedate-input'), '2026-01-15');
      fireEvent.click(screen.getByTestId('submit-button'));
      logTest('  ✓ Created task');
      
      const taskList = screen.getByTestId('task-list');
      const checkbox = taskList.querySelector('[data-testid^="toggle-"]');
      
      // Toggle to completed
      fireEvent.click(checkbox);
      await waitFor(() => {
        expect(screen.getByTestId('completed-tasks')).toHaveTextContent('1');
      });
      logTest('  ✓ Toggled to completed');
      
      // Toggle back to pending
      fireEvent.click(checkbox);
      await waitFor(() => {
        expect(screen.getByTestId('pending-tasks')).toHaveTextContent('1');
        expect(screen.getByTestId('completed-tasks')).toHaveTextContent('0');
      });
      logTest('  ✓ Toggled back to pending');
      logTest('  ✅ TEST PASSED: Toggle works both ways');
    });
  });
  
  // ========================================
  // Feature 4: Delete Task
  // ========================================
  describe('Feature 4: Delete Task', () => {
    
    test('4.1 - Should delete a task', async () => {
      logTest('TEST 4.1: Delete a task');
      
      // Mock window.confirm to auto-confirm
      window.confirm = jest.fn(() => true);
      
      render(<App />);
      
      // Add a task
      fireEvent.click(screen.getByTestId('add-task-button'));
      await userEvent.type(screen.getByTestId('task-title-input'), 'Task to Delete');
      await userEvent.type(screen.getByTestId('task-description-input'), 'This will be deleted');
      await userEvent.type(screen.getByTestId('task-duedate-input'), '2026-01-15');
      fireEvent.click(screen.getByTestId('submit-button'));
      logTest('  ✓ Created task');
      
      // Verify task exists
      await waitFor(() => {
        expect(screen.getByText('Task to Delete')).toBeInTheDocument();
        expect(screen.getByTestId('total-tasks')).toHaveTextContent('1');
      });
      logTest('  ✓ Verified task exists (total: 1)');
      
      // Delete the task
      const taskList = screen.getByTestId('task-list');
      const deleteButtons = taskList.querySelectorAll('[data-testid^="delete-"]');
      fireEvent.click(deleteButtons[0]);
      logTest('  ✓ Clicked delete button');
      
      // Verify task is deleted
      await waitFor(() => {
        expect(screen.queryByText('Task to Delete')).not.toBeInTheDocument();
        expect(screen.getByTestId('total-tasks')).toHaveTextContent('0');
      });
      logTest('  ✓ Task deleted successfully (total: 0)');
      logTest('  ✅ TEST PASSED: Task deletion works');
    });
    
    test('4.2 - Should handle canceling delete operation', async () => {
      logTest('TEST 4.2: Cancel delete operation');
      
      // Mock window.confirm to cancel
      window.confirm = jest.fn(() => false);
      
      render(<App />);
      
      // Add a task
      fireEvent.click(screen.getByTestId('add-task-button'));
      await userEvent.type(screen.getByTestId('task-title-input'), 'Task to Keep');
      await userEvent.type(screen.getByTestId('task-description-input'), 'This will not be deleted');
      await userEvent.type(screen.getByTestId('task-duedate-input'), '2026-01-15');
      fireEvent.click(screen.getByTestId('submit-button'));
      logTest('  ✓ Created task');
      
      // Try to delete but cancel
      await waitFor(() => {
        const taskList = screen.getByTestId('task-list');
        const deleteButtons = taskList.querySelectorAll('[data-testid^="delete-"]');
        fireEvent.click(deleteButtons[0]);
      });
      logTest('  ✓ Clicked delete and canceled');
      
      // Verify task still exists
      expect(screen.getByText('Task to Keep')).toBeInTheDocument();
      expect(screen.getByTestId('total-tasks')).toHaveTextContent('1');
      logTest('  ✓ Task still exists (cancel worked)');
      logTest('  ✅ TEST PASSED: Cancel delete works');
    });
    
    test('4.3 - Should delete multiple tasks', async () => {
      logTest('TEST 4.3: Delete multiple tasks');
      
      window.confirm = jest.fn(() => true);
      
      render(<App />);
      
      // Add 3 tasks
      for (let i = 1; i <= 3; i++) {
        fireEvent.click(screen.getByTestId('add-task-button'));
        await userEvent.type(screen.getByTestId('task-title-input'), `Task ${i}`);
        await userEvent.type(screen.getByTestId('task-description-input'), `Description ${i}`);
        await userEvent.type(screen.getByTestId('task-duedate-input'), '2026-01-15');
        fireEvent.click(screen.getByTestId('submit-button'));
      }
      logTest('  ✓ Created 3 tasks');
      
      await waitFor(() => {
        expect(screen.getByTestId('total-tasks')).toHaveTextContent('3');
      });
      logTest('  ✓ Verified total: 3');
      
      // Delete 2 tasks
      for (let i = 0; i < 2; i++) {
        const taskList = screen.getByTestId('task-list');
        const deleteButtons = taskList.querySelectorAll('[data-testid^="delete-"]');
        fireEvent.click(deleteButtons[0]);
        await waitFor(() => {
          expect(screen.getByTestId('total-tasks')).toHaveTextContent((3 - i - 1).toString());
        });
        logTest(`  ✓ Deleted task ${i + 1}`);
      }
      
      expect(screen.getByTestId('total-tasks')).toHaveTextContent('1');
      logTest('  ✓ Final total: 1 task remaining');
      logTest('  ✅ TEST PASSED: Multiple deletions work');
    });
  });
  
  // ========================================
  // Feature 5: Dashboard Statistics
  // ========================================
  describe('Feature 5: Dashboard Statistics', () => {
    
    test('5.1 - Should display correct statistics', async () => {
      logTest('TEST 5.1: Dashboard statistics accuracy');
      
      render(<App />);
      
      // Initial state
      expect(screen.getByTestId('total-tasks')).toHaveTextContent('0');
      expect(screen.getByTestId('completed-tasks')).toHaveTextContent('0');
      expect(screen.getByTestId('pending-tasks')).toHaveTextContent('0');
      logTest('  ✓ Initial state: 0/0/0');
      
      // Add 5 tasks
      for (let i = 1; i <= 5; i++) {
        fireEvent.click(screen.getByTestId('add-task-button'));
        await userEvent.type(screen.getByTestId('task-title-input'), `Task ${i}`);
        await userEvent.type(screen.getByTestId('task-description-input'), `Description ${i}`);
        await userEvent.type(screen.getByTestId('task-duedate-input'), '2026-01-15');
        fireEvent.click(screen.getByTestId('submit-button'));
      }
      logTest('  ✓ Added 5 tasks');
      
      await waitFor(() => {
        expect(screen.getByTestId('total-tasks')).toHaveTextContent('5');
        expect(screen.getByTestId('pending-tasks')).toHaveTextContent('5');
      });
      logTest('  ✓ Statistics: Total=5, Pending=5, Completed=0');
      
      // Complete 3 tasks
      const taskList = screen.getByTestId('task-list');
      const checkboxes = taskList.querySelectorAll('[data-testid^="toggle-"]');
      for (let i = 0; i < 3; i++) {
        fireEvent.click(checkboxes[i]);
      }
      logTest('  ✓ Completed 3 tasks');
      
      await waitFor(() => {
        expect(screen.getByTestId('completed-tasks')).toHaveTextContent('3');
        expect(screen.getByTestId('pending-tasks')).toHaveTextContent('2');
      });
      logTest('  ✓ Statistics: Total=5, Pending=2, Completed=3');
      logTest('  ✅ TEST PASSED: Statistics are accurate');
    });
    
    test('5.2 - Should calculate completion percentage correctly', async () => {
      logTest('TEST 5.2: Completion percentage calculation');
      
      render(<App />);
      
      // Add 10 tasks
      for (let i = 1; i <= 10; i++) {
        fireEvent.click(screen.getByTestId('add-task-button'));
        await userEvent.type(screen.getByTestId('task-title-input'), `Task ${i}`);
        await userEvent.type(screen.getByTestId('task-description-input'), `Description ${i}`);
        await userEvent.type(screen.getByTestId('task-duedate-input'), '2026-01-15');
        fireEvent.click(screen.getByTestId('submit-button'));
      }
      logTest('  ✓ Added 10 tasks');
      
      // Complete 5 tasks (50%)
      await waitFor(() => {
        const taskList = screen.getByTestId('task-list');
        const checkboxes = taskList.querySelectorAll('[data-testid^="toggle-"]');
        for (let i = 0; i < 5; i++) {
          fireEvent.click(checkboxes[i]);
        }
      });
      logTest('  ✓ Completed 5 tasks');
      
      // Check progress bar width
      await waitFor(() => {
        const progressBar = screen.getByTestId('progress-bar');
        expect(progressBar).toHaveStyle({ width: '50%' });
      });
      logTest('  ✓ Progress bar: 50%');
      logTest('  ✅ TEST PASSED: Percentage calculation correct');
    });
    
    test('5.3 - Should handle edge case of no tasks', () => {
      logTest('TEST 5.3: Dashboard with no tasks');
      
      render(<App />);
      
      expect(screen.getByTestId('total-tasks')).toHaveTextContent('0');
      expect(screen.getByTestId('completed-tasks')).toHaveTextContent('0');
      expect(screen.getByTestId('pending-tasks')).toHaveTextContent('0');
      logTest('  ✓ All statistics show 0');
      
      const progressBar = screen.getByTestId('progress-bar');
      expect(progressBar).toHaveStyle({ width: '0%' });
      logTest('  ✓ Progress bar: 0%');
      logTest('  ✅ TEST PASSED: Handles empty state');
    });
  });
  
  // ========================================
  // Integration Tests
  // ========================================
  describe('Integration Tests', () => {
    
    test('6.1 - Should persist tasks in localStorage', async () => {
      logTest('TEST 6.1: LocalStorage persistence');
      
      const { unmount } = render(<App />);
      
      // Add a task
      fireEvent.click(screen.getByTestId('add-task-button'));
      await userEvent.type(screen.getByTestId('task-title-input'), 'Persistent Task');
      await userEvent.type(screen.getByTestId('task-description-input'), 'Should persist');
      await userEvent.type(screen.getByTestId('task-duedate-input'), '2026-01-15');
      fireEvent.click(screen.getByTestId('submit-button'));
      logTest('  ✓ Added task');
      
      // Wait for task to appear
      await waitFor(() => {
        expect(screen.getByText('Persistent Task')).toBeInTheDocument();
      });
      
      // Check localStorage
      const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      expect(savedTasks).toHaveLength(1);
      expect(savedTasks[0].title).toBe('Persistent Task');
      logTest('  ✓ Task saved to localStorage');
      
      // Unmount and remount
      unmount();
      render(<App />);
      logTest('  ✓ Remounted app');
      
      // Verify task is still there
      await waitFor(() => {
        expect(screen.getByText('Persistent Task')).toBeInTheDocument();
      });
      logTest('  ✓ Task loaded from localStorage');
      logTest('  ✅ TEST PASSED: Persistence works');
    });
    
    test('6.2 - Should handle complex workflow', async () => {
      logTest('TEST 6.2: Complex workflow test');
      
      window.confirm = jest.fn(() => true);
      
      render(<App />);
      
      // Add 3 tasks
      for (let i = 1; i <= 3; i++) {
        fireEvent.click(screen.getByTestId('add-task-button'));
        await userEvent.type(screen.getByTestId('task-title-input'), `Task ${i}`);
        await userEvent.type(screen.getByTestId('task-description-input'), `Description ${i}`);
        await userEvent.type(screen.getByTestId('task-duedate-input'), '2026-01-15');
        fireEvent.click(screen.getByTestId('submit-button'));
      }
      logTest('  ✓ Added 3 tasks');
      
      // Complete task 1
      await waitFor(() => {
        const taskList = screen.getByTestId('task-list');
        const checkboxes = taskList.querySelectorAll('[data-testid^="toggle-"]');
        fireEvent.click(checkboxes[0]);
      });
      logTest('  ✓ Completed task 1');
      
      // Edit task 2
      await waitFor(() => {
        const taskList = screen.getByTestId('task-list');
        const editButtons = taskList.querySelectorAll('[data-testid^="edit-"]');
        fireEvent.click(editButtons[1]);
      });
      
      const titleInput = screen.getByTestId('task-title-input');
      await userEvent.clear(titleInput);
      await userEvent.type(titleInput, 'Task 2 Modified');
      fireEvent.click(screen.getByTestId('submit-button'));
      logTest('  ✓ Edited task 2');
      
      // Delete task 3
      await waitFor(() => {
        const taskList = screen.getByTestId('task-list');
        const deleteButtons = taskList.querySelectorAll('[data-testid^="delete-"]');
        fireEvent.click(deleteButtons[deleteButtons.length - 1]);
      });
      logTest('  ✓ Deleted task 3');
      
      // Verify final state
      await waitFor(() => {
        expect(screen.getByTestId('total-tasks')).toHaveTextContent('2');
        expect(screen.getByTestId('completed-tasks')).toHaveTextContent('1');
        expect(screen.getByTestId('pending-tasks')).toHaveTextContent('1');
      });
      logTest('  ✓ Final state: Total=2, Completed=1, Pending=1');
      logTest('  ✅ TEST PASSED: Complex workflow completed successfully');
    });
  });
});
