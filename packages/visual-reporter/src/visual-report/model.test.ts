import { describe, expect, it } from 'vitest';
import {
  getVariantMode,
  getFilterCounts,
  toggleStatusFilter,
  toViewData,
  variantMatchesStatusSelection,
} from './model';
import type { VisualStatus } from './types';
import { visualReportFixture } from '../stories/visual-report/fixtures';

describe('visual report model', () => {
  it('supports all + multi-select status transitions', () => {
    let selected = new Set<VisualStatus>();

    selected = toggleStatusFilter('passed', selected);
    expect(selected.has('passed')).toBe(true);

    selected = toggleStatusFilter('failed', selected);
    expect(selected.has('passed')).toBe(true);
    expect(selected.has('failed')).toBe(true);

    selected = toggleStatusFilter('all', selected);
    expect(selected.size).toBe(0);
  });

  it('matches variants by selected status', () => {
    const selected = new Set<VisualStatus>(['failed']);
    const failed = visualReportFixture.components[0]?.variants[0];
    const passed = visualReportFixture.components[0]?.variants[1];

    expect(failed).toBeDefined();
    expect(passed).toBeDefined();

    if (!failed || !passed) {
      return;
    }

    expect(variantMatchesStatusSelection(failed, selected)).toBe(true);
    expect(variantMatchesStatusSelection(passed, selected)).toBe(false);
  });

  it('returns filter counts including all', () => {
    const viewData = toViewData(visualReportFixture);
    const counts = getFilterCounts(viewData.componentGroups);

    expect(counts.get('all')).toBe(3);
    expect(counts.get('failed')).toBe(1);
    expect(counts.get('passed')).toBe(2);
  });

  it('defaults to side-by-side when either comparison image is missing', () => {
    const modeWithoutStoredSelection = getVariantMode(new Map(), 'story::desktop', {
      expected: 'expected.png',
      actual: null,
    });

    expect(modeWithoutStoredSelection).toBe('side-by-side');
  });

  it('keeps slider default when both images are present', () => {
    const modeWithoutStoredSelection = getVariantMode(new Map(), 'story::desktop', {
      expected: 'expected.png',
      actual: 'actual.png',
    });

    expect(modeWithoutStoredSelection).toBe('slider');
  });
});
