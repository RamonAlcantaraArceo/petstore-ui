import React from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { clearApiErrorHistory, getApiErrorHistory, post } from '../../services/apiClient';
import { PetstoreApp } from './PetstoreApp';

describe('PetstoreApp request error inspector', () => {
  const originalFetch = globalThis.fetch;
  const originalPlatformDescriptor = Object.getOwnPropertyDescriptor(navigator, 'platform');

  beforeEach(() => {
    clearApiErrorHistory();
    sessionStorage.clear();
    window.location.hash = '';
    Object.defineProperty(navigator, 'platform', {
      configurable: true,
      value: 'MacIntel',
    });
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    clearApiErrorHistory();
    sessionStorage.clear();
    if (originalPlatformDescriptor) {
      Object.defineProperty(navigator, 'platform', originalPlatformDescriptor);
    }
  });

  it('opens from the keyboard shortcut, formats JSON bodies, copies details, and clears history', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
    globalThis.fetch = vi.fn(async (input: string | URL | Request) => {
      const url = String(input);
      if (url.includes('/health')) {
        return Response.json({
          status: 'ok',
          mode: 'memory',
          details: { version: '1', build_date: 'today', git_commit_sha: 'abc' },
        });
      }

      return new Response('{"detail":"Invalid credentials."}', {
        status: 401,
        statusText: 'Unauthorized',
        headers: {
          'content-type': 'application/json',
          'x-correlation-id': 'correlation-123',
        },
      });
    });

    await post('/user/login', {
      email: 'person@example.com',
      password: 'wrong',
    });
    expect(getApiErrorHistory()).toHaveLength(1);

    render(<PetstoreApp locale="en" mockMode />);
    fireEvent.keyDown(window, { key: 'i', ctrlKey: true, shiftKey: true });

    const dialog = await screen.findByRole('dialog', { name: 'Request Error Inspector' });
    const responseJson = within(dialog).getByText((_, element) => element?.tagName === 'PRE');
    expect(responseJson.textContent).toContain('"body": {\n    "detail": "Invalid credentials."');
    expect(responseJson.textContent).not.toContain('\\"detail\\"');

    fireEvent.click(within(dialog).getByRole('tab', { name: 'Request' }));
    await waitFor(() => {
      expect(responseJson.textContent).toContain('"email": "person@example.com"');
    });

    fireEvent.click(within(dialog).getByRole('button', { name: /Copy error details/ }));
    await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
    expect(writeText.mock.calls[0]?.[0]).toContain(
      '"body": {\n    "detail": "Invalid credentials."\n  }',
    );

    fireEvent.click(within(dialog).getByRole('button', { name: /Clear and Close/ }));
    expect(screen.queryByRole('dialog', { name: 'Request Error Inspector' })).toBeNull();
    expect(getApiErrorHistory()).toEqual([]);
  });
});
