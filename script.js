const datasets = ["CUHK-PEDES", "ICFG-PEDES", "RSTPReid"];

const diagnostic = [
  { retriever: "CLIP", values: [6.91, 3.65, 14.36], ci: ["[6.23, 7.55]", "[3.32, 4.00]", "[12.59, 16.13]"] },
  { retriever: "IRRA", values: [7.53, 3.96, 15.66], ci: ["[6.75, 8.31]", "[3.60, 4.32]", "[13.90, 17.28]"] },
  { retriever: "RDE", values: [6.01, 3.00, 12.64], ci: ["[5.38, 6.61]", "[2.70, 3.35]", "[10.97, 14.35]"] },
  { retriever: "DM-Adapter", values: [7.79, 3.97, 13.27], ci: ["[7.02, 8.52]", "[3.60, 4.33]", "[11.72, 14.97]"] },
  { retriever: "ITSELF", values: [6.13, 2.84, 11.50], ci: ["[5.48, 6.79]", "[2.56, 3.14]", "[9.95, 13.26]"] }
];

const benchmarkResults = [
  { dataset: "CUHK-PEDES", r1: 77.39, map: 72.49, deltaR1: 0.86, deltaMap: 1.59 },
  { dataset: "ICFG-PEDES", r1: 69.64, map: 48.23, deltaR1: 1.13, deltaMap: 4.09 },
  { dataset: "RSTPReid", r1: 68.50, map: 55.24, deltaR1: 1.00, deltaMap: 2.11 }
];

const retrieverDeltas = [
  { name: "CLIP", deltas: [{ r1: 0.49, map: 1.83 }, { r1: 0.33, map: 4.36 }, { r1: 1.90, map: 2.65 }] },
  { name: "IRRA", deltas: [{ r1: 0.42, map: 2.98 }, { r1: 1.13, map: 4.33 }, { r1: 1.85, map: 2.58 }] },
  { name: "RDE", deltas: [{ r1: 0.33, map: 1.25 }, { r1: 0.66, map: 1.67 }, { r1: 1.00, map: 1.50 }] },
  { name: "DM-Adapter", deltas: [{ r1: 0.51, map: 3.46 }, { r1: 1.05, map: 6.84 }, { r1: 1.50, map: 2.39 }] },
  { name: "ITSELF", deltas: [{ r1: 0.47, map: 3.15 }, { r1: 0.45, map: 4.45 }, { r1: 1.25, map: 2.22 }] }
];

const hostAverageGains = [
  { dataset: "CUHK", r1: 0.44, map: 2.53 },
  { dataset: "ICFG", r1: 0.72, map: 4.33 },
  { dataset: "RSTP", r1: 1.50, map: 2.27 }
];

const transfers = [
  { direction: "CUHK → ICFG", avgR1: 0.35, avgMap: 2.64, maxR1: 0.50, maxMap: 3.83 },
  { direction: "ICFG → CUHK", avgR1: 0.56, avgMap: 1.55, maxR1: 1.27, maxMap: 3.28 },
  { direction: "ICFG → RSTP", avgR1: 0.79, avgMap: 2.20, maxR1: 2.26, maxMap: 5.13 },
  { direction: "RSTP → ICFG", avgR1: 1.04, avgMap: 3.85, maxR1: 2.27, maxMap: 4.62 },
  { direction: "CUHK → RSTP", avgR1: 0.64, avgMap: 1.62, maxR1: 1.35, maxMap: 3.37 },
  { direction: "RSTP → CUHK", avgR1: 0.38, avgMap: 0.89, maxR1: 0.65, maxMap: 1.29 }
];

const evidenceAblation = [
  { name: "Global", group: "individual", family: "Semantic", values: [{ r1: 0.49, map: 1.83 }, { r1: 0.33, map: 4.36 }, { r1: 1.90, map: 2.65 }] },
  { name: "Vertical", group: "individual", family: "Spatial", values: [{ r1: 0.11, map: 1.61 }, { r1: 0.28, map: 2.91 }, { r1: 0.80, map: 1.84 }] },
  { name: "Horizontal", group: "individual", family: "Spatial", values: [{ r1: 0.19, map: 1.36 }, { r1: 0.29, map: 3.21 }, { r1: 1.35, map: 1.57 }] },
  { name: "Grid", group: "individual", family: "Spatial", values: [{ r1: 0.18, map: 2.48 }, { r1: 0.28, map: 2.86 }, { r1: 0.90, map: 1.65 }] },
  { name: "Centroid", group: "individual", family: "Gallery-relative", values: [{ r1: 0.06, map: 0.17 }, { r1: 0.06, map: 0.11 }, { r1: 1.05, map: 0.13 }] },
  { name: "Residual", group: "individual", family: "Gallery-relative", values: [{ r1: 0.11, map: 0.50 }, { r1: 0.26, map: 2.54 }, { r1: 0.60, map: 0.87 }] },
  { name: "Global + Vertical", group: "combined", partner: "Vertical", values: [{ r1: 0.34, map: 1.67 }, { r1: 0.37, map: 3.56 }, { r1: 1.00, map: 2.23 }] },
  { name: "Global + Horizontal", group: "combined", partner: "Horizontal", values: [{ r1: 0.16, map: 2.46 }, { r1: 0.33, map: 2.46 }, { r1: 0.85, map: 2.04 }] },
  { name: "Global + Grid", group: "combined", partner: "Grid", values: [{ r1: 0.23, map: 2.30 }, { r1: 0.19, map: 4.19 }, { r1: 0.57, map: 2.44 }] },
  { name: "Global + Centroid", group: "combined", partner: "Centroid", values: [{ r1: 0.24, map: 1.91 }, { r1: 0.45, map: 3.86 }, { r1: 0.65, map: 1.87 }] },
  { name: "Global + Residual", group: "combined", partner: "Residual", values: [{ r1: 0.15, map: 1.21 }, { r1: 0.35, map: 3.88 }, { r1: 0.90, map: 1.89 }] }
];

const reasoningClipBaseline = [
  { r1: 74.66, map: 67.63 },
  { r1: 66.04, map: 41.02 },
  { r1: 61.35, map: 49.29 }
];

