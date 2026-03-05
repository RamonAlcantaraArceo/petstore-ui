const args = new Set(process.argv.slice(2));

const shouldSkipBuild = args.has('--skip-build');
const shouldSkipTests = args.has('--skip-tests');
const shouldUpdateSnapshots = args.has('--update-snapshots');

interface Step {
  label: string;
  cmd: string[];
  env?: Record<string, string>;
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

const runStep = (step: Step) => {
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

  if (result.exitCode !== 0) {
    process.exit(result.exitCode ?? 1);
  }
};

for (const step of steps) {
  runStep(step);
}

console.log('\n✅ Petstore atoms visual triage flow completed.');
console.log('Run `bun run preview` then open http://localhost:4000/visual-report/ to triage.');
