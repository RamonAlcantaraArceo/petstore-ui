const state = {
  data: null,
  selectedKey: null,
};

const metaElement = document.getElementById('meta');
const treeElement = document.getElementById('tree');
const variantsElement = document.getElementById('variants');
const selectionTitle = document.getElementById('selection-title');
const selectionSubtitle = document.getElementById('selection-subtitle');

const getAssetUrl = (url) => {
  if (!url || !state.data?.generatedAt) {
    return url;
  }

  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}v=${encodeURIComponent(state.data.generatedAt)}`;
};

const getComponentKey = (item) => `${item.namespace}::${item.atomicLevel}::${item.component}`;

const groupByComponent = (components) => {
  const grouped = new Map();

  for (const item of components) {
    const key = getComponentKey(item);
    const existing = grouped.get(key);

    if (existing) {
      existing.stories.push(item);
      continue;
    }

    grouped.set(key, {
      key,
      namespace: item.namespace,
      atomicLevel: item.atomicLevel,
      component: item.component,
      stories: [item],
    });
  }

  return [...grouped.values()].sort((a, b) => a.component.localeCompare(b.component));
};

const buildTree = (componentGroups) => {
  const namespaces = new Map();

  for (const group of componentGroups) {
    const namespaceNode = namespaces.get(group.namespace) ?? new Map();
    const levelNode = namespaceNode.get(group.atomicLevel) ?? [];
    levelNode.push(group);
    namespaceNode.set(group.atomicLevel, levelNode);
    namespaces.set(group.namespace, namespaceNode);
  }

  return namespaces;
};

const createStatusBadge = (status) => {
  const span = document.createElement('span');
  span.className = `badge ${status}`;
  span.textContent = status;
  return span;
};

const createSlider = (expectedUrl, actualUrl, altText) => {
  const wrap = document.createElement('div');
  wrap.className = 'slider-wrap';

  if (!expectedUrl || !actualUrl) {
    const empty = document.createElement('div');
    empty.className = 'empty';
    empty.textContent = 'Missing expected/actual image for this variant.';
    wrap.append(empty);
    return wrap;
  }

  const sliderContainer = document.createElement('div');
  sliderContainer.className = 'image-slider';

  const expectedImg = document.createElement('img');
  expectedImg.src = getAssetUrl(expectedUrl);
  expectedImg.alt = `${altText} expected`;

  const actualLayer = document.createElement('div');
  actualLayer.className = 'image-actual';

  const actualImg = document.createElement('img');
  actualImg.src = getAssetUrl(actualUrl);
  actualImg.alt = `${altText} actual`;

  const divider = document.createElement('div');
  divider.className = 'slider-divider';

  actualLayer.append(actualImg);
  sliderContainer.append(expectedImg, actualLayer, divider);
  wrap.append(sliderContainer);

  const input = document.createElement('input');
  input.className = 'slider-input';
  input.type = 'range';
  input.min = '0';
  input.max = '100';
  input.value = '50';

  const applySlider = (value) => {
    actualLayer.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
    actualLayer.style.webkitClipPath = `inset(0 ${100 - value}% 0 0)`;
    divider.style.left = `${value}%`;
  };

  applySlider(50);
  input.addEventListener('input', (event) => {
    applySlider(Number(event.target.value));
  });

  wrap.append(input);
  return wrap;
};

const renderVariants = () => {
  variantsElement.innerHTML = '';

  if (!state.data || !state.selectedKey) {
    return;
  }

  const componentGroup = state.data.componentGroups.find((item) => item.key === state.selectedKey);

  if (!componentGroup) {
    return;
  }

  selectionTitle.textContent = `${componentGroup.namespace} / ${componentGroup.atomicLevel} / ${componentGroup.component}`;
  selectionSubtitle.textContent = `${componentGroup.stories.length} story variant(s)`;

  for (const story of componentGroup.stories.sort((a, b) => a.name.localeCompare(b.name))) {
    for (const variant of story.variants) {
      const card = document.createElement('article');
      card.className = 'variant-card';

      const header = document.createElement('header');
      header.className = 'variant-header';

      const title = document.createElement('h3');
      title.className = 'variant-title';
      title.textContent = `${story.name} · ${variant.viewport}`;

      header.append(title, createStatusBadge(variant.status));
      card.append(header);

      card.append(
        createSlider(variant.expected, variant.actual, `${story.name} ${variant.viewport}`),
      );

      variantsElement.append(card);
    }
  }
};

const renderTree = () => {
  treeElement.innerHTML = '';

  if (!state.data) {
    return;
  }

  const tree = buildTree(state.data.componentGroups);

  for (const [namespace, levels] of [...tree.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const namespaceDetails = document.createElement('details');
    namespaceDetails.open = true;

    const namespaceSummary = document.createElement('summary');
    namespaceSummary.textContent = namespace;

    namespaceDetails.append(namespaceSummary);

    for (const [level, groups] of [...levels.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
      const levelDetails = document.createElement('details');
      levelDetails.open = true;

      const levelSummary = document.createElement('summary');
      levelSummary.textContent = `${level} (${groups.length})`;

      const list = document.createElement('div');
      list.className = 'tree-list';

      for (const group of groups.sort((a, b) => a.component.localeCompare(b.component))) {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = `${group.component} (${group.stories.length})`;
        button.classList.toggle('active', state.selectedKey === group.key);
        button.addEventListener('click', () => {
          state.selectedKey = group.key;
          renderTree();
          renderVariants();
        });

        list.append(button);
      }

      levelDetails.append(levelSummary, list);
      namespaceDetails.append(levelDetails);
    }

    treeElement.append(namespaceDetails);
  }
};

const bootstrap = async () => {
  const response = await fetch('/visual-report/data.json', { cache: 'no-store' });
  if (!response.ok) {
    metaElement.textContent = 'data.json not found. Run: bun run report:visual:build';
    return;
  }

  const data = await response.json();
  const componentGroups = groupByComponent(data.components ?? []);

  state.data = {
    ...data,
    componentGroups,
  };

  state.selectedKey = componentGroups[0]?.key ?? null;
  metaElement.textContent = `Generated ${new Date(data.generatedAt).toLocaleString()} · ${componentGroups.length} components`;

  renderTree();
  renderVariants();
};

bootstrap().catch((error) => {
  metaElement.textContent = `Failed to load report data: ${error instanceof Error ? error.message : String(error)}`;
});
