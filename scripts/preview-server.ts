/**
 * Local preview server for the full Petstore UI experience.
 *
 * Routes:
 *   /              → redirect to /petstore/
 *   /config.js     → dynamic runtime config (API_BASE_URL + API_KEY + build metadata)
 *   /api/*         → proxy to API_PROXY_TARGET
 *   /storybook/*   → storybook-static/* (real Storybook)
 *   /petstore/*    → petstore/*         (Petstore SPA shell + bundle)
 *
 * Usage:  pnpm run preview
 *         API_PROXY_TARGET=http://localhost:8000 pnpm run preview
 */

import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { existsSync, statSync, readFileSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as dotenv from 'dotenv';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = Number(process.env.PORT) || 4000;
const ROOT = join(__dirname, '..');

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

// Load environment from `.env` only.
// `.env.local` loading is intentionally disabled for now so preview behavior stays
// consistent across local setups until local override support is explicitly defined.
// TODO: Re-enable `.env.local` once the expected precedence and developer workflow are documented.
loadEnvFile(join(ROOT, '.env'), true);
// loadEnvFile(join(ROOT, '.env.local'), true);

const API_PROXY_TARGET = process.env.API_PROXY_TARGET || 'http://localhost:8000';

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

/** Try to serve a file, returning false when not found or path is a directory. */
function tryFile(filePath: string, res: ServerResponse): boolean {
  if (!existsSync(filePath)) return false;
  try {
    const stat = statSync(filePath);
    if (!stat.isFile()) return false;
  } catch {
    return false;
  }
  const data = readFileSync(filePath);
  res.writeHead(200, { 'Content-Type': contentType(filePath) });
  res.end(data);
  return true;
}

/** Resolve a local path and serve it, with index.html fallback for directories. */
function serveFromDir(dir: string, urlPath: string, res: ServerResponse): boolean {
  const exact = join(dir, urlPath);
  if (tryFile(exact, res)) return true;
  const index = join(dir, urlPath, 'index.html');
  return tryFile(index, res);
}

/**
 * Generate runtime configuration for the frontend.
 * Reads API_BASE_URL, API_KEY, and build metadata from environment.
 */
function generateConfigJs(): string {
  const apiBaseUrl = process.env.API_BASE_URL || '/api/v1';
  const apiKey = process.env.API_KEY;
  const version = process.env.VERSION || 'local';
  const gitSha = process.env.GIT_SHA || 'N/A';
  const buildDate = process.env.BUILD_DATE || 'N/A';
  const config: Record<string, string> = {
    API_BASE_URL: apiBaseUrl,
    VERSION: version,
    GIT_SHA: gitSha,
    BUILD_DATE: buildDate,
  };
  if (apiKey) {
    config.API_KEY = apiKey;
  }
  return `window.__RUNTIME_CONFIG__ = ${JSON.stringify(config)};\n`;
}

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  const url = new URL(req.url ?? '/', `http://localhost:${PORT}`);
  let pathname = decodeURIComponent(url.pathname);

  // --- /config.js → runtime configuration ---
  if (pathname === '/config.js') {
    res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
    res.end(generateConfigJs());
    return;
  }

  // --- /api/* → proxy to API_PROXY_TARGET ---
  if (pathname.startsWith('/api/')) {
    const target = `${API_PROXY_TARGET}${pathname}${url.search}`;
    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (key.toLowerCase() === 'host') continue;
      if (value) headers.set(key, Array.isArray(value) ? value.join(', ') : value);
    }
    const allowsBody = req.method !== 'GET' && req.method !== 'HEAD' && req.method !== 'OPTIONS';
    if (!allowsBody) headers.delete('content-length');

    try {
      const body = allowsBody
        ? await new Promise<Buffer>((resolve) => {
            const chunks: Buffer[] = [];
            req.on('data', (chunk: Buffer) => chunks.push(chunk));
            req.on('end', () => resolve(Buffer.concat(chunks)));
          })
        : undefined;

      const upstream = await fetch(target, {
        method: req.method,
        headers,
        ...(body !== undefined ? { body } : {}),
      });

      const resHeaders: Record<string, string> = {};
      upstream.headers.forEach((value, key) => {
        if (key.toLowerCase() !== 'content-encoding') resHeaders[key] = value;
      });
      res.writeHead(upstream.status, resHeaders);
      const buf = Buffer.from(await upstream.arrayBuffer());
      res.end(buf);
    } catch (err) {
      res.writeHead(502);
      res.end(`Proxy error: ${String(err)}`);
    }
    return;
  }

  // --- /storybook/* → storybook-static/* ---
  if (pathname === '/storybook') {
    res.writeHead(301, { Location: '/storybook/' });
    res.end();
    return;
  }
  if (pathname.startsWith('/storybook/')) {
    const sub = pathname.slice('/storybook'.length);
    if (serveFromDir(join(ROOT, 'storybook-static'), sub, res)) return;
  }

  // --- /petstore/* → petstore/* ---
  if (pathname === '/petstore') {
    res.writeHead(301, { Location: '/petstore/' });
    res.end();
    return;
  }
  if (pathname.startsWith('/petstore/')) {
    const sub = pathname.slice('/petstore'.length);
    if (serveFromDir(join(ROOT, 'petstore'), sub, res)) return;
    if (tryFile(join(ROOT, 'petstore', 'index.html'), res)) return;
  }

  // --- Bare root redirects to /petstore/ ---
  if (pathname === '/') {
    res.writeHead(302, { Location: '/petstore/' });
    res.end();
    return;
  }

  // --- Everything else → public/ ---
  if (serveFromDir(join(ROOT, 'public'), pathname, res)) return;

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT);

const effectiveApiUrl = process.env.API_BASE_URL || '/api/v1';

console.log(`\n  Petstore UI preview server running at:\n`);
console.log(`    Root redirect:   http://localhost:${PORT}/ → /petstore/`);
console.log(`    Storybook:       http://localhost:${PORT}/storybook/`);
console.log(`    Petstore Demo:   http://localhost:${PORT}/petstore/`);
console.log(`    API proxy:       http://localhost:${PORT}/api/* → ${API_PROXY_TARGET}`);
console.log(`    Config:          http://localhost:${PORT}/config.js`);
console.log(`    API Base URL:    ${effectiveApiUrl}`);
console.log(`    Visual Report:   http://localhost:${PORT}/visual-report/`);
console.log();
