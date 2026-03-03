import { describe, it, expect, beforeEach, afterEach, mock } from 'bun:test';
import { get, post, put, del, setApiToken, clearApiToken, getApiToken } from './apiClient';

// -------------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------------

function mockFetch(
  responseData: unknown,
  options: { status?: number; ok?: boolean; contentType?: string } = {},
) {
  const { status = 200, ok = true, contentType = 'application/json' } = options;
  return mock(async () => ({
    ok,
    status,
    headers: { get: () => contentType },
    json: async () => responseData,
    text: async () =>
      typeof responseData === 'string' ? responseData : JSON.stringify(responseData),
  }));
}

// -------------------------------------------------------------------------
// Tests
// -------------------------------------------------------------------------

describe('apiClient', () => {
  let originalFetch: typeof globalThis.fetch;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
    clearApiToken();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    clearApiToken();
  });

  // -----------------------------------------------------------------------
  // Token management
  // -----------------------------------------------------------------------
  describe('token management', () => {
    it('getApiToken returns null by default', () => {
      expect(getApiToken()).toBeNull();
    });

    it('setApiToken stores token', () => {
      setApiToken('abc123');
      expect(getApiToken()).toBe('abc123');
    });

    it('clearApiToken removes token', () => {
      setApiToken('abc123');
      clearApiToken();
      expect(getApiToken()).toBeNull();
    });
  });

  // -----------------------------------------------------------------------
  // GET
  // -----------------------------------------------------------------------
  describe('get()', () => {
    it('returns data on successful response', async () => {
      globalThis.fetch = mockFetch({ id: 1, name: 'Buddy' }) as any;
      const result = await get<{ id: number; name: string }>('/pet/1');
      expect(result.error).toBeNull();
      expect(result.data).toEqual({ id: 1, name: 'Buddy' });
    });

    it('returns error on non-ok response', async () => {
      globalThis.fetch = mockFetch('Not Found', {
        ok: false,
        status: 404,
        contentType: 'text/plain',
      }) as any;
      const result = await get('/pet/999');
      expect(result.data).toBeNull();
      expect(result.error).toContain('404');
    });

    it('returns error on network failure', async () => {
      globalThis.fetch = mock(async () => {
        throw new Error('Network error');
      }) as any;
      const result = await get('/pet/1');
      expect(result.data).toBeNull();
      expect(result.error).toBe('Network error');
    });

    it('includes query params in URL', async () => {
      let capturedUrl = '';
      globalThis.fetch = mock(async (url: string) => {
        capturedUrl = url;
        return {
          ok: true,
          status: 200,
          headers: { get: () => 'application/json' },
          json: async () => [],
        };
      }) as any;
      await get('/pet/findByStatus', { status: 'available' });
      expect(capturedUrl).toContain('status=available');
    });

    it('injects api_key header when token is set', async () => {
      setApiToken('my-token');
      let capturedInit: RequestInit | undefined;
      globalThis.fetch = mock(async (_url: string, init: RequestInit) => {
        capturedInit = init;
        return {
          ok: true,
          status: 200,
          headers: { get: () => 'application/json' },
          json: async () => ({}),
        };
      }) as any;
      await get('/pet/1');
      const headers = capturedInit?.headers as Record<string, string>;
      expect(headers?.['api_key']).toBe('my-token');
    });
  });

  // -----------------------------------------------------------------------
  // POST
  // -----------------------------------------------------------------------
  describe('post()', () => {
    it('sends body and returns created data', async () => {
      const petData = { name: 'Whiskers', status: 'available' };
      globalThis.fetch = mockFetch({ id: 2, ...petData }) as any;
      const result = await post<{ id: number; name: string }>('/pet', petData);
      expect(result.error).toBeNull();
      expect(result.data?.id).toBe(2);
    });

    it('returns error on failure', async () => {
      globalThis.fetch = mockFetch('Bad Request', {
        ok: false,
        status: 400,
        contentType: 'text/plain',
      }) as any;
      const result = await post('/pet', {});
      expect(result.data).toBeNull();
      expect(result.error).toContain('400');
    });
  });

  // -----------------------------------------------------------------------
  // PUT
  // -----------------------------------------------------------------------
  describe('put()', () => {
    it('sends updated body and returns updated data', async () => {
      const updated = { id: 1, name: 'Buddy Updated', status: 'sold' };
      globalThis.fetch = mockFetch(updated) as any;
      const result = await put<typeof updated>('/pet', updated);
      expect(result.error).toBeNull();
      expect(result.data?.name).toBe('Buddy Updated');
    });
  });

  // -----------------------------------------------------------------------
  // DELETE
  // -----------------------------------------------------------------------
  describe('del()', () => {
    it('returns success response data', async () => {
      globalThis.fetch = mockFetch({ code: 200, type: 'unknown', message: '1' }) as any;
      const result = await del('/pet/1');
      expect(result.error).toBeNull();
      expect(result.data).toBeDefined();
    });

    it('returns error on non-ok response', async () => {
      globalThis.fetch = mockFetch('Not Found', {
        ok: false,
        status: 404,
        contentType: 'text/plain',
      }) as any;
      const result = await del('/pet/999');
      expect(result.data).toBeNull();
      expect(result.error).toContain('404');
    });
  });
});
