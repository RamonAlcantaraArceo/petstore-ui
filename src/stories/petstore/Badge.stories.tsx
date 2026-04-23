import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../../components/atoms/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Petstore/Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'available',
        'pending',
        'sold',
        'placed',
        'approved',
        'delivered',
        'info',
        'default',
      ],
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
    children: {
      control: 'text',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'medium',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Badge variant="available" />
      <Badge variant="pending" />
      <Badge variant="sold" />
      <Badge variant="placed" />
      <Badge variant="approved" />
      <Badge variant="delivered" />
      <Badge variant="info" />
      <Badge variant="default" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Badge size="small" variant="available" />
      <Badge size="medium" variant="available" />
    </div>
  ),
};
