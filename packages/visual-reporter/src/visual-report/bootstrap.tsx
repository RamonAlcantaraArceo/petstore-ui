import React from 'react';
import { createRoot } from 'react-dom/client';
import { LocaleProvider } from '@petstore-ui/atoms';
import { VisualReportApp } from '../components/organisms/VisualReportApp';
import type { VisualReportData } from './types';

const mountId = 'visual-report-root';

const renderError = (message: string) => {
  const mount = document.getElementById(mountId);
  if (!mount) {
    return;
  }

  // Use React to render the error box
  const root = createRoot(mount);
  root.render(
    <div
      style={{
        padding: '16px',
        color: 'var(--color-danger-soft)',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-danger)',
        borderRadius: '12px',
        fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
      }}
      role="alert"
      aria-live="assertive"
    >
      {message}
    </div>,
  );
};

const bootstrap = async () => {
  const mount = document.getElementById(mountId);
  if (!mount) {
    return;
  }

  const response = await fetch('/visual-report/data.json', { cache: 'no-store' });
  if (!response.ok) {
    renderError('data.json not found. Run: pnpm run report:visual:build');
    return;
  }

  const data = (await response.json()) as VisualReportData;
  const root = createRoot(mount);
  root.render(
    <React.StrictMode>
      <LocaleProvider locale="en">
        <VisualReportApp data={data} />
      </LocaleProvider>
    </React.StrictMode>,
  );
};

bootstrap().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  renderError(`Failed to load report data: ${message}`);
});
