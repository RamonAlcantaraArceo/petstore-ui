**Reusable Prompt**
-Use this as a copy/paste command in Copilot Chat later (best with @workspace context):

You are an expert React + TypeScript refactoring agent working in this repository.  
Goal: Refactor the visual report tool into proper Storybook-first, testable, documented, reusable UI architecture while preserving current behavior.

Project context:

- Monorepo: petstore-ui
- Current visual report implementation is static and imperative in app.js and style.css
- Storybook and component system live under components, stories, .storybook, and theme.ts
- i18n utilities in i18n
- accessibility utilities in accessibility
- testing helpers in testing

Primary outcomes:

1. Extract visual report UI into reusable React + TypeScript components using atomic design conventions.
2. Replace ad-hoc styling with design-token-aligned styling approach.
3. Add Storybook stories for every extracted component and key composed views.
4. Add unit tests (including accessibility and i18n coverage) for core components and filter logic.
5. Keep the visual report feature behavior identical unless explicitly improved for accessibility/documentation.
6. Keep implementation incremental and reviewable via small commits/PR sections.

Behavior that must be preserved:

- Status filter supports All + multi-select statuses.
- Selecting Passed then Failed shows both.
- All resets status selection to show all variants.
- Top filters include status icons and counts.
- Existing variant view modes and tree navigation behavior remain intact.

Execution requirements:

- First, inspect current behavior and identify UI boundaries to extract:
  - Filter bar
  - Status badge/chips
  - Component tree nodes and group sections
  - Variant card header/body
  - Mode controls
  - Image panel modes (diff, actual, expected, side-by-side, slider)
- Propose and implement a target component map (atoms, molecules, organisms) before coding.
- Use strict TypeScript types for report data model and component props.
- Ensure keyboard and screen reader accessibility parity or improvements.
- Integrate i18n-ready labels (translation keys where practical).
- Do not add unrelated features or redesigns.
- Do not hardcode new color tokens outside established theme patterns.
- Do not break existing report data contract.

Suggested destination structure:

- atoms
- molecules
- organisms
- stories
- testing
- Optional adapter/bootstrap layer to connect report JSON data to new components

Deliverables:

- Refactored components with typed props and exports
- Storybook stories with controls and docs for each component
- Tests for:
  - filter state transitions
  - rendering by status
  - keyboard interactions
  - accessibility audit checks
- Migration notes documenting:
  - old files replaced/retained
  - mapping from old imperative functions to new components
  - any behavior-preserving tradeoffs

Acceptance criteria:

- Storybook build succeeds.
- Type check succeeds.
- Lint succeeds (or only pre-existing warnings unchanged).
- Tests for new components pass.
- Manual parity checks confirm no regressions in filtering, tree selection, and variant mode switching.

Process constraints:

- Work in phases and report progress after each phase:
  Phase 1: data model and component architecture plan  
  Phase 2: extract atoms/molecules  
  Phase 3: extract organisms and integrate  
  Phase 4: stories and docs  
  Phase 5: tests and accessibility validation  
  Phase 6: cleanup and migration summary
- Keep changes focused; avoid unrelated refactors.
- Do not commit unless explicitly asked.

Output format expected from you:

1. Proposed component architecture
2. File-by-file change plan
3. Implementation
4. Validation results (typecheck/lint/tests/build)
5. Short migration summary with next steps

If blockers appear (tooling/version mismatch, missing helpers, or architecture conflicts), provide the minimal unblock plan and continue with the best safe alternative.

**Optional Short Variant**
-Want a shorter “MVP refactor prompt” version too? I can generate a compact one for quick runs.
