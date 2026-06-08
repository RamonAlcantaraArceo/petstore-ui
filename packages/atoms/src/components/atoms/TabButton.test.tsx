import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TabButton } from './TabButton';

describe('TabButton', () => {
  it('renders as a tab with selected state', () => {
    render(
      <TabButton selected controls="panel-pets">
        Pets
      </TabButton>,
    );

    const button = screen.getByRole('tab', { name: 'Pets' });
    expect(button.getAttribute('aria-selected')).toBe('true');
    expect(button.getAttribute('aria-controls')).toBe('panel-pets');
    expect(button.getAttribute('data-component')).toBe('TabButton');
    expect(button.getAttribute('data-appearance')).toBe('underline');
    expect(button.getAttribute('tabindex')).toBe('0');
  });

  it('supports the pill appearance and forwards events', () => {
    const onClick = vi.fn();

    render(
      <TabButton selected={false} appearance="pill" onClick={onClick}>
        Modes
      </TabButton>,
    );

    const button = screen.getByRole('tab', { name: 'Modes' });
    expect(button.getAttribute('aria-selected')).toBe('false');
    expect(button.getAttribute('data-appearance')).toBe('pill');
    expect(button.getAttribute('tabindex')).toBe('-1');

    button.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
