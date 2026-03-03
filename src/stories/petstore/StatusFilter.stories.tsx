import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StatusFilter } from '../../components/molecules/StatusFilter';
import type { PetStatus } from '../../services/types';

const meta: Meta<typeof StatusFilter> = {
  title: 'Petstore/Molecules/StatusFilter',
  component: StatusFilter,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Status selector and Refresh button for filtering pet listings. ' +
          'Switch locale to verify all Select option labels translate.',
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

const ALL_STATUSES: PetStatus[] = ['available', 'pending', 'sold'];

const InteractiveFilter = () => {
  const [selected, setSelected] = React.useState<PetStatus>('available');
  return (
    <StatusFilter
      statuses={ALL_STATUSES}
      selectedStatus={selected}
      onChange={(s) => {
        console.log('Status changed:', s);
        setSelected(s);
      }}
      onRefresh={() => console.log('Refresh clicked')}
    />
  );
};

export const Default: Story = {
  name: 'Interactive',
  render: () => <InteractiveFilter />,
  parameters: {
    docs: {
      description: {
        story:
          'Select a status and click Refresh. Switch to Chef locale to verify option labels translate.',
      },
    },
  },
};

export const Loading: Story = {
  name: 'Loading / Refreshing',
  render: () => (
    <StatusFilter
      statuses={ALL_STATUSES}
      selectedStatus="available"
      onChange={(s) => console.log('Status:', s)}
      onRefresh={() => console.log('Refresh')}
      isLoading
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Refresh button enters loading state while the list is being fetched.',
      },
    },
  },
};
