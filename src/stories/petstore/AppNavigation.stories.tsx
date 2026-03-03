import type { Meta, StoryObj } from '@storybook/react';
import { AppNavigation } from '../../components/organisms/AppNavigation';

const meta: Meta<typeof AppNavigation> = {
  title: 'Petstore/Organisms/AppNavigation',
  component: AppNavigation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Top-level navigation bar composing Tabs and auth-status display. ' +
          'Shows Pets, Orders, and Users tabs. Right side toggles between Sign In and ' +
          'Sign Out + username. Switch locale to verify translations.',
      },
    },
  },
  argTypes: {
    activeApp: {
      control: 'select',
      options: ['pets', 'orders', 'users'],
    },
    isLoggedIn: { control: 'boolean' },
    username: { control: 'text' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  name: 'Logged In',
  args: {
    activeApp: 'pets',
    isLoggedIn: true,
    username: 'johndoe',
    onNavigate: (app) => console.log('Navigate to:', app),
    onLogin: () => console.log('Login clicked'),
    onLogout: () => console.log('Logout clicked'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Authenticated state — displays the username and Sign Out button on the right.',
      },
    },
  },
};

export const LoggedOut: Story = {
  name: 'Logged Out',
  args: {
    activeApp: 'pets',
    isLoggedIn: false,
    onNavigate: (app) => console.log('Navigate to:', app),
    onLogin: () => console.log('Login clicked'),
    onLogout: () => console.log('Logout clicked'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Unauthenticated state — shows only the Sign In button.',
      },
    },
  },
};

export const OrdersTabActive: Story = {
  name: 'Orders Tab Active',
  args: {
    activeApp: 'orders',
    isLoggedIn: true,
    username: 'admin',
    onNavigate: (app) => console.log('Navigate to:', app),
    onLogin: () => console.log('Login clicked'),
    onLogout: () => console.log('Logout clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'The Orders tab is the active selection.',
      },
    },
  },
};

export const UsersTabActive: Story = {
  name: 'Users Tab Active',
  args: {
    activeApp: 'users',
    isLoggedIn: true,
    username: 'admin',
    onNavigate: (app) => console.log('Navigate to:', app),
    onLogin: () => console.log('Login clicked'),
    onLogout: () => console.log('Logout clicked'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'The Users tab is the active selection. Switch to Chef locale to see pseudo-translated tabs.',
      },
    },
  },
};
