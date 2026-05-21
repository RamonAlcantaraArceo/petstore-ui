import { describe, expect, it } from 'vitest';
import { Button } from '../../packages/atoms/src';
import { toViewData } from '../../packages/visual-reporter/src';
import { visualReportFixture } from '../stories/visual-report/fixtures';

describe('workspace package exports', () => {
  it('exports atoms package entrypoints', () => {
    expect(Button).toBeTypeOf('function');
  });

  it('exports app package entrypoints', async () => {
    const globalThisWithRuntimeConfig = globalThis as typeof globalThis & {
      window?: { __RUNTIME_CONFIG__?: { API_BASE_URL?: string } };
    };

    globalThisWithRuntimeConfig.window = globalThisWithRuntimeConfig.window ?? {};
    globalThisWithRuntimeConfig.window.__RUNTIME_CONFIG__ = {
      API_BASE_URL: 'http://localhost:3000/api/v1',
    };

    const appPackage = await import('../../packages/app/src');
    expect(appPackage.PetstoreApp).toBeTypeOf('function');
  });

  it('exports visual reporter package utilities', () => {
    const view = toViewData(visualReportFixture);
    expect(view.componentGroups.length).toBeGreaterThan(0);
  });
});
