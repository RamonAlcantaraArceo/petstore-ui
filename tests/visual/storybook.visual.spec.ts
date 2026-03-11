import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { expect, test } from '@playwright/test';

interface StorybookIndexEntry {
  id: string;
  title: string;
  name: string;
  type?: string;
}

interface StorybookIndex {
  entries: Record<string, StorybookIndexEntry>;
}

const storybookIndexPath = resolve(process.cwd(), 'storybook-static', 'index.json');

let parsedIndex: StorybookIndex | undefined;
let storybookIndexError: string | undefined;
if (existsSync(storybookIndexPath)) {
  try {
    const indexJson = readFileSync(storybookIndexPath, 'utf-8');
    parsedIndex = JSON.parse(indexJson) as StorybookIndex;
  } catch (err) {
    storybookIndexError = `Failed to read or parse Storybook index at ${storybookIndexPath}: ${err}`;
  }
} else {
  storybookIndexError = `Storybook index not found at ${storybookIndexPath}. Run \"bun run build-storybook\" before visual tests.`;
}

const VISUAL_REPORT_ARTIFACTS_DIR = resolve(
  process.cwd(),
  'test-results',
  'visual-report-artifacts',
);
const EXPECTED_DIR = resolve(VISUAL_REPORT_ARTIFACTS_DIR, 'expected');
const ACTUAL_DIR = resolve(VISUAL_REPORT_ARTIFACTS_DIR, 'actual');

const ensureVisualArtifactDirs = () => {
  mkdirSync(EXPECTED_DIR, { recursive: true });
  mkdirSync(ACTUAL_DIR, { recursive: true });
};

const sanitizeVariantName = (name: string) =>
  name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '');

const findExpectedSnapshotPath = (entryId: string, projectName: string): string | null => {
  const snapshotsDir = resolve(
    process.cwd(),
    'tests',
    'visual',
    'storybook.visual.spec.ts-snapshots',
  );
  if (!existsSync(snapshotsDir)) {
    return null;
  }

  const variants = [
    `${entryId}-${projectName}-${process.platform}.png`,
    `${entryId}-${projectName}.png`,
    `${entryId}.png`,
  ];

  for (const candidate of variants) {
    const candidatePath = resolve(snapshotsDir, candidate);
    if (existsSync(candidatePath)) {
      return candidatePath;
    }
  }

  return null;
};

// Support filtering by STORY_FILTER env variable (prefix match on id or title)
const STORY_FILTER = process.env.STORY_FILTER;

let allEntries: StorybookIndexEntry[] = [];
let storyEntries: StorybookIndexEntry[] = [];
if (storybookIndexError || !parsedIndex) {
  // If index is missing or failed to parse, skip the suite below
  test.skip(true, storybookIndexError || 'Storybook index not loaded.');
} else {
  allEntries = Object.values(parsedIndex.entries).sort((left, right) =>
    left.id.localeCompare(right.id),
  );
  // Exclude docs entries from visual regression
  storyEntries = (
    STORY_FILTER
      ? allEntries.filter(
          (entry) =>
            entry.id.startsWith(STORY_FILTER) ||
            entry.title.toLowerCase().startsWith(STORY_FILTER.toLowerCase()),
        )
      : allEntries
  ).filter((entry) => entry.type !== 'docs');
}

test.describe('Storybook visual regression', () => {
  test.beforeAll(() => {
    ensureVisualArtifactDirs();
  });

  test.beforeEach(async ({ page }) => {
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation: none !important;
          transition: none !important;
          caret-color: transparent !important;
        }
      `,
    });
  });

  for (const entry of storyEntries) {
    test(`${entry.id} (${entry.type ?? 'unknown'})`, async ({ page }, testInfo) => {
      const iframeUrl = `/storybook/iframe.html?id=${encodeURIComponent(entry.id)}&viewMode=${entry.type === 'docs' ? 'docs' : 'story'}`;

      await page.goto(iframeUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('networkidle');

      await page.waitForFunction(() => {
        const docsRoot = document.getElementById('docs-root');
        const storyRoot = document.getElementById('storybook-root');
        const docsReady = !!docsRoot && docsRoot.childElementCount > 0;
        const storyReady = !!storyRoot && storyRoot.childElementCount > 0;
        return docsReady || storyReady;
      });

      await page.evaluate(async () => {
        await document.fonts.ready;
      });

      const projectName = sanitizeVariantName(testInfo.project.name);
      const baseName = `${entry.id}--${projectName}`;

      const expectedSnapshotPath = findExpectedSnapshotPath(entry.id, projectName);
      if (expectedSnapshotPath) {
        copyFileSync(expectedSnapshotPath, resolve(EXPECTED_DIR, `${baseName}.png`));
      }

      const actualArtifactPath = resolve(ACTUAL_DIR, `${baseName}.png`);
      let assertionError: unknown = null;
      try {
        await expect(page).toHaveScreenshot(`${entry.id}.png`, {
          fullPage: false,
          scale: 'css',
          maxDiffPixels: 0,
          threshold: 0,
        });
      } catch (error) {
        assertionError = error;
      }

      // Always take the screenshot
      const screenshotBuffer = await page.screenshot({
        path: actualArtifactPath,
        fullPage: false,
        animations: 'disabled',
        caret: 'hide',
        scale: 'css',
      });

      if (assertionError) {
        throw assertionError;
      }

      // Attach actual screenshot to test report on success too
      await testInfo.attach('actual-screenshot', {
        body: screenshotBuffer,
        contentType: 'image/png',
      });
    });
  }
});
