/**
 * TypeScript types for the i18n system
 * Provides type safety for translation keys and parameters
 */

import type { EnLocale } from './locales/en';
import type { ChefLocale } from './locales/chef';

// Supported locale codes
export type SupportedLocale = 'en' | 'chef' | 'debug';

// Union type of all locale objects
/**
 * Type for a single locale's translation data
 *
 * Use `unknown` for values to avoid propagating `any`.
 */
export type DebugLocale = Record<string, unknown>;
export type LocaleData = EnLocale | ChefLocale | DebugLocale;

// Extract all possible translation keys from the English locale
export type TranslationKeyPath<T, P extends string = ''> = {
  [K in keyof T]: T[K] extends string
    ? P extends ''
      ? K
      : `${P}.${string & K}`
    : T[K] extends Record<string, unknown>
      ? TranslationKeyPath<T[K], P extends '' ? string & K : `${P}.${string & K}`>
      : never;
}[keyof T];

// All available translation keys derived from the English locale structure
export type TranslationKey = TranslationKeyPath<EnLocale>;

// Parameter interpolation type
export interface TranslationParams {
  [key: string]: string | number;
}

// Translation function type
export type TranslationFunction = (
  key: TranslationKey | string,
  params?: TranslationParams,
) => string;

// Locale context types
export interface LocaleContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: TranslationFunction;
  isRTL: boolean;
}

// Locale provider props
export interface LocaleProviderProps {
  locale?: SupportedLocale;
  children: React.ReactNode;
}

// Hook return type
export interface UseTranslationReturn {
  t: TranslationFunction;
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  isRTL: boolean;
}

// Utility type to ensure all locales have the same structure
export type LocaleStructureCheck<T> = T extends EnLocale ? T : never;

// Validation that Chef locale has same structure as English
export type ChefLocaleValidation = LocaleStructureCheck<{
  [K in keyof EnLocale]: ChefLocale[K] extends EnLocale[K] ? ChefLocale[K] : never;
}>;

// Export locale registry for runtime use
export interface LocaleRegistry {
  en: EnLocale;
  chef: ChefLocale;
  debug: DebugLocale;
}

// Common translation patterns
export interface ComponentTranslations {
  ariaLabel?: string;
  ariaLabelLoading?: string;
  ariaPressed?: string;
  ariaExpanded?: string;
  loading?: string;
  disabled?: string;
  required?: string;
  invalid?: string;
}

export interface StoryTranslations {
  title: string;
  description: string;
  variants?: Record<string, string>;
  states?: Record<string, string>;
  examples?: Record<string, string>;
}

// Accessibility-specific types
export interface A11yTranslations {
  announcements: Record<string, string>;
  instructions: Record<string, string>;
  labels: Record<string, string>;
}
