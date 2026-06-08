# Getting Started with petstore-ui

Welcome! This guide will help you set up the petstore-ui project and start contributing to the component library.

## Prerequisites

Before you begin, ensure you have the following installed:

| Tool        | Version  | Installation                                         |
| ----------- | -------- | ---------------------------------------------------- |
| **Node.js** | ≥ 24.0.0 | [nodejs.org](https://nodejs.org/)                    |
| **pnpm**    | ≥ 11.0.0 | `npm install -g pnpm` or [pnpm.io](https://pnpm.io/) |
| **Git**     | Latest   | [git-scm.com](https://git-scm.com/)                  |

**Verify your setup:**

```bash
node --version    # Should be ≥ 24.x
pnpm --version    # Should be ≥ 11.x
git --version
```

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ramonalcantaraarceo/petstore-ui.git
cd petstore-ui
```

### 2. Install Dependencies

```bash
pnpm install
```

This installs all workspace package dependencies and sets up pre-commit hooks via Husky.

### 3. Verify Installation

Run these commands to ensure everything is working:

```bash
# Check TypeScript compilation
pnpm run type-check

# Run linting
pnpm run lint

# Run tests
pnpm run test

# Start Storybook
pnpm run storybook
```

All commands should complete without errors.

## First Steps: Choose Your Workflow

### Option A: Interactive Component Development (Recommended for UI work)

Start Storybook for interactive component development:

```bash
pnpm run storybook
```

Storybook opens at **http://localhost:6006**

**What you can do:**

- View all components and their variants
- Test interactive stories with hot reload
- Switch between locales (en/chef) using the toolbar
- Test accessibility with the a11y addon
- Browse documentation for each component

**Best for:** Creating or updating components, testing styling, verifying i18n and accessibility.

### Option B: Petstore App Demo (Recommended for app/form work)

Start the Petstore demo app in development mode:

```bash
pnpm run dev
```

App opens at **http://localhost:5173/petstore/**

**Requirements:** Set `API_BASE_URL` environment variable (see [Configuration](./configuration.md))

**What you can do:**

- Test the full application in development mode
- Hot reload on file changes
- Test API integration
- Verify forms and workflows end-to-end

**Best for:** Building features, testing integrations, form development.

### Option C: Full Static Preview (Production-like setup)

Build and preview the full static site:

```bash
pnpm run build
pnpm run preview
```

Preview opens at **http://localhost:4000/visual-report/**

**What you can do:**

- Preview generated visual report output
- Validate visual-report routing and assets

**Best for:** Pre-deployment testing, validating production builds.

## Workspace Structure

The project uses a monorepo structure with multiple packages:

```
petstore-ui/
├── packages/
│   ├── atoms/                 # Shared React atoms, theme, i18n, a11y
│   ├── app/                   # Petstore demo application
│   ├── visual-reporter/       # Visual regression report UI
│   └── shared/                # Shared types and utilities
├── src/                        # Legacy source (being migrated to packages)
├── docs/                       # Documentation (this directory)
├── public/                     # Static assets
├── .storybook/                # Storybook configuration
└── .github/                   # GitHub workflows and templates
```

**For now, focus on `/packages`** — this is the active workspace. The `/src` directory is being gradually migrated.

## Common Tasks

### Create a New Component

1. **Determine the component layer:**
   - **Atom**: Single-responsibility, no business logic (Button, Badge, Input)
   - **Molecule**: Composed from atoms, limited logic (SearchBox, PetCard)
   - **Organism**: Complex, may include API calls (PetGrid, Header)

2. **Create the component file:**

   ```bash
   touch packages/atoms/src/components/atoms/MyComponent.tsx
   ```

3. **Add TypeScript interface, i18n support, and accessibility:**
   See [CONTRIBUTING.md](CONTRIBUTING.md) for component anatomy

4. **Create a Storybook story:**

   ```bash
   touch packages/atoms/src/components/atoms/MyComponent.stories.tsx
   ```

5. **Add tests:**

   ```bash
   touch packages/atoms/src/components/atoms/MyComponent.test.tsx
   ```

6. **Run tests and lint:**
   ```bash
   pnpm run test
   pnpm run lint
   ```

### Run Tests for a Specific Package

```bash
# Test only atoms package
pnpm -F @petstore-ui/atoms run test

# Test only app package
pnpm -F @petstore-ui/app run test

# Test a single file
pnpm run test -- packages/atoms/src/components/atoms/Button.test.tsx
```

See [Testing](./testing.md) for comprehensive test documentation.

### Build Storybook for Deployment

```bash
# Build all Storybook stories
pnpm run build-storybook

# Build Petstore flavor only
pnpm run build-storybook:petstore

# Build Visual Report flavor only
pnpm run build-storybook:visual-report
```

### Run Visual Regression Tests

```bash
# Build Storybook and run visual tests
pnpm run test:visual

# Generate visual diff report
pnpm run report:visual
```

See [Testing](./testing.md) for more details.

## Git Workflow

### Branching Convention

```bash
# Create a feature branch
git checkout -b feature/component-name

# Make changes, commit, and push
git push origin feature/component-name

# Create a Pull Request on GitHub
```

### Pre-commit Checks

Husky runs automatically before each commit:

1. **Format with Prettier** — code is auto-formatted
2. **Lint with ESLint** — must pass (no errors)
3. **Type-check with TypeScript** — must pass

Fix any errors before committing:

```bash
pnpm run format      # Auto-fix formatting issues
pnpm run lint        # Show linting errors
pnpm run type-check  # Show TypeScript errors
```

### Commit Message Format

```
type(scope): short description

Longer explanation if needed.

Co-authored-by: Your Name <your@email.com>
```

**Types:** `feat`, `fix`, `test`, `docs`, `refactor`, `chore`, `ci`

**Example:**

```
feat(atoms): add new Badge component with accessibility support

- Add Badge.tsx with i18n integration
- Add Badge.stories.tsx with all variants
- Add Badge.test.tsx with full coverage
- Update CHANGELOG.md

Co-authored-by: Your Name <your@email.com>
```

## Verification Checklist

Before your first pull request, verify:

- [ ] Cloned repository successfully
- [ ] `pnpm install` completed without errors
- [ ] `pnpm run type-check` passes (0 errors)
- [ ] `pnpm run lint` passes (0 errors)
- [ ] `pnpm run test` shows tests passing
- [ ] `pnpm run storybook` opens at localhost:6006
- [ ] Can view and interact with components in Storybook
- [ ] Understand the workspace structure (packages/)

## Troubleshooting

### `pnpm install` fails with permission errors

**Solution:** Ensure pnpm is installed globally:

```bash
npm install -g pnpm
pnpm setup
export PNPM_HOME="$HOME/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"
```

### Storybook fails to start

**Solution:** Ensure TypeScript compiles without errors:

```bash
pnpm run type-check
```

### Test failures with "document is not defined"

**Solution:** This should not happen. Verify `vitest.config.ts` has `test.environment = "happy-dom"`. If issues persist:

```bash
pnpm add -D happy-dom@14
```

### Port already in use

**Solutions:**

- Storybook (6006): `pnpm run storybook -- -p 6007`
- Dev server (5173): `pnpm run dev -- --port 5174`
- Preview (4000): Edit `scripts/preview-server.ts` to use different port

## Next Steps

1. **Explore the codebase:** Open `packages/atoms/src/components/atoms/` to see existing component examples
2. **Read [CONTRIBUTING.md](CONTRIBUTING.md)** for component and story standards
3. **Review [Architecture](./architecture.md)** to understand the monorepo design
4. **Check [Testing](./testing.md)** for test patterns and best practices
5. **Start contributing!** Pick a small component or improvement to get familiar with the workflow

## Getting Help

- **Questions about a component?** Check the Storybook documentation for that component
- **Questions about contribution standards?** See [CONTRIBUTING.md](CONTRIBUTING.md)
- **Questions about architecture?** See [Architecture](./architecture.md)
- **Issues or bugs?** Create an issue on [GitHub](https://github.com/ramonalcantaraarceo/petstore-ui/issues)

---

**Welcome to the team!** 🚀
