import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { VisualStatus } from '../../visual-report/types';
import { VisualFilterBar } from '../../components/molecules/VisualFilterBar';

const meta: Meta<typeof VisualFilterBar> = {
  title: 'Visual Report/Molecules/Filter Bar',
  component: VisualFilterBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Status filter bar with All + multi-select status behavior and counts.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = useState<Set<VisualStatus>>(new Set());

    return (
      <VisualFilterBar
        counts={
          new Map([
            ['all', 12],
            ['passed', 8],
            ['failed', 2],
            ['flaky', 1],
            ['skipped', 1],
            ['unknown', 0],
          ])
        }
        selectedStatusFilters={selected}
        onToggle={(filter) => {
          setSelected((prev) => {
            if (filter === 'all') {
              return new Set();
            }
            const next = new Set(prev);
            if (next.has(filter)) {
              next.delete(filter);
            } else {
              next.add(filter);
            }
            return next;
          });
        }}
      />
    );
  },
};
