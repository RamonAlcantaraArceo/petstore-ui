import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { basename, resolve } from 'node:path';

interface StorybookIndexEntry {
  id: string;
  title: string;
  name: string;
  type?: string;
}

interface StorybookIndex {
  entries: Record<string, StorybookIndexEntry>;
}

interface PlaywrightResult {
  status?: string;
}

interface PlaywrightTest {
  projectName?: string;
  results?: PlaywrightResult[];
}

interface PlaywrightSpec {
  title?: string;
  tests?: PlaywrightTest[];
  specs?: PlaywrightSpec[];
  suites?: PlaywrightSpec[];
}

interface PlaywrightJsonReport {
  suites?: PlaywrightSpec[];
}

interface VariantAsset {
  viewport: string;
  expected: string | null;
  actual: string | null;
  status: 'passed' | 'failed' | 'skipped' | 'unknown';
}

interface ComponentVariant {
  id: string;
  name: string;
  namespace: string;
  atomicLevel: string;
  component: string;
  title: string;
  variants: VariantAsset[];
}

const ROOT = process.cwd();
const STORYBOOK_INDEX_PATH = resolve(ROOT, 'storybook-static', 'index.json');
const PLAYWRIGHT_JSON_PATH = resolve(ROOT, 'test-results', 'playwright-report.json');
const EXPECTED_DIR = resolve(ROOT, 'test-results', 'visual-report-artifacts', 'expected');
const ACTUAL_DIR = resolve(ROOT, 'test-results', 'visual-report-artifacts', 'actual');
const OUTPUT_DIR = resolve(ROOT, 'public', 'visual-report');
const OUTPUT_ASSETS_DIR = resolve(OUTPUT_DIR, 'assets');
const OUTPUT_EXPECTED_DIR = resolve(OUTPUT_ASSETS_DIR, 'expected');
const OUTPUT_ACTUAL_DIR = resolve(OUTPUT_ASSETS_DIR, 'actual');
const OUTPUT_JSON_PATH = resolve(OUTPUT_DIR, 'data.json');

const KNOWN_ATOMIC_LEVELS = new Set(['atoms', 'molecules', 'organisms']);

const normalizePart = (value: string): string => value.trim();

const parseStoryTitle = (title: string) => {
  const parts = title.split('/').map(normalizePart).filter(Boolean);
  const firstSegment = (parts[0] ?? '').toLowerCase();
  if (KNOWN_ATOMIC_LEVELS.has(firstSegment)) {
    return {
      namespace: 'Global',
      atomicLevel: firstSegment[0].toUpperCase() + firstSegment.slice(1),
      component: parts.slice(1).join(' / ') || 'Unknown',
    };
  }

  const namespace = parts[0] ?? 'Uncategorized';
  const secondSegment = (parts[1] ?? '').toLowerCase();
  if (KNOWN_ATOMIC_LEVELS.has(secondSegment)) {
    return {
      namespace,
      atomicLevel: secondSegment[0].toUpperCase() + secondSegment.slice(1),
      component: parts.slice(2).join(' / ') || parts[1] || 'Unknown',
    };
  }

  const component = parts.slice(1).join(' / ') || parts[0] || 'Unknown';

  return {
    namespace,
    atomicLevel: 'Other',
    component,
  };
};

const parseStoryIdFromSpecTitle = (specTitle: string): string | null => {
  const match = specTitle.match(/^(.*)\s+\([^)]*\)$/);
  return match?.[1] ?? null;
};

const reduceStatus = (statuses: string[]): VariantAsset['status'] => {
  if (statuses.includes('failed') || statuses.includes('timedOut')) return 'failed';
  if (statuses.includes('skipped') || statuses.includes('interrupted')) return 'skipped';
  if (statuses.includes('passed')) return 'passed';
  return 'unknown';
};

const collectStatuses = (
  report: PlaywrightJsonReport,
): Map<string, Map<string, VariantAsset['status']>> => {
  const byStory = new Map<string, Map<string, VariantAsset['status']>>();

  const visitSpec = (node: PlaywrightSpec) => {
    const specTitle = node.title;
    const storyId = specTitle ? parseStoryIdFromSpecTitle(specTitle) : null;

    if (storyId && node.tests?.length) {
      const byViewport = byStory.get(storyId) ?? new Map<string, VariantAsset['status']>();

      for (const test of node.tests) {
        const viewport = (test.projectName ?? 'unknown').toLowerCase();
        const statuses = (test.results ?? [])
          .map((result) => result.status)
          .filter((status): status is string => typeof status === 'string');
        const status = reduceStatus(statuses);
        byViewport.set(viewport, status);
      }

      byStory.set(storyId, byViewport);
    }

    for (const nestedSpec of node.specs ?? []) {
      visitSpec(nestedSpec);
    }

    for (const nestedSuite of node.suites ?? []) {
      visitSpec(nestedSuite);
    }
  };

  for (const suite of report.suites ?? []) {
    visitSpec(suite);
  }

  return byStory;
};

