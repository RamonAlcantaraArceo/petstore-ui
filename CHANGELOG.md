# Changelog

All notable changes to **petstore-ui** are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Added
- Accessibility and i18n test layer (Unit 12D)
- Integration/API test layer for petstore services (Unit 12C)
- Unit and component interaction tests for atoms and molecules (Unit 12B)
- Test foundation with Bun runner and happy-dom DOM setup (Unit 12A)
- CI quality gate via GitHub Actions (`ci.yml`) with lint, type-check, test, and Storybook build (Unit 10B)
- Lint, format, and type-check baseline with ESLint, Prettier, and Husky pre-commit (Unit 10A)
- Coverage reporting with Codecov upload (Unit 12E)
- Comprehensive README and CONTRIBUTING.md (Unit 11A)
- Dockerfile + docker-compose for production Storybook serving

---

## [1.0.0] - 2026-03-03

### Added

#### Foundation
- React 18 + TypeScript strict-mode project bootstrapped with Bun
- Storybook 7 for component documentation and interactive demos
- Atomic design folder structure (`atoms/`, `molecules/`, `organisms/`)

#### Design System
- Design token system in `src/tokens/theme.ts` (colors, spacing, typography, breakpoints)
- `Button`, `Badge`, `Input` atom components
- `PetCard`, `SearchBox` molecule components
- `PetGrid`, `Header` organism components

#### Petstore Integration
- API client (`src/services/apiClient.ts`) with typed fetch wrapper
- `petApi.ts` — pet resource endpoints (list, find by status, find by ID)
- `storeApi.ts` — store/order endpoints
- Petstore demo page at `src/petstore/`

#### Internationalization
- i18n infrastructure: `LocaleProvider`, `useTranslation`, `getTranslation`
- `en` locale (production)
- `chef` pseudo-locale for layout/text-expansion testing
- Type-safe translation registry with parameter interpolation

#### Accessibility
- `useAccessibility` hook (ARIA attributes, keyboard activation, screen reader announcements)
- WCAG 2.1 AA compliance helpers in `src/accessibility/`
- Accessibility testing utilities in `src/testing/a11y-utils.ts`

#### Testing Utilities
- `src/testing/i18n-utils.tsx` — `renderWithLocale` helper
- `src/testing/a11y-utils.ts` — `auditAccessibility`, `testKeyboardNavigation`
- `src/testing/test-patterns.tsx` — comprehensive test pattern library

#### Storybook Stories
- Stories for all atoms, molecules, organisms
- Petstore API demo stories
- Locale-switching toolbar in Storybook for live i18n preview

---

## Changelog Policy

- **MAJOR** version — breaking changes to public component APIs or token structure
- **MINOR** version — new components, new locale, new CI feature
- **PATCH** version — bug fixes, test additions, documentation updates

New entries go under `[Unreleased]`. On release, the `[Unreleased]` section is renamed to the new version with today's date, and a new empty `[Unreleased]` section is added.

[Unreleased]: https://github.com/ramonalcantaraarceo/petstore-ui/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/ramonalcantaraarceo/petstore-ui/releases/tag/v1.0.0
