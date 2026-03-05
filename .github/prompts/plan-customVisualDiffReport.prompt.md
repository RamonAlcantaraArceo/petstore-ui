## Plan: Custom Story Visual Diff Report

Build a local static report generator that reads Storybook metadata plus Playwright visual artifacts, then renders a two-pane UI: left hierarchy (namespace → atomic level → component), right variants with UI-only diff slider. Based on your decisions, expected images come from in-repo Playwright baselines, viewports appear as separate rows, and all Storybook groups are included (not atomic-only). To keep this future-proof for “service-like” comparisons later, the plan includes a small expected-source adapter now (baseline mode first, pluggable source later). This avoids coupling to Playwright HTML internals and gives deterministic control over hierarchy and slider behavior.

**Steps**

1. Add machine-readable test output in [playwright.config.ts](playwright.config.ts) by extending reporter config to emit Playwright JSON alongside existing reporters, preserving CI/local behavior.
2. Extend artifact capture in [tests/visual/storybook.visual.spec.ts](tests/visual/storybook.visual.spec.ts) so each story+project run writes predictable files for actual and diff (not only failed-test report internals), while keeping current screenshot assertion flow.
3. Create a visual report data builder script (new file under scripts) that merges:

- Story metadata from [storybook-static/index.json](storybook-static/index.json)
- Test outcomes from Playwright JSON report
- Image paths from baseline snapshots and generated actual/diff assets

4. Implement hierarchy normalization rules in the builder:

- Namespace from Storybook title segment 1
- Atomic level from segment 2 when matching Atoms/Molecules/Organisms, else Other
- Component from remaining title segments
- Variants grouped by story id/name with separate desktop/mobile rows

5. Add a static report app shell (new folder under public, for example public/visual-report) with:

- Left tree navigation (namespace → atomic level → component)
- Right variant list for selected component
- Per-variant slider viewer using baseline vs actual with diff overlay toggle focused on UI area only

6. Implement UI-only framing by using the captured screenshot region (current fullPage false behavior) and constraining viewer canvas to image bounds; no full document frame content.
7. Wire local serving in [scripts/preview-server.ts](scripts/preview-server.ts) to expose the generated report route (for example /visual-report/), without changing existing homepage/storybook/petstore routes.
8. Add npm/bun scripts in [package.json](package.json) for:

- Build data only
- Build report UI assets
- One-shot command after visual tests to generate and open report locally

9. Add concise usage docs in [README.md](README.md): run order, expected artifacts, viewport behavior, and notes on future expected-source adapters.

**Verification**

- Run Storybook static build, then visual tests, then report generation using project scripts.
- Confirm left tree includes all groups found in Storybook index (including non-atomic paths under Other).
- Validate selected component shows all variant rows split by desktop/mobile.
- Validate each row renders baseline, actual, and slider diff correctly from generated artifacts.
- Spot-check known case petstore-molecules-petcard--available in the new report against current Playwright snapshot naming.

**Decisions**

- Expected side: in-repo Playwright baseline snapshots first.
- Viewports: separate rows per viewport.
- Tree scope: include all Storybook groups, with atomic levels when present.
- Delivery: local generated static report first.
- Future-ready: keep expected-source adapter boundary so a remote/service baseline can be plugged in later without redesign.
