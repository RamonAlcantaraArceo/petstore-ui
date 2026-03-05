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
