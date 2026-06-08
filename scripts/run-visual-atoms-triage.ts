import { spawnSync } from 'node:child_process';

const args = new Set(process.argv.slice(2));

const shouldSkipBuild = args.has('--skip-build');
const shouldSkipTests = args.has('--skip-tests');
const shouldUpdateSnapshots = args.has('--update-snapshots');
const shouldFailOnError = args.has('--fail-on-error');

interface Step {
  label: string;
  cmd: string[];
  env?: Record<string, string>;
}

interface FailedStep {
  label: string;
  exitCode: number;
}

const steps: Step[] = [];

if (!shouldSkipBuild) {
  steps.push({
    label: 'Build Storybook static output',
    cmd: ['pnpm', 'run', 'build-storybook'],
    env: {
      STORYBOOK_FLAVOR: 'petstore',
    },
  });
}

if (!shouldSkipTests) {
  steps.push({
    label: 'Run Playwright visual tests for Petstore atoms only',
    cmd: [
      'npx',
      'playwright',
      'test',
      '--config=playwright.config.ts',
      ...(shouldUpdateSnapshots ? ['--update-snapshots'] : []),
    ],
    env: {
      STORYBOOK_FLAVOR: 'petstore',
    },
  });
}

steps.push({
  label: 'Generate custom visual report data',
  cmd: ['pnpm', 'run', 'report:visual:build'],
  env: {
    STORYBOOK_FLAVOR: 'petstore',
  },
});

const runStep = (step: Step): number => {
  console.log(`\n▶ ${step.label}`);
  console.log(`$ ${step.cmd.join(' ')}`);

  const result = spawnSync(step.cmd[0], step.cmd.slice(1), {
    cwd: process.cwd(),
    env: {
      ...process.env,
      ...step.env,
    },
    stdio: 'inherit',
    shell: false,
  });

  return result.status ?? 1;
};

const failedSteps: FailedStep[] = [];

for (const step of steps) {
  const exitCode = runStep(step);
  if (exitCode !== 0) {
    failedSteps.push({
      label: step.label,
      exitCode,
    });
  }
}

if (failedSteps.length === 0) {
  console.log('\n✅ Petstore atoms visual triage flow completed.');
} else {
  console.log('\n⚠️  Petstore atoms visual triage flow completed with step failures:');
  for (const failedStep of failedSteps) {
    console.log(`- ${failedStep.label} (exit code ${failedStep.exitCode})`);
  }
  if (shouldFailOnError) {
    process.exitCode = 1;
  }
}

console.log('\n▶ Launch visual report preview');
console.log('$ pnpm run preview');
console.log('Open http://localhost:4000/visual-report/ to triage.\n');

spawnSync('pnpm', ['run', 'preview'], {
  cwd: process.cwd(),
  env: process.env,
  stdio: 'inherit',
  shell: false,
});
