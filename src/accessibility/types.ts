/**
 * Accessibility types and interfaces
 * Comprehensive a11y props and utilities for component library
 */

import type { AriaAttributes } from 'react';

/**
 * Base accessibility props that all interactive components should support
 */
export interface BaseAccessibilityProps extends AriaAttributes {
  /** Unique identifier for accessibility relationships */
  id?: string;

  /** Accessible name for screen readers */
  'aria-label'?: string;

  /** References to other elements that describe this element */
  'aria-describedby'?: string;

  /** References to other elements that label this element */
  'aria-labelledby'?: string;

  /** Indicates if the element is required */
  'aria-required'?: boolean;

  /** Indicates if the element has invalid input */
  'aria-invalid'?: boolean | 'grammar' | 'spelling';

  /** Current value for elements with aria-valuemin and aria-valuemax */
  'aria-valuenow'?: number;

  /** Minimum value for range widgets */
  'aria-valuemin'?: number;

  /** Maximum value for range widgets */
  'aria-valuemax'?: number;

  /** Human-readable text alternative for the current value */
  'aria-valuetext'?: string;

  /** Tab index for keyboard navigation */
  tabIndex?: number;

  /** ARIA role override */
  role?: string;
}

/**
 * Interactive element accessibility props
 */
export interface InteractiveAccessibilityProps extends BaseAccessibilityProps {
  /** Indicates if the element is currently disabled */
  'aria-disabled'?: boolean;

  /** Indicates the pressed state for toggle buttons */
  'aria-pressed'?: boolean;

  /** Indicates if a collapsible element is expanded */
  'aria-expanded'?: boolean;

  /** Indicates if an element has a popup */
  'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';

  /** Keyboard shortcut for activating the element */
  accessKey?: string;
}

/**
 * Form element accessibility props
 */
export interface FormAccessibilityProps extends InteractiveAccessibilityProps {
  /** Indicates if the form field is required */
  'aria-required'?: boolean;

  /** Indicates if the form field has validation errors */
  'aria-invalid'?: boolean | 'grammar' | 'spelling';

  /** References to error message elements */
  'aria-errormessage'?: string;

  /** Provides additional context about expected input format */
  'aria-placeholder'?: string;

  /** Indicates if the field supports autocompletion */
  autoComplete?: string;
}

/**
 * Container/layout accessibility props
 */
export interface ContainerAccessibilityProps extends BaseAccessibilityProps {
  /** Indicates if content is hidden from screen readers */
  'aria-hidden'?: boolean;

  /** Indicates live regions for dynamic content */
  'aria-live'?: 'off' | 'polite' | 'assertive';

  /** Indicates if live region updates should be read atomically */
  'aria-atomic'?: boolean;

  /** Indicates which updates should be presented to user */
  'aria-relevant'?:
    | 'additions'
    | 'removals'
    | 'text'
    | 'all'
    | 'additions removals'
    | 'additions text'
    | 'removals text'
    | 'text additions'
    | 'text removals'
    | 'removals additions';

  /** Landmark role for page structure */
  role?:
    | 'banner'
    | 'navigation'
    | 'main'
    | 'complementary'
    | 'contentinfo'
    | 'search'
    | 'form'
    | 'region'
    | string;
}

/**
 * Button-specific accessibility props
 */
export interface ButtonAccessibilityProps extends InteractiveAccessibilityProps {
  /** Button type for form submission */
  type?: 'button' | 'submit' | 'reset';

  /** Form element that this button controls */
  form?: string;

  /** Indicates if button is currently loading/processing */
  'aria-busy'?: boolean;
}

/**
 * Input-specific accessibility props
 */
export interface InputAccessibilityProps extends FormAccessibilityProps {
  /** Input type for semantic meaning */
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number' | 'date' | 'time';

  /** Associated form element */
  form?: string;

  /** Input name for form submission */
  name?: string;

  /** Auto-focus on page load */
  autoFocus?: boolean;

  /** Read-only state */
  readOnly?: boolean;
}

/**
 * Generic accessibility props based on element type
 */
export type AccessibilityProps<T = HTMLElement> = T extends HTMLButtonElement
  ? ButtonAccessibilityProps
  : T extends HTMLInputElement
    ? InputAccessibilityProps
    : T extends HTMLElement
      ? BaseAccessibilityProps
      : BaseAccessibilityProps;

/**
 * Focus management utilities
 */
export interface FocusManagementProps {
  /** Auto-focus this element */
  autoFocus?: boolean;

  /** Focus trap for modal-like components */
  trapFocus?: boolean;

  /** Restore focus to this element when component unmounts */
  restoreFocus?: HTMLElement | (() => HTMLElement | null);

  /** Custom focus visible styles */
  focusVisible?: boolean;
}

/**
 * Keyboard navigation props
 */
export interface KeyboardNavigationProps {
  /** Arrow key navigation pattern */
  arrowNavigation?: 'horizontal' | 'vertical' | 'both' | 'grid';

  /** Home/End key behavior */
  homeEndKeys?: boolean;

  /** Page Up/Page Down behavior */
  pageKeys?: boolean;

  /** Enter key activation */
  enterActivation?: boolean;

  /** Space key activation */
  spaceActivation?: boolean;

  /** Escape key behavior */
  escapeAction?: () => void;
}

/**
 * Screen reader announcement props
 */
export interface AnnouncementProps {
  /** Announcement on component mount */
  announceOnMount?: string;

  /** Announcement on value change */
  announceOnChange?: (value: any) => string;

  /** Announcement on action completion */
  announceOnAction?: string;

  /** Announcement politeness level */
  announcementLevel?: 'polite' | 'assertive';
}

/**
 * Complete accessibility props combining all aspects
 */
export interface ComprehensiveAccessibilityProps
  extends BaseAccessibilityProps, FocusManagementProps, KeyboardNavigationProps, AnnouncementProps {
  /** Additional semantic role */
  accessibilityRole?: string;

  /** Component is in an error state */
  accessibilityError?: boolean;

  /** Component is in a loading state */
  accessibilityLoading?: boolean;

  /** Custom accessibility hints */
  accessibilityHint?: string;

  /** Indicates if element is part of a set */
  'aria-setsize'?: number;
  'aria-posinset'?: number;
}

/**
 * WCAG compliance levels
 */
export type WCAGLevel = 'A' | 'AA' | 'AAA';

/**
 * Color contrast requirements
 */
export interface ColorContrastProps {
  /** WCAG compliance level */
  wcagLevel?: WCAGLevel;

  /** Minimum contrast ratio required */
  minimumContrast?: number;

  /** Background color for contrast calculation */
  backgroundColor?: string;

  /** Text color for contrast calculation */
  textColor?: string;
}
