## Plan: Units 10–12 + CI, Coverage, Docker (DRAFT)

This plan turns your Units 10–12 into sequential, runnable prompts with explicit layering for tests, PR/main GitHub Actions enforcement, Codecov integration, Allure as documented enhancement (not implemented now), changelog/versioning, and production Dockerization. It uses Bun as primary test/runtime, keeps scope aligned with existing repo structure, and stages risk so each step is independently verifiable before moving on.

**Steps**
1. **Unit 10A — Lint/format baseline**: Run a prompt to create/update linting and formatting configs in `.eslintrc.js`, `.prettierrc`, `package.json`, and pre-commit wiring in `.husky` so `lint`, `format`, and `type-check` are consistent with Bun.
2. **Unit 10B — CI quality gate**: Run a prompt to add `.github/workflows/ci.yml` with triggers on `pull_request` and `push` to `main`, running `bun install`, `bun run lint`, `bun run type-check`, `bun run build-storybook`, and `bun run test`.
3. **Unit 12A — Test foundation & runner setup**: Run a prompt to establish test scaffolding with Bun as primary runner, including required setup/preload files and config fixes in `bunfig.toml` (resolve missing `test-setup.ts` target).
4. **Unit 12B — Layer 1: Unit & component tests**: Run a prompt to add unit/component interaction tests under `src/components` (atoms/molecules + core rendering/interaction paths) and ensure they run in Bun test.
5. **Unit 12C — Layer 2: Integration/API tests**: Run a prompt to add integration tests for service and API flows under `src/services`, including success/error handling paths for petstore endpoints.
6. **Unit 12D — Layer 3: Accessibility & i18n tests**: Run a prompt to add accessibility and locale validation tests using `src/testing/a11y-utils.ts` and `src/testing/i18n-utils.tsx`, covering keyboard interaction and multi-locale rendering behavior.
7. **Unit 12E — Coverage + Codecov**: Run a prompt to add coverage scripts in `package.json`, generate CI coverage artifacts, and upload to Codecov from `.github/workflows/ci.yml` (using `CODECOV_TOKEN` secret where needed).
8. **Unit 12F — Reporting enhancement backlog (Allure)**: Run a prompt to add an “Allure enhancement” section in `README.md` and future CI notes in `docs`, including options (local static report, GH Pages report, PR artifact upload), but keep it non-blocking and not active in current pipeline.
9. **Unit 11A — Comprehensive docs**: Run a prompt to update `README.md` with Bun/Node setup, dev workflow, testing layers, CI status checks, coverage policy, Docker run instructions, and troubleshooting; add `CONTRIBUTING.md` contribution standards for components, stories, tests, and CI expectations.
10. **Versioning + Changelog**: Run a prompt to add `CHANGELOG.md` with retroactive entries (foundation/storybook/petstore integration/CI milestones), define changelog policy in `README.md`, and align release/version notes with `package.json` versioning.
11. **Dockerization**: Run a prompt to add `Dockerfile`, `.dockerignore`, and `docker-compose.yml` for a single production image that serves the built app; include CI build validation step in `.github/workflows/ci.yml`.

**Verification**
- After each step:
  - run only the targeted command(s)
  - Commit changes with clear message
  - ask for confirmation to proceed to next step
- Core sequence: `bun run lint` → `bun run type-check` → `bun run test` → `bun run build-storybook` → `docker compose up --build`.
- CI checks required on both PR and merge to `main`: lint, type-check, tests, build, coverage upload.

**Decisions**
- Test runner: Bun primary.
- Test layers required: unit, integration, component interaction, accessibility/i18n.
- Codecov: required now for coverage publishing.
- Allure: documented as enhancement/backlog (not implemented in current phase).
- Docker scope: single production image + compose for local startup.
