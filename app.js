const notes = [
  {
    id: "ai-interface-memory",
    title: "AI 产品里的长期记忆，应该像资料库而不是魔法盒",
    type: "Web",
    status: "Reviewed",
    date: "2026-06-12",
    source: "https://example.com/ai-memory-interface",
    author: "Mira Chen",
    publisher: "Interface Review",
    collectedAt: "2026-06-14",
    image:
      "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=900&q=80",
    tags: ["AI", "Design", "Research", "Product", "UX"],
    summary:
      "文章讨论 AI 产品如何呈现长期记忆。它没有把记忆当成单纯的自动化能力，而是强调用户需要看到记忆从哪里来、何时被更新、是否仍然有效。作者的核心观点是：透明的资料库模型比拟人化的魔法感更适合承载信任。",
    excerpts: [
      "A memory system becomes trustworthy when people can inspect its source, not when the assistant sounds more certain.",
      "The useful question is not whether the model remembers, but whether the user can repair what it remembers.",
      "Good memory interfaces should age visibly: stale facts need dates, context, and a way to retire them."
    ],
    keyPoints: [
      "记忆功能需要展示来源、时间和可编辑状态，否则用户难以校正错误。",
      "产品文案不应该把自动提取的内容包装成绝对事实。",
      "长期记忆更适合用资料库、档案或笔记的交互隐喻来表达。"
    ],
    questions: ["哪些记忆应该默认公开给用户检查？", "如何在不增加负担的前提下提示记忆已过期？"]
  },
  {
    id: "pdf-reading-systems",
    title: "PDF 阅读器为什么总是很难变成真正的研究工具",
    type: "PDF",
    status: "Summarized",
    date: "2026-06-08",
    source: "reading-systems-whitepaper.pdf",
    author: "Nolan Hart",
    publisher: "Independent Notes",
    collectedAt: "2026-06-10",
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80",
    tags: ["Systems", "Tools", "Research", "Reading", "Notes"],
    summary:
      "这份 PDF 从阅读行为出发，解释为什么很多阅读器停留在标注层面，难以支持后续写作。它提醒我们：摘录、标签和摘要之间必须有稳定的数据结构，否则 AI 只能生成一次性的文本，而不能形成可持续复用的知识资产。",
    excerpts: [
      "Highlighting is not note-taking; it is merely the first trace of attention.",
      "A research tool has to preserve the path from source text to interpretation.",
      "The moment summaries detach from excerpts, they become difficult to audit."
    ],
    keyPoints: [
      "摘录是 AI 归纳的证据层，需要和总结一起保存。",
      "阅读状态应该描述工作流，而不是只描述是否读完。",
      "文件、网页和 HTML 需要统一成同一种笔记模型。"
    ],
    questions: ["摘录和摘要的最小字段应该是什么？", "是否需要为每条 AI 归纳保存模型和提示词版本？"]
  },
  {
    id: "design-reading-list",
    title: "设计阅读清单的真正价值，是帮你重新进入上下文",
    type: "HTML",
    status: "Published",
    date: "2026-05-30",
    source: "design-reading-list.html",
    author: "Avery Stone",
    publisher: "Studio Journal",
    collectedAt: "2026-06-01",
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=80",
    tags: ["Design", "Culture", "Reading", "Writing"],
    summary:
      "文章把阅读清单看作一种上下文恢复工具，而不是收藏夹。好的清单不仅保存链接，也保存当时为什么值得读、读完后改变了什么判断，以及后续可以接到哪些主题上。",
    excerpts: [
      "A reading list is useful when it can return you to the question you had before opening the article.",
      "Categorization should serve re-entry, not taxonomy for its own sake.",
      "The best notes leave enough friction to make rereading intentional."
    ],
    keyPoints: [
      "分类的目标是帮助重新进入问题，而不是追求完美目录。",
      "摘要需要保留文章的语气和限定条件。",
      "公开博客可以只展示整理后的版本，但内部仍应保留来源线索。"
    ],
    questions: ["公开页是否展示完整摘录？", "哪些内部字段不适合发布？"]
  },
  {
    id: "tools-for-slow-thinking",
    title: "慢思考工具需要减少整理时的仪式感",
    type: "Web",
    status: "Reading",
    date: "2026-05-21",
    source: "https://example.com/tools-for-slow-thinking",
    author: "Jon Bell",
    publisher: "Small Tools Weekly",
    collectedAt: "2026-05-22",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=900&q=80",
    tags: ["Tools", "Systems", "Writing"],
    summary:
      "作者批评了许多知识管理工具的重仪式感：用户需要先决定分类、模板和数据库关系，才能开始记录。文章主张先捕获，再逐渐结构化，让工具服务于思考节奏。",
    excerpts: [
      "The cost of organization often arrives before the value of the note.",
      "Slow thinking needs low ceremony at capture and richer structure after reflection.",
      "A system should accept messy inputs without making messiness permanent."
    ],
    keyPoints: [
      "收集阶段要轻，复核阶段再补结构。",
      "AI 适合做初步整理，但不应该替代人的复核判断。",
      "状态字段能帮助用户知道下一步该做什么。"
    ],
    questions: ["收集入口是否需要支持命令行？", "状态流转是否应自动推进？"]
  },
  {
    id: "culture-of-links",
    title: "链接文化的衰退，让个人注释重新变得重要",
    type: "Web",
    status: "Inbox",
    date: "2026-05-14",
    source: "https://example.com/culture-of-links",
    author: "Leah Kim",
    publisher: "Public Web Notes",
    collectedAt: "2026-05-16",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=900&q=80",
    tags: ["Culture", "Research", "Web"],
    summary:
      "文章从网页引用习惯的变化谈起，认为个人注释能为链接补上语境。链接本身只说明入口，注释才说明为什么这个入口在某个时间点值得保存。",
    excerpts: [
      "A link is an address; an annotation is the reason the address mattered.",
      "Personal publishing can preserve context that platforms flatten away.",
      "The web becomes more useful when readers leave durable marginalia."
    ],
    keyPoints: ["链接需要上下文说明。", "个人博客可以承担轻量注释网络的角色。", "标签应服务主题路径。"],
    questions: ["是否需要为每个外链生成永久快照？"]
  },
  {
    id: "system-notes-index",
    title: "系统化笔记不是把所有东西都表格化",
    type: "PDF",
    status: "Reviewed",
    date: "2026-05-02",
    source: "system-notes-index.pdf",
    author: "Rhea Martin",
    publisher: "Methods Quarterly",
    collectedAt: "2026-05-05",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    tags: ["Systems", "Research", "Notes"],
    summary:
      "这篇文章提醒读者，结构化不是把每一段内容都拆成字段，而是让重要关系可以被找回。它支持一种中间路线：原文摘录保持自然语言，元数据和状态保持结构化。",
    excerpts: [
      "Structure should make return easier, not reading harder.",
      "The index is valuable when it helps a reader continue a thought.",
      "Not every insight deserves a field; some deserve a paragraph."
    ],
    keyPoints: ["自然语言和结构化字段需要共存。", "索引应该围绕问题组织。", "状态是工作流字段，不是内容字段。"],
    questions: ["首页更应该按时间、主题还是状态组织？"]
  }
];

