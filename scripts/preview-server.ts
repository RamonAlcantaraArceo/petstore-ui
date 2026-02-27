/**
 * Local preview server for the full Petstore UI experience.
 *
 * Routes:
 *   /              → public/index.html  (homepage)
 *   /style.css     → public/style.css
 *   /app.js        → public/app.js
 *   /storybook/*   → storybook-static/* (real Storybook)
 *   /petstore/*    → petstore/*         (demo placeholder)
 *
 * Usage:  bun run preview
 */

import { existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const PORT = Number(process.env.PORT) || 4000;
const ROOT = join(import.meta.dir, '..');

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

Bun.serve({
  port: PORT,
  fetch(req) {
    const url = new URL(req.url);
    let pathname = decodeURIComponent(url.pathname);

    // --- /storybook/* → storybook-static/* ---
    if (pathname === '/storybook') {
      return Response.redirect('/storybook/', 301);
    }
    if (pathname.startsWith('/storybook/')) {
      const sub = pathname.slice('/storybook'.length); // includes leading /
      const res = serveFromDir(join(ROOT, 'storybook-static'), sub);
      if (res) return res;
    }

    // --- /petstore/* → petstore/* ---
    if (pathname === '/petstore') {
      return Response.redirect('/petstore/', 301);
    }
    if (pathname.startsWith('/petstore/')) {
      const sub = pathname.slice('/petstore'.length);
      const res = serveFromDir(join(ROOT, 'petstore'), sub);
      if (res) return res;
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

console.log(`\n  Petstore UI preview server running at:\n`);
console.log(`    Homepage:        http://localhost:${PORT}/`);
console.log(`    Storybook:       http://localhost:${PORT}/storybook/`);
console.log(`    Petstore Demo:   http://localhost:${PORT}/petstore/`);
console.log();
