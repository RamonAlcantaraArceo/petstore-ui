import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Select } from '../../components/atoms/Select';

const statusOptions = [
  { value: 'available', labelTranslationKey: 'petstore.common.status.available' },
  { value: 'pending', labelTranslationKey: 'petstore.common.status.pending' },
  { value: 'sold', labelTranslationKey: 'petstore.common.status.sold' },
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
      <Select {...args} value={value} onChange={setValue} />
    </div>
  );
}

export const Default: Story = {
  render: (args) => <SelectTemplate {...args} />,
  args: {
    labelTranslationKey: 'petstore.select.statusLabel',
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
      { value: 'dog', labelTranslationKey: 'petstore.select.petTypes.dog' },
      { value: 'cat', labelTranslationKey: 'petstore.select.petTypes.cat' },
      { value: 'bird', labelTranslationKey: 'petstore.select.petTypes.bird' },
      { value: 'fish', labelTranslationKey: 'petstore.select.petTypes.fish' },
    ],
    value: 'dog',
    labelTranslationKey: 'petstore.select.petTypeLabel',
  },
};
