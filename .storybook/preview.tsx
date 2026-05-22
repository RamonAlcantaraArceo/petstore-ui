import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { theme, LocaleProvider, localeMetadata, getAvailableLocales } from '@petstore-ui/atoms';
import type { SupportedLocale } from '@petstore-ui/atoms';
import { AuthProvider, setBaseUrl } from '@petstore-ui/app';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { mswHandlers } from './msw-handlers';

initialize({ onUnhandledRequest: 'bypass' });

// Theme Provider Context
const ThemeContext = React.createContext(theme);

// Theme and Locale Provider Component
export const StoryProvider: React.FC<{
  children: React.ReactNode;
  locale: SupportedLocale;
}> = ({ children, locale }) => (
  <ThemeContext.Provider value={theme}>
    <AuthProvider>
      <LocaleProvider locale={locale}>
        <div
          style={{
            fontFamily: theme.typography.fontFamily.sans.join(', '),
            fontSize: theme.typography.fontSize.base,
            lineHeight: theme.typography.lineHeight.normal,
            color: theme.colors.text?.primary || theme.colors.secondary[900],
            backgroundColor: theme.colors.background?.primary || theme.colors.secondary[50],
            padding: '1rem',
          }}
        >
          {children}
        </div>
      </LocaleProvider>
    </AuthProvider>
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
      sort: 'requiredFirst',
    },

    backgrounds: {
      options: {
        light: {
          name: 'light',
          value: theme.colors.background?.primary || theme.colors.secondary[50],
        },

        dark: {
          name: 'dark',
          value: theme.colors.background?.secondary || theme.colors.secondary[900],
        },

        primary: {
          name: 'primary',
          value: theme.colors.primary[50],
        },
      },
    },

    viewport: {
      options: {
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
    },

    layout: 'centered',

    docs: {
      theme: {
        base: 'light',
        // Brand
        colorPrimary: theme.colors.primary[500],
        colorSecondary: theme.colors.secondary[500],
        // UI
        appBg: '#f8fafc',
        appContentBg: '#ffffff',
        appPreviewBg: '#ffffff',
        appBorderColor: '#e2e8f0',
        appBorderRadius: 6,
        // Typography
        fontBase: theme.typography.fontFamily.sans.join(', '),
        fontCode: theme.typography.fontFamily.mono.join(', '),
        // Text colors
        textColor: '#1e293b',
        textInverseColor: '#ffffff',
        textMutedColor: '#64748b',
        // Toolbar colors
        barTextColor: '#64748b',
        barSelectedColor: '#3b82f6',
        barBg: '#ffffff',
        // Form colors
        inputBg: '#ffffff',
        inputBorder: '#cbd5e1',
        inputTextColor: '#1e293b',
        inputBorderRadius: 4,
      },
    },
    /* a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'focus-order-semantics', enabled: true },
          { id: 'keyboard-navigation', enabled: true },
          { id: 'landmark-one-main', enabled: true },
          { id: 'page-has-heading-one', enabled: false },  // Stories don't need h1
          { id: 'region', enabled: false }  // Stories are regions by default
        ],
        tags: ['wcag2a', 'wcag2aa', 'wcag21aa'],
        disableOtherRules: false
      },
      manual: false
    } */ a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
    msw: {
      handlers: mswHandlers,
    },
  },
  loaders: [mswLoader],

  decorators: [
    (Story) => {
      if (!document.getElementById('petstore-storybook-base-styles')) {
        const style = document.createElement('style');
        style.id = 'petstore-storybook-base-styles';
        style.textContent = `
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: Inter, system-ui, -apple-system, sans-serif; }
          #root { min-height: 100vh; }
        `;
        document.head.appendChild(style);
      }
      return <Story />;
    },
    (Story, context) => {
      const locale = (context.globals.locale as SupportedLocale) || 'en';
      return (
        <StoryProvider locale={locale}>
          <Story />
        </StoryProvider>
      );
    },
  ],

  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: getAvailableLocales().map((locale) => ({
          value: locale,
          title: localeMetadata[locale].name,
          right: localeMetadata[locale].flag,
        })),
        dynamicTitle: true,
      },
    },
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

  initialGlobals: {
    viewport: {
      value: 'laptop',
      isRotated: false,
    },

    backgrounds: {
      value: 'light',
    },
  },

  async beforeEach() {
    setBaseUrl('/api/v1');
    localStorage.setItem('petstore-ui-locale', 'en');
    window.location.hash = '#/pets';
  },
};

export default preview;
