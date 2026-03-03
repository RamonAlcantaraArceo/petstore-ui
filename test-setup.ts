/**
 * Bun test setup file
 * Loaded before all tests via bunfig.toml [test] preload
 *
 * Sets up happy-dom GlobalWindow BEFORE test file imports resolve.
 * This ensures `document` is defined when @testing-library/dom's `screen`
 * module initialises its query bindings.
 */

import { GlobalWindow } from 'happy-dom';

// ---------------------------------------------------------------------------
// DOM environment — set up before any test file import sees globalThis
// ---------------------------------------------------------------------------
const happyWindow = new GlobalWindow({ url: 'http://localhost/' });

(globalThis as any).window = happyWindow;
(globalThis as any).document = (happyWindow as any).document;
(globalThis as any).navigator = (happyWindow as any).navigator;
(globalThis as any).location = (happyWindow as any).location;
(globalThis as any).history = (happyWindow as any).history;
(globalThis as any).getComputedStyle = (happyWindow as any).getComputedStyle?.bind(happyWindow);
(globalThis as any).MutationObserver = (happyWindow as any).MutationObserver;
(globalThis as any).Element = (happyWindow as any).Element;
(globalThis as any).HTMLElement = (happyWindow as any).HTMLElement;
(globalThis as any).Node = (happyWindow as any).Node;
(globalThis as any).Event = (happyWindow as any).Event;
(globalThis as any).CustomEvent = (happyWindow as any).CustomEvent;
(globalThis as any).KeyboardEvent = (happyWindow as any).KeyboardEvent;
(globalThis as any).MouseEvent = (happyWindow as any).MouseEvent;
(globalThis as any).FocusEvent = (happyWindow as any).FocusEvent;
(globalThis as any).InputEvent = (happyWindow as any).InputEvent;
(globalThis as any).HTMLInputElement = (happyWindow as any).HTMLInputElement;
(globalThis as any).HTMLButtonElement = (happyWindow as any).HTMLButtonElement;
(globalThis as any).requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(cb, 0);
(globalThis as any).cancelAnimationFrame = clearTimeout;
(globalThis as any).localStorage = (happyWindow as any).localStorage;
(globalThis as any).sessionStorage = (happyWindow as any).sessionStorage;

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
