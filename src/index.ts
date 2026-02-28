/**
 * Petstore UI Component Library
 * 
 * A modern React + TypeScript component library with design system foundation.
 * Built with accessibility, internationalization, performance, and developer experience in mind.
 */

// Design tokens
export { default as theme } from './tokens/theme';
export type { Theme } from './tokens/theme';
export { colors, spacing, typography, breakpoints, getThemeValue } from './tokens/theme';

// Components
export * from './components';

// Internationalization (i18n)
export * from './i18n';

// Accessibility (a11y)
export * from './accessibility';

// App context
export * from './context';

// Testing utilities (for development and testing environments)
export * from './testing';