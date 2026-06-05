import type { CSSProperties, FC } from 'react';
import { useMemo } from 'react';
import { theme } from '@petstore-ui/atoms';
import {
  buildTree,
  collectStatusCounts,
  formatStatusBreakdown,
  getVisibleVariantsForGroup,
  mergeStatusCounts,
} from '../../visual-report/model';
import type { VisualComponentGroup, VisualStatus } from '../../visual-report/types';
import { VisualTreeLabel } from '../molecules/VisualTreeLabel';

export interface VisualComponentTreeProps {
  groups: VisualComponentGroup[];
  selectedKey: string | null;
  selectedStatusFilters: Set<VisualStatus>;
  onSelect: (key: string) => void;
}

export const VisualComponentTree: FC<VisualComponentTreeProps> = ({
  groups,
  selectedKey,
  selectedStatusFilters,
  onSelect,
}) => {
  const tree = useMemo(() => buildTree(groups), [groups]);

  const treeStyle: CSSProperties = {
    marginTop: theme.spacing[3.5],
    display: 'grid',
    gap: theme.spacing[2.5],
  };

  const detailsStyle: CSSProperties = {
    border: '1px solid var(--color-border)',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing[2],
    background: 'var(--color-surface)',
  };

  const listStyle: CSSProperties = {
    marginTop: theme.spacing[2],
    display: 'grid',
    gap: theme.spacing[1.5],
  };

  const buttonBaseStyle: CSSProperties = {
    textAlign: 'left',
    width: '100%',
    border: '1px solid var(--color-border-strong)',
    background: 'var(--color-surface)',
    color: 'var(--color-text)',
    borderRadius: theme.borderRadius.md,
    padding: '6px 8px',
    cursor: 'pointer',
  };

  return (
    <div style={treeStyle} aria-label="Component hierarchy">
      {tree.map((namespaceNode) => {
        let namespaceCounts = collectStatusCounts([]);

        for (const level of namespaceNode.levels) {
          for (const group of level.groups) {
            namespaceCounts = mergeStatusCounts(
              namespaceCounts,
              collectStatusCounts(getVisibleVariantsForGroup(group, selectedStatusFilters)),
            );
          }
        }

        const namespaceBreakdown = formatStatusBreakdown(namespaceCounts);

        return (
          <details key={namespaceNode.namespace} open style={detailsStyle}>
            <summary
              aria-label={
                namespaceBreakdown
                  ? `${namespaceNode.namespace}. ${namespaceBreakdown}`
                  : namespaceNode.namespace
              }
            >
              <VisualTreeLabel text={namespaceNode.namespace} counts={namespaceCounts} />
            </summary>

            {namespaceNode.levels.map((levelNode) => {
              let levelCounts = collectStatusCounts([]);

              for (const group of levelNode.groups) {
                levelCounts = mergeStatusCounts(
                  levelCounts,
                  collectStatusCounts(getVisibleVariantsForGroup(group, selectedStatusFilters)),
                );
              }

              const levelLabel = `${levelNode.level} (${levelNode.groups.length})`;
              const levelBreakdown = formatStatusBreakdown(levelCounts);

              return (
                <details
                  key={`${namespaceNode.namespace}-${levelNode.level}`}
                  open
                  style={detailsStyle}
                >
                  <summary
                    aria-label={levelBreakdown ? `${levelLabel}. ${levelBreakdown}` : levelLabel}
                  >
                    <VisualTreeLabel text={levelLabel} counts={levelCounts} />
                  </summary>

                  <div style={listStyle}>
                    {levelNode.groups.map((group) => {
                      const visibleVariants = getVisibleVariantsForGroup(
                        group,
                        selectedStatusFilters,
                      );
                      const visibleCount = visibleVariants.length;
                      const groupCounts = collectStatusCounts(visibleVariants);
                      const label = `${group.component} (${visibleCount})`;
                      const groupBreakdown = formatStatusBreakdown(groupCounts);

                      return (
                        <button
                          key={group.key}
                          type="button"
                          style={{
                            ...buttonBaseStyle,
                            borderColor:
                              selectedKey === group.key
                                ? 'var(--color-primary)'
                                : 'var(--color-border-strong)',
                            background:
                              selectedKey === group.key
                                ? 'var(--color-primary-soft)'
                                : 'var(--color-surface)',
                          }}
                          aria-label={groupBreakdown ? `${label}. ${groupBreakdown}` : label}
                          onClick={() => onSelect(group.key)}
                        >
                          <VisualTreeLabel text={label} counts={groupCounts} />
                        </button>
                      );
                    })}
                  </div>
                </details>
              );
            })}
          </details>
        );
      })}
    </div>
  );
};
