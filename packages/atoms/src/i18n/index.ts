/**
 * Internationalization (i18n) Module
 * Complete i18n solution for petstore-ui component library
 *
 * @example
 * ```tsx
 * import { LocaleProvider, useTranslation } from './i18n';
 *
 * // Wrap your app with LocaleProvider
 * <LocaleProvider locale="en">
 *   <App />
 * </LocaleProvider>
 *
 * // Use translations in components
 * function MyComponent() {
 *   const { t } = useTranslation();
 *   return <button>{t('components.button.submit')}</button>;
 * }
 * ```
 */

// Core exports
export { LocaleProvider, useTranslation, useLocaleContext } from './context';

// Registry and utilities
export {
  locales,
  localeMetadata,
  getTranslation,
  interpolateParams,
  isSupportedLocale,
  getLocaleData,
  isRTLLocale,
  getAvailableLocales,
  getLocaleMetadata,
  validateTranslationKey,
  getTranslationKeysInNamespace,
  DEFAULT_LOCALE,
} from './registry';

// Type exports
export type {
  SupportedLocale,
  TranslationKey,
  TranslationParams,
  TranslationFunction,
  LocaleContextValue,
  LocaleProviderProps,
  UseTranslationReturn,
  LocaleRegistry,
  ComponentTranslations,
  StoryTranslations,
  A11yTranslations,
} from './types';

// Locale data exports
export { en, type EnLocale } from './locales/en';
export { chef, type ChefLocale } from './locales/chef';
