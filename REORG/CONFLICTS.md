# Ownership conflicts

- `src/components/index.ts`, `src/components/molecules/index.ts`, and `src/components/organisms/index.ts` span multiple package domains; moved to `packages/shared` as fallback aggregator files.
- `src/testing/*` is used across multiple packages; moved to `packages/shared/src/testing` as shared test utilities.
- No direct entrypoint ownership conflicts were found while parsing `packages/*/src/index.ts`.
