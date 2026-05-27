import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Table } from './Table';
import { useTranslation } from '../../i18n';
import { useAccessibility } from '../../accessibility';

vi.mock('../../i18n', () => ({
  useTranslation: vi.fn(),
}));

vi.mock('../../accessibility', () => ({
  useAccessibility: vi.fn(),
}));

describe('Table', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useTranslation).mockReturnValue({
      t: (key: string) => key,
    } as ReturnType<typeof useTranslation>);
    vi.mocked(useAccessibility).mockReturnValue({
      ariaAttributes: {},
    } as ReturnType<typeof useAccessibility>);
  });

  it('exposes a stable component identifier', () => {
    render(<Table columns={[{ key: 'name', header: 'Name' }]} data={[{ name: 'Milo' }]} />);

    expect(screen.getByRole('table').getAttribute('data-component')).toBe('Table');
  });
});
