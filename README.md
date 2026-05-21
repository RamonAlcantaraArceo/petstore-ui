# petstore-ui

[![CI](https://github.com/ramonalcantaraarceo/petstore-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/ramonalcantaraarceo/petstore-ui/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/ramonalcantaraarceo/petstore-ui/branch/main/graph/badge.svg)](https://codecov.io/gh/ramonalcantaraarceo/petstore-ui)

A React + TypeScript component library for the Petstore UI, built with pnpm and documented in Storybook.

This project follows an i18n + accessibility-first approach from the component core.

## Migration Status

Repository split has started with workspace scaffolding for:

- `@petstore-ui/atoms`
- `@petstore-ui/app`
- `@petstore-ui/visual-reporter`

Workspace package entrypoints are now active:

- `packages/atoms/src/index.ts` maps shared atoms + theme + i18n/a11y exports.
- `packages/app/src/index.ts` maps petstore app views/forms/services/context exports.
- `packages/visual-reporter/src/index.ts` maps visual regression UI + model exports.

Current source files still remain under `src/` and are consumed by these package entrypoints while
incremental physical migration continues.

## Tech Stack

- React 18 + TypeScript (strict mode)
- pnpm (package manager)
- Storybook 7 (component docs and visual validation)
- Vitest test runner with `@testing-library/react`

## Setup

**Requirements:** Node ≥ 20 + [pnpm ≥ 9](https://pnpm.io)

```bash
# Install project dependencies
pnpm install
```

### Node.js fallback

pnpm is the only supported package manager for this project.

## Project Structure

```text
petstore-ui/
├── packages/
│   ├── atoms/               # Shared React atoms package (scaffold)
│   ├── app/                 # Petstore app package (scaffold)
│   └── visual-reporter/     # Visual report package (scaffold)
├── src/
│   ├── components/          # Atoms, molecules, organisms
│   ├── i18n/                # Locale provider, translations, registry
│   │   ├── locales/         # en.ts, chef.ts
│   │   ├── context.tsx
│   │   ├── registry.ts
│   │   └── types.ts
│   ├── accessibility/       # useAccessibility hook, utils, types
│   │   ├── hooks.ts
│   │   ├── utils.ts
│   │   └── types.ts
│   ├── testing/             # i18n/a11y testing utilities
│   │   ├── i18n-utils.tsx
│   │   ├── a11y-utils.ts
│   │   └── test-patterns.tsx
│   ├── stories/             # Storybook stories
│   └── tokens/              # Design tokens
└── .storybook/              # Storybook config
```

## Development Workflow

```bash
pnpm run lint           # ESLint — must pass before commit
pnpm run format         # Prettier auto-format
pnpm run format:check   # Prettier check (CI)
pnpm run type-check     # TypeScript strict check

pnpm run test           # Run all tests
pnpm run test:coverage  # Run tests with coverage report
pnpm run report:visual:build  # Build custom visual diff report data/UI
pnpm run report:visual  # Run visual tests then build custom visual diff report
pnpm run report:visual:triage:petstore-atoms  # Build + run only Petstore atoms visual flow + report

pnpm run storybook      # Interactive component dev (localhost:6006)
pnpm run build-storybook  # Static Storybook build
```

## Testing Layers

| Layer                | Location                         | Runner   |
| -------------------- | -------------------------------- | -------- |
| Unit/component       | `src/components/**/*.test.tsx`   | `vitest` |
| Integration/API      | `src/services/**/*.test.ts`      | `vitest` |
| Accessibility + i18n | `src/testing/a11y-i18n.test.tsx` | `vitest` |

All test files use `@testing-library/react` with happy-dom (set up in `test-setup.ts`).

Coverage reports are written to `./coverage/` and uploaded to Codecov on every CI run.

### Coverage policy

- Target: **≥ 80% line coverage** across components, utilities, and hooks
- Required: unit tests for all new atoms/molecules
- Required: i18n + a11y assertions for any component with locale or keyboard behavior

## Internationalization (i18n)

- Supported locales:
  - `en` (English)
  - `chef` (pseudo-localization for layout/text expansion testing)
- Use `useTranslation()` from `src/i18n/context.tsx` in components.
- Prefer translation keys over hardcoded strings.
- Provide static/fallback labels when translation keys are not provided.

Example:

```tsx
const { t } = useTranslation();
const label = t('components.button.primary');
```

## Accessibility (a11y)

- Use `useAccessibility()` from `src/accessibility/hooks.ts` for:
  - keyboard activation (Enter/Space)
  - ARIA attribute support
  - screen reader announcements
- Follow WCAG 2.1 AA targets for keyboard navigation, semantics, focus behavior, and contrast.
- Prefer semantic HTML first, then augment with ARIA when needed.

## CI Status Checks

Every PR and push to `main` runs the full CI pipeline:

1. `pnpm run lint` — ESLint errors block merge
2. `pnpm run type-check` — TypeScript errors block merge
3. `pnpm run test:coverage` — test failures block merge; coverage uploaded to Codecov
4. `pnpm run build-storybook` — build failures block merge
5. `docker build` — Docker build validation

## Storybook

- Stories are the primary component documentation surface.
- Include stories that demonstrate:
  - locale switching (`en` and `chef`)
  - keyboard interaction behavior
  - accessibility-focused scenarios
- Run Storybook locally to validate translated text length and interaction behavior.

## Docker

Build and run the production Storybook server locally:

```bash
docker compose up --build
```

The app will be available at [http://localhost:8080](http://localhost:8080).  
The app requires an API base URL at runtime. There is no hardcoded fallback.

### Runtime API configuration

The container entrypoint reads environment variables at startup and writes
runtime config into `/config.js`, which Storybook loads on every page via
`.storybook/preview-head.html`.

Current variable roles:

1. `API_BASE_URL` = browser-facing API path used by the frontend (usually `/api/v1`)
2. `API_PROXY_TARGET` = upstream backend origin used by nginx proxy

In other words, the frontend should usually call `/api/v1` (same-origin), and
you change backend targets by changing `API_PROXY_TARGET`.

Resolution order:

1. `window.__RUNTIME_CONFIG__.API_BASE_URL` (from `/config.js`)
2. `<meta name="api-base-url" content="..." />`
3. If both are missing, the app logs an error and fails fast on startup.

Recommended DEV value:

- API_BASE_URL: `/api/v1`
- API_PROXY_TARGET: `https://petstore-api-dev.ramon-alcantara.work`

Example with container runtime config:

```bash
# Keep browser path same-origin; point proxy to selected backend
API_BASE_URL=/api/v1 API_PROXY_TARGET=https://your-api-host docker compose up

# Or create a .env file
echo "API_BASE_URL=/api/v1" > .env
echo "API_PROXY_TARGET=https://your-api-host" >> .env
docker compose up
```

Example with HTML meta tag:

```html
<meta name="api-base-url" content="https://petstore-api-dev.ramon-alcantara.work/api/v1" />
```

Use the meta tag mode when not using `/config.js` runtime injection.

Single image build (no compose):

```bash
docker build \
   --build-arg VERSION=local \
   --build-arg GIT_SHA=N/A \
   --build-arg BUILD_DATE="$(date -u +'%Y-%m-%dT%H:%M:%SZ')" \
   -t petstore-ui .
docker run -p 8080:80 \
   -e API_BASE_URL=/api/v1 \
   -e API_PROXY_TARGET=https://petstore-api-dev.ramon-alcantara.work \
   petstore-ui
```

Build metadata (`VERSION`, `GIT_SHA`, `BUILD_DATE`) is injected into `/config.js` at container startup and surfaced in the Petstore app navigation info tooltip.

### Deploying to Fly.io (DEV)

Deployment is a two-step process:

1. **Push image to GHCR** — trigger the _"Create and publish a Docker image"_
   workflow (runs on `release-ghcr/*` branches, or
   manually via `workflow_dispatch`). The workflow publishes:
   - `ghcr.io/ramonalcantaraarceo/petstore-ui:latest`
   - `ghcr.io/ramonalcantaraarceo/petstore-ui:sha-<short-sha>` (for rollback)

2. **Deploy** — trigger the _"Deploy to Fly.io Dev"_ workflow
   (`workflow_dispatch`). Optionally pass a specific tag (e.g. `sha-abc1234`)
   in the `version` input; leave blank to deploy `latest`.

The Fly config lives in `.fly/dev/fly.toml`. Key settings:

| Setting            | Value                                           |
| ------------------ | ----------------------------------------------- |
| `internal_port`    | `80` (nginx)                                    |
| `memory`           | `256mb`                                         |
| `API_BASE_URL`     | `/api/v1`                                       |
| `API_PROXY_TARGET` | `https://petstore-api-dev.ramon-alcantara.work` |
| Health check       | `GET /` every 15 s                              |

**Rollback:** re-trigger the deploy workflow with a previous `sha-<short-sha>` tag.

**Troubleshoot:** `flyctl logs --app petstore-ui-dev`

## Static Website Preview & Navigation

All navigation is now server-based for a production-like experience:

- `/` → Homepage (public/index.html)
- `/storybook/` → Full Storybook UI (served from storybook-static/)
- `/petstore/` → Petstore demo placeholder (petstore/index.html)

### Local Preview Workflow

For day-to-day UI work, start the petstore app in watch mode:

```bash
pnpm run dev
```

This launches the Petstore demo on Vite with hot reload at `http://localhost:5173/petstore/`.

Use the full preview server when you need the homepage, Storybook, or the static production-like routes:

1. Build static output:

   ```bash
   pnpm run build
   ```

2. Start the preview server:

   ```bash
   pnpm run preview
   ```

3. Open [http://localhost:4000](http://localhost:4000) in your browser.

4. Open [http://localhost:4000/visual-report/](http://localhost:4000/visual-report/) to view the custom visual diff report.

> **Note:** Direct file:// preview is no longer supported. Always use the preview server for navigation and testing.

### Custom Visual Diff Report

The custom visual report provides:

- Left hierarchy: namespace → atomic design level → component
- Right panel: all story variants for the selected component
- Per-viewport rows (desktop/mobile) with an expected-vs-actual slider

To generate report data after visual tests:

```bash
pnpm run report:visual:build
```

Data and copied image assets are generated under `public/visual-report/`.

## Troubleshooting

**`vitest` fails with "document is not defined"**
— Ensure `vitest.config.ts` sets `test.environment = "happy-dom"` and `test.setupFiles = ["./test-setup.ts"]`.

**`SyntaxError` or `GlobalWindow` errors in test-setup**
— Use `happy-dom@14` (not v15+). Run `pnpm add -D happy-dom@14`.

**Lint fails in CI but not locally**
— Run `pnpm run format:check` locally; the CI checks formatting as well as lint errors.

**Storybook build fails**
— Run `pnpm run type-check` first; Storybook uses Vite which surface TypeScript errors during build.

## Contributor Guidelines

See [CONTRIBUTING.md](./CONTRIBUTING.md) for full contribution standards.

For detailed AI and code generation conventions, see `.github/copilot-instructions.md`.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for release history.
