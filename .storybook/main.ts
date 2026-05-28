import type { StorybookConfig } from '@storybook/react-vite';

type StorybookFlavor = 'all' | 'petstore' | 'visual-report';

const flavor = (process.env.STORYBOOK_FLAVOR || 'all') as StorybookFlavor;

const storiesByFlavor: Record<StorybookFlavor, string[]> = {
  all: [
    '../packages/**/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../packages/**/src/**/*.stories.mdx',
  ],
  petstore: [
    '../packages/atoms/src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../packages/atoms/src/components/**/*.stories.mdx',
    '../packages/app/src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../packages/app/src/components/**/*.stories.mdx',
  ],
  'visual-report': [
    '../packages/atoms/src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../packages/atoms/src/components/**/*.stories.mdx',
    '../packages/visual-reporter/src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../packages/visual-reporter/src/components/**/*.stories.mdx',
  ],
};

if (!Object.prototype.hasOwnProperty.call(storiesByFlavor, flavor)) {
  throw new Error(
    `Invalid STORYBOOK_FLAVOR "${process.env.STORYBOOK_FLAVOR}". Valid values: all, petstore, visual-report`,
  );
}

const config: StorybookConfig = {
  stories: storiesByFlavor[flavor],
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

    // Ensure compatibility with pnpm module resolution
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': new URL('../packages/shared/src', import.meta.url).pathname,
        '@/components': new URL('../packages/shared/src/components', import.meta.url).pathname,
        '@/tokens': new URL('../packages/atoms/src/tokens', import.meta.url).pathname,
        '@/stories': new URL('../packages', import.meta.url).pathname,
        '@/types': new URL('../packages/app/src/services', import.meta.url).pathname,
      };
    }

    // Configure pnpm-compatible settings
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
