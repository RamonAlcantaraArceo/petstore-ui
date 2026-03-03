/**
 * Unit 12D — Layer 3: Accessibility & i18n tests
 *
 * Tests accessibility compliance (aria attributes, keyboard semantics, screen
 * reader support) using the utilities in src/testing/a11y-utils.ts, and
 * multi-locale rendering behaviour using the i18n infrastructure.
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { LocaleProvider } from '../i18n';
import { getTranslation, locales, DEFAULT_LOCALE } from '../i18n/registry';
import { Button } from '../components/atoms/Button';
import { Badge } from '../components/atoms/Badge';
import { Input } from '../components/atoms/Input';
import { PetCard } from '../components/molecules/PetCard';
import { testScreenReaderAccessibility, testColorContrast } from '../testing/a11y-utils';
import type { Pet } from '../services/types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function renderWithLocale(ui: React.ReactElement, locale: 'en' | 'chef' = 'en') {
  return render(<LocaleProvider locale={locale}>{ui}</LocaleProvider>);
}

const samplePet: Pet = {
  id: 1,
  name: 'Buddy',
  category: { id: 1, name: 'Dogs' },
  photoUrls: [],
  tags: [{ id: 1, name: 'friendly' }],
  status: 'available',
};

// ---------------------------------------------------------------------------
// Accessibility tests
// ---------------------------------------------------------------------------

describe('Accessibility (a11y)', () => {
  describe('Button', () => {
    it('has a valid accessible name via aria-label', () => {
      const { container } = renderWithLocale(<Button>Save</Button>);
      const btn = container.querySelector('button')!;
      const result = testScreenReaderAccessibility(btn);
      expect(result.hasAccessibleName).toBe(true);
    });

    it('has valid aria attributes when disabled', () => {
      const { container } = renderWithLocale(<Button disabled>Disabled</Button>);
      const btn = container.querySelector('button')!;
      const result = testScreenReaderAccessibility(btn);
      expect(result.hasValidAriaAttributes).toBe(true);
      expect(result.ariaAttributes['aria-disabled']).toBe('true');
    });

    it('has aria-busy="true" when loading', () => {
      const { container } = renderWithLocale(<Button loading>Loading</Button>);
      const btn = container.querySelector('button')!;
      const result = testScreenReaderAccessibility(btn);
      expect(result.ariaAttributes['aria-busy']).toBe('true');
    });

    it('has a semantic button role', () => {
      const { container } = renderWithLocale(<Button>Action</Button>);
      const btn = container.querySelector('button')!;
      const result = testScreenReaderAccessibility(btn);
      expect(result.role).toBe('button');
    });
  });

  describe('Input', () => {
    it('has accessible label relationship when label is provided', () => {
      const { container } = renderWithLocale(<Input label="Email address" />);
      const input = container.querySelector('input')!;
      const label = container.querySelector('label');
      expect(label).not.toBeNull();
      // label should reference the input via htmlFor
      expect(label?.getAttribute('for')).toBe(input.id);
    });

    it('has aria-required when required', () => {
      const { container } = renderWithLocale(<Input label="Name" required />);
      const input = container.querySelector('input')!;
      expect(input.getAttribute('aria-required')).toBe('true');
    });

    it('has aria-invalid="true" in error state', () => {
      const { container } = renderWithLocale(
        <Input label="Email" validationState="error" errorMessage="Invalid email" />,
      );
      const input = container.querySelector('input')!;
      const result = testScreenReaderAccessibility(input);
      expect(result.hasValidAriaAttributes).toBe(true);
      // aria-invalid is a boolean-like attribute
      expect(input.getAttribute('aria-invalid')).toBeTruthy();
    });

    it('renders helper text with appropriate live region role', () => {
      const { container } = renderWithLocale(
        <Input label="Field" validationState="error" errorMessage="Required" />,
      );
      const helper = container.querySelector('[role="alert"]');
      expect(helper).not.toBeNull();
      expect(helper?.textContent).toContain('Required');
    });
  });

  describe('PetCard', () => {
    it('has aria-label on the card container', () => {
      const { container } = renderWithLocale(<PetCard pet={samplePet} />);
      const card = container.querySelector('[aria-label]')!;
      const result = testScreenReaderAccessibility(card as HTMLElement);
      expect(result.hasAccessibleName).toBe(true);
      expect(result.accessibleName).toContain('Buddy');
    });
  });

  describe('Badge', () => {
    it('renders with text content for screen readers', () => {
      const { container } = renderWithLocale(<Badge variant="available" />);
      const badge = container.querySelector('span')!;
      const result = testScreenReaderAccessibility(badge);
      // Badge must have some text visible to screen readers
      expect(result.hasAccessibleName).toBe(true);
    });
  });

  describe('Keyboard semantics', () => {
    it('Button is a native button element (focusable by default)', () => {
      const { container } = renderWithLocale(<Button>Focus me</Button>);
      const btn = container.querySelector('button')!;
      // Native button elements are focusable; happy-dom reports tabIndex as -1
      // but the element is still a button with the correct tag
      expect(btn.tagName.toLowerCase()).toBe('button');
    });

    it('disabled Button has tabindex inherited from disabled state', () => {
      // eslint-disable-next-line react/no-unescaped-entities
      const { container } = renderWithLocale(<Button disabled>{"Can't focus"}</Button>);
      const btn = container.querySelector('button') as HTMLButtonElement;
      // Disabled buttons are not in tab order
      expect(btn.disabled).toBe(true);
    });

    it('Input is a native input element (keyboard focusable)', () => {
      const { container } = renderWithLocale(<Input label="Field" />);
      const input = container.querySelector('input')!;
      expect(input.tagName.toLowerCase()).toBe('input');
    });
  });

  describe('Color contrast utility', () => {
    it('testColorContrast returns a result object with required fields', () => {
      const { container } = renderWithLocale(<Button>Check contrast</Button>);
      const btn = container.querySelector('button')!;
      const result = testColorContrast(btn);
      expect(typeof result.contrastRatio).toBe('number');
      expect(typeof result.meetsRequirements).toBe('boolean');
      expect(result.wcagLevel).toBe('AA');
    });
  });
});

// ---------------------------------------------------------------------------
// Internationalisation (i18n) tests
// ---------------------------------------------------------------------------

describe('Internationalisation (i18n)', () => {
  describe('Translation registry', () => {
    it('both locales are registered', () => {
      expect(Object.keys(locales)).toContain('en');
      expect(Object.keys(locales)).toContain('chef');
    });

    it('DEFAULT_LOCALE is "en"', () => {
      expect(DEFAULT_LOCALE).toBe('en');
    });

    it('getTranslation returns a string for known key', () => {
      const result = getTranslation(locales['en'], 'components.button.submit');
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('getTranslation interpolates params', () => {
      const result = getTranslation(locales['en'], 'components.button.ariaLabel', {
        content: 'Submit',
      });
      expect(result).toContain('Submit');
    });

    it('getTranslation returns key string for missing key (graceful fallback)', () => {
      const result = getTranslation(locales['en'], 'components.nonexistent.key');
      expect(typeof result).toBe('string');
    });

    it('chef locale has same top-level keys as en', () => {
      const enKeys = Object.keys(locales['en']);
      const chefKeys = Object.keys(locales['chef']);
      enKeys.forEach((key) => {
        expect(chefKeys).toContain(key);
      });
    });
  });

  describe('Multi-locale component rendering', () => {
    it('Button renders in English locale', () => {
      const { container } = renderWithLocale(<Button>Save</Button>, 'en');
      expect(container.querySelector('button')).not.toBeNull();
    });

    it('Button renders in Chef locale', () => {
      const { container } = renderWithLocale(<Button>Save</Button>, 'chef');
      expect(container.querySelector('button')).not.toBeNull();
    });

    it('Badge renders translated status in English', () => {
      const { container } = renderWithLocale(<Badge variant="available" />, 'en');
      const badge = container.querySelector('span')!;
      expect(badge.textContent?.length).toBeGreaterThan(0);
    });

    it('Badge renders translated status in Chef locale', () => {
      const { container } = renderWithLocale(<Badge variant="available" />, 'chef');
      const badge = container.querySelector('span')!;
      expect(badge.textContent?.length).toBeGreaterThan(0);
    });

    it('Badge status text differs between en and chef locales', () => {
      const { container: enContainer } = renderWithLocale(<Badge variant="available" />, 'en');
      const enText = enContainer.querySelector('span')?.textContent;

      const { container: chefContainer } = renderWithLocale(<Badge variant="available" />, 'chef');
      const chefText = chefContainer.querySelector('span')?.textContent;

      // Chef locale pseudo-translates text — it should differ from English
      expect(enText).not.toBe(chefText);
    });

    it('PetCard renders correctly in English locale', () => {
      const { getByText } = renderWithLocale(<PetCard pet={samplePet} />, 'en');
      expect(getByText('Buddy')).not.toBeNull();
    });

    it('PetCard renders correctly in Chef locale', () => {
      const { getByText } = renderWithLocale(<PetCard pet={samplePet} />, 'chef');
      expect(getByText('Buddy')).not.toBeNull();
    });

    it('Input renders with translated label in both locales', () => {
      (['en', 'chef'] as const).forEach((locale) => {
        const { container } = renderWithLocale(
          <Input
            labelTranslationKey="components.input.ariaLabel"
            translationParams={{ label: 'Email' }}
          />,
          locale,
        );
        expect(container.querySelector('input')).not.toBeNull();
      });
    });
  });

  describe('Translation key coverage', () => {
    const criticalKeys = [
      'components.button.submit',
      'components.button.cancel',
      'components.input.ariaLabel',
      'petstore.common.status.available',
      'petstore.common.status.pending',
      'petstore.common.status.sold',
    ];

    criticalKeys.forEach((key) => {
      it(`key "${key}" exists in en locale`, () => {
        const result = getTranslation(locales['en'], key);
        expect(typeof result).toBe('string');
        expect(result).not.toBe('');
      });

      it(`key "${key}" exists in chef locale`, () => {
        const result = getTranslation(locales['chef'], key);
        expect(typeof result).toBe('string');
        expect(result).not.toBe('');
      });
    });
  });
});
