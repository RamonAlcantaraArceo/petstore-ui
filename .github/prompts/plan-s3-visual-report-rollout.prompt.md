## Plan + Implement: Visual Report Rollout (Dual Mode)

You are working in `petstore-ui`.
We already have a local visual-report flow and we want to keep it available, but CI and team-default usage must move to S3.

### Goal

Implement a safe phased rollout where:

- **Local mode remains supported** (no cloud required).
- **CI default path publishes to S3**.
- Repo no longer depends on committing generated visual artifacts.
- Transition can be validated and reverted quickly if needed.

### Migration Strategy Required

Design and implement **two explicit phases**:

1. **Phase 1 (Dual mode / coexistence)**
   - Keep existing local commands working.
   - Introduce S3 publish flow and set it as CI default.
   - Keep local preview fallback functional.

2. **Phase 2 (S3-first steady state)**
   - Local mode still available but treated as fallback/dev-only path.
   - CI and docs point primarily to S3 URLs/manifests.

### Existing Files to Update

- `scripts/generate-visual-report.ts`
- `src/visual-report/bootstrap.tsx`
- `.github/workflows/ci.yml`
- (optionally) `.github/workflows/deploy.yml` if needed for migration clarity
- `README.md`
- Add new scripts/utilities as needed under `scripts/`

### Required Deliverables

1. **Plan section in your response**
   - Include phase gates, rollback approach, and acceptance checks per phase.

2. **Implementation section**
   - Add dual-mode report data resolution in UI/bootstrap:
     - Priority suggestion:
       1. query param override (`?reportBaseUrl=...`),
       2. env-configured S3/public base URL,
       3. local `/visual-report/data.json` fallback.
   - Ensure generator can target a staging output dir outside committed static assets.
   - Add S3 publish script that writes immutable + latest paths.
   - Keep local script aliases unchanged or backward-compatible.

3. **CI behavior**
   - Make S3 publish the default in `ci.yml` for mainline/PR validation path where appropriate.
   - Add clear conditional switch to run local-only mode when cloud vars are absent.
   - Publish resulting URL/manifests in job summary.

4. **Docs/runbook**
   - "Local mode" section (no S3).
   - "CI S3 mode" section.
   - Troubleshooting matrix for common failures (missing bucket, auth, bad base URL, missing data.json).

### Constraints

- Keep existing local developer experience working.
- Do not force S3 for local use.
- Do not commit generated binaries/artifacts.
- Prefer OIDC in CI over static AWS credentials.
- Keep changes minimal and reversible.

### Suggested Flags / Env Vars

- `VISUAL_REPORT_MODE` (`local|s3|auto`, default `auto`)
- `VISUAL_REPORT_ENV` (`dev|staging|prod`)
- `VISUAL_REPORT_BASE_URL`
- `VISUAL_REPORT_S3_BUCKET`
- `VISUAL_REPORT_S3_REGION`
- `VISUAL_REPORT_S3_PREFIX`

`auto` behavior suggestion:

- If S3 variables are present in CI, publish/use S3.
- Otherwise, use local fallback.

### Acceptance Criteria

- `bun run report:visual:build` still works locally without S3.
- CI can publish report to S3 and emit a URL.
- Multi-env paths are isolated and deterministic.
- UI can load report data from either S3 URL or local fallback.
- Rollback path is documented and quick.

### Final Response Format

1. `Plan`
2. `Phase 1 changes`
3. `Phase 2 changes`
4. `How to run (local vs CI)`
5. `Validation`
6. `Rollback`
