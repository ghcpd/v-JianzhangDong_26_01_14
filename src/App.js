/**
 * Main Application Component
 * 
 * This is the root component that manages the entire task management dashboard.
 * It handles state management for tasks and coordinates between child components.
 * 
 * Features:
 * 1. Add new tasks with title, description, and due date
 * 2. Edit existing tasks
 * 3. Mark tasks as completed/pending
 * 4. Delete tasks
 * 5. Display statistics dashboard with charts
 * 
 * @file src/App.js
 */

import React, { useState, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Modal from './components/Modal';
import './App.css';

/**
 * Initial sample tasks for demonstration
 * These provide a starting point to showcase the dashboard functionality
 */
const INITIAL_TASKS = [
  {
    id: uuidv4(),
    title: 'Complete project proposal',
    description: 'Draft and submit the Q1 project proposal to the team lead',
    dueDate: '2026-01-20',
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Review code changes',
    description: 'Review pull requests from the development team',
    dueDate: '2026-01-15',
    completed: true,
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Team meeting preparation',
    description: 'Prepare slides and agenda for the weekly team sync',
    dueDate: '2026-01-16',
    completed: false,
    createdAt: new Date().toISOString()
  }
];

/**
 * App Component
 * 
 * Main application component that manages:
 * - Task state (CRUD operations)
 * - Modal state for add/edit forms
 * - Task statistics calculation
 */
function App() {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  
  /**
   * Tasks array state
   * Each task object contains: id, title, description, dueDate, completed, createdAt
   */
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  
  /**
   * Modal visibility state
   * Controls whether the task form modal is shown
   */
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  /**
   * Task being edited state
   * When null, the form is in "add" mode; otherwise, it's in "edit" mode
   */
  const [editingTask, setEditingTask] = useState(null);

  // ============================================
  // COMPUTED VALUES (MEMOIZED)
  // ============================================
  
  /**
   * Calculate task statistics for the dashboard
   * Memoized to prevent unnecessary recalculations
   */
  const taskStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { total, completed, pending, completionRate };
  }, [tasks]);

  // ============================================
  // TASK OPERATIONS (CALLBACKS)
  // ============================================
  
  /**
   * Feature 1: Add a new task
   * Creates a task with a unique ID and adds it to the task list
   * 
   * @param {Object} taskData - Task data containing title, description, dueDate
   */
  const handleAddTask = useCallback((taskData) => {
    const newTask = {
      id: uuidv4(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
    setIsModalOpen(false);
    
    console.log('[Task Added]', newTask.title);
  }, []);

  /**
   * Feature 2: Edit an existing task
   * Updates task details while preserving ID and creation date
   * 
   * @param {Object} taskData - Updated task data
   */
  const handleEditTask = useCallback((taskData) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === editingTask.id 
          ? { ...task, ...taskData, updatedAt: new Date().toISOString() }
          : task
      )
    );
    
    setEditingTask(null);
    setIsModalOpen(false);
    
    console.log('[Task Updated]', taskData.title);
  }, [editingTask]);

  /**
   * Feature 3: Toggle task completion status
   * Switches between completed and pending states
   * 
   * @param {string} taskId - ID of the task to toggle
   */
  const handleToggleComplete = useCallback((taskId) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
          : task
      )
    );
    
    const task = tasks.find(t => t.id === taskId);
    console.log('[Task Status Changed]', task?.title, '→', !task?.completed ? 'Completed' : 'Pending');
  }, [tasks]);

  /**
   * Feature 4: Delete a task
   * Removes a task from the list permanently
   * 
   * @param {string} taskId - ID of the task to delete
   */
  const handleDeleteTask = useCallback((taskId) => {
    const task = tasks.find(t => t.id === taskId);
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    
    console.log('[Task Deleted]', task?.title);
  }, [tasks]);

  // ============================================
  // MODAL OPERATIONS
  // ============================================
  
  /**
   * Open modal for adding a new task
   */
  const openAddModal = useCallback(() => {
    setEditingTask(null);
    setIsModalOpen(true);
  }, []);

  /**
   * Open modal for editing an existing task
   * 
   * @param {Object} task - Task to edit
   */
  const openEditModal = useCallback((task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  }, []);

  /**
   * Close the modal and reset editing state
   */
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingTask(null);
  }, []);

  // ============================================
  // FORM SUBMISSION HANDLER
  // ============================================
  
  /**
   * Handle form submission for both add and edit operations
   * Delegates to the appropriate handler based on modal mode
   * 
   * @param {Object} taskData - Task data from the form
   */
  const handleFormSubmit = useCallback((taskData) => {
    if (editingTask) {
      handleEditTask(taskData);
    } else {
      handleAddTask(taskData);
    }
  }, [editingTask, handleEditTask, handleAddTask]);

  // ============================================
  // RENDER
  // ============================================
  
  return (
    <div className="app" data-testid="app-container">
      {/* Application Header with Add Task Button */}
      <Header onAddTask={openAddModal} />
      
      {/* Main Content Area */}
      <main className="main-content">
        {/* Feature 5: Statistics Dashboard with Charts */}
        <Dashboard stats={taskStats} tasks={tasks} />
        
        {/* Task List Section */}
        <TaskList 
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onEdit={openEditModal}
          onDelete={handleDeleteTask}
        />
      </main>
      
      {/* Modal for Add/Edit Task Form */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        title={editingTask ? 'Edit Task' : 'Add New Task'}
      >
        <TaskForm 
          task={editingTask}
          onSubmit={handleFormSubmit}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
}

export default App;
