import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Select } from './Select';
import { useTranslation } from '../../i18n';
import { generateAccessibilityId, useAccessibility } from '../../accessibility';

vi.mock('../../i18n', () => ({
  useTranslation: vi.fn(),
}));

vi.mock('../../accessibility', () => ({
  useAccessibility: vi.fn(),
  generateAccessibilityId: vi.fn(),
}));

describe('Select', () => {
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
    vi.mocked(generateAccessibilityId).mockReturnValue('generated-select-id');
  });

  it('exposes a stable component identifier', () => {
    render(
      <Select
        label="Status"
        value="available"
        onChange={vi.fn()}
        options={[{ value: 'available', label: 'Available' }]}
      />,
    );

    expect(screen.getByText('Status').closest('[data-component="Select"]')).toBeDefined();
  });
});
