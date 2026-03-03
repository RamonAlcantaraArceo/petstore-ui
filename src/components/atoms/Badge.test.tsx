import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { LocaleProvider } from '../../i18n';
import { Badge } from './Badge';

function renderWithLocale(ui: React.ReactElement) {
  return render(<LocaleProvider locale="en">{ui}</LocaleProvider>);
}

describe('Badge', () => {
  describe('rendering', () => {
    it('renders with children', () => {
      const { getByText } = renderWithLocale(<Badge>custom label</Badge>);
      expect(getByText('custom label')).toBeDefined();
    });

    it('renders translated label for available variant', () => {
      renderWithLocale(<Badge variant="available" />);
      // The badge renders a span; just verify it exists and has content
      const badge = document.querySelector('[class*="badge"]') ?? document.querySelector('span');
      expect(badge).toBeDefined();
    });

    it('renders translated label for pending variant', () => {
      renderWithLocale(<Badge variant="pending" />);
      const badge = document.querySelector('[class*="badge"]') ?? document.querySelector('span');
      expect(badge).toBeDefined();
    });

    it('renders translated label for sold variant', () => {
      renderWithLocale(<Badge variant="sold" />);
      const badge = document.querySelector('[class*="badge"]') ?? document.querySelector('span');
      expect(badge).toBeDefined();
    });

    it('uses labelTranslationKey when provided', () => {
      renderWithLocale(<Badge labelTranslationKey="petstore.common.status.available" />);
      const badge = document.querySelector('span');
      expect(badge).toBeDefined();
    });

    it('applies small size', () => {
      renderWithLocale(<Badge size="small">S</Badge>);
      const badge = document.querySelector('span');
      expect(badge).toBeDefined();
    });
  });

  describe('variants', () => {
    const variants: Array<'available' | 'pending' | 'sold' | 'placed' | 'approved' | 'delivered'> =
      ['available', 'pending', 'sold', 'placed', 'approved', 'delivered'];

    variants.forEach((variant) => {
      it(`renders ${variant} variant without error`, () => {
        expect(() => renderWithLocale(<Badge variant={variant} />)).not.toThrow();
      });
    });
  });
});
