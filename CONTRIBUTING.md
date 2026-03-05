# Contributing to petstore-ui

Thank you for contributing! This document describes the standards for components, stories, tests, and CI requirements.

---

## Getting started

```bash
bun install
bun run storybook   # interactive component dev
bun run test        # run full test suite
```

---

## Component standards

### Atomic design

Place new components in the correct layer:

| Layer | Path | Rules |
|---|---|---|
| Atom | `src/components/atoms/` | Single-responsibility, no business logic |
| Molecule | `src/components/molecules/` | Composed from atoms, limited logic |
| Organism | `src/components/organisms/` | May include API calls and context |

### Required anatomy

Every component must have:

1. **TypeScript interface** with JSDoc on each prop
2. **i18n integration** — use `useTranslation()`, accept a `labelTranslationKey` prop
3. **Accessibility** — use `useAccessibility()`, emit ARIA attributes, support Enter/Space keyboard activation
4. **Sensible defaults** for all optional props
5. **`className` prop** for external style overrides
6. **`...props` spread** onto the root element

Use design tokens from `src/tokens/theme.ts`; do not hardcode colors, spacing, or font sizes.

### Naming

| Thing | Convention |
|---|---|
| Component file | `PascalCase.tsx` |
| Props interface | `ComponentNameProps` |
| Utility / hook file | `camelCase.ts(x)` |
| Constant | `SCREAMING_SNAKE_CASE` |

---

## Story standards

Every new component needs a Storybook story file (`ComponentName.stories.tsx`):

- Use `autodocs` tag
- Include an `argTypes` block for all key props
- Provide at minimum: `Default`, `AllVariants`, `WithTranslations` stories
- Test locale switching (toolbar) in `WithTranslations`
- Demonstrate keyboard interaction in an `AccessibilityShowcase` story

---

## Test standards

Test files live alongside their component: `ComponentName.test.tsx`.

### Required test coverage

| Scenario | Required |
|---|---|
| Renders without error | ✅ |
| Applies correct CSS class for each variant | ✅ |
| Calls event handlers on interaction | ✅ |
| Renders translated content via `LocaleProvider` | ✅ |
| Keyboard activation (Enter/Space) | ✅ for interactive elements |
| ARIA attributes present | ✅ |
| Works in `chef` locale | ✅ |

### Test utilities

```typescript
import { renderWithLocale } from '../../testing/i18n-utils';
import { auditAccessibility, testKeyboardNavigation } from '../../testing/a11y-utils';
```

### Running tests

```bash
bun run test               # all tests
bun run test:coverage      # with coverage report
bun run test -- src/components/atoms/Button.test.tsx  # single file
```

Coverage target: **≥ 80% line coverage**.

---

## Pre-commit checks

Husky runs on every commit:

1. `prettier --write` (lint-staged)
2. `eslint src --ext .ts,.tsx` — must exit 0
3. `tsc --noEmit` — must exit 0

Fix all errors before committing. Warnings are allowed but should be minimised.

---

## CI requirements

Every PR must pass:

| Check | Command |
|---|---|
| Lint | `bun run lint` |
| Type check | `bun run type-check` |
| Tests + coverage | `bun run test:coverage` |
| Storybook build | `bun run build-storybook` |
| Docker build | `docker build --target builder .` |

Coverage is uploaded to Codecov automatically; no manual action needed.

---

## Commit message format

```
type(scope): short description

Longer explanation if needed.

Co-authored-by: Your Name <your@email.com>
```

Types: `feat`, `fix`, `test`, `docs`, `refactor`, `chore`, `ci`

---

## Pull request checklist

- [ ] Tests added / updated
- [ ] Story added / updated
- [ ] `bun run lint` passes (0 errors)
- [ ] `bun run type-check` passes
- [ ] `bun run test` passes (all green)
- [ ] Translation keys added to both `en.ts` and `chef.ts` if applicable
- [ ] `CHANGELOG.md` updated under `[Unreleased]`
