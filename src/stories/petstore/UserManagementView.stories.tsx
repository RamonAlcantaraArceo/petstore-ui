import type { Meta, StoryObj } from '@storybook/react';
import { UserManagementView } from '../../components/organisms/UserManagementView';
import type { User } from '../../services/types';

const meta: Meta<typeof UserManagementView> = {
  title: 'Petstore/Views/User Management',
  component: UserManagementView,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'User management view with lookup input, UserCard display, and Create / Edit modals. ' +
          'All stories run in mock mode so no API calls are made. Switch locale for translations.',
      },
    },
  },
  argTypes: {
    isLoggedIn: { control: 'boolean' },
    mockMode: { control: 'boolean' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleUser: User = {
  id: 1,
  username: 'johndoe',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: '',
  phone: '555-1234',
  userStatus: 1,
};

export const WithUser: Story = {
  name: 'User Looked Up (Logged In)',
  args: {
    isLoggedIn: true,
    initialUser: sampleUser,
    mockMode: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Authenticated view with a pre-loaded user result. Lookup and card actions are available; Create User button is hidden while logged in. ' +
          'Click Edit or Delete on the card to exercise modal flows.',
      },
    },
  },
};

export const ReadOnly: Story = {
  name: 'Logged Out (Create Access)',
  args: {
    isLoggedIn: false,
    initialUser: sampleUser,
    mockMode: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Unauthenticated view — Create User button is visible and opens the creation modal, while card edit/delete actions remain hidden.',
      },
    },
  },
};

export const NoUser: Story = {
  name: 'No User Looked Up (Logged In)',
  args: {
    isLoggedIn: true,
    mockMode: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Initial authenticated state before any lookup. Username search input and lookup button are shown.',
      },
    },
  },
};

export const AccessibilityAndLocaleShowcase: Story = {
  name: 'A11y + Locale Showcase',
  args: {
    isLoggedIn: false,
    mockMode: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use keyboard navigation (Tab / Enter / Shift+Tab) to reach Create User and open the modal. Switch locale in the toolbar to verify translated labels and button text.',
      },
    },
  },
};
