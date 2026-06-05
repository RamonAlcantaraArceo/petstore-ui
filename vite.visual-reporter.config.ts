import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/**
 * Vite build config for the Visual Reporter app.
 * Outputs public/visual-report/app.js consumed by generate-visual-report.ts.
 */
export default defineConfig({
  root: resolve(__dirname, 'packages/visual-reporter'),
  publicDir: 'public',
  build: {
    outDir: resolve(__dirname, 'public/visual-report'),
    emptyOutDir: false,
    rollupOptions: {
      input: { app: resolve(__dirname, 'packages/visual-reporter/src/bootstrap.tsx') },
      output: {
        entryFileNames: 'app.js',
        format: 'es',
      },
    },
    minify: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'packages/shared/src'),
      '@/components': resolve(__dirname, 'packages/shared/src/components'),
      '@/tokens': resolve(__dirname, 'packages/atoms/src/tokens'),
      '@/stories': resolve(__dirname, 'packages'),
      '@/types': resolve(__dirname, 'packages/app/src/services'),
    },
  },
  esbuild: {
    jsx: 'automatic',
    sourcemap: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime'],
  },
});
