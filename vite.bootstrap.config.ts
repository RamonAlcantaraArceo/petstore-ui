import { defineConfig } from 'vite';

/**
 * Vite build config for the Petstore SPA entry point.
 * Outputs petstore/dist/index.js consumed by petstore/index.html.
 */
export default defineConfig({
  build: {
    outDir: 'petstore/dist',
    emptyOutDir: true,
    rollupOptions: {
      input: { index: 'packages/app/src/bootstrap.tsx' },
      output: {
        entryFileNames: '[name].js',
        format: 'es',
      },
    },
    minify: true,
  },
  esbuild: {
    jsx: 'automatic',
  },
});
