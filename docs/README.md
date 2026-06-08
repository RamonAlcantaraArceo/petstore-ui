# petstore-ui

[![CI](https://github.com/ramonalcantaraarceo/petstore-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/ramonalcantaraarceo/petstore-ui/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/ramonalcantaraarceo/petstore-ui/branch/main/graph/badge.svg)](https://codecov.io/gh/ramonalcantaraarceo/petstore-ui)
[![Node Version](https://img.shields.io/badge/node-%3E%3D24.0.0-brightgreen)](https://nodejs.org/)
[![pnpm Version](https://img.shields.io/badge/pnpm-%3E%3D11.0.0-blue)](https://pnpm.io/)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](https://github.com/RamonAlcantaraArceo/petstore-ui/LICENSE)

[![Storybook](https://img.shields.io/badge/storybook-interactive_docs_dev-ff6ee4)](https://petstore-ui-dev.ramon-alcantara.work/storybook/)
[![Storybook](https://img.shields.io/badge/storybook-interactive_docs_staging-ff69b4)](https://petstore-ui-staging.ramon-alcantara.work/storybook/)

[![Dev Deployment](https://github.com/RamonAlcantaraArceo/petstore-ui/actions/workflows/deploy-fly-dev.yml/badge.svg)](https://petstore-ui-dev.ramon-alcantara.work/petstore/)
[![Staging Deployment](https://github.com/RamonAlcantaraArceo/petstore-ui/actions/workflows/deploy-fly-staging.yml/badge.svg)](https://petstore-ui-staging.ramon-alcantara.work/petstore/)

A React + TypeScript component library for the Petstore UI, built with pnpm and documented in Storybook.

This project follows an i18n + accessibility-first approach from the component core.

## Tech Stack

- React + TypeScript (strict mode)
- pnpm (package manager)
- Storybook (component docs and visual validation)
- Vitest test runner with `@testing-library/react`

## Setup

**Requirements:** 

   - [Node ≥ 24](https://nodejs.org)
   - [pnpm ≥ 11](https://pnpm.io)

```bash
# Install project dependencies
pnpm install
```

## Project Structure

```text
petstore-ui/
├── packages/
│   ├── atoms/               # Shared atoms package (tokens, i18n, a11y)
│   ├── app/                 # Petstore app package (molecules/organisms/services)
│   ├── shared/              # Shared test utilities and cross-package helpers
│   └── visual-reporter/     # Visual report package
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
pnpm run storybook:petstore      # Petstore + common atoms stories (localhost:6006)
pnpm run storybook:visual-report # Visual report + common atoms stories (localhost:6007)
pnpm run build-storybook:petstore      # Build Petstore + common atoms Storybook
pnpm run build-storybook:visual-report # Build Visual report + common atoms Storybook
```

## Testing Layers

| Layer                | Location                         | Runner   |
| -------------------- | -------------------------------- | -------- |
| Unit/component       | `packages/**/*.test.tsx`         | `vitest` |
| Integration/API      | `packages/**/*.test.ts`          | `vitest` |
| Accessibility + i18n | `packages/shared/src/testing/a11y-i18n.test.tsx` | `vitest` |

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
- Use `useTranslation()` from `packages/atoms/src/i18n/context.tsx` in components.
- Prefer translation keys over hardcoded strings.
- Provide static/fallback labels when translation keys are not provided.

Example:

```tsx
const { t } = useTranslation();
const label = t('components.button.primary');
```

## Accessibility (a11y)

- Use `useAccessibility()` from `packages/atoms/src/accessibility/hooks.ts` for:
  - keyboard activation (Enter/Space)
  - ARIA attribute support
  - screen reader announcements
- Follow WCAG 2.1 AA targets for keyboard navigation, semantics, focus behavior, and contrast.
- Prefer semantic HTML first, then augment with ARIA when needed.

## Selector conventions for atoms, molecules, and organisms

- Every atom, molecule, and organism root should expose `data-component="<ComponentName>"` using the component's PascalCase name.
- If the component has a primary variant prop, expose it as `data-variant="<variant>"` on the same root element.
- Prefer selectors like `[data-component="Badge"][data-variant="available"]` in POMs and E2E tests.
- If a component needs to distinguish other states such as size or validation, use a dedicated `data-*` attribute with the specific state name.
- **Organisms scope**: Organisms (e.g., `PetstoreApp`, `AppNavigation`, `PetManagementView`, `StoreOrdersView`, `UserManagementView`) expose selectors for E2E testing of complex compositions.

## CI Status Checks

Every PR and push to `main` runs the full CI pipeline:

1. `pnpm run lint` — ESLint errors block merge
2. `pnpm run type-check` — TypeScript errors block merge
3. `pnpm run test:coverage` — test failures block merge; coverage uploaded to Codecov
4. `pnpm run build-storybook` — build failures block merge
5. `docker build` — Docker build validation

## Storybook

- Storybook supports flavors via `STORYBOOK_FLAVOR`:
  - `petstore` = app stories + common atoms stories
  - `visual-report` = visual-reporter stories + common atoms stories
  - default (`all`) = all stories in the monorepo
- Keep each story next to its component and test file, e.g. `Button.tsx`, `Button.test.tsx`, `Button.stories.tsx`.
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

- `/` → Redirects to `/visual-report/`
- `/visual-report/` → Custom visual report UI and assets

### Local Preview Workflow

For day-to-day UI work, start the petstore app in watch mode:

```bash
pnpm run dev
```

This launches the Petstore demo on Vite with hot reload at `http://localhost:5173/petstore/`.

Use the preview server to inspect generated visual report output:

1. Build static output:

   ```bash
   pnpm run build
   ```

2. Start the preview server:

   ```bash
   pnpm run preview
   ```

3. Open [http://localhost:4000/visual-report/](http://localhost:4000/visual-report/) in your browser.

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
