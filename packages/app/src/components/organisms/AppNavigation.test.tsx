import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { LocaleProvider } from '../../i18n';
import { AppNavigation } from './AppNavigation';

function renderWithLocale(ui: React.ReactElement) {
  return render(<LocaleProvider locale="en">{ui}</LocaleProvider>);
}

describe('AppNavigation', () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    delete (window as Window & { __RUNTIME_CONFIG__?: Record<string, string> }).__RUNTIME_CONFIG__;
    globalThis.fetch = originalFetch;
  });

  it('shows local fallback build metadata when runtime config is missing', async () => {
    globalThis.fetch = vi.fn(async () => ({ ok: false })) as any;

    const { container } = renderWithLocale(
      <AppNavigation
        activeApp="pets"
        onNavigate={() => {}}
        isLoggedIn={false}
        onLogin={() => {}}
        onLogout={() => {}}
      />,
    );

    const infoIcon = Array.from(container.querySelectorAll('span')).find(
      (node) => node.textContent?.trim() === 'i',
    );

    expect(infoIcon).toBeDefined();
    await waitFor(() => {
      expect(infoIcon?.getAttribute('title')).toBe(
        '{\n  "ui": {\n    "version": "local",\n    "build_date": "N/A",\n    "git_commit_sha": "N/A"\n  },\n  "api": {\n    "status": "unavailable",\n    "mode": "unknown",\n    "details": {\n      "version": "N/A",\n      "build_date": "N/A",\n      "git_commit_sha": "N/A"\n    }\n  }\n}',
      );
    });
  });

  it('shows build metadata from runtime config and API health endpoint', async () => {
    (window as Window & { __RUNTIME_CONFIG__?: Record<string, string> }).__RUNTIME_CONFIG__ = {
      VERSION: '1.2.3',
      GIT_SHA: 'abc1234',
      BUILD_DATE: '2026-05-12T18:00:00Z',
    };

    globalThis.fetch = vi.fn(async () => ({
      ok: true,
      json: async () => ({
        status: 'ok',
        mode: 'memory',
        details: {
          version: '0.1.1-rc0',
          build_date: '2026-05-13T20:05:42Z',
          git_commit_sha: '46a6318c0287cb1f673e9a4e1979333de1811401',
        },
      }),
    })) as any;

    const { container } = renderWithLocale(
      <AppNavigation
        activeApp="pets"
        onNavigate={() => {}}
        isLoggedIn={false}
        onLogin={() => {}}
        onLogout={() => {}}
      />,
    );

    const infoIcon = Array.from(container.querySelectorAll('span')).find(
      (node) => node.textContent?.trim() === 'i',
    );

    expect(infoIcon).toBeDefined();

    await waitFor(() => {
      expect(infoIcon?.getAttribute('title')).toBe(
        '{\n  "ui": {\n    "version": "1.2.3",\n    "build_date": "2026-05-12T18:00:00Z",\n    "git_commit_sha": "abc1234"\n  },\n  "api": {\n    "status": "ok",\n    "mode": "memory",\n    "details": {\n      "version": "0.1.1-rc0",\n      "build_date": "2026-05-13T20:05:42Z",\n      "git_commit_sha": "46a6318c0287cb1f673e9a4e1979333de1811401"\n    }\n  }\n}',
      );
    });
  });

  it('calls onLogout when sign out button is clicked for authenticated users', () => {
    const onLogout = vi.fn(() => {});

    const { container } = renderWithLocale(
      <AppNavigation
        activeApp="pets"
        onNavigate={() => {}}
        isLoggedIn
        username="ramon"
        onLogin={() => {}}
        onLogout={onLogout}
      />,
    );

    const signOutButton = Array.from(container.querySelectorAll('button')).find((button) =>
      button.textContent?.toLowerCase().includes('sign out'),
    );

    expect(signOutButton).toBeDefined();
    signOutButton?.click();
    expect(onLogout).toHaveBeenCalledTimes(1);
  });
});
