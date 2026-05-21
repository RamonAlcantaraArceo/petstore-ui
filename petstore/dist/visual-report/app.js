const state = {
  data: null,
  selectedKey: null,
  selectedStatusFilters: new Set(),
  variantModes: new Map(),
};

const metaElement = document.getElementById('meta');
const treeElement = document.getElementById('tree');
const variantsElement = document.getElementById('variants');
const selectionTitle = document.getElementById('selection-title');
const selectionSubtitle = document.getElementById('selection-subtitle');
const filtersElement = document.getElementById('status-filters');

const FILTERS = ['all', 'passed', 'failed', 'flaky', 'skipped', 'unknown'];
const FILTER_LABELS = {
  all: 'All',
  passed: 'Passed',
  failed: 'Failed',
  flaky: 'Flaky',
  skipped: 'Skipped',
  unknown: 'Unknown',
};
const FILTER_ICONS = {
  all: '📋',
  passed: '✅',
  failed: '❌',
  flaky: '⚠️',
  skipped: '⏭️',
  unknown: '?',
};
const TREE_STATUS_ORDER = ['failed', 'flaky', 'unknown', 'skipped', 'passed'];
const STATUS_ICONS = {
  passed: '✅',
  failed: '❌',
  flaky: '⚠️',
  skipped: '⏭️',
  unknown: '?',
};
const COMPARISON_MODES = [
  { value: 'diff', label: 'Diff' },
  { value: 'actual', label: 'Actual' },
  { value: 'expected', label: 'Expected' },
  { value: 'side-by-side', label: 'Side by Side' },
  { value: 'slider', label: 'Slider' },
];
const DEFAULT_COMPARISON_MODE = 'slider';

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
  const normalizedStatus = status ?? 'unknown';
  const icon = STATUS_ICONS[normalizedStatus] ?? STATUS_ICONS.unknown;
  const span = document.createElement('span');
  span.className = `badge ${normalizedStatus}`;
  span.textContent = `${icon} ${normalizedStatus}`;
  span.setAttribute('aria-label', `Status: ${normalizedStatus}`);
  return span;
};

const variantMatchesFilter = (variant) => {
  if (state.selectedStatusFilters.size === 0) {
    return true;
  }

  return state.selectedStatusFilters.has(variant.status ?? 'unknown');
};

const createStatusCounts = () => new Map(TREE_STATUS_ORDER.map((status) => [status, 0]));

const collectStatusCounts = (variants) => {
  const counts = createStatusCounts();

  for (const variant of variants) {
    const status = variant.status ?? 'unknown';
    if (!counts.has(status)) {
      counts.set(status, 0);
    }

    counts.set(status, (counts.get(status) ?? 0) + 1);
  }

  return counts;
};

const mergeStatusCounts = (targetCounts, sourceCounts) => {
  for (const [status, value] of sourceCounts.entries()) {
    targetCounts.set(status, (targetCounts.get(status) ?? 0) + value);
  }
};

const getVisibleVariantsForGroup = (group) =>
  group.stories.flatMap((story) =>
    story.variants.filter((variant) => variantMatchesFilter(variant)),
  );

const formatStatusBreakdown = (statusCounts) =>
  TREE_STATUS_ORDER.filter((status) => (statusCounts.get(status) ?? 0) > 0)
    .map((status) => `${status} ${statusCounts.get(status)}`)
    .join(', ');

const createTreeStatusChips = (statusCounts) => {
  const wrap = document.createElement('span');
  wrap.className = 'tree-status-chips';

  for (const status of TREE_STATUS_ORDER) {
    const count = statusCounts.get(status) ?? 0;
    if (!count) {
      continue;
    }

    const chip = document.createElement('span');
    chip.className = `tree-status-chip ${status}`;
    chip.textContent = `${STATUS_ICONS[status] ?? STATUS_ICONS.unknown} ${count}`;
    chip.setAttribute('aria-label', `${status} ${count}`);
    wrap.append(chip);
  }

  return wrap;
};

