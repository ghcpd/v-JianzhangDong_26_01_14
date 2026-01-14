/**
 * Dashboard Component
 * 
 * Displays task statistics and visual charts:
 * - Total tasks count
 * - Completed tasks count
 * - Pending tasks count
 * - Completion rate percentage
 * - Doughnut chart for visual representation
 * 
 * Design Notes:
 * - Card-based layout for clear information grouping
 * - Color-coded stats for quick recognition
 * - Chart.js integration for data visualization
 * 
 * @file src/components/Dashboard.js
 */

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './Dashboard.css';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * StatCard Component
 * Displays a single statistic with icon, value, and label
 * 
 * @param {Object} props
 * @param {string} props.icon - SVG icon path
 * @param {string} props.label - Stat label text
 * @param {number} props.value - Stat value
 * @param {string} props.color - Accent color for the card
 * @param {string} props.testId - Test ID for automated testing
 */
function StatCard({ icon, label, value, color, testId }) {
  return (
    <div 
      className={`stat-card stat-card--${color}`}
      data-testid={testId}
    >
      <div className="stat-icon-wrapper">
        <svg 
          className="stat-icon" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d={icon} />
        </svg>
      </div>
      <div className="stat-content">
        <span className="stat-value" data-testid={`${testId}-value`}>{value}</span>
        <span className="stat-label">{label}</span>
      </div>
    </div>
  );
}

/**
 * Dashboard Component
 * 
 * @param {Object} props
 * @param {Object} props.stats - Task statistics object
 * @param {number} props.stats.total - Total number of tasks
 * @param {number} props.stats.completed - Number of completed tasks
 * @param {number} props.stats.pending - Number of pending tasks
 * @param {number} props.stats.completionRate - Completion percentage
 * @param {Array} props.tasks - Array of task objects
 * @returns {JSX.Element} Dashboard with stats and charts
 */
function Dashboard({ stats, tasks }) {
  // Icon paths for stat cards
  const icons = {
    total: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    completed: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    pending: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
  };

  /**
   * Chart.js data configuration
   * Doughnut chart showing completed vs pending tasks
   */
  const chartData = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        data: [stats.completed, stats.pending],
        backgroundColor: [
          'rgba(76, 175, 80, 0.8)',   // Success green for completed
          'rgba(255, 152, 0, 0.8)'     // Warning orange for pending
        ],
        borderColor: [
          'rgba(76, 175, 80, 1)',
          'rgba(255, 152, 0, 1)'
        ],
        borderWidth: 2,
        hoverOffset: 4
      }
    ]
  };

  /**
   * Chart.js options configuration
   */
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            family: "'Inter', sans-serif",
            size: 13
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(51, 51, 51, 0.95)',
        padding: 12,
        titleFont: {
          family: "'Inter', sans-serif",
          size: 14,
          weight: 600
        },
        bodyFont: {
          family: "'Inter', sans-serif",
          size: 13
        },
        cornerRadius: 8
      }
    },
    cutout: '65%'
  };

  return (
    <aside className="dashboard" data-testid="dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <h2 className="section-title">
          <svg 
            className="section-title-icon" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
          Dashboard
        </h2>
      </div>

      {/* Statistics Cards Grid */}
      <div className="stats-grid">
        <StatCard
          icon={icons.total}
          label="Total Tasks"
          value={stats.total}
          color="blue"
          testId="stat-total"
        />
        <StatCard
          icon={icons.completed}
          label="Completed"
          value={stats.completed}
          color="green"
          testId="stat-completed"
        />
        <StatCard
          icon={icons.pending}
          label="Pending"
          value={stats.pending}
          color="orange"
          testId="stat-pending"
        />
      </div>

      {/* Completion Rate Display */}
      <div className="completion-rate" data-testid="completion-rate">
        <span className="completion-label">Completion Rate</span>
        <div className="completion-bar">
          <div 
            className="completion-fill" 
            style={{ width: `${stats.completionRate}%` }}
            data-testid="completion-fill"
          />
        </div>
        <span className="completion-value">{stats.completionRate}%</span>
      </div>

      {/* Chart Section */}
      <div className="chart-container" data-testid="task-chart">
        <h3 className="chart-title">Task Distribution</h3>
        {stats.total > 0 ? (
          <div className="chart-wrapper">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
        ) : (
          <div className="chart-empty">
            <p>No tasks yet. Add your first task!</p>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Dashboard;
