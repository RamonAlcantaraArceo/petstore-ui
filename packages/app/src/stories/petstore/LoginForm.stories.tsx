import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from '../../components/molecules/LoginForm';

const meta: Meta<typeof LoginForm> = {
  title: 'Petstore/Molecules/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Sign-in form combining username and password Inputs with a submit Button. ' +
          'Switch locale in the toolbar to verify all labels and placeholders translate.',
      },
    },
  },
  argTypes: {
    isLoading: { control: 'boolean' },
    error: { control: 'text' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const handleLogin = (username: string, password: string) => {
  console.log('LoginForm submitted:', { username, password });
};

export const Default: Story = {
  name: 'Default',
  render: () => (
    <div style={{ maxWidth: '24rem' }}>
      <LoginForm onLogin={handleLogin} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty sign-in form. Switch to Chef locale to verify text expansion.',
      },
    },
  },
};

export const WithError: Story = {
  name: 'With Error',
  render: () => (
    <div style={{ maxWidth: '24rem' }}>
      <LoginForm onLogin={handleLogin} error="Invalid username or password." />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Displays an inline error alert with role="alert" for screen reader compatibility.',
      },
    },
  },
};

export const Loading: Story = {
  name: 'Loading / Submitting',
  render: () => (
    <div style={{ maxWidth: '24rem' }}>
      <LoginForm onLogin={handleLogin} isLoading />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Submit button enters loading state while the sign-in request is in-flight.',
      },
    },
  },
};
