/**
 * Locale registry and utility functions
 * Central registry for all supported locales with type-safe access
 */

import { en } from './locales/en';
import { chef } from './locales/chef';
import type { 
  SupportedLocale, 
  LocaleRegistry, 
  TranslationKey, 
  TranslationParams, 
  LocaleData 
} from './types';

// Registry of all available locales
export const locales: LocaleRegistry = {
  en,
  chef
} as const;

// Locale metadata for UI display
export const localeMetadata = {
  en: {
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    direction: 'ltr' as const
  },
  chef: {
    name: 'Swedish Chef (Pseudo)',
    nativeName: 'Børk Børk (Pšëüdø)',
    flag: '👨‍🍳',
    direction: 'ltr' as const
  }
} as const;

// Default locale
export const DEFAULT_LOCALE: SupportedLocale = 'en';

// RTL languages (none currently, but ready for Arabic, Hebrew, etc.)
export const RTL_LOCALES: SupportedLocale[] = [];

/**
 * Get a translation from a locale object using dot notation key path
 * @param locale The locale data object
 * @param key The translation key using dot notation
 * @param params Optional parameters for interpolation
 * @returns The translated string
 */
export function getTranslation(
  locale: LocaleData,
  key: TranslationKey | string,
  params?: TranslationParams
): string {
  try {
    // Split the key by dots to traverse the object
    const keyParts = key.split('.');
    let value: any = locale;
    
    // Traverse the nested object
    for (const part of keyParts) {
      if (value && typeof value === 'object' && part in value) {
        value = value[part];
      } else {
        // Key not found, return the key itself as fallback
        console.warn(`Translation key "${key}" not found in locale`);
        return key;
      }
    }
    
    // If we found a string, interpolate parameters if provided
    if (typeof value === 'string') {
      return params ? interpolateParams(value, params) : value;
    }
    
    // If we ended up at a non-string value, return the key as fallback
    console.warn(`Translation key "${key}" does not point to a string value`);
    return key;
  } catch (error) {
    console.error(`Error retrieving translation for key "${key}":`, error);
    return key;
  }
}

/**
 * Interpolate parameters into a translation string
 * Replaces {paramName} with corresponding parameter values
 * @param text The text with parameter placeholders
 * @param params The parameter values
 * @returns The interpolated string
 */
export function interpolateParams(
  text: string, 
  params: TranslationParams
): string {
  return text.replace(/\{(\w+)\}/g, (match, paramName) => {
    const value = params[paramName];
    if (value !== undefined) {
      return String(value);
    }
    console.warn(`Parameter "${paramName}" not found for interpolation in: ${text}`);
    return match; // Return the placeholder if parameter not found
  });
}

/**
 * Check if a locale is supported
 * @param locale The locale code to check
 * @returns True if the locale is supported
 */
export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return locale in locales;
}

/**
 * Get the locale data for a specific locale
 * @param locale The locale code
 * @returns The locale data object
 */
export function getLocaleData(locale: SupportedLocale): LocaleData {
  return locales[locale];
}

/**
 * Check if a locale uses RTL text direction
 * @param locale The locale code to check
 * @returns True if RTL, false if LTR
 */
export function isRTLLocale(locale: SupportedLocale): boolean {
  return RTL_LOCALES.includes(locale);
}

/**
 * Get all available locales
 * @returns Array of supported locale codes
 */
export function getAvailableLocales(): SupportedLocale[] {
  return Object.keys(locales) as SupportedLocale[];
}

/**
 * Get locale metadata for display in UI
 * @param locale The locale code
 * @returns Metadata object with display information
 */
export function getLocaleMetadata(locale: SupportedLocale) {
  return localeMetadata[locale];
}

/**
 * Validate that a translation key exists in the default locale
 * @param key The translation key to validate
 * @returns True if the key exists
 */
export function validateTranslationKey(key: string): boolean {
  try {
    const keyParts = key.split('.');
    let value: any = locales[DEFAULT_LOCALE];
    
    for (const part of keyParts) {
      if (value && typeof value === 'object' && part in value) {
        value = value[part];
      } else {
        return false;
      }
    }
    
    return typeof value === 'string';
  } catch {
    return false;
  }
}

/**
 * Get all translation keys for a given namespace
 * @param namespace The namespace (e.g., 'components.button')
 * @returns Array of available keys in that namespace
 */
export function getTranslationKeysInNamespace(namespace: string): string[] {
  const namespaceParts = namespace.split('.');
  let value: any = locales[DEFAULT_LOCALE];
  
  for (const part of namespaceParts) {
    if (value && typeof value === 'object' && part in value) {
      value = value[part];
    } else {
      return [];
    }
  }
  
  if (typeof value === 'object') {
    return Object.keys(value).filter(key => typeof value[key] === 'string');
  }
  
  return [];
}