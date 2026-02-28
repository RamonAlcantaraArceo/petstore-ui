import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Modal } from '../../components/atoms/Modal';
import { Button } from '../../components/atoms/Button';

const meta: Meta<typeof Modal> = {
  title: 'Petstore/Atoms/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

function ModalTemplate(args: React.ComponentProps<typeof Modal>) {
  const [isOpen, setIsOpen] = React.useState(args.isOpen);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>Modal content goes here.</p>
        <div style={{ marginTop: '1rem' }}>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>Close</Button>
        </div>
      </Modal>
    </>
  );
}

export const OpenClosed: Story = {
  render: (args) => <ModalTemplate {...args} />,
  args: {
    isOpen: false,
    title: 'Edit Pet',
    size: 'medium',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <ModalTemplate isOpen={false} title="Small modal" size="small" onClose={() => {}}>Small</ModalTemplate>
      <ModalTemplate isOpen={false} title="Medium modal" size="medium" onClose={() => {}}>Medium</ModalTemplate>
      <ModalTemplate isOpen={false} title="Large modal" size="large" onClose={() => {}}>Large</ModalTemplate>
    </div>
  ),
};

export const FocusTrap: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(true);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Re-open modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Focus trap demo" size="medium">
          <input placeholder="First input" style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }} />
          <input placeholder="Second input" style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }} />
          <Button onClick={() => setIsOpen(false)}>Done</Button>
        </Modal>
      </>
    );
  },
};
