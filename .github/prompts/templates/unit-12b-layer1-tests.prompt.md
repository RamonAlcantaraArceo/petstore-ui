Implement Unit 12B for this Bun-first React + TypeScript monorepo by adding Layer 1 tests only (unit + component interaction), with no integration/API or e2e work in this step.

Scope:
- Add or update Bun-compatible test setup so `bun run test` executes reliably for component tests.
- Create unit and interaction tests for core atoms/molecules (rendering, props/variants, disabled states, callbacks, keyboard interactions, basic accessibility assertions).
- Focus on reusable UI behavior and deterministic tests; mock only what is necessary.
- Keep test files colocated with components or in a consistent test directory pattern already used in the repo.
- Ensure tests run with Bun as primary runner and TypeScript strict mode.

Constraints:
- Do not modify CI workflows in this step.
- Do not add Codecov or coverage upload in this step.
- Do not add Allure in this step.
- Do not change production component APIs unless required to fix a real testability issue.

Deliverables:
1) New/updated test setup files required for Bun test execution.
2) New Layer 1 test files for representative atoms and molecules.
3) Any minimal config/script adjustments in package scripts needed for local execution.
4) A short summary of what was added and why.

Validation required before finishing:
- Run `bun run test`.
- If available, also run `bun run type-check`.
- Report pass/fail output and list any remaining known gaps for Layer 1 only.
