import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from './Table';
import { useTranslation } from '@petstore-ui/atoms';

interface InventoryRow {
  status: string;
  count: number;
}

const sampleData: InventoryRow[] = [
  { status: 'available', count: 12 },
  { status: 'pending', count: 4 },
  { status: 'sold', count: 9 },
];

/** Wrapper that builds columns with translated status cell values */
const InventoryTable: React.FC<{ data: InventoryRow[] }> = ({ data }) => {
  const { t } = useTranslation();

  const columns = [
    {
      key: 'status' as const,
      headerTranslationKey: 'petstore.table.headers.status',
      render: (row: InventoryRow) => t(`petstore.common.status.${row.status}`),
    },
    {
      key: 'count' as const,
      headerTranslationKey: 'petstore.table.headers.count',
    },
  ];

  return (
    <Table<InventoryRow>
      columns={columns}
      data={data}
      emptyMessageTranslationKey="petstore.table.emptyInventory"
    />
  );
};

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
  render: () => <InventoryTable data={sampleData} />,
};

export const EmptyState: Story = {
  render: () => <InventoryTable data={[]} />,
};
