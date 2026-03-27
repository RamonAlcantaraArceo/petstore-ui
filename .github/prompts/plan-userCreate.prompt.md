## Plan: Add User Creation Feature to UI

Add a user creation feature to the Petstore UI, following atomic design, i18n, a11y, and testing conventions. This will allow users to create new accounts via the UI, with proper validation, accessibility, and documentation.

**Steps**

### Phase 1: Design & API Integration

1. **API Client**
   - Use the existing POST createUser in the userApi Client in [src/services/userApi.ts](../../src/services/userApi.ts) to create new users.
   - Status: Completed. The existing `createUser` wrapper in `src/services/userApi.ts` is already wired for POST `/user`, and coverage was added in `src/services/userApi.test.ts`.

2. **i18n**
   - Add translation keys for user creation (labels, errors, success messages) in [src/i18n/locales/en.ts](../../src/i18n/locales/en.ts) and [src/i18n/locales/chef.ts](../../src/i18n/locales/chef.ts).
   - Update i18n types/registry if needed.
   - Status: Completed. User creation keys are present in English and Chef, including the optional `firstName`, `lastName`, and `phone` field labels; no i18n registry/type updates were required.

### Phase 2: Component Implementation

3. **Atoms**
   - Reuse existing `Input`, `Button`, and `FormField` atoms for the form fields.

4. **Molecule: UserForm**
   - Use the `UserForm` molecule in [src/components/molecules/UserForm.tsx](../../src/components/molecules/UserForm.tsx).
   - Integrate i18n and a11y hooks.
   - Show error/success messages.
   - Support keyboard navigation and screen reader announcements.

5. **Organism: UserManagementView**
   - Update or extend the `UserManagementView` organism in [src/components/organisms/UserManagementView.tsx](../../src/components/organisms/UserManagementView.tsx) to include the user creation form.
   - Add or verify a "Create User" button that opens the form (modal).
   - The button "Create user" should be visible only when a user is not logged in, and hidden when a user is logged in. This can be achieved by checking the authentication state in the component and conditionally rendering the button based on that state. The authentication can also be validated if the proper cookie is present in the request headers, which indicates that the user is logged in. This way, we can ensure that only unauthenticated users see the "Create user" button, while authenticated users do not have access to it.

### Phase 3: UI Integration & Storybook

6. **Page Integration**
   - Update the Users page to display the user creation feature, ensuring layout consistency.

7. **Storybook**
   - Add or extend stories for `UserForm` and updated `UserManagementView` in [src/stories/](../../src/stories/).
   - Include locale switching and a11y showcases.

### Phase 4: Testing

8. **Unit Tests**
   - Add tests for `createUser` API function ([src/services/apiClient.test.ts](../../src/services/apiClient.test.ts)).
   - Add tests for `UserCreateForm` (validation, i18n, a11y, submission).
   - Add integration tests for `UserManagement` with user creation.
   - Phase 1 matching status: Completed for API/i18n coverage. Added `createUser` service tests in `src/services/userApi.test.ts` and expanded locale key coverage in `src/testing/a11y-i18n.test.tsx`.

9. **Accessibility & i18n Tests**
   - Use a11y and i18n testing utilities to validate compliance and locale support.

### Phase 5: Documentation & Verification

10. **Documentation**
    - Update README and component JSDoc with usage, props, a11y, and i18n details.

11. **Verification**
    - Run lint, type-check, and test commands.
    - Validate Storybook stories for all locales and a11y.
    - Manual UI check for user creation flow.

**Relevant files**

- `src/services/apiClient.ts` — Add `createUser` API function
- `src/i18n/locales/en.ts`, `src/i18n/locales/chef.ts` — Add translation keys
- `src/components/molecules/UserCreateForm.tsx` — New molecule
- `src/components/organisms/UserManagement.tsx` — Update for user creation
- `src/stories/UserCreateForm.stories.tsx`, `src/stories/UserManagement.stories.tsx` — Add/extend stories
- `src/services/apiClient.test.ts`, `src/components/molecules/UserCreateForm.test.tsx`, `src/components/organisms/UserManagement.test.tsx` — Add/extend tests

**Verification**

1. All new and updated tests pass (`bun run test`)
2. TypeScript strict mode passes (`bun run type-check`)
3. Lint passes (`bun run lint`)
4. Storybook stories render correctly with locale switching and a11y features (`bun run storybook`)
5. Manual UI test: user can create a new user, errors and success are handled, a11y and i18n work

**Decisions**

- Use modal or inline form for user creation (recommend modal for clarity)
- Follow atomic design: molecule for form, organism for management
- All text via i18n keys, no hardcoded strings
- Full a11y and keyboard support

**Further Considerations**

1. Should email be required or optional? (Recommend optional for MVP)
2. Should password strength validation be included? (Recommend basic validation for now)
3. Should user creation auto-login or just show success? (Recommend just show success for now)

Let me know if you want to adjust any details or proceed with this plan!
