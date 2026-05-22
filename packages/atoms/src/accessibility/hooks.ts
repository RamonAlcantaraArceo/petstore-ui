/**
 * Accessibility utility hooks and functions
 * Reusable accessibility functionality for components
 */

import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useTranslation } from '../i18n';
import type {
  FocusManagementProps,
  KeyboardNavigationProps,
  AnnouncementProps,
  ComprehensiveAccessibilityProps,
} from './types';

type AccessibilityAriaAttributes = {
  id?: string | undefined;
  'aria-label'?: string | undefined;
  'aria-describedby'?: string | undefined;
  'aria-labelledby'?: string | undefined;
  'aria-invalid'?: boolean | undefined;
  'aria-busy'?: boolean | undefined;
};

/**
 * Generate a unique ID for accessibility relationships
 * @param prefix Optional prefix for the ID
 * @returns A unique ID string
 */
export function useAccessibilityId(prefix?: string): string {
  const id = useRef<string>();

  if (!id.current) {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    id.current = `${prefix || 'a11y'}-${timestamp}-${random}`;
  }

  return id.current;
}

/**
 * Hook for managing focus states and trapping
 * @param props Focus management configuration
 * @returns Focus management utilities
 */
export function useFocusManagement(props: FocusManagementProps = {}) {
  const { autoFocus, trapFocus, restoreFocus, focusVisible } = props;
  const elementRef = useRef<HTMLElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  // Auto-focus on mount
  useEffect(() => {
    if (autoFocus && elementRef.current) {
      elementRef.current.focus();
    }
  }, [autoFocus]);

  // Focus trapping for modal-like components
  useEffect(() => {
    if (!trapFocus) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const element = elementRef.current;
      if (!element) return;

      const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          event.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [trapFocus]);

  // Store and restore focus
  useEffect(() => {
    if (restoreFocus) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
    }

    return () => {
      if (restoreFocus && previouslyFocusedElement.current) {
        const elementToFocus =
          typeof restoreFocus === 'function' ? restoreFocus() : previouslyFocusedElement.current;

        elementToFocus?.focus();
      }
    };
  }, [restoreFocus]);

  const focusElement = useCallback(() => {
    elementRef.current?.focus();
  }, []);

  const blurElement = useCallback(() => {
    elementRef.current?.blur();
  }, []);

  return {
    elementRef,
    focusElement,
    blurElement,
    isFocused: elementRef.current === document.activeElement,
    focusVisible,
  };
}

/**
 * Hook for keyboard navigation handling
 * @param props Keyboard navigation configuration
 * @returns Keyboard event handler
 */
export function useKeyboardNavigation(props: KeyboardNavigationProps = {}) {
  const { arrowNavigation, homeEndKeys, pageKeys, enterActivation, spaceActivation, escapeAction } =
    props;

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case 'Enter':
          if (enterActivation) {
            event.preventDefault();
            (event.target as HTMLElement)?.click();
          }
          break;

        case ' ':
          if (spaceActivation) {
            event.preventDefault();
            (event.target as HTMLElement)?.click();
          }
          break;

        case 'Escape':
          if (escapeAction) {
            event.preventDefault();
            escapeAction();
          }
          break;

        case 'ArrowUp':
        case 'ArrowDown':
          if (
            arrowNavigation === 'vertical' ||
            arrowNavigation === 'both' ||
            arrowNavigation === 'grid'
          ) {
            event.preventDefault();
            navigateVertically(event.key === 'ArrowUp' ? -1 : 1);
          }
          break;

        case 'ArrowLeft':
        case 'ArrowRight':
          if (
            arrowNavigation === 'horizontal' ||
            arrowNavigation === 'both' ||
            arrowNavigation === 'grid'
          ) {
            event.preventDefault();
            navigateHorizontally(event.key === 'ArrowLeft' ? -1 : 1);
          }
          break;

        case 'Home':
          if (homeEndKeys) {
            event.preventDefault();
            navigateToEnd('start');
          }
          break;

        case 'End':
          if (homeEndKeys) {
            event.preventDefault();
            navigateToEnd('end');
          }
          break;

        case 'PageUp':
          if (pageKeys) {
            event.preventDefault();
            navigatePage(-1);
          }
          break;

        case 'PageDown':
          if (pageKeys) {
            event.preventDefault();
            navigatePage(1);
          }
          break;
      }
    },
    [arrowNavigation, homeEndKeys, pageKeys, enterActivation, spaceActivation, escapeAction],
  );

  // Navigation helper functions
  const navigateVertically = (direction: number) => {
    // Implementation depends on specific component needs
    console.debug('Vertical navigation:', direction);
  };

  const navigateHorizontally = (direction: number) => {
    // Implementation depends on specific component needs
    console.debug('Horizontal navigation:', direction);
  };

  const navigateToEnd = (position: 'start' | 'end') => {
    // Implementation depends on specific component needs
    console.debug('Navigate to:', position);
  };

  const navigatePage = (direction: number) => {
    // Implementation depends on specific component needs
    console.debug('Page navigation:', direction);
  };

  return { handleKeyDown };
}

