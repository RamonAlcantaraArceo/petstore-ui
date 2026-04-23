/**
 * Local preview server for the full Petstore UI experience.
 *
 * Routes:
 *   /              → public/index.html  (homepage)
 *   /style.css     → public/style.css
 *   /app.js        → public/app.js
 *   /config.js     → dynamic runtime config (API_BASE_URL + API_KEY from .env)
 *   /api/*         → proxy to API_PROXY_TARGET
 *   /storybook/*   → storybook-static/* (real Storybook)
 *   /petstore/*    → petstore/*         (demo placeholder)
 *
 * Usage:  bun run preview
 *         API_PROXY_TARGET=http://localhost:8000 bun run preview
 */

import { existsSync, statSync, readFileSync } from 'node:fs';
import { join, extname } from 'node:path';

const PORT = Number(process.env.PORT) || 4000;
const ROOT = join(import.meta.dir, '..');

/**
 * Load environment variables from a file.
 * When overrideExisting is true, will override already-set values (for .env.local).
 */
function loadEnvFile(filePath: string, overrideExisting = false): void {
  if (!existsSync(filePath)) return;
  const content = readFileSync(filePath, 'utf-8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...valueParts] = trimmed.split('=');
    const value = valueParts.join('=');
    if (key && value && (overrideExisting || !process.env[key])) {
      process.env[key] = value;
    }
  }
}

// Load environment: .env first, then .env.local (overrides .env)
loadEnvFile(join(ROOT, '.env'), true);
// loadEnvFile(join(ROOT, '.env.local'), true);

const API_PROXY_TARGET =
  process.env.API_PROXY_TARGET || 'https://petstore-api-dev.ramon-alcantara.work';

/** Map file extensions to content types. */
const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json',
};

function contentType(filePath: string): string {
  return MIME[extname(filePath).toLowerCase()] ?? 'application/octet-stream';
}

/** Try to serve a file, returning null when not found or when path is a directory. */
function tryFile(filePath: string): Response | null {
  if (!existsSync(filePath)) return null;
  try {
    const stat = statSync(filePath);
    if (!stat.isFile()) return null;
  } catch {
    return null;
  }
  return new Response(Bun.file(filePath), {
    headers: { 'Content-Type': contentType(filePath) },
  });
}

/** Resolve a local path and serve it, with index.html fallback for directories. */
function serveFromDir(dir: string, urlPath: string): Response | null {
  // Exact file match
  const exact = join(dir, urlPath);
  const res = tryFile(exact);
  if (res) return res;

  // Directory → index.html
  const index = join(dir, urlPath, 'index.html');
  return tryFile(index);
}

/**
 * Generate runtime configuration for the frontend.
 * Reads API_BASE_URL and API_KEY from environment.
 */
function generateConfigJs(): string {
  const apiBaseUrl = process.env.API_BASE_URL || '/api/v1';
  const apiKey = process.env.API_KEY;
  const config: Record<string, string> = { API_BASE_URL: apiBaseUrl };
  if (apiKey) {
    config.API_KEY = apiKey;
  }
  return `window.__RUNTIME_CONFIG__ = ${JSON.stringify(config)};\n`;
}

Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    let pathname = decodeURIComponent(url.pathname);

    // --- /config.js → runtime configuration (allows dynamic API switching without rebuilding) ---
    if (pathname === '/config.js') {
      return new Response(generateConfigJs(), {
        headers: { 'Content-Type': 'application/javascript; charset=utf-8' },
      });
    }

    // --- /api/* → proxy to API_PROXY_TARGET ---
    if (pathname.startsWith('/api/')) {
      const target = `${API_PROXY_TARGET}${pathname}${url.search}`;
      const headers = new Headers(req.headers);
      const allowsBody = req.method !== 'GET' && req.method !== 'HEAD' && req.method !== 'OPTIONS';

      headers.delete('host');
      if (!allowsBody) {
        headers.delete('content-length');
      }

      const response = await fetch(target, {
        method: req.method,
        headers,
        ...(allowsBody ? { body: req.body } : {}),
      });

      // Remove Content-Encoding to prevent browser decompression issues
      const responseHeaders = new Headers(response.headers);
      responseHeaders.delete('content-encoding');

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      });
    }

    // --- /storybook/* → storybook-static/* ---
    if (pathname === '/storybook') {
      return Response.redirect('/storybook/', 301);
    }
    if (pathname.startsWith('/storybook/')) {
      const sub = pathname.slice('/storybook'.length); // includes leading /
      const res = serveFromDir(join(ROOT, 'storybook-static'), sub);
      if (res) return res;
    }

    // --- /petstore/* → petstore/* (with dist/ bundled assets) ---
    if (pathname === '/petstore') {
      return Response.redirect('/petstore/', 301);
    }
    if (pathname.startsWith('/petstore/')) {
      const sub = pathname.slice('/petstore'.length);
      // First try petstore/ root (index.html, etc.)
      const res = serveFromDir(join(ROOT, 'petstore'), sub);
      if (res) return res;
      // Then try petstore/dist/ for bundled JS
      const distRes = serveFromDir(join(ROOT, 'petstore', 'dist'), sub);
      if (distRes) return distRes;
      // SPA fallback: serve index.html for unmatched routes (hash routing)
      const spaFallback = tryFile(join(ROOT, 'petstore', 'index.html'));
      if (spaFallback) return spaFallback;
      // Fallback: serve shared assets from public/
      const publicFallback = serveFromDir(join(ROOT, 'public'), sub);
      if (publicFallback) return publicFallback;
    }

    // --- Everything else → public/ ---
    if (pathname === '/') pathname = '/index.html';
    const res = serveFromDir(join(ROOT, 'public'), pathname);
    if (res) return res;

    // 404
    return new Response('Not found', { status: 404 });
  },
});

const effectiveApiUrl = process.env.API_BASE_URL || '/api/v1';

console.log(`\n  Petstore UI preview server running at:\n`);
console.log(`    Homepage:        http://localhost:${PORT}/`);
console.log(`    Storybook:       http://localhost:${PORT}/storybook/`);
console.log(`    Petstore Demo:   http://localhost:${PORT}/petstore/`);
console.log(`    API proxy:       http://localhost:${PORT}/api/* → ${API_PROXY_TARGET}`);
console.log(`    Config:          http://localhost:${PORT}/config.js`);
console.log(`    API Base URL:    ${effectiveApiUrl}`);
console.log(`    Visual Report:   http://localhost:${PORT}/visual-report/`);
console.log();
