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

Single image build (no compose):

```bash
docker build -t petstore-ui .
docker run -p 8080:80 petstore-ui
```

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

> **Note:** Direct file:// preview is no longer supported. Always use the preview server for navigation and testing.

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
