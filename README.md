# Reading Notes

Reading Notes 是一个个人阅读资料整理与发布项目。它把网页、PDF、HTML、Markdown 或粘贴文本整理成统一的阅读笔记，再以纯静态站的方式展示，适合部署到 GitHub Pages。

项目当前不内置任何 AI API，也不需要在仓库里保存 API Key。AI 整理动作由 Codex 的 `reading-notes-ai` skill 完成；仓库本身只负责保存结构化笔记、校验数据、生成前端可读取的数据文件，以及通过 GitHub Actions 发布静态页面。

## 当前能力

- 文章列表：默认展示全部文章，点击文章后在右侧查看详情
- 标题搜索：按文章标题快速筛选
- 标签筛选：标签从文章数据自动生成
- 日期筛选：支持全部时间、最近 30 天、按月份筛选
- 阅读详情：展示标题、来源、日期、标签和摘要
- 侧边栏：文章库支持展开和收起，方便保留更大的阅读区
- 数据构建：`notes/*.json` 自动汇总为 `data/notes.json`
- 自动发布：推送 `main` 后触发 GitHub Actions 发布到 GitHub Pages

## 目录结构

```text
# 项目核心文件
.
├── index.html                  # 静态页面入口
├── styles.css                  # 页面样式
├── app.js                      # 前端交互逻辑，运行时读取 data/notes.json
├── notes/                      # 单篇阅读笔记，一篇文章一个 JSON
├── data/notes.json             # 构建产物，页面实际读取的数据文件
├── scripts/build-data.mjs      # 汇总 notes/*.json 到 data/notes.json
├── scripts/validate-notes.mjs  # 校验 notes/*.json 的字段和格式
├── .github/workflows/          # GitHub Pages 自动发布流水线
└── worklog/                    # 项目方案、执行记录和后续 Todo
```

## 日常使用流程

推荐使用 Codex 的 `reading-notes-ai` skill 新增文章。用户只需要提供文章链接、正文、文件路径或粘贴内容，Codex 会负责阅读、提炼、生成 JSON、构建数据，并在需要时同步到 GitHub。

```text
# 示例：通过 skill 触发文章导入
用 reading-notes-ai 把这篇文章整理成博客笔记并同步到 GitHub：https://example.com/article
```

也可以只让它生成本地笔记，不推送：

```text
# 示例：只生成本地阅读笔记
用 reading-notes-ai 把 ./sources/article.md 导入 Reading Notes，先不要提交
```

## 手动新增文章

如果不使用 skill，也可以手动维护：

1. 在 `notes/` 下新增一篇 `{id}.json`
2. 运行校验脚本
3. 重新生成 `data/notes.json`
4. 本地预览确认
5. 提交并推送到 GitHub

```bash
# 校验所有阅读笔记字段是否完整
node scripts/validate-notes.mjs

# 汇总 notes/*.json，生成前端读取的数据文件
node scripts/build-data.mjs

# 启动本地静态服务，避免直接打开文件时 fetch 失败
python3 -m http.server 4173
```

本地访问：

```text
# 本地预览地址
http://127.0.0.1:4173/
```

## 阅读笔记格式

每篇文章对应 `notes/{id}.json`。字段建议保持稳定，方便后续继续扩展检索、归档、路由和 AI 复核能力。

```jsonc
{
  // 稳定唯一标识，建议和文件名保持一致
  "id": "article-id",

  // 文章标题
  "title": "文章标题",

  // 原始链接、PDF 文件名、HTML 文件名或来源说明
  "source": "https://example.com/article",

  // 来源类型，常用值：PDF、Web、HTML、Markdown、Text
  "type": "Web",

  // 展示日期，优先使用文章发布日期，没有时使用整理日期
  "date": "2026-06-17",

  // 收集或导入日期
  "collectedAt": "2026-06-17",

  // 作者，可为空字符串
  "author": "作者",

  // 发布方、站点或来源
  "publisher": "来源",

  // 文章首图 URL，可为空字符串
  "image": "https://example.com/cover.png",

  // 用于筛选和归类的标签
  "tags": ["AI", "Research"],

  // 关键原文摘录，作为摘要的证据层
  "excerpts": ["原文摘录"],

  // 适度摘要，保留原文语境和限定条件
  "summary": "文章摘要"
}
```

## AI Skill 约定

`reading-notes-ai` skill 的职责边界：

- Codex 负责理解文章、提炼摘要、挑选引文、生成 `notes/{id}.json`
- 仓库脚本负责确定性工作：校验字段、汇总数据、生成发布用文件
- 项目不保存 OpenAI API Key，也不把 AI 调用逻辑写进前端或 GitHub Actions
- 如果用户要求“同步到 GitHub”，Codex 会在本地完成校验和构建后提交并推送
- 推送到 `main` 后，GitHub Actions 自动触发发布流水线

## GitHub Pages 发布

项目包含发布流水线：

```text
# 发布流水线文件
.github/workflows/deploy-pages.yml
```

流水线会在 `main` 分支 push 后执行：

1. Checkout 仓库
2. 配置 GitHub Pages
3. 将 `index.html`、`styles.css`、`app.js`、`data/notes.json` 复制到 `_site/`
4. 上传 `_site/` 作为 Pages artifact
5. 部署到 GitHub Pages

注意：GitHub Pages 是否可用取决于仓库可见性和账号计划。当前如果仓库是 Private，且当前 GitHub 计划不支持 private repo Pages，Actions 会在启用或部署 Pages 时失败。解决方式是二选一：

- 将仓库改为 Public 后继续使用 GitHub Pages
- 保持 Private，但升级或启用支持 private Pages 的 GitHub 计划

## 常用命令

```bash
# 校验阅读笔记
node scripts/validate-notes.mjs

# 生成前端数据
node scripts/build-data.mjs

# 本地预览
python3 -m http.server 4173

# 查看 Git 状态
git status --short
```

## 后续方向

- 为文章详情增加独立 URL 或 hash 路由
- 支持按标签、月份、关键词生成可分享链接
- 增加归档页和 About 页
- 增加更细的 AI 复核字段，例如 keyPoints、questions、readingStatus
- 为移动端侧边栏继续优化交互