const state = {
  selectedId: notes[0].id,
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

function getFilteredNotes() {
  const normalizedQuery = state.query.trim().toLowerCase();
  return notes.filter((note) => {
    const matchesTag = state.tag === "all" || note.tags.includes(state.tag);
    const matchesQuery = !normalizedQuery || note.title.toLowerCase().includes(normalizedQuery);
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

  noteList.innerHTML = filteredNotes
    .map(
      (note) => `
        <button class="note-item ${note.id === state.selectedId ? "active" : ""}" data-id="${note.id}">
          <span class="thumb" style="background-image: url('${note.image}')"></span>
          <span>
            <span class="meta-row">
              <span class="source-badge">${note.type}</span>
              <span>${formatDate(note.date)}</span>
            </span>
            <h3>${note.title}</h3>
            <p>${note.summary}</p>
          </span>
        </button>
      `
    )
    .join("");

  if (filteredNotes.length === 0) {
    noteList.innerHTML = `<p class="empty-state">没有找到匹配的文章。换一个标签、日期或标题关键词试试。</p>`;
    noteDetail.innerHTML = "";
    return;
  }

  renderDetail();
}

function renderDetail() {
  const note = notes.find((item) => item.id === state.selectedId) || notes[0];
  noteDetail.innerHTML = `
    <div class="detail-kicker">
      <span class="source-badge">${note.type}</span>
      <span class="meta-row">${formatDate(note.date)}</span>
      ${note.tags.map((tag) => `<span class="tag-pill">${tag}</span>`).join("")}
    </div>
    <h2>${note.title}</h2>
    <p class="detail-summary">${note.summary}</p>

    <section class="quote-section">
      <h3>引文</h3>
      <div class="quote-list">
        ${note.excerpts.map((excerpt) => `<blockquote>${excerpt}</blockquote>`).join("")}
      </div>
    </section>
  `;
}

function matchDateFilter(date) {
  if (state.date === "all") return true;
  if (state.date === "recent") {
    const latest = Math.max(...notes.map((note) => new Date(note.date).getTime()));
    const current = new Date(date).getTime();
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    return latest - current <= thirtyDays;
  }
  return date.startsWith(state.date);
}

function formatDate(date) {
  return date.replaceAll("-", ".");
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
  sidebarToggle.textContent = isCollapsed ? "›" : "‹";
  sidebarToggle.setAttribute("aria-expanded", String(!isCollapsed));
});

renderNoteList();
