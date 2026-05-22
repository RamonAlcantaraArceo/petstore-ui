# Source-to-package mapping

| from | to | reason |
|---|---|---|
| `src/accessibility/hooks.ts` | `packages/atoms/src/accessibility/hooks.ts` | entrypoint ownership (atoms) via packages/atoms/src/index.ts -> ../../../src/accessibility |
| `src/accessibility/index.ts` | `packages/atoms/src/accessibility/index.ts` | entrypoint ownership (atoms) via packages/atoms/src/index.ts -> ../../../src/accessibility |
| `src/accessibility/types.ts` | `packages/atoms/src/accessibility/types.ts` | entrypoint ownership (atoms) via packages/atoms/src/index.ts -> ../../../src/accessibility |
| `src/accessibility/utils.ts` | `packages/atoms/src/accessibility/utils.ts` | entrypoint ownership (atoms) via packages/atoms/src/index.ts -> ../../../src/accessibility |
| `src/components/atoms/Badge.test.tsx` | `packages/atoms/src/components/atoms/Badge.test.tsx` | entrypoint ownership (atoms) via packages/atoms/src/index.ts -> ../../../src/components/atoms/Badge |
| `src/components/atoms/Badge.tsx` | `packages/atoms/src/components/atoms/Badge.tsx` | entrypoint ownership (atoms) via packages/atoms/src/index.ts -> ../../../src/components/atoms/Badge |
| `src/components/atoms/Button.stories.tsx` | `packages/atoms/src/components/atoms/Button.stories.tsx` | entrypoint ownership (atoms) via packages/atoms/src/index.ts -> ../../../src/components/atoms/Button |
| `src/components/atoms/Button.test.tsx` | `packages/atoms/src/components/atoms/Button.test.tsx` | entrypoint ownership (atoms) via packages/atoms/src/index.ts -> ../../../src/components/atoms/Button |
| `src/components/atoms/Button.tsx` | `packages/atoms/src/components/atoms/Button.tsx` | entrypoint ownership (atoms) via packages/atoms/src/index.ts -> ../../../src/components/atoms/Button |
| `src/components/atoms/Card.tsx` | `packages/atoms/src/components/atoms/Card.tsx` | entrypoint ownership (atoms) via packages/atoms/src/index.ts -> ../../../src/components/atoms/Card |
| `src/components/atoms/index.ts` | `packages/atoms/src/components/atoms/index.ts` | atoms package ownership |
| `src/components/atoms/Input.test.tsx` | `packages/atoms/src/components/atoms/Input.test.tsx` | entrypoint ownership (atoms) via packages/atoms/src/index.ts -> ../../../src/components/atoms/Input |
| `src/components/atoms/Input.tsx` | `packages/atoms/src/components/atoms/Input.tsx` | entrypoint ownership (atoms) via packages/atoms/src/index.ts -> ../../../src/components/atoms/Input |
| `src/components/atoms/Modal.stories.tsx` | `packages/atoms/src/components/atoms/Modal.stories.tsx` | entrypoint ownership (atoms) via packages/atoms/src/index.ts -> ../../../src/components/atoms/Modal |
| `src/components/atoms/Modal.test.tsx` | `packages/atoms/src/components/atoms/Modal.test.tsx` | entrypoint ownership (atoms) via packages/atoms/src/index.ts -> ../../../src/components/atoms/Modal |
| `src/components/atoms/Modal.tsx` | `packages/atoms/src/components/atoms/Modal.tsx` | entrypoint ownership (atoms) via packages/atoms/src/index.ts -> ../../../src/components/atoms/Modal |
| `src/components/atoms/Select.tsx` | `packages/atoms/src/components/atoms/Select.tsx` | entrypoint ownership (atoms) via packages/atoms/src/index.ts -> ../../../src/components/atoms/Select |
| `src/components/atoms/Table.tsx` | `packages/atoms/src/components/atoms/Table.tsx` | entrypoint ownership (atoms) via packages/atoms/src/index.ts -> ../../../src/components/atoms/Table |
| `src/components/atoms/Tabs.tsx` | `packages/atoms/src/components/atoms/Tabs.tsx` | entrypoint ownership (atoms) via packages/atoms/src/index.ts -> ../../../src/components/atoms/Tabs |
| `src/components/atoms/VisualFilterButton.tsx` | `packages/visual-reporter/src/components/atoms/VisualFilterButton.tsx` | entrypoint ownership (visual-reporter) via packages/visual-reporter/src/index.ts -> ../../../src/components/atoms/VisualFilterButton |
| `src/components/atoms/VisualStatusBadge.tsx` | `packages/visual-reporter/src/components/atoms/VisualStatusBadge.tsx` | entrypoint ownership (visual-reporter) via packages/visual-reporter/src/index.ts -> ../../../src/components/atoms/VisualStatusBadge |
| `src/components/atoms/VisualStatusChip.tsx` | `packages/visual-reporter/src/components/atoms/VisualStatusChip.tsx` | entrypoint ownership (visual-reporter) via packages/visual-reporter/src/index.ts -> ../../../src/components/atoms/VisualStatusChip |
| `src/components/molecules/ConfirmDialog.tsx` | `packages/app/src/components/molecules/ConfirmDialog.tsx` | entrypoint ownership (app) via packages/app/src/index.ts -> ../../../src/components/molecules/ConfirmDialog |
| `src/components/molecules/LoginForm.tsx` | `packages/app/src/components/molecules/LoginForm.tsx` | entrypoint ownership (app) via packages/app/src/index.ts -> ../../../src/components/molecules/LoginForm |
| `src/components/molecules/OrderCard.tsx` | `packages/app/src/components/molecules/OrderCard.tsx` | entrypoint ownership (app) via packages/app/src/index.ts -> ../../../src/components/molecules/OrderCard |
| `src/components/molecules/OrderForm.tsx` | `packages/app/src/components/molecules/OrderForm.tsx` | entrypoint ownership (app) via packages/app/src/index.ts -> ../../../src/components/molecules/OrderForm |
| `src/components/molecules/PetCard.test.tsx` | `packages/app/src/components/molecules/PetCard.test.tsx` | entrypoint ownership (app) via packages/app/src/index.ts -> ../../../src/components/molecules/PetCard |
| `src/components/molecules/PetCard.tsx` | `packages/app/src/components/molecules/PetCard.tsx` | entrypoint ownership (app) via packages/app/src/index.ts -> ../../../src/components/molecules/PetCard |
| `src/components/molecules/PetForm.tsx` | `packages/app/src/components/molecules/PetForm.tsx` | entrypoint ownership (app) via packages/app/src/index.ts -> ../../../src/components/molecules/PetForm |
| `src/components/molecules/StatusFilter.tsx` | `packages/app/src/components/molecules/StatusFilter.tsx` | entrypoint ownership (app) via packages/app/src/index.ts -> ../../../src/components/molecules/StatusFilter |
| `src/components/molecules/UserCard.tsx` | `packages/app/src/components/molecules/UserCard.tsx` | entrypoint ownership (app) via packages/app/src/index.ts -> ../../../src/components/molecules/UserCard |
| `src/components/molecules/UserForm.test.tsx` | `packages/app/src/components/molecules/UserForm.test.tsx` | entrypoint ownership (app) via packages/app/src/index.ts -> ../../../src/components/molecules/UserForm |
| `src/components/molecules/UserForm.tsx` | `packages/app/src/components/molecules/UserForm.tsx` | entrypoint ownership (app) via packages/app/src/index.ts -> ../../../src/components/molecules/UserForm |
| `src/components/molecules/VisualComparisonPanel.tsx` | `packages/visual-reporter/src/components/molecules/VisualComparisonPanel.tsx` | entrypoint ownership (visual-reporter) via packages/visual-reporter/src/index.ts -> ../../../src/components/molecules/VisualComparisonPanel |
| `src/components/molecules/VisualFilterBar.tsx` | `packages/visual-reporter/src/components/molecules/VisualFilterBar.tsx` | entrypoint ownership (visual-reporter) via packages/visual-reporter/src/index.ts -> ../../../src/components/molecules/VisualFilterBar |
| `src/components/molecules/VisualImagePanel.tsx` | `packages/visual-reporter/src/components/molecules/VisualImagePanel.tsx` | entrypoint ownership (visual-reporter) via packages/visual-reporter/src/index.ts -> ../../../src/components/molecules/VisualImagePanel |
| `src/components/molecules/VisualModeControls.test.tsx` | `packages/visual-reporter/src/components/molecules/VisualModeControls.test.tsx` | entrypoint ownership (visual-reporter) via packages/visual-reporter/src/index.ts -> ../../../src/components/molecules/VisualModeControls |
| `src/components/molecules/VisualModeControls.tsx` | `packages/visual-reporter/src/components/molecules/VisualModeControls.tsx` | entrypoint ownership (visual-reporter) via packages/visual-reporter/src/index.ts -> ../../../src/components/molecules/VisualModeControls |
| `src/components/molecules/VisualSliderCompare.tsx` | `packages/visual-reporter/src/components/molecules/VisualSliderCompare.tsx` | entrypoint ownership (visual-reporter) via packages/visual-reporter/src/index.ts -> ../../../src/components/molecules/VisualSliderCompare |
| `src/components/molecules/VisualTreeLabel.tsx` | `packages/visual-reporter/src/components/molecules/VisualTreeLabel.tsx` | entrypoint ownership (visual-reporter) via packages/visual-reporter/src/index.ts -> ../../../src/components/molecules/VisualTreeLabel |
| `src/components/organisms/AppNavigation.test.tsx` | `packages/app/src/components/organisms/AppNavigation.test.tsx` | entrypoint ownership (app) via packages/app/src/index.ts -> ../../../src/components/organisms/AppNavigation |
| `src/components/organisms/AppNavigation.tsx` | `packages/app/src/components/organisms/AppNavigation.tsx` | entrypoint ownership (app) via packages/app/src/index.ts -> ../../../src/components/organisms/AppNavigation |
| `src/components/organisms/PetManagementView.stories.tsx` | `packages/app/src/components/organisms/PetManagementView.stories.tsx` | entrypoint ownership (app) via packages/app/src/index.ts -> ../../../src/components/organisms/PetManagementView |
| `src/components/organisms/PetManagementView.tsx` | `packages/app/src/components/organisms/PetManagementView.tsx` | entrypoint ownership (app) via packages/app/src/index.ts -> ../../../src/components/organisms/PetManagementView |
| `src/components/organisms/PetstoreApp.tsx` | `packages/app/src/components/organisms/PetstoreApp.tsx` | entrypoint ownership (app) via packages/app/src/index.ts -> ../../../src/components/organisms/PetstoreApp |
| `src/components/organisms/StoreOrdersView.stories.tsx` | `packages/app/src/components/organisms/StoreOrdersView.stories.tsx` | entrypoint ownership (app) via packages/app/src/index.ts -> ../../../src/components/organisms/StoreOrdersView |
| `src/components/organisms/StoreOrdersView.tsx` | `packages/app/src/components/organisms/StoreOrdersView.tsx` | entrypoint ownership (app) via packages/app/src/index.ts -> ../../../src/components/organisms/StoreOrdersView |
| `src/components/organisms/UserManagementView.stories.tsx` | `packages/app/src/components/organisms/UserManagementView.stories.tsx` | entrypoint ownership (app) via packages/app/src/index.ts -> ../../../src/components/organisms/UserManagementView |
| `src/components/organisms/UserManagementView.tsx` | `packages/app/src/components/organisms/UserManagementView.tsx` | entrypoint ownership (app) via packages/app/src/index.ts -> ../../../src/components/organisms/UserManagementView |
| `src/components/organisms/VisualComponentTree.tsx` | `packages/visual-reporter/src/components/organisms/VisualComponentTree.tsx` | entrypoint ownership (visual-reporter) via packages/visual-reporter/src/index.ts -> ../../../src/components/organisms/VisualComponentTree |
| `src/components/organisms/VisualReportApp.test.tsx` | `packages/visual-reporter/src/components/organisms/VisualReportApp.test.tsx` | entrypoint ownership (visual-reporter) via packages/visual-reporter/src/index.ts -> ../../../src/components/organisms/VisualReportApp |
| `src/components/organisms/VisualReportApp.tsx` | `packages/visual-reporter/src/components/organisms/VisualReportApp.tsx` | entrypoint ownership (visual-reporter) via packages/visual-reporter/src/index.ts -> ../../../src/components/organisms/VisualReportApp |
| `src/components/organisms/VisualVariantCard.test.tsx` | `packages/visual-reporter/src/components/organisms/VisualVariantCard.test.tsx` | entrypoint ownership (visual-reporter) via packages/visual-reporter/src/index.ts -> ../../../src/components/organisms/VisualVariantCard |
| `src/components/organisms/VisualVariantCard.tsx` | `packages/visual-reporter/src/components/organisms/VisualVariantCard.tsx` | entrypoint ownership (visual-reporter) via packages/visual-reporter/src/index.ts -> ../../../src/components/organisms/VisualVariantCard |
| `src/context/AuthContext.tsx` | `packages/app/src/context/AuthContext.tsx` | entrypoint ownership (app) via packages/app/src/index.ts -> ../../../src/context |
| `src/context/index.ts` | `packages/app/src/context/index.ts` | entrypoint ownership (app) via packages/app/src/index.ts -> ../../../src/context |
| `src/i18n/context.tsx` | `packages/atoms/src/i18n/context.tsx` | entrypoint ownership (atoms) via packages/atoms/src/index.ts -> ../../../src/i18n |
| `src/i18n/index.ts` | `packages/atoms/src/i18n/index.ts` | entrypoint ownership (atoms) via packages/atoms/src/index.ts -> ../../../src/i18n |
| `src/i18n/locales/chef.ts` | `packages/atoms/src/i18n/locales/chef.ts` | entrypoint ownership (atoms) via packages/atoms/src/index.ts -> ../../../src/i18n |
| `src/i18n/locales/debug.ts` | `packages/atoms/src/i18n/locales/debug.ts` | entrypoint ownership (atoms) via packages/atoms/src/index.ts -> ../../../src/i18n |
| `src/i18n/locales/en.ts` | `packages/atoms/src/i18n/locales/en.ts` | entrypoint ownership (atoms) via packages/atoms/src/index.ts -> ../../../src/i18n |
| `src/i18n/registry.ts` | `packages/atoms/src/i18n/registry.ts` | entrypoint ownership (atoms) via packages/atoms/src/index.ts -> ../../../src/i18n |
| `src/i18n/types.ts` | `packages/atoms/src/i18n/types.ts` | entrypoint ownership (atoms) via packages/atoms/src/index.ts -> ../../../src/i18n |
| `src/petstore/index.tsx` | `packages/app/src/petstore/index.tsx` | app package ownership |
| `src/services/apiClient.test.ts` | `packages/app/src/services/apiClient.test.ts` | app package ownership |
| `src/services/apiClient.ts` | `packages/app/src/services/apiClient.ts` | app package ownership |
| `src/services/petApi.test.ts` | `packages/app/src/services/petApi.test.ts` | app package ownership |
| `src/services/petApi.ts` | `packages/app/src/services/petApi.ts` | app package ownership |
| `src/services/storeApi.test.ts` | `packages/app/src/services/storeApi.test.ts` | app package ownership |
| `src/services/storeApi.ts` | `packages/app/src/services/storeApi.ts` | app package ownership |
| `src/services/testSetup.ts` | `packages/app/src/services/testSetup.ts` | app package ownership |
| `src/services/types.ts` | `packages/app/src/services/types.ts` | app package ownership |
| `src/services/userApi.test.ts` | `packages/app/src/services/userApi.test.ts` | app package ownership |
| `src/services/userApi.ts` | `packages/app/src/services/userApi.ts` | app package ownership |
| `src/stories/base/Button.stories.tsx` | `packages/atoms/src/stories/base/Button.stories.tsx` | atoms package ownership |
| `src/stories/base/Card.stories.tsx` | `packages/atoms/src/stories/base/Card.stories.tsx` | atoms package ownership |
| `src/stories/base/Input.stories.tsx` | `packages/atoms/src/stories/base/Input.stories.tsx` | atoms package ownership |
| `src/stories/petstore/AppNavigation.stories.tsx` | `packages/app/src/stories/petstore/AppNavigation.stories.tsx` | app package ownership |
| `src/stories/petstore/Badge.stories.tsx` | `packages/app/src/stories/petstore/Badge.stories.tsx` | app package ownership |
| `src/stories/petstore/ConfirmDialog.stories.tsx` | `packages/app/src/stories/petstore/ConfirmDialog.stories.tsx` | app package ownership |
| `src/stories/petstore/LoginForm.stories.tsx` | `packages/app/src/stories/petstore/LoginForm.stories.tsx` | app package ownership |
| `src/stories/petstore/Modal.stories.tsx` | `packages/app/src/stories/petstore/Modal.stories.tsx` | app package ownership |
| `src/stories/petstore/OrderCard.stories.tsx` | `packages/app/src/stories/petstore/OrderCard.stories.tsx` | app package ownership |
| `src/stories/petstore/OrderForm.stories.tsx` | `packages/app/src/stories/petstore/OrderForm.stories.tsx` | app package ownership |
| `src/stories/petstore/PetCard.stories.tsx` | `packages/app/src/stories/petstore/PetCard.stories.tsx` | app package ownership |
| `src/stories/petstore/PetForm.stories.tsx` | `packages/app/src/stories/petstore/PetForm.stories.tsx` | app package ownership |
| `src/stories/petstore/PetManagementView.stories.tsx` | `packages/app/src/stories/petstore/PetManagementView.stories.tsx` | app package ownership |
| `src/stories/petstore/PetstoreApp.stories.tsx` | `packages/app/src/stories/petstore/PetstoreApp.stories.tsx` | app package ownership |
| `src/stories/petstore/Select.stories.tsx` | `packages/app/src/stories/petstore/Select.stories.tsx` | app package ownership |
| `src/stories/petstore/StatusFilter.stories.tsx` | `packages/app/src/stories/petstore/StatusFilter.stories.tsx` | app package ownership |
| `src/stories/petstore/StoreOrdersView.stories.tsx` | `packages/app/src/stories/petstore/StoreOrdersView.stories.tsx` | app package ownership |
| `src/stories/petstore/Table.stories.tsx` | `packages/app/src/stories/petstore/Table.stories.tsx` | app package ownership |
| `src/stories/petstore/Tabs.stories.tsx` | `packages/app/src/stories/petstore/Tabs.stories.tsx` | app package ownership |
| `src/stories/petstore/UserCard.stories.tsx` | `packages/app/src/stories/petstore/UserCard.stories.tsx` | app package ownership |
| `src/stories/petstore/UserForm.stories.tsx` | `packages/app/src/stories/petstore/UserForm.stories.tsx` | app package ownership |
| `src/stories/petstore/UserManagementView.stories.tsx` | `packages/app/src/stories/petstore/UserManagementView.stories.tsx` | app package ownership |
| `src/stories/visual-report/fixtures.ts` | `packages/visual-reporter/src/stories/visual-report/fixtures.ts` | visual-reporter package ownership |
| `src/stories/visual-report/VisualComponentTree.stories.tsx` | `packages/visual-reporter/src/stories/visual-report/VisualComponentTree.stories.tsx` | visual-reporter package ownership |
| `src/stories/visual-report/VisualFilterBar.stories.tsx` | `packages/visual-reporter/src/stories/visual-report/VisualFilterBar.stories.tsx` | visual-reporter package ownership |
| `src/stories/visual-report/VisualReportApp.stories.tsx` | `packages/visual-reporter/src/stories/visual-report/VisualReportApp.stories.tsx` | visual-reporter package ownership |
| `src/stories/visual-report/VisualVariantCard.stories.tsx` | `packages/visual-reporter/src/stories/visual-report/VisualVariantCard.stories.tsx` | visual-reporter package ownership |
| `src/testing/a11y-i18n.test.tsx` | `packages/shared/src/testing/a11y-i18n.test.tsx` | shared fallback (cross-package utility/aggregator) |
| `src/testing/a11y-utils.ts` | `packages/shared/src/testing/a11y-utils.ts` | shared fallback (cross-package utility/aggregator) |
| `src/testing/i18n-utils.tsx` | `packages/shared/src/testing/i18n-utils.tsx` | shared fallback (cross-package utility/aggregator) |
| `src/testing/index.ts` | `packages/shared/src/testing/index.ts` | shared fallback (cross-package utility/aggregator) |
| `src/testing/runtime-config-utils.ts` | `packages/shared/src/testing/runtime-config-utils.ts` | shared fallback (cross-package utility/aggregator) |
| `src/testing/test-patterns.tsx` | `packages/shared/src/testing/test-patterns.tsx` | shared fallback (cross-package utility/aggregator) |
| `src/testing/workspace-packages.test.ts` | `packages/shared/src/testing/workspace-packages.test.ts` | shared fallback (cross-package utility/aggregator) |
| `src/tokens/theme.ts` | `packages/atoms/src/tokens/theme.ts` | entrypoint ownership (atoms) via packages/atoms/src/index.ts -> ../../../src/tokens/theme |
| `src/visual-report/assets.ts` | `packages/visual-reporter/src/visual-report/assets.ts` | entrypoint ownership (visual-reporter) via packages/visual-reporter/src/index.ts -> ../../../src/visual-report/assets |
| `src/visual-report/bootstrap.test.tsx` | `packages/visual-reporter/src/visual-report/bootstrap.test.tsx` | visual-reporter package ownership |
| `src/visual-report/bootstrap.tsx` | `packages/visual-reporter/src/visual-report/bootstrap.tsx` | visual-reporter package ownership |
| `src/visual-report/constants.ts` | `packages/visual-reporter/src/visual-report/constants.ts` | entrypoint ownership (visual-reporter) via packages/visual-reporter/src/index.ts -> ../../../src/visual-report/constants |
| `src/visual-report/model.test.ts` | `packages/visual-reporter/src/visual-report/model.test.ts` | entrypoint ownership (visual-reporter) via packages/visual-reporter/src/index.ts -> ../../../src/visual-report/model |
| `src/visual-report/model.ts` | `packages/visual-reporter/src/visual-report/model.ts` | entrypoint ownership (visual-reporter) via packages/visual-reporter/src/index.ts -> ../../../src/visual-report/model |
| `src/visual-report/styles.ts` | `packages/visual-reporter/src/visual-report/styles.ts` | visual-reporter package ownership |
| `src/visual-report/types.ts` | `packages/visual-reporter/src/visual-report/types.ts` | entrypoint ownership (visual-reporter) via packages/visual-reporter/src/index.ts -> ../../../src/visual-report/types |
