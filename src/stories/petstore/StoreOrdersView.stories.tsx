import type { Meta, StoryObj } from '@storybook/react';
import { StoreOrdersView } from '../../components/organisms/StoreOrdersView';
import type { Order, Inventory } from '../../services/types';

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

const sampleInventory: Inventory = {
  available: 42,
  pending: 7,
  sold: 15,
};

const sampleOrder: Order = {
  id: 101,
  petId: 5,
  quantity: 1,
  shipDate: '2025-02-14T00:00:00.000Z',
  status: 'placed',
  complete: false,
};

export const WithInventory: Story = {
  name: 'Inventory & Order (Logged In)',
  args: {
    isLoggedIn: true,
    initialInventory: sampleInventory,
    initialOrder: sampleOrder,
    mockMode: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Authenticated view showing the inventory table with three statuses and a pre-loaded order card. ' +
          'The Place Order button is visible. Click it to open the order form modal.',
      },
    },
  },
};

export const ReadOnly: Story = {
  name: 'Read-Only (Logged Out)',
  args: {
    isLoggedIn: false,
    initialInventory: sampleInventory,
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
  name: 'Inventory Only (No Order)',
  args: {
    isLoggedIn: true,
    initialInventory: sampleInventory,
    mockMode: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Only the inventory table is populated. No order has been looked up yet. ' +
          'Use the lookup input to search for an order ID.',
      },
    },
  },
};

export const EmptyInventory: Story = {
  name: 'Empty Inventory',
  args: {
    isLoggedIn: false,
    initialInventory: {},
    mockMode: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty inventory table shows the empty-message translation.',
      },
    },
  },
};