const createTreeLabel = (labelText, statusCounts) => {
  const wrap = document.createElement('span');
  wrap.className = 'tree-label';

  const text = document.createElement('span');
  text.className = 'tree-label-text';
  text.textContent = labelText;

  wrap.append(text, createTreeStatusChips(statusCounts));
  return wrap;
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

  return state.data.componentGroups.filter((group) =>
    group.stories.some((story) => story.variants.some((variant) => variantMatchesFilter(variant))),
  );
};

const isFilterActive = (filter) =>
  filter === 'all'
    ? state.selectedStatusFilters.size === 0
    : state.selectedStatusFilters.has(filter);

const toggleFilter = (filter) => {
  if (filter === 'all') {
    state.selectedStatusFilters.clear();
    return;
  }

  if (state.selectedStatusFilters.has(filter)) {
    state.selectedStatusFilters.delete(filter);
    return;
  }

  state.selectedStatusFilters.add(filter);
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
    button.classList.toggle('active', isFilterActive(filter));

    const icon = document.createElement('span');
    icon.className = 'status-filter-icon';
    icon.textContent = FILTER_ICONS[filter] ?? FILTER_ICONS.unknown;

    const label = document.createElement('span');
    label.className = 'status-filter-label';
    label.textContent = FILTER_LABELS[filter] ?? filter;

    const count = document.createElement('span');
    count.className = 'count';
    count.textContent = String(counts.get(filter) ?? 0);

    button.append(icon, label, count);
    button.addEventListener('click', () => {
      toggleFilter(filter);
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

  const controls = document.createElement('div');
  controls.className = 'slider-controls';

  const orientationToggle = document.createElement('button');
  orientationToggle.type = 'button';
  orientationToggle.className = 'slider-orientation-toggle';

  const divider = document.createElement('div');
  divider.className = 'slider-divider';

  const input = document.createElement('input');
  input.className = 'slider-input';
  input.type = 'range';
  input.min = '0';
  input.max = '100';
  input.value = '50';
  input.setAttribute('aria-label', 'Compare expected and actual image');

  let orientation = 'horizontal';
  let hasInitializedLayout = false;
  const DEFAULT_SLIDER_VALUE = 50;

  actualLayer.append(actualImg);
  sliderContainer.append(expectedImg, actualLayer, input, divider);
  controls.append(sizeNote, orientationToggle);
  wrap.append(sliderContainer, controls);

  const syncOrientationUi = () => {
    const isVertical = orientation === 'vertical';
    sliderContainer.classList.toggle('is-vertical', isVertical);
    divider.classList.toggle('is-vertical', isVertical);
    orientationToggle.textContent = isVertical ? 'Slide: Up/Down' : 'Slide: Left/Right';
    input.setAttribute(
      'aria-label',
      isVertical
        ? 'Compare expected and actual image by sliding up and down'
        : 'Compare expected and actual image by sliding left and right',
    );
  };

  const applySlider = (
    value,
    canvasWidth = sliderContainer.clientWidth,
    canvasHeight = sliderContainer.clientHeight,
  ) => {
    const clampedValue = Math.max(0, Math.min(100, value));

    if (orientation === 'vertical') {
      const revealHeight = Math.round((clampedValue / 100) * canvasHeight);
      actualLayer.style.width = `${canvasWidth}px`;
      actualLayer.style.height = `${revealHeight}px`;
      divider.style.left = '0';
      divider.style.top = `${revealHeight}px`;
      return;
    }

    const revealWidth = Math.round((clampedValue / 100) * canvasWidth);
    actualLayer.style.width = `${revealWidth}px`;
    actualLayer.style.height = `${canvasHeight}px`;
    divider.style.left = `${revealWidth}px`;
    divider.style.top = '0';
  };

  const setCentered = (
    canvasWidth = sliderContainer.clientWidth,
    canvasHeight = sliderContainer.clientHeight,
  ) => {
    input.value = String(DEFAULT_SLIDER_VALUE);
    applySlider(DEFAULT_SLIDER_VALUE, canvasWidth, canvasHeight);
  };

  const setSliderFromPointer = (clientX, clientY) => {
    const bounds = sliderContainer.getBoundingClientRect();
    if (!bounds.width || !bounds.height) {
      return;
    }

    const position =
      orientation === 'vertical'
        ? Math.min(Math.max(clientY - bounds.top, 0), bounds.height)
        : Math.min(Math.max(clientX - bounds.left, 0), bounds.width);

    const value =
      orientation === 'vertical'
        ? Math.round((position / bounds.height) * 100)
        : Math.round((position / bounds.width) * 100);

    input.value = String(value);
    applySlider(value, bounds.width, bounds.height);
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

    if (!hasInitializedLayout) {
      setCentered(canvasWidth, canvasHeight);
      hasInitializedLayout = true;
      return;
    }

    applySlider(Number(input.value), canvasWidth, canvasHeight);
  };

  syncOrientationUi();
  setCentered();
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

  let isDraggingDivider = false;

  const onPointerMove = (event) => {
    if (!isDraggingDivider) {
      return;
    }
    setSliderFromPointer(event.clientX, event.clientY);
  };

  const onPointerUp = () => {
    if (!isDraggingDivider) {
      return;
    }
    isDraggingDivider = false;
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
  };

  const startDrag = (event) => {
    event.preventDefault();
    isDraggingDivider = true;
    setSliderFromPointer(event.clientX, event.clientY);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  orientationToggle.addEventListener('click', () => {
    orientation = orientation === 'horizontal' ? 'vertical' : 'horizontal';
    syncOrientationUi();
    setCentered();
  });

  divider.addEventListener('pointerdown', startDrag);
  sliderContainer.addEventListener('pointerdown', startDrag);

  return wrap;
};

const getVariantMode = (variantKey) => {
  const activeMode = state.variantModes.get(variantKey);
  if (COMPARISON_MODES.some((mode) => mode.value === activeMode)) {
    return activeMode;
  }

  return DEFAULT_COMPARISON_MODE;
};

const createMissingState = (message) => {
  const empty = document.createElement('div');
  empty.className = 'empty';
  empty.textContent = message;
  return empty;
};

const createImagePanel = ({ imageUrl, altText, missingMessage }) => {
  const panel = document.createElement('div');
  panel.className = 'image-panel';

  if (!imageUrl) {
    panel.append(createMissingState(missingMessage));
    return panel;
  }

  const image = document.createElement('img');
  image.src = getAssetUrl(imageUrl);
  image.alt = altText;
  image.draggable = false;

  panel.append(image);
  return panel;
};

const createSideBySide = (expectedUrl, actualUrl, baseAltText) => {
  const container = document.createElement('div');
  container.className = 'side-by-side';

  const expectedPane = document.createElement('section');
  expectedPane.className = 'compare-pane';
  const expectedLabel = document.createElement('h4');
  expectedLabel.className = 'compare-label';
  expectedLabel.textContent = 'Expected';
  expectedPane.append(
    expectedLabel,
    createImagePanel({
      imageUrl: expectedUrl,
      altText: `${baseAltText} expected`,
      missingMessage: 'Expected image is not available for this variant.',
    }),
  );

  const actualPane = document.createElement('section');
  actualPane.className = 'compare-pane';
  const actualLabel = document.createElement('h4');
  actualLabel.className = 'compare-label';
  actualLabel.textContent = 'Actual';
  actualPane.append(
    actualLabel,
    createImagePanel({
      imageUrl: actualUrl,
      altText: `${baseAltText} actual`,
      missingMessage: 'Actual image is not available for this variant.',
    }),
  );

  container.append(expectedPane, actualPane);
  return container;
};

const renderVariantMode = (mode, variant, baseAltText) => {
  if (mode === 'diff') {
    return createImagePanel({
      imageUrl: variant.diff ?? null,
      altText: `${baseAltText} diff`,
      missingMessage: 'Diff image is not available for this variant.',
    });
  }

  if (mode === 'actual') {
    return createImagePanel({
      imageUrl: variant.actual,
      altText: `${baseAltText} actual`,
      missingMessage: 'Actual image is not available for this variant.',
    });
  }

  if (mode === 'expected') {
    return createImagePanel({
      imageUrl: variant.expected,
      altText: `${baseAltText} expected`,
      missingMessage: 'Expected image is not available for this variant.',
    });
  }

  if (mode === 'side-by-side') {
    return createSideBySide(variant.expected, variant.actual, baseAltText);
  }

  return createSlider(variant.expected, variant.actual, baseAltText);
};

const createModeControls = (variantKey, variant, onModeChange) => {
  const controls = document.createElement('div');
  controls.className = 'mode-controls';
  controls.setAttribute('role', 'tablist');
  controls.setAttribute('aria-label', 'Comparison mode');

  const idPrefix = `variant-${variantKey.replace(/[^a-zA-Z0-9_-]/g, '-')}`;
  const tabButtons = [];
  const disabledModes = new Set();

  if (variant.status === 'passed') {
    disabledModes.add('diff');
  }

  const enabledModes = COMPARISON_MODES.filter((mode) => !disabledModes.has(mode.value));

  const resolveSelectableMode = (mode) => {
    if (enabledModes.some((entry) => entry.value === mode)) {
      return mode;
    }

    if (enabledModes.some((entry) => entry.value === DEFAULT_COMPARISON_MODE)) {
      return DEFAULT_COMPARISON_MODE;
    }

    return enabledModes[0]?.value ?? DEFAULT_COMPARISON_MODE;
  };

  const updateSelection = (nextMode, focusSelected = false) => {
    const resolvedMode = resolveSelectableMode(nextMode);
    state.variantModes.set(variantKey, resolvedMode);

    for (const button of tabButtons) {
      const selected = button.dataset.mode === resolvedMode;
      button.setAttribute('aria-selected', selected ? 'true' : 'false');
      button.tabIndex = selected ? 0 : -1;
    }

    const selectedButton =
      tabButtons.find((button) => button.dataset.mode === resolvedMode) ?? null;
    onModeChange(resolvedMode, selectedButton?.id ?? null);

    if (focusSelected) {
      selectedButton?.focus();
    }
  };

  const moveSelection = (direction) => {
    const activeMode = resolveSelectableMode(getVariantMode(variantKey));
    const currentIndex = enabledModes.findIndex((mode) => mode.value === activeMode);
    if (currentIndex === -1) {
      updateSelection(DEFAULT_COMPARISON_MODE, true);
      return;
    }

    const nextIndex = (currentIndex + direction + enabledModes.length) % enabledModes.length;
    updateSelection(enabledModes[nextIndex].value, true);
  };

  for (const mode of COMPARISON_MODES) {
    const button = document.createElement('button');
    const isDisabled = disabledModes.has(mode.value);
    button.type = 'button';
    button.className = 'mode-tab';
    button.dataset.mode = mode.value;
    button.id = `${idPrefix}-tab-${mode.value}`;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', `${idPrefix}-panel`);
    button.setAttribute('aria-disabled', isDisabled ? 'true' : 'false');
    button.disabled = isDisabled;
    button.textContent = mode.label;
    button.addEventListener('click', () => {
      if (isDisabled) {
        return;
      }
      updateSelection(mode.value);
    });
    button.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        moveSelection(1);
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        moveSelection(-1);
      } else if (event.key === 'Home') {
        event.preventDefault();
        updateSelection(enabledModes[0].value, true);
      } else if (event.key === 'End') {
        event.preventDefault();
        updateSelection(enabledModes[enabledModes.length - 1].value, true);
      }
    });

    tabButtons.push(button);
    controls.append(button);
  }

  updateSelection(resolveSelectableMode(getVariantMode(variantKey)));

  return controls;
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

      const variantKey = `${story.id}::${variant.viewport}`;
      const panelId = `variant-${variantKey.replace(/[^a-zA-Z0-9_-]/g, '-')}-panel`;
      const altTextBase = `${story.name} ${variant.viewport}`;

      header.append(title, createStatusBadge(variant.status));
      card.append(header);

      const panel = document.createElement('div');
      panel.id = panelId;
      panel.className = 'mode-panel';
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-label', `Comparison preview for ${story.name} ${variant.viewport}`);

      const renderPanel = (mode, tabId) => {
        panel.innerHTML = '';
        panel.append(renderVariantMode(mode, variant, altTextBase));
        if (tabId) {
          panel.setAttribute('aria-labelledby', tabId);
        }
      };

      const controls = createModeControls(variantKey, variant, renderPanel);
      const activeTab = controls.querySelector('.mode-tab[aria-selected="true"]');
      const activeMode = activeTab?.dataset.mode ?? getVariantMode(variantKey);
      if (activeTab) {
        panel.setAttribute('aria-labelledby', activeTab.id);
      }

      renderPanel(activeMode, activeTab?.id ?? null);

      card.append(controls, panel);

      variantsElement.append(card);
    }
  }
};

