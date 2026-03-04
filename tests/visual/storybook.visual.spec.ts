import { existsSync, readFileSync } from 'node:fs';
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

if (!existsSync(storybookIndexPath)) {
  throw new Error(
    `Storybook index not found at ${storybookIndexPath}. Run \"bun run build-storybook\" before visual tests.`,
  );
}

const indexJson = readFileSync(storybookIndexPath, 'utf-8');
const parsedIndex = JSON.parse(indexJson) as StorybookIndex;

// Support filtering by STORY_FILTER env variable (prefix match on id or title)
const STORY_FILTER = process.env.STORY_FILTER;
const allEntries = Object.values(parsedIndex.entries).sort((left, right) =>
  left.id.localeCompare(right.id),
);
// Exclude docs entries from visual regression
const storyEntries = (
  STORY_FILTER
    ? allEntries.filter(
        (entry) =>
          entry.id.startsWith(STORY_FILTER) ||
          entry.title.toLowerCase().startsWith(STORY_FILTER.toLowerCase()),
      )
    : allEntries
).filter((entry) => entry.type !== 'docs');

test.describe('Storybook visual regression', () => {
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
    test(`${entry.id} (${entry.type ?? 'unknown'})`, async ({ page }) => {
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

      await expect(page).toHaveScreenshot(`${entry.id}.png`, { fullPage: false });
    });
  }
});
