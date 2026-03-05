export type VisualStatus = 'passed' | 'failed' | 'flaky' | 'skipped' | 'unknown';

export type StatusFilter = 'all' | VisualStatus;

export type ComparisonMode = 'diff' | 'actual' | 'expected' | 'side-by-side' | 'slider';

export interface VisualVariant {
  viewport: string;
  expected: string | null;
  actual: string | null;
  diff?: string | null;
  status: VisualStatus;
}

export interface VisualStory {
  id: string;
  name: string;
  namespace: string;
  atomicLevel: string;
  component: string;
  title: string;
  variants: VisualVariant[];
}

export interface VisualComponentGroup {
  key: string;
  namespace: string;
  atomicLevel: string;
  component: string;
  stories: VisualStory[];
}

export interface VisualReportSource {
  storybookIndex: string;
  playwrightJson: string | null;
  expectedDir: string;
  actualDir: string;
  diffDir: string;
}

export interface VisualReportData {
  generatedAt: string;
  source: VisualReportSource;
  viewports: string[];
  namespaces: string[];
  components: VisualStory[];
}

export interface VisualReportViewData extends VisualReportData {
  componentGroups: VisualComponentGroup[];
}

export interface TreeNodeByLevel {
  level: string;
  groups: VisualComponentGroup[];
}

export interface TreeNodeByNamespace {
  namespace: string;
  levels: TreeNodeByLevel[];
}

export interface VisualReportState {
  data: VisualReportViewData | null;
  selectedKey: string | null;
  selectedStatusFilters: Set<VisualStatus>;
  variantModes: Map<string, ComparisonMode>;
}

export interface VisualCountByStatus {
  passed: number;
  failed: number;
  flaky: number;
  skipped: number;
  unknown: number;
}
