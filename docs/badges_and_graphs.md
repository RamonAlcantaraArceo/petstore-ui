# Badges and Graphs

[![CI](https://github.com/ramonalcantaraarceo/petstore-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/ramonalcantaraarceo/petstore-ui/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/ramonalcantaraarceo/petstore-ui/branch/main/graph/badge.svg)](https://codecov.io/gh/ramonalcantaraarceo/petstore-ui)
[![Node Version](https://img.shields.io/badge/node-%3E%3D24.0.0-brightgreen)](https://nodejs.org/)
[![pnpm Version](https://img.shields.io/badge/pnpm-%3E%3D11.0.0-blue)](https://pnpm.io/)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](https://github.com/RamonAlcantaraArceo/petstore-ui/LICENSE)

[![Storybook](https://img.shields.io/badge/storybook-interactive_docs_dev-ff6ee4)](https://petstore-ui-dev.ramon-alcantara.work/storybook/)
[![Storybook](https://img.shields.io/badge/storybook-interactive_docs_staging-ff69b4)](https://petstore-ui-staging.ramon-alcantara.work/storybook/)

[![Dev Deployment](https://github.com/RamonAlcantaraArceo/petstore-ui/actions/workflows/deploy-fly-dev.yml/badge.svg)](https://petstore-ui-dev.ramon-alcantara.work/petstore/)
[![Staging Deployment](https://github.com/RamonAlcantaraArceo/petstore-ui/actions/workflows/deploy-fly-staging.yml/badge.svg)](https://petstore-ui-staging.ramon-alcantara.work/petstore/)

## Sunburst Graph

![Sunburst Graph](https://codecov.io/gh/RamonAlcantaraArceo/petstore-ui/graphs/sunburst.svg?token=MH0W9MDQJC)

## Grid Graph

![Grid Graph](https://codecov.io/gh/RamonAlcantaraArceo/petstore-ui/graphs/tree.svg?token=MH0W9MDQJC)

## Icicle Graph

![Icicle Graph](https://codecov.io/gh/RamonAlcantaraArceo/petstore-ui/graphs/icicle.svg?token=MH0W9MDQJC)

## Project Health

| Check               | Status                                                                                                    | Details            |
| ------------------- | --------------------------------------------------------------------------------------------------------- | ------------------ |
| **Build**           | [![CI](https://github.com/ramonalcantaraarceo/petstore-ui/actions/workflows/ci.yml/badge.svg)][ci-link]   | Runs on every push |
| **Coverage**        | [![codecov](https://codecov.io/gh/ramonalcantaraarceo/petstore-ui/branch/main/graph/badge.svg)][cov-link] | Target: ≥80%       |
| **Node.js**         | [![Node Version](https://img.shields.io/badge/node-%3E%3D24.0.0-brightgreen)][node-link]                  | Version: ≥24.0.0   |
| **Package Manager** | [![pnpm Version](https://img.shields.io/badge/pnpm-%3E%3D11.0.0-blue)][pnpm-link]                         | Version: ≥11.0.0   |
| **License**         | [![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)][license-link]                      | Open source        |

[ci-link]: https://github.com/ramonalcantaraarceo/petstore-ui/actions/workflows/ci.yml
[cov-link]: https://codecov.io/gh/ramonalcantaraarceo/petstore-ui
[node-link]: https://nodejs.org/
[pnpm-link]: https://pnpm.io/
[license-link]: LICENSE

This document describes status badges, coverage graphs, and how to add them to your documentation.

## Status Badges

Status badges provide quick visual indicators of project health. Place badges at the top of `README.md` for maximum visibility.

### Current Badge Implementations

#### Build Status

```markdown
[![CI](https://github.com/ramonalcantaraarceo/petstore-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/ramonalcantaraarceo/petstore-ui/actions/workflows/ci.yml)
```

**What it shows:**

- Green checkmark: All CI checks pass
- Red X: Build failed
- Yellow dot: Build in progress

**Link:** Clicking opens the CI workflow runs page

**Update frequency:** Real-time (every CI run)

#### Code Coverage

```markdown
[![codecov](https://codecov.io/gh/ramonalcantaraarceo/petstore-ui/branch/main/graph/badge.svg)](https://codecov.io/gh/ramonalcantaraarceo/petstore-ui)
```

**What it shows:**

- Percentage of lines covered by tests (goal: ≥ 80%)
- Color indicates coverage level:
  - Green: ≥ 90%
  - Yellow: 70–90%
  - Red: < 70%

**Link:** Clicking opens Codecov dashboard with detailed coverage breakdown

**Update frequency:** Every CI run (pushed to Codecov automatically)

### Recommended Additional Badges

#### Node.js Version

```markdown
[![Node Version](https://img.shields.io/badge/node-%3E%3D24.0.0-brightgreen)](https://nodejs.org/)
```

Shows the minimum Node.js version required.

#### Package Manager

```markdown
[![pnpm Version](https://img.shields.io/badge/pnpm-%3E%3D11.0.0-blue)](https://pnpm.io/)
```

Shows the minimum pnpm version required.

#### License

```markdown
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](LICENSE)
```

Links to the LICENSE file.

#### Deployment Status

```markdown
[![Fly.io Deploy Status](https://img.shields.io/endpoint?url=https://fly.io/status/petstore-ui-dev)](https://fly.io/apps/petstore-ui-dev)
```

Shows if the deployed app is healthy. (Requires Fly.io status integration)

#### Storybook Link

```markdown
[![Storybook](https://img.shields.io/badge/storybook-interactive_docs-ff69b4)](https://main--66b5e1e6b3c7f5a8b2c1d0e9.chromatic.com/)
```

Direct link to deployed Storybook (if available via Chromatic or similar).

## Adding Badges to README

Place all badges at the top of README.md after the title:

```markdown
# petstore-ui

[![CI](https://github.com/...)](...)
[![codecov](https://codecov.io/...)](...)
[![Node Version](https://img.shields.io/badge/...)](...)
[![pnpm Version](https://img.shields.io/badge/...)](...)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](LICENSE)

A React + TypeScript component library...
```

## Coverage Graphs

Coverage reports provide detailed metrics about test coverage across the codebase.

### Codecov Dashboard

After each CI run, coverage reports are uploaded to Codecov:

**View coverage:** https://codecov.io/gh/ramonalcantaraarceo/petstore-ui

**Dashboard shows:**

- **Overall coverage percentage** (aim for ≥ 80%)
- **Coverage by file** — Which files are well-tested vs. under-tested
- **Coverage trends** — How coverage changes over time
- **PR coverage changes** — Which changed files improved/reduced coverage
- **Flag coverage** (optional) — Separate metrics by test type (unit, integration, e2e)

### Local Coverage Reports

Generate coverage reports locally:

```bash
# Generate coverage report
pnpm run test:coverage

# Open HTML report in browser
open coverage/index.html
```

**Local report shows:**

- File-by-file coverage statistics
- Line, branch, function, and statement coverage
- Color-coded indicators (green/yellow/red)
- Ability to drill down into files

### Coverage Configuration

Vitest coverage settings in `vitest.config.ts`:

```typescript
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['packages/**/src/**/*.ts(x)'],
      exclude: [
        '**/*.stories.ts(x)', // Storybook stories exempt
        '**/node_modules/**',
        '**/.test/**',
        '**/dist/**',
      ],
      lines: 80, // Fail if < 80%
      functions: 80,
      branches: 80,
      statements: 80,
    },
  },
});
```

**Minimum threshold:** 80% across all metrics

**Exemptions:** Storybook stories (`.stories.tsx`) are not counted toward coverage targets

### CI Coverage Upload

In `.github/workflows/ci.yml`, coverage is automatically uploaded:

```yaml
- name: Upload coverage to Codecov
  uses: codecov/codecov-action@v3
  with:
    token: ${{ secrets.CODECOV_TOKEN }}
    files: ./coverage/coverage-final.json
    flags: unittests
    name: codecov-umbrella
    fail_ci_if_error: false
    verbose: true
```

**Flags:** Used to organize coverage reports by test type

- `unittests` — Unit and integration tests
- `e2e` — End-to-end tests (optional)
- `visual` — Visual regression tests (optional)

## Performance Graphs

Performance metrics help track build times, test duration, and bundle size.

### Build Time Tracking

Current CI reports build timing to GitHub Actions logs:

```bash
# View in Actions → Workflow run → Job logs
```

Track build time trends to identify performance regressions.

### Test Duration

Vitest reporter shows test duration:

```bash
pnpm run test -- --reporter=verbose
```

**Output:**

```
✓ src/components/Button.test.tsx (1250ms)
✓ src/components/Input.test.tsx (1100ms)
✓ src/services/apiClient.test.ts (500ms)
```

Identify slow tests and optimize when needed.

### Bundle Size

Generate bundle size report:

```bash
pnpm run build:bundle-stats
```

**Output:** Analysis of built JavaScript and CSS sizes

**Monitor for:** Unexpected increases that might indicate new dependencies

## Badge Markdown Snippets

### Complete Badge Set (Ready to Use)

Copy and paste into README.md:

```markdown
[![CI](https://github.com/ramonalcantaraarceo/petstore-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/ramonalcantaraarceo/petstore-ui/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/ramonalcantaraarceo/petstore-ui/branch/main/graph/badge.svg)](https://codecov.io/gh/ramonalcantaraarceo/petstore-ui)
[![Node Version](https://img.shields.io/badge/node-%3E%3D24.0.0-brightgreen)](https://nodejs.org/)
[![pnpm Version](https://img.shields.io/badge/pnpm-%3E%3D11.0.0-blue)](https://pnpm.io/)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](LICENSE)
```

### Individual Badge Syntax

#### shields.io Badges

Use https://shields.io for custom badges:

```markdown
[![Badge Name](https://img.shields.io/badge/label-value-color)](url)
```

**Color options:** `brightgreen`, `green`, `yellowgreen`, `yellow`, `orange`, `red`, `lightgrey`, `blue`

**Example:**

```markdown
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)](https://www.typescriptlang.org/)
```

#### GitHub Workflow Status

```markdown
[![Workflow Name](https://github.com/owner/repo/actions/workflows/filename.yml/badge.svg)](https://github.com/owner/repo/actions/workflows/filename.yml)
```

## Embedding Graphs in Documentation

### Codecov Widget

Embed live coverage widget in documentation:

```html
<a href="https://codecov.io/gh/ramonalcantaraarceo/petstore-ui">
  <img
    src="https://codecov.io/gh/ramonalcantaraarceo/petstore-ui/branch/main/graph/badge.svg"
    alt="codecov"
  />
</a>
```

### GitHub Metrics

Link to GitHub repository stats:

```markdown
[View repository statistics](https://github.com/ramonalcantaraarceo/petstore-ui/graphs/contributors)
```

**Available stats:**

- Contributor graph: `/graphs/contributors`
- Traffic graph: `/graphs/traffic`
- Network graph: `/network`
- Dependency graph: `/network/dependencies`

## Health Checks Visualization

### Fly.io Status

Add Fly.io deployment status to monitoring dashboard:

```markdown
**Deployment Status:** https://petstore-ui-dev.fly.dev

- **App:** petstore-ui-dev
- **Health:** Check `/` endpoint
- **Logs:** `flyctl logs --app petstore-ui-dev`
```

### GitHub Actions Status

Quick link to CI workflow:

```markdown
**CI Status:** [![CI](https://github.com/ramonalcantaraarceo/petstore-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/ramonalcantaraarceo/petstore-ui/actions/workflows/ci.yml)

- View latest runs: [Actions](https://github.com/ramonalcantaraarceo/petstore-ui/actions)
- Fix errors: Check logs for failed jobs
```

## Badge Best Practices

### Do's ✅

- Place badges at top of README for immediate visibility
- Link badges to relevant dashboards (CI, Codecov, etc.)
- Update badge URLs when repository changes
- Include key metrics (Node version, license, coverage)
- Test badges render correctly on GitHub

### Don'ts ❌

- Don't use too many badges (7-10 is reasonable)
- Don't link to irrelevant pages
- Don't rely only on badges for documentation
- Don't forget to update badge targets when repositories move

## Monitoring Dashboard

Create a monitoring checklist using badges:

```markdown
## Project Health

| Check               | Status                      | Details            |
| ------------------- | --------------------------- | ------------------ |
| **Build**           | [![CI](...)][ci-link]       | Runs on every push |
| **Coverage**        | [![codecov](...)][cov-link] | Target: ≥80%       |
| **Node.js**         | [![Node](...)][node-link]   | Version: ≥24.0.0   |
| **Package Manager** | [![pnpm](...)][pnpm-link]   | Version: ≥11.0.0   |
| **License**         | [![MIT](...)][license-link] | Open source        |

[ci-link]: https://github.com/ramonalcantaraarceo/petstore-ui/actions/workflows/ci.yml
[cov-link]: https://codecov.io/gh/ramonalcantaraarceo/petstore-ui
[node-link]: https://nodejs.org/
[pnpm-link]: https://pnpm.io/
[license-link]: LICENSE
```

## Troubleshooting

### Badge shows "build unknown" or "coverage unknown"

**Cause:** Workflow hasn't run yet or workflow file has issues

**Solution:**

1. Trigger workflow manually in GitHub Actions
2. Wait for workflow to complete
3. Check workflow logs for errors
4. Verify workflow file syntax

### Codecov badge not updating

**Cause:** Codecov token not set or upload failing

**Solution:**

1. Verify `CODECOV_TOKEN` is set in GitHub Secrets
2. Check CI workflow logs for codecov upload step
3. Visit https://codecov.io and verify token is valid
4. Try revoking and regenerating token

### Badge URL is broken

**Cause:** Repository was renamed or moved

**Solution:**

1. Update badge URLs to match new repository location
2. Test each badge URL independently
3. Verify links are accessible

## Next Steps

- **See [Getting Started](./getting_started.md)** to set up CI
- **See [Configuration](./configuration.md)** for environment variables
- **See [Testing](./testing.md)** for coverage best practices

---

**Have questions?** Check [Shields.io documentation](https://shields.io/) or [Codecov documentation](https://docs.codecov.io/).
