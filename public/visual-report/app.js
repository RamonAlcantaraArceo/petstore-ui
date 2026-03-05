const state = {
  data: null,
  selectedKey: null,
  statusFilter: 'all',
};

const metaElement = document.getElementById('meta');
const treeElement = document.getElementById('tree');
const variantsElement = document.getElementById('variants');
const selectionTitle = document.getElementById('selection-title');
const selectionSubtitle = document.getElementById('selection-subtitle');
const filtersElement = document.getElementById('status-filters');

const FILTERS = ['all', 'passed', 'failed', 'flaky', 'skipped', 'unknown'];

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

const variantMatchesFilter = (variant) => {
  if (state.statusFilter === 'all') {
    return true;
  }

  return (variant.status ?? 'unknown') === state.statusFilter;
};

const getAllVariants = (componentGroups) =>
  componentGroups.flatMap((group) => group.stories.flatMap((story) => story.variants));

const getFilterCounts = () => {
  if (!state.data) {
    return new Map(FILTERS.map((filter) => [filter, 0]));
  }

  const variants = getAllVariants(state.data.componentGroups);
  const counts = new Map(FILTERS.map((filter) => [filter, 0]));
  counts.set('all', variants.length);

  for (const variant of variants) {
    const status = variant.status ?? 'unknown';
    counts.set(status, (counts.get(status) ?? 0) + 1);
  }

  return counts;
};

const getFilteredComponentGroups = () => {
  if (!state.data) {
    return [];
  }

  if (state.statusFilter === 'all') {
    return state.data.componentGroups;
  }

  return state.data.componentGroups.filter((group) =>
    group.stories.some((story) => story.variants.some((variant) => variantMatchesFilter(variant))),
  );
};

const ensureSelectedKeyVisible = (componentGroups) => {
  if (!componentGroups.length) {
    state.selectedKey = null;
    return;
  }

  const hasSelected = componentGroups.some((group) => group.key === state.selectedKey);
  if (!hasSelected) {
    state.selectedKey = componentGroups[0].key;
  }
};

