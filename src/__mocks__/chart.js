/**
 * Mock for chart.js
 * 
 * This mock provides empty implementations for Chart.js to avoid
 * canvas-related issues in the JSDOM testing environment.
 */

export const Chart = {
  register: jest.fn(),
  unregister: jest.fn(),
  defaults: {
    global: {},
    plugins: {}
  }
};

export const ArcElement = {};
export const Tooltip = {};
export const Legend = {};
export const CategoryScale = {};
export const LinearScale = {};
export const BarElement = {};
export const Title = {};
export const PointElement = {};
export const LineElement = {};

export default Chart;
