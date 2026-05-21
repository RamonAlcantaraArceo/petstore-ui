import { defineConfig } from 'vitest/config';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  resolve: {
    alias: {
      '@petstore-ui/atoms': fileURLToPath(
        new URL('./packages/atoms/src/index.ts', import.meta.url),
      ),
      '@petstore-ui/app': fileURLToPath(new URL('./packages/app/src/index.ts', import.meta.url)),
      '@petstore-ui/visual-reporter': fileURLToPath(
        new URL('./packages/visual-reporter/src/index.ts', import.meta.url),
      ),
      '@petstore-ui/shared': fileURLToPath(
        new URL('./packages/shared/src/index.ts', import.meta.url),
      ),
    },
  },
  test: {
    include: [
      'packages/**/*.test.ts',
      'packages/**/*.test.tsx',
      'packages/**/*.spec.ts',
      'packages/**/*.spec.tsx',
    ],
    exclude: ['node_modules', 'dist', 'build', 'storybook-static', '.bun'],
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./test-setup.ts'],
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
    reporters: ['default', 'junit'],
    outputFile: {
      junit: './junit.xml',
    },
  },
});
