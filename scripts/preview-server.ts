/**
 * Local preview server for the custom visual report.
 *
 * Routes:
 *   /                 → redirect to /visual-report/
 *   /visual-report/*  → public/visual-report/*
 *
 * Usage: pnpm run preview
 */

import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 4000;
const ROOT = join(__dirname, '..');
const VISUAL_REPORT_DIR = join(ROOT, 'public', 'visual-report');

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

function tryFile(filePath: string, res: ServerResponse): boolean {
  if (!existsSync(filePath)) {
    return false;
  }

  try {
    const stat = statSync(filePath);
    if (!stat.isFile()) {
      return false;
    }
  } catch {
    return false;
  }

  const data = readFileSync(filePath);
  res.writeHead(200, { 'Content-Type': contentType(filePath) });
  res.end(data);
  return true;
}

function serveFromDir(dir: string, urlPath: string, res: ServerResponse): boolean {
  const exact = join(dir, urlPath);
  if (tryFile(exact, res)) {
    return true;
  }

  const index = join(dir, urlPath, 'index.html');
  return tryFile(index, res);
}

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  const url = new URL(req.url ?? '/', `http://localhost:${PORT}`);
  const pathname = decodeURIComponent(url.pathname);

  if (pathname === '/') {
    res.writeHead(302, { Location: '/visual-report/' });
    res.end();
    return;
  }

  if (pathname === '/visual-report') {
    res.writeHead(301, { Location: '/visual-report/' });
    res.end();
    return;
  }

  if (pathname.startsWith('/visual-report/')) {
    const subPath = pathname.slice('/visual-report'.length);
    if (serveFromDir(VISUAL_REPORT_DIR, subPath, res)) {
      return;
    }

    if (tryFile(join(VISUAL_REPORT_DIR, 'index.html'), res)) {
      return;
    }
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT);

console.log('\n  Visual report preview server running at:\n');
console.log(`    Visual Report: http://localhost:${PORT}/visual-report/`);
console.log();
