# Reading Notes 工作记录：方案与 Todo

日期：2026-06-17

## 项目定位

Reading Notes 是一个个人阅读资料整理与发布项目。核心目标不是做传统博客，而是把 PDF、网页链接、HTML 等来源统一整理成可检索、可筛选、可复读的文章笔记库。

当前阶段先保持纯静态站，适合直接部署到 GitHub Pages。后续再逐步接入本地或自动化的 AI 处理流程，避免一开始把系统做重。

## 当前实现状态

- 已有静态页面：`index.html`
- 已有样式：`styles.css`
- 已有交互与示例数据：`app.js`
- 已有项目说明：`README.md`
- 当前页面结构：
  - 顶部品牌与简单导航
  - 左侧文章库侧边栏
  - 标题搜索
  - 日期筛选
  - 标签筛选
  - 文章列表
  - 右侧文章阅读详情
- 当前详情展示：
  - 来源类型
  - 日期
  - 标签
  - 标题
  - 摘要
  - 引文
- 当前交互：
  - 点击文章切换详情
  - 按标题搜索文章
  - 按标签筛选文章
  - 按日期范围或月份筛选文章
  - 左侧侧边栏可收起和展开

## 设计原则

- 以“阅读库”为主，不做复杂后台工作台。
- 文章列表要始终容易扫描，支持快速回到某篇文章。
- 标签会越来越多，因此标签筛选要放在侧边栏中承载。
- 阅读区要尽量干净，只保留对复读有价值的信息。
- AI 总结不能过度提炼，应该保留文章语气、限定条件和关键上下文。
- 摘录/引文是 AI 归纳的证据层，不能被摘要完全替代。
- 初期优先静态、可维护、可部署；后期再引入构建、解析和自动化。

## 推荐数据模型

文章笔记建议按以下字段演进：

- `id`：稳定唯一标识，用于路由、文件名或锚点
- `title`：文章标题
- `source`：原始链接或文件名
- `type`：来源类型，例如 PDF、Web、HTML
- `date`：展示日期或整理日期
- `collectedAt`：收集时间
- `author`：作者
- `publisher`：发布方或来源站点
- `image`：文章首图，可选
- `tags`：标签列表
- `summary`：AI 或人工整理的适度摘要
- `excerpts`：关键原文摘录
- `keyPoints`：内部可保留，公开页可不展示
- `questions`：内部可保留，公开页可不展示

## 后续方案

### 阶段一：把静态原型整理成可维护项目

目标是让当前页面从“演示数据写在 JS 里”变成“数据和视图分离”的小项目。

- 把 `app.js` 里的文章数据拆到独立数据文件。
- 支持通过 JSON 加载文章列表。
- 把标签和月份筛选项从文章数据中自动生成。
- 为文章缺省字段提供兜底展示。
- 减少手动维护筛选选项的成本。

### 阶段二：建立文章导入与整理流程

目标是让新增文章有固定入口，而不是手动改 JS。

- 定义 `content` 或 `notes` 目录存放文章元数据。
- 设计一篇文章一个文件的格式。
- 支持 Web 链接、PDF 文件名、HTML 文件名三类来源。
- 明确公开字段和内部字段。
- 保留原文摘录和 AI 摘要之间的关系。

### 阶段三：接入 AI 摘要生成

目标是把“收集文章 -> 解析内容 -> AI 适度总结 -> 人工复核 -> 发布”串起来。

- 先做本地脚本，不急着做线上服务。
- 输入可以是 URL、PDF 文件、HTML 文件。
- 输出统一的文章元数据文件。
- AI 结果需要保留摘要、摘录、标签建议和待确认问题。
- 人工确认后再进入公开展示。

### 阶段四：发布体验增强

目标是让它更像长期可用的个人阅读站。

- 支持文章详情独立 URL。
- 支持浏览器前进后退。
- 支持按标签或月份生成分享链接。
- 增加归档页。
- 增加 About 页，说明这个站点的整理原则。
- 优化移动端侧边栏体验。

## Todo

### P0：近期优先

- [ ] 将文章数据从 `app.js` 拆出到独立数据文件。
- [ ] 标签筛选项改为根据文章数据自动生成。
- [ ] 日期筛选项改为根据文章月份自动生成。
- [ ] 给空数据、缺少图片、缺少引文等情况加兜底展示。
- [ ] 检查移动端侧边栏收起/展开是否足够顺手。

### P1：项目结构

