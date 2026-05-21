# Ownership conflicts

No unresolved ownership conflicts remain after the move.

Notes:

- Shared testing utilities and root library aggregation were placed in `packages/shared/src`.
- App and visual components now consume shared atoms/i18n/a11y/token exports via `@petstore-ui/atoms`.
