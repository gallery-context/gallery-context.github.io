const datasets = ["CUHK-PEDES", "ICFG-PEDES", "RSTPReid"];

const diagnostic = [
  { retriever: "CLIP", values: [6.91, 3.65, 14.36], ci: ["[6.23, 7.55]", "[3.32, 4.00]", "[12.59, 16.13]"] },
  { retriever: "IRRA", values: [7.53, 3.96, 15.66], ci: ["[6.75, 8.31]", "[3.60, 4.32]", "[13.90, 17.28]"] },
  { retriever: "RDE", values: [6.01, 3.00, 12.64], ci: ["[5.38, 6.61]", "[2.70, 3.35]", "[10.97, 14.35]"] },
  { retriever: "DM-Adapter", values: [7.79, 3.97, 13.27], ci: ["[7.02, 8.52]", "[3.60, 4.33]", "[11.72, 14.97]"] },
  { retriever: "ITSELF", values: [6.13, 2.84, 11.50], ci: ["[5.48, 6.79]", "[2.56, 3.14]", "[9.95, 13.26]"] }
];

const benchmarkResults = [
  {
    dataset: "CUHK-PEDES",
    r1: 77.39,
    map: 72.49,
    deltaR1: 0.47,
    deltaMap: 1.59
  },
  {
    dataset: "ICFG-PEDES",
    r1: 69.64,
    map: 48.23,
    deltaR1: 0.45,
    deltaMap: 4.09
  },
  {
    dataset: "RSTPReid",
    r1: 68.50,
    map: 55.24,
    deltaR1: 1.00,
    deltaMap: 2.11
  }
];

const differentSettingGroups = [
  {
    title: "ALBEF-based methods",
    items: ["ALBEF family", "Image-language pretraining"]
  },
  {
    title: "External tools / ReID pre-training",
    items: ["External tools", "ReID-domain pretraining"]
  },
  {
    title: "CLIP-based TBPS methods",
    items: ["Frozen CLIP host", "T-TBPS inference"]
  },
  {
    title: "GATE + ITSELF",
    items: ["Best reported frontier"]
  }
];

const retrieverDeltas = [
  { name: "CLIP", deltas: [{ r1: 0.49, map: 1.83 }, { r1: 0.33, map: 4.36 }, { r1: 1.90, map: 2.65 }] },
  { name: "IRRA", deltas: [{ r1: 0.42, map: 2.98 }, { r1: 1.13, map: 4.33 }, { r1: 1.85, map: 2.58 }] },
  { name: "RDE", deltas: [{ r1: 0.33, map: 1.25 }, { r1: 0.66, map: 1.67 }, { r1: 1.00, map: 1.50 }] },
  { name: "DM-Adapter", deltas: [{ r1: 0.51, map: 3.46 }, { r1: 1.05, map: 6.84 }, { r1: 1.50, map: 2.39 }] },
  { name: "ITSELF", deltas: [{ r1: 0.47, map: 3.15 }, { r1: 0.45, map: 4.45 }, { r1: 1.25, map: 2.22 }] }
];

const rankingAverageGains = [
  { dataset: "CUHK-PEDES", r1: 0.44, map: 2.53 },
  { dataset: "ICFG-PEDES", r1: 0.72, map: 4.33 },
  { dataset: "RSTPReid", r1: 1.50, map: 2.27 }
];

const transferDirections = [
  ["CUHK-PEDES", "ICFG-PEDES"],
  ["CUHK-PEDES", "RSTPReid"],
  ["ICFG-PEDES", "CUHK-PEDES"],
  ["ICFG-PEDES", "RSTPReid"],
  ["RSTPReid", "CUHK-PEDES"],
  ["RSTPReid", "ICFG-PEDES"]
];

