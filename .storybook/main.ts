import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../packages/**/*.stories.@(js|jsx|mjs|ts|tsx)', '../packages/**/*.stories.mdx'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-controls',
    '@storybook/addon-docs',
    '@storybook/addon-viewport',
    '@storybook/addon-a11y',
  ],
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
        '@': new URL('../packages/shared/src', import.meta.url).pathname,
        '@/components': new URL('../packages/app/src/components', import.meta.url).pathname,
        '@/tokens': new URL('../packages/atoms/src/tokens', import.meta.url).pathname,
        '@/stories': new URL('../packages/app/src/stories', import.meta.url).pathname,
        '@/types': new URL('../packages/app/src/services', import.meta.url).pathname,
        '@petstore-ui/atoms': new URL('../packages/atoms/src/index.ts', import.meta.url).pathname,
        '@petstore-ui/app': new URL('../packages/app/src/index.ts', import.meta.url).pathname,
        '@petstore-ui/visual-reporter': new URL(
          '../packages/visual-reporter/src/index.ts',
          import.meta.url,
        ).pathname,
        '@petstore-ui/shared': new URL('../packages/shared/src/index.ts', import.meta.url).pathname,
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
      include: ['react', 'react-dom', '@storybook/blocks'],
    };

    return config;
  },
  docs: {
    defaultName: 'Documentation',
  },
};

export default config;
