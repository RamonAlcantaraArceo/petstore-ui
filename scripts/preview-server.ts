/**
 * Local preview server for the full Petstore UI experience.
 *
 * Routes:
 *   /              → public/index.html  (homepage)
 *   /style.css     → public/style.css
 *   /app.js        → public/app.js
 *   /config.js     → dynamic runtime config (API_BASE_URL + API_KEY + build metadata)
 *   /api/*         → proxy to API_PROXY_TARGET
 *   /storybook/*   → storybook-static/* (real Storybook)
 *   /petstore/*    → petstore/*         (demo placeholder)
 *
 * Usage:  pnpm run preview
 *         API_PROXY_TARGET=http://localhost:8000 pnpm run preview
 */

import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs';
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { extname, join } from 'node:path';
import { Readable } from 'node:stream';
import { fileURLToPath } from 'node:url';

const PORT = Number(process.env.PORT) || 4000;
const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');

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

loadEnvFile(join(ROOT, '.env'), true);

const API_PROXY_TARGET =
  process.env.API_PROXY_TARGET || 'https://petstore-api-dev.ramon-alcantara.work';

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

function serveFile(filePath: string, res: ServerResponse): boolean {
  if (!existsSync(filePath)) return false;
  try {
    const stat = statSync(filePath);
    if (!stat.isFile()) return false;
  } catch {
    return false;
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', contentType(filePath));
  createReadStream(filePath).pipe(res);
  return true;
}

function serveFromDir(dir: string, urlPath: string, res: ServerResponse): boolean {
  if (serveFile(join(dir, urlPath), res)) {
    return true;
  }
  return serveFile(join(dir, urlPath, 'index.html'), res);
}

function redirect(res: ServerResponse, location: string): void {
  res.statusCode = 301;
  res.setHeader('Location', location);
  res.end();
}

async function proxyApiRequest(
  req: IncomingMessage,
  res: ServerResponse,
  pathname: string,
  search: string,
): Promise<void> {
  const target = `${API_PROXY_TARGET}${pathname}${search}`;
  const headers = new Headers();

  Object.entries(req.headers).forEach(([key, value]) => {
    if (!value || key === 'host') return;
    if (Array.isArray(value)) {
      value.forEach((entry) => headers.append(key, entry));
      return;
    }
    headers.set(key, value);
  });

  const method = req.method ?? 'GET';
  const allowsBody = method !== 'GET' && method !== 'HEAD' && method !== 'OPTIONS';
  if (!allowsBody) {
    headers.delete('content-length');
  }

  const response = await fetch(target, {
    method,
    headers,
    ...(allowsBody ? { body: req, duplex: 'half' } : {}),
  });

  res.statusCode = response.status;
  response.headers.forEach((value, key) => {
    if (key === 'content-encoding') return;
    res.setHeader(key, value);
  });

  if (!response.body) {
    res.end();
    return;
  }

  Readable.fromWeb(response.body as ReadableStream).pipe(res);
}

const server = createServer(async (req, res) => {
  const requestUrl = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);
  let pathname = decodeURIComponent(requestUrl.pathname);

  if (pathname === '/config.js') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    res.end(generateConfigJs());
    return;
  }

  if (pathname.startsWith('/api/')) {
    await proxyApiRequest(req, res, pathname, requestUrl.search);
    return;
  }

  if (pathname === '/storybook') {
    redirect(res, '/storybook/');
    return;
  }

  if (pathname.startsWith('/storybook/')) {
    const sub = pathname.slice('/storybook'.length);
    if (serveFromDir(join(ROOT, 'storybook-static'), sub, res)) {
      return;
    }
  }

  if (pathname === '/petstore') {
    redirect(res, '/petstore/');
    return;
  }

  if (pathname.startsWith('/petstore/')) {
    const sub = pathname.slice('/petstore'.length);
    if (serveFromDir(join(ROOT, 'petstore'), sub, res)) {
      return;
    }
    if (serveFromDir(join(ROOT, 'petstore', 'dist'), sub, res)) {
      return;
    }
    if (serveFile(join(ROOT, 'petstore', 'index.html'), res)) {
      return;
    }
    if (serveFromDir(join(ROOT, 'public'), sub, res)) {
      return;
    }
  }

  if (pathname === '/') pathname = '/index.html';
  if (serveFromDir(join(ROOT, 'public'), pathname, res)) {
    return;
  }

  res.statusCode = 404;
  res.end('Not found');
});

server.listen(PORT, () => {
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
});
