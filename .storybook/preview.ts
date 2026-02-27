import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';

// Import global styles that would be used in the actual app
import '../src/styles/global.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      theme: themes.light,
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1a1a1a',
        },
        {
          name: 'gray',
          value: '#f5f5f5',
        },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1200px',
            height: '800px',
          },
        },
      },
    },
    // Accessibility addon configuration
    a11y: {
      element: '#storybook-root',
      config: {},
      options: {},
      manual: true,
    },
    // Layout configuration
    layout: 'centered',
  },
  // Global decorators for all stories
  decorators: [
    (Story) => (
      <div style= {{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '1rem',
    }} >
  <Story />
  </div>
    ),
  ],
// Global arg types for better Copilot understanding
argTypes: {
  className: {
    control: 'text',
      description: 'Additional CSS class names',
        table: {
      type: { summary: 'string' },
      defaultValue: { summary: '' },
    },
  },
  children: {
    control: 'text',
      description: 'Child elements or content',
        table: {
      type: { summary: 'ReactNode' },
    },
  },
},
globalTypes: {
  theme: {
    name: 'Theme',
      description: 'Global theme for components',
        defaultValue: 'light',
          toolbar: {
      icon: 'circlehollow',
        items: ['light', 'dark'],
          showName: true,
            dynamicTitle: true,
      },
  },
},
};

export default preview;