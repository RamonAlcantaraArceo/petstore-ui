import type { Meta, StoryObj } from '@storybook/react';
import { VisualReportApp } from '../../components/organisms/VisualReportApp';
import { visualReportFixture } from './fixtures';

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