const renderTree = () => {
  treeElement.className = 'tree';
  treeElement.innerHTML = '';

  const filteredGroups = getFilteredComponentGroups();
  ensureSelectedKeyVisible(filteredGroups);

  if (!state.data) {
    return;
  }

  const tree = buildTree(filteredGroups);

  for (const [namespace, levels] of [...tree.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const namespaceCounts = createStatusCounts();
    for (const groups of levels.values()) {
      for (const group of groups) {
        mergeStatusCounts(namespaceCounts, collectStatusCounts(getVisibleVariantsForGroup(group)));
      }
    }

    const namespaceDetails = document.createElement('details');
    namespaceDetails.className = 'tree-group tree-group-namespace';
    namespaceDetails.open = true;

    const namespaceSummary = document.createElement('summary');
    namespaceSummary.className = 'tree-summary tree-summary-namespace';
    namespaceSummary.append(createTreeLabel(namespace, namespaceCounts));
    const namespaceBreakdown = formatStatusBreakdown(namespaceCounts);
    if (namespaceBreakdown) {
      namespaceSummary.setAttribute('aria-label', `${namespace}. ${namespaceBreakdown}`);
    }

    namespaceDetails.append(namespaceSummary);

    for (const [level, groups] of [...levels.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
      const levelCounts = createStatusCounts();
      for (const group of groups) {
        mergeStatusCounts(levelCounts, collectStatusCounts(getVisibleVariantsForGroup(group)));
      }

      const levelDetails = document.createElement('details');
      levelDetails.className = 'tree-group tree-group-level';
      levelDetails.open = true;

      const levelSummary = document.createElement('summary');
      levelSummary.className = 'tree-summary tree-summary-level';
      const levelLabel = `${level} (${groups.length})`;
      levelSummary.append(createTreeLabel(levelLabel, levelCounts));
      const levelBreakdown = formatStatusBreakdown(levelCounts);
      if (levelBreakdown) {
        levelSummary.setAttribute('aria-label', `${levelLabel}. ${levelBreakdown}`);
      }

      const list = document.createElement('div');
      list.className = 'tree-list tree-list-components';

      for (const group of groups.sort((a, b) => a.component.localeCompare(b.component))) {
        const visibleVariants = getVisibleVariantsForGroup(group);
        const visibleVariantsCount = visibleVariants.length;
        const groupCounts = collectStatusCounts(visibleVariants);
        const componentLabel = `${group.component} (${visibleVariantsCount})`;

        const button = document.createElement('button');
        button.className = 'tree-item';
        button.type = 'button';
        button.append(createTreeLabel(componentLabel, groupCounts));
        const groupBreakdown = formatStatusBreakdown(groupCounts);
        if (groupBreakdown) {
          button.setAttribute('aria-label', `${componentLabel}. ${groupBreakdown}`);
        }
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
