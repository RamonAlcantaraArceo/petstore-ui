import type { Meta, StoryObj } from '@storybook/react';
import { PetCard } from '../../components/molecules/PetCard';
import type { Pet } from '../../services/types';

const meta: Meta<typeof PetCard> = {
  title: 'Petstore/Molecules/PetCard',
  component: PetCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Displays a pet entry with name, category, tags, and status Badge. ' +
          'Edit and Delete actions announce to screen readers. Switch locale to verify translations.',
      },
    },
  },
  argTypes: {
    readonly: { control: 'boolean' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const availablePet: Pet = {
  id: 1,
  name: 'Buddy',
  category: { id: 1, name: 'Dogs' },
  photoUrls: [],
  tags: [{ id: 1, name: 'friendly' }, { id: 2, name: 'vaccinated' }],
  status: 'available',
};

const pendingPet: Pet = {
  id: 2,
  name: 'Whiskers',
  category: { id: 2, name: 'Cats' },
  photoUrls: [],
  tags: [{ id: 3, name: 'indoor' }],
  status: 'pending',
};

const soldPet: Pet = {
  id: 3,
  name: 'Goldie',
  category: { id: 3, name: 'Fish' },
  photoUrls: [],
  tags: [],
  status: 'sold',
};

export const Available: Story = {
  name: 'Available',
  render: () => (
    <div style={{ maxWidth: '24rem' }}>
      <PetCard
        pet={availablePet}
        onEdit={(p) => console.log('Edit pet:', p.id)}
        onDelete={(p) => console.log('Delete pet:', p.id)}
      />
    </div>
  ),
};

export const Pending: Story = {
  name: 'Pending',
  render: () => (
    <div style={{ maxWidth: '24rem' }}>
      <PetCard
        pet={pendingPet}
        onEdit={(p) => console.log('Edit pet:', p.id)}
        onDelete={(p) => console.log('Delete pet:', p.id)}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Switch to Chef locale — the "Pending" badge should show the Chef translation.',
      },
    },
  },
};

export const Sold: Story = {
  name: 'Sold',
  render: () => (
    <div style={{ maxWidth: '24rem' }}>
      <PetCard pet={soldPet} />
    </div>
  ),
};

export const Readonly: Story = {
  name: 'Read-only (no actions)',
  render: () => (
    <div style={{ maxWidth: '24rem' }}>
      <PetCard pet={availablePet} readonly />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Edit and Delete buttons are hidden when readonly is true.',
      },
    },
  },
};
