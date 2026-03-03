import { describe, it, expect, mock } from 'bun:test';
import { render } from '@testing-library/react';
import React from 'react';
import { LocaleProvider } from '../../i18n';
import { Button } from './Button';

function renderWithLocale(ui: React.ReactElement) {
  const result = render(<LocaleProvider locale="en">{ui}</LocaleProvider>);
  return result;
}

describe('Button', () => {
  describe('rendering', () => {
    it('renders children correctly', () => {
      const { getByRole, getByText } = renderWithLocale(<Button>Click me</Button>);
      expect(getByRole('button')).toBeDefined();
      expect(getByText('Click me')).toBeDefined();
    });

    it('applies primary variant class by default', () => {
      const { container } = renderWithLocale(<Button>Primary</Button>);
      const btn = container.querySelector('button')!;
      expect(btn.className).toContain('btn--primary');
    });

    it('applies secondary variant class', () => {
      const { container } = renderWithLocale(<Button variant="secondary">Secondary</Button>);
      expect(container.querySelector('button')!.className).toContain('btn--secondary');
    });

    it('applies danger variant class', () => {
      const { container } = renderWithLocale(<Button variant="danger">Danger</Button>);
      expect(container.querySelector('button')!.className).toContain('btn--danger');
    });

    it('applies size classes', () => {
      const { container: c1 } = renderWithLocale(<Button size="small">S</Button>);
      expect(c1.querySelector('button')!.className).toContain('btn--small');

      const { container: c2 } = renderWithLocale(<Button size="large">L</Button>);
      expect(c2.querySelector('button')!.className).toContain('btn--large');
    });

    it('renders with type="submit"', () => {
      const { container } = renderWithLocale(<Button type="submit">Submit</Button>);
      expect(container.querySelector('button')!.getAttribute('type')).toBe('submit');
    });
  });

  describe('states', () => {
    it('is disabled when disabled prop is true', () => {
      const { container } = renderWithLocale(<Button disabled>Disabled</Button>);
      expect((container.querySelector('button') as HTMLButtonElement).disabled).toBe(true);
    });

    it('shows loading indicator when loading', () => {
      const { container } = renderWithLocale(<Button loading>Loading</Button>);
      const btn = container.querySelector('button') as HTMLButtonElement;
      expect(btn.disabled).toBe(true);
      expect(btn.getAttribute('aria-busy')).toBe('true');
    });

    it('applies full-width class when fullWidth is true', () => {
      const { container } = renderWithLocale(<Button fullWidth>Full</Button>);
      expect(container.querySelector('button')!.className).toContain('btn--full-width');
    });
  });

  describe('interactions', () => {
    it('calls onClick handler when clicked', () => {
      const handleClick = mock(() => {});
      const { container } = renderWithLocale(<Button onClick={handleClick}>Click</Button>);
      container.querySelector('button')!.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
      const handleClick = mock(() => {});
      const { container } = renderWithLocale(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>,
      );
      container.querySelector('button')!.click();
      expect(handleClick).toHaveBeenCalledTimes(0);
    });

    it('does not call onClick when loading', () => {
      const handleClick = mock(() => {});
      const { container } = renderWithLocale(
        <Button loading onClick={handleClick}>
          Loading
        </Button>,
      );
      container.querySelector('button')!.click();
      expect(handleClick).toHaveBeenCalledTimes(0);
    });
  });

  describe('accessibility', () => {
    it('has aria-disabled when disabled', () => {
      const { container } = renderWithLocale(<Button disabled>Disabled</Button>);
      expect(container.querySelector('button')!.getAttribute('aria-disabled')).toBe('true');
    });

    it('has aria-busy when loading', () => {
      const { container } = renderWithLocale(<Button loading>Loading</Button>);
      expect(container.querySelector('button')!.getAttribute('aria-busy')).toBe('true');
    });

    it('forwards additional HTML button attributes', () => {
      const { container } = renderWithLocale(<Button data-testid="my-button">Test</Button>);
      expect(container.querySelector('[data-testid="my-button"]')).toBeDefined();
    });
  });
});
