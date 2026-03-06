import { cleanup, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const MOUNT_ID = 'visual-report-root';

const loadBootstrapModule = async () => {
  await import('./bootstrap');
};

describe('visual-report/bootstrap renderError behavior', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    document.body.innerHTML = `<div id="${MOUNT_ID}"></div>`;
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('renders an alert with the missing data.json message when response is not ok', async () => {
    fetchMock.mockResolvedValueOnce({ ok: false });

    await loadBootstrapModule();

    const alert = await screen.findByRole('alert');
    expect(alert.textContent).toContain('data.json not found. Run: bun run report:visual:build');
    expect(fetchMock).toHaveBeenCalledWith('/visual-report/data.json', { cache: 'no-store' });
  });

  it('renders an alert with prefixed message when fetch throws', async () => {
    fetchMock.mockRejectedValueOnce(new Error('network offline'));

    await loadBootstrapModule();

    const alert = await screen.findByRole('alert');
    expect(alert.textContent).toContain('Failed to load report data: network offline');
  });

  it('does not render an alert if mount is unavailable when renderError runs', async () => {
    const mount = document.getElementById(MOUNT_ID);
    expect(mount).not.toBeNull();

    const originalGetElementById = document.getElementById.bind(document);
    const getElementByIdSpy = vi
      .spyOn(document, 'getElementById')
      .mockImplementation((id: string) => originalGetElementById(id));

    getElementByIdSpy.mockImplementationOnce(() => mount);
    getElementByIdSpy.mockImplementationOnce(() => null);

    fetchMock.mockRejectedValueOnce(new Error('boom'));

    await loadBootstrapModule();

    await waitFor(() => {
      expect(screen.queryByRole('alert')).toBeNull();
    });
  });

  it('renders untrusted error content as text (no HTML injection)', async () => {
    fetchMock.mockRejectedValueOnce(new Error('<img src=x onerror=alert(1)>'));

    await loadBootstrapModule();

    const alert = await screen.findByRole('alert');
    expect(alert.textContent).toContain('Failed to load report data: <img src=x onerror=alert(1)>');
    expect(alert.querySelector('img')).toBeNull();
  });
});
