import type { Meta, StoryObj } from '@storybook/react';
import { StoreOrdersView } from '../../components/organisms/StoreOrdersView';
import type { Order } from '../../services/types';

const meta: Meta<typeof StoreOrdersView> = {
  title: 'Petstore/Views/Store Orders',
  component: StoreOrdersView,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Store orders view with inventory table, order lookup, and Place Order modal. ' +
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

const sampleOrders: Order[] = [
  { id: 7, petId: 1, quantity: 1, shipDate: '', status: 'placed', complete: false },
  { id: 8, petId: 3, quantity: 2, shipDate: '', status: 'approved', complete: false },
  { id: 9, petId: 5, quantity: 1, shipDate: '', status: 'delivered', complete: true },
];

const sampleOrder: Order = {
  id: 101,
  petId: 5,
  quantity: 1,
  shipDate: '2025-02-14T00:00:00.000Z',
  status: 'placed',
  complete: false,
};

export const WithInventory: Story = {
  name: 'Orders Table & Order (Logged In)',
  args: {
    isLoggedIn: true,
    initialOrders: sampleOrders,
    initialOrder: sampleOrder,
    mockMode: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Authenticated view showing the orders table and a pre-loaded order card. ' +
          'The Place Order button is visible. Click it to open the order form modal.',
      },
    },
  },
};

export const ReadOnly: Story = {
  name: 'Read-Only (Logged Out)',
  args: {
    isLoggedIn: false,
    initialOrders: sampleOrders,
    initialOrder: sampleOrder,
    mockMode: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Unauthenticated view — Place Order button hidden and order card Delete action hidden.',
      },
    },
  },
};

export const InventoryOnly: Story = {
  name: 'Orders Table Only (No Order)',
  args: {
    isLoggedIn: true,
    initialOrders: sampleOrders,
    mockMode: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Only the orders table is populated. No order has been looked up yet. ' +
          'Use the lookup input to search for an order ID.',
      },
    },
  },
};

export const EmptyInventory: Story = {
  name: 'Empty Orders Table',
  args: {
    isLoggedIn: false,
    initialOrders: [],
    mockMode: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty orders table shows the empty-message translation.',
      },
    },
  },
};
