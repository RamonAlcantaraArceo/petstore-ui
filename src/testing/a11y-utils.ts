/**
 * Accessibility (a11y) Testing Utilities
 * Helper functions for testing accessibility compliance and functionality
 */

// import { render, RenderOptions, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { 
  calculateContrastRatio, 
  hasKeyboardAccessibility,
  isTextReadable,
  // validateFormAccessibility,
  meetsContrastRequirements
} from '../accessibility';

/**
 * Test keyboard navigation for an interactive element
 * @param element The element to test
 * @returns Navigation test results
 */
/* TODO: Uncomment when testing library is installed
export async function testKeyboardNavigation(element: HTMLElement) {
  const user = userEvent.setup();
  const results = {
    canFocus: false,
    canActivateWithEnter: false,
    canActivateWithSpace: false,
    hasVisibleFocus: false,
    tabIndex: element.tabIndex
  };

  try {
    // Test focus
    await user.tab();
    results.canFocus = document.activeElement === element;

    // If we can focus, test activation keys
    if (results.canFocus) {
      // Test Enter key activation
      const enterHandler = jest.fn();
      element.addEventListener('click', enterHandler);
      await user.keyboard('{Enter}');
      results.canActivateWithEnter = enterHandler.mock.calls.length > 0;

      // Test Space key activation (for buttons)
      const spaceHandler = jest.fn();
      element.addEventListener('click', spaceHandler);
      await user.keyboard(' ');
      results.canActivateWithSpace = spaceHandler.mock.calls.length > 0;

      // Check if focus styles are applied
      const computedStyle = window.getComputedStyle(element);
      results.hasVisibleFocus = computedStyle.outline !== 'none' || 
                              computedStyle.boxShadow !== 'none';
    }
  } catch (error) {
    console.warn('Keyboard navigation test failed:', error);
  }

  return results;
}
*/

/**
 * Test screen reader accessibility
 * @param element The element to test
 * @returns Screen reader test results
 */
export function testScreenReaderAccessibility(element: HTMLElement) {
  const results = {
    hasAccessibleName: false,
    hasRole: false,
    hasAriaLabel: false,
    hasAriaLabelledBy: false,
    hasAriaDescribedBy: false,
    hasValidAriaAttributes: true,
    accessibleName: '',
    role: '',
    ariaAttributes: {} as Record<string, string>
  };

  // Check for accessible name
  const ariaLabel = element.getAttribute('aria-label');
  const ariaLabelledBy = element.getAttribute('aria-labelledby');
  const textContent = element.textContent?.trim();
  const title = element.getAttribute('title');

  results.hasAriaLabel = !!ariaLabel;
  results.hasAriaLabelledBy = !!ariaLabelledBy;
  results.accessibleName = ariaLabel || textContent || title || '';
  results.hasAccessibleName = !!results.accessibleName;

  // Check role
  results.role = element.getAttribute('role') || element.tagName.toLowerCase();
  results.hasRole = !!results.role;

  // Check aria-describedby
  results.hasAriaDescribedBy = !!element.getAttribute('aria-describedby');

  // Collect all ARIA attributes
  Array.from(element.attributes).forEach(attr => {
    if (attr.name.startsWith('aria-')) {
      results.ariaAttributes[attr.name] = attr.value;
    }
  });

  // Validate ARIA attributes (basic validation)
  try {
    // Check for common ARIA attribute issues
    const ariaInvalid = element.getAttribute('aria-invalid');
    const ariaRequired = element.getAttribute('aria-required');
    const ariaExpanded = element.getAttribute('aria-expanded');

    // Validate boolean ARIA attributes
    if (ariaInvalid && !['true', 'false', 'grammar', 'spelling'].includes(ariaInvalid)) {
      results.hasValidAriaAttributes = false;
    }
    if (ariaRequired && !['true', 'false'].includes(ariaRequired)) {
      results.hasValidAriaAttributes = false;
    }
    if (ariaExpanded && !['true', 'false'].includes(ariaExpanded)) {
      results.hasValidAriaAttributes = false;
    }
  } catch (error) {
    console.warn('ARIA validation failed:', error);
    results.hasValidAriaAttributes = false;
  }

  return results;
}

/**
 * Test color contrast compliance
 * @param element The element to test
 * @param wcagLevel WCAG compliance level to test against
 * @returns Contrast test results
 */
export function testColorContrast(element: HTMLElement, wcagLevel: 'A' | 'AA' | 'AAA' = 'AA') {
  const computedStyle = window.getComputedStyle(element);
  const color = computedStyle.color;
  const backgroundColor = computedStyle.backgroundColor || '#ffffff';

  const contrastRatio = calculateContrastRatio(color, backgroundColor);
  const meetsRequirements = meetsContrastRequirements({ 
    wcagLevel, 
    textColor: color, 
    backgroundColor 
  });

  const fontSize = parseFloat(computedStyle.fontSize);
  const fontWeight = computedStyle.fontWeight;
  const isLargeText = fontSize >= 18 || (fontSize >= 14 && parseInt(fontWeight) >= 700);

  return {
    contrastRatio,
    meetsRequirements,
    wcagLevel,
    color,
    backgroundColor,
    fontSize,
    fontWeight,
    isLargeText,
    minimumRequired: wcagLevel === 'AAA' ? (isLargeText ? 4.5 : 7) : (isLargeText ? 3 : 4.5)
  };
}

/**
 * Test focus management for a component
 * @param container The container element
 * @returns Focus management test results
 */
