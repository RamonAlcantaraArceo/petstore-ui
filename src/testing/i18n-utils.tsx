/**
 * Internationalization (i18n) Testing Utilities
 * Helper functions for testing translation and locale functionality
 */

import React from 'react';
// import { render, RenderOptions } from '@testing-library/react';
// import { LocaleProvider } from '../i18n';
import type { SupportedLocale } from '../i18n';

/**
 * Custom render function with LocaleProvider wrapper
 * @param ui Component to render
 * @param options Render options including locale
 * @returns Testing library render result
 */
export function renderWithLocale(
  _ui: React.ReactElement,
  options: { locale?: SupportedLocale } = {}
) {
  const { locale = 'en' } = options;
  
  // TODO: Implement when testing library is available
  console.log(`Would render component with locale: ${locale}`);
  return null as any;
}

/**
 * Test translation key coverage
 * Validates that all required translation keys exist in all locales
 * @param requiredKeys Array of translation keys that should exist
 * @param locales Array of locales to check (optional, defaults to all)
 * @returns Validation results
 */
export function validateTranslationCoverage(
  // TODO: Implement when testing is set up
  // requiredKeys: string[],
  // locales?: SupportedLocale[]
) {
  // This would be implemented with the actual locale data
  // For now, we'll create a structure that can be extended
  const results: Record<string, { missing: string[]; present: string[] }> = {};
  
  // TODO: Implement actual validation logic
  // This is a placeholder for the testing pattern
  
  return results;
}

/**
 * Test text expansion with Chef locale
 * Validates that UI can handle expanded text without breaking layout
 * @param component Component to test
 * @param maxWidthPx Maximum expected width in pixels
 * @returns Test results
 */
export function testTextExpansion(component: React.ReactElement, maxWidthPx: number = 400) {
  // Render with English locale
  const enResult = renderWithLocale(component, { locale: 'en' });
  const enElement = enResult.container.firstElementChild as HTMLElement;
  const enWidth = enElement?.offsetWidth || 0;
  
  // Render with Chef locale (expanded text)
  enResult.unmount();
  const chefResult = renderWithLocale(component, { locale: 'chef' });
  const chefElement = chefResult.container.firstElementChild as HTMLElement;
  const chefWidth = chefElement?.offsetWidth || 0;
  
  const expansionRatio = chefWidth / enWidth;
  const exceedsMaxWidth = chefWidth > maxWidthPx;
  
  chefResult.unmount();
  
  return {
    englishWidth: enWidth,
    chefWidth: chefWidth,
    expansionRatio,
    exceedsMaxWidth,
    isAcceptable: !exceedsMaxWidth && expansionRatio <= 1.5 // 50% max expansion
  };
}

/**
 * Mock translation function for testing
 * @param key Translation key
 * @param params Optional parameters
 * @returns Mock translated string
 */
export function mockTranslation(key: string, params?: Record<string, any>): string {
  // Simple mock that returns the key with params if provided
  if (params) {
    return `${key}:${JSON.stringify(params)}`;
  }
  return key;
}

/**
 * Create mock useTranslation hook for testing
 * @param locale Mock locale
 * @returns Mock translation hook result
 */
export function createMockUseTranslation(locale: SupportedLocale = 'en') {
  return {
    t: mockTranslation,
    locale,
    // setLocale: jest.fn(),
    isRTL: false
  };
}

/**
 * Test component with all supported locales
 * Renders component with each locale and returns results
 * @param component Component to test
 * @returns Results for each locale
 */
export function testWithAllLocales(component: React.ReactElement) {
  const locales: SupportedLocale[] = ['en', 'chef'];
  const results: Record<SupportedLocale, any> = {} as any;
  
  locales.forEach(locale => {
    const result = renderWithLocale(component, { locale });
    results[locale] = {
      container: result.container,
      queries: result,
      textContent: result.container.textContent
    };
    result.unmount();
  });
  
  return results;
}

/**
 * Validate that translated text contains expected content
 * @param translatedText The translated text to validate
 * @param expectedKeywords Keywords that should be present
 * @param locale The locale being tested
 * @returns Validation result
 */
export function validateTranslatedContent(
  translatedText: string,
  expectedKeywords: string[],
  locale: SupportedLocale
) {
  const lowerText = translatedText.toLowerCase();
  const missingKeywords: string[] = [];
  const presentKeywords: string[] = [];
  
  expectedKeywords.forEach(keyword => {
    const lowerKeyword = keyword.toLowerCase();
    if (lowerText.includes(lowerKeyword)) {
      presentKeywords.push(keyword);
    } else {
      missingKeywords.push(keyword);
    }
  });
  
  const hasExpansionCharacters = locale === 'chef' && /[üßñçøäéï]/.test(translatedText);
  const hasExpectedLength = locale === 'chef' ? translatedText.length > 10 : translatedText.length > 0;
  
  return {
    isValid: missingKeywords.length === 0 && hasExpectedLength,
    missingKeywords,
    presentKeywords,
    hasExpansionCharacters,
    hasExpectedLength,
    textLength: translatedText.length,
    locale
  };
}

/**
 * Test parameter interpolation in translations
 * @param translationFunction Translation function to test
 * @param key Translation key
 * @param params Parameters to interpolate
 * @returns Test results
 */
export function testParameterInterpolation(
  translationFunction: (key: string, params?: Record<string, any>) => string,
  key: string,
  params: Record<string, string | number>
) {
  const result = translationFunction(key, params);
  const parameterKeys = Object.keys(params);
  const interpolatedParameters: string[] = [];
  const missingParameters: string[] = [];
  
  parameterKeys.forEach(paramKey => {
    const paramValue = String(params[paramKey]);
    if (result.includes(paramValue)) {
      interpolatedParameters.push(paramKey);
    } else {
      missingParameters.push(paramKey);
    }
  });
  
  return {
    result,
    interpolatedParameters,
    missingParameters,
    isValid: missingParameters.length === 0,
    originalKey: key,
    parameters: params
  };
}