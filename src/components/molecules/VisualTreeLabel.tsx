import type { CSSProperties, FC } from 'react';
import type { VisualCountByStatus } from '../../visual-report/types';
import { STATUS_ORDER } from '../../visual-report/constants';
import { VisualStatusChip } from '../atoms/VisualStatusChip';

export interface VisualTreeLabelProps {
  text: string;
  counts: VisualCountByStatus;
}

export const VisualTreeLabel: FC<VisualTreeLabelProps> = ({ text, counts }) => {
  const wrapStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    minWidth: 0,
  };

  const chipsStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '4px',
  };

  return (
    <span style={wrapStyle}>
      <span style={{ minWidth: 0 }}>{text}</span>
      <span style={chipsStyle}>
        {STATUS_ORDER.map((status) => (
          <VisualStatusChip key={status} status={status} count={counts[status]} />
        ))}
      </span>
    </span>
  );
};
