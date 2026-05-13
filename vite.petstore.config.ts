import { defineConfig } from 'vite';

const API_PROXY_TARGET =
  process.env.API_PROXY_TARGET || 'https://petstore-api-dev.ramon-alcantara.work';

function generateConfigJs(): string {
  const apiBaseUrl = process.env.API_BASE_URL || '/api/v1';
  const apiKey = process.env.API_KEY;
  const version = process.env.VERSION || 'local';
  const gitSha = process.env.GIT_SHA || 'debug';
  // Use ISO8601 date for consistency if not set
  const buildDate = process.env.BUILD_DATE || new Date().toISOString();

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

export default defineConfig({
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: API_PROXY_TARGET,
        changeOrigin: true,
        secure: true,
      },
    },
  },
  plugins: [
    {
      name: 'petstore-dev-runtime-config',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url !== '/config.js') {
            next();
            return;
          }

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
          res.end(generateConfigJs());
        });
      },
      transformIndexHtml(html, context) {
        if (context.path !== '/petstore/' && context.path !== '/petstore/index.html') {
          return html;
        }

        return html.replace('src="dist/index.js"', 'src="/src/petstore/index.tsx"');
      },
    },
  ],
});
