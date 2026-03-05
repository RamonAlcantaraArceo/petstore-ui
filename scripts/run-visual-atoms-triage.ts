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
    cmd: ['bun', 'run', 'build-storybook'],
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
      STORY_FILTER: 'petstore-atoms-',
    },
  });
}

steps.push({
  label: 'Generate custom visual report data',
  cmd: ['bun', 'run', 'report:visual:build'],
});

const runStep = (step: Step): number => {
  console.log(`\n▶ ${step.label}`);
  console.log(`$ ${step.cmd.join(' ')}`);

  const result = Bun.spawnSync({
    cmd: step.cmd,
    cwd: process.cwd(),
    env: {
      ...process.env,
      ...step.env,
    },
    stdout: 'inherit',
    stderr: 'inherit',
  });

  return result.exitCode ?? 1;
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

console.log('Run `bun run preview` then open http://localhost:4000/visual-report/ to triage.');
