import type { Meta, StoryObj } from '@storybook/react';
import { UserCard } from '../../components/molecules/UserCard';
import type { User } from '../../services/types';

const meta: Meta<typeof UserCard> = {
  title: 'Petstore/Molecules/UserCard',
  component: UserCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Displays a user entry with username, full name, email, and phone. ' +
          'Switch locale to verify labels and action buttons translate.',
      },
    },
  },
  argTypes: {
    readonly: { control: 'boolean' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const fullUser: User = {
  id: 1,
  username: 'johndoe',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: '',
  phone: '555-1234',
  userStatus: 1,
};

const usernameOnlyUser: User = {
  id: 2,
  username: 'ghostuser',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phone: '',
  userStatus: 0,
};

export const WithFullDetails: Story = {
  name: 'With Full Details',
  render: () => (
    <div style={{ maxWidth: '24rem' }}>
      <UserCard
        user={fullUser}
        onEdit={(u) => console.log('Edit user:', u.username)}
        onDelete={(u) => console.log('Delete user:', u.username)}
      />
    </div>
  ),
};

export const UsernameOnly: Story = {
  name: 'Username Only (minimal data)',
  render: () => (
    <div style={{ maxWidth: '24rem' }}>
      <UserCard
        user={usernameOnlyUser}
        onEdit={(u) => console.log('Edit user:', u.username)}
        onDelete={(u) => console.log('Delete user:', u.username)}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'When first/last name are absent, the username is used as the display name.',
      },
    },
  },
};

export const Readonly: Story = {
  name: 'Read-only (no actions)',
  render: () => (
    <div style={{ maxWidth: '24rem' }}>
      <UserCard user={fullUser} readonly />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Edit and Delete buttons are hidden when readonly is true.',
      },
    },
  },
};
