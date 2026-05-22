import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Button } from './Button';

const meta = {
  component: Button,
  tags: ['ai-generated'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Order now',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /order now/i })).toHaveAttribute(
      'aria-busy',
      'false',
    );
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Cancel',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Delete',
  },
};

export const CssCheck: Story = {
  args: {
    variant: 'primary',
    children: 'Submit',
  },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(canvasElement.ownerDocument.body).fontFamily).toMatch(/inter/i);
  },
};
