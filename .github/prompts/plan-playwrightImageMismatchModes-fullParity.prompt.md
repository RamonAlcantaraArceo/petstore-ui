Follow-up command prompt: Playwright image-mismatch full parity

Implement Playwright-like image mismatch viewing modes in the custom visual report, matching behavior and UX as closely as practical for:

- Diff
- Actual
- Expected
- Side by Side
- Slider

Scope

- Build on the existing custom report implementation.
- Keep current filtering, navigation, and sticky controls intact.
- Do not introduce unrelated UI features.

Implementation targets

- public/visual-report/app.js
- public/visual-report/style.css
- scripts/generate-visual-report.ts

Requirements

1. Data model
   - Extend report variant assets to include optional `diff`.
   - Preserve existing `expected` and `actual` fields.
   - Keep backward compatibility for report entries missing `diff`.

2. Asset ingestion
   - Detect/copy `*-diff.png` artifacts when available during report generation.
   - Normalize output paths exactly like existing expected/actual asset handling.

3. Variant comparison modes
   - Add per-variant mode controls with 5 options: Diff, Actual, Expected, Side by Side, Slider.
   - Keep mode state per variant card (switching one card must not change others).
   - Default to `Slider` unless a better existing convention is already present in code.

4. Mode rendering behavior
   - Diff: render diff image only.
   - Actual: render actual image only.
   - Expected: render expected image only.
   - Side by Side: render expected and actual in two aligned panes.
   - Slider: reuse current slider implementation.

5. Missing asset handling
   - Keep all 5 mode controls visible even when one asset is missing.
   - For missing assets, show a consistent in-panel empty state message.
   - Do not break layout when `diff` is absent (common for passing tests).

6. Accessibility
   - Implement tab-style semantics for mode controls: tablist/tab with `aria-selected`.
   - Include keyboard navigation for controls (Arrow keys, Home, End).
   - Preserve focus visibility and screen-reader clarity.

7. Styling
   - Match current report visual language and spacing.
   - Keep slider and image containers responsive.
   - Ensure side-by-side remains readable within current content width.

Acceptance criteria

- Failed variants can switch among all 5 modes with correct images.
- Passed variants show graceful fallback where diff is unavailable.
- Slider mode remains fully functional and responsive.
- No regressions to existing sidebar/filter behavior.
- Report build succeeds and renders without JS errors.

Validation

1. Run: bun run report:visual:build
2. Open generated custom report and verify at least:
   - one failing variant
   - one passing variant
   - one variant on desktop and mobile viewports
3. Confirm keyboard behavior on mode controls.
4. Confirm no console errors while switching modes.

Constraints

- Prefer minimal, focused changes.
- Do not refactor unrelated report code.
- Keep naming/style consistent with existing files.
