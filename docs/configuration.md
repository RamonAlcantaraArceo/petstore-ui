# Configuration

This document describes how to configure petstore-ui for different environments (local development, Docker, Fly.io, CI/CD).

## Environment Variables

All configuration is driven by environment variables. These can be set via:

1. `.env` file (local development)
2. Docker environment (`-e` flag or `.env` file)
3. GitHub Secrets (CI/CD)
4. Fly.io secrets (`flyctl secrets set`)

### Required Variables

| Variable       | Default | Purpose                                     | Example                                   |
| -------------- | ------- | ------------------------------------------- | ----------------------------------------- |
| `API_BASE_URL` | (none)  | Frontend API endpoint (usually same-origin) | `/api/v1` or `https://api.example.com/v1` |

### Optional Variables

| Variable           | Default | Purpose                                                                        | Example                                         |
| ------------------ | ------- | ------------------------------------------------------------------------------ | ----------------------------------------------- |
| `API_PROXY_TARGET` | (none)  | Upstream backend for nginx proxy (Docker only)                                 | `https://petstore-api-dev.ramon-alcantara.work` |
| `API_KEY`          | (none)  | Authentication header for backend (injected by server, not exposed to browser) | `Bearer secret-token-here`                      |
| `VERSION`          | `local` | Build version for UI display and diagnostics                                   | `1.2.3` or `sha-a1b2c3d`                        |
| `GIT_SHA`          | `N/A`   | Git commit hash for traceability                                               | Auto-set by CI                                  |
| `BUILD_DATE`       | Current | ISO 8601 timestamp of build                                                    | Auto-set by CI                                  |

## Configuration Resolution

The application resolves API configuration in this order:

### 1. Runtime Config (`/config.js` from Docker)

When running in Docker, the entrypoint generates `/config.js`:

```bash
# docker/entrypoint.sh generates:
window.__RUNTIME_CONFIG__ = {
  API_BASE_URL: "/api/v1",
  API_KEY: "<from environment>",
  VERSION: "1.0.0",
  GIT_SHA: "abc1234",
  BUILD_DATE: "2026-05-28T10:00:00Z"
};
```

The Storybook preview loads this file in `.storybook/preview-head.html`:

```html
<script src="/config.js"></script>
```

### 2. HTML Meta Tag

Fallback: configuration via HTML meta tag in `public/index.html`:

```html
<meta name="api-base-url" content="https://petstore-api-dev.ramon-alcantara.work/api/v1" />
```

### 3. Error Handling

If neither source provides `API_BASE_URL`:

- Application logs an error to console
- API calls fail with clear error message
- User sees appropriate error UI

**Code:** `packages/app/src/services/apiClient.ts`

## Local Development Setup

### Option 1: Storybook Only (No API)

Start Storybook without API requirements:

```bash
pnpm run storybook
```

This is fine for component development since Storybook uses mock service workers (MSW) for API calls.

**Location:** http://localhost:6006

### Option 2: Dev Server + API

Start the Petstore app with API integration:

```bash
# Set API endpoint
export API_BASE_URL=https://petstore-api-dev.ramon-alcantara.work/api/v1

# Start dev server
pnpm run dev
```

**Location:** http://localhost:5173/petstore/

**Requirements:**

- Backend API must be running or accessible at `API_BASE_URL`
- CORS must be configured on backend (or use proxy)

### Option 3: Dev Server + Local .env File

Create `.env` in project root:

```bash
# .env
API_BASE_URL=https://petstore-api-dev.ramon-alcantara.work/api/v1
```

Then:

```bash
pnpm run dev
```

### Option 4: Via Docker Compose

Use Docker Compose for production-like setup:

```bash
# .env (or export these)
export API_BASE_URL=/api/v1
export API_PROXY_TARGET=https://petstore-api-dev.ramon-alcantara.work

# Build and start
docker compose up --build
```

**Location:** http://localhost:8080

**What happens:**

1. Docker builds the application
2. `docker/entrypoint.sh` runs, reads env vars, generates `/config.js`
3. Nginx serves Storybook with proxy rules
4. All requests to `/api/v1/*` are proxied to `$API_PROXY_TARGET`
5. Browser loads `/config.js` with runtime configuration

See [Deployment](./deployment.md) for complete Docker setup.

## CI/CD Configuration

### GitHub Actions Secrets

Set secrets in **Settings → Secrets and variables → Actions**:

