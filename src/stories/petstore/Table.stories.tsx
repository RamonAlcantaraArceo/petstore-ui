import type { Meta, StoryObj } from '@storybook/react';
import { Table } from '../../components/atoms/Table';

interface InventoryRow {
  status: string;
  count: number;
}

const columns = [
  { key: 'status', header: 'Status' },
  { key: 'count', header: 'Count' },
];

const sampleData: InventoryRow[] = [
  { status: 'available', count: 12 },
  { status: 'pending', count: 4 },
  { status: 'sold', count: 9 },
];

const meta: Meta<typeof Table<InventoryRow>> = {
  title: 'Petstore/Atoms/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithData: Story = {
  render: () => (
    <Table<InventoryRow>
      columns={columns}
      data={sampleData}
      emptyMessage="No inventory found"
    />
  ),
};

export const EmptyState: Story = {
  render: () => (
    <Table<InventoryRow>
      columns={columns}
      data={[]}
      emptyMessage="No inventory found"
    />
  ),
};
