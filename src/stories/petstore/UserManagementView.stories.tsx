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
          'Authenticated view with a pre-loaded user result. Create User button is visible. ' +
          'Click Edit or Delete on the card to exercise modal flows.',
      },
    },
  },
};

export const ReadOnly: Story = {
  name: 'Read-Only (Logged Out)',
  args: {
    isLoggedIn: false,
    initialUser: sampleUser,
    mockMode: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Unauthenticated view — no Create User button and card actions are hidden.',
      },
    },
  },
};

export const NoUser: Story = {
  name: 'No User Looked Up',
  args: {
    isLoggedIn: true,
    mockMode: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Initial state before any lookup. Only the username search input, lookup button, and Create User button are shown.',
      },
    },
  },
};
