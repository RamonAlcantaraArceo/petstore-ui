import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Tabs } from './Tabs';
import { useTranslation } from '../../i18n';
import { useAccessibility, useKeyboardNavigation } from '../../accessibility';

vi.mock('../../i18n', () => ({
  useTranslation: vi.fn(),
}));

vi.mock('../../accessibility', () => ({
  useAccessibility: vi.fn(),
  useKeyboardNavigation: vi.fn(),
}));

describe('Tabs', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useTranslation).mockReturnValue({
      t: (key: string) => key,
    } as ReturnType<typeof useTranslation>);
    vi.mocked(useAccessibility).mockReturnValue({
      ariaAttributes: {},
    } as ReturnType<typeof useAccessibility>);
    vi.mocked(useKeyboardNavigation).mockReturnValue({
      handleKeyDown: vi.fn(),
    } as ReturnType<typeof useKeyboardNavigation>);
  });

  it('exposes a stable component identifier', () => {
    render(<Tabs activeTab="one" onChange={vi.fn()} tabs={[{ id: 'one', label: 'One' }]} />);

    expect(screen.getByRole('tablist').getAttribute('data-component')).toBe('Tabs');
  });
});
