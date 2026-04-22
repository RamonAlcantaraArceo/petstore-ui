## Plan: Fly.io Initial Deployment + Safe Docker Runtime

Prepare the existing Storybook static image for first Fly.io deployment while making API targeting runtime-configurable (no rebuild per environment). The approach is to harden container/runtime defaults, add runtime API URL injection compatible with the existing `resolveBaseUrl()` chain, and repair CI/CD deployment wiring so Fly can deploy a trusted, current image.

**Steps**

1. Phase 1: Baseline and constraints
1. Capture current deployment constraints from `Dockerfile`, `docker-compose.yml`, `.fly/dev/fly.toml`, and workflows; preserve current app behavior (static Storybook over nginx, API via `src/services/apiClient.ts` `resolveBaseUrl`).
1. Confirm runtime URL contract: use `https://petstore-api-dev.ramon-alcantara.work/api/v1` as the deploy-time default and keep ability to override with env for future environments.

1. Phase 2: Runtime API config design (blocks Phase 3 and 4)
1. Refactor API resolution precedence in `src/services/apiClient.ts` to check runtime-injected source first, then existing sources:
1. Runtime global value (for static runtime override)
1. Meta tag `api-base-url`
1. `import.meta.env.VITE_API_BASE_URL`
1. Current fallback `DEFAULT_BASE_URL`
1. Choose one runtime injection mechanism for static hosting:
1. Add startup templating in nginx container to write runtime API URL into served HTML/JS bootstrap (recommended)
1. Keep `import.meta.env` as build fallback for local/storybook development
1. Ensure Storybook static and petstore demo both consume the same runtime API setting to avoid split behavior.

1. Phase 3: Dockerfile hardening and quality improvements (depends on Phase 2)
1. Replace inline nginx `printf` config with tracked config file(s) under repository for readability/reviewability.
1. Harden runtime image:
1. Pin base image tags (`oven/bun`, `nginx`) to explicit versions
1. Add nginx security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`) and disable token leakage
1. Keep SPA/static routing behavior intact for Storybook
1. Add runtime entrypoint script for API URL injection using environment variable (for compose/Fly), with safe default to configured DEV URL.
1. Improve build quality:
1. Keep dependency-layer caching (`COPY package manifests` before sources)
1. Reduce build context and final image attack surface using stricter `.dockerignore`
1. Ensure final image only contains static assets + runtime config/entrypoint (no toolchain artifacts).

1. Phase 4: Docker Compose runtime wiring (parallel with Phase 5 once Phase 2 complete)
1. Update `docker-compose.yml` to pass runtime API env variable to container.
1. Keep local developer UX simple: `docker compose up --build` should target DEV API immediately.
1. Optionally add compose override strategy (`.env`/`--env-file`) for future staging/prod without image rebuild.

1. Phase 5: Fly.io deployment config hardening (parallel with Phase 4 once Phase 2 complete)
1. Fix `.fly/dev/fly.toml` resource mismatch:
1. Align memory settings (remove conflicting `memory` vs `memory_mb`)
1. Correct `internal_port` to match nginx runtime port
1. Add runtime env var in Fly config for API base URL (same contract as compose).
1. Add health check/readiness behavior appropriate for static nginx app.
1. Keep memory-mode requirement in Fly env (`STORAGE_MODE=memory`) and verify no conflict with frontend-only runtime.

1. Phase 6: CI/CD reliability for image deployment (depends on Phase 3 and 5)
1. Update GHCR workflow so image is actually published (`push: true`) with deterministic tags.
1. Ensure deploy workflow consumes explicit tag/version and Fly deploy references that image.
1. Add or tighten metadata/labels and optional attestation step for supply-chain posture.
1. Validate branch trigger strategy so deployable images are produced on intended branches.

1. Phase 7: Documentation and rollout checks (depends on all prior phases)
1. Update README/deployment docs with:
1. Runtime API env usage in compose and Fly
1. How to switch API per environment without rebuild
1. Minimal rollback/troubleshooting steps
1. Add a short deployment checklist for first Fly rollout.

**Relevant files**

- `/Users/ramonalcantaraarceo/github/petstore-ui/src/services/apiClient.ts` — adjust `resolveBaseUrl()` precedence and runtime override compatibility.
- `/Users/ramonalcantaraarceo/github/petstore-ui/Dockerfile` — hardening, pinned images, config/entrypoint integration.
- `/Users/ramonalcantaraarceo/github/petstore-ui/docker-compose.yml` — runtime env wiring to point at DEV API.
- `/Users/ramonalcantaraarceo/github/petstore-ui/.dockerignore` — context reduction and image quality.
- `/Users/ramonalcantaraarceo/github/petstore-ui/.fly/dev/fly.toml` — port/memory/env/health checks for initial deployment.
- `/Users/ramonalcantaraarceo/github/petstore-ui/.github/workflows/push-ghcr.yml` — publish image + reliable tagging.
- `/Users/ramonalcantaraarceo/github/petstore-ui/.github/workflows/deploy-fly-dev.yml` — consume published image/tag and deploy to Fly.
- `/Users/ramonalcantaraarceo/github/petstore-ui/README.md` — deployment/runtime API instructions.
- `/Users/ramonalcantaraarceo/github/petstore-ui/.fly/dev/` (new nginx/app runtime docs/config references if needed) — keep runtime behavior explicit and reviewable.

**Verification**

1. Build image locally and run compose; verify UI loads on `http://localhost:8080` and API requests target `https://petstore-api-dev.ramon-alcantara.work/api/v1`.
2. Confirm runtime override works without rebuild by changing compose env and restarting container; inspect network requests in browser.
3. Validate security headers from nginx response (`curl -I http://localhost:8080`).
4. Validate Fly config (`flyctl config validate --config .fly/dev/fly.toml`) and confirm `internal_port`/memory/env are consistent.
5. Dry deploy to Fly using existing workflow path, then verify app health and logs (`flyctl logs --app petstore-ui-dev`).
6. Confirm GHCR workflow publishes image and deploy workflow consumes a fresh tag.
7. Run project quality checks relevant to changed files: `bun run lint`, `bun run type-check`, `bun run build-storybook`, and docker build sanity.

**Decisions**

- Use runtime environment configuration (not build-time-only) so one image can be reused across environments.
- Use base URL `https://petstore-api-dev.ramon-alcantara.work/api/v1` for DEV deployment default.
- Include Fly.io workflow/config hardening in scope now.
- Keep scope focused on deployment/runtime behavior and image quality; no feature-level UI work is included.

**Further Considerations**

1. Runtime injection target: prefer envsubst-templated bootstrap file versus HTML rewriting at startup; choose the simpler, testable mechanism that avoids brittle sed mutations.
2. Tag strategy: keep `latest` plus commit SHA tags to improve rollback confidence on first deployments.
3. If Fly resource cost is a concern, tune `min_machines_running` and auto-stop after first stable deployment metrics are collected.