const collectViewportNames = (): Set<string> => {
  const names = new Set<string>();

  const addViewportFromFileName = (fileName: string) => {
    if (!fileName.endsWith('.png')) {
      return;
    }

    const stem = fileName.slice(0, -4);
    const lastSeparatorIndex = stem.lastIndexOf('--');
    if (lastSeparatorIndex === -1) {
      return;
    }

    const viewport = stem.slice(lastSeparatorIndex + 2).toLowerCase();
    if (viewport) {
      names.add(viewport);
    }
  };

  if (existsSync(EXPECTED_DIR)) {
    for (const fileName of readdirSync(EXPECTED_DIR)) {
      addViewportFromFileName(fileName);
    }
  }

  if (existsSync(ACTUAL_DIR)) {
    for (const fileName of readdirSync(ACTUAL_DIR)) {
      addViewportFromFileName(fileName);
    }
  }

  if (!names.size) {
    names.add('desktop');
    names.add('mobile');
  }

  return names;
};

const publicPath = (relativeToPublic: string): string => `/${relativeToPublic.replace(/^\/+/, '')}`;

const resetOutputAssets = () => {
  rmSync(OUTPUT_ASSETS_DIR, { recursive: true, force: true });
  mkdirSync(OUTPUT_EXPECTED_DIR, { recursive: true });
  mkdirSync(OUTPUT_ACTUAL_DIR, { recursive: true });
};

const syncAssetIfExists = (sourcePath: string, outputPath: string) => {
  if (!existsSync(sourcePath)) {
    return false;
  }

  copyFileSync(sourcePath, outputPath);
  return true;
};

const buildVariantAsset = (
  storyId: string,
  viewport: string,
  statusMap: Map<string, VariantAsset['status']> | undefined,
): VariantAsset => {
  const fileName = `${storyId}--${viewport}.png`;
  const expectedPath = resolve(EXPECTED_DIR, fileName);
  const actualPath = resolve(ACTUAL_DIR, fileName);
  const outputExpectedPath = resolve(OUTPUT_EXPECTED_DIR, fileName);
  const outputActualPath = resolve(OUTPUT_ACTUAL_DIR, fileName);

  const hasExpected = syncAssetIfExists(expectedPath, outputExpectedPath);
  const hasActual = syncAssetIfExists(actualPath, outputActualPath);

  return {
    viewport,
    expected: hasExpected ? publicPath(`visual-report/assets/expected/${fileName}`) : null,
    actual: hasActual ? publicPath(`visual-report/assets/actual/${fileName}`) : null,
    status: statusMap?.get(viewport) ?? 'unknown',
  };
};

const main = () => {
  if (!existsSync(STORYBOOK_INDEX_PATH)) {
    throw new Error(
      `Missing Storybook index at ${STORYBOOK_INDEX_PATH}. Run \"bun run build-storybook\" first.`,
    );
  }

  const index = JSON.parse(readFileSync(STORYBOOK_INDEX_PATH, 'utf-8')) as StorybookIndex;
  const storyEntries = Object.values(index.entries)
    .filter((entry) => entry.type !== 'docs')
    .sort((left, right) => left.id.localeCompare(right.id));

  const reportJson = existsSync(PLAYWRIGHT_JSON_PATH)
    ? (JSON.parse(readFileSync(PLAYWRIGHT_JSON_PATH, 'utf-8')) as PlaywrightJsonReport)
    : { suites: [] };

  const statuses = collectStatuses(reportJson);
  const viewports = [...collectViewportNames()].sort((left, right) => left.localeCompare(right));

  resetOutputAssets();

  const components: ComponentVariant[] = storyEntries.map((entry) => {
    const hierarchy = parseStoryTitle(entry.title);
    const statusMap = statuses.get(entry.id);

    return {
      id: entry.id,
      name: entry.name,
      title: entry.title,
      namespace: hierarchy.namespace,
      atomicLevel: hierarchy.atomicLevel,
      component: hierarchy.component,
      variants: viewports.map((viewport) => buildVariantAsset(entry.id, viewport, statusMap)),
    };
  });

  const namespaces = [...new Set(components.map((item) => item.namespace))].sort((a, b) =>
    a.localeCompare(b),
  );

  mkdirSync(OUTPUT_DIR, { recursive: true });

  writeFileSync(
    OUTPUT_JSON_PATH,
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        source: {
          storybookIndex: basename(STORYBOOK_INDEX_PATH),
          playwrightJson: existsSync(PLAYWRIGHT_JSON_PATH) ? basename(PLAYWRIGHT_JSON_PATH) : null,
          expectedDir: publicPath('visual-report/assets/expected'),
          actualDir: publicPath('visual-report/assets/actual'),
        },
        viewports,
        namespaces,
        components,
      },
      null,
      2,
    )}\n`,
    'utf-8',
  );

  console.log(`Visual report data generated at ${OUTPUT_JSON_PATH}`);
};

main();
