# S3 Visual Report Migration: Execution Order Checklist

Use this checklist to apply the two prompts with low risk.

## 0) Prep (before any prompt)

- Create a working branch for migration changes.
- Confirm AWS target details are defined (bucket, region, env strategy).
- Confirm CI auth strategy (GitHub OIDC role preferred).
- Ensure local baseline still works:
  - `bun run build-storybook`
  - `bun run test:visual` (if enabled in your branch)
  - `bun run report:visual:build`

**Gate:** local report route still loads (`/visual-report/`) before migration.

## 1) Run Prompt 1 (Core S3 implementation)

Prompt file:

- `.github/prompts/plan-s3-visual-report-multi-env.prompt.md`

Expected output themes:

- S3 upload/publish scripts.
- Environment-aware key structure (immutable + latest alias).
- Metadata/manifest for traceability (sha, env, run id, timestamp).
- Bootstrap support for configurable report data base URL.
- CI wiring to publish to S3.

**Gate:**

- Local mode still works without S3 vars.
- S3 publish path works with vars.
- Generated artifacts are not expected to be committed.

## 2) Validate after Prompt 1

- Run lint/type/tests as applicable:
  - `bun run lint`
  - `bun run type-check`
  - `bun run test:ci`
- Run publish flow in dry-run or sandbox env.
- Verify report URL resolves and assets load.
- Verify env isolation path correctness, e.g. `<env>/visual-report/<sha>/...` and `<env>/visual-report/latest/...`.

**Gate:** one successful end-to-end publish and open report URL from S3.

## 3) Run Prompt 2 (Rollout + cutover safety)

Prompt file:

- `.github/prompts/plan-s3-visual-report-rollout.prompt.md`

Expected output themes:

- Dual-mode behavior (`local` and `s3`, with `auto` option).
- CI default to S3 path, with explicit fallback behavior.
- Rollback instructions and phase gates documented.
- README/runbook updates for local vs CI usage.

**Gate:** CI defaults to S3 path while local fallback remains usable.

## 4) Validate after Prompt 2

- Open a PR and run CI.
- Confirm job summary includes published S3 report URL or manifest reference.
- Confirm failure messaging is actionable when S3 config is missing.
- Confirm local-only path still works on developer machines without cloud config.

**Gate:** successful CI run + documented rollback path.

## 5) Rollout recommendation

- Merge with Phase 1 + Phase 2 in the same PR only if CI signal is stable.
- Otherwise split into two PRs:
  1. Core S3 implementation.
  2. Rollout/cutover behavior and docs tightening.

## Minimal rollback plan

- Revert CI S3 publish step(s) first.
- Keep local report generation scripts enabled.
- Preserve bootstrap local fallback path.
- Re-run CI to confirm local-only behavior is restored.
