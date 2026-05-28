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
