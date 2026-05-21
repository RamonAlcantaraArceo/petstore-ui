import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { StoreOrdersView } from './StoreOrdersView';
import type { Order } from '../../services/types';

const sampleOrders: Order[] = [
  { id: 7, petId: 1, quantity: 1, shipDate: '', status: 'placed', complete: false },
  { id: 8, petId: 3, quantity: 2, shipDate: '', status: 'approved', complete: false },
];

const sampleOrder: Order = {
  id: 9,
  petId: 5,
  quantity: 1,
  shipDate: '2026-05-20T00:00:00.000Z',
  status: 'delivered',
  complete: true,
};

const meta = {
  component: StoreOrdersView,
  tags: ['ai-generated'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof StoreOrdersView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    isLoggedIn: true,
    initialOrders: sampleOrders,
    initialOrder: sampleOrder,
    mockMode: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /place order/i })).toBeEnabled();
  },
};

export const ReadOnly: Story = {
  args: {
    isLoggedIn: false,
    initialOrders: sampleOrders,
    initialOrder: sampleOrder,
    mockMode: true,
  },
};

export const EmptyInventory: Story = {
  args: {
    isLoggedIn: false,
    initialOrders: [],
    mockMode: true,
  },
};
