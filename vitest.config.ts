import { defineConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
const currentDirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    timeout: 5000,
    retry: 1,
    reporters: ['dot', 'junit'],
    outputFile: {
      junit: './junit.xml',
    },
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'lcov', 'json-summary'],
      reportsDirectory: './coverage',
      include: ['packages/**/*.{ts,tsx}'],
      exclude: [
        'packages/**/*.test.ts',
        'packages/**/*.test.tsx',
        'packages/**/*.spec.ts',
        'packages/**/*.spec.tsx',
        'packages/**/stories/**',
        'packages/**/*.stories.ts',
        'packages/**/*.stories.tsx',
      ],
    },
    projects: [
      {
        extends: true,
        test: {
          include: [
            'packages/**/*.test.ts',
            'packages/**/*.test.tsx',
            'packages/**/*.spec.ts',
            'packages/**/*.spec.tsx',
          ],
          exclude: ['node_modules', 'dist', 'build', 'storybook-static'],
          environment: 'happy-dom',
          globals: true,
          setupFiles: ['./test-setup.ts'],
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(currentDirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          watch: false,
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
        },
      },
    ],
  },
});
