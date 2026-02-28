import type { Meta, StoryObj } from '@storybook/react';
import { UserForm } from '../../components/molecules/UserForm';
import type { UserFormFields } from '../../components/molecules/UserForm';

const meta: Meta<typeof UserForm> = {
  title: 'Petstore/Molecules/UserForm',
  component: UserForm,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'User form for creating and editing users. Supports i18n — switch locale in the toolbar to verify all labels translate. Includes a11y keyboard navigation and screen reader announcements.',
      },
    },
  },
  argTypes: {
    isLoading: { control: 'boolean' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const handleSubmit = (data: UserFormFields) => {
  console.log('UserForm submitted:', data);
};

const handleCancel = () => {
  console.log('UserForm cancelled');
};

export const CreateMode: Story = {
  name: 'Create Mode',
  render: () => (
    <div style={{ maxWidth: '28rem' }}>
      <UserForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Empty form for creating a new user. All field labels translate when switching locale.',
      },
    },
  },
};

export const EditMode: Story = {
  name: 'Edit Mode',
  render: () => (
    <div style={{ maxWidth: '28rem' }}>
      <UserForm
        user={{
          username: 'johndoe',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phone: '555-1234',
        }}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Pre-filled form for editing an existing user. Username field is disabled in edit mode. Switch to Chef locale to verify labels translate.',
      },
    },
  },
};

export const Loading: Story = {
  name: 'Loading / Submitting',
  render: () => (
    <div style={{ maxWidth: '28rem' }}>
      <UserForm
        user={{
          username: 'janedoe',
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane@example.com',
          phone: '555-5678',
        }}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Form in loading state — Save button is disabled and shows a loading indicator.',
      },
    },
  },
};
