/**
 * Testing Utilities
 * Comprehensive testing helpers for i18n, a11y, and component functionality
 *
 * @example
 * ```tsx
 * import { renderWithLocale, testKeyboardNavigation, auditAccessibility } from './testing';
 *
 * test('Button is accessible in all locales', async () => {
 *   const { container } = renderWithLocale(<Button>Click me</Button>, { locale: 'chef' });
 *   const audit = await auditAccessibility(container.firstChild);
 *   expect(audit.isCompliant).toBe(true);
 * });
 * ```
 */

// i18n testing utilities
export {
  renderWithLocale,
  validateTranslationCoverage,
  testTextExpansion,
  mockTranslation,
  createMockUseTranslation,
  testWithAllLocales,
  validateTranslatedContent,
  testParameterInterpolation,
} from './i18n-utils';

// a11y testing utilities
export {
  // testKeyboardNavigation,
  testScreenReaderAccessibility,
  testColorContrast,
  testFocusManagement,
  auditAccessibility,
  toBeAccessible,
} from './a11y-utils';

// Combined testing patterns
export * from './test-patterns';
