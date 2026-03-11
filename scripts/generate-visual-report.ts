import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
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
  diff?: string | null;
  status: 'passed' | 'failed' | 'skipped' | 'unknown' | 'flaky';
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
const TEST_RESULTS_DIR = resolve(ROOT, 'test-results');
const EXPECTED_DIR = resolve(ROOT, 'test-results', 'visual-report-artifacts', 'expected');
const ACTUAL_DIR = resolve(ROOT, 'test-results', 'visual-report-artifacts', 'actual');
const DIFF_DIR = resolve(ROOT, 'test-results', 'visual-report-artifacts', 'diff');
const OUTPUT_DIR = resolve(ROOT, 'public', 'visual-report');
const OUTPUT_ASSETS_DIR = resolve(OUTPUT_DIR, 'assets');
const OUTPUT_EXPECTED_DIR = resolve(OUTPUT_ASSETS_DIR, 'expected');
const OUTPUT_ACTUAL_DIR = resolve(OUTPUT_ASSETS_DIR, 'actual');
const OUTPUT_DIFF_DIR = resolve(OUTPUT_ASSETS_DIR, 'diff');
const OUTPUT_JSON_PATH = resolve(OUTPUT_DIR, 'data.json');
const VISUAL_APP_ENTRY = resolve(ROOT, 'src', 'visual-report', 'bootstrap.tsx');

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
  mkdirSync(OUTPUT_DIFF_DIR, { recursive: true });
};

const syncAssetIfExists = (sourcePath: string, outputPath: string) => {
  if (!existsSync(sourcePath)) {
    return false;
  }

  copyFileSync(sourcePath, outputPath);
  return true;
};

const syncFirstExistingAsset = (sourcePaths: string[], outputPath: string) => {
  for (const sourcePath of sourcePaths) {
    if (!existsSync(sourcePath)) {
      continue;
    }

    copyFileSync(sourcePath, outputPath);
    return true;
  }

  return false;
};

const walkFiles = (directory: string): string[] => {
  if (!existsSync(directory)) {
    return [];
  }

  const entries = readdirSync(directory);
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = resolve(directory, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      files.push(...walkFiles(fullPath));
      continue;
    }

    files.push(fullPath);
  }

  return files;
};

const parseViewportFromPath = (filePath: string): string | null => {
  const marker = '--';
  const normalizedPath = filePath.replace(/\\/g, '/');
  const parentDir = normalizedPath.split('/').slice(-2, -1)[0] ?? '';
  const markerIndex = parentDir.lastIndexOf(marker);
  if (markerIndex !== -1) {
    const viewportFromDir = parentDir.slice(markerIndex + marker.length).toLowerCase();
    if (viewportFromDir) {
      return viewportFromDir;
    }
  }

  const fileName = basename(filePath, '.png');
  const viewportMatch = fileName.match(/--([a-z0-9_-]+)-diff$/i);
  if (viewportMatch?.[1]) {
    return viewportMatch[1].toLowerCase();
  }

  return null;
};

const parseStoryIdFromDiffFileName = (filePath: string, viewport: string): string | null => {
  const fileName = basename(filePath, '.png');
  const viewportSuffix = `--${viewport}-diff`;
  if (fileName.endsWith(viewportSuffix)) {
    return fileName.slice(0, -viewportSuffix.length);
  }

  const simpleSuffix = '-diff';
  if (fileName.endsWith(simpleSuffix)) {
    return fileName.slice(0, -simpleSuffix.length);
  }

  return null;
};

const collectDiffArtifacts = (): Map<string, string> => {
  const byStoryViewport = new Map<string, string>();

  const addDiffAsset = (storyId: string, viewport: string, sourcePath: string) => {
    const key = `${storyId}::${viewport}`;
    if (!byStoryViewport.has(key)) {
      byStoryViewport.set(key, sourcePath);
    }
  };

  if (existsSync(DIFF_DIR)) {
    for (const fileName of readdirSync(DIFF_DIR)) {
      if (!fileName.endsWith('.png')) {
        continue;
      }

      const diffPath = resolve(DIFF_DIR, fileName);
      const viewportMatch = fileName.match(/--([a-z0-9_-]+)-diff\.png$/i);
      const viewport = viewportMatch?.[1]?.toLowerCase() ?? null;
      if (!viewport) {
        continue;
      }

      const storyId = fileName.slice(0, -`--${viewport}-diff.png`.length);
      if (!storyId) {
        continue;
      }

      addDiffAsset(storyId, viewport, diffPath);
    }
  }

  for (const filePath of walkFiles(TEST_RESULTS_DIR)) {
    if (!filePath.endsWith('-diff.png')) {
      continue;
    }

    const viewport = parseViewportFromPath(filePath);
    if (!viewport) {
      continue;
    }

    const storyId = parseStoryIdFromDiffFileName(filePath, viewport);
    if (!storyId) {
      continue;
    }

    addDiffAsset(storyId, viewport, filePath);
  }

  return byStoryViewport;
};

const buildVariantAsset = (
  storyId: string,
  viewport: string,
  statusMap: Map<string, VariantAsset['status']> | undefined,
  diffArtifacts: Map<string, string>,
): VariantAsset => {
  const fileName = `${storyId}--${viewport}.png`;
  const diffFileName = `${storyId}--${viewport}-diff.png`;
  const expectedPath = resolve(EXPECTED_DIR, fileName);
  const actualPath = resolve(ACTUAL_DIR, fileName);
  const discoveredDiffPath = diffArtifacts.get(`${storyId}::${viewport}`) ?? null;
  const diffCandidatePaths = [
    ...(discoveredDiffPath ? [discoveredDiffPath] : []),
    resolve(DIFF_DIR, diffFileName),
    resolve(DIFF_DIR, fileName),
    resolve(ACTUAL_DIR, diffFileName),
  ];
  const outputExpectedPath = resolve(OUTPUT_EXPECTED_DIR, fileName);
  const outputActualPath = resolve(OUTPUT_ACTUAL_DIR, fileName);
  const outputDiffPath = resolve(OUTPUT_DIFF_DIR, diffFileName);

  const hasExpected = syncAssetIfExists(expectedPath, outputExpectedPath);
  const hasActual = syncAssetIfExists(actualPath, outputActualPath);
  const hasDiff = syncFirstExistingAsset(diffCandidatePaths, outputDiffPath);

  return {
    viewport,
    expected: hasExpected ? publicPath(`visual-report/assets/expected/${fileName}`) : null,
    actual: hasActual ? publicPath(`visual-report/assets/actual/${fileName}`) : null,
    diff: hasDiff ? publicPath(`visual-report/assets/diff/${diffFileName}`) : null,
    status: statusMap?.get(viewport) ?? 'unknown',
  };
};

const buildVisualReportApp = async () => {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const result = await Bun.build({
    entrypoints: [VISUAL_APP_ENTRY],
    outfile: resolve(OUTPUT_DIR, 'app.js'),
    minify: true,
    sourcemap: 'none',
    target: 'browser',
    format: 'esm',
  });

  if (!result.success) {
    const details = result.logs.map((log) => log.message).join('\n');
    throw new Error(`Failed to bundle visual report app:\n${details}`);
  }
};

const main = async () => {
  await buildVisualReportApp();

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
  const diffArtifacts = collectDiffArtifacts();

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
      variants: viewports.map((viewport) =>
        buildVariantAsset(entry.id, viewport, statusMap, diffArtifacts),
      ),
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
          diffDir: publicPath('visual-report/assets/diff'),
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

await main();
