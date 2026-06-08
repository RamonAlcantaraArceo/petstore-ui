import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormAlert } from './FormAlert';

const meta: Meta<typeof FormAlert> = {
  title: 'Common/Atoms/FormAlert',
  component: FormAlert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Inline alert atom for short form or section-level feedback messages with built-in alert semantics.',
      },
    },
  },
  argTypes: {
    tone: {
      control: 'select',
      options: ['error', 'warning', 'info', 'success'],
      description: 'Visual tone of the alert',
    },
    message: {
      control: 'text',
      description: 'Alert text to display',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Error: Story = {
  args: {
    tone: 'error',
    message: 'Invalid username or password.',
  },
};

export const Warning: Story = {
  args: {
    tone: 'warning',
    message: 'Your session is about to expire.',
  },
};

export const Info: Story = {
  args: {
    tone: 'info',
    message: 'You can update profile details in account settings.',
  },
};

export const Success: Story = {
  args: {
    tone: 'success',
    message: 'Your changes were saved successfully.',
  },
};
