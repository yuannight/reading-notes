let notes = [];
const DEFAULT_COVER_IMAGE = "./assets/default-cover.svg";

const state = {
  selectedId: "",
  tag: "all",
  date: "all",
  query: ""
};

const noteList = document.querySelector("#noteList");
const noteDetail = document.querySelector("#noteDetail");
const resultCount = document.querySelector("#resultCount");
const searchInput = document.querySelector("#searchInput");
const dateFilter = document.querySelector("#dateFilter");
const tagFilters = document.querySelector("#tagFilters");
const sidebarToggle = document.querySelector("#sidebarToggle");
const compactLayoutQuery = window.matchMedia("(max-width: 1100px)");

async function loadNotes() {
  try {
    const response = await fetch("./data/notes.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`读取 data/notes.json 失败：${response.status}`);
    }
    notes = await response.json();
    notes.sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
    state.selectedId = notes[0]?.id || "";
    renderFilters();
    renderNoteList();
  } catch (error) {
    console.error(error);
    renderLoadError();
  }
}

function renderFilters() {
  renderTagFilters();
  renderDateFilters();
}

function renderTagFilters() {
  const tags = Array.from(new Set(notes.flatMap((note) => note.tags || []))).sort((a, b) => a.localeCompare(b));
  tagFilters.innerHTML = [
    `<button class="active" data-tag="all">全部标签</button>`,
    ...tags.map((tag) => `<button data-tag="${escapeHtml(tag)}">${escapeHtml(tag)}</button>`)
  ].join("");
}

function renderDateFilters() {
  const months = Array.from(
    new Set(
      notes
        .map((note) => String(note.date || "").slice(0, 7))
        .filter((month) => /^\d{4}-\d{2}$/.test(month))
    )
  ).sort((a, b) => b.localeCompare(a));

  dateFilter.innerHTML = [
    `<option value="all">全部时间</option>`,
    `<option value="recent">最近 30 天</option>`,
    ...months.map((month) => `<option value="${month}">${formatMonth(month)}</option>`)
  ].join("");
}

function getFilteredNotes() {
  const normalizedQuery = state.query.trim().toLowerCase();
  return notes.filter((note) => {
    const tags = note.tags || [];
    const title = note.title || "";
    const matchesTag = state.tag === "all" || tags.includes(state.tag);
    const matchesQuery = !normalizedQuery || title.toLowerCase().includes(normalizedQuery);
    const matchesDate = matchDateFilter(note.date);
    return matchesTag && matchesDate && matchesQuery;
  });
}

function renderNoteList() {
  const filteredNotes = getFilteredNotes();
  resultCount.textContent = String(filteredNotes.length);

  if (!filteredNotes.some((note) => note.id === state.selectedId) && filteredNotes.length > 0) {
    state.selectedId = filteredNotes[0].id;
  }

  if (filteredNotes.length === 0) {
    noteList.innerHTML = `<p class="empty-state">没有找到匹配的文章。换一个标签、日期或标题关键词试试。</p>`;
    noteDetail.innerHTML = "";
    return;
  }

  noteList.innerHTML = filteredNotes.map(renderNoteItem).join("");
  renderDetail();
}

function renderNoteItem(note) {
  const image = note.image || DEFAULT_COVER_IMAGE;
  const imageStyle = ` style="background-image: url('${escapeAttribute(image)}')"`;
  return `
    <button class="note-item ${note.id === state.selectedId ? "active" : ""}" data-id="${escapeAttribute(note.id)}">
      <span class="thumb"${imageStyle}></span>
      <span>
        <span class="meta-row">
          <span class="source-badge">${escapeHtml(note.type || "Text")}</span>
          <span>${formatDate(note.date)}</span>
        </span>
        <h3>${escapeHtml(note.title)}</h3>
        <p>${escapeHtml(note.summary)}</p>
      </span>
    </button>
  `;
}

function renderDetail() {
  const note = notes.find((item) => item.id === state.selectedId) || notes[0];
  if (!note) {
    noteDetail.innerHTML = `<p class="empty-state">还没有文章。</p>`;
    return;
  }

  const tags = note.tags || [];
  noteDetail.innerHTML = `
    <div class="detail-kicker">
      <span class="source-badge">${escapeHtml(note.type || "Text")}</span>
      <span class="meta-row">${formatDate(note.date)}</span>
      ${tags.map((tag) => `<span class="tag-pill">${escapeHtml(tag)}</span>`).join("")}
    </div>
    <h2>${escapeHtml(note.title)}</h2>
    <section class="detail-section">
      <h3>总结</h3>
      <div class="detail-summary">${renderSummary(note.summary)}</div>
    </section>
    ${renderSourceSection(note)}
  `;
}

function renderLoadError() {
  resultCount.textContent = "0";
  noteList.innerHTML = `<p class="empty-state">文章数据读取失败。请确认已经运行 node scripts/build-data.mjs，并通过本地服务或 GitHub Pages 打开页面。</p>`;
  noteDetail.innerHTML = "";
}

function matchDateFilter(date) {
  if (state.date === "all") return true;
  if (state.date === "recent") {
    const timestamps = notes.map((note) => new Date(note.date).getTime()).filter(Number.isFinite);
    const latest = Math.max(...timestamps);
    const current = new Date(date).getTime();
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    return Number.isFinite(current) && latest - current <= thirtyDays;
  }
  return String(date || "").startsWith(state.date);
}

function formatDate(date) {
  return String(date || "").replaceAll("-", ".");
}

function formatMonth(month) {
  const [year, value] = month.split("-");
  return `${year} 年 ${Number(value)} 月`;
}

function renderSummary(summary) {
  const paragraphs = String(summary || "")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
}

function renderSourceSection(note) {
  const source = String(note.source || "").trim();
  if (!source) return "";

  const sourceMeta = [note.publisher, note.author].filter(Boolean).map(escapeHtml).join(" · ");
  return `
    <section class="detail-section source-section">
      <h3>原文</h3>
      <div class="source-card">
        <div>
          <p>${escapeHtml(note.title || "原文链接")}</p>
          ${sourceMeta ? `<span>${sourceMeta}</span>` : ""}
          <a class="source-url" href="${escapeAttribute(source)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source)}</a>
        </div>
        <a href="${escapeAttribute(source)}" target="_blank" rel="noopener noreferrer">阅读全文</a>
      </div>
    </section>
  `;
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

tagFilters.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  state.tag = button.dataset.tag;
  tagFilters.querySelectorAll("button").forEach((item) => item.classList.toggle("active", item === button));
  renderNoteList();
});

dateFilter.addEventListener("change", (event) => {
  state.date = event.target.value;
  renderNoteList();
});

noteList.addEventListener("click", (event) => {
  const button = event.target.closest(".note-item");
  if (!button) return;
  state.selectedId = button.dataset.id;
  renderNoteList();
});

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderNoteList();
});

sidebarToggle.addEventListener("click", () => {
  const isCollapsed = document.body.classList.toggle("sidebar-collapsed");
  sidebarToggle.textContent = isCollapsed ? "→" : "←";
  sidebarToggle.setAttribute("aria-expanded", String(!isCollapsed));
});

function syncSidebarForViewport(event) {
  const shouldCollapse = event.matches;
  document.body.classList.toggle("sidebar-collapsed", shouldCollapse);
  sidebarToggle.textContent = shouldCollapse ? "→" : "←";
  sidebarToggle.setAttribute("aria-expanded", String(!shouldCollapse));
}

compactLayoutQuery.addEventListener("change", syncSidebarForViewport);
syncSidebarForViewport(compactLayoutQuery);

loadNotes();