| Secret          | Value                 | Used In                     |
| --------------- | --------------------- | --------------------------- |
| `CODECOV_TOKEN` | Codecov project token | ci.yml (coverage upload)    |
| `FLY_API_TOKEN` | Fly.io API token      | deploy-fly-\*.yml workflows |

### Environment-Specific Secrets

Set secrets in **Settings → Environments**:

**dev** environment:

- `API_KEY` — Authorization token for backend

**staging** environment:

- `API_KEY` — Authorization token for backend

**production** environment:

- `API_KEY` — Authorization token for backend

### Workflow Configuration

GitHub Actions workflows read from:

- `.github/workflows/*.yml` — Workflow definitions
- `.fly/dev/fly.toml` — Fly.io app configuration
- `package.json` — Build and test scripts

**Example workflow step:**

```yaml
- name: Deploy to Fly.io
  env:
    FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
  run: flyctl deploy --config .fly/dev/fly.toml
```

## Docker Configuration

### Build Arguments

The Dockerfile accepts build arguments:

```bash
docker build \
  --build-arg VERSION=1.0.0 \
  --build-arg GIT_SHA=abc1234 \
  --build-arg BUILD_DATE="2026-05-28T10:00:00Z" \
  -t petstore-ui .
```

These are embedded into the image and available in `/config.js` at runtime.

### Runtime Environment Variables

Pass environment variables at container startup:

```bash
docker run \
  -e API_BASE_URL=/api/v1 \
  -e API_PROXY_TARGET=https://petstore-api-dev.ramon-alcantara.work \
  -e API_KEY=your-secret-token \
  -p 8080:80 \
  petstore-ui
```

### docker-compose.yml

Full example with environment variables:

```yaml
version: '3.8'
services:
  petstore-ui:
    build: .
    ports:
      - '8080:80'
    environment:
      API_BASE_URL: /api/v1
      API_PROXY_TARGET: https://petstore-api-dev.ramon-alcantara.work
      API_KEY: ${API_KEY:-} # From .env or environment
      VERSION: local
      BUILD_DATE: ${BUILD_DATE:-}
```

Start with:

```bash
docker compose up --build
```

## Fly.io Configuration

### Fly.io App Configuration

Configuration is in `.fly/{environment}/fly.toml`:

```toml
[env]
  API_BASE_URL = "/api/v1"
  API_PROXY_TARGET = "https://petstore-api-dev.ramon-alcantara.work"

[env.dev]
  # Dev-specific settings

[env.staging]
  # Staging-specific settings

[env.production]
  # Production-specific settings
```

### Fly.io Secrets

Sensitive values use Fly.io secrets:

```bash
# Set secret for dev environment
flyctl secrets set -c .fly/dev/fly.toml API_KEY="your-token-here"

# View secrets
flyctl secrets list -c .fly/dev/fly.toml

# Remove secret
flyctl secrets unset API_KEY -c .fly/dev/fly.toml
```

### Deploying with Fly.io

See [Deployment](./deployment.md) for complete Fly.io deployment instructions.

## Storybook Configuration

### Storybook Flavors

Storybook can be configured via `STORYBOOK_FLAVOR` environment variable:

```bash
# All stories (default)
pnpm run storybook

# Petstore flavor only
STORYBOOK_FLAVOR=petstore pnpm run storybook

# Visual reporter flavor only
STORYBOOK_FLAVOR=visual-report pnpm run storybook
```

Each flavor filters to relevant packages:

| Flavor          | Packages                    | Use Case                           |
| --------------- | --------------------------- | ---------------------------------- |
| `all`           | atoms, app, visual-reporter | Full exploration                   |
| `petstore`      | atoms, app                  | Petstore app development           |
| `visual-report` | atoms, visual-reporter      | Visual regression tool development |

### Storybook Preview Head

Runtime configuration is loaded in `.storybook/preview-head.html`:

```html
<!-- Load runtime config from Docker entrypoint -->
<script src="/config.js"></script>

<!-- Fallback if running without Docker -->
<meta name="api-base-url" content="https://petstore-api-dev.ramon-alcantara.work/api/v1" />
```

## Mock Service Worker (MSW) Configuration

Storybook uses MSW to mock API responses. Configuration is in `.storybook/preview.ts`:

```typescript
import { initialize, mswLoader } from 'msw-storybook-addon';

initialize();

export const loaders = [mswLoader];
```

