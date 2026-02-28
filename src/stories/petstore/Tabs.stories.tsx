import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tabs } from '../../components/atoms/Tabs';
import { useTranslation } from '../../i18n';

const tabs = [
  { id: 'pets', labelTranslationKey: 'petstore.navigation.pets' },
  { id: 'orders', labelTranslationKey: 'petstore.navigation.orders' },
  { id: 'users', labelTranslationKey: 'petstore.navigation.users' },
];

const meta: Meta<typeof Tabs> = {
  title: 'Petstore/Atoms/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

function TabsTemplate(args: React.ComponentProps<typeof Tabs>) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = React.useState(args.activeTab || 'pets');

  return (
    <div style={{ minWidth: '24rem' }}>
      <Tabs {...args} activeTab={activeTab} onChange={setActiveTab} />
      <div style={{ marginTop: '1rem' }}>
        {t('petstore.tabs.activeLabel')}: {t(`petstore.navigation.${activeTab}`)}
      </div>
    </div>
  );
}

export const KeyboardNavigation: Story = {
  render: (args) => <TabsTemplate {...args} />,
  args: {
    tabs,
    activeTab: 'pets',
  },
};

export const ThreeTabs: Story = {
  render: (args) => <TabsTemplate {...args} />,
  args: {
    tabs,
    activeTab: 'orders',
  },
};
