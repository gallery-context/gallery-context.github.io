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
  { name: "Global", values: [{ r1: 0.49, map: 1.83 }, { r1: 0.33, map: 4.36 }, { r1: 1.90, map: 2.65 }] },
  { name: "Vertical", values: [{ r1: 0.11, map: 1.61 }, { r1: 0.28, map: 2.91 }, { r1: 0.80, map: 1.84 }] },
  { name: "Horizontal", values: [{ r1: 0.19, map: 1.36 }, { r1: 0.29, map: 3.21 }, { r1: 1.35, map: 1.57 }] },
  { name: "Grid", values: [{ r1: 0.18, map: 2.48 }, { r1: 0.28, map: 2.86 }, { r1: 0.90, map: 1.65 }] },
  { name: "Centroid", values: [{ r1: 0.06, map: 0.17 }, { r1: 0.06, map: 0.11 }, { r1: 1.05, map: 0.13 }] },
  { name: "Residual", values: [{ r1: 0.11, map: 0.50 }, { r1: 0.26, map: 2.54 }, { r1: 0.60, map: 0.87 }] },
  { name: "Global + Grid", values: [{ r1: 0.23, map: 2.30 }, { r1: 0.19, map: 4.19 }, { r1: 0.57, map: 2.44 }] }
];

const reasoningAblation = [
  { name: "MeanPool", values: [{ r1: 0.03, map: 0.04 }, { r1: 0.17, map: 0.47 }, { r1: 1.00, map: 0.02 }] },
  { name: "Flat-MLP", values: [{ r1: 0.08, map: 1.56 }, { r1: 0.22, map: 1.98 }, { r1: 0.40, map: 0.42 }] },
  { name: "QCRS-Mixer", values: [{ r1: 0.49, map: 1.83 }, { r1: 0.33, map: 4.36 }, { r1: 1.90, map: 2.65 }] }
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

function renderQualitative(filter = "all") {
  const container = document.querySelector("#qualitative-grid");
  if (!container) return;
  const selected = filter === "all"
    ? qualitativeExamples
    : qualitativeExamples.filter((item) => item.retriever === filter);
  container.innerHTML = selected.map((item) => `
    <section class="qual-model-row">
      <div class="qual-model-heading">
        <h3>${item.retriever}</h3>
      </div>
      <div class="qual-image-grid">
        ${item.figures.map((figure) => `
          <figure class="qual-figure">
            <figcaption>${qualitativeDatasetLabels[figure.datasetKey]}</figcaption>
            <button type="button" class="qual-image-button" aria-label="Open ${item.retriever} ${qualitativeDatasetLabels[figure.datasetKey]} retrieval figure" data-qual-src="${figure.src}" data-qual-alt="${item.retriever} ${qualitativeDatasetLabels[figure.datasetKey]} retrieval figure">
              <img src="${figure.src}" alt="${item.retriever} ${qualitativeDatasetLabels[figure.datasetKey]} retrieval figure" loading="lazy" decoding="async">
            </button>
          </figure>
        `).join("")}
      </div>
    </section>
  `).join("");
  bindQualitativeFigures();
}

function bindQualitativeTabs() {
  const tabs = Array.from(document.querySelectorAll(".qual-tabs button"));
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((button) => button.setAttribute("aria-selected", "false"));
      tab.setAttribute("aria-selected", "true");
      renderQualitative(tab.dataset.filter);
    });
  });
}

function bindQualitativeFigures() {
  const lightbox = document.querySelector("#qualitative-lightbox");
  const lightboxImage = document.querySelector("#qualitative-lightbox-image");
  if (!lightbox || !lightboxImage) return;
  const closeButton = lightbox.querySelector("[data-qual-lightbox-close]");
  let closeTimer = 0;

  const closeLightbox = () => {
    window.clearTimeout(closeTimer);
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.dataset.open = "false";
    closeTimer = window.setTimeout(() => {
      lightbox.hidden = true;
      lightboxImage.src = "";
      lightboxImage.alt = "";
    }, 160);
  };

  const openLightbox = (src, alt) => {
    window.clearTimeout(closeTimer);
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightbox.setAttribute("aria-hidden", "false");
    lightbox.hidden = false;
    window.requestAnimationFrame(() => {
      lightbox.dataset.open = "true";
      closeButton?.focus({ preventScroll: true });
    });
  };

  const buttons = Array.from(document.querySelectorAll(".qual-image-button"));
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const src = button.dataset.qualSrc;
      const alt = button.dataset.qualAlt || "";
      if (src) openLightbox(src, alt);
    });
  });

  if (lightbox.dataset.bound === "true") return;
  lightbox.dataset.bound = "true";

  lightbox.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.closest("[data-qual-lightbox-close]")) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) {
      closeLightbox();
    }
  });

  closeButton?.addEventListener("click", closeLightbox);
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

