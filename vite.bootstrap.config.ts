import { defineConfig } from 'vite';

/**
 * Vite build config for the Petstore SPA entry point.
 * Outputs petstore/dist/index.js consumed by petstore/index.html.
 */
export default defineConfig({
  // Keep petstore/dist focused on compiled app bundles only.
  // Static assets for preview/reporting are served from repo-level public/.
  publicDir: false,
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
    sourcemap: true,
  },
});
