import { beforeEach, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// ---------------------------------------------------------------------------
// Suppress React / testing-library noise via a scoped console.error spy
// ---------------------------------------------------------------------------
const originalConsoleError = console.error;
let consoleErrorMock: ReturnType<typeof vi.spyOn> | undefined;

beforeEach(() => {
  consoleErrorMock = vi
    .spyOn(console, 'error')
    .mockImplementation((...args: unknown[]) => {
      const message = typeof args[0] === 'string' ? args[0] : '';
      if (
        message.includes('Warning:') ||
        message.includes('ReactDOM.render') ||
        message.includes('act(')
      ) {
        return;
      }
      // Forward non-filtered messages to the original implementation
      originalConsoleError(...(args as Parameters<typeof originalConsoleError>));
    });
});

// ---------------------------------------------------------------------------
// Auto-cleanup after each test to prevent DOM contamination across files
// and restore console.error spy
// ---------------------------------------------------------------------------
afterEach(() => {
  cleanup();
  if (consoleErrorMock) {
    consoleErrorMock.mockRestore();
    consoleErrorMock = undefined;
  }
});

export {};
