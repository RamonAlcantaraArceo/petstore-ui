import type { Meta, StoryObj } from '@storybook/react';
import { OrderCard } from '../../components/molecules/OrderCard';
import type { Order } from '../../services/types';

const meta: Meta<typeof OrderCard> = {
  title: 'Petstore/Molecules/OrderCard',
  component: OrderCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Displays an order with status Badge, pet ID, quantity, and ship date. ' +
          'Switch locale to verify status badge and labels translate.',
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

const placedOrder: Order = {
  id: 101,
  petId: 5,
  quantity: 1,
  shipDate: '2025-02-14T00:00:00.000Z',
  status: 'placed',
  complete: false,
};

const approvedOrder: Order = {
  id: 102,
  petId: 8,
  quantity: 2,
  shipDate: '2025-03-01T00:00:00.000Z',
  status: 'approved',
  complete: false,
};

const deliveredOrder: Order = {
  id: 103,
  petId: 12,
  quantity: 1,
  shipDate: '2025-01-28T00:00:00.000Z',
  status: 'delivered',
  complete: true,
};

export const Placed: Story = {
  name: 'Placed',
  render: () => (
    <div style={{ maxWidth: '24rem' }}>
      <OrderCard order={placedOrder} onDelete={(o) => console.log('Delete order:', o.id)} />
    </div>
  ),
};

export const Approved: Story = {
  name: 'Approved',
  render: () => (
    <div style={{ maxWidth: '24rem' }}>
      <OrderCard order={approvedOrder} onDelete={(o) => console.log('Delete order:', o.id)} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Switch to Chef locale — "Approved" badge should show Chef translation.',
      },
    },
  },
};

export const Delivered: Story = {
  name: 'Delivered',
  render: () => (
    <div style={{ maxWidth: '24rem' }}>
      <OrderCard order={deliveredOrder} />
    </div>
  ),
};

export const Readonly: Story = {
  name: 'Read-only (no actions)',
  render: () => (
    <div style={{ maxWidth: '24rem' }}>
      <OrderCard order={placedOrder} readonly />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Delete button is hidden when readonly is true.',
      },
    },
  },
};
