# Visual Report Migration Notes

## Summary

The visual report UI has been migrated from imperative DOM rendering in `public/visual-report/app.js` to typed React + TypeScript components organized by atomic design:

- Atoms: status badge/chip and filter button
- Molecules: filter bar, tree label, mode controls, image/sider panels
- Organisms: component tree, variant card, report app shell

The static route `/visual-report/` is now bootstrapped from `src/visual-report/bootstrap.tsx` and bundled during `bun run report:visual:build`.

## Old-to-New Function Mapping

- `renderFilters` -> `VisualFilterBar`
- `createStatusBadge` -> `VisualStatusBadge`
- `createTreeStatusChips` / `createTreeLabel` -> `VisualStatusChip` + `VisualTreeLabel`
- `createModeControls` -> `VisualModeControls`
- `createImagePanel` / `createSideBySide` / `createSlider` -> `VisualImagePanel` + `VisualComparisonPanel` + `VisualSliderCompare`
- `renderTree` -> `VisualComponentTree`
- `renderVariants` -> `VisualReportApp` + `VisualVariantCard`

## Data Contract

`public/visual-report/data.json` contract remains unchanged. New model helpers in `src/visual-report/model.ts` adapt and group data without changing incoming shape.

## Behavior Parity Notes

- Status filtering keeps `All` reset + multi-select semantics.
- Selecting `Passed` then `Failed` keeps both active.
- Tree selection and filtered variant counts remain synced.
- Comparison mode tabs preserve availability logic (`Diff` disabled for passed variants).
- Accessibility labels and keyboard tablist navigation are preserved and improved in typed components.

## Files Retained

- `public/visual-report/style.css` remains in repo for backward compatibility reference.
- `public/visual-report/index.html` is retained but simplified to React mount root.

## Tradeoffs

- Slider comparison implementation is React state-based and simpler than the old pixel-sizing approach, while preserving core horizontal/vertical behavior.
- Styling now uses design tokens from `theme.ts` instead of ad-hoc static CSS values.