const reasoningAblation = [
  { key: "meanpool", name: "MeanPool", tag: "GENERIC AGGREGATION", scores: [{ r1: 74.69, map: 67.67 }, { r1: 66.21, map: 41.49 }, { r1: 62.35, map: 49.31 }] },
  { key: "flatmlp", name: "Flat-MLP", tag: "FLATTENED AGGREGATION", scores: [{ r1: 74.74, map: 69.19 }, { r1: 66.26, map: 43.00 }, { r1: 61.75, map: 49.71 }] },
  { key: "wo-film", name: "w/o FiLM", tag: "COMPONENT ABLATION", removed: "film", scores: [{ r1: 74.92, map: 70.94 }, { r1: 66.34, map: 43.44 }, { r1: 62.00, map: 51.37 }] },
  { key: "wo-rankemb", name: "w/o R-Emb.", tag: "COMPONENT ABLATION", removed: "rankemb", scores: [{ r1: 74.69, map: 68.40 }, { r1: 66.20, map: 44.52 }, { r1: 61.80, map: 50.87 }] },
  { key: "wo-slotemb", name: "w/o S-Emb.", tag: "COMPONENT ABLATION", removed: "slotemb", scores: [{ r1: 74.77, map: 69.76 }, { r1: 66.24, map: 43.35 }, { r1: 62.15, map: 51.30 }] },
  { key: "wo-slotmix", name: "w/o SlotMix", tag: "COMPONENT ABLATION", removed: "slotmix", scores: [{ r1: 74.84, map: 69.01 }, { r1: 66.26, map: 44.69 }, { r1: 61.90, map: 49.65 }] },
  { key: "wo-rankmix", name: "w/o RankMix", tag: "COMPONENT ABLATION", removed: "rankmix", scores: [{ r1: 74.79, map: 70.59 }, { r1: 66.15, map: 44.25 }, { r1: 62.15, map: 51.34 }] },
  { key: "wo-chanmix", name: "w/o ChanMix", tag: "COMPONENT ABLATION", removed: "chanmix", scores: [{ r1: 74.85, map: 70.21 }, { r1: 66.31, map: 45.02 }, { r1: 61.85, map: 50.76 }] },
  { key: "qcrs", name: "QCRS-Mixer", tag: "COMPLETE STRUCTURE", scores: [{ r1: 75.15, map: 69.46 }, { r1: 66.37, map: 45.38 }, { r1: 63.25, map: 51.94 }] }
];

const qualitativeDatasetLabels = {
  cuhk: "CUHK-PEDES",
  icfg: "ICFG-PEDES",
  rstp: "RSTPReid"
};

const qualitativeSourceFiles = {
  CLIP: ["[t]clip-cuhk.png", "[t]clip-icfg.png", "[t]clip-rstp.png"],
  ITSELF: ["[t]itself-cuhk.png", "[t]itself-icfg.png", "[t]itself-rstp.png"],
  "DM-Adapter": ["[t]dm-adapter-cuhk.png", "[t]dm-adapter-icfg.png", "[t]dm-adapter-rstp.png"],
  RDE: ["[t]rde-cuhk.png", "[t]rde-icfg.png", "[t]rde-rstp.png"],
  IRRA: ["[t]irra-cuhk.png", "[t]irra-icfg.png", "[t]irra-rstp.png"]
};

function inferQualitativeDatasetKey(src) {
  const match = src.match(/-(cuhk|icfg|rstp)\.png$/i);
  return match ? match[1] : "";
}

const qualitativeExamples = Object.entries(qualitativeSourceFiles).map(([retriever, sources]) => ({
  retriever,
  figures: sources.map((file) => {
    const datasetKey = inferQualitativeDatasetKey(file);
    return {
      datasetKey,
      src: `assets/qualitative/${file}`
    };
  })
}));

function formatDelta(value) {
  return `+${value.toFixed(2)}`;
}

