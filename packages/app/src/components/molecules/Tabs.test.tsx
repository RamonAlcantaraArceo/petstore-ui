import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Tabs } from './Tabs';
import { useTranslation } from '@petstore-ui/atoms';
import { useAccessibility, useKeyboardNavigation } from '@petstore-ui/atoms';

vi.mock('@petstore-ui/atoms', async () => {
  const actual = await vi.importActual<typeof import('@petstore-ui/atoms')>('@petstore-ui/atoms');
  return {
    ...actual,
    useTranslation: vi.fn(),
    useAccessibility: vi.fn(),
    useKeyboardNavigation: vi.fn(),
  };
});

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
