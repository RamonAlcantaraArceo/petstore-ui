import type { VisualReportData } from '../../visual-report/types';

const SVG_PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="180"><rect width="300" height="180" fill="#1f2937"/><text x="150" y="95" text-anchor="middle" fill="#e5e7eb" font-size="16" font-family="Arial">Preview</text></svg>',
  );

export const visualReportFixture: VisualReportData = {
  generatedAt: new Date('2026-03-04T12:00:00Z').toISOString(),
  source: {
    storybookIndex: 'index.json',
    playwrightJson: 'playwright-report.json',
    expectedDir: '/visual-report/assets/expected',
    actualDir: '/visual-report/assets/actual',
    diffDir: '/visual-report/assets/diff',
  },
  viewports: ['desktop', 'mobile'],
  namespaces: ['Storybook', 'Petstore'],
  components: [
    {
      id: 'storybook-atoms-button--primary',
      name: 'Primary',
      namespace: 'Storybook',
      atomicLevel: 'Atoms',
      component: 'Button',
      title: 'Storybook/Atoms/Button',
      variants: [
        {
          viewport: 'desktop',
          expected: SVG_PLACEHOLDER,
          actual: SVG_PLACEHOLDER,
          diff: SVG_PLACEHOLDER,
          status: 'failed',
        },
        {
          viewport: 'mobile',
          expected: SVG_PLACEHOLDER,
          actual: SVG_PLACEHOLDER,
          diff: null,
          status: 'passed',
        },
      ],
    },
    {
      id: 'petstore-table--empty',
      name: 'Empty state',
      namespace: 'Petstore',
      atomicLevel: 'Organisms',
      component: 'Table',
      title: 'Petstore/Organisms/Table',
      variants: [
        {
          viewport: 'desktop',
          expected: SVG_PLACEHOLDER,
          actual: SVG_PLACEHOLDER,
          diff: null,
          status: 'passed',
        },
      ],
    },
  ],
};
