import React from 'react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { LocaleProvider } from '@petstore-ui/atoms';
import { AppNavigation } from './AppNavigation';
import { clearApiErrorHistory } from '../../services/apiClient';

function renderWithLocale(ui: React.ReactElement) {
  return render(<LocaleProvider locale="en">{ui}</LocaleProvider>);
}

describe('AppNavigation', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    globalThis.fetch = vi.fn(
      async () =>
        new Response('Unavailable', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: { 'content-type': 'text/plain' },
        }),
    );
  });

  afterEach(() => {
    delete (window as Window & { __RUNTIME_CONFIG__?: Record<string, string> }).__RUNTIME_CONFIG__;
    globalThis.fetch = originalFetch;
    clearApiErrorHistory();
  });

  it('shows local fallback build metadata in the build information modal', async () => {
    globalThis.fetch = vi.fn(
      async () =>
        new Response('Unavailable', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: { 'content-type': 'text/plain' },
        }),
    );

    renderWithLocale(
      <AppNavigation
        activeApp="pets"
        onNavigate={() => {}}
        isLoggedIn={false}
        onLogin={() => {}}
        onLogout={() => {}}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Build information' }));

    expect(screen.getByText('UI')).toBeDefined();
    expect(screen.getByText('local')).toBeDefined();
    expect(screen.getByText('unavailable')).toBeDefined();
    await waitFor(() => expect(globalThis.fetch).toHaveBeenCalledTimes(1));
  });

  it('shows build metadata from runtime config and API health endpoint', async () => {
    (window as Window & { __RUNTIME_CONFIG__?: Record<string, string> }).__RUNTIME_CONFIG__ = {
      VERSION: '1.2.3',
      GIT_SHA: 'abc1234',
      BUILD_DATE: '2026-05-12T18:00:00Z',
    };

    globalThis.fetch = vi.fn(async () =>
      Response.json({
        status: 'ok',
        mode: 'memory',
        details: {
          version: '0.1.1-rc0',
          build_date: '2026-05-13T20:05:42Z',
          git_commit_sha: '46a6318c0287cb1f673e9a4e1979333de1811401',
        },
      }),
    );

    renderWithLocale(
      <AppNavigation
        activeApp="pets"
        onNavigate={() => {}}
        isLoggedIn={false}
        onLogin={() => {}}
        onLogout={() => {}}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Build information' }));
    await waitFor(() => {
      expect(screen.getByText('1.2.3')).toBeDefined();
      expect(screen.getByText('memory')).toBeDefined();
      expect(screen.getByText('0.1.1-rc0')).toBeDefined();
    });
  });

  it('opens, copies, and closes build information', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
    globalThis.fetch = vi.fn(
      async () =>
        new Response('Unavailable', {
          status: 503,
          headers: { 'content-type': 'text/plain' },
        }),
    );

    renderWithLocale(
      <AppNavigation
        activeApp="pets"
        onNavigate={() => {}}
        isLoggedIn={false}
        onLogin={() => {}}
        onLogout={() => {}}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Build information' }));
    fireEvent.click(screen.getByRole('button', { name: /Copy JSON/ }));
    await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(globalThis.fetch).toHaveBeenCalledTimes(1));
    expect(writeText.mock.calls[0]?.[0]).toContain('"status": "unavailable"');

    fireEvent.click(screen.getByRole('button', { name: /Close/ }));
    expect(screen.queryByText('UI')).toBeNull();
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
