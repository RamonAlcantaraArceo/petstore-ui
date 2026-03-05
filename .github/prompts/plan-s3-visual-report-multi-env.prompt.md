## Plan + Implement: Move Visual Report Artifacts from Repo to S3 (Multi-Environment)

You are working in the `petstore-ui` repository.
Current behavior writes generated visual report assets/data under `public/visual-report/` and relies on local/static hosting. We need to stop bloating the repo with generated files and publish report artifacts to S3 instead.

### Objective

Implement a robust S3-backed visual report publishing flow that:

1. Uploads generated report artifacts and metadata to S3.
2. Supports multiple environments (at minimum: `dev`, `staging`, `prod`) without collisions.
3. Keeps the visual report app functional by loading data from S3-hosted URLs.
4. Avoids committing generated report files into git.
5. Is CI-friendly and can run in GitHub Actions.

### Current Context You Must Use

- Visual report generator script: `scripts/generate-visual-report.ts`
- Visual test artifact producer: `tests/visual/storybook.visual.spec.ts`
- Visual report bootstrap fetch path: `src/visual-report/bootstrap.tsx`
- Existing scripts:
  - `report:visual:build`
  - `report:visual`
  - `report:visual:triage:petstore-atoms`
- Deployment workflow currently targets GitHub Pages: `.github/workflows/deploy.yml`

### Required Deliverables

1. **Architecture/plan section in your response** before coding:
   - Data flow from Playwright artifacts -> build output -> S3 upload -> report consumption.
   - Environment strategy (bucket strategy + key prefixes).
   - Security/auth strategy for CI (OIDC preferred, no static long-lived credentials in repo).

2. **Implementation changes** (code + workflow + docs):
   - Add config-driven S3 publishing support.
   - Add environment-aware pathing for report artifacts.
   - Add upload script(s) and package scripts for publish flow.
   - Update report bootstrap to load `data.json` from configurable base URL (local fallback still works).
   - Update CI workflow(s) to publish report artifacts to S3 for each environment.
   - Add retention/traceability metadata (timestamp + git SHA + branch + env + run id).
   - Update docs with setup and runbook.

3. **Verification section** in your response:
   - Commands run.
   - What was validated locally.
   - Any limitations.

### Functional Requirements

- Multi-environment support:
  - Must isolate artifacts by environment using a deterministic key pattern such as:
    - `s3://<bucket>/<env>/visual-report/<git-sha>/...`
    - and a stable alias path for latest, e.g.:
      - `s3://<bucket>/<env>/visual-report/latest/...`
- Report dataset must include source metadata enabling traceability.
- Visual report app must be able to open a chosen report build via URL/config (not hardcoded single path).
- Maintain compatibility for local dev preview when S3 is not configured.

### Non-Functional Constraints

- Keep changes minimal and focused.
- Do not commit generated binary artifacts or large report files.
- Prefer Bun-compatible TypeScript tooling already in repo.
- Do not introduce unnecessary infra frameworks.
- Favor explicit environment variables over hidden conventions.

### Suggested Environment Variables

Use and document at least:

- `VISUAL_REPORT_ENV` (`dev|staging|prod`)
- `VISUAL_REPORT_S3_BUCKET`
- `VISUAL_REPORT_S3_REGION`
- `VISUAL_REPORT_S3_PREFIX` (optional default: `visual-report`)
- `VISUAL_REPORT_BASE_URL` (public URL base used by UI to fetch `data.json`)
- `GITHUB_SHA`, `GITHUB_REF_NAME`, `GITHUB_RUN_ID` (from CI)

### Implementation Hints

- Refactor generator output to a staging directory (e.g. under `dist/visual-report` or `artifacts/visual-report`) instead of repo-served `public/visual-report` as primary output.
- Add a dedicated upload script (TypeScript) for S3 sync/upload and manifest writing.
- Generate a small `manifest.json` per upload containing:
  - `environment`, `sha`, `branch`, `runId`, `generatedAt`, `viewports`, `reportPath`.
- Consider writing both immutable and `latest` pointers.
- Ensure bootstrap supports either:
  - explicit query param override for report URL, or
  - configured base URL from build-time/runtime config.

### CI/CD Expectations

- Add/update workflow job(s) to:
  1. Build storybook + run visual tests.
  2. Generate report artifacts.
  3. Upload to S3 using short-lived credentials (OIDC role assumption preferred).
  4. Output resulting report URL in workflow summary.
- Keep existing deploy behavior unless clearly superseded; document migration path.

### Acceptance Criteria

- Running publish flow does not require committing generated report files.
- Dev/staging/prod uploads do not overwrite each other.
- A user can open a report URL and see the same visual-report UI with correct assets.
- Metadata enables identifying exactly which commit/run produced the report.
- README/docs clearly describe setup, usage, and troubleshooting.

### Output Format Required from You

In your final response:

1. `Plan` (short, concrete)
2. `Changes made` (file-by-file)
3. `How to run` (local + CI)
4. `Validation` (what you executed)
5. `Follow-ups` (optional, minimal)
