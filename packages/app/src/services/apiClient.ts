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

function resolveBaseUrl(): string {
  // 1. Runtime-injected config (set by container entrypoint via /config.js).
  //    Highest priority - allows switching API targets without rebuilding the image.
  try {
    if (typeof window !== 'undefined' && window.__RUNTIME_CONFIG__?.API_BASE_URL) {
      return window.__RUNTIME_CONFIG__.API_BASE_URL;
    }
  } catch {
    /* non-browser / SSR */
  }

  // 2. HTML meta tag: <meta name="api-base-url" content="https://..." />
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

  // 3. Safe fallback for test/storybook environments where no runtime config
  // is injected yet.
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return '/api/v1';
  }

  // 4. Browser fallback when no explicit runtime config is present.
  return '/api/v1';
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
let _yToken: string | null = null;

/** Store the API session token (called by AuthContext on login). */
export function setApiToken(token: string): void {
  _token = token;
}

export function setYApiToken(token: string): void {
  _yToken = token;
}

/** Retrieve the current API session token. */
export function getYApiToken(): string | null {
  return _yToken;
}

/** Clear the Y API session token. */
export function clearYApiToken(): void {
  _yToken = null;
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

  if (_yToken) {
    headers['y-api-key'] = _yToken;
    headers['Authorization'] = `Bearer ${_yToken}`;
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
  const requestStartedAt = Date.now();
  const requestTimestamp = new Date(requestStartedAt).toISOString();
  try {
    const url = buildUrl(path, options.params);
    const requestHeaders = buildHeaders(options.headers);
    const requestBody = options.body !== undefined ? JSON.stringify(options.body) : null;
    const init: RequestInit = {
      method,
      headers: requestHeaders,
    };

    if (requestBody !== null) {
      init.body = requestBody;
    }

    const response = await fetch(url, init);
    const responseTimestamp = new Date().toISOString();
    const durationMs = Date.now() - requestStartedAt;

    if (!response.ok) {
      const text = await response.text().catch(() => 'Unknown error');
      const responseHeaders = headersToObject(response.headers);
      const correlationId = extractCorrelationId(responseHeaders, text);
      const rawError = `${response.status}: ${text}`;

      recordApiError({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
        timestamp: requestTimestamp,
        responseTimestamp,
        durationMs,
        method,
        path,
        url,
        status: response.status,
        statusText: response.statusText || null,
        correlationId,
        rawError,
        request: {
          headers: sanitizeHeaders(requestHeaders),
          body: requestBody,
        },
        fullResponse: {
          status: response.status,
          statusText: response.statusText || null,
          headers: responseHeaders,
          body: text,
        },
      });

      return { data: null, error: rawError };
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
    const url = buildUrl(path, options.params);
    const responseTimestamp = new Date().toISOString();
    const durationMs = Date.now() - requestStartedAt;
    recordApiError({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      timestamp: requestTimestamp,
      responseTimestamp,
      durationMs,
      method,
      path,
      url,
      status: null,
      statusText: null,
      correlationId: null,
      rawError: message,
      request: {
        headers: sanitizeHeaders(buildHeaders(options.headers)),
        body: options.body !== undefined ? JSON.stringify(options.body) : null,
      },
      fullResponse: {
        status: null,
        statusText: null,
        headers: {},
        body: message,
      },
    });
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

// ---------------------------------------------------------------------------
// Error parsing utilities
// ---------------------------------------------------------------------------

export interface ParsedApiError {
  /** HTTP status code, or null for network errors */
  status: number | null;
  /** Human-readable message extracted from the error payload */
  message: string;
  /** Original raw error string */
  raw: string;
}

/**
 * Parse a raw API error string (e.g. `"401: {\"detail\":\"Invalid credentials.\"}"`)
 * into a structured `ParsedApiError` object.
 *
 * Recognises the `status: body` format produced by the `request()` helper and
 * attempts to extract a readable message from common JSON error shapes:
 * `{ detail }`, `{ message }`, `{ error }`.
 */
export function parseApiError(raw: string): ParsedApiError {
  // Try to match `<status>: <body>` format
  const statusMatch = /^(\d{3}):\s*(.*)$/s.exec(raw.trim());
  if (!statusMatch) {
    return { status: null, message: raw, raw };
  }

  const status = parseInt(statusMatch[1]!, 10);
  const body = statusMatch[2]!.trim();

  // Attempt to parse JSON body for a human-readable message
  try {
    const parsed = JSON.parse(body) as Record<string, unknown>;
    const msg =
      (typeof parsed.detail === 'string' ? parsed.detail : null) ??
      (typeof parsed.message === 'string' ? parsed.message : null) ??
      (typeof parsed.error === 'string' ? parsed.error : null);

    if (msg) {
      return { status, message: msg, raw };
    }
  } catch {
    // body was not JSON — fall through to use it as-is
  }

  return { status, message: body || raw, raw };
}

export interface ApiErrorRecord {
  id: string;
  timestamp: string;
  responseTimestamp: string;
  durationMs: number | null;
  method: string;
  path: string;
  url: string;
  status: number | null;
  statusText: string | null;
  correlationId: string | null;
  rawError: string;
  request: {
    headers: Record<string, string>;
    body: string | null;
  };
  fullResponse: {
    status: number | null;
    statusText: string | null;
    headers: Record<string, string>;
    body: string;
  };
}

type ApiErrorListener = (errors: ApiErrorRecord[]) => void;

const MAX_ERROR_HISTORY = 100;
const apiErrorHistory: ApiErrorRecord[] = [];
const apiErrorListeners = new Set<ApiErrorListener>();

function notifyApiErrorListeners(): void {
  const snapshot = [...apiErrorHistory];
  apiErrorListeners.forEach((listener) => listener(snapshot));
}

function headersToObject(headers: Headers): Record<string, string> {
  const result: Record<string, string> = {};
  headers.forEach((value, key) => {
    result[key.toLowerCase()] = value;
  });
  return result;
}

function sanitizeHeaderValue(key: string, value: string): string {
  const lowerKey = key.toLowerCase();
  if (
    lowerKey === 'authorization' ||
    lowerKey === 'x-api-key' ||
    lowerKey === 'y-api-key' ||
    lowerKey.includes('token')
  ) {
    return '[REDACTED]';
  }
  return value;
}

function sanitizeHeaders(headers: Record<string, string>): Record<string, string> {
  const sanitized: Record<string, string> = {};
  for (const [key, value] of Object.entries(headers)) {
    sanitized[key] = sanitizeHeaderValue(key, value);
  }
  return sanitized;
}

function extractCorrelationId(
  headers: Record<string, string>,
  responseText: string,
): string | null {
  const headerCorrelationId =
    headers['x-correlation-id'] ??
    headers['correlation-id'] ??
    headers['x-request-id'] ??
    headers['request-id'] ??
    headers['trace-id'];
  if (headerCorrelationId) {
    return headerCorrelationId;
  }

  try {
    const body = JSON.parse(responseText) as Record<string, unknown>;
    const bodyCorrelationId =
      (typeof body.correlationId === 'string' ? body.correlationId : null) ??
      (typeof body.correlation_id === 'string' ? body.correlation_id : null) ??
      (typeof body.requestId === 'string' ? body.requestId : null) ??
      (typeof body.request_id === 'string' ? body.request_id : null) ??
      (typeof body.traceId === 'string' ? body.traceId : null) ??
      (typeof body.trace_id === 'string' ? body.trace_id : null);
    return bodyCorrelationId;
  } catch {
    return null;
  }
}

function recordApiError(entry: ApiErrorRecord): void {
  apiErrorHistory.unshift(entry);
  if (apiErrorHistory.length > MAX_ERROR_HISTORY) {
    apiErrorHistory.length = MAX_ERROR_HISTORY;
  }
  notifyApiErrorListeners();
}

export function getApiErrorHistory(): ApiErrorRecord[] {
  return [...apiErrorHistory];
}

export function subscribeToApiErrors(listener: ApiErrorListener): () => void {
  apiErrorListeners.add(listener);
  listener([...apiErrorHistory]);
  return () => {
    apiErrorListeners.delete(listener);
  };
}

export function clearApiErrorHistory(): void {
  apiErrorHistory.length = 0;
  notifyApiErrorListeners();
}
