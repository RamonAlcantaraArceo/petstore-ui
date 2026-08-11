import './testSetup';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { clearApiToken } from './apiClient';
import { createUser, getUserByName, loginUser, updateUser } from './userApi';

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

describe('userApi', () => {
  let originalFetch: typeof globalThis.fetch;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
    clearApiToken();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    clearApiToken();
    if (window.__RUNTIME_CONFIG__) {
      window.__RUNTIME_CONFIG__.USE_POST_LOGIN_ENDPOINT = false;
      window.__RUNTIME_CONFIG__.use_post_login_endpoint = false;
    }
  });

  describe('loginUser()', () => {
    it('uses POST with an email/password body when the feature flag is enabled', async () => {
      window.__RUNTIME_CONFIG__ = {
        ...window.__RUNTIME_CONFIG__,
        USE_POST_LOGIN_ENDPOINT: 'TRUE',
        use_post_login_endpoint: undefined,
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
          json: async () => ({
            access_token: 'access-token',
            token_type: 'bearer',
            user: {
              id: 'user-id',
              email: 'ramalc.ms+99@outlook.com',
              username: 'ramalc.ms+99@outlook.com',
            },
          }),
        };
      }) as typeof globalThis.fetch;

      const result = await loginUser('ramalc.ms+99@outlook.com', 'authpass');

      expect(capturedUrl).toContain('/user/login');
      expect(capturedInit?.method).toBe('POST');
      expect(capturedInit?.body).toBe(
        JSON.stringify({
          email: 'ramalc.ms+99@outlook.com',
          password: 'authpass',
        }),
      );
      expect(result.data).toMatchObject({ access_token: 'access-token' });
    });

    it('keeps the legacy GET flow when the feature flag is disabled', async () => {
      window.__RUNTIME_CONFIG__ = {
        ...window.__RUNTIME_CONFIG__,
        USE_POST_LOGIN_ENDPOINT: false,
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
          json: async () => ({
            code: 200,
            type: 'unknown',
            message: 'logged in user session:legacy-token',
          }),
        };
      }) as typeof globalThis.fetch;

      await loginUser('legacy-user', 'legacy-pass');

      expect(capturedInit?.method).toBe('GET');
      expect(capturedInit?.body).toBeUndefined();
      expect(capturedUrl).toContain('username=legacy-user');
      expect(capturedUrl).toContain('password=legacy-pass');
    });
  });

  describe('createUser()', () => {
    it('converts camelCase field names to snake_case in the request body', async () => {
      const requestBody = {
        username: 'new-user',
        firstName: 'New',
        lastName: 'User',
        email: 'new@example.com',
        password: 'secret123',
        phone: '555-0100',
        userStatus: 0,
      };

      const expectedApiPayload = {
        username: 'new-user',
        first_name: 'New',
        last_name: 'User',
        email: 'new@example.com',
        password: 'secret123',
        phone: '555-0100',
        user_status: 0,
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
      expect(capturedInit?.body).toBe(JSON.stringify(expectedApiPayload));
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

    it('handles empty firstName and lastName correctly', async () => {
      const requestBody = {
        username: 'user-no-name',
        firstName: '',
        lastName: '',
        email: 'user@example.com',
        password: 'secret123',
        phone: '',
        userStatus: 0,
      };

      const expectedApiPayload = {
        username: 'user-no-name',
        first_name: '',
        last_name: '',
        email: 'user@example.com',
        password: 'secret123',
        phone: '',
        user_status: 0,
      };

      let capturedBody: string | undefined;
      globalThis.fetch = vi.fn(async (_url: string, init?: RequestInit) => {
        capturedBody = init?.body as string;
        return {
          ok: true,
          status: 200,
          headers: { get: () => 'application/json' },
          json: async () => ({ code: 200, type: 'unknown', message: 'created' }),
          text: async () => JSON.stringify({ code: 200, type: 'unknown', message: 'created' }),
        };
      }) as typeof globalThis.fetch;

      await createUser(requestBody);
      expect(capturedBody).toBe(JSON.stringify(expectedApiPayload));
    });
  });

  describe('updateUser()', () => {
    it('converts camelCase field names to snake_case in the request body', async () => {
      const userData = {
        id: 1,
        username: 'existing-user',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'newpassword123',
        phone: '555-1234',
        userStatus: 1,
      };

      const expectedApiPayload = {
        id: 1,
        username: 'existing-user',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        password: 'newpassword123',
        phone: '555-1234',
        user_status: 1,
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
          json: async () => ({ code: 200, type: 'unknown', message: 'updated' }),
          text: async () => JSON.stringify({ code: 200, type: 'unknown', message: 'updated' }),
        };
      }) as typeof globalThis.fetch;

      await updateUser('existing-user', userData);

      expect(capturedUrl).toContain('/user/existing-user');
      expect(capturedInit?.method).toBe('PUT');
      expect(capturedInit?.body).toBe(JSON.stringify(expectedApiPayload));
    });

    it('returns the API response on successful update', async () => {
      globalThis.fetch = mockFetch({ code: 200, type: 'unknown', message: 'updated' }) as any;

      const result = await updateUser('existing-user', {
        id: 1,
        username: 'existing-user',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        password: 'newpass',
        phone: '555-5678',
        userStatus: 1,
      });

      expect(result.error).toBeNull();
      expect(result.data).toEqual({ code: 200, type: 'unknown', message: 'updated' });
    });
  });

  describe('getUserByName()', () => {
    it('maps snake_case API response fields to camelCase frontend fields', async () => {
      globalThis.fetch = mockFetch({
        id: 2,
        username: 'foo',
        first_name: 'Foo',
        last_name: 'Bar',
        email: 'foo@example.com',
        password: 'secret',
        phone: '',
        user_status: 0,
      }) as any;

      const result = await getUserByName('foo');

      expect(result.error).toBeNull();
      expect(result.data).toEqual({
        id: 2,
        username: 'foo',
        firstName: 'Foo',
        lastName: 'Bar',
        email: 'foo@example.com',
        password: 'secret',
        phone: '',
        userStatus: 0,
      });
    });

    it('handles null snake_case fields returned by API', async () => {
      globalThis.fetch = mockFetch({
        id: 2,
        username: 'foo',
        first_name: null,
        last_name: null,
        email: 'foo@example.com',
        phone: '',
        user_status: null,
      }) as any;

      const result = await getUserByName('foo');

      expect(result.error).toBeNull();
      expect(result.data).toEqual({
        id: 2,
        username: 'foo',
        firstName: '',
        lastName: '',
        email: 'foo@example.com',
        password: '',
        phone: '',
        userStatus: 0,
      });
    });
  });
});
