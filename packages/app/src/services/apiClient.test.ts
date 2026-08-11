import './testSetup';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  get,
  post,
  put,
  del,
  setApiToken,
  setYApiToken,
  clearYApiToken,
  clearApiToken,
  getApiToken,
  parseApiError,
  isPostLoginEndpointEnabled,
  getApiErrorHistory,
  subscribeToApiErrors,
  clearApiErrorHistory,
} from './apiClient';

// -------------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------------

function mockFetch(
  responseData: unknown,
  options: { status?: number; ok?: boolean; contentType?: string } = {},
) {
  const { status = 200, ok = true, contentType = 'application/json' } = options;
  return vi.fn(async () => ({
    ok,
    status,
    statusText: ok ? 'OK' : 'Error',
    headers: new Headers({ 'content-type': contentType }),
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
    clearYApiToken();
    clearApiErrorHistory();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    clearApiToken();
    clearYApiToken();
    clearApiErrorHistory();
    if (window.__RUNTIME_CONFIG__) {
      window.__RUNTIME_CONFIG__.USE_POST_LOGIN_ENDPOINT = false;
      window.__RUNTIME_CONFIG__.use_post_login_endpoint = false;
    }
  });

  describe('parseApiError()', () => {
    it('extracts a message from FastAPI validation details', () => {
      const parsed = parseApiError(
        '422: {"detail":[{"type":"value_error","loc":["body","email"],"msg":"value is not a valid email address","input":"dd"}]}',
      );

      expect(parsed).toMatchObject({
        status: 422,
        message: 'value is not a valid email address',
      });
    });

    it.each([
      ['401: {"detail":"Invalid credentials."}', 401, 'Invalid credentials.'],
      ['400: {"message":"Bad request"}', 400, 'Bad request'],
      ['503: Service unavailable', 503, 'Service unavailable'],
      ['Network error', null, 'Network error'],
    ])('normalizes common API error shapes', (raw, status, message) => {
      expect(parseApiError(raw)).toMatchObject({ status, message, raw });
    });
  });

  describe('login feature flag', () => {
    it.each([
      [true, true],
      [' TRUE ', true],
      ['false', false],
      [undefined, false],
    ])('normalizes runtime value %s', (value, expected) => {
      window.__RUNTIME_CONFIG__ = {
        ...window.__RUNTIME_CONFIG__,
        USE_POST_LOGIN_ENDPOINT: value,
      };

      expect(isPostLoginEndpointEnabled()).toBe(expected);
    });

    it('supports the lowercase runtime alias', () => {
      window.__RUNTIME_CONFIG__ = {
        ...window.__RUNTIME_CONFIG__,
        USE_POST_LOGIN_ENDPOINT: undefined,
        use_post_login_endpoint: 'true',
      };

      expect(isPostLoginEndpointEnabled()).toBe(true);
    });
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
    it('coalesces concurrent identical GETs but permits a later refresh', async () => {
      let resolveFirst!: (value: unknown) => void;
      globalThis.fetch = vi
        .fn()
        .mockImplementationOnce(
          () =>
            new Promise((resolve) => {
              resolveFirst = resolve;
            }),
        )
        .mockImplementationOnce(mockFetch({ id: 2, name: 'Later' }));

      const first = get<{ id: number }>('/pet/1');
      const duplicate = get<{ id: number }>('/pet/1');

      expect(globalThis.fetch).toHaveBeenCalledTimes(1);
      resolveFirst({
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({ id: 1 }),
      });
      await expect(Promise.all([first, duplicate])).resolves.toEqual([
        { data: { id: 1 }, error: null },
        { data: { id: 1 }, error: null },
      ]);

      await get('/pet/1');
      expect(globalThis.fetch).toHaveBeenCalledTimes(2);
    });

    it('does not coalesce requests with different query parameters', async () => {
      globalThis.fetch = mockFetch([]) as typeof globalThis.fetch;

      await Promise.all([
        get('/pet/findByStatus', { status: 'available' }),
        get('/pet/findByStatus', { status: 'sold' }),
      ]);

      expect(globalThis.fetch).toHaveBeenCalledTimes(2);
    });

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
      globalThis.fetch = vi.fn(async () => {
        throw new Error('Network error');
      }) as any;
      const result = await get('/pet/1');
      expect(result.data).toBeNull();
      expect(result.error).toBe('Network error');
    });

    it('includes query params in URL', async () => {
      let capturedUrl = '';
      globalThis.fetch = vi.fn(async (url: string) => {
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

    it('injects y-api-key header when token is set', async () => {
      setYApiToken('my-token');
      let capturedInit: RequestInit | undefined;
      globalThis.fetch = vi.fn(async (_url: string, init: RequestInit) => {
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
      expect(headers?.['y-api-key']).toBe('my-token');
      expect(headers?.['y-api-key']).toBeTruthy();
      expect(headers?.['Authorization']).toBe('Bearer my-token');
    });
  });

  // -----------------------------------------------------------------------
  // POST
  // -----------------------------------------------------------------------
  describe('post()', () => {
    it('does not coalesce concurrent writes', async () => {
      globalThis.fetch = mockFetch({ id: 1 }) as typeof globalThis.fetch;

      await Promise.all([post('/pet', { name: 'Buddy' }), post('/pet', { name: 'Buddy' })]);

      expect(globalThis.fetch).toHaveBeenCalledTimes(2);
    });

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

    it('records a sanitized diagnostic and notifies subscribers', async () => {
      setApiToken('api-secret');
      setYApiToken('session-secret');
      const listener = vi.fn();
      const unsubscribe = subscribeToApiErrors(listener);
      globalThis.fetch = vi.fn(async () => ({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        headers: new Headers({
          'content-type': 'application/json',
          'x-correlation-id': 'correlation-123',
        }),
        text: async () => '{"detail":"Invalid credentials."}',
      })) as typeof globalThis.fetch;

      await post('/user/login', { email: 'person@example.com', password: 'wrong' });

      const [record] = getApiErrorHistory();
      expect(record).toMatchObject({
        method: 'POST',
        path: '/user/login',
        status: 401,
        statusText: 'Unauthorized',
        correlationId: 'correlation-123',
        request: {
          body: '{"email":"person@example.com","password":"wrong"}',
          headers: {
            'x-api-key': '[REDACTED]',
            'y-api-key': '[REDACTED]',
            Authorization: '[REDACTED]',
          },
        },
        fullResponse: {
          body: '{"detail":"Invalid credentials."}',
        },
      });
      expect(record?.durationMs).toBeGreaterThanOrEqual(0);
      expect(listener).toHaveBeenLastCalledWith([record]);

      clearApiErrorHistory();
      expect(listener).toHaveBeenLastCalledWith([]);
      unsubscribe();
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