/**
 * Hook for screen reader announcements
 * @param props Announcement configuration
 * @returns Announcement utilities
 */
export function useAnnouncements(props: AnnouncementProps = {}) {
  const {
    announceOnMount,
    announceOnChange,
    announceOnAction,
    announcementLevel = 'polite',
  } = props;

  // Create live region for announcements
  const announceText = useCallback(
    (text: string, priority: 'polite' | 'assertive' = announcementLevel) => {
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', priority);
      announcement.setAttribute('aria-atomic', 'true');
      announcement.style.position = 'absolute';
      announcement.style.left = '-10000px';
      announcement.style.width = '1px';
      announcement.style.height = '1px';
      announcement.style.overflow = 'hidden';

      announcement.textContent = text;
      document.body.appendChild(announcement);

      // Remove after announcement
      setTimeout(() => {
        if (announcement.parentNode) {
          announcement.parentNode.removeChild(announcement);
        }
      }, 1000);
    },
    [announcementLevel],
  );

  // Announce on mount
  useEffect(() => {
    if (announceOnMount) {
      announceText(announceOnMount);
    }
  }, [announceOnMount, announceText]);

  const announceChange = useCallback(
    (value: unknown) => {
      if (announceOnChange) {
        const text = announceOnChange(value);
        announceText(text);
      }
    },
    [announceOnChange, announceText],
  );

  const announceAction = useCallback(() => {
    if (announceOnAction) {
      announceText(announceOnAction);
    }
  }, [announceOnAction, announceText]);

  return {
    announceText,
    announceChange,
    announceAction,
  };
}

/**
 * Comprehensive accessibility hook that combines all a11y functionality
 * @param props Complete accessibility configuration
 * @returns All accessibility utilities
 */
export function useAccessibility(props: ComprehensiveAccessibilityProps = {}) {
  const { t } = useTranslation();
  const id = useAccessibilityId();

  const focusManagement = useFocusManagement(props);
  const keyboardNavigation = useKeyboardNavigation(props);
  const announcements = useAnnouncements(props);

  // Generate ARIA attributes with localized labels
  const ariaAttributes = useMemo(() => {
    const attributes: AccessibilityAriaAttributes = {
      id: props.id || id,
      'aria-label': props['aria-label'],
      'aria-describedby': props['aria-describedby'],
      'aria-labelledby': props['aria-labelledby'],
    };

    // Add error state attributes
    if (props.accessibilityError) {
      attributes['aria-invalid'] = true;
    }

    // Add loading state attributes
    if (props.accessibilityLoading) {
      attributes['aria-busy'] = true;
      attributes['aria-label'] = props['aria-label']
        ? `${t('accessibility.labels.loading')} ${props['aria-label']}`
        : t('accessibility.labels.loading');
    }

    // Remove undefined values
    (Object.keys(attributes) as Array<keyof AccessibilityAriaAttributes>).forEach((key) => {
      if (attributes[key] === undefined) {
        delete attributes[key];
      }
    });

    return attributes;
  }, [props, t, id]);

  return {
    ...focusManagement,
    ...keyboardNavigation,
    ...announcements,
    ariaAttributes,
    accessibilityId: id,
  };
}

/**
 * Utility to validate if element meets basic accessibility requirements
 * @param element The DOM element to validate
 * @returns Validation results
 */
export function validateAccessibility(element: HTMLElement) {
  const validations = {
    hasAccessibleName: !!(
      element.getAttribute('aria-label') ||
      element.getAttribute('aria-labelledby') ||
      element.textContent?.trim()
    ),
    hasValidRole: !!element.getAttribute('role'),
    hasTabIndex: element.hasAttribute('tabindex'),
    hasKeyboardHandlers: !!(element.onkeydown || element.onkeyup || element.onkeypress),
    hasFocusStyles: !!element.querySelector(':focus-visible, :focus'),
    meetsContrastRequirements: true, // Would need color analysis
  };

  const isValid = Object.values(validations).every(Boolean);

  return {
    isValid,
    validations,
    score: Object.values(validations).filter(Boolean).length / Object.keys(validations).length,
  };
}
