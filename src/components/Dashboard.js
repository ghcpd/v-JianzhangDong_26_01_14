import React from 'react';

/**
 * Dashboard Component
 * Feature 5: Display task statistics with visual representation
 * Shows total tasks, completed tasks, and pending tasks with progress bars
 */
function Dashboard({ tasks }) {
  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="dashboard" data-testid="dashboard">
      <h2 className="dashboard-title">Task Overview</h2>
      
      <div className="stats-grid">
        {/* Total Tasks Card */}
        <div className="stat-card stat-card-total">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-value" data-testid="total-tasks">{totalTasks}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
        </div>

        {/* Completed Tasks Card */}
        <div className="stat-card stat-card-completed">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-value" data-testid="completed-tasks">{completedTasks}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>

        {/* Pending Tasks Card */}
        <div className="stat-card stat-card-pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <div className="stat-value" data-testid="pending-tasks">{pendingTasks}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>
      </div>

      {/* Visual Progress Chart */}
      <div className="progress-section">
        <div className="progress-header">
          <span className="progress-title">Completion Progress</span>
          <span className="progress-percentage">{completionRate}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${completionRate}%` }}
            data-testid="progress-bar"
          ></div>
        </div>
        <div className="progress-labels">
          <span className="progress-label">
            <span className="label-dot completed-dot"></span>
            Completed: {completedTasks}
          </span>
          <span className="progress-label">
            <span className="label-dot pending-dot"></span>
            Pending: {pendingTasks}
          </span>
        </div>
      </div>

      {/* Visual Bar Chart using CSS */}
      {totalTasks > 0 && (
        <div className="chart-section">
          <h3 className="chart-title">Task Distribution</h3>
          <div className="bar-chart">
            <div className="bar-item">
              <div className="bar-label">Completed</div>
              <div className="bar-container">
                <div 
                  className="bar-fill bar-completed"
                  style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
                >
                  <span className="bar-value">{completedTasks}</span>
                </div>
              </div>
            </div>
            <div className="bar-item">
              <div className="bar-label">Pending</div>
              <div className="bar-container">
                <div 
                  className="bar-fill bar-pending"
                  style={{ width: `${(pendingTasks / totalTasks) * 100}%` }}
                >
                  <span className="bar-value">{pendingTasks}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
