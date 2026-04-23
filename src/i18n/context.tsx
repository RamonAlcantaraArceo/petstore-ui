/**
 * Locale Context Provider
 * React context for managing current locale and providing translation functions
 */

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import type {
  SupportedLocale,
  LocaleContextValue,
  LocaleProviderProps,
  TranslationFunction,
} from './types';
import {
  getTranslation,
  getLocaleData,
  isRTLLocale,
  DEFAULT_LOCALE,
  isSupportedLocale,
} from './registry';

// Create the locale context
const LocaleContext = createContext<LocaleContextValue | null>(null);

// LocalStorage key for persisting locale preference
const LOCALE_STORAGE_KEY = 'petstore-ui-locale';

/**
 * Hook to access the locale context
 * @returns The locale context value
 * @throws Error if used outside of LocaleProvider
 */
export function useLocaleContext(): LocaleContextValue {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error('useLocaleContext must be used within a LocaleProvider');
  }

  return context;
}

/**
 * Hook to access translation functionality
 * @returns Translation function and locale utilities
 */
export function useTranslation() {
  const { t, locale, setLocale, isRTL } = useLocaleContext();

  // Create a stable reference for the translation function
  const stableT = useCallback<TranslationFunction>(
    (key, params) => {
      return t(key, params);
    },
    [t],
  );

  return {
    t: stableT,
    locale,
    setLocale,
    isRTL,
  };
}

/**
 * Get the stored locale from localStorage
 * @returns The stored locale or default if not found/invalid
 */
function getStoredLocale(): SupportedLocale {
  if (typeof window === 'undefined') {
    return DEFAULT_LOCALE;
  }

  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored && isSupportedLocale(stored)) {
      return stored;
    }
  } catch (error) {
    console.warn('Failed to read locale from localStorage:', error);
  }

  return DEFAULT_LOCALE;
}

/**
 * Store the locale in localStorage
 * @param locale The locale to store
 */
function storeLocale(locale: SupportedLocale): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch (error) {
    console.warn('Failed to store locale in localStorage:', error);
  }
}

/**
 * Announce locale changes to screen readers
 * @param locale The new locale
 */
function announceLocaleChange(locale: SupportedLocale): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  try {
    // Create a live region announcement for screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';

    // Get the localized announcement text
    const localeData = getLocaleData(locale);
    const announcementText = getTranslation(
      localeData,
      'accessibility.announcements.localeChanged',
      { locale: locale },
    );

    announcement.textContent = announcementText;
    document.body.appendChild(announcement);

    // Remove after announcement
    setTimeout(() => {
      if (announcement.parentNode) {
        announcement.parentNode.removeChild(announcement);
      }
    }, 1000);
  } catch (error) {
    console.warn('Failed to announce locale change:', error);
  }
}

/**
 * Locale Provider Component
 * Provides locale context to all child components
 */
export const LocaleProvider: React.FC<LocaleProviderProps> = ({ locale: propLocale, children }) => {
  // Initialize state with prop locale or stored locale
  const [currentLocale, setCurrentLocale] = useState<SupportedLocale>(() => {
    return propLocale || getStoredLocale();
  });

  // Update locale when prop changes
  useEffect(() => {
    if (propLocale && propLocale !== currentLocale) {
      setCurrentLocale(propLocale);
    }
  }, [propLocale, currentLocale]);

  // Store locale changes in localStorage and announce to screen readers
  const handleSetLocale = useCallback(
    (newLocale: SupportedLocale) => {
      if (newLocale !== currentLocale) {
        setCurrentLocale(newLocale);
        storeLocale(newLocale);
        announceLocaleChange(newLocale);
      }
    },
    [currentLocale],
  );

  // Create the translation function
  const translate: TranslationFunction = useCallback(
    (key, params) => {
      const localeData = getLocaleData(currentLocale);
      return getTranslation(localeData, key, params);
    },
    [currentLocale],
  );

  // Check if current locale is RTL
  const isRTL = useMemo(() => isRTLLocale(currentLocale), [currentLocale]);

  // Create stable context value
  const contextValue = useMemo<LocaleContextValue>(
    () => ({
      locale: currentLocale,
      setLocale: handleSetLocale,
      t: translate,
      isRTL,
    }),
    [currentLocale, handleSetLocale, translate, isRTL],
  );

  // Set document direction for RTL support
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
      document.documentElement.lang = currentLocale === 'chef' ? 'en' : currentLocale;
    }
  }, [isRTL, currentLocale]);

  return <LocaleContext.Provider value={contextValue}>{children}</LocaleContext.Provider>;
};

export default LocaleProvider;
