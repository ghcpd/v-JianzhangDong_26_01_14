import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

/**
 * Main Application Component
 * Manages the state for all tasks and provides CRUD operations
 */
function App() {
  // State management for tasks
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  /**
   * Feature 1: Add a new task
   * @param {Object} task - Task object with title, description, and dueDate
   */
  const addTask = (task) => {
    const newTask = {
      id: Date.now(), // Simple unique ID generation
      ...task,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks([...tasks, newTask]);
    setShowForm(false);
  };

  /**
   * Feature 2: Edit an existing task
   * @param {Object} updatedTask - Updated task object
   */
  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? { ...task, ...updatedTask } : task
    ));
    setEditingTask(null);
    setShowForm(false);
  };

  /**
   * Feature 3: Toggle task completion status
   * @param {number} id - Task ID
   */
  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  /**
   * Feature 4: Delete a task
   * @param {number} id - Task ID
   */
  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  // Handle edit button click
  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  // Handle cancel action
  const handleCancel = () => {
    setEditingTask(null);
    setShowForm(false);
  };

  return (
    <div className="app">
      {/* Header Section */}
      <header className="app-header">
        <h1 className="app-title">📋 Task Management Dashboard</h1>
        <p className="app-subtitle">Organize your daily tasks efficiently</p>
      </header>

      {/* Main Content Container */}
      <div className="container">
        {/* Feature 5: Dashboard with statistics and visual charts */}
        <Dashboard tasks={tasks} />

        {/* Add New Task Button */}
        <div className="actions-section">
          {!showForm && (
            <button 
              className="btn-primary btn-add-task"
              onClick={() => setShowForm(true)}
              data-testid="add-task-button"
            >
              + Add New Task
            </button>
          )}
        </div>

        {/* Task Form (Add/Edit) */}
        {showForm && (
          <TaskForm
            task={editingTask}
            onSubmit={editingTask ? updateTask : addTask}
            onCancel={handleCancel}
          />
        )}

        {/* Task List */}
        <TaskList
          tasks={tasks}
          onToggleComplete={toggleComplete}
          onEdit={handleEdit}
          onDelete={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;
