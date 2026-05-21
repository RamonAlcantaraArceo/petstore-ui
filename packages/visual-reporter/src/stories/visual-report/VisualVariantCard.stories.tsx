import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { ComparisonMode } from '../../visual-report/types';
import { VisualVariantCard } from '../../components/organisms/VisualVariantCard';
import { visualReportFixture } from './fixtures';

const story = visualReportFixture.components[0]!;
const variant = story.variants[0]!;

const meta: Meta<typeof VisualVariantCard> = {
  title: 'Visual Report/Organisms/Variant Card',
  component: VisualVariantCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FailedVariant: Story = {
  render: () => {
    const [mode, setMode] = useState<ComparisonMode>('slider');

    return (
      <div style={{ width: 'min(100%, 920px)' }}>
        <VisualVariantCard
          story={story}
          variant={variant}
          generatedAt={visualReportFixture.generatedAt}
          activeMode={mode}
          onModeChange={(_key, nextMode) => setMode(nextMode)}
        />
      </div>
    );
  },
};
