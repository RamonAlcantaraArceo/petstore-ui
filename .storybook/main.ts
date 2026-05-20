import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)', '../src/**/*.stories.mdx'],
  staticDirs: ['../public'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-vitest'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
    },
  },
  viteFinal: async (config) => {
    // Prevent Vite from copying public/ into the build output
    // (public/ contains the static website, not Storybook assets)
    config.publicDir = false;

    // Ensure compatibility with Bun's module resolution
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': new URL('../src', import.meta.url).pathname,
        '@/components': new URL('../src/components', import.meta.url).pathname,
        '@/tokens': new URL('../src/tokens', import.meta.url).pathname,
        '@/stories': new URL('../src/stories', import.meta.url).pathname,
        '@/types': new URL('../src/types', import.meta.url).pathname,
      };
    }

    // Configure Bun-compatible settings
    config.define = {
      ...config.define,
      global: 'globalThis',
    };

    // Fix Node.js compatibility issues in browser environment
    config.optimizeDeps = {
      ...config.optimizeDeps,
      include: ['react', 'react-dom'],
    };

    return config;
  },
  docs: {
    defaultName: 'Documentation',
  },
};

export default config;