const renderFilters = () => {
  if (!filtersElement) {
    return;
  }

  filtersElement.innerHTML = '';
  const counts = getFilterCounts();

  for (const filter of FILTERS) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'status-filter';
    button.classList.toggle('active', state.statusFilter === filter);

    const label = document.createElement('span');
    label.textContent = filter[0].toUpperCase() + filter.slice(1);

    const count = document.createElement('span');
    count.className = 'count';
    count.textContent = String(counts.get(filter) ?? 0);

    button.append(label, count);
    button.addEventListener('click', () => {
      state.statusFilter = filter;
      renderTree();
      renderVariants();
      renderFilters();
    });

    filtersElement.append(button);
  }
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
  expectedImg.draggable = false;

  const actualLayer = document.createElement('div');
  actualLayer.className = 'image-actual';

  const actualImg = document.createElement('img');
  actualImg.src = getAssetUrl(actualUrl);
  actualImg.alt = `${altText} actual`;
  actualImg.draggable = false;

  const sizeNote = document.createElement('div');
  sizeNote.className = 'slider-note';

  const divider = document.createElement('div');
  divider.className = 'slider-divider';

  actualLayer.append(actualImg);
  sliderContainer.append(expectedImg, actualLayer, divider);
  wrap.append(sliderContainer, sizeNote);

  const input = document.createElement('input');
  input.className = 'slider-input';
  input.type = 'range';
  input.min = '0';
  input.max = '100';
  input.value = '50';

  const applySlider = (value, canvasWidth = sliderContainer.clientWidth) => {
    const revealWidth = Math.round((Math.max(0, Math.min(100, value)) / 100) * canvasWidth);
    actualLayer.style.width = `${revealWidth}px`;
    divider.style.left = `${revealWidth}px`;
  };

  const updateLayout = () => {
    if (!expectedImg.naturalWidth || !actualImg.naturalWidth || !wrap.clientWidth) {
      return;
    }

    const expectedWidth = expectedImg.naturalWidth;
    const expectedHeight = expectedImg.naturalHeight;
    const actualWidth = actualImg.naturalWidth;
    const actualHeight = actualImg.naturalHeight;
    const sameSize = expectedWidth === actualWidth && expectedHeight === actualHeight;

    const canvasNaturalWidth = sameSize ? expectedWidth : Math.max(expectedWidth, actualWidth);
    const canvasNaturalHeight = sameSize ? expectedHeight : Math.max(expectedHeight, actualHeight);

    const availableWidth = Math.max(1, wrap.clientWidth - 24);
    const scale = Math.min(1, availableWidth / canvasNaturalWidth);
    const canvasWidth = Math.max(1, Math.round(canvasNaturalWidth * scale));
    const canvasHeight = Math.max(1, Math.round(canvasNaturalHeight * scale));

    sliderContainer.style.width = `${canvasWidth}px`;
    sliderContainer.style.height = `${canvasHeight}px`;

    expectedImg.style.width = `${Math.round(expectedWidth * scale)}px`;
    expectedImg.style.height = `${Math.round(expectedHeight * scale)}px`;

    actualImg.style.width = `${Math.round(actualWidth * scale)}px`;
    actualImg.style.height = `${Math.round(actualHeight * scale)}px`;

    sizeNote.textContent = sameSize
      ? `${expectedWidth} × ${expectedHeight}`
      : `Size mismatch: expected ${expectedWidth}×${expectedHeight}, actual ${actualWidth}×${actualHeight}`;

    applySlider(Number(input.value), canvasWidth);
  };

  applySlider(50);
  expectedImg.addEventListener('load', updateLayout);
  actualImg.addEventListener('load', updateLayout);

  if (typeof ResizeObserver !== 'undefined') {
    const resizeObserver = new ResizeObserver(updateLayout);
    resizeObserver.observe(wrap);
  } else {
    window.addEventListener('resize', updateLayout);
  }

  if (expectedImg.complete && actualImg.complete) {
    updateLayout();
  }

  input.addEventListener('input', (event) => {
    applySlider(Number(event.target.value));
  });

  wrap.append(input);
  return wrap;
};

const renderVariants = () => {
  variantsElement.innerHTML = '';

  const filteredGroups = getFilteredComponentGroups();
  ensureSelectedKeyVisible(filteredGroups);

  if (!state.data || !state.selectedKey) {
    selectionTitle.textContent = 'No matching components';
    selectionSubtitle.textContent = 'Try a different status filter.';
    return;
  }

  const componentGroup = filteredGroups.find((item) => item.key === state.selectedKey);

  if (!componentGroup) {
    selectionTitle.textContent = 'No matching components';
    selectionSubtitle.textContent = 'Try a different status filter.';
    return;
  }

  const visibleVariantsCount = componentGroup.stories.reduce(
    (total, story) =>
      total + story.variants.filter((variant) => variantMatchesFilter(variant)).length,
    0,
  );
  const totalVariantsCount = componentGroup.stories.reduce(
    (total, story) => total + story.variants.length,
    0,
  );

  selectionTitle.textContent = `${componentGroup.namespace} / ${componentGroup.atomicLevel} / ${componentGroup.component}`;
  selectionSubtitle.textContent = `${visibleVariantsCount} shown of ${totalVariantsCount} variant(s)`;

  for (const story of componentGroup.stories.sort((a, b) => a.name.localeCompare(b.name))) {
    for (const variant of story.variants.filter((item) => variantMatchesFilter(item))) {
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

  const filteredGroups = getFilteredComponentGroups();
  ensureSelectedKeyVisible(filteredGroups);

  if (!state.data) {
    return;
  }

  const tree = buildTree(filteredGroups);

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
        const visibleVariantsCount = group.stories.reduce(
          (total, story) =>
            total + story.variants.filter((variant) => variantMatchesFilter(variant)).length,
          0,
        );

        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = `${group.component} (${visibleVariantsCount})`;
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

  renderFilters();
  renderTree();
  renderVariants();
};

bootstrap().catch((error) => {
  metaElement.textContent = `Failed to load report data: ${error instanceof Error ? error.message : String(error)}`;
});
