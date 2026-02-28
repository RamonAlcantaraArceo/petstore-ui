import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Select } from '../../components/atoms/Select';

const statusOptions = [
  { value: 'available', label: 'Available' },
  { value: 'pending', label: 'Pending' },
  { value: 'sold', label: 'Sold' },
];

const meta: Meta<typeof Select> = {
  title: 'Petstore/Atoms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

function SelectTemplate(args: React.ComponentProps<typeof Select>) {
  const [value, setValue] = React.useState(args.value || 'available');

  return (
    <div style={{ minWidth: '20rem' }}>
      <Select
        {...args}
        value={value}
        onChange={setValue}
      />
    </div>
  );
}

export const Default: Story = {
  render: (args) => <SelectTemplate {...args} />,
  args: {
    label: 'Status',
    options: statusOptions,
    value: 'available',
    size: 'medium',
    disabled: false,
    fullWidth: true,
  },
};

export const Disabled: Story = {
  render: (args) => <SelectTemplate {...args} />,
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const WithOptions: Story = {
  render: (args) => <SelectTemplate {...args} />,
  args: {
    ...Default.args,
    options: [
      { value: 'dog', label: 'Dog' },
      { value: 'cat', label: 'Cat' },
      { value: 'bird', label: 'Bird' },
      { value: 'fish', label: 'Fish' },
    ],
    value: 'dog',
    label: 'Pet type',
  },
};
