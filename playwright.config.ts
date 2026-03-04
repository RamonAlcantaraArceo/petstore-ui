import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests/visual',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : undefined,
  reporter: isCI ? [['github'], ['html', { open: 'never' }]] : [['list']],
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
  projects: [
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
  ],
  webServer: {
    command: 'bun run preview',
    port: 4000,
    timeout: 120 * 1000,
    reuseExistingServer: !isCI,
  },
});
