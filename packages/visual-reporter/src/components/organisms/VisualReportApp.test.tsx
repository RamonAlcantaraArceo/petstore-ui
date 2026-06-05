import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { LocaleProvider } from '@petstore-ui/atoms';
import { visualReportFixture } from '../../stories/visual-report/fixtures';
import { VisualReportApp } from './VisualReportApp';

const renderWithLocale = (ui: React.ReactElement) =>
  render(<LocaleProvider locale="en">{ui}</LocaleProvider>);

describe('VisualReportApp', () => {
  it('renders initial selection and variants', () => {
    renderWithLocale(<VisualReportApp data={visualReportFixture} />);

    expect(screen.getByText('Visual Report')).toBeDefined();
    expect(screen.getByText(/shown of/)).toBeDefined();
  });

  it('filters variant cards by selected status', () => {
    renderWithLocale(<VisualReportApp data={visualReportFixture} />);

    const failedFilter = screen
      .getAllByRole('button')
      .find(
        (button) =>
          button.getAttribute('aria-pressed') !== null && button.textContent?.includes('Failed'),
      );

    expect(failedFilter).toBeDefined();
    if (!failedFilter) {
      return;
    }

    fireEvent.click(failedFilter);

    expect(screen.getAllByText(/failed/i).length).toBeGreaterThan(0);
  });

  it('wires app surfaces to CSS theme variables and toggles document theme', () => {
    renderWithLocale(<VisualReportApp data={visualReportFixture} />);

    const main = screen.getByRole('main');
    expect(main.getAttribute('style')).toContain('var(--color-bg)');

    const themeToggle = screen.getByRole('button', { name: /switch to light mode/i });
    fireEvent.click(themeToggle);

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(themeToggle.getAttribute('aria-label')).toBe('Switch to dark mode');
  });
});
