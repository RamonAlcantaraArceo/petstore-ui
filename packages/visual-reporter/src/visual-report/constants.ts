import type { ComparisonMode, StatusFilter, VisualStatus } from './types';

export const STATUS_ORDER: VisualStatus[] = ['failed', 'flaky', 'unknown', 'skipped', 'passed'];

export const FILTERS: StatusFilter[] = ['all', 'passed', 'failed', 'flaky', 'skipped', 'unknown'];

export const FILTER_ICONS: Record<StatusFilter, string> = {
  all: '📋',
  passed: '✅',
  failed: '❌',
  flaky: '⚠️',
  skipped: '⏭️',
  unknown: '❔',
};

export const STATUS_ICONS: Record<VisualStatus, string> = {
  passed: '✅',
  failed: '❌',
  flaky: '⚠️',
  skipped: '⏭️',
  unknown: '❔',
};

export const COMPARISON_MODES: Array<{ value: ComparisonMode; labelKey: string }> = [
  { value: 'diff', labelKey: 'visualReport.modes.diff' },
  { value: 'actual', labelKey: 'visualReport.modes.actual' },
  { value: 'expected', labelKey: 'visualReport.modes.expected' },
  { value: 'side-by-side', labelKey: 'visualReport.modes.sideBySide' },
  { value: 'slider', labelKey: 'visualReport.modes.slider' },
];

export const DEFAULT_COMPARISON_MODE: ComparisonMode = 'slider';
