/**
 * Petstore API Client
 *
 * A thin `fetch` wrapper over the Petstore Swagger API v2.
 * Injects `api_key` header when an auth token is set.
 * All helpers return `ApiResult<T>` tuples for clean error handling.
 *
 * @example
 * ```ts
 * import { get, post } from './apiClient';
 * const result = await get<Pet>('/pet/1');
 * if (result.error) console.error(result.error);
 * else console.log(result.data);
 * ```
 */

import type { ApiResult } from './types';

// ---------------------------------------------------------------------------
// Environment configuration
// ---------------------------------------------------------------------------

// Allow TypeScript to see the optional runtime config object injected by the
// container entrypoint (docker/entrypoint.sh writes /config.js at startup, and
// scripts/preview-server.ts serves it dynamically in local dev mode).
declare global {
  interface Window {
    __RUNTIME_CONFIG__?: { API_BASE_URL?: string; API_KEY?: string };
  }
}

const DEFAULT_BASE_URL = 'https://petstore-api-qa.ramon-alcantara.work/api/v1';

function resolveBaseUrl(): string {
  // 1. Runtime-injected config (set by container entrypoint via /config.js).
  //    Highest priority — allows switching API targets without rebuilding the image.
  try {
    if (typeof window !== 'undefined' && window.__RUNTIME_CONFIG__?.API_BASE_URL) {
      return window.__RUNTIME_CONFIG__.API_BASE_URL;
    }
  } catch {
    /* non-browser / SSR */
  }

  // 2. Vite / Storybook build-time variable (.env.local)
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) {
      return import.meta.env.VITE_API_BASE_URL;
    }
  } catch {
    /* not in Vite context */
  }

  // 3. HTML meta tag: <meta name="api-base-url" content="https://..." />
  try {
    const meta =
      typeof document !== 'undefined' &&
      document.querySelector<HTMLMetaElement>('meta[name="api-base-url"]');
    if (meta && 'content' in meta && meta.content) {
      return meta.content;
    }
  } catch {
    /* SSR / non-browser */
  }

  // 4. Default (DEV environment)
  return DEFAULT_BASE_URL;
}

let _baseUrl: string = resolveBaseUrl();

/** Override the API base URL at runtime. */
export function setBaseUrl(url: string): void {
  _baseUrl = url;
}

/** Get the current API base URL. */
export function getBaseUrl(): string {
  return _baseUrl;
}

// ---------------------------------------------------------------------------
// Token management — AuthContext (Phase 1) will call these helpers.
// ---------------------------------------------------------------------------

function resolveDefaultToken(): string | null {
  try {
    if (typeof window !== 'undefined' && window.__RUNTIME_CONFIG__?.API_KEY) {
      return window.__RUNTIME_CONFIG__.API_KEY;
    }
  } catch {
    /* non-browser / SSR */
  }
  return null;
}

const _defaultToken: string | null = resolveDefaultToken();
let _token: string | null = _defaultToken;

/** Store the API session token (called by AuthContext on login). */
export function setApiToken(token: string): void {
  _token = token;
}

/** Clear the API session token (called by AuthContext on logout). */
export function clearApiToken(): void {
  // Revert to runtime default token so anonymous requests still work.
  _token = _defaultToken;
}

/** Retrieve the current API session token. */
export function getApiToken(): string | null {
  return _token;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function buildHeaders(extra: Record<string, string> = {}): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...extra,
  };

  if (_token) {
    headers['x-api-key'] = _token;
  }

  return headers;
}

function buildUrl(path: string, params?: Record<string, string>): string {
  const raw = `${_baseUrl}${path}`;
  const base = globalThis.location?.origin ?? 'http://localhost';
  const url = raw.startsWith('http') ? new URL(raw) : new URL(raw, base);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
  }
  return url.toString();
}

async function request<T>(
  method: string,
  path: string,
  options: {
    body?: unknown;
    params?: Record<string, string>;
    headers?: Record<string, string>;
  } = {},
): Promise<ApiResult<T>> {
  try {
    const url = buildUrl(path, options.params);
    const init: RequestInit = {
      method,
      headers: buildHeaders(options.headers),
    };

    if (options.body !== undefined) {
      init.body = JSON.stringify(options.body);
    }

    const response = await fetch(url, init);

    if (!response.ok) {
      const text = await response.text().catch(() => 'Unknown error');
      return { data: null, error: `${response.status}: ${text}` };
    }

    // Some endpoints return empty bodies (204, etc.)
    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
      // Return the raw text wrapped as T (useful for login which returns a
      // JSON‑shaped response with content-type text/plain).
      const text = await response.text();
      try {
        return { data: JSON.parse(text) as T, error: null };
      } catch {
        return { data: text as unknown as T, error: null };
      }
    }

    const data = (await response.json()) as T;
    return { data, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network error';
    console.error(`API ${method} ${path} failed:`, message);
    return { data: null, error: message };
  }
}

// ---------------------------------------------------------------------------
// Public helpers
// ---------------------------------------------------------------------------

/**
 * HTTP GET request.
 * @param path  — API path (e.g. `/pet/1`)
 * @param params — optional query‑string parameters
 */
export function get<T>(path: string, params?: Record<string, string>): Promise<ApiResult<T>> {
  return request<T>('GET', path, params ? { params } : {});
}

/**
 * HTTP POST request.
 * @param path — API path (e.g. `/pet`)
 * @param body — JSON‑serializable request body
 */
export function post<T>(path: string, body?: unknown): Promise<ApiResult<T>> {
  return request<T>('POST', path, { body });
}

/**
 * HTTP PUT request.
 * @param path — API path (e.g. `/pet`)
 * @param body — JSON‑serializable request body
 */
export function put<T>(path: string, body?: unknown): Promise<ApiResult<T>> {
  return request<T>('PUT', path, { body });
}

/**
 * HTTP DELETE request.
 * @param path — API path (e.g. `/pet/1`)
 */
export function del<T>(path: string): Promise<ApiResult<T>> {
  return request<T>('DELETE', path);
}
