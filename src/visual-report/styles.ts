import type { CSSProperties } from 'react';
import { theme } from '../tokens/theme';
import type { VisualStatus } from './types';

export const statusColorByKey: Record<VisualStatus, { border: string; text: string; bg: string }> =
  {
    failed: {
      border: theme.colors.semantic.errorDark,
      text: theme.colors.semantic.errorLight,
      bg: theme.colors.secondary[900],
    },
    flaky: {
      border: theme.colors.semantic.warning,
      text: theme.colors.semantic.warningLight,
      bg: theme.colors.secondary[900],
    },
    passed: {
      border: theme.colors.semantic.successDark,
      text: theme.colors.semantic.successLight,
      bg: theme.colors.secondary[900],
    },
    skipped: {
      border: theme.colors.secondary[600],
      text: theme.colors.neutral.gray[300],
      bg: theme.colors.secondary[900],
    },
    unknown: {
      border: theme.colors.secondary[600],
      text: theme.colors.neutral.gray[300],
      bg: theme.colors.secondary[900],
    },
  };

export const reportLayoutStyles: Record<string, CSSProperties> = {
  root: {
    display: 'grid',
    gridTemplateColumns: '320px 1fr',
    minHeight: '100vh',
    background: theme.colors.secondary[950],
    color: theme.colors.neutral.gray[100],
    fontFamily: theme.typography.fontFamily.sans.join(', '),
  },
  sidebar: {
    borderRight: `1px solid ${theme.colors.secondary[800]}`,
    padding: theme.spacing[4],
    background: theme.colors.secondary[900],
    overflowY: 'auto',
    minHeight: 0,
  },
  content: {
    padding: theme.spacing[4],
    overflowY: 'auto',
    minHeight: 0,
    background: theme.colors.secondary[950],
  },
  toolbar: {
    position: 'sticky',
    top: 0,
    zIndex: Number(theme.zIndex[20]),
    background: theme.colors.secondary[950],
    paddingBottom: theme.spacing[3],
    borderBottom: `1px solid ${theme.colors.secondary[800]}`,
    boxShadow: `0 6px 10px ${theme.colors.secondary[950]}`,
  },
};
