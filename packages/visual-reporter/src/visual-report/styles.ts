import type { CSSProperties } from 'react';
import { theme } from '@petstore-ui/atoms';
import type { VisualStatus } from './types';

export const statusColorByKey: Record<VisualStatus, { border: string; text: string; bg: string }> =
  {
    failed: {
      border: 'var(--color-danger)',
      text: 'var(--color-danger-soft)',
      bg: 'var(--color-surface-2)',
    },
    flaky: {
      border: 'var(--color-warning)',
      text: 'var(--color-warning-soft)',
      bg: 'var(--color-surface-2)',
    },
    passed: {
      border: 'var(--color-success)',
      text: 'var(--color-success-soft)',
      bg: 'var(--color-surface-2)',
    },
    skipped: {
      border: 'var(--color-border-strong)',
      text: 'var(--color-text-soft)',
      bg: 'var(--color-surface-2)',
    },
    unknown: {
      border: 'var(--color-border-strong)',
      text: 'var(--color-text-soft)',
      bg: 'var(--color-surface-2)',
    },
  };

export const reportLayoutStyles: Record<string, CSSProperties> = {
  root: {
    display: 'grid',
    gridTemplateColumns: '320px 1fr',
    height: '100vh',
    overflow: 'hidden',
    background: 'var(--color-bg)',
    color: 'var(--color-text)',
    fontFamily: theme.typography.fontFamily.sans.join(', '),
  },
  sidebar: {
    borderRight: '1px solid var(--color-border)',
    padding: theme.spacing[4],
    background: 'var(--color-sidebar)',
    overflowY: 'auto',
    minHeight: 0,
    maxHeight: '100vh',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    minHeight: 0,
    background: 'var(--color-main)',
  },
  toolbar: {
    position: 'sticky',
    top: 0,
    zIndex: Number(theme.zIndex[20]),
    background: 'var(--color-header)',
    padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
    borderBottom: '1px solid var(--color-border)',
    boxShadow: '0 6px 10px var(--color-shadow)',
  },
  results: {
    overflowY: 'auto',
    minHeight: 0,
    padding: `${theme.spacing[3]} ${theme.spacing[4]} ${theme.spacing[4]}`,
  },
};
