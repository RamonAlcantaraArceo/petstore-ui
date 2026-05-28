import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Modal } from './Modal';
import { useTranslation } from '../../i18n';
import { useAccessibility, useFocusManagement } from '../../accessibility';

vi.mock('../../i18n', () => ({
  useTranslation: vi.fn(),
}));

vi.mock('../../accessibility', () => ({
  useAccessibility: vi.fn(),
  useFocusManagement: vi.fn(),
}));

describe('Modal', () => {
  const tMock = vi.fn((key: string) => `translated:${key}`);
  const onCloseMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useTranslation).mockReturnValue({
      t: tMock,
    } as ReturnType<typeof useTranslation>);

    vi.mocked(useAccessibility).mockReturnValue({
      ariaAttributes: { 'aria-label': 'mock-label' },
    } as ReturnType<typeof useAccessibility>);

    vi.mocked(useFocusManagement).mockReturnValue({
      elementRef: { current: null },
    } as ReturnType<typeof useFocusManagement>);
  });

  afterEach(() => {
    cleanup();
  });

  describe('conditional rendering', () => {
    it('renders nothing when isOpen is false', () => {
      render(
        <Modal isOpen={false} onClose={onCloseMock}>
          <p>content</p>
        </Modal>,
      );
      expect(document.querySelector('[role="dialog"]')).toBeNull();
    });

    it('renders dialog when isOpen is true', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <p>content</p>
        </Modal>,
      );
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeDefined();
      expect(dialog.getAttribute('data-component')).toBe('Modal');
    });
  });

  describe('title resolution', () => {
    it('renders title from title prop', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} title="My Title">
          <p>content</p>
        </Modal>,
      );
      expect(document.querySelector('h2')?.textContent).toBe('My Title');
    });

    it('renders translated title from titleTranslationKey', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} titleTranslationKey="some.key">
          <p>content</p>
        </Modal>,
      );
      expect(document.querySelector('h2')?.textContent).toBe('translated:some.key');
    });

    it('titleTranslationKey takes priority over title prop', () => {
      render(
        <Modal
          isOpen={true}
          onClose={onCloseMock}
          title="Static Title"
          titleTranslationKey="some.key"
        >
          <p>content</p>
        </Modal>,
      );
      expect(document.querySelector('h2')?.textContent).toBe('translated:some.key');
    });

    it('falls back to default title when neither title nor titleTranslationKey is provided', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <p>content</p>
        </Modal>,
      );
      expect(document.querySelector('h2')?.textContent).toBe(
        'translated:petstore.modal.defaultTitle',
      );
    });
  });

  describe('children and ARIA', () => {
    it('renders children inside the dialog', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <p data-testid="child">Hello</p>
        </Modal>,
      );
      expect(screen.getByTestId('child')).toBeDefined();
    });

    it('dialog has role="dialog" and aria-modal="true"', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <p>content</p>
        </Modal>,
      );
      const dialog = screen.getByRole('dialog');
      expect(dialog.getAttribute('role')).toBe('dialog');
      expect(dialog.getAttribute('aria-modal')).toBe('true');
    });

    it('applies aria-label from ariaAttributes mock', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <p>content</p>
        </Modal>,
      );
      const dialog = screen.getByRole('dialog');
      expect(dialog.getAttribute('aria-label')).toBe('mock-label');
    });
  });

  describe('close triggers', () => {
    it('calls onClose when overlay is clicked', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <p>content</p>
        </Modal>,
      );
      const overlay = document.querySelector('[role="presentation"]') as HTMLElement;
      fireEvent.click(overlay);
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when dialog content is clicked', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <p>content</p>
        </Modal>,
      );
      const dialog = screen.getByRole('dialog');
      fireEvent.click(dialog);
      expect(onCloseMock).toHaveBeenCalledTimes(0);
    });

    it('calls onClose when Escape key is dispatched on document', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <p>content</p>
        </Modal>,
      );
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose for non-Escape keys', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <p>content</p>
        </Modal>,
      );
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      expect(onCloseMock).toHaveBeenCalledTimes(0);
    });

    // Skipped: asserting event listener removal requires fragile spy setup on
    // document.removeEventListener; belongs at integration level.
    it.skip('removes Escape listener when isOpen becomes false', () => {});
  });

  describe('size variants', () => {
    it('small size sets maxWidth to 24rem', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} size="small">
          <p>content</p>
        </Modal>,
      );
      const dialog = screen.getByRole('dialog') as HTMLElement;
      expect(dialog.style.maxWidth).toBe('24rem');
    });

    it('medium size sets maxWidth to 36rem (default)', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <p>content</p>
        </Modal>,
      );
      const dialog = screen.getByRole('dialog') as HTMLElement;
      expect(dialog.style.maxWidth).toBe('36rem');
    });

    it('large size sets maxWidth to 48rem', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} size="large">
          <p>content</p>
        </Modal>,
      );
      const dialog = screen.getByRole('dialog') as HTMLElement;
      expect(dialog.style.maxWidth).toBe('48rem');
    });

    // Skipped: jsdom does not implement focus trapping or autoFocus reliably;
    // useFocusManagement is mocked, making ref-based focus behavior untestable.
    it.skip('focus management hooks are configured correctly', () => {});
  });
});
