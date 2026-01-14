/**
 * Mock for react-chartjs-2
 * 
 * This mock replaces the Chart.js charts with simple divs for testing purposes.
 * This avoids the canvas context issues in JSDOM.
 */

import React from 'react';

export const Doughnut = ({ data, options }) => (
  <div data-testid="mock-doughnut-chart" className="mock-chart">
    <span>Mock Doughnut Chart</span>
    <span>Labels: {data?.labels?.join(', ')}</span>
    <span>Data: {data?.datasets?.[0]?.data?.join(', ')}</span>
  </div>
);

export const Bar = ({ data, options }) => (
  <div data-testid="mock-bar-chart" className="mock-chart">
    <span>Mock Bar Chart</span>
  </div>
);

export const Line = ({ data, options }) => (
  <div data-testid="mock-line-chart" className="mock-chart">
    <span>Mock Line Chart</span>
  </div>
);

export const Pie = ({ data, options }) => (
  <div data-testid="mock-pie-chart" className="mock-chart">
    <span>Mock Pie Chart</span>
  </div>
);

export const Chart = () => <div data-testid="mock-chart">Mock Chart</div>;

export default { Doughnut, Bar, Line, Pie, Chart };
