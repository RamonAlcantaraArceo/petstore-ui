import type { Meta, StoryObj } from '@storybook/react-vite';
import { TabButton } from './TabButton';

const meta: Meta<typeof TabButton> = {
  title: 'Common/Atoms/TabButton',
  component: TabButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Reusable tab button for tablists and segmented tab-like controls. Supports selected state, keyboard focus management, and two visual presets.',
      },
    },
  },
  argTypes: {
    selected: {
      control: 'boolean',
    },
    appearance: {
      control: 'select',
      options: ['underline', 'pill'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Underline: Story = {
  args: {
    selected: true,
    children: 'Pets',
    controls: 'tabpanel-pets',
    appearance: 'underline',
  },
};

export const Pill: Story = {
  args: {
    selected: false,
    children: 'Diff',
    controls: 'variant-diff-panel',
    appearance: 'pill',
  },
};

export const SelectedAndDisabled: Story = {
  name: 'Selected and Disabled',
  args: {
    selected: true,
    disabled: true,
    children: 'Orders',
    controls: 'tabpanel-orders',
    appearance: 'underline',
  },
};
