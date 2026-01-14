/**
 * Jest Setup File
 * 
 * This file configures the test environment for Jest.
 * It imports necessary polyfills and extends Jest's matchers.
 * 
 * @file src/setupTests.js
 */

// Import Jest DOM matchers for DOM assertions
import '@testing-library/jest-dom';

// Mock window.matchMedia for responsive tests
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};

// Mock ResizeObserver for Chart.js
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock HTMLCanvasElement.getContext for Chart.js
HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  fillRect: jest.fn(),
  clearRect: jest.fn(),
  getImageData: jest.fn(() => ({ data: [] })),
  putImageData: jest.fn(),
  createImageData: jest.fn(() => []),
  setTransform: jest.fn(),
  drawImage: jest.fn(),
  save: jest.fn(),
  restore: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  closePath: jest.fn(),
  stroke: jest.fn(),
  fill: jest.fn(),
  translate: jest.fn(),
  scale: jest.fn(),
  rotate: jest.fn(),
  arc: jest.fn(),
  measureText: jest.fn(() => ({ width: 0 })),
  transform: jest.fn(),
  rect: jest.fn(),
  clip: jest.fn(),
  createLinearGradient: jest.fn(() => ({ addColorStop: jest.fn() })),
  createRadialGradient: jest.fn(() => ({ addColorStop: jest.fn() })),
  canvas: {
    width: 300,
    height: 150,
    style: {},
    parentNode: null
  }
}));

// Suppress console warnings and errors during tests
const originalWarn = console.warn;
const originalError = console.error;

console.warn = (...args) => {
  if (args[0]?.includes?.('ReactDOM.render is no longer supported')) {
    return;
  }
  originalWarn.apply(console, args);
};

console.error = (...args) => {
  if (args[0]?.includes?.('Not implemented: HTMLCanvasElement.prototype.getContext') ||
      args[0]?.includes?.('Failed to create chart')) {
    return;
  }
  originalError.apply(console, args);
};
