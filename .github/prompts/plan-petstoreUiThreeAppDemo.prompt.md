# Plan: Petstore UI — 3-App Demo with Auth

## TL;DR

Build a simplistic React SPA at `petstore/` showcasing Pet Management, Store Orders, and User Management against the [Petstore Swagger API](https://petstore.swagger.io/v2). Uses lightweight hash routing (`#/pets`, `#/orders`, `#/users`) and React Context for auth state. Read-only when logged out; full CRUD when logged in via the API's `/user/login` endpoint. Every new component is developed in Storybook first (atomic design), then composed into app views that also have their own stories. No new dependencies — just React 18, TypeScript, and the existing design system.

---

## Progress

- ✅ **Phase 0 completed** (2026-02-27)
	- Added `src/services/types.ts`
	- Added `src/services/apiClient.ts`
	- Added `src/services/petApi.ts`
	- Added `src/services/storeApi.ts`
	- Added `src/services/userApi.ts`
- ✅ **Verification completed**
	- `bun run type-check` passes with strict TypeScript settings
- ⏭️ **Next phase**
	- Phase 1 — Auth Context (`src/context/AuthContext.tsx`)

---

## Steps

### Phase 0 — API Service Layer
Use a client generation tool for the petstore API. Generate TypeScript types and a thin fetch wrapper over the API.

1. Create `src/services/apiClient.ts` — A thin `fetch` wrapper over `https://petstore.swagger.io/v2`. Injects `api_key` header from auth context. Exports `get`, `post`, `put`, `del` helpers with typed responses. All methods return `{ data, error }` tuples for clean error handling.

2. Create `src/services/petApi.ts` — Typed functions: `findPetsByStatus(status[])`, `getPetById(id)`, `addPet(pet)`, `updatePet(pet)`, `deletePet(id)`. Uses `Pet`, `Category`, `Tag` types.

3. Create `src/services/storeApi.ts` — Typed functions: `getInventory()`, `placeOrder(order)`, `getOrderById(id)`, `deleteOrder(id)`. Uses `Order` type.

4. Create `src/services/userApi.ts` — Typed functions: `loginUser(username, password)` → returns session token, `logoutUser()`, `createUser(user)`, `getUserByName(username)`, `updateUser(username, user)`, `deleteUser(username)`. Uses `User` type.

5. Create `src/services/types.ts` — Shared API model interfaces: `Pet`, `Category`, `Tag`, `Order`, `User`, `ApiResponse`, `ApiResult<T>`.

### Phase 1 — Auth Context

6. Create `src/context/AuthContext.tsx` — `AuthProvider` wrapping the app. Stores `{ isLoggedIn, username, token }` in state (persisted to `sessionStorage`). Exposes `login(username, password)` (calls `userApi.loginUser`), `logout()` (calls `userApi.logoutUser`), and `isLoggedIn` boolean. The `apiClient` reads the token from this context.

### Phase 2 — New Atom Components (each with story + i18n + a11y)

7. Create `src/components/atoms/Badge.tsx` — Props: `variant` (`'available' | 'pending' | 'sold' | 'placed' | 'approved' | 'delivered' | 'info' | 'default'`), `size` (`'small' | 'medium'`), `children`. Renders a styled `<span>` with semantic colors from theme. Story at `src/stories/petstore/Badge.stories.tsx` under `Petstore/Atoms/Badge`.

8. Create `src/components/atoms/Select.tsx` — Props: `options: {value, label}[]`, `value`, `onChange`, `label`, `size`, `disabled`, `fullWidth`, plus i18n/a11y props. Wraps a native `<select>` with consistent styling matching the Input atom. Story at `src/stories/petstore/Select.stories.tsx` under `Petstore/Atoms/Select`.

9. Create `src/components/atoms/Modal.tsx` — Props: `isOpen`, `onClose`, `title`, `children`, `size` (`'small' | 'medium' | 'large'`). Uses `useFocusManagement` for focus trapping, Escape-to-close. Renders portal overlay + centered content. Story under `Petstore/Atoms/Modal`.

10. Create `src/components/atoms/Table.tsx` — Props: `columns: {key, header, render?}[]`, `data: T[]`, `emptyMessage`. Renders a styled `<table>` with header row and data rows. Story under `Petstore/Atoms/Table`.

11. Create `src/components/atoms/Tabs.tsx` — Props: `tabs: {id, label, icon?}[]`, `activeTab`, `onChange`. Renders a horizontal tab bar with keyboard arrow navigation (using `useKeyboardNavigation`). ARIA `role="tablist"` + `role="tab"`. Story under `Petstore/Atoms/Tabs`.

### Phase 3 — Molecule Components (each with story)

12. Create `src/components/molecules/LoginForm.tsx` — Composes `Input` (username) + `Input` (password) + `Button` (submit). Props: `onLogin(username, password)`, `isLoading`, `error`. Story under `Petstore/Molecules/LoginForm`.

13. Create `src/components/molecules/PetCard.tsx` — Composes `Card` + `Badge` (status). Displays pet name, category, status, photo URL. Props: `pet: Pet`, `onEdit?`, `onDelete?`, `readonly`. Edit/Delete buttons hidden when `readonly`. Story under `Petstore/Molecules/PetCard`.

14. Create `src/components/molecules/PetForm.tsx` — Composes `Input` (name, photoUrls, category) + `Select` (status) + `Button` (save/cancel). Props: `pet?: Pet` (for edit mode), `onSubmit(pet)`, `onCancel`, `isLoading`. Story under `Petstore/Molecules/PetForm`.

15. Create `src/components/molecules/OrderCard.tsx` — Composes `Card` + `Badge` (order status). Shows order ID, pet ID, quantity, ship date, status. Props: `order: Order`, `onDelete?`, `readonly`. Story under `Petstore/Molecules/OrderCard`.

16. Create `src/components/molecules/OrderForm.tsx` — Composes `Input` (petId, quantity) + `Button` (place order). Props: `onSubmit(order)`, `onCancel`, `isLoading`. Story under `Petstore/Molecules/OrderForm`.

17. Create `src/components/molecules/UserCard.tsx` — Composes `Card` with user details (username, name, email, phone). Props: `user: User`, `onEdit?`, `onDelete?`, `readonly`. Story under `Petstore/Molecules/UserCard`.

18. Create `src/components/molecules/UserForm.tsx` — Composes `Input` fields (username, firstName, lastName, email, password, phone) + `Button` (save/cancel). Props: `user?: User` (edit mode), `onSubmit(user)`, `onCancel`, `isLoading`. Story under `Petstore/Molecules/UserForm`.

19. Create `src/components/molecules/StatusFilter.tsx` — Composes `Select` + `Button` (refresh). Lets user pick pet status to filter by. Props: `statuses`, `selectedStatus`, `onChange`, `onRefresh`. Story under `Petstore/Molecules/StatusFilter`.

20. Create `src/components/molecules/ConfirmDialog.tsx` — Composes `Modal` + `Button` (confirm/cancel). Props: `isOpen`, `title`, `message`, `onConfirm`, `onCancel`, `variant` (`'danger' | 'default'`). Story under `Petstore/Molecules/ConfirmDialog`.

### Phase 4 — Organism Components (each with story)

21. Create `src/components/organisms/AppNavigation.tsx` — Composes `Tabs` + auth status display. Shows tabs for "Pets", "Orders", "Users". Right side shows username + logout `Button`, or "Sign In" `Button`. Props: `activeApp`, `onNavigate`, `isLoggedIn`, `username`, `onLogin`, `onLogout`. Story under `Petstore/Organisms/AppNavigation`.

22. Create `src/components/organisms/PetManagementView.tsx` — Composes `StatusFilter` + grid of `PetCard` components + `PetForm` (in `Modal`) + `ConfirmDialog` (delete). Fetches pets by status. Add Pet button visible when logged in. Story under `Petstore/Views/Pet Management` (uses mock data).

23. Create `src/components/organisms/StoreOrdersView.tsx` — Top section: `Table` showing inventory counts by status (from `getInventory`). Bottom section: order lookup by ID (`Input` + `Button` → `OrderCard`). Place Order button (opens `OrderForm` in `Modal`) when logged in. Story under `Petstore/Views/Store Orders`.

24. Create `src/components/organisms/UserManagementView.tsx` — User lookup by username (`Input` + `Button` → `UserCard`). When logged in: Create User (`UserForm` in `Modal`), Edit/Delete for looked-up user. Story under `Petstore/Views/User Management`.

### Phase 5 — App Shell & Entry Point

25. Create `src/components/organisms/PetstoreApp.tsx` — Top-level shell. Renders `AuthProvider` → `LocaleProvider` → `AppNavigation` + active view based on `window.location.hash`. Handles hash changes. Login flow opens a `Modal` with `LoginForm`. Composite story under `Petstore/App/Full Application`.

26. Create `src/petstore/index.tsx` — React entry point. Calls `ReactDOM.createRoot` to render `PetstoreApp` into the DOM. Replace `petstore/index.html` with a minimal HTML shell that loads this bundled script.

27. Add a `build-petstore` script to `package.json`: `bun build src/petstore/index.tsx --outdir petstore/dist --minify`. Update the `build` script to include it. Update the preview server to serve the petstore dist.

### Phase 6 — i18n & a11y Integration

28. Add translation keys to `src/i18n/locales/en.ts` and `src/i18n/locales/chef.ts` for all new components. Namespace: `petstore.navigation.*`, `petstore.pets.*`, `petstore.orders.*`, `petstore.users.*`, `petstore.auth.*`, `petstore.common.*` (CRUD action labels, status labels, form labels, empty states, error messages).

29. All new components use `useTranslation()` for visible text and `useAccessibility()` for keyboard/screen-reader support, following the exact same pattern as the existing `Button`, `Card`, and `Input` atoms.

### Phase 7 — Deploy Integration

30. Update `.github/workflows/deploy.yml` to run `build-petstore` and include the petstore dist in the `_site/` output at `/petstore/`.

---

## Auth Flow Detail

- **Logged out**: All views load and display data (GET requests work without auth). Add/Edit/Delete buttons are hidden or disabled. A "Sign In" button in the nav opens a modal with `LoginForm`.
- **Login**: Calls `GET /user/login?username=X&password=Y`. On success, stores the returned session token in `AuthContext` (+ `sessionStorage`). Nav updates to show username + "Sign Out".
- **Logged in**: CRUD buttons appear. All mutating API calls include the `api_key` header with the session token.
- **Logout**: Calls `GET /user/logout`, clears context and `sessionStorage`.

## Component ↔ Story Matrix

| Component | Storybook Path | Stories |
|-----------|---------------|---------|
| Badge | `Petstore/Atoms/Badge` | All variants, sizes |
| Select | `Petstore/Atoms/Select` | Default, disabled, with options |
| Modal | `Petstore/Atoms/Modal` | Open/closed, sizes, focus trap |
| Table | `Petstore/Atoms/Table` | With data, empty state |
| Tabs | `Petstore/Atoms/Tabs` | 3 tabs, keyboard nav |
| LoginForm | `Petstore/Molecules/LoginForm` | Default, loading, error |
| PetCard | `Petstore/Molecules/PetCard` | All statuses, readonly vs editable |
| PetForm | `Petstore/Molecules/PetForm` | Create mode, edit mode |
| OrderCard | `Petstore/Molecules/OrderCard` | All statuses |
| OrderForm | `Petstore/Molecules/OrderForm` | Default, loading |
| UserCard | `Petstore/Molecules/UserCard` | With full data, minimal data |
| UserForm | `Petstore/Molecules/UserForm` | Create mode, edit mode |
| StatusFilter | `Petstore/Molecules/StatusFilter` | With selections |
| ConfirmDialog | `Petstore/Molecules/ConfirmDialog` | Default, danger variant |
| AppNavigation | `Petstore/Organisms/AppNavigation` | Logged in, logged out, each tab active |
| PetManagementView | `Petstore/Views/Pet Management` | With mock pets, empty state, with modal open |
| StoreOrdersView | `Petstore/Views/Store Orders` | Inventory table, order lookup, place order |
| UserManagementView | `Petstore/Views/User Management` | Lookup result, create form, edit form |
| PetstoreApp | `Petstore/App/Full Application` | Interactive composite with mock API |

---

## Verification

1. **Type check**: `bun run type-check` — all new files compile under strict mode
2. **Lint**: `bun run lint` — no new warnings
3. **Storybook**: `bun run storybook` — all new stories render, controls work, locale switching works
4. **Build**: `bun run build` — Storybook static + petstore app build succeed
5. **Preview**: `bun run preview` → navigate to `http://localhost:4000/petstore/` — app loads, tabs navigate, login/logout works, CRUD operations succeed against the live API
6. **a11y**: Tab through the entire app — all interactive elements reachable, screen reader announcements fire, modals trap focus, Escape closes modals
7. **Auth gating**: Verify that without logging in, no Add/Edit/Delete buttons appear. After logging in (`user1`/`password` or any test user), CRUD buttons appear and mutations work

## Decisions

- **No new npm dependencies** — hash routing is a simple `hashchange` listener, state is React Context, styling is inline from theme tokens
- **Mock data for stories** — View/organism stories use hardcoded mock `Pet[]`, `Order[]`, `User` objects so they work without a live API
- **Native `<select>`** — The Select atom wraps a native element (not a custom dropdown) for accessibility and simplicity
- **Portal for Modal** — `ReactDOM.createPortal` to `document.body` for proper stacking context
- **Session-only auth** — Token stored in `sessionStorage`, not `localStorage`, so it clears on tab close
- **No bulk user endpoints** — `createWithArray` and `createWithList` are excluded per requirements
