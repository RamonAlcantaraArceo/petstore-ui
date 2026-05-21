import type { Meta, StoryObj } from '@storybook/react';
import { PetForm } from '../../components/molecules/PetForm';
import type { PetFormFields } from '../../components/molecules/PetForm';
import type { Pet } from '../../services/types';

const meta: Meta<typeof PetForm> = {
  title: 'Petstore/Molecules/PetForm',
  component: PetForm,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Create or edit a pet entry. Includes name, category, photo URL, and status Select. ' +
          'Switch locale to verify all labels and Select options translate.',
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

const handleSubmit = (data: PetFormFields) => {
  console.log('PetForm submitted:', data);
};

const handleCancel = () => {
  console.log('PetForm cancelled');
};

const existingPet: Pet = {
  id: 1,
  name: 'Buddy',
  category: { id: 1, name: 'Dogs' },
  photoUrls: ['https://example.com/buddy.jpg'],
  tags: [],
  status: 'available',
};

export const CreateMode: Story = {
  name: 'Create Mode',
  render: () => (
    <div style={{ maxWidth: '28rem' }}>
      <PetForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty form for adding a new pet. Status Select options translate with locale.',
      },
    },
  },
};

export const EditMode: Story = {
  name: 'Edit Mode',
  render: () => (
    <div style={{ maxWidth: '28rem' }}>
      <PetForm pet={existingPet} onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Pre-populated form for editing an existing pet.',
      },
    },
  },
};

export const Loading: Story = {
  name: 'Loading / Submitting',
  render: () => (
    <div style={{ maxWidth: '28rem' }}>
      <PetForm onSubmit={handleSubmit} onCancel={handleCancel} isLoading />
    </div>
  ),
};
