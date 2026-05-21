import type { CSSProperties, FC } from 'react';
import { FILTER_ICONS } from '../../visual-report/constants';
import type { StatusFilter } from '../../visual-report/types';
import { theme } from '../../tokens/theme';

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
    borderRight: `1px solid ${theme.colors.secondary[600]}`,
    background: active ? theme.colors.primary[700] : theme.colors.secondary[900],
    color: theme.colors.neutral.gray[100],
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
    background: active ? theme.colors.primary[800] : theme.colors.secondary[600],
    color: active ? theme.colors.primary[100] : theme.colors.neutral.gray[200],
  };

  return (
    <button type="button" style={style} aria-pressed={active} onClick={() => onClick(filter)}>
      <span aria-hidden>{FILTER_ICONS[filter]}</span>
      <span>{label}</span>
      <span style={countStyle}>{count}</span>
    </button>
  );
};
