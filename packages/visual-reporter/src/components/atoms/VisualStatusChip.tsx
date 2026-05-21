import type { CSSProperties, FC } from 'react';
import { STATUS_ICONS } from '../../visual-report/constants';
import type { VisualStatus } from '../../visual-report/types';
import { statusColorByKey } from '../../visual-report/styles';

export interface VisualStatusChipProps {
  status: VisualStatus;
  count: number;
}

export const VisualStatusChip: FC<VisualStatusChipProps> = ({ status, count }) => {
  if (!count) {
    return null;
  }

  const palette = statusColorByKey[status];

  const style: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '3px',
    borderRadius: '999px',
    border: `1px solid ${palette.border}`,
    background: palette.bg,
    color: palette.text,
    fontSize: '0.68rem',
    lineHeight: 1,
    padding: '2px 6px',
    whiteSpace: 'nowrap',
  };

  return (
    <span style={style} aria-label={`${status} ${count}`}>
      {STATUS_ICONS[status]} {count}
    </span>
  );
};
