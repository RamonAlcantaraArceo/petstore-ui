import React from 'react';
import type { FC } from 'react';
import { theme } from '../../tokens/theme';
import { useTranslation } from '../../i18n';
import { useAccessibility, useKeyboardNavigation } from '../../accessibility';

export interface TabItem {
  id: string;
  label?: string;
  labelTranslationKey?: string;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
}

export const Tabs: FC<TabsProps> = ({ tabs, activeTab, onChange }) => {
  const { t } = useTranslation();
  const { ariaAttributes } = useAccessibility({
    'aria-label': t('petstore.navigation.tabsAriaLabel'),
  });
  const { handleKeyDown } = useKeyboardNavigation({
    arrowNavigation: 'horizontal',
    homeEndKeys: true,
  });

  const tabRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

  if (tabs.length === 0) {
    return null;
  }

  const focusTab = (index: number) => {
    const tab = tabRefs.current[index];
    tab?.focus();
  };

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const lastIndex = tabs.length - 1;

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      const nextIndex = index === lastIndex ? 0 : index + 1;
      const nextTab = tabs[nextIndex];
      if (!nextTab) {
        return;
      }
      focusTab(nextIndex);
      onChange(nextTab.id);
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      const prevIndex = index === 0 ? lastIndex : index - 1;
      const prevTab = tabs[prevIndex];
      if (!prevTab) {
        return;
      }
      focusTab(prevIndex);
      onChange(prevTab.id);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      const firstTab = tabs[0];
      if (!firstTab) {
        return;
      }
      focusTab(0);
      onChange(firstTab.id);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      const lastTab = tabs[lastIndex];
      if (!lastTab) {
        return;
      }
      focusTab(lastIndex);
      onChange(lastTab.id);
      return;
    }

    handleKeyDown(event);
  };

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[2],
    borderBottom: `1px solid ${theme.colors.secondary[300]}`,
  };

  const buttonStyles = (isActive: boolean): React.CSSProperties => ({
    border: 'none',
    borderBottom: `2px solid ${isActive ? theme.colors.primary[500] : 'transparent'}`,
    background: 'transparent',
    color: isActive ? theme.colors.primary[700] : theme.colors.secondary[600],
    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing[2],
    fontFamily: theme.typography.fontFamily.sans.join(', '),
    fontSize: theme.typography.fontSize.sm,
    fontWeight: isActive
      ? theme.typography.fontWeight.semibold
      : theme.typography.fontWeight.medium,
    cursor: 'pointer',
  });

  return (
    <div role="tablist" aria-orientation="horizontal" style={containerStyles} {...ariaAttributes}>
      {tabs.map((tab, index) => {
        const isActive = tab.id === activeTab;
        const tabId = `tab-${tab.id}`;
        const panelId = `tabpanel-${tab.id}`;
        const displayLabel = tab.labelTranslationKey
          ? t(tab.labelTranslationKey)
          : (tab.label ?? tab.id);

        return (
          <button
            key={tab.id}
            id={tabId}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            role="tab"
            aria-selected={isActive}
            aria-controls={panelId}
            tabIndex={isActive ? 0 : -1}
            style={buttonStyles(isActive)}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
            type="button"
          >
            {tab.icon}
            {displayLabel}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
