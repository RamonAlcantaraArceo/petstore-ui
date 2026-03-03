/**
 * Bun test setup file
 * Loaded before all tests via bunfig.toml [test] preload
 */

// Polyfill fetch for test environment if needed
if (typeof globalThis.fetch === 'undefined') {
  // Bun has built-in fetch, this is a safety guard
  console.warn('fetch not available in test environment');
}

// Suppress console.error noise from React in tests (e.g., prop-types warnings)
const originalConsoleError = console.error;
console.error = (...args: unknown[]) => {
  const message = typeof args[0] === 'string' ? args[0] : '';
  // Suppress known React test noise
  if (
    message.includes('Warning:') ||
    message.includes('ReactDOM.render') ||
    message.includes('act(')
  ) {
    return;
  }
  originalConsoleError(...args);
};

// Global test environment setup
export {};
