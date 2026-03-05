## Plan: Playwright-style mismatch views

The goal is to make the custom visual report match Playwright’s “Image mismatch” comparison modes, not just slider. The existing UI already has robust slider behavior in [public/visual-report/app.js](public/visual-report/app.js), and the generator already copies expected/actual assets via [scripts/generate-visual-report.ts](scripts/generate-visual-report.ts), so the smallest safe path is to extend the data model with optional `diff`, then add a per-variant comparison mode UI that renders five modes: Diff, Actual, Expected, Side by Side, Slider. This preserves current triage flow and avoids changing test execution logic.

**Steps**

1. Extend report data schema to include optional `diff` on each variant in [scripts/generate-visual-report.ts](scripts/generate-visual-report.ts) (`VariantAsset`, `buildVariantAsset`) and keep `expected`/`actual` behavior unchanged.
2. Add attachment discovery for `*-diff.png` (when present) during generation in [scripts/generate-visual-report.ts](scripts/generate-visual-report.ts), copying to report assets with the same public URL normalization path used today.
3. Add per-variant comparison mode state in [public/visual-report/app.js](public/visual-report/app.js) so each card remembers selected mode independently.
4. Replace the current single slider-only content in [public/visual-report/app.js](public/visual-report/app.js) with a mode switcher rendering:
   - `Diff`: single diff image
   - `Actual`: single actual image
   - `Expected`: single expected image
   - `Side by Side`: expected + actual two-column layout
   - `Slider`: reuse existing `createSlider`
5. Implement tab-like controls and panel styling in [public/visual-report/style.css](public/visual-report/style.css) with sticky-header compatibility and consistent spacing with existing report UI.
6. Add robust empty-state rendering per mode in [public/visual-report/app.js](public/visual-report/app.js) for missing assets (especially `diff` on passing tests) so behavior is predictable and never breaks layout.
7. Add keyboard-accessible tab semantics (`role=tablist/tab`, `aria-selected`, Arrow/Home/End navigation) in [public/visual-report/app.js](public/visual-report/app.js), following the interaction pattern used by `Tabs` in [src/components/atoms/Tabs.tsx](src/components/atoms/Tabs.tsx).

**Verification**

- Build report data/assets: `bun run report:visual:build`.
- Open generated report and validate each mode on failed and passed variants:
  - Failed variant shows all five with valid images.
  - Passed variant shows `Actual`/`Expected`/`Slider` and graceful empty `Diff`.
- Run triage script end-to-end: `bun run report:visual:triage:petstore-atoms`.
- Spot-check keyboard behavior on mode controls (Tab focus, Arrow/Home/End switch).

**Decisions**

- Keep tabs visible even when an asset is missing, and show explicit per-mode empty states for parity and clarity.
- Reuse existing slider implementation to minimize risk; only wrap it as one of the five selectable modes.
- Derive `diff` from Playwright artifacts during report generation rather than modifying Playwright test assertions further.

====

Follow-up command prompt: slider interaction refinement

Update the custom visual report slider so the actionable slider control is the in-image horizontal control area (not a separate full-width bar below the panel).

Scope

- Only adjust slider interaction/layout behavior.
- Do not change report data model, filtering, or tab/mode logic.

Implementation targets

- [public/visual-report/app.js](public/visual-report/app.js)
- [public/visual-report/style.css](public/visual-report/style.css)

Requirements

1. Move the range input control into the image slider container so interaction width is constrained to rendered image width.
2. Keep existing slider math and resize behavior intact (`applySlider` / `updateLayout`).
3. Make the over-image slider area the actionable control.
4. Preserve the current divider behavior and visual alignment.
5. Add/keep keyboard accessibility for the range input and include an explicit accessible label.
6. Remove old below-image full-width slider styling so it no longer appears.

Acceptance criteria

- The interactive slider region does not extend beyond the image width.
- Drag/click on the image slider area updates the reveal position correctly.
- Keyboard controls still work (arrow keys, Home/End).
- Behavior remains correct after viewport resize.
- No regressions in current visual report layout.

Validation

- Run: `bun run report:visual:build`
- Open the generated report and verify at least one mismatch card:
  - slider is constrained to image width
  - divider tracks correctly
  - keyboard interaction works
