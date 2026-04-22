# petstore-ui

[![CI](https://github.com/ramonalcantaraarceo/petstore-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/ramonalcantaraarceo/petstore-ui/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/ramonalcantaraarceo/petstore-ui/branch/main/graph/badge.svg)](https://codecov.io/gh/ramonalcantaraarceo/petstore-ui)

A React + TypeScript component library for the Petstore UI, built with Bun and documented in Storybook.

This project follows an i18n + accessibility-first approach from the component core.

## Tech Stack

- React 18 + TypeScript (strict mode)
- Bun (runtime, package manager, scripts)
- Storybook 7 (component docs and visual validation)
- Vitest test runner with `@testing-library/react`

## Setup

**Requirements:** [Bun ≥ 1.0](https://bun.sh) or Node ≥ 20 (Node requires `npx` in place of `bun run`)

```bash
# Install Bun (if needed)
curl -fsSL https://bun.sh/install | bash

# Install project dependencies
bun install
```

### Node.js fallback

All scripts are compatible with Node + npm/npx — replace `bun run` with `npm run`.

## Project Structure

```text
petstore-ui/
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
bun run lint           # ESLint — must pass before commit
bun run format         # Prettier auto-format
bun run format:check   # Prettier check (CI)
bun run type-check     # TypeScript strict check

bun run test           # Run all tests
bun run test:coverage  # Run tests with coverage report
bun run report:visual:build  # Build custom visual diff report data/UI
bun run report:visual  # Run visual tests then build custom visual diff report
bun run report:visual:triage:petstore-atoms  # Build + run only Petstore atoms visual flow + report

bun run storybook      # Interactive component dev (localhost:6006)
bun run build-storybook  # Static Storybook build
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

1. `bun run lint` — ESLint errors block merge
2. `bun run type-check` — TypeScript errors block merge
3. `bun run test:coverage` — test failures block merge; coverage uploaded to Codecov
4. `bun run build-storybook` — build failures block merge
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
By default it targets the DEV API (`https://petstore-api-dev.ramon-alcantara.work/api/v1`).

### Runtime API configuration

The container reads `API_BASE_URL` at startup (from `docker/entrypoint.sh`) and
writes it into `/config.js`, which Storybook loads on every page via
`.storybook/preview-head.html`. This means **you can switch API targets without
rebuilding the image**:

```bash
# Point at a different API without rebuilding
API_BASE_URL=https://your-api/api/v1 docker compose up

# Or create a .env file
echo "API_BASE_URL=https://your-api/api/v1" > .env
docker compose up
```

Single image build (no compose):

```bash
docker build -t petstore-ui .
docker run -p 8080:80 -e API_BASE_URL=https://petstore-api-dev.ramon-alcantara.work/api/v1 petstore-ui
```

### Deploying to Fly.io (DEV)

Deployment is a two-step process:

1. **Push image to GHCR** — trigger the _"Create and publish a Docker image"_
   workflow (runs on `main`, `release-ghcr/*`, or `deploy-to-fly` branches, or
   manually via `workflow_dispatch`). The workflow publishes:
   - `ghcr.io/ramonalcantaraarceo/petstore-ui:latest`
   - `ghcr.io/ramonalcantaraarceo/petstore-ui:sha-<short-sha>` (for rollback)

2. **Deploy** — trigger the _"Deploy to Fly.io Dev"_ workflow
   (`workflow_dispatch`). Optionally pass a specific tag (e.g. `sha-abc1234`)
   in the `version` input; leave blank to deploy `latest`.

The Fly config lives in `.fly/dev/fly.toml`. Key settings:

| Setting         | Value                                                  |
| --------------- | ------------------------------------------------------ |
| `internal_port` | `80` (nginx)                                           |
| `memory`        | `256mb`                                                |
| `API_BASE_URL`  | `https://petstore-api-dev.ramon-alcantara.work/api/v1` |
| Health check    | `GET /` every 15 s                                     |

**Rollback:** re-trigger the deploy workflow with a previous `sha-<short-sha>` tag.

**Troubleshoot:** `flyctl logs --app petstore-ui-dev`

## Static Website Preview & Navigation

All navigation is now server-based for a production-like experience:

- `/` → Homepage (public/index.html)
- `/storybook/` → Full Storybook UI (served from storybook-static/)
- `/petstore/` → Petstore demo placeholder (petstore/index.html)

### Local Preview Workflow

1. Build Storybook static output:

   ```bash
   bun run build-storybook
   ```

2. Start the preview server:

   ```bash
   bun run preview
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
bun run report:visual:build
```

Data and copied image assets are generated under `public/visual-report/`.

## Troubleshooting

**`vitest` fails with "document is not defined"**
— Ensure `vitest.config.ts` sets `test.environment = "happy-dom"` and `test.setupFiles = ["./test-setup.ts"]`.

**`SyntaxError` or `GlobalWindow` errors in test-setup**
— Use `happy-dom@14` (not v15+). Run `bun add --dev happy-dom@14`.

**Lint fails in CI but not locally**
— Run `bun run format:check` locally; the CI checks formatting as well as lint errors.

**Storybook build fails**
— Run `bun run type-check` first; Storybook uses Vite which surface TypeScript errors during build.

## Contributor Guidelines

See [CONTRIBUTING.md](./CONTRIBUTING.md) for full contribution standards.

For detailed AI and code generation conventions, see `.github/copilot-instructions.md`.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for release history.
