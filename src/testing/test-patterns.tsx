/**
 * Common Test Patterns
 * Reusable test patterns combining i18n and a11y testing
 */

import React from 'react';
import { renderWithLocale, testTextExpansion } from './i18n-utils';
import { auditAccessibility } from './a11y-utils';
import type { SupportedLocale } from '../i18n';

/**
 * Test a component's accessibility across all locales
 * @param component Component to test
 * @param options Test configuration options
 * @returns Test results for each locale
 */
export async function testAccessibilityAcrossLocales(
  component: React.ReactElement,
  options: {
    locales?: SupportedLocale[];
    wcagLevel?: 'A' | 'AA' | 'AAA';
    testKeyboard?: boolean;
    testContrast?: boolean;
  } = {},
) {
  const {
    locales = ['en', 'chef'],
    // wcagLevel = 'AA',
    // testKeyboard = true,
    // testContrast = true
  } = options;

  const results: Record<string, any> = {};

  for (const locale of locales) {
    const { container, unmount } = renderWithLocale(component, { locale });
    const element = container.firstElementChild as HTMLElement;

    if (element) {
      const audit = await auditAccessibility(element);

      results[locale] = {
        locale,
        audit,
        isCompliant: audit.isCompliant,
        score: audit.overallScore,
        recommendations: audit.recommendations,
        textLength: element.textContent?.length || 0,
        hasExpandedText: locale === 'chef' && (element.textContent?.length || 0) > 10,
      };
    }

    unmount();
  }

  // Calculate overall compliance
  const overallCompliance = Object.values(results).every((result: any) => result.isCompliant);
  const averageScore =
    Object.values(results).reduce((sum: number, result: any) => sum + result.score, 0) /
    locales.length;

  return {
    results,
    overallCompliance,
    averageScore,
    summary: {
      totalLocalesTested: locales.length,
      compliantLocales: Object.values(results).filter((result: any) => result.isCompliant).length,
      averageScore,
      worstPerformingLocale: Object.entries(results).reduce(
        (worst, [locale, result]: [string, any]) =>
          !worst || result.score < worst.score ? { locale, score: result.score } : worst,
        null as any,
      ),
    },
  };
}

/**
 * Test text expansion and layout stability
 * @param component Component to test
 * @param maxWidth Maximum acceptable width
 * @returns Text expansion test results
 */
export function testInternationalizationLayout(
  component: React.ReactElement,
  maxWidth: number = 400,
) {
  const expansionTest = testTextExpansion(component, maxWidth);

  // Additional layout tests
  const layoutTests = {
    textOverflow: false,
    layoutBreaks: false,
    maintainsAlignment: true,
  };

  // Test with very long text (simulated)
  const longTextComponent = React.cloneElement(component, {
    children:
      'Døes zee vëry løñg tëxt çäüsé zee låyøüt tø brëäk ør øvërflöw zee çøñtäïñër? Børk børk børk!',
  });

  const longTextResult = testTextExpansion(longTextComponent, maxWidth);
  layoutTests.textOverflow = longTextResult.exceedsMaxWidth;

  return {
    expansion: expansionTest,
    layoutStability: layoutTests,
    isAcceptable: expansionTest.isAcceptable && !layoutTests.textOverflow,
    recommendations: [
      ...(!expansionTest.isAcceptable ? ['Consider flexible layout design'] : []),
      ...(layoutTests.textOverflow ? ['Implement text truncation or responsive design'] : []),
      ...(expansionTest.expansionRatio > 1.4 ? ['Consider shorter translation alternatives'] : []),
    ],
  };
}

/**
 * Comprehensive component test combining all i18n and a11y checks
 * @param component Component to test
 * @param options Test configuration
 * @returns Complete test results
 */
export async function comprehensiveComponentTest(
  component: React.ReactElement,
  options: {
    testI18n?: boolean;
    testA11y?: boolean;
    testLayoutStability?: boolean;
    locales?: SupportedLocale[];
    wcagLevel?: 'A' | 'AA' | 'AAA';
    maxWidth?: number;
  } = {},
) {
  const {
    testI18n = true,
    testA11y = true,
    testLayoutStability = true,
    locales = ['en', 'chef'],
    wcagLevel = 'AA',
    maxWidth = 400,
  } = options;

  const results: any = {
    timestamp: new Date().toISOString(),
    component:
      typeof component === 'string' ? component : (component as any).type?.name || 'Unknown',
    options,
  };

  // Accessibility testing across locales
  if (testA11y) {
    results.accessibility = await testAccessibilityAcrossLocales(component, {
      locales,
      wcagLevel,
    });
  }

  // Internationalization layout testing
  if (testI18n && testLayoutStability) {
    results.internationalization = testInternationalizationLayout(component, maxWidth);
  }

  // Generate overall score
  let overallScore = 0;
  let scoreComponents = 0;

  if (testA11y && results.accessibility) {
    overallScore += results.accessibility.averageScore;
    scoreComponents++;
  }

  if (testI18n && results.internationalization) {
    const i18nScore = results.internationalization.isAcceptable ? 1 : 0.5;
    overallScore += i18nScore;
    scoreComponents++;
  }

  results.overallScore = scoreComponents > 0 ? overallScore / scoreComponents : 0;
  results.isFullyCompliant = results.overallScore >= 0.8;

  // Generate recommendations
  results.recommendations = [
    ...(results.accessibility?.summary?.compliantLocales < locales.length
      ? ['Improve accessibility compliance across all locales']
      : []),
    ...(results.internationalization && !results.internationalization.isAcceptable
      ? results.internationalization.recommendations
      : []),
    ...(results.overallScore < 0.8 ? ['Consider overall component design improvements'] : []),
  ];

  return results;
}

/**
 * Test suite factory for components with i18n and a11y
 * @param componentName Name of the component being tested
 * @param componentFactory Function that creates the component to test
 * @returns Jest test functions
 */
export function createA11yI18nTestSuite(
  componentName: string,
  // componentFactory: (props?: any) => React.ReactElement
) {
  return {
    testBasicAccessibility: () => {
      // TODO: Implement when testing library is available
      console.log(`Basic accessibility test for ${componentName} would run here`);
    },

    testInternationalization: () => {
      // TODO: Implement when testing library is available
      console.log(`Internationalization test for ${componentName} would run here`);
    },

    testAccessibilityAcrossLocales: () => {
      // TODO: Implement when testing library is available
      console.log(`Cross-locale accessibility test for ${componentName} would run here`);
    },

    testComprehensive: () => {
      // TODO: Implement when testing library is available
      console.log(`Comprehensive test for ${componentName} would run here`);
    },
  };
}
