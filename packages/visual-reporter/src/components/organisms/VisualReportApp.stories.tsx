import type { Meta, StoryObj } from '@storybook/react-vite';
import { VisualReportApp } from './VisualReportApp';
import { visualReportFixture } from '../../stories/visual-report/fixtures';

const meta: Meta<typeof VisualReportApp> = {
  title: 'Visual Report/Organisms/Report App',
  component: VisualReportApp,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FullView: Story = {
  args: {
    data: visualReportFixture,
  },
};

const denseFixture = {
  ...visualReportFixture,
  components: Array.from({ length: 24 }, (_, index) =>
    visualReportFixture.components.map((component) => ({
      ...component,
      id: `${component.id}-${index + 1}`,
      name: `${component.name} ${index + 1}`,
      title: `${component.title} / Set ${index + 1}`,
    })),
  ).flat(),
};

export const DenseLayout: Story = {
  args: {
    data: denseFixture,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Stress story for layout behavior: enough rows to verify independent left-panel and results scrolling with sticky top controls.',
      },
    },
  },
};
