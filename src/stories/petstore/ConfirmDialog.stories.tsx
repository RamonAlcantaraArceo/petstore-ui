import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ConfirmDialog } from '../../components/molecules/ConfirmDialog';
import { Button } from '../../components/atoms/Button';

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Petstore/Molecules/ConfirmDialog',
  component: ConfirmDialog,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Reusable confirmation Modal with confirm and cancel Buttons. ' +
          'Supports default and danger variants. Switch locale to verify title and button labels translate.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'danger'] },
    isOpen: { control: 'boolean' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const WithTrigger = ({
  variant = 'default',
  message,
}: {
  variant?: 'default' | 'danger';
  message?: string;
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <ConfirmDialog
        isOpen={open}
        {...(message !== undefined && { message })}
        variant={variant}
        onConfirm={() => {
          console.log('Confirmed');
          setOpen(false);
        }}
        onCancel={() => {
          console.log('Cancelled');
          setOpen(false);
        }}
      />
    </div>
  );
};

export const Default: Story = {
  name: 'Default',
  render: () => <WithTrigger message="This action cannot be undone." />,
  parameters: {
    docs: {
      description: {
        story: 'Click the button to open the dialog. Switch locale to verify title and buttons translate.',
      },
    },
  },
};

export const DangerVariant: Story = {
  name: 'Danger Variant',
  render: () => (
    <WithTrigger variant="danger" message="This will permanently delete the record." />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Danger variant renders the confirm button in the danger style.',
      },
    },
  },
};

export const CustomTitle: Story = {
  name: 'Custom Title',
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        <ConfirmDialog
          isOpen={open}
          title="Delete Pet?"
          message="Buddy will be permanently removed from the petstore."
          variant="danger"
          onConfirm={() => { console.log('Confirmed'); setOpen(false); }}
          onCancel={() => { console.log('Cancelled'); setOpen(false); }}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Pass a static title string to override the default translated title.',
      },
    },
  },
};
