import type { Preview } from '@storybook/react';
import React from 'react';
import { theme } from '../src/tokens/theme';

// Theme Provider Context
const ThemeContext = React.createContext(theme);

// Theme Provider Component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeContext.Provider value={theme}>
    <div style={{
      fontFamily: theme.typography.fontFamily.sans.join(', '),
      fontSize: theme.typography.fontSize.base,
      lineHeight: theme.typography.lineHeight.normal,
      color: theme.colors.text?.primary || theme.colors.secondary[900],
      backgroundColor: theme.colors.background?.primary || theme.colors.secondary[50],
      padding: '1rem'
    }}>
      {children}
    </div>
  </ThemeContext.Provider>
);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      expanded: true,
      sort: 'requiredFirst'
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: theme.colors.background?.primary || theme.colors.secondary[50],
        },
        {
          name: 'dark',
          value: theme.colors.background?.secondary || theme.colors.secondary[900],
        },
        {
          name: 'primary',
          value: theme.colors.primary[50],
        },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: theme.breakpoints.sm,
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet', 
          styles: {
            width: theme.breakpoints.md,
            height: '1024px',
          },
        },
        laptop: {
          name: 'Laptop',
          styles: {
            width: theme.breakpoints.lg,
            height: '768px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: theme.breakpoints.xl,
            height: '1024px',
          },
        },
      },
      defaultViewport: 'laptop',
    },
    layout: 'centered',
    docs: {
      theme: {
        base: 'light',
        colorPrimary: theme.colors.primary[500],
        colorSecondary: theme.colors.secondary[500],
        fontBase: theme.typography.fontFamily.sans.join(', '),
        fontCode: theme.typography.fontFamily.mono.join(', '),
      }
    }
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;