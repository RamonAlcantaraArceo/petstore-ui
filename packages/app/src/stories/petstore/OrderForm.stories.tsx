import type { Meta, StoryObj } from '@storybook/react';
import { OrderForm } from '../../components/molecules/OrderForm';
import type { OrderFormFields } from '../../components/molecules/OrderForm';

const meta: Meta<typeof OrderForm> = {
  title: 'Petstore/Molecules/OrderForm',
  component: OrderForm,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Form for placing an order with pet ID and quantity Inputs. ' +
          'Switch locale to verify all labels and buttons translate.',
      },
    },
  },
  argTypes: {
    isLoading: { control: 'boolean' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const handleSubmit = (fields: OrderFormFields) => {
  console.log('OrderForm submitted:', fields);
};

const handleCancel = () => {
  console.log('OrderForm cancelled');
};

export const Default: Story = {
  name: 'Default',
  render: () => (
    <div style={{ maxWidth: '24rem' }}>
      <OrderForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Place a new order. Quantity defaults to 1.',
      },
    },
  },
};

export const Loading: Story = {
  name: 'Loading / Submitting',
  render: () => (
    <div style={{ maxWidth: '24rem' }}>
      <OrderForm onSubmit={handleSubmit} onCancel={handleCancel} isLoading />
    </div>
  ),
};