function bindTtbpsScrollFlow() {
  const figure = document.querySelector("[data-ttbps-visual]");
  const stage = figure?.querySelector("[data-ttbps-stage]");
  const panel = figure?.querySelector("[data-ttbps-panel]");
  const lanes = figure?.querySelector("[data-ttbps-lanes]");
  const queryCard = figure?.querySelector("[data-ttbps-query-card]");
  const standardDock = figure?.querySelector('[data-ttbps-query-dock="standard"]');
  const transductiveDock = figure?.querySelector('[data-ttbps-query-dock="transductive"]');

  if (!figure || !stage || !panel || !lanes || !queryCard || !standardDock || !transductiveDock) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  let rafId = 0;

  function applyLayout(progress) {
    const lanesRect = lanes.getBoundingClientRect();
    const standardRect = standardDock.getBoundingClientRect();
    const transductiveRect = transductiveDock.getBoundingClientRect();
    const standardX = standardRect.left - lanesRect.left;
    const eased = progress * progress * (3 - 2 * progress);
    const cardWidth = clamp(Math.round(Math.max(standardRect.width, 420)), 300, Math.round(lanesRect.width - standardX - 8));
    figure.style.setProperty("--ttbps-card-x", `${Math.round(standardX)}px`);
    figure.style.setProperty("--ttbps-card-width", `${cardWidth}px`);

    const cardHeight = queryCard.getBoundingClientRect().height;
    const standardCenter = standardRect.top + standardRect.height / 2 - lanesRect.top;
    const transductiveCenter = transductiveRect.top + transductiveRect.height / 2 - lanesRect.top;
    const cardY = standardCenter - cardHeight / 2 + (transductiveCenter - standardCenter) * eased;
    const flowOffset = (1 - eased) * 124;

    figure.style.setProperty("--ttbps-card-y", `${cardY.toFixed(2)}px`);
    figure.style.setProperty("--ttbps-trace-offset", `${flowOffset.toFixed(2)}`);
    figure.style.setProperty("--ttbps-standard-focus", `${(1 - eased * 0.42).toFixed(3)}`);
    figure.style.setProperty("--ttbps-transductive-focus", `${(0.7 + eased * 0.3).toFixed(3)}`);
    figure.dataset.ttbpsPhase = progress < 0.38 ? "standard" : progress > 0.68 ? "transductive" : "transition";
    queryCard.setAttribute("data-ttbps-progress", progress.toFixed(3));
  }

  function update() {
    rafId = 0;
    const viewport = window.innerHeight || document.documentElement.clientHeight;
    const stageRect = stage.getBoundingClientRect();
    const start = viewport * 0.82;
    const travel = Math.max(viewport * 0.9, stageRect.height - viewport * 0.12);
    const progress = clamp((start - stageRect.top) / travel, 0, 1);
    applyLayout(reduceMotion ? 0 : progress);
  }

  function scheduleUpdate() {
    if (rafId) return;
    rafId = window.requestAnimationFrame(update);
  }

  update();

  if (reduceMotion) return;

  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);
  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(stage);
    observer.observe(panel);
    observer.observe(lanes);
    observer.observe(standardDock);
    observer.observe(transductiveDock);
  }
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

document.addEventListener("DOMContentLoaded", () => {
  renderDiagnosticHeatmap();
  renderBenchmarkCards();
  renderRetrieverDeltas();
  renderRankingGains();
  renderTransferDirections();
  bindResultsMotion();
  bindTransferGraph();
  renderGroupedDeltas("#evidence-ablation", evidenceAblation, 1.9, 4.36);
  renderGroupedDeltas("#reasoning-ablation", reasoningAblation, 1.9, 4.36);
  renderQualitative();
  bindQualitativeTabs();
  bindNav();
  bindActiveNav();
  bindTtbpsScrollFlow();
  bindGateMethodExplorer();
});
