import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// ---------------------------------------------------------------------------
// Auto-cleanup after each test to prevent DOM contamination across files
// ---------------------------------------------------------------------------
afterEach(() => {
  cleanup();
});

// ---------------------------------------------------------------------------
// Suppress React / testing-library noise
// ---------------------------------------------------------------------------
const originalConsoleError = console.error;
console.error = (...args: unknown[]) => {
  const message = typeof args[0] === 'string' ? args[0] : '';
  if (
    message.includes('Warning:') ||
    message.includes('ReactDOM.render') ||
    message.includes('act(')
  ) {
    return;
  }
  originalConsoleError(...args);
};

export {};
