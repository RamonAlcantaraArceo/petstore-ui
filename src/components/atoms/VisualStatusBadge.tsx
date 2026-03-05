import type { CSSProperties, FC } from 'react';
import { STATUS_ICONS } from '../../visual-report/constants';
import { normalizeStatus } from '../../visual-report/model';
import type { VisualStatus } from '../../visual-report/types';
import { statusColorByKey } from '../../visual-report/styles';

export interface VisualStatusBadgeProps {
  status: VisualStatus;
}

export const VisualStatusBadge: FC<VisualStatusBadgeProps> = ({ status }) => {
  const normalized = normalizeStatus(status);
  const palette = statusColorByKey[normalized];

  const style: CSSProperties = {
    borderRadius: '999px',
    fontSize: '0.75rem',
    padding: '2px 8px',
    border: `1px solid ${palette.border}`,
    color: palette.text,
    background: palette.bg,
    whiteSpace: 'nowrap',
  };

  return (
    <span style={style} aria-label={`Status: ${normalized}`}>
      {STATUS_ICONS[normalized]} {normalized}
    </span>
  );
};
