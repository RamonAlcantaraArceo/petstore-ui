import type { CSSProperties, FC } from 'react';
import { FILTER_ICONS } from '../../visual-report/constants';
import type { StatusFilter } from '../../visual-report/types';
import { theme } from '@petstore-ui/atoms';

export interface VisualFilterButtonProps {
  filter: StatusFilter;
  label: string;
  count: number;
  active: boolean;
  onClick: (filter: StatusFilter) => void;
}

export const VisualFilterButton: FC<VisualFilterButtonProps> = ({
  filter,
  label,
  count,
  active,
  onClick,
}) => {
  const style: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing[2],
    border: 'none',
    borderRight: '1px solid var(--color-border-strong)',
    background: active ? 'var(--color-primary)' : 'var(--color-surface)',
    color: 'var(--color-text)',
    padding: `${theme.spacing[2.5]} ${theme.spacing[3.5]}`,
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.sm,
  };

  const countStyle: CSSProperties = {
    minWidth: '22px',
    textAlign: 'center',
    fontSize: theme.typography.fontSize.xs,
    borderRadius: '999px',
    padding: '2px 8px',
    background: active ? 'var(--color-primary-strong)' : 'var(--color-count-bg)',
    color: 'var(--color-text)',
  };

  return (
    <button type="button" style={style} aria-pressed={active} onClick={() => onClick(filter)}>
      <span aria-hidden>{FILTER_ICONS[filter]}</span>
      <span>{label}</span>
      <span style={countStyle}>{count}</span>
    </button>
  );
};
