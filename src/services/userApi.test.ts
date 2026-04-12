import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { clearApiToken } from './apiClient';
import { createUser } from './userApi';

function mockFetch(
  responseData: unknown,
  options: { status?: number; ok?: boolean; contentType?: string } = {},
) {
  const { status = 200, ok = true, contentType = 'application/json' } = options;
  return vi.fn(async () => ({
    ok,
    status,
    headers: { get: () => contentType },
    json: async () => responseData,
    text: async () =>
      typeof responseData === 'string' ? responseData : JSON.stringify(responseData),
  }));
}

describe('userApi', () => {
  let originalFetch: typeof globalThis.fetch;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
    clearApiToken();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    clearApiToken();
  });

  describe('createUser()', () => {
    it('posts a new user payload to the /user endpoint', async () => {
      const requestBody = {
        username: 'new-user',
        firstName: 'New',
        lastName: 'User',
        email: 'new@example.com',
        password: 'secret123',
        phone: '555-0100',
        userStatus: 0,
      };

      let capturedUrl = '';
      let capturedInit: RequestInit | undefined;
      globalThis.fetch = vi.fn(async (url: string, init?: RequestInit) => {
        capturedUrl = url;
        capturedInit = init;
        return {
          ok: true,
          status: 200,
          headers: { get: () => 'application/json' },
          json: async () => ({ code: 200, type: 'unknown', message: 'created' }),
          text: async () => JSON.stringify({ code: 200, type: 'unknown', message: 'created' }),
        };
      }) as typeof globalThis.fetch;

      await createUser(requestBody);

      expect(capturedUrl).toContain('/user');
      expect(capturedInit?.method).toBe('POST');
      expect(capturedInit?.body).toBe(JSON.stringify(requestBody));
    });

    it('returns the API response on success', async () => {
      globalThis.fetch = mockFetch({ code: 200, type: 'unknown', message: 'created' }) as any;

      const result = await createUser({
        username: 'new-user',
        firstName: 'New',
        lastName: 'User',
        email: 'new@example.com',
        password: 'secret123',
        phone: '555-0100',
        userStatus: 0,
      });

      expect(result.error).toBeNull();
      expect(result.data).toEqual({ code: 200, type: 'unknown', message: 'created' });
    });

    it('returns an error when the API rejects the request', async () => {
      globalThis.fetch = mockFetch('Bad Request', {
        ok: false,
        status: 400,
        contentType: 'text/plain',
      }) as any;

      const result = await createUser({
        username: 'new-user',
        firstName: 'New',
        lastName: 'User',
        email: 'new@example.com',
        password: 'secret123',
        phone: '555-0100',
        userStatus: 0,
      });

      expect(result.data).toBeNull();
      expect(result.error).toContain('400');
    });
  });
});