const transfers = [
  { direction: "CUHK -> ICFG", avgR1: 0.35, avgMap: 2.64, maxR1: 0.50, maxMap: 3.83 },
  { direction: "ICFG -> CUHK", avgR1: 0.56, avgMap: 1.55, maxR1: 1.27, maxMap: 3.28 },
  { direction: "ICFG -> RSTP", avgR1: 0.79, avgMap: 2.20, maxR1: 2.26, maxMap: 5.13 },
  { direction: "RSTP -> ICFG", avgR1: 1.04, avgMap: 3.85, maxR1: 2.27, maxMap: 4.62 },
  { direction: "CUHK -> RSTP", avgR1: 0.64, avgMap: 1.62, maxR1: 1.35, maxMap: 3.37 },
  { direction: "RSTP -> CUHK", avgR1: 0.38, avgMap: 0.89, maxR1: 0.65, maxMap: 1.29 }
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
    <article class="benchmark-card">
      <h3>${item.dataset}</h3>
      <div class="metric-row">
        <div class="metric-box">
          <span>R@1</span>
          <strong>${item.r1.toFixed(2)}</strong>
        </div>
        <div class="metric-box">
          <span>mAP</span>
          <strong>${item.map.toFixed(2)}</strong>
        </div>
      </div>
      <p class="gain-line">vs best non-GATE result: ${formatDelta(item.deltaR1)} R@1 / ${formatDelta(item.deltaMap)} mAP</p>
    </article>
  `).join("");
}

function renderComparisonLadder() {
  const container = document.querySelector("#comparison-ladder");
  if (!container) return;
  container.innerHTML = differentSettingGroups.map((group, index) => `
    <article class="comparison-step ${index === differentSettingGroups.length - 1 ? "comparison-step--final" : ""}">
      <div class="comparison-step__index">0${index + 1}</div>
      <div class="comparison-step__body">
        <strong>${group.title}</strong>
        <div class="comparison-step__items">
          ${group.items.map((item) => `<span>${item}</span>`).join("")}
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
        <div class="retriever-matrix__cell">
          <strong>${formatDelta(value.r1)} / ${formatDelta(value.map)}</strong>
          <span>ΔR@1 / ΔmAP</span>
        </div>
      `).join("")}
    </div>
  `).join("");
  container.innerHTML = `
    <div class="retriever-matrix__header">
      <div></div>
      ${header}
    </div>
    <div class="retriever-matrix__body">${rows}</div>
  `;
}

function tile(status, index) {
  if (status === "…" || status === "...") {
    return '<span class="result-tile ellipsis" aria-hidden="true">…</span>';
  }
  const isTarget = status === "T";
  const label = isTarget ? "target" : "distractor";
  return `<span class="result-tile ${label}" aria-label="Rank ${index + 1}: ${label}">${status}</span>`;
}

function renderRankingStrips() {
  const frozen = document.querySelector("#ranking-frozen");
  const enriched = document.querySelector("#ranking-enriched");
  if (frozen) {
    frozen.innerHTML = ["D", "T", "D", "T", "D", "T"].map(tile).join("");
  }
  if (enriched) {
    enriched.innerHTML = ["T", "T", "D", "T", "D", "…"].map(tile).join("");
  }
}

function renderRankingGains() {
  const container = document.querySelector("#ranking-gains");
  if (!container) return;
  container.innerHTML = rankingAverageGains.map((item) => `
    <article class="ranking-gain">
      <strong>${item.dataset}</strong>
      <span>${formatDelta(item.r1)} R@1</span>
      <span>${formatDelta(item.map)} mAP</span>
    </article>
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
  container.innerHTML = transferDirections.map(([source, target]) => `
    <div class="transfer-direction">
      <span>${source}</span>
      <strong>&rarr;</strong>
      <span>${target}</span>
    </div>
  `).join("");
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

document.addEventListener("DOMContentLoaded", () => {
  renderDiagnosticHeatmap();
  renderBenchmarkCards();
  renderComparisonLadder();
  renderRetrieverDeltas();
  renderRankingStrips();
  renderRankingGains();
  renderTransferDirections();
  renderGroupedDeltas("#evidence-ablation", evidenceAblation, 1.9, 4.36);
  renderGroupedDeltas("#reasoning-ablation", reasoningAblation, 1.9, 4.36);
  renderQualitative();
  bindQualitativeTabs();
  bindNav();
  bindActiveNav();
  bindTtbpsScrollFlow();
});
