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
    base: { name: "ITSELF", r1: 76.92, map: 69.34 },
    gate: { name: "GATE-ITSELF", r1: 77.39, map: 72.49 },
    gain: { r1: 0.47, map: 3.15 }
  },
  {
    dataset: "ICFG-PEDES",
    base: { name: "ITSELF", r1: 69.19, map: 43.78 },
    gate: { name: "GATE-ITSELF", r1: 69.64, map: 48.23 },
    gain: { r1: 0.45, map: 4.45 }
  },
  {
    dataset: "RSTPReid",
    base: { name: "ITSELF", r1: 67.25, map: 53.02 },
    gate: { name: "GATE-ITSELF", r1: 68.50, map: 55.24 },
    gain: { r1: 1.25, map: 2.22 }
  }
];

const retrieverDeltas = [
  { name: "CLIP", deltas: [{ r1: 0.49, map: 1.83 }, { r1: 0.33, map: 4.36 }, { r1: 1.90, map: 2.65 }] },
  { name: "IRRA", deltas: [{ r1: 0.42, map: 2.98 }, { r1: 1.13, map: 4.33 }, { r1: 1.85, map: 2.58 }] },
  { name: "RDE", deltas: [{ r1: 0.33, map: 1.25 }, { r1: 0.66, map: 1.67 }, { r1: 1.00, map: 1.50 }] },
  { name: "DM-Adapter", deltas: [{ r1: 0.51, map: 3.46 }, { r1: 1.05, map: 6.84 }, { r1: 1.50, map: 2.39 }] },
  { name: "ITSELF", deltas: [{ r1: 0.47, map: 3.15 }, { r1: 0.45, map: 4.45 }, { r1: 1.25, map: 2.22 }] }
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

const qualitativeExamples = [
  {
    retriever: "CLIP",
    dataset: "CUHK-PEDES",
    query: "Dominant clothing cues plus a carried bag.",
    base: ["D", "T", "D", "T", "D"],
    gate: ["T", "T", "D", "T", "D"]
  },
  {
    retriever: "CLIP",
    dataset: "ICFG-PEDES",
    query: "Backpack logo, scarf, or footwear details sharpen the ranking.",
    base: ["D", "D", "T", "D", "T"],
    gate: ["T", "T", "D", "T", "D"]
  },
  {
    retriever: "ITSELF",
    dataset: "ICFG-PEDES",
    query: "A strong base retriever still leaves mixed positives and hard negatives.",
    base: ["D", "T", "D", "T", "D"],
    gate: ["T", "T", "T", "T", "T"]
  },
  {
    retriever: "DM-Adapter",
    dataset: "RSTPReid",
    query: "Viewpoint-sensitive case with dark outerwear.",
    base: ["D", "T", "D", "D", "T"],
    gate: ["T", "D", "T", "D", "T"]
  },
  {
    retriever: "RDE",
    dataset: "CUHK-PEDES",
    query: "A rescue case where the base Top-5 has no target image.",
    base: ["D", "D", "D", "D", "D"],
    gate: ["T", "D", "D", "T", "D"]
  },
  {
    retriever: "RDE",
    dataset: "ICFG-PEDES",
    query: "A carried jacket or blue insulated coat disambiguates similar candidates.",
    base: ["D", "T", "D", "D", "T"],
    gate: ["T", "T", "T", "D", "T"]
  },
  {
    retriever: "IRRA",
    dataset: "ICFG-PEDES",
    query: "Residual identity ambiguity among candidates with similar descriptions.",
    base: ["D", "T", "D", "T", "D"],
    gate: ["T", "T", "T", "T", "T"]
  },
  {
    retriever: "IRRA",
    dataset: "RSTPReid",
    query: "Rear views and low-resolution dark outerwear make local cues unreliable.",
    base: ["D", "D", "D", "D", "D"],
    gate: ["T", "D", "T", "D", "D"]
  }
];

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
  const container = document.querySelector("#benchmark-cards");
  if (!container) return;
  container.innerHTML = benchmarkResults.map((item) => `
    <article class="benchmark-card">
      <h3>${item.dataset}</h3>
      <div class="metric-row">
        <div class="metric-box">
          <span>R@1</span>
          <strong>${item.gate.r1.toFixed(2)}</strong>
        </div>
        <div class="metric-box">
          <span>mAP</span>
          <strong>${item.gate.map.toFixed(2)}</strong>
        </div>
      </div>
      <p class="gain-line">${formatDelta(item.gain.r1)} R@1 / ${formatDelta(item.gain.map)} mAP over ${item.base.name}</p>
      <p class="baseline-line">Frozen base: ${item.base.r1.toFixed(2)} R@1 / ${item.base.map.toFixed(2)} mAP</p>
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

function renderRetrieverDeltas() {
  const rows = retrieverDeltas.map((row) => ({ name: row.name, values: row.deltas }));
  renderGroupedDeltas("#retriever-deltas", rows, 1.9, 6.84);
}

function renderTransferSummary() {
  const container = document.querySelector("#transfer-summary");
  if (!container) return;
  container.innerHTML = transfers.map((transfer) => `
    <article class="transfer-card">
      <strong>${transfer.direction}</strong>
      <span>avg ${formatDelta(transfer.avgR1)} R@1 / ${formatDelta(transfer.avgMap)} mAP</span>
      <span>max ${formatDelta(transfer.maxR1)} R@1 / ${formatDelta(transfer.maxMap)} mAP</span>
    </article>
  `).join("");
}

function tile(status, index) {
  const isTarget = status === "T";
  const label = isTarget ? "target" : "distractor";
  return `<span class="result-tile ${label}" aria-label="Rank ${index + 1}: ${label}">${status}</span>`;
}

function renderQualitative(filter = "all") {
  const container = document.querySelector("#qualitative-grid");
  if (!container) return;
  const selected = filter === "all"
    ? qualitativeExamples
    : qualitativeExamples.filter((item) => item.retriever === filter);
  container.innerHTML = selected.map((item) => `
    <article class="qual-card">
      <h3>${item.retriever} on ${item.dataset}</h3>
      <p>${item.query}</p>
      <div class="retrieval-row">
        <strong>Base</strong>
        <div class="retrieval-strip">${item.base.map(tile).join("")}</div>
      </div>
      <div class="retrieval-row">
        <strong>+ GATE</strong>
        <div class="retrieval-strip">${item.gate.map(tile).join("")}</div>
      </div>
    </article>
  `).join("");
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
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  if (!("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.remove("active"));
      const active = navLinks.find((link) => link.getAttribute("href") === `#${entry.target.id}`);
      if (active) active.classList.add("active");
    });
  }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
  sections.forEach((section) => observer.observe(section));
}

document.addEventListener("DOMContentLoaded", () => {
  renderDiagnosticHeatmap();
  renderBenchmarkCards();
  renderRetrieverDeltas();
  renderTransferSummary();
  renderGroupedDeltas("#evidence-ablation", evidenceAblation, 1.9, 4.36);
  renderGroupedDeltas("#reasoning-ablation", reasoningAblation, 1.9, 4.36);
  renderQualitative();
  bindQualitativeTabs();
  bindNav();
  bindActiveNav();
});
