import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { UserManagementView } from './UserManagementView';
import type { User } from '../../services/types';

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

const meta = {
  component: UserManagementView,
  tags: ['ai-generated'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof UserManagementView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedInWithUser: Story = {
  args: {
    isLoggedIn: true,
    initialUser: sampleUser,
    mockMode: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/@johndoe/i)).toBeVisible();
  },
};

export const LoggedOutCreateFlow: Story = {
  args: {
    isLoggedIn: false,
    mockMode: true,
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /create new user/i }));
    const body = within(canvasElement.ownerDocument.body);
    await expect(await body.findByRole('dialog')).toBeVisible();
  },
};

export const LoggedInNoUser: Story = {
  args: {
    isLoggedIn: true,
    mockMode: true,
  },
};
