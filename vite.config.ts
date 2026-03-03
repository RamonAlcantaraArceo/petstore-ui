import { codecovVitePlugin } from '@codecov/vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: false,
  build: {
    outDir: 'dist/codecov',
    emptyOutDir: true,
    lib: {
      entry: 'src/index.ts',
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
