Plan: Storybook + Static Website with GitHub Pages (Implementation Units)
TL;DR: Create a monorepo with shared component library, Storybook documentation, and a petstore demo website. Deploy both to GitHub Pages using Bun runtime with Node.js fallback, automated via GitHub Actions CI/CD. Each unit below represents a self-contained implementation task.

Implementation Units

Unit 1: Initial Repository Structure
Prompt: "Create the basic monorepo structure for a Storybook component library with static website. Create the following directory structure: /src/components, /src/stories, /src/tokens, /public, /docs, .storybook/, and .github/workflows/. Add a basic .gitignore file that excludes node_modules/, .bun/, dist/, build/, storybook-static/, .env\*, and .DS_Store. Create placeholder README.md file with project title and description."

Unit 2: Bun Configuration & Package Setup
Prompt: "Initialize a Bun project and configure the package.json for a React + TypeScript + Storybook setup. Run bun init and modify package.json to include React, TypeScript, Storybook dependencies (@storybook/react, @storybook/addon-essentials, @storybook/addon-docs). Install comprehensive TypeScript type dependencies including @types/react, @types/react-dom, @types/node, and @types/minimatch to prevent compilation errors. Create bunfig.toml with Bun configuration for module resolution and package management. Add .nvmrc file with Node 20 for fallback compatibility. Create tsconfig.json with strict TypeScript configuration for components and website. After setup, run 'bun install' to ensure all dependencies are properly installed, then verify the TypeScript configuration works with 'bun run tsc --noEmit' to catch any missing type definitions early."

Unit 3: Design System Foundation
Prompt: "Create a design system foundation with design tokens and base atomic components. In /src/tokens, create theme.ts with color palette, typography scale, spacing system, and breakpoints. Create atomic components in /src/components/atoms: Button.tsx with variants (primary, secondary, danger), Input.tsx with validation states, and Card.tsx with elevation system. Each component should have proper TypeScript interfaces and export both the component and its props type."

Unit 4: Storybook Configuration
Prompt: "Set up Storybook with Bun compatibility and configure it for the design system. Create .storybook/main.ts configured for React + TypeScript with essential addons. Create .storybook/preview.tsx with global styles, theme provider, and viewport configurations. Add package.json scripts for 'storybook' (dev server) and 'build-storybook' (static build). Ensure configuration works with Bun's module resolution."

Unit 5: Component Stories Creation
Prompt: "Create comprehensive Storybook stories for all atomic components. For each component (Button, Input, Card), create a corresponding .stories.tsx file in /src/stories using MDX documentation. Include multiple story variants, controls for interactive props, and comprehensive documentation. Follow the Storybook design system reference patterns for story organization and documentation structure.
Use the button stories implemented at this time as a reference for creating stories for Input and Card components."

Unit 6: Static Website Structure
Prompt: "Create the basic static website structure that will showcase the component library and integrate with the petstore API. In /public, create index.html with responsive layout, style.css for website-specific styles, and app.js for JavaScript functionality. Create a homepage that serves as a entry point and you can go into the Storybook or the petstore demo. The homepage gives a very short introduction to the project and uses the design system components. Create additional pages: /storybook/index.html that serves the Storybook static build, and /petstore/index.html that serves as the petstore demo page for now the petstore API integration will be done in Unit 7. The petstore page only shows a basic layout and under construction message for now."

Unit 7: Petstore API Integration
Prompt: "Implement petstore API integration in the static website for demonstration purposes. Create JavaScript modules in /public/js/ for API service (petstore-api.js) with functions to fetch pets, get pet by ID, and handle API errors. Implement UI components for pet listing, pet cards, search functionality, and loading/error states. Use the design system components created earlier and integrate with https://petstore.swagger.io/v2/ API endpoints."

Unit 8: GitHub Pages Deployment Workflow
Prompt: "Create GitHub Actions workflow for automated deployment to GitHub Pages. Create .github/workflows/deploy.yml that triggers on pushes to main branch. The workflow should: install Bun, build Storybook to storybook-static/, copy static website files, organize files so Storybook serves at /storybook path and website at root, and deploy to GitHub Pages. Include proper permissions and artifact handling."

Unit 9: CI/CD Validation Pipeline
Prompt: "Create CI/CD pipeline for code quality and build validation. Create .github/workflows/ci.yml that runs on all pushes and pull requests. Include jobs for: linting with ESLint, TypeScript compilation check, Storybook build verification, static website build verification, and basic tests. Configure the workflow to use Bun for all build steps with Node.js fallback if needed."

Unit 10: Code Quality & Formatting Setup
Prompt: "Set up code quality tools and formatting standards. Create .eslintrc.js with React, TypeScript, and Storybook-specific rules. Create .prettierrc for consistent formatting. Add lint-staged configuration for pre-commit hooks. Update package.json with scripts for 'lint', 'format', and 'type-check'. Ensure all configurations work with Bun runtime."

Unit 11: Comprehensive Documentation
Prompt: "Create comprehensive documentation for the project setup, development, and deployment. Update README.md with project overview, setup instructions for both Bun and Node.js, development workflow, and deployment process. Create CONTRIBUTING.md with guidelines for adding new components, writing stories, and contributing to the design system. Include troubleshooting section for common Bun compatibility issues and fallback procedures."

Unit 12: Testing & Verification
Prompt: "Set up testing framework and create initial test suite. Add testing dependencies (Jest, testing-library) compatible with Bun. Create basic unit tests for atomic components in /src/components/**tests**/. Add integration tests for petstore API functionality. Create test scripts in package.json and verify all tests pass with Bun runtime. Document testing strategy and add test coverage reporting."

Execution Order: Units 1-3 can be done in parallel after Unit 1. Units 4-5 depend on Units 2-3. Units 6-7 depend on Units 2-3. Units 8-9 depend on all previous units being functional. Units 10-12 can be done in parallel once the core functionality is established.

Dependencies:

Units 4-12 require Unit 2 (Bun setup) to be completed
Units 5, 7 require Unit 3 (components) to be completed
Units 8, 9 require Units 4, 6 (builds working) to be completed
