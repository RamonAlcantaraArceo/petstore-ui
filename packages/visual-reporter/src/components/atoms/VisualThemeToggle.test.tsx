import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { VisualThemeToggle } from './VisualThemeToggle';

describe('VisualThemeToggle', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset document root theme attribute
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('renders as a button', () => {
    render(<VisualThemeToggle />);
    const button = screen.getByRole('button', { name: /switch to light mode/i });
    expect(button).toBeTruthy();
  });

  it('initializes with dark theme by default', () => {
    render(<VisualThemeToggle />);
    const button = screen.getByRole('button');
    expect(button.textContent).toBe('☀️');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('toggles between light and dark themes', async () => {
    render(<VisualThemeToggle />);
    const button = screen.getByRole('button');

    // Initial state: dark theme
    expect(button.textContent).toBe('☀️');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    // Toggle to light theme
    fireEvent.click(button);
    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
      expect(button.textContent).toBe('🌙');
    });

    // Toggle back to dark theme
    fireEvent.click(button);
    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
      expect(button.textContent).toBe('☀️');
    });
  });

  it('persists theme preference to localStorage', async () => {
    render(<VisualThemeToggle />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    await waitFor(() => {
      expect(localStorage.getItem('visual-report-theme')).toBe('light');
    });

    fireEvent.click(button);
    await waitFor(() => {
      expect(localStorage.getItem('visual-report-theme')).toBe('dark');
    });
  });

  it('restores theme from localStorage on mount', () => {
    localStorage.setItem('visual-report-theme', 'light');
    render(<VisualThemeToggle />);

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    const button = screen.getByRole('button');
    expect(button.textContent).toBe('🌙');
  });

  it('updates aria-label when theme changes', async () => {
    render(<VisualThemeToggle />);
    const button = screen.getByRole('button');

    expect(button.getAttribute('aria-label')).toBe('Switch to light mode');

    fireEvent.click(button);
    await waitFor(() => {
      expect(button.getAttribute('aria-label')).toBe('Switch to dark mode');
    });
  });

  it('updates title when theme changes', async () => {
    render(<VisualThemeToggle />);
    const button = screen.getByRole('button');

    expect(button.getAttribute('title')).toBe('Switch to light mode');

    fireEvent.click(button);
    await waitFor(() => {
      expect(button.getAttribute('title')).toBe('Switch to dark mode');
    });
  });
});
