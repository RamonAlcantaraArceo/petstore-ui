import type { Meta, StoryObj } from '@storybook/react';
import { PetManagementView } from '../../components/organisms/PetManagementView';
import type { Pet } from '../../services/types';

const meta: Meta<typeof PetManagementView> = {
  title: 'Petstore/Views/Pet Management',
  component: PetManagementView,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full pet management view composing StatusFilter, PetCard grid, PetForm modal, ' +
          'and ConfirmDialog. All stories run in mock mode so no API calls are made. ' +
          'Switch locale to verify translations.',
      },
    },
  },
  argTypes: {
    isLoggedIn: { control: 'boolean' },
    mockMode: { control: 'boolean' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const samplePets: Pet[] = [
  {
    id: 1,
    name: 'Buddy',
    category: { id: 1, name: 'Dogs' },
    photoUrls: [],
    tags: [
      { id: 1, name: 'friendly' },
      { id: 2, name: 'vaccinated' },
    ],
    status: 'available',
  },
  {
    id: 2,
    name: 'Whiskers',
    category: { id: 2, name: 'Cats' },
    photoUrls: [],
    tags: [{ id: 3, name: 'indoor' }],
    status: 'available',
  },
  {
    id: 3,
    name: 'Goldie',
    category: { id: 3, name: 'Fish' },
    photoUrls: [],
    tags: [],
    status: 'available',
  },
  {
    id: 4,
    name: 'Rex',
    category: { id: 1, name: 'Dogs' },
    photoUrls: [],
    tags: [{ id: 4, name: 'trained' }],
    status: 'available',
  },
];

export const WithPets: Story = {
  name: 'With Pets (Logged In)',
  args: {
    isLoggedIn: true,
    initialPets: samplePets,
    mockMode: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Authenticated view with four sample pets in a grid. The Add Pet button is visible. ' +
          'Click Edit or Delete on a card to exercise the modal flows.',
      },
    },
  },
};

export const ReadOnly: Story = {
  name: 'Read-Only (Logged Out)',
  args: {
    isLoggedIn: false,
    initialPets: samplePets,
    mockMode: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Unauthenticated view — no Add Pet button and cards hide Edit / Delete actions.',
      },
    },
  },
};

export const Empty: Story = {
  name: 'Empty State',
  args: {
    isLoggedIn: true,
    initialPets: [],
    mockMode: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'No pets match the selected filter. The empty-state message should translate with Chef locale.',
      },
    },
  },
};