function renderDiagnosticHeatmap() {
  const container = document.querySelector("#diagnostic-heatmap");
  if (!container) return;
  const allValues = diagnostic.flatMap((row) => row.values);
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const header = datasets.map((dataset) => `<th scope="col">${dataset}</th>`).join("");
  const rows = diagnostic.map((row) => {
    const cells = row.values.map((value, index) => {
      const intensity = (value - min) / (max - min);
      const alpha = 0.16 + intensity * 0.62;
      return `
        <td class="heat-cell" style="--heat-alpha: ${alpha.toFixed(3)}">
          <span>${value.toFixed(2)}%</span>
          <small>${row.ci[index]}</small>
        </td>
      `;
    }).join("");
    return `<tr><th scope="row">${row.retriever}</th>${cells}</tr>`;
  }).join("");
  container.innerHTML = `
    <table>
      <caption>Top-1 correctness Flip Rate under cue-swapped galleries</caption>
      <thead><tr><th scope="col">Retriever</th>${header}</tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}


function renderDiagnosticSensitivityMatrix() {
  const container = document.querySelector("#diagnostic-sensitivity-matrix");
  if (!container) return;

  const shortDatasets = ["CUHK", "ICFG", "RSTP"];
  const header = shortDatasets.map((name) => `<div class="diagx-matrix__head">${name}</div>`).join("");
  const rows = diagnostic.map((row) => `
    <div class="diagx-matrix__label">${row.retriever}</div>
    ${row.values.map((value, index) => `
      <div class="diagx-matrix__cell" title="${row.retriever} · ${datasets[index]}: ${value.toFixed(2)}% Flip Rate">
        <i aria-hidden="true"></i><strong>${value.toFixed(2)}</strong>
      </div>
    `).join("")}
  `).join("");

  container.innerHTML = `<div class="diagx-matrix__corner"></div>${header}${rows}`;
}

function renderBenchmarkCards() {
  const container = document.querySelector("#benchmark-frontier");
  if (!container) return;
  container.innerHTML = benchmarkResults.map((item) => `
    <article class="benchmark-card" data-result-reveal>
      <div class="benchmark-card__head">
        <div>
          <div class="benchmark-card__eyebrow">Benchmark</div>
          <h3>${item.dataset}</h3>
        </div>
        <span class="benchmark-card__model">GATE<sub>ITSELF</sub></span>
      </div>
      <div class="metric-row">
        <div class="metric-box">
          <div class="metric-box__head">
            <span>R@1</span>
            <em data-result-reveal>Δ ${formatDelta(item.deltaR1)}</em>
          </div>
          <strong data-result-count="${item.r1}" data-result-decimals="2">${item.r1.toFixed(2)}</strong>
        </div>
        <div class="metric-box">
          <div class="metric-box__head">
            <span>mAP</span>
            <em data-result-reveal>Δ ${formatDelta(item.deltaMap)}</em>
          </div>
          <strong data-result-count="${item.map}" data-result-decimals="2">${item.map.toFixed(2)}</strong>
        </div>
      </div>
    </article>
  `).join("");
}

function renderRetrieverDeltas() {
  const container = document.querySelector("#retriever-matrix");
  if (!container) return;
  const header = datasets.map((dataset) => `<div class="retriever-matrix__head">${dataset}</div>`).join("");
  const rows = retrieverDeltas.map((row) => `
    <div class="retriever-matrix__row">
      <div class="retriever-matrix__label">${row.name}</div>
      ${row.deltas.map((value) => `
        <div class="retriever-matrix__cell" data-result-reveal>
          <strong>${formatDelta(value.r1)} / ${formatDelta(value.map)}</strong>
          <span>R@1 / mAP</span>
        </div>
      `).join("")}
    </div>
  `).join("");
  container.innerHTML = `
    <div class="retriever-matrix__legend">Each cell shows ΔR@1 / ΔmAP after adding GATE</div>
    <div class="retriever-matrix__header">
      <div></div>
      ${header}
    </div>
    <div class="retriever-matrix__body">${rows}</div>
  `;
}

function renderRankingGains() {
  const container = document.querySelector("#ranking-gains");
  if (!container) return;
  container.innerHTML = hostAverageGains.map((item) => `
    <div class="ranking-gain" data-result-reveal>
      <strong>${item.dataset}</strong>
      <span>${formatDelta(item.r1)} R@1</span>
      <b>${formatDelta(item.map)} mAP</b>
    </div>
  `).join("");
}

function renderGroupedDeltas(containerSelector, rows, maxR1, maxMap) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  container.innerHTML = rows.map((row) => {
    const bars = row.values.map((value, index) => `
      <div class="mini-bar">
        <span>${datasets[index]}</span>
        <div class="bar-track" aria-hidden="true">
          <div class="bar-fill" style="width: ${(value.r1 / maxR1 * 100).toFixed(1)}%"></div>
        </div>
        <strong>${formatDelta(value.r1)} R@1</strong>
      </div>
      <div class="mini-bar">
        <span>${datasets[index]}</span>
        <div class="bar-track" aria-hidden="true">
          <div class="bar-fill map" style="width: ${(value.map / maxMap * 100).toFixed(1)}%"></div>
        </div>
        <strong>${formatDelta(value.map)} mAP</strong>
      </div>
    `).join("");
    return `
      <article class="${containerSelector.includes("ablation") ? "ablation-row" : "delta-row"}">
        <div class="${containerSelector.includes("ablation") ? "ablation-label" : "delta-label"}">${row.name}</div>
        <div class="mini-bars">${bars}</div>
      </article>
    `;
  }).join("");
}

function renderTransferDirections() {
  const container = document.querySelector("#transfer-directions");
  if (!container) return;
  container.innerHTML = transfers.map((item) => {
    const [source, target] = item.direction.split(" → ");
    return `
      <button
        type="button"
        class="transfer-direction"
        data-transfer-direction="${item.direction}"
        data-transfer-source="${source}"
        data-transfer-target="${target}"
        aria-pressed="false"
        data-result-reveal
      >
        <strong>${item.direction}</strong>
        <span>${formatDelta(item.avgR1)} R@1</span>
        <b>${formatDelta(item.avgMap)} mAP</b>
      </button>
    `;
  }).join("");
}


function bindResultsMotion() {
  const results = document.querySelector("#results");
  if (!results) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealTargets = Array.from(results.querySelectorAll("[data-result-reveal]"));
  const countTargets = Array.from(results.querySelectorAll("[data-result-count]"));
  const stages = Array.from(results.querySelectorAll(".results-stage"));
  const transferFigure = results.querySelector(".transfer-figure");

  revealTargets.forEach((element) => element.classList.add("result-motion-ready"));
  countTargets.forEach((element) => element.classList.add("result-count-ready"));

  const finishCount = (element) => {
    const target = Number.parseFloat(element.dataset.resultCount || "0");
    const decimals = Number.parseInt(element.dataset.resultDecimals || "0", 10);
    element.textContent = target.toFixed(decimals);
    element.classList.add("is-revealed");
    element.dataset.resultAnimated = "true";
  };

  const animateCount = (element) => {
    if (element.dataset.resultAnimated === "true") return;
    if (reduceMotion) {
      finishCount(element);
      return;
    }

    const target = Number.parseFloat(element.dataset.resultCount || "0");
    const decimals = Number.parseInt(element.dataset.resultDecimals || "0", 10);
    const duration = target > 10 ? 680 : 520;
    const start = performance.now();
    element.dataset.resultAnimated = "true";
    element.classList.add("is-revealed");

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = (target * eased).toFixed(decimals);
      if (progress < 1) window.requestAnimationFrame(tick);
      else element.textContent = target.toFixed(decimals);
    };

    window.requestAnimationFrame(tick);
  };

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach((element) => element.classList.add("is-revealed"));
    countTargets.forEach(finishCount);
    stages.forEach((stage) => stage.classList.add("is-visible"));
    transferFigure?.classList.add("is-visible");
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      if (element.matches("[data-result-count]")) animateCount(element);
      else element.classList.add("is-revealed");
      observer.unobserve(element);
    });
  }, { threshold: 0.3, rootMargin: "0px 0px -8% 0px" });

  [...revealTargets, ...countTargets].forEach((element) => observer.observe(element));

  const stageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  }, { threshold: 0.18, rootMargin: "0px 0px -12% 0px" });

  stages.forEach((stage) => stageObserver.observe(stage));
  if (transferFigure) stageObserver.observe(transferFigure);
}

function bindTransferGraph() {
  const figure = document.querySelector("#results .transfer-figure");
  const map = figure?.querySelector("[data-transfer-map]");
  const paths = figure ? Array.from(figure.querySelectorAll("[data-transfer-route]")) : [];
  const nodes = figure ? Array.from(figure.querySelectorAll("[data-transfer-node]")) : [];
  const cards = figure ? Array.from(figure.querySelectorAll("[data-transfer-direction]")) : [];
  const tooltip = figure?.querySelector("[data-transfer-tooltip]");
  if (!figure || !map || !paths.length || !nodes.length || !cards.length) return;

  const transferByDirection = new Map(transfers.map((item) => [item.direction, item]));
  let locked = null;

  const setPressed = (element, pressed) => {
    if (element.hasAttribute("aria-pressed")) element.setAttribute("aria-pressed", String(pressed));
  };

  const hideTooltip = () => {
    if (!tooltip) return;
    tooltip.setAttribute("aria-hidden", "true");
    tooltip.classList.remove("is-visible");
  };

  const showTooltip = (direction) => {
    if (!tooltip) return;
    const item = transferByDirection.get(direction);
    const path = paths.find((candidate) => candidate.dataset.transferRoute === direction);
    if (!item || !path) return;

    const svg = path.ownerSVGElement;
    const length = path.getTotalLength();
    const point = path.getPointAtLength(length * 0.5);
    const viewBox = svg.viewBox.baseVal;
    const x = ((point.x - viewBox.x) / viewBox.width) * map.clientWidth;
    const y = ((point.y - viewBox.y) / viewBox.height) * map.clientHeight;

    tooltip.innerHTML = `
      <strong>${item.direction}</strong>
      <span>${formatDelta(item.avgR1)} R@1</span>
      <b>${formatDelta(item.avgMap)} mAP</b>
    `;
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
    tooltip.setAttribute("aria-hidden", "false");
    window.requestAnimationFrame(() => tooltip.classList.add("is-visible"));
  };

  const clearVisualState = () => {
    figure.removeAttribute("data-transfer-mode");
    figure.removeAttribute("data-transfer-locked");
    [...paths, ...nodes, ...cards].forEach((element) => {
      element.classList.remove("is-active", "is-dimmed", "is-source", "is-target", "is-connected");
      setPressed(element, false);
    });
    hideTooltip();
  };

  const applyRoute = (direction, isLocked = false) => {
    const item = transferByDirection.get(direction);
    if (!item) return;
    const [source, target] = direction.split(" → ");
    figure.dataset.transferMode = "route";
    figure.dataset.transferLocked = String(isLocked);

    paths.forEach((path) => {
      const active = path.dataset.transferRoute === direction;
      path.classList.toggle("is-active", active);
      path.classList.toggle("is-dimmed", !active);
      setPressed(path, active && isLocked);
    });

    nodes.forEach((node) => {
      const name = node.dataset.transferNode;
      const connected = name === source || name === target;
      node.classList.toggle("is-active", connected);
      node.classList.toggle("is-source", name === source);
      node.classList.toggle("is-target", name === target);
      node.classList.toggle("is-dimmed", !connected);
      setPressed(node, false);
    });

    cards.forEach((card) => {
      const active = card.dataset.transferDirection === direction;
      card.classList.toggle("is-active", active);
      card.classList.toggle("is-dimmed", !active);
      setPressed(card, active && isLocked);
    });

    showTooltip(direction);
  };

  const applyNode = (dataset, isLocked = false) => {
    figure.dataset.transferMode = "node";
    figure.dataset.transferLocked = String(isLocked);
    hideTooltip();

    paths.forEach((path) => {
      const connected = path.dataset.source === dataset || path.dataset.target === dataset;
      path.classList.toggle("is-connected", connected);
      path.classList.toggle("is-active", connected);
      path.classList.toggle("is-dimmed", !connected);
      setPressed(path, false);
    });

    nodes.forEach((node) => {
      const active = node.dataset.transferNode === dataset;
      node.classList.toggle("is-active", active);
      node.classList.toggle("is-dimmed", false);
      node.classList.remove("is-source", "is-target");
      setPressed(node, active && isLocked);
    });

    cards.forEach((card) => {
      const connected = card.dataset.transferSource === dataset || card.dataset.transferTarget === dataset;
      card.classList.toggle("is-active", connected);
      card.classList.toggle("is-dimmed", !connected);
      setPressed(card, false);
    });
  };

  const reset = () => {
    locked = null;
    clearVisualState();
  };

  const previewRoute = (direction) => {
    if (!locked) applyRoute(direction, false);
  };

  const previewNode = (dataset) => {
    if (!locked) applyNode(dataset, false);
  };

  const endPreview = () => {
    if (!locked) clearVisualState();
  };

  const toggleLock = (type, key) => {
    if (locked?.type === type && locked.key === key) {
      reset();
      return;
    }
    locked = { type, key };
    if (type === "route") applyRoute(key, true);
    else applyNode(key, true);
  };

  cards.forEach((card) => {
    const direction = card.dataset.transferDirection;
    card.addEventListener("pointerenter", () => previewRoute(direction));
    card.addEventListener("pointerleave", endPreview);
    card.addEventListener("focus", () => previewRoute(direction));
    card.addEventListener("blur", endPreview);
    card.addEventListener("click", () => toggleLock("route", direction));
  });

  paths.forEach((path) => {
    const direction = path.dataset.transferRoute;
    path.addEventListener("pointerenter", () => previewRoute(direction));
    path.addEventListener("pointerleave", endPreview);
    path.addEventListener("focus", () => previewRoute(direction));
    path.addEventListener("blur", endPreview);
    path.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleLock("route", direction);
    });
    path.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleLock("route", direction);
      }
    });
  });

  nodes.forEach((node) => {
    const dataset = node.dataset.transferNode;
    node.addEventListener("pointerenter", () => previewNode(dataset));
    node.addEventListener("pointerleave", endPreview);
    node.addEventListener("focus", () => previewNode(dataset));
    node.addEventListener("blur", endPreview);
    node.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleLock("node", dataset);
    });
  });

  map.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (!target.closest("[data-transfer-route], [data-transfer-node]")) reset();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && locked) reset();
  });
}

const qualitativeCropLayout = {
  fullWidth: 2048,
  fullHeight: 920,
  rows: [
    { y: 75, height: 240 },
    { y: 370, height: 240 },
    { y: 660, height: 240 }
  ],
  regions: {
    query: { x: 0, width: 335 },
    gate: { x: 400, width: 795 },
    base: { x: 1260, width: 788 }
  }
};

function getQualitativeFigure(retriever, datasetKey) {
  return qualitativeExamples
    .find((item) => item.retriever === retriever)
    ?.figures.find((figure) => figure.datasetKey === datasetKey) || null;
}

function applyQualitativeCrop(cropElement, image, regionName, caseIndex) {
  if (!cropElement || !image) return;
  const region = qualitativeCropLayout.regions[regionName];
  const row = qualitativeCropLayout.rows[caseIndex];
  if (!region || !row) return;

  const { fullWidth, fullHeight } = qualitativeCropLayout;
  cropElement.style.setProperty("--qual-crop-image-width", `${(fullWidth / region.width * 100).toFixed(4)}%`);
  cropElement.style.setProperty("--qual-crop-x", `${(-region.x / fullWidth * 100).toFixed(4)}%`);
  cropElement.style.setProperty("--qual-crop-y", `${(-row.y / fullHeight * 100).toFixed(4)}%`);
  cropElement.style.aspectRatio = `${region.width} / ${row.height}`;
}

function bindQualitativeExplorer() {
  const explorer = document.querySelector("[data-qual-explorer]");
  const stage = explorer?.querySelector("[data-qual-stage]");
  const overviewImage = explorer?.querySelector("[data-qual-overview-image]");
  const rowFocus = explorer?.querySelector("[data-qual-row-focus]");
  const stageKicker = explorer?.querySelector("[data-qual-stage-kicker]");
  const baseLabel = explorer?.querySelector("[data-qual-base-label]");
  const gateLabel = explorer?.querySelector("[data-qual-gate-label]");
  const status = explorer?.querySelector("[data-qual-status]");
  const retrieverTabs = explorer ? Array.from(explorer.querySelectorAll("[data-qual-retriever]")) : [];
  const datasetTabs = explorer ? Array.from(explorer.querySelectorAll("[data-qual-dataset]")) : [];
  const caseTabs = explorer ? Array.from(explorer.querySelectorAll("[data-qual-case]")) : [];
  const cropElements = explorer ? Array.from(explorer.querySelectorAll("[data-qual-crop]")) : [];
  const replayButton = explorer?.querySelector("[data-qual-replay]");
  const originalButtons = explorer ? Array.from(explorer.querySelectorAll("[data-qual-open-original]")) : [];
  const lightbox = document.querySelector("#qualitative-lightbox");
  const lightboxImage = document.querySelector("#qualitative-lightbox-image");

  if (!explorer || !stage || !overviewImage || !rowFocus || !retrieverTabs.length || !datasetTabs.length || !caseTabs.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let activeRetriever = retrieverTabs.find((tab) => tab.getAttribute("aria-selected") === "true")?.dataset.qualRetriever || "CLIP";
  let activeDataset = datasetTabs.find((tab) => tab.getAttribute("aria-selected") === "true")?.dataset.qualDataset || "cuhk";
  let activeCase = Number.parseInt(caseTabs.find((tab) => tab.getAttribute("aria-selected") === "true")?.dataset.qualCase || "0", 10);
  let currentFigure = null;
  let switchTimer = 0;
  let motionTimer = 0;
  let hasEnteredViewport = false;

  const setSelected = (tabs, selected) => {
    tabs.forEach((tab) => {
      const isSelected = tab === selected;
      tab.setAttribute("aria-selected", String(isSelected));
      tab.tabIndex = isSelected ? 0 : -1;
    });
  };

  const playComparison = () => {
    window.clearTimeout(motionTimer);
    stage.classList.remove("is-playing");
    if (reduceMotion) return;
    void stage.offsetWidth;
    stage.classList.add("is-playing");
    motionTimer = window.setTimeout(() => stage.classList.remove("is-playing"), 2850);
  };

  const updateCropImages = (src) => {
    cropElements.forEach((crop) => {
      const image = crop.querySelector("[data-qual-crop-image]");
      const regionName = crop.dataset.qualCrop;
      if (!image || !regionName) return;
      image.src = src;
      applyQualitativeCrop(crop, image, regionName, activeCase);
    });
  };

  const commitUpdate = (play = false) => {
    const figure = getQualitativeFigure(activeRetriever, activeDataset);
    if (!figure) return;
    currentFigure = figure;

    const datasetLabel = qualitativeDatasetLabels[activeDataset] || activeDataset;
    const alt = `${activeRetriever} ${datasetLabel} qualitative retrieval figure`;
    overviewImage.src = figure.src;
    overviewImage.alt = alt;
    stageKicker.textContent = `${activeRetriever} · ${datasetLabel}`;
    baseLabel.textContent = activeRetriever;
    gateLabel.textContent = `GATE–${activeRetriever}`;
    updateCropImages(figure.src);

    const row = qualitativeCropLayout.rows[activeCase];
    rowFocus.style.setProperty("--qual-row-top", `${(row.y / qualitativeCropLayout.fullHeight * 100).toFixed(3)}%`);
    rowFocus.style.setProperty("--qual-row-height", `${(row.height / qualitativeCropLayout.fullHeight * 100).toFixed(3)}%`);
    rowFocus.querySelector("b").textContent = `CASE ${String(activeCase + 1).padStart(2, "0")}`;

    if (status) {
      status.textContent = `${activeRetriever}, ${datasetLabel}, case ${activeCase + 1} selected.`;
    }

    if (play && hasEnteredViewport) {
      window.setTimeout(playComparison, reduceMotion ? 0 : 110);
    }
  };

  const updateViewer = (play = false) => {
    window.clearTimeout(switchTimer);
    if (reduceMotion) {
      commitUpdate(play);
      return;
    }
    stage.classList.add("is-switching");
    switchTimer = window.setTimeout(() => {
      commitUpdate(play);
      window.requestAnimationFrame(() => stage.classList.remove("is-switching"));
    }, 120);
  };

  retrieverTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activeRetriever = tab.dataset.qualRetriever || "CLIP";
      setSelected(retrieverTabs, tab);
      updateViewer(true);
    });
  });

  datasetTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activeDataset = tab.dataset.qualDataset || "cuhk";
      setSelected(datasetTabs, tab);
      updateViewer(true);
    });
  });

  caseTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activeCase = Number.parseInt(tab.dataset.qualCase || "0", 10);
      setSelected(caseTabs, tab);
      updateViewer(true);
    });
  });

  replayButton?.addEventListener("click", playComparison);

  const openOriginal = () => {
    if (!currentFigure || !lightbox || !lightboxImage) return;
    const datasetLabel = qualitativeDatasetLabels[activeDataset] || activeDataset;
    lightboxImage.src = currentFigure.src;
    lightboxImage.alt = `${activeRetriever} ${datasetLabel} qualitative retrieval figure`;
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    window.requestAnimationFrame(() => {
      lightbox.dataset.open = "true";
      lightbox.querySelector(".qual-lightbox-close")?.focus({ preventScroll: true });
    });
  };

  originalButtons.forEach((button) => button.addEventListener("click", openOriginal));

  if (lightbox && lightboxImage && lightbox.dataset.bound !== "true") {
    lightbox.dataset.bound = "true";
    let closeTimer = 0;
    const closeLightbox = () => {
      window.clearTimeout(closeTimer);
      lightbox.dataset.open = "false";
      lightbox.setAttribute("aria-hidden", "true");
      closeTimer = window.setTimeout(() => {
        lightbox.hidden = true;
        lightboxImage.src = "";
        lightboxImage.alt = "";
      }, reduceMotion ? 0 : 160);
    };

    lightbox.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof Element && target.closest("[data-qual-lightbox-close]")) closeLightbox();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
    });
  }

  commitUpdate(false);

  if (reduceMotion || !("IntersectionObserver" in window)) {
    hasEnteredViewport = true;
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || hasEnteredViewport) return;
      hasEnteredViewport = true;
      playComparison();
      observer.disconnect();
    });
  }, { threshold: 0.34, rootMargin: "0px 0px -8% 0px" });

  observer.observe(stage);
}

function bindNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector("#nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
  links.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

function bindActiveNav() {
  const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
  const targets = navLinks
    .map((link) => ({
      link,
      section: document.querySelector(link.getAttribute("href"))
    }))
    .filter((item) => item.section);
  if (!targets.length) return;

  function updateActiveNav() {
    const anchor = window.scrollY + 120;
    let active = targets[0];
    targets.forEach((item) => {
      if (item.section.offsetTop <= anchor) {
        active = item;
      }
    });
    navLinks.forEach((link) => link.classList.remove("active"));
    active.link.classList.add("active");
  }

  updateActiveNav();
  window.addEventListener("scroll", updateActiveNav, { passive: true });
  window.addEventListener("resize", updateActiveNav);
}

function bindDiagnosticStory() {
  const figure = document.querySelector("[data-diagnostic-visual]");
  const replay = figure?.querySelector("[data-diagnostic-replay]");
  const matrix = document.querySelector("#diagnostic-sensitivity-matrix");
  const count = document.querySelector("[data-diagnostic-count]");
  if (!figure) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let playTimer = 0;

  const play = () => {
    window.clearTimeout(playTimer);
    figure.classList.remove("is-playing");
    if (reduceMotion) return;
    void figure.offsetWidth;
    figure.classList.add("is-playing");
    playTimer = window.setTimeout(() => figure.classList.remove("is-playing"), 1900);
  };

  replay?.addEventListener("click", play);

  const finishCount = () => {
    if (!count) return;
    const target = Number.parseInt(count.dataset.diagnosticCount || "0", 10);
    count.textContent = new Intl.NumberFormat("en-US").format(target);
    count.dataset.diagnosticAnimated = "true";
  };

  const animateCount = () => {
    if (!count || count.dataset.diagnosticAnimated === "true") return;
    if (reduceMotion) {
      finishCount();
      return;
    }
    const target = Number.parseInt(count.dataset.diagnosticCount || "0", 10);
    const formatter = new Intl.NumberFormat("en-US");
    const start = performance.now();
    const duration = 760;
    count.dataset.diagnosticAnimated = "true";
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      count.textContent = formatter.format(Math.round(target * eased));
      if (progress < 1) window.requestAnimationFrame(tick);
      else count.textContent = formatter.format(target);
    };
    window.requestAnimationFrame(tick);
  };

  if (reduceMotion || !("IntersectionObserver" in window)) {
    matrix?.classList.add("is-visible");
    finishCount();
    return;
  }

  const figureObserver = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    play();
    figureObserver.disconnect();
  }, { threshold: 0.34, rootMargin: "0px 0px -8% 0px" });
  figureObserver.observe(figure);

  if (matrix) {
    const matrixObserver = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      matrix.classList.add("is-visible");
      matrixObserver.disconnect();
    }, { threshold: 0.4, rootMargin: "0px 0px -8% 0px" });
    matrixObserver.observe(matrix);
  }

  if (count) {
    const countObserver = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      animateCount();
      countObserver.disconnect();
    }, { threshold: 0.55, rootMargin: "0px 0px -8% 0px" });
    countObserver.observe(count);
  }
}

function bindTtbpsScrollFlow() {
  const figure = document.querySelector("[data-ttbps-visual]");
  const buttons = figure ? Array.from(figure.querySelectorAll("[data-ttbps-mode-button]")) : [];
  if (!figure || buttons.length === 0) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let switchTimer = 0;

  const setMode = (mode, animate = true) => {
    const nextMode = mode === "transductive" ? "transductive" : "standard";
    figure.dataset.ttbpsMode = nextMode;

    buttons.forEach((button) => {
      const selected = button.dataset.ttbpsModeButton === nextMode;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });

    if (!animate || reduceMotion) return;
    window.clearTimeout(switchTimer);
    figure.classList.remove("is-switching");
    void figure.offsetWidth;
    figure.classList.add("is-switching");
    switchTimer = window.setTimeout(() => figure.classList.remove("is-switching"), 420);
  };

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => setMode(button.dataset.ttbpsModeButton, true));
    button.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const next = (index + direction + buttons.length) % buttons.length;
      buttons[next].focus();
      setMode(buttons[next].dataset.ttbpsModeButton, true);
    });
  });

  setMode(figure.dataset.ttbpsMode || "standard", false);
}


function bindGateMethodExplorer() {
  const explorer = document.querySelector("[data-gate-explorer]");
  const carousel = explorer?.querySelector("[data-gate-carousel]");
  const slides = explorer ? Array.from(explorer.querySelectorAll("[data-gate-slide]")) : [];
  const tabs = explorer ? Array.from(explorer.querySelectorAll("[data-gate-tab]")) : [];
  const overviewLinks = Array.from(document.querySelectorAll("#method [data-gate-overview-target]"));
  const prev = explorer?.querySelector("[data-gate-prev]");
  const next = explorer?.querySelector("[data-gate-next]");
  const counter = explorer?.querySelector("[data-gate-counter]");

  if (!explorer || !carousel || slides.length === 0) return;

  const clampIndex = (index) => Math.max(0, Math.min(slides.length - 1, index));
  let activeIndex = 0;
  let rafId = 0;

  function setActive(index) {
    activeIndex = clampIndex(index);
    tabs.forEach((tab, tabIndex) => {
      const active = tabIndex === activeIndex;
      tab.classList.toggle("is-active", active);
      if (active) tab.setAttribute("aria-current", "step");
      else tab.removeAttribute("aria-current");
    });
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeIndex);
    });
    overviewLinks.forEach((link) => {
      const targetIndex = Number.parseInt(link.dataset.gateOverviewTarget || "-1", 10);
      link.classList.toggle("is-linked-active", targetIndex === activeIndex && explorer.open);
    });
    if (counter) counter.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    if (prev) prev.disabled = activeIndex === 0;
    if (next) next.disabled = activeIndex === slides.length - 1;
  }

  function goTo(index, behavior = "smooth") {
    const targetIndex = clampIndex(index);
    const slide = slides[targetIndex];
    if (!slide) return;
    carousel.scrollTo({ left: slide.offsetLeft, behavior });
    setActive(targetIndex);
  }

  function openFromOverview(index, hash) {
    const targetIndex = clampIndex(index);
    explorer.open = true;
    window.requestAnimationFrame(() => {
      goTo(targetIndex, "auto");
      explorer.scrollIntoView({ behavior: "smooth", block: "start" });
      if (hash && window.history?.replaceState) {
        window.history.replaceState(null, "", hash);
      }
    });
  }

  function detectActiveFromScroll() {
    rafId = 0;
    const carouselRect = carousel.getBoundingClientRect();
    const center = carouselRect.left + carouselRect.width / 2;
    let bestIndex = 0;
    let bestDistance = Number.POSITIVE_INFINITY;
    slides.forEach((slide, index) => {
      const rect = slide.getBoundingClientRect();
      const slideCenter = rect.left + rect.width / 2;
      const distance = Math.abs(slideCenter - center);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = index;
      }
    });
    setActive(bestIndex);
  }

  function scheduleDetect() {
    if (rafId) return;
    rafId = window.requestAnimationFrame(detectActiveFromScroll);
  }

  overviewLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const index = Number.parseInt(link.dataset.gateOverviewTarget || "0", 10);
      openFromOverview(index, link.getAttribute("href"));
    });
  });

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => goTo(index));
  });
  prev?.addEventListener("click", () => goTo(activeIndex - 1));
  next?.addEventListener("click", () => goTo(activeIndex + 1));
  carousel.addEventListener("scroll", scheduleDetect, { passive: true });
  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(activeIndex + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(activeIndex - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      goTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      goTo(slides.length - 1);
    }
  });

  explorer.addEventListener("toggle", () => {
    overviewLinks.forEach((link) => link.classList.remove("is-linked-active"));
    if (!explorer.open) return;
    window.requestAnimationFrame(() => {
      carousel.scrollLeft = slides[activeIndex]?.offsetLeft || 0;
      setActive(activeIndex);
      if (window.MathJax?.typesetPromise) {
        window.MathJax.typesetPromise([explorer]).catch(() => {});
      }
    });
  });

  const initialHashIndex = slides.findIndex((slide) => `#${slide.id}` === window.location.hash);
  if (initialHashIndex >= 0) {
    explorer.open = true;
    window.requestAnimationFrame(() => goTo(initialHashIndex, "auto"));
  } else {
    setActive(0);
  }
}


