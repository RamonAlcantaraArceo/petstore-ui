import React from 'react';
import { createRoot } from 'react-dom/client';
import { LocaleProvider } from '../i18n';
import { VisualReportApp } from '../components/organisms/VisualReportApp';
import type { VisualReportData } from './types';
import { theme } from '../tokens/theme';

const mountId = 'visual-report-root';

const renderError = (message: string) => {
  const mount = document.getElementById(mountId);
  if (!mount) {
    return;
  }

  mount.innerHTML = `<div style="padding:16px;color:${theme.colors.semantic.errorLight};background:${theme.colors.secondary[900]};border:1px solid ${theme.colors.semantic.errorDark};border-radius:${theme.borderRadius.lg};font-family:${theme.typography.fontFamily.sans.join(',')};">${message}</div>`;
};

const bootstrap = async () => {
  const mount = document.getElementById(mountId);
  if (!mount) {
    return;
  }

  const response = await fetch('/visual-report/data.json', { cache: 'no-store' });
  if (!response.ok) {
    renderError('data.json not found. Run: bun run report:visual:build');
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
