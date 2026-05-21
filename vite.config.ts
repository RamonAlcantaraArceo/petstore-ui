import { codecovVitePlugin } from '@codecov/vite-plugin';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  publicDir: false,
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
  build: {
    outDir: 'dist/codecov',
    emptyOutDir: true,
    lib: {
      entry: 'packages/shared/src/index.ts',
      formats: ['es'],
      fileName: 'petstore-ui',
    },
    sourcemap: true,
  },
  plugins: [
    codecovVitePlugin({
      enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
      bundleName: 'petstore-ui',
      uploadToken: process.env.CODECOV_TOKEN,
      dryRun: process.env.CODECOV_DRY_RUN === 'true',
    }),
  ],
});
