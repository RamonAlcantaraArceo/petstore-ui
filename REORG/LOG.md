# Reorg execution log

- 2026-05-21T18:00:00Z Created branch `refactor/move-src-into-packages`.
- 2026-05-21T18:05:00Z Moved all tracked files from root `src/` into package-owned `packages/*/src` locations with `git mv`.
- 2026-05-21T18:10:00Z Updated package entrypoints and bootstrap/service entry imports.
- 2026-05-21T18:15:00Z Rewired cross-package imports to package boundaries (notably `@petstore-ui/atoms`).
- 2026-05-21T18:20:00Z Updated Storybook, Vite, Vitest, ESLint, TypeScript config paths and globs to package-based source layout.
- 2026-05-21T18:25:00Z Generated deterministic file mapping and conflict notes.