**API handlers** are defined in `packages/app/src/mocks/handlers.ts`:

```typescript
export const handlers = [
  http.get('*/api/v1/pet/:id', async ({ params }) => {
    return HttpResponse.json({ id: params.id, name: 'Fluffy' });
  }),
  // ... more handlers
];
```

Stories can override handlers:

```typescript
export const WithError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('*/api/v1/pet/:id', () => {
          return HttpResponse.json({ error: 'Not found' }, { status: 404 });
        }),
      ],
    },
  },
};
```

## Testing Configuration

### Vitest Configuration

Tests are configured in `vitest.config.ts`:

```typescript
export default defineConfig({
  test: {
    environment: 'happy-dom', // Lightweight DOM for tests
    setupFiles: ['./test-setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['packages/**/src/**/*.ts(x)'],
      exclude: ['**/*.stories.ts(x)', '**/node_modules/**'],
    },
  },
});
```

### Test Setup

Global setup in `test-setup.ts`:

```typescript
// Set up MSW for API mocking
import { server } from './packages/app/src/mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Set up i18n for testing
beforeEach(() => {
  // Reset locale to 'en'
});
```

## TypeScript Configuration

Project-wide TypeScript settings in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@petstore-ui/atoms": ["packages/atoms/src"],
      "@petstore-ui/app": ["packages/app/src"],
      "@petstore-ui/shared": ["packages/shared/src"],
      "@petstore-ui/visual-reporter": ["packages/visual-reporter/src"]
    }
  }
}
```

These path aliases enable clean imports:

```typescript
import { Button } from '@petstore-ui/atoms';
import { useAppContext } from '@petstore-ui/app';
```

## ESLint Configuration

Linting rules in `.eslintrc.cjs`:

```javascript
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier', // Disable conflicting Prettier rules
  ],
  rules: {
    'react/react-in-jsx-scope': 'off', // React 17+
    'no-console': ['warn', { allow: ['error', 'warn'] }],
  },
};
```

Run linter:

```bash
pnpm run lint       # Show errors
pnpm run lint -- --fix  # Auto-fix issues
```

## Prettier Configuration

Code formatting in `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 80
}
```

Run formatter:

```bash
pnpm run format       # Format all files
pnpm run format:check # Check formatting
```

## Environment Checklist

Before deployment, verify:

- [ ] `API_BASE_URL` is set and accessible
- [ ] `API_PROXY_TARGET` is set (for Docker) and backend is running
- [ ] `API_KEY` is set in secrets (if required by backend)
- [ ] `VERSION` is correct (e.g., semantic version or git SHA)
- [ ] `BUILD_DATE` is set to current ISO 8601 timestamp
- [ ] Storybook builds without errors (`pnpm run build-storybook`)
- [ ] Docker image builds successfully (`docker build .`)
- [ ] Tests pass with coverage above threshold (`pnpm run test:coverage`)

## Troubleshooting

### "API_BASE_URL is not configured"

**Cause:** Application cannot find API endpoint configuration.

**Solution:**

1. Check that `/config.js` exists and is valid (Docker)
2. Check that `<meta name="api-base-url">` exists (static HTML)
3. Verify environment variable is set: `echo $API_BASE_URL`

### "CORS error: blocked by cross-origin policy"

**Cause:** Backend API doesn't allow requests from browser origin.

**Solution:**

1. Use same-origin proxy: set `API_BASE_URL=/api/v1` (Docker proxy to backend)
2. Configure CORS on backend: add `Access-Control-Allow-Origin: *` (or specific origin)
3. Use proxy in development: update `vite.petstore.config.ts` with proxy rules

### Docker build fails: "Module not found"

**Cause:** Missing dependencies or TypeScript error.

**Solution:**

1. Run `pnpm install` locally to verify
2. Run `pnpm run type-check` to find TypeScript errors
3. Check that all workspace packages are listed in `pnpm-workspace.yaml`

## Next Steps

- **See [Getting Started](./getting_started.md)** for local development
- **See [Deployment](./deployment.md)** for Docker and Fly.io setup
- **See [Testing](./testing.md)** for test configuration
- See [GitHub Actions CI/CD pipeline](https://github.com/RamonAlcantaraArceo/petstore-ui/tree/main/.github/workflows) for full workflow definitions

---

**Have questions?** Check [CONTRIBUTING.md](CONTRIBUTING.md) for component and style standards.