export async function testFocusManagement(container: HTMLElement) {
  const user = userEvent.setup();
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const results = {
    focusableElementsCount: focusableElements.length,
    tabOrderIsLogical: true,
    focusTrappingWorks: false,
    initialFocusIsSet: false,
    focusableElements: Array.from(focusableElements) as HTMLElement[]
  };

  if (focusableElements.length === 0) {
    return results;
  }

  try {
    // Test tab order
    const tabOrder: HTMLElement[] = [];
    let currentElement = document.activeElement as HTMLElement;
    
    // Test first few elements in tab order
    for (let i = 0; i < Math.min(focusableElements.length, 5); i++) {
      await user.tab();
      const newElement = document.activeElement as HTMLElement;
      if (currentElement !== newElement) {
        tabOrder.push(newElement);
        currentElement = newElement;
      }
    }

    // Basic tab order validation (just checking if elements are focusable in sequence)
    results.tabOrderIsLogical = tabOrder.length > 0;

    // Test initial focus (if auto-focus is enabled)
    const autoFocusElement = container.querySelector('[autofocus]');
    results.initialFocusIsSet = autoFocusElement === document.activeElement;

  } catch (error) {
    console.warn('Focus management test failed:', error);
  }

  return results;
}

/**
 * Comprehensive accessibility audit for a component
 * @param element The element to audit
 * @returns Complete accessibility audit results
 */
export async function auditAccessibility(element: HTMLElement) {
  const keyboardNav = {
    canFocus: false,
    canActivateWithEnter: false,
    canActivateWithSpace: false,
    hasVisibleFocus: false,
    tabIndex: element.tabIndex
  };
  // TODO: Replace with actual testKeyboardNavigation when testing library is available
  // const keyboardNav = await testKeyboardNavigation(element);
  const screenReader = testScreenReaderAccessibility(element);
  const colorContrast = testColorContrast(element);
  const keyboardAccessibility = hasKeyboardAccessibility(element);
  const textReadability = isTextReadable(element);

  const score = calculateAccessibilityScore({
    keyboardNav,
    screenReader,
    colorContrast,
    keyboardAccessibility,
    textReadability
  });

  return {
    keyboardNavigation: keyboardNav,
    screenReader,
    colorContrast,
    keyboardAccessibility,
    textReadability,
    overallScore: score,
    isCompliant: score >= 0.8, // 80% score for compliance
    recommendations: generateRecommendations({
      keyboardNav,
      screenReader,
      colorContrast,
      keyboardAccessibility,
      textReadability
    })
  };
}

/**
 * Calculate accessibility score based on test results
 * @param results Test results from various accessibility checks
 * @returns Normalized score between 0 and 1
 */
function calculateAccessibilityScore(results: any): number {
  let score = 0;
  let maxScore = 0;

  // Keyboard navigation (25% of score)
  const keyboardScore = (
    (results.keyboardNav.canFocus ? 1 : 0) +
    (results.keyboardNav.canActivateWithEnter ? 1 : 0) +
    (results.keyboardNav.canActivateWithSpace ? 1 : 0) +
    (results.keyboardNav.hasVisibleFocus ? 1 : 0)
  ) / 4;
  score += keyboardScore * 0.25;
  maxScore += 0.25;

  // Screen reader (30% of score)
  const screenReaderScore = (
    (results.screenReader.hasAccessibleName ? 1 : 0) +
    (results.screenReader.hasRole ? 1 : 0) +
    (results.screenReader.hasValidAriaAttributes ? 1 : 0)
  ) / 3;
  score += screenReaderScore * 0.3;
  maxScore += 0.3;

  // Color contrast (25% of score)
  const contrastScore = results.colorContrast.meetsRequirements ? 1 : 0;
  score += contrastScore * 0.25;
  maxScore += 0.25;

  // General accessibility (20% of score)
  const generalScore = (
    (results.keyboardAccessibility.isAccessible ? 1 : 0) +
    (results.textReadability.isReadable ? 1 : 0)
  ) / 2;
  score += generalScore * 0.2;
  maxScore += 0.2;

  return score / maxScore;
}

/**
 * Generate accessibility recommendations based on test results
 * @param results Test results from accessibility checks
 * @returns Array of recommended improvements
 */
function generateRecommendations(results: any): string[] {
  const recommendations: string[] = [];

  if (!results.keyboardNav.canFocus) {
    recommendations.push('Make element focusable with tabindex or use a semantic interactive element');
  }

  if (!results.keyboardNav.hasVisibleFocus) {
    recommendations.push('Add visible focus indicators using :focus styles');
  }

  if (!results.screenReader.hasAccessibleName) {
    recommendations.push('Add accessible name using aria-label, aria-labelledby, or text content');
  }

  if (!results.colorContrast.meetsRequirements) {
    recommendations.push(`Improve color contrast ratio to at least ${results.colorContrast.minimumRequired}:1`);
  }

  if (!results.textReadability.isReadable) {
    recommendations.push('Increase font size or improve color contrast for better readability');
  }

  if (results.keyboardAccessibility.issues.length > 0) {
    recommendations.push(...results.keyboardAccessibility.issues.map((issue: string) => `Fix: ${issue}`));
  }

  return recommendations;
}

/**
 * Custom matcher for Jest to test accessibility compliance
 * @param element Element to test
 * @returns Jest custom matcher result
 */
export function toBeAccessible(element: HTMLElement) {
  const audit = auditAccessibility(element);
  
  return {
    pass: audit.then(result => result.isCompliant),
    message: () => audit.then(result => 
      result.isCompliant
        ? `Expected element NOT to be accessible, but it passed with score ${result.overallScore}`
        : `Expected element to be accessible, but it failed with score ${result.overallScore}. Issues: ${result.recommendations.join(', ')}`
    )
  };
}

// Extend Jest matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeAccessible(): R;
    }
  }
}