import { DEFAULT_COMPARISON_MODE, FILTERS, STATUS_ORDER } from './constants';
import type {
  ComparisonMode,
  StatusFilter,
  TreeNodeByNamespace,
  VisualComponentGroup,
  VisualCountByStatus,
  VisualReportData,
  VisualReportViewData,
  VisualStatus,
  VisualStory,
  VisualVariant,
} from './types';

export const getComponentKey = (item: VisualStory): string =>
  `${item.namespace}::${item.atomicLevel}::${item.component}`;

export const groupByComponent = (components: VisualStory[]): VisualComponentGroup[] => {
  const grouped = new Map<string, VisualComponentGroup>();

  for (const item of components) {
    const key = getComponentKey(item);
    const existing = grouped.get(key);

    if (existing) {
      existing.stories.push(item);
      continue;
    }

    grouped.set(key, {
      key,
      namespace: item.namespace,
      atomicLevel: item.atomicLevel,
      component: item.component,
      stories: [item],
    });
  }

  return [...grouped.values()].sort((a, b) => a.component.localeCompare(b.component));
};

export const toViewData = (data: VisualReportData): VisualReportViewData => ({
  ...data,
  componentGroups: groupByComponent(data.components ?? []),
});

export const normalizeStatus = (status?: VisualStatus | null): VisualStatus => status ?? 'unknown';

export const createStatusCounts = (): VisualCountByStatus => ({
  passed: 0,
  failed: 0,
  flaky: 0,
  skipped: 0,
  unknown: 0,
});

export const collectStatusCounts = (variants: VisualVariant[]): VisualCountByStatus => {
  const counts = createStatusCounts();

  for (const variant of variants) {
    const status = normalizeStatus(variant.status);
    counts[status] += 1;
  }

  return counts;
};

export const mergeStatusCounts = (
  targetCounts: VisualCountByStatus,
  sourceCounts: VisualCountByStatus,
): VisualCountByStatus => ({
  passed: targetCounts.passed + sourceCounts.passed,
  failed: targetCounts.failed + sourceCounts.failed,
  flaky: targetCounts.flaky + sourceCounts.flaky,
  skipped: targetCounts.skipped + sourceCounts.skipped,
  unknown: targetCounts.unknown + sourceCounts.unknown,
});

export const formatStatusBreakdown = (statusCounts: VisualCountByStatus): string =>
  STATUS_ORDER.filter((status) => statusCounts[status] > 0)
    .map((status) => `${status} ${statusCounts[status]}`)
    .join(', ');

export const variantMatchesStatusSelection = (
  variant: VisualVariant,
  selectedStatusFilters: Set<VisualStatus>,
): boolean => {
  if (selectedStatusFilters.size === 0) {
    return true;
  }

  return selectedStatusFilters.has(normalizeStatus(variant.status));
};

export const toggleStatusFilter = (
  filter: StatusFilter,
  selectedStatusFilters: Set<VisualStatus>,
): Set<VisualStatus> => {
  if (filter === 'all') {
    return new Set<VisualStatus>();
  }

  const next = new Set(selectedStatusFilters);
  if (next.has(filter)) {
    next.delete(filter);
    return next;
  }

  next.add(filter);
  return next;
};

export const getVisibleVariantsForGroup = (
  group: VisualComponentGroup,
  selectedStatusFilters: Set<VisualStatus>,
): VisualVariant[] =>
  group.stories.flatMap((story) =>
    story.variants.filter((variant) =>
      variantMatchesStatusSelection(variant, selectedStatusFilters),
    ),
  );

export const getAllVariants = (componentGroups: VisualComponentGroup[]): VisualVariant[] =>
  componentGroups.flatMap((group) => group.stories.flatMap((story) => story.variants));

export const getFilterCounts = (
  componentGroups: VisualComponentGroup[],
): Map<StatusFilter, number> => {
  const variants = getAllVariants(componentGroups);
  const counts = new Map<StatusFilter, number>(FILTERS.map((filter) => [filter, 0]));
  counts.set('all', variants.length);

  for (const variant of variants) {
    const status = normalizeStatus(variant.status);
    counts.set(status, (counts.get(status) ?? 0) + 1);
  }

  return counts;
};

export const getFilteredComponentGroups = (
  componentGroups: VisualComponentGroup[],
  selectedStatusFilters: Set<VisualStatus>,
): VisualComponentGroup[] =>
  componentGroups.filter((group) =>
    group.stories.some((story) =>
      story.variants.some((variant) =>
        variantMatchesStatusSelection(variant, selectedStatusFilters),
      ),
    ),
  );

export const ensureSelectedKeyVisible = (
  selectedKey: string | null,
  groups: VisualComponentGroup[],
): string | null => {
  if (!groups.length) {
    return null;
  }

  if (selectedKey && groups.some((group) => group.key === selectedKey)) {
    return selectedKey;
  }

  return groups[0]?.key ?? null;
};

export const buildTree = (componentGroups: VisualComponentGroup[]): TreeNodeByNamespace[] => {
  const namespaces = new Map<string, Map<string, VisualComponentGroup[]>>();

  for (const group of componentGroups) {
    const namespaceNode =
      namespaces.get(group.namespace) ?? new Map<string, VisualComponentGroup[]>();
    const levelNode = namespaceNode.get(group.atomicLevel) ?? [];
    levelNode.push(group);
    namespaceNode.set(group.atomicLevel, levelNode);
    namespaces.set(group.namespace, namespaceNode);
  }

  return [...namespaces.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([namespace, levels]) => ({
      namespace,
      levels: [...levels.entries()]
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([level, groups]) => ({
          level,
          groups: [...groups].sort((a, b) => a.component.localeCompare(b.component)),
        })),
    }));
};

export const getVariantMode = (
  variantModes: Map<string, ComparisonMode>,
  variantKey: string,
): ComparisonMode => variantModes.get(variantKey) ?? DEFAULT_COMPARISON_MODE;

export const resolveSelectableMode = (
  mode: ComparisonMode,
  selectableModes: ComparisonMode[],
): ComparisonMode => {
  if (selectableModes.includes(mode)) {
    return mode;
  }

  if (selectableModes.includes(DEFAULT_COMPARISON_MODE)) {
    return DEFAULT_COMPARISON_MODE;
  }

  return selectableModes[0] ?? DEFAULT_COMPARISON_MODE;
};
