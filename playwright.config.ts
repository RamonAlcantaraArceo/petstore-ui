import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;
const additionalViewportProjectsEnabled = process.env.PW_ENABLE_ADDITIONAL_VIEWPORTS === '1';

const baseProjects = [
  {
    name: 'desktop',
    use: {
      viewport: { width: 1280, height: 720 },
    },
  },
  {
    name: 'mobile',
    use: {
      ...devices['iPhone 13'],
    },
  },
];

const additionalProjects = [
  {
    name: 'tablet',
    use: {
      ...devices['iPad Pro 11'],
    },
  },
  {
    name: 'desktop-wide',
    use: {
      viewport: { width: 1440, height: 900 },
    },
  },
  {
    name: 'mobile-small',
    use: {
      ...devices['iPhone SE'],
    },
  },
];

export default defineConfig({
  testDir: './tests/visual',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : undefined,
  reporter: isCI
    ? [
        ['github'],
        ['html', { open: 'never' }],
        ['json', { outputFile: 'test-results/playwright-report.json' }],
      ]
    : [
        ['list'],
        ['html', { open: 'never' }],
        ['json', { outputFile: 'test-results/playwright-report.json' }],
      ],
  use: {
    baseURL: 'http://127.0.0.1:4000',
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    animation: 'disabled',
  },
  expect: {
    toHaveScreenshot: {
      animations: 'disabled',
      caret: 'hide',
    },
  },
  projects: additionalViewportProjectsEnabled
    ? [...baseProjects, ...additionalProjects]
    : baseProjects,
  webServer: {
    command: 'bun run preview',
    port: 4000,
    timeout: 120 * 1000,
    reuseExistingServer: !isCI,
  },
});