- [ ] 新增 `content` 或 `notes` 目录，确定文章数据存放方式。
- [ ] 为文章元数据写一份字段说明文档。
- [ ] 拆分公开展示字段和内部处理字段。
- [ ] 增加示例文章，覆盖 PDF、Web、HTML 三种来源。
- [ ] 让 README 补充本地维护文章的流程。

### P2：AI 工作流

- [ ] 设计文章导入脚本的输入输出。
- [ ] 支持从 URL 抽取标题、正文和站点信息。
- [ ] 支持从 PDF 抽取正文。
- [ ] 支持从 HTML 文件抽取正文。
- [ ] 生成初版摘要、标签建议、关键引文和待确认问题。
- [ ] 为 AI 输出增加人工复核步骤。

### P3：展示与发布

- [ ] 增加文章详情路由或 hash URL。
- [ ] 支持按标签、月份、关键词生成可分享链接。
- [ ] 增加归档页和标签页。
- [ ] 增加 GitHub Pages 发布说明截图或操作指引。
- [ ] 增加基础 SEO 信息和社交分享元信息。

## 下一步建议

建议下一步先做 P0。尤其是把文章数据从 `app.js` 拆出来，并让标签/日期筛选自动生成。这个改动小，但会明显提升后续维护体验，也为导入脚本和 AI 工作流铺路。

## AI Skill 方案

已设计 `reading-notes-ai` 技能，用于通过 Codex skill 触发文章导入、阅读笔记生成、数据汇总和 GitHub 同步。

关键原则：

- 不在项目中接 OpenAI API。
- 不要求用户配置 API Key。
- 由当前 Codex agent 负责阅读文章、提炼摘要、生成结构化 JSON。
- 项目脚本只做确定性工作：初始化目录、校验 JSON、汇总数据。
- 用户通过关键词触发 skill，例如 `reading-notes-ai`、`导入文章`、`整理成博客笔记`、`同步到 GitHub`。

推荐流程：

1. 用户提供文章 URL、正文、文本文件、Markdown、HTML 或已提取的 PDF 文本。
2. Codex 根据关键词触发 `reading-notes-ai` skill。
3. skill 先确认当前目录是 Reading Notes 项目。
4. skill 首次运行时执行 bootstrap，生成项目辅助文件：
   - `notes/*.json`
   - `data/notes.json`
   - `sources/`
   - `scripts/validate-notes.mjs`
   - `scripts/build-data.mjs`
5. Codex 读取文章内容，按 schema 生成 `notes/{id}.json`。
6. `validate-notes.mjs` 校验所有笔记字段和格式。
7. `build-data.mjs` 汇总 `notes/*.json` 为 `data/notes.json`。
8. 静态站读取 `data/notes.json` 展示文章。
9. 如果用户要求发布或同步，Codex 提交相关文件并 push 到 GitHub。
10. GitHub 收到 `main` 分支 push 后，自动触发 `Deploy Pages` Actions 流水线并发布站点。

skill 位置：

`~/.codex/skills/reading-notes-ai`

后续触发方式可以是：

```text
用 reading-notes-ai 把这篇文章导入 Reading Notes
```

或：

```text
帮我把 ./sources/article.txt 生成一篇阅读笔记并同步到 GitHub
```

## GitHub Actions 发布流水线

当前项目新增 `.github/workflows/deploy-pages.yml`，用于在 `main` 分支 push 后自动发布 GitHub Pages。

流水线逻辑：

1. 监听 `main` 分支 push。
2. 允许手动 `workflow_dispatch` 触发。
3. 使用 `actions/configure-pages` 配置 Pages。
4. 使用 `actions/upload-pages-artifact` 上传整个静态站目录。
5. 使用 `actions/deploy-pages` 发布到 GitHub Pages。

后续 skill 同步 GitHub 后，不需要额外手动部署；只需要到 GitHub 仓库的 `Actions` 标签页查看 `Deploy Pages` 执行结果。

## 2026-06-17 执行记录

已完成首轮落地：

- 已新增 GitHub Pages Actions 流水线。
- 已通过 `reading-notes-ai` bootstrap 生成 `notes/`、`data/`、`sources/` 和 `scripts/`。
- 已将原 `app.js` 内的 6 篇示例文章迁移为 `notes/*.json`。
- 已将前端改为读取 `data/notes.json`。
- 标签筛选和月份筛选已改为根据文章数据自动生成。
- 已新增 `scripts/validate-notes.mjs` 和 `scripts/build-data.mjs`。
- 已更新 README 的内容维护和发布说明。
