/**
 * Accessibility utility functions
 * Helper functions for accessibility validation, testing, and enhancement
 */

import type { WCAGLevel, ColorContrastProps } from './types';

/**
 * Calculate color contrast ratio between two colors
 * @param foreground Foreground color (text)
 * @param background Background color
 * @returns Contrast ratio (1-21)
 */
export function calculateContrastRatio(foreground: string, background: string): number {
  const rgb1 = hexToRgb(foreground);
  const rgb2 = hexToRgb(background);
  
  if (!rgb1 || !rgb2) return 1;
  
  const l1 = getRelativeLuminance(rgb1);
  const l2 = getRelativeLuminance(rgb2);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if color combination meets WCAG contrast requirements
 * @param props Color contrast configuration
 * @returns Whether the combination meets requirements
 */
export function meetsContrastRequirements(props: ColorContrastProps): boolean {
  const { 
    wcagLevel = 'AA', 
    backgroundColor = '#ffffff', 
    textColor = '#000000',
    minimumContrast
  } = props;
  
  const ratio = calculateContrastRatio(textColor, backgroundColor);
  
  if (minimumContrast) {
    return ratio >= minimumContrast;
  }
  
  // WCAG 2.1 AA requirements
  const requirements = {
    A: 3,    // WCAG A (minimum)
    AA: 4.5, // WCAG AA (standard)
    AAA: 7   // WCAG AAA (enhanced)
  };
  
  return ratio >= requirements[wcagLevel];
}

/**
 * Convert hex color to RGB
 * @param hex Hex color string (#ffffff or ffffff)
 * @returns RGB values or null if invalid
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleanHex = hex.replace('#', '');
  const match = cleanHex.match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  
  if (!match) return null;
  
  return {
    r: parseInt(match[1]!, 16),
    g: parseInt(match[2]!, 16),
    b: parseInt(match[3]!, 16)
  };
}

/**
 * Calculate relative luminance for contrast calculation
 * @param rgb RGB color values
 * @returns Relative luminance (0-1)
 */
function getRelativeLuminance(rgb: { r: number; g: number; b: number }): number {
  const { r, g, b } = rgb;
  
  const [rs, gs, bs] = [r, g, b].map(color => {
    const c = color / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * rs! + 0.7152 * gs! + 0.0722 * bs!;
}

/**
 * Check if element has sufficient keyboard accessibility
 * @param element DOM element to check
 * @returns Accessibility status
 */
export function hasKeyboardAccessibility(element: HTMLElement): {
  isAccessible: boolean;
  issues: string[];
} {
  const issues: string[] = [];
  
  // Check for focusability
  const isFocusable = element.tabIndex >= 0 || 
                     ['button', 'input', 'select', 'textarea', 'a'].includes(element.tagName.toLowerCase()) ||
                     element.contentEditable === 'true';
  
  if (!isFocusable) {
    issues.push('Element is not keyboard focusable');
  }
  
  // Check for accessible name
  const hasAccessibleName = !!(
    element.getAttribute('aria-label') ||
    element.getAttribute('aria-labelledby') ||
    element.textContent?.trim() ||
    element.getAttribute('title')
  );
  
  if (!hasAccessibleName) {
    issues.push('Element lacks accessible name');
  }
  
  // Check for role
  const hasRole = !!(
    element.getAttribute('role') ||
    ['button', 'link', 'input'].includes(element.tagName.toLowerCase())
  );
  
  if (!hasRole) {
    issues.push('Element lacks semantic role');
  }
  
  return {
    isAccessible: issues.length === 0,
    issues
  };
}

/**
 * Generate WCAG-compliant focus styles
 * @param primaryColor Primary brand color
 * @param backgroundColor Background color for contrast
 * @returns CSS focus styles
 */
export function generateFocusStyles(primaryColor: string, backgroundColor: string = '#ffffff') {
  const contrastRatio = calculateContrastRatio(primaryColor, backgroundColor);
  
  // Ensure focus indicator has sufficient contrast
  const focusColor = contrastRatio >= 3 ? primaryColor : '#005fcc'; // Fallback high-contrast blue
  
  return {
    outline: `2px solid ${focusColor}`,
    outlineOffset: '2px',
    borderRadius: '2px'
  };
}

/**
 * Create screen reader only text (visually hidden)
 * @param text Text for screen readers
 * @returns CSS styles for sr-only text
 */
export function createScreenReaderOnlyStyles() {
  return {
    position: 'absolute' as const,
    left: '-10000px',
    top: 'auto',
    width: '1px',
    height: '1px',
    overflow: 'hidden' as const,
    clip: 'rect(0, 0, 0, 0)',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap' as const
  };
}

/**
 * Check if text is readable (sufficient contrast and size)
 * @param element Text element to check
 * @param wcagLevel WCAG compliance level
 * @returns Readability status
 */
export function isTextReadable(element: HTMLElement, wcagLevel: WCAGLevel = 'AA'): {
  isReadable: boolean;
  contrast: number;
  fontSize: number;
  issues: string[];
} {
  const issues: string[] = [];
  const styles = window.getComputedStyle(element);
  
  // Get colors
  const color = styles.color;
  const backgroundColor = styles.backgroundColor || '#ffffff';
  
  const contrast = calculateContrastRatio(color, backgroundColor);
  const fontSize = parseFloat(styles.fontSize);
  
  // Check contrast requirements
  const isLargeText = fontSize >= 18 || (fontSize >= 14 && styles.fontWeight === 'bold');
  const minimumContrast = wcagLevel === 'AAA' ? (isLargeText ? 4.5 : 7) : (isLargeText ? 3 : 4.5);
  
  if (contrast < minimumContrast) {
    issues.push(`Insufficient contrast: ${contrast.toFixed(2)} (minimum: ${minimumContrast})`);
  }
  
  // Check font size
  if (fontSize < 12) {
    issues.push('Font size too small for readability');
  }
  
  return {
    isReadable: issues.length === 0,
    contrast,
    fontSize,
    issues
  };
}

/**
 * Validate form accessibility
 * @param form Form element to validate
 * @returns Form accessibility status
 */
export function validateFormAccessibility(form: HTMLFormElement): {
  isAccessible: boolean;
  fieldIssues: Array<{ field: HTMLElement; issues: string[] }>;
  globalIssues: string[];
} {
  const fieldIssues: Array<{ field: HTMLElement; issues: string[] }> = [];
  const globalIssues: string[] = [];
  
  // Check form-level accessibility
  if (!form.getAttribute('aria-label') && !form.getAttribute('aria-labelledby')) {
    globalIssues.push('Form lacks accessible name');
  }
  
  // Check all form fields
  const formElements = form.querySelectorAll('input, select, textarea');
  
  formElements.forEach((element) => {
    const issues: string[] = [];
    const htmlElement = element as HTMLElement;
    
    // Check for label association
    const hasLabel = !!(
      htmlElement.getAttribute('aria-label') ||
      htmlElement.getAttribute('aria-labelledby') ||
      form.querySelector(`label[for="${htmlElement.id}"]`) ||
      htmlElement.closest('label')
    );
    
    if (!hasLabel) {
      issues.push('Field lacks associated label');
    }
    
    // Check required fields
    if (htmlElement.hasAttribute('required') && !htmlElement.getAttribute('aria-required')) {
      issues.push('Required field not marked with aria-required');
    }
    
    // Check error handling
    if (htmlElement.hasAttribute('aria-invalid') && htmlElement.getAttribute('aria-invalid') === 'true') {
      const hasErrorMessage = !!(
        htmlElement.getAttribute('aria-errormessage') ||
        htmlElement.getAttribute('aria-describedby')
      );
      
      if (!hasErrorMessage) {
        issues.push('Invalid field lacks error message reference');
      }
    }
    
    if (issues.length > 0) {
      fieldIssues.push({ field: htmlElement, issues });
    }
  });
  
  return {
    isAccessible: globalIssues.length === 0 && fieldIssues.length === 0,
    fieldIssues,
    globalIssues
  };
}

/**
 * Generate unique ID for accessibility relationships
 * @param prefix Optional prefix
 * @returns Unique ID string
 */
export function generateAccessibilityId(prefix: string = 'a11y'): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Debounce function for accessibility announcements
 * @param func Function to debounce
 * @param delay Delay in milliseconds
 * @returns Debounced function
 */
export function debounceAnnouncement<T extends (...args: any[]) => any>(
  func: T,
  delay: number = 100
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Check if user prefers reduced motion
 * @returns Whether user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if user is using high contrast mode
 * @returns Whether high contrast mode is active
 */
export function hasHighContrastMode(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check for Windows high contrast mode
  return window.matchMedia('(prefers-contrast: high)').matches ||
         window.matchMedia('(forced-colors: active)').matches;
}