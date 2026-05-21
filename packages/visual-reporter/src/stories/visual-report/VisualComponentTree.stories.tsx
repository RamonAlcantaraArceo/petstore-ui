import type { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import { toViewData } from '../../visual-report/model';
import type { VisualStatus } from '../../visual-report/types';
import { VisualComponentTree } from '../../components/organisms/VisualComponentTree';
import { visualReportFixture } from './fixtures';

const viewData = toViewData(visualReportFixture);

const meta: Meta<typeof VisualComponentTree> = {
  title: 'Visual Report/Organisms/Component Tree',
  component: VisualComponentTree,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [selectedKey, setSelectedKey] = useState<string | null>(
      viewData.componentGroups[0]?.key ?? null,
    );
    const selectedStatusFilters = useMemo(() => new Set<VisualStatus>(), []);

    return (
      <div style={{ width: 420, padding: 16, background: '#020617' }}>
        <VisualComponentTree
          groups={viewData.componentGroups}
          selectedKey={selectedKey}
          selectedStatusFilters={selectedStatusFilters}
          onSelect={setSelectedKey}
        />
      </div>
    );
  },
};
