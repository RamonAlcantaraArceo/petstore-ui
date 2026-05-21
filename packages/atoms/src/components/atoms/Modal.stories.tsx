import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Modal } from './Modal';

const meta = {
  component: Modal,
  tags: ['ai-generated'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => undefined,
    title: 'Edit item',
    children: 'Modal content',
  },
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    await expect(await body.findByRole('dialog')).toBeVisible();
  },
};

export const Large: Story = {
  args: {
    isOpen: true,
    onClose: () => undefined,
    title: 'Large modal',
    size: 'large',
    children: 'Large modal content',
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => undefined,
    title: 'Closed modal',
    children: 'This should stay hidden',
  },
};
