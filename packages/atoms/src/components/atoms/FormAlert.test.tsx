import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { FormAlert } from './FormAlert';

describe('FormAlert', () => {
  it('renders the alert message', () => {
    const { getByText } = render(<FormAlert message="Invalid username or password." />);
    expect(getByText('Invalid username or password.')).toBeDefined();
  });

  it('exposes stable component and variant selectors', () => {
    const { container } = render(<FormAlert message="Network error" tone="warning" />);
    const alert = container.querySelector('[data-component="FormAlert"]');
    expect(alert).toBeDefined();
    expect(alert?.getAttribute('data-variant')).toBe('warning');
  });

  it('uses alert semantics and assertive live region for error tone', () => {
    const { container } = render(<FormAlert message="Authentication failed" />);
    const alert = container.querySelector('[data-component="FormAlert"]');
    expect(alert?.getAttribute('role')).toBe('alert');
    expect(alert?.getAttribute('aria-live')).toBe('assertive');
  });

  it('uses polite live region for success tone', () => {
    const { container } = render(<FormAlert message="Saved successfully" tone="success" />);
    const alert = container.querySelector('[data-component="FormAlert"]');
    expect(alert?.getAttribute('aria-live')).toBe('polite');
  });

  it('applies custom class names', () => {
    const { container } = render(<FormAlert message="Error" className="custom-alert" />);
    const alert = container.querySelector('[data-component="FormAlert"]');
    expect(alert?.className).toContain('custom-alert');
  });
});