function formatSignedDelta(value) {
  const sign = value > 0 ? "+" : value < 0 ? "−" : "±";
  return `${sign}${Math.abs(value).toFixed(2)}`;
}

function bindAnalysisEvidenceLab() {
  const lab = document.querySelector("[data-analysis-evidence]");
  if (!lab) return;

  const datasetTabs = Array.from(lab.querySelectorAll("[data-analysis-evidence-dataset]"));
  const metricTabs = Array.from(lab.querySelectorAll("[data-analysis-evidence-metric]"));
  const providerTabs = Array.from(lab.querySelectorAll("[data-analysis-provider]"));
  const chart = lab.querySelector("#analysis-evidence-chart");
  const context = lab.querySelector("[data-analysis-evidence-context]");
  const winnerName = lab.querySelector("[data-analysis-evidence-winner]");
  const winnerValue = lab.querySelector("[data-analysis-evidence-winner-value]");
  const winnerNote = lab.querySelector("[data-analysis-evidence-winner-note]");
  const bestIndividual = lab.querySelector("[data-analysis-best-individual]");
  const bestCombined = lab.querySelector("[data-analysis-best-combined]");
  const providerChip = lab.querySelector("[data-analysis-provider-chip]");
  const providerName = lab.querySelector("[data-analysis-provider-name]");
  const providerValue = lab.querySelector("[data-analysis-provider-value]");
  const comboName = lab.querySelector("[data-analysis-combo-name]");
  const comboValue = lab.querySelector("[data-analysis-combo-value]");
  const dumbbellBase = lab.querySelector("[data-analysis-dumbbell-base]");
  const dumbbellCombo = lab.querySelector("[data-analysis-dumbbell-combo]");
  const dumbbellLink = lab.querySelector("[data-analysis-dumbbell-link]");
  const compare = lab.querySelector("[data-analysis-global-compare]");
  const verdictLabel = lab.querySelector("[data-analysis-global-verdict-label]");
  const verdictValue = lab.querySelector("[data-analysis-global-verdict-value]");
  const verdictCopy = lab.querySelector("[data-analysis-global-verdict-copy]");
  if (!chart || !datasetTabs.length || !metricTabs.length || !providerTabs.length) return;

  const shortDatasets = ["CUHK", "ICFG", "RSTP"];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let datasetIndex = 0;
  let metric = "map";
  let provider = "Vertical";
  let motionTimer = 0;

  const metricLabel = () => metric === "map" ? "mAP" : "R@1";
  const selectedValue = (row) => row.values[datasetIndex][metric];

  const setSelected = (tabs, active) => {
    tabs.forEach((tab) => {
      const selected = tab === active;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
  };

  const animateRefresh = (element) => {
    if (!element || reduceMotion) return;
    window.clearTimeout(motionTimer);
    element.classList.remove("is-refreshing");
    void element.offsetWidth;
    element.classList.add("is-refreshing");
    motionTimer = window.setTimeout(() => element.classList.remove("is-refreshing"), 360);
  };

  const renderChart = () => {
    const groups = [
      { key: "individual", label: "INDIVIDUAL PROVIDERS" },
      { key: "combined", label: "GLOBAL + PROVIDER" }
    ];
    const visibleValues = evidenceAblation.map(selectedValue);
    const maxValue = Math.max(metric === "map" ? 4.5 : 2.0, Math.ceil(Math.max(...visibleValues) * 10) / 10);
    const half = maxValue / 2;
    const winner = evidenceAblation.reduce((best, row) => selectedValue(row) > selectedValue(best) ? row : best, evidenceAblation[0]);
    const individualRows = evidenceAblation.filter((row) => row.group === "individual");
    const combinedRows = evidenceAblation.filter((row) => row.group === "combined");
    const bestInd = individualRows.reduce((best, row) => selectedValue(row) > selectedValue(best) ? row : best, individualRows[0]);
    const bestComb = combinedRows.reduce((best, row) => selectedValue(row) > selectedValue(best) ? row : best, combinedRows[0]);

    const groupMarkup = groups.map((group) => {
      const rows = evidenceAblation
        .filter((row) => row.group === group.key)
        .slice()
        .sort((a, b) => selectedValue(b) - selectedValue(a));
      return `
        <section class="analysisx-dot-group">
          <header><span>${group.label}</span><small>${rows.length} configurations</small></header>
          ${rows.map((row) => {
            const value = selectedValue(row);
            const position = Math.max(0, Math.min(100, value / maxValue * 100));
            const isWinner = row === winner;
            return `
              <div class="analysisx-dot-row${isWinner ? " is-winner" : ""}" style="--analysis-dot-pos:${position.toFixed(2)}%">
                <div class="analysisx-dot-label"><strong>${row.name}</strong>${row.family ? `<small>${row.family}</small>` : ""}</div>
                <div class="analysisx-dot-track" aria-hidden="true"><span></span><i></i></div>
                <b>${formatDelta(value)}</b>
              </div>
            `;
          }).join("")}
        </section>
      `;
    }).join("");

    chart.innerHTML = `
      <div class="analysisx-dot-scale" aria-hidden="true"><span>0</span><span>+${half.toFixed(1)}</span><span>+${maxValue.toFixed(1)}</span></div>
      ${groupMarkup}
    `;

    if (context) context.textContent = `${datasets[datasetIndex]} · ${metricLabel()}`;
    if (winnerName) winnerName.textContent = winner.name;
    if (winnerValue) winnerValue.textContent = `${formatDelta(selectedValue(winner))} ${metricLabel()}`;
    if (winnerNote) {
      winnerNote.textContent = winner.group === "individual"
        ? "On this view, the strongest result comes from an individual provider rather than a Global combination."
        : "On this view, a Global-combined provider is strongest — but this pattern does not hold across every benchmark and metric.";
    }
    if (bestIndividual) bestIndividual.textContent = `${bestInd.name} · ${formatDelta(selectedValue(bestInd))}`;
    if (bestCombined) bestCombined.textContent = `${bestComb.name} · ${formatDelta(selectedValue(bestComb))}`;
    animateRefresh(chart);
  };

  const renderGlobalComparison = () => {
    const base = evidenceAblation.find((row) => row.group === "individual" && row.name === provider);
    const combo = evidenceAblation.find((row) => row.group === "combined" && row.partner === provider);
    if (!base || !combo) return;

    const baseValue = selectedValue(base);
    const comboMetricValue = selectedValue(combo);
    const delta = comboMetricValue - baseValue;
    const allValues = evidenceAblation.map(selectedValue);
    const maxValue = Math.max(metric === "map" ? 4.5 : 2.0, Math.max(...allValues));
    const basePos = Math.max(0, Math.min(100, baseValue / maxValue * 100));
    const comboPos = Math.max(0, Math.min(100, comboMetricValue / maxValue * 100));
    const left = Math.min(basePos, comboPos);
    const right = Math.max(basePos, comboPos);
    const verdict = delta > 0.005 ? "helps" : delta < -0.005 ? "hurts" : "neutral";

    if (providerChip) providerChip.textContent = provider;
    if (providerName) providerName.textContent = provider;
    if (providerValue) providerValue.textContent = formatDelta(baseValue);
    if (comboName) comboName.textContent = `Global + ${provider}`;
    if (comboValue) comboValue.textContent = formatDelta(comboMetricValue);
    if (dumbbellBase) dumbbellBase.style.left = `${basePos.toFixed(2)}%`;
    if (dumbbellCombo) dumbbellCombo.style.left = `${comboPos.toFixed(2)}%`;
    if (dumbbellLink) {
      dumbbellLink.style.left = `${left.toFixed(2)}%`;
      dumbbellLink.style.width = `${Math.max(1.5, right - left).toFixed(2)}%`;
    }
    if (compare) {
      compare.dataset.verdict = verdict;
      if (!reduceMotion) {
        compare.classList.remove("is-merging");
        void compare.offsetWidth;
        compare.classList.add("is-merging");
      }
    }
    if (verdictLabel) verdictLabel.textContent = verdict === "helps" ? "HELPS" : verdict === "hurts" ? "HURTS" : "NEAR-EQUAL";
    if (verdictValue) verdictValue.textContent = formatSignedDelta(delta);
    if (verdictCopy) verdictCopy.textContent = `Adding Global changes ${metricLabel()} by ${formatSignedDelta(delta)} points on ${shortDatasets[datasetIndex]}.`;
  };

  const render = () => {
    renderChart();
    renderGlobalComparison();
  };

  datasetTabs.forEach((tab) => tab.addEventListener("click", () => {
    datasetIndex = Number.parseInt(tab.dataset.analysisEvidenceDataset || "0", 10);
    setSelected(datasetTabs, tab);
    render();
  }));

  metricTabs.forEach((tab) => tab.addEventListener("click", () => {
    metric = tab.dataset.analysisEvidenceMetric === "r1" ? "r1" : "map";
    setSelected(metricTabs, tab);
    render();
  }));

  providerTabs.forEach((tab) => tab.addEventListener("click", () => {
    provider = tab.dataset.analysisProvider || "Vertical";
    setSelected(providerTabs, tab);
    renderGlobalComparison();
  }));

  render();
}

function bindAnalysisReasoningLab() {
  const lab = document.querySelector("[data-analysis-reasoning]");
  if (!lab) return;

  const architectureTabs = Array.from(lab.querySelectorAll("[data-analysis-reasoning-key]"));
  const componentChoices = Array.from(lab.querySelectorAll("[data-analysis-component-choice]"));
  const componentNodes = Array.from(lab.querySelectorAll("[data-analysis-component], [data-analysis-component-button]"));
  const reset = lab.querySelector("[data-analysis-reasoning-reset]");
  const scene = lab.querySelector("[data-analysis-mixer-scene]");
  const scoreGrid = lab.querySelector("#analysis-reasoning-scores");
  const tag = lab.querySelector("[data-analysis-reasoning-tag]");
  const name = lab.querySelector("[data-analysis-reasoning-name]");
  const copy = lab.querySelector("[data-analysis-reasoning-copy]");
  const note = lab.querySelector("[data-analysis-reasoning-note]");
  if (!architectureTabs.length || !scoreGrid) return;

  const componentToKey = {
    film: "wo-film",
    rankemb: "wo-rankemb",
    slotemb: "wo-slotemb",
    slotmix: "wo-slotmix",
    rankmix: "wo-rankmix",
    chanmix: "wo-chanmix"
  };

  const descriptions = {
    meanpool: "Uniform pooling collapses the evidence into one vector before any structured reasoning.",
    flatmlp: "Flat-MLP keeps more capacity than pooling, but flattens rank and slot relations before reasoning.",
    qcrs: "Query conditioning, rank/slot embeddings, and all three mixer passes are active.",
    "wo-film": "FiLM is removed, so the same cached evidence is no longer explicitly modulated by the current query before mixing.",
    "wo-rankemb": "Rank embeddings are removed, weakening the explicit encoding of the frozen retriever's candidate order.",
    "wo-slotemb": "Slot embeddings are removed, weakening the explicit identity of each evidence source.",
    "wo-slotmix": "SlotMix is removed, so complementary evidence within each candidate is not explicitly consolidated first.",
    "wo-rankmix": "RankMix is removed, so agreement and contrast across ordered candidates are not explicitly modeled.",
    "wo-chanmix": "ChanMix is removed, leaving out the final channel-wise refinement after structural interactions."
  };

  const notes = {
    meanpool: "MeanPool yields almost no mAP improvement on CUHK and RSTP, showing that access to evidence alone is insufficient.",
    flatmlp: "Flattened aggregation is stronger than MeanPool but remains below complete QCRS across all three benchmarks in R@1.",
    qcrs: "The complete model gives the best R@1 on all three benchmarks and the best mAP on ICFG and RSTP.",
    "wo-film": "Individual component effects are non-monotonic: removing FiLM raises CUHK mAP, but the complete model remains stronger overall across benchmarks.",
    "wo-rankemb": "Removing rank embeddings reduces the balanced cross-benchmark result, especially on CUHK and RSTP R@1.",
    "wo-slotemb": "Slot identity matters differently across benchmarks; the complete model remains the strongest overall configuration.",
    "wo-slotmix": "Without SlotMix, CUHK and RSTP ranking quality drops, even though ICFG mAP remains competitive.",
    "wo-rankmix": "RankMix is not uniformly dominant per metric, but the full composition produces the strongest overall benchmark balance.",
    "wo-chanmix": "Channel mixing contributes to the complete configuration even though some single-metric ablations can be locally competitive."
  };

  let activeKey = "qcrs";

  const render = () => {
    const row = reasoningAblation.find((item) => item.key === activeKey) || reasoningAblation[reasoningAblation.length - 1];
    const isQcrsFamily = activeKey === "qcrs" || Boolean(row.removed);

    architectureTabs.forEach((tab) => {
      const key = tab.dataset.analysisReasoningKey;
      const selected = key === activeKey || (key === "qcrs" && isQcrsFamily);
      tab.setAttribute("aria-selected", String(selected));
      tab.classList.toggle("analysisx-arch--active", selected);
      tab.tabIndex = selected ? 0 : -1;
    });

    componentChoices.forEach((button) => {
      const component = button.dataset.analysisComponentChoice;
      const selected = row.removed === component;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    componentNodes.forEach((node) => {
      const component = node.dataset.analysisComponent || node.dataset.analysisComponentButton;
      node.classList.toggle("is-removed", Boolean(row.removed) && component === row.removed);
    });

    if (scene) scene.classList.toggle("is-baseline-mode", !isQcrsFamily);
    if (tag) tag.textContent = row.tag;
    if (name) name.textContent = row.name;
    if (copy) copy.textContent = descriptions[activeKey] || descriptions.qcrs;
    if (note) note.textContent = notes[activeKey] || notes.qcrs;

    scoreGrid.innerHTML = row.scores.map((score, index) => {
      const base = reasoningClipBaseline[index];
      const deltaR1 = score.r1 - base.r1;
      const deltaMap = score.map - base.map;
      return `
        <div class="analysisx-score-card">
          <span>${["CUHK", "ICFG", "RSTP"][index]}</span>
          <strong>${score.r1.toFixed(2)} <i>/</i> ${score.map.toFixed(2)}</strong>
          <small>Δ ${formatSignedDelta(deltaR1)} R@1 · ${formatSignedDelta(deltaMap)} mAP</small>
        </div>
      `;
    }).join("");
  };

  architectureTabs.forEach((tab) => tab.addEventListener("click", () => {
    activeKey = tab.dataset.analysisReasoningKey || "qcrs";
    render();
  }));

  componentChoices.forEach((button) => button.addEventListener("click", () => {
    const component = button.dataset.analysisComponentChoice;
    activeKey = componentToKey[component] || "qcrs";
    render();
  }));

  componentNodes.forEach((node) => {
    if (!(node instanceof HTMLButtonElement)) return;
    node.addEventListener("click", () => {
      const component = node.dataset.analysisComponentButton;
      activeKey = componentToKey[component] || "qcrs";
      render();
    });
  });

  reset?.addEventListener("click", () => {
    activeKey = "qcrs";
    render();
  });

  render();
}

function bindAnalysisMotion() {
  const section = document.querySelector("#analysis");
  if (!section) return;
  const panels = Array.from(section.querySelectorAll(".analysisx-panel"));
  if (!panels.length) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    panels.forEach((panel) => panel.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
  panels.forEach((panel) => observer.observe(panel));
}

function bindAnalysisSection() {
  bindAnalysisEvidenceLab();
  bindAnalysisReasoningLab();
  bindAnalysisMotion();
}

document.addEventListener("DOMContentLoaded", () => {
  renderDiagnosticHeatmap();
  renderDiagnosticSensitivityMatrix();
  renderBenchmarkCards();
  renderRetrieverDeltas();
  renderRankingGains();
  renderTransferDirections();
  bindResultsMotion();
  bindTransferGraph();
  bindAnalysisSection();
  bindQualitativeExplorer();
  bindNav();
  bindActiveNav();
  bindDiagnosticStory();
  bindTtbpsScrollFlow();
  bindGateMethodExplorer();
});
