import type { CSSProperties, FC } from 'react';
import { useTranslation } from '@petstore-ui/atoms';
import { theme } from '@petstore-ui/atoms';
import { FILTERS } from '../../visual-report/constants';
import type { StatusFilter, VisualStatus } from '../../visual-report/types';
import { VisualFilterButton } from '../atoms/VisualFilterButton';

export interface VisualFilterBarProps {
  counts: Map<StatusFilter, number>;
  selectedStatusFilters: Set<VisualStatus>;
  onToggle: (filter: StatusFilter) => void;
}

export const VisualFilterBar: FC<VisualFilterBarProps> = ({
  counts,
  selectedStatusFilters,
  onToggle,
}) => {
  const { t } = useTranslation();

  const wrapStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    border: '1px solid var(--color-border-strong)',
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
  };

  const isFilterActive = (filter: StatusFilter): boolean =>
    filter === 'all' ? selectedStatusFilters.size === 0 : selectedStatusFilters.has(filter);

  return (
    <div style={wrapStyle} aria-label={t('visualReport.filters.ariaLabel')}>
      {FILTERS.map((filter) => (
        <VisualFilterButton
          key={filter}
          filter={filter}
          label={t(`visualReport.filters.${filter}`)}
          count={counts.get(filter) ?? 0}
          active={isFilterActive(filter)}
          onClick={onToggle}
        />
      ))}
    </div>
  );
};
