import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { LocaleProvider } from '../../i18n';
import { VisualModeControls } from './VisualModeControls';

const renderWithLocale = (ui: React.ReactElement) =>
  render(<LocaleProvider locale="en">{ui}</LocaleProvider>);

describe('VisualModeControls', () => {
  it('moves focus to the next selected tab when using arrow keys', () => {
    const onModeChange = vi.fn();

    renderWithLocale(
      <VisualModeControls
        variant={{ viewport: 'desktop', expected: 'a', actual: 'b', diff: 'c', status: 'failed' }}
        variantKey="story::desktop"
        activeMode="actual"
        onModeChange={onModeChange}
      />,
    );

    const current = screen.getByRole('tab', { selected: true });
    current.focus();

    fireEvent.keyDown(current, { key: 'ArrowRight' });

    expect(onModeChange).toHaveBeenCalledWith('expected', true);
    const next = screen.getByRole('tab', { name: /expected/i });
    expect(document.activeElement).toBe(next);
  });

  it('moves selection with keyboard arrows', () => {
    const onModeChange = vi.fn();

    renderWithLocale(
      <VisualModeControls
        variant={{ viewport: 'desktop', expected: 'a', actual: 'b', diff: 'c', status: 'failed' }}
        variantKey="story::desktop"
        activeMode="actual"
        onModeChange={onModeChange}
      />,
    );

    const selected = screen.getByRole('tab', { selected: true });
    fireEvent.keyDown(selected, { key: 'ArrowRight' });

    expect(onModeChange).toHaveBeenCalled();
  });
});
