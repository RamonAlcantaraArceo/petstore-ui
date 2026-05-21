import type { Meta, StoryObj } from '@storybook/react';
import { PetstoreApp } from '../../components/organisms/PetstoreApp';

const meta: Meta<typeof PetstoreApp> = {
  title: 'Petstore/App/Full Application',
  component: PetstoreApp,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The complete Petstore application shell. Includes AuthProvider, LocaleProvider, ' +
          'AppNavigation, and all three views (Pets, Orders, Users). Hash-based routing ' +
          'controls which view is active. Login modal opens via the Sign In button. ' +
          'All stories run in mock mode — no live API calls.',
      },
    },
  },
  argTypes: {
    locale: {
      control: 'select',
      options: ['en', 'chef'],
      description: 'Force a specific locale',
    },
    mockMode: { control: 'boolean' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default (Pets Tab)',
  args: {
    mockMode: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'The app shell in its default state. The Pets tab is active. ' +
          'Click tabs to switch views (hash changes are simulated). ' +
          'Click Sign In to open the login modal.',
      },
    },
  },
};

export const ChefLocale: Story = {
  name: 'Chef Locale',
  args: {
    locale: 'chef',
    mockMode: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Full app with Chef pseudo-locale forced. Verify all navigation tabs, ' +
          'buttons, and labels render in the Chef translation.',
      },
    },
  },
};
