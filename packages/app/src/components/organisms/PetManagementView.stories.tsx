import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { PetManagementView } from './PetManagementView';
import type { Pet } from '../../services/types';

const samplePets: Pet[] = [
  {
    id: 1,
    name: 'Buddy',
    category: { id: 1, name: 'Dogs' },
    photoUrls: [],
    tags: [{ id: 1, name: 'friendly' }],
    status: 'available',
  },
  {
    id: 2,
    name: 'Milo',
    category: { id: 2, name: 'Cats' },
    photoUrls: [],
    tags: [],
    status: 'available',
  },
];

const meta = {
  component: PetManagementView,
  tags: ['ai-generated'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PetManagementView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MockedData: Story = {
  args: {
    isLoggedIn: true,
    initialPets: samplePets,
    mockMode: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /add pet/i })).toBeEnabled();
  },
};

export const MswLoaded: Story = {
  args: {
    isLoggedIn: true,
    mockMode: false,
  },
  play: async ({ canvas }) => {
    await waitFor(async () => {
      await expect(await canvas.findByText(/mocked available pet/i)).toBeVisible();
    });
  },
};

export const ReadOnly: Story = {
  args: {
    isLoggedIn: false,
    initialPets: samplePets,
    mockMode: true,
  },
};
