# petstore-ui

A React + TypeScript component library for the Petstore UI, built with Bun and documented in Storybook.

This project follows an i18n + accessibility-first approach from the component core.

## Tech Stack

- React 18 + TypeScript (strict mode)
- Bun (runtime, package manager, scripts)
- Storybook 7 (component docs and visual validation)

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

## Storybook

- Stories are the primary component documentation surface.
- Include stories that demonstrate:
	- locale switching (`en` and `chef`)
	- keyboard interaction behavior
	- accessibility-focused scenarios
- Run Storybook locally to validate translated text length and interaction behavior.

## Development

Install dependencies:

```bash
bun install
```

Useful scripts:

```bash
bun run type-check
bun run lint
bun run test
bun run storybook
bun run build-storybook
```


## Static Website Preview & Navigation

All navigation is now server-based for a production-like experience:

- `/` &rarr; Homepage (public/index.html)
- `/storybook/` &rarr; Full Storybook UI (served from storybook-static/)
- `/petstore/` &rarr; Petstore demo placeholder (petstore/index.html)

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

	- Use the homepage navigation cards to access Storybook or the Petstore demo.
	- All routes work as they will in deployment—no local HTML fallback is needed.

> **Note:** Direct file:// preview is no longer supported. Always use the preview server for navigation and testing.

## Contributor Guidelines

- Use design tokens from `src/tokens/theme.ts`; avoid hardcoded visual values.
- Keep component props typed with interfaces and sensible defaults.
- For new/updated components, include:
	- i18n integration (`useTranslation`, translation key props)
	- a11y integration (`useAccessibility`, keyboard + ARIA support)
	- Storybook stories covering variants and locale behavior
	- tests for behavior, i18n rendering, and accessibility where applicable

For detailed AI and code generation conventions, see `.github/copilot-instructions.md`.