import { defineConfig, loadEnv } from 'vite';

function generateConfigJs(env: Record<string, string | undefined>): string {
  const apiBaseUrl = env.API_BASE_URL || '/api/v1';
  const apiKey = env.API_KEY;
  const usePostLoginEndpoint =
    env.USE_POST_LOGIN_ENDPOINT || env.use_post_login_endpoint || 'false';
  const version = env.VERSION || 'local';
  const gitSha = env.GIT_SHA || 'debug';
  // Use ISO8601 date for consistency if not set
  const buildDate = env.BUILD_DATE || new Date().toISOString();

  const config: Record<string, string> = {
    API_BASE_URL: apiBaseUrl,
    USE_POST_LOGIN_ENDPOINT: usePostLoginEndpoint,
    VERSION: version,
    GIT_SHA: gitSha,
    BUILD_DATE: buildDate,
  };

  if (apiKey) {
    config.API_KEY = apiKey;
  }

  return `window.__RUNTIME_CONFIG__ = ${JSON.stringify(config)};\n`;
}

export default defineConfig(({ mode }) => {
  // Vite does not copy values loaded from .env into process.env while evaluating config.
  // Merge them explicitly, preserving real shell environment variables as overrides.
  const env: Record<string, string | undefined> = {
    ...loadEnv(mode, process.cwd(), ''),
    ...process.env,
  };
  const apiProxyTarget = env.API_PROXY_TARGET || 'http://localhost:8000';

  return {
    root: '.',
    server: {
      host: true,
      port: 5173,
      strictPort: true,
      // open: '/petstore/',

      proxy: {
        '/api': {
          target: apiProxyTarget,
          changeOrigin: true,
          secure: true,
        },
      },
    },
    build: {
      sourcemap: true,
    },
    css: {
      devSourcemap: true,
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
            res.end(generateConfigJs(env));
          });
        },
        transformIndexHtml(html, context) {
          if (context.path !== '/petstore/' && context.path !== '/petstore/index.html') {
            return html;
          }

          return html.replace('src="dist/index.js"', 'src="/packages/app/src/petstore/index.tsx"');
        },
      },
    ],
  };
});
