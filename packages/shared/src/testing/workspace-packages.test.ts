import { describe, expect, it } from 'vitest';
import { Button } from '@petstore-ui/atoms';
import { toViewData } from '@petstore-ui/visual-reporter';
import { visualReportFixture } from '../../../visual-reporter/src/stories/visual-report/fixtures';
import { setRuntimeApiBaseUrl } from './runtime-config-utils';

describe('workspace package exports', () => {
  it('exports atoms package entrypoints', () => {
    expect(Button).toBeTypeOf('function');
  });

  it('exports app package entrypoints', async () => {
    setRuntimeApiBaseUrl('http://localhost:3000/api/v1');
    const appPackage = await import('@petstore-ui/app');
    expect(appPackage.PetstoreApp).toBeTypeOf('function');
  });

  it('exports visual reporter package utilities', () => {
    const view = toViewData(visualReportFixture);
    expect(view.componentGroups.length).toBeGreaterThan(0);
  });
});
