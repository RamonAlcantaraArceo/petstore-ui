import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Card } from './Card';
import { useTranslation } from '../../i18n';
import { useAccessibility } from '../../accessibility';

vi.mock('../../i18n', () => ({
  useTranslation: vi.fn(),
}));

vi.mock('../../accessibility', () => ({
  useAccessibility: vi.fn(),
}));

describe('Card', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useTranslation).mockReturnValue({
      t: (key: string) => key,
    } as ReturnType<typeof useTranslation>);
    vi.mocked(useAccessibility).mockReturnValue({
      ariaAttributes: {},
      handleKeyDown: vi.fn(),
      announceAction: vi.fn(),
    } as ReturnType<typeof useAccessibility>);
  });

  it('exposes a stable component identifier and variant selector', () => {
    render(
      <Card useDefaultAriaLabel={false} variant="primary">
        content
      </Card>,
    );

    const card = screen.getByText('content').closest('[data-component="Card"]');
    expect(card).toBeDefined();
    expect(card?.getAttribute('data-variant')).toBe('primary');
  });
});
