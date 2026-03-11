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

const DEFAULT_BASE_URL = 'https://petstore.swagger.io/v2';

function resolveBaseUrl(): string {
  // Vite / Storybook (.env.local)
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) {
      return import.meta.env.VITE_API_BASE_URL;
    }
  } catch {
    /* not in Vite context */
  }

  // HTML meta tag: <meta name="api-base-url" content="http://localhost:8000" />
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

let _token: string | null = null;

/** Store the API session token (called by AuthContext on login). */
export function setApiToken(token: string): void {
  _token = token;
}

/** Clear the API session token (called by AuthContext on logout). */
export function clearApiToken(): void {
  _token = null;
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
    'X-API-Key': 'dev-api-key',
    ...extra,
  };

  if (_token) {
    headers['api_key'] = _token;
  }

  return headers;
}

function buildUrl(path: string, params?: Record<string, string>): string {
  const raw = `${_baseUrl}${path}`;
  const url = raw.startsWith('http') ? new URL(raw) : new URL(raw, window.location.origin);
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
