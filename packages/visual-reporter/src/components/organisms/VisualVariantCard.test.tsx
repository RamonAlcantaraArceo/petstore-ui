import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { LocaleProvider } from '../../i18n';
import { auditAccessibility } from '../../testing/a11y-utils';
import { visualReportFixture } from '../../stories/visual-report/fixtures';
import { VisualVariantCard } from './VisualVariantCard';

const renderWithLocale = (ui: React.ReactElement) =>
  render(<LocaleProvider locale="en">{ui}</LocaleProvider>);

describe('VisualVariantCard', () => {
  it('renders status badge and mode controls', () => {
    const story = visualReportFixture.components[0]!;
    const variant = story.variants[0]!;

    renderWithLocale(
      <VisualVariantCard
        story={story}
        variant={variant}
        generatedAt={visualReportFixture.generatedAt}
        activeMode="slider"
        onModeChange={() => {}}
      />,
    );

    expect(screen.getByText(/failed/i)).toBeDefined();
    expect(screen.getByRole('tablist')).toBeDefined();
  });

  it('returns accessibility audit result', async () => {
    const story = visualReportFixture.components[0]!;
    const variant = story.variants[0]!;

    const { container } = renderWithLocale(
      <VisualVariantCard
        story={story}
        variant={variant}
        generatedAt={visualReportFixture.generatedAt}
        activeMode="slider"
        onModeChange={() => {}}
      />,
    );

    const article = container.querySelector('article');
    expect(article).toBeTruthy();

    if (!article) {
      return;
    }

    const audit = await auditAccessibility(article);
    expect(audit).toHaveProperty('overallScore');
    expect(audit).toHaveProperty('isCompliant');
  });
});
