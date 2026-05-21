import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from '../../i18n';
import { theme } from '../../tokens/theme';
import {
  ensureSelectedKeyVisible,
  getFilterCounts,
  getFilteredComponentGroups,
  getVariantMode,
  toViewData,
  toggleStatusFilter,
  variantMatchesStatusSelection,
} from '../../visual-report/model';
import { reportLayoutStyles } from '../../visual-report/styles';
import type {
  ComparisonMode,
  StatusFilter,
  VisualReportData,
  VisualStatus,
} from '../../visual-report/types';
import { VisualFilterBar } from '../molecules/VisualFilterBar';
import { VisualComponentTree } from './VisualComponentTree';
import { VisualVariantCard } from './VisualVariantCard';

export interface VisualReportAppProps {
  data: VisualReportData;
}

export const VisualReportApp: FC<VisualReportAppProps> = ({ data }) => {
  const { t } = useTranslation();
  const viewData = useMemo(() => toViewData(data), [data]);

  const [selectedStatusFilters, setSelectedStatusFilters] = useState<Set<VisualStatus>>(new Set());
  const [selectedKey, setSelectedKey] = useState<string | null>(
    viewData.componentGroups[0]?.key ?? null,
  );
  const [variantModes, setVariantModes] = useState<Map<string, ComparisonMode>>(new Map());

  const filteredGroups = useMemo(
    () => getFilteredComponentGroups(viewData.componentGroups, selectedStatusFilters),
    [viewData.componentGroups, selectedStatusFilters],
  );

  useEffect(() => {
    setSelectedKey((prev) => ensureSelectedKeyVisible(prev, filteredGroups));
  }, [filteredGroups]);

  const counts = useMemo(
    () => getFilterCounts(viewData.componentGroups),
    [viewData.componentGroups],
  );

  const selectedGroup = useMemo(
    () => filteredGroups.find((group) => group.key === selectedKey) ?? null,
    [filteredGroups, selectedKey],
  );

  const visibleVariantsCount = useMemo(() => {
    if (!selectedGroup) {
      return 0;
    }

    return selectedGroup.stories.reduce(
      (total, story) =>
        total +
        story.variants.filter((variant) =>
          variantMatchesStatusSelection(variant, selectedStatusFilters),
        ).length,
      0,
    );
  }, [selectedGroup, selectedStatusFilters]);

  const totalVariantsCount = useMemo(() => {
    if (!selectedGroup) {
      return 0;
    }

    return selectedGroup.stories.reduce((total, story) => total + story.variants.length, 0);
  }, [selectedGroup]);

  const subtitle = selectedGroup
    ? t('visualReport.selection.shownOf', {
        shown: visibleVariantsCount,
        total: totalVariantsCount,
      })
    : t('visualReport.selection.tryDifferentFilter');

  return (
    <main style={reportLayoutStyles.root}>
      <aside style={reportLayoutStyles.sidebar}>
        <header>
          <h1 style={{ margin: 0, fontSize: '1.1rem' }}>{t('visualReport.title')}</h1>
          <p
            style={{
              margin: '6px 0 0',
              color: theme.colors.neutral.gray[400],
              fontSize: '0.85rem',
            }}
          >
            {t('visualReport.generatedAt', {
              date: new Date(data.generatedAt).toLocaleString(),
              count: viewData.componentGroups.length,
            })}
          </p>
        </header>

        <VisualComponentTree
          groups={filteredGroups}
          selectedKey={selectedKey}
          selectedStatusFilters={selectedStatusFilters}
          onSelect={setSelectedKey}
        />
      </aside>

      <section style={reportLayoutStyles.content}>
        <div style={reportLayoutStyles.toolbar}>
          <VisualFilterBar
            counts={counts}
            selectedStatusFilters={selectedStatusFilters}
            onToggle={(filter: StatusFilter) => {
              setSelectedStatusFilters((prev) => toggleStatusFilter(filter, prev));
            }}
          />
        </div>

        <header>
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>
            {selectedGroup
              ? `${selectedGroup.namespace} / ${selectedGroup.atomicLevel} / ${selectedGroup.component}`
              : t('visualReport.selection.noMatchingComponents')}
          </h2>
          <p style={{ margin: '6px 0 0', color: theme.colors.neutral.gray[400] }}>{subtitle}</p>
        </header>

        <div style={{ marginTop: theme.spacing[4], display: 'grid', gap: theme.spacing[3.5] }}>
          {selectedGroup?.stories
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .flatMap((story) =>
              story.variants
                .filter((variant) => variantMatchesStatusSelection(variant, selectedStatusFilters))
                .map((variant) => {
                  const variantKey = `${story.id}::${variant.viewport}`;
                  return (
                    <VisualVariantCard
                      key={variantKey}
                      story={story}
                      variant={variant}
                      generatedAt={data.generatedAt}
                      activeMode={getVariantMode(variantModes, variantKey)}
                      onModeChange={(key, mode) => {
                        setVariantModes((prev) => {
                          const next = new Map(prev);
                          next.set(key, mode);
                          return next;
                        });
                      }}
                    />
                  );
                }),
            )}
        </div>
      </section>
    </main>
  );
};
