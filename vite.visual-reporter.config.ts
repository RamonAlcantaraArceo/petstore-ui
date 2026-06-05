import { defineConfig } from 'vite';

/**
 * Vite build config for the Visual Reporter React app.
 * Outputs public/visual-report/app.js consumed by public/visual-report/index.html.
 */
export default defineConfig({
  build: {
    outDir: 'public/visual-report',
    emptyOutDir: false,
    rollupOptions: {
      input: { app: 'packages/visual-reporter/src/visual-report/bootstrap.tsx' },
      output: {
        entryFileNames: '[name].js',
        format: 'es',
      },
    },
    minify: true,
  },
  esbuild: {
    jsx: 'automatic',
    sourcemap: true,
  },
});
