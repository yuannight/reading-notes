# Reading Notes

一个面向个人阅读资料整理的静态博客项目，适合部署到 GitHub Pages。

## 功能

- 所有文章列表：默认展示全部文章，点击文章查看右侧预览
- 标题搜索：只按文章标题搜索
- 标签筛选：侧边栏标签池支持单标签过滤，标签从文章数据自动生成
- 日期筛选：支持全部时间、最近 30 天、按月份过滤，月份从文章数据自动生成
- 文章首图：保留在文章列表中，详情区专注标题、摘要和引文
- 文章引文：详情区只保留关键引文
- 侧边栏：文章库可以收起和展开，阅读区保持更大的阅读空间

## 内容工作流

文章数据按“一篇文章一个 JSON 文件”维护：

- `notes/*.json`：单篇阅读笔记
- `data/notes.json`：由脚本汇总生成，页面实际读取这个文件
- `scripts/validate-notes.mjs`：校验笔记字段
- `scripts/build-data.mjs`：汇总并按日期倒序生成 `data/notes.json`

## 数据模型

```json
{
  "id": "article-id",
  "title": "文章标题",
  "source": "原始链接或文件名",
  "type": "PDF | Web | HTML",
  "date": "2026-06-12",
  "collectedAt": "2026-06-14",
  "author": "作者",
  "publisher": "来源",
  "image": "文章首图 URL",
  "tags": ["AI", "Research"],
  "excerpts": ["原文摘录"],
  "summary": "文章摘要"
}
```

## 新增文章

手动新增时：

1. 在 `notes/` 下新增一篇 `{id}.json`
2. 运行校验：

```bash
node scripts/validate-notes.mjs
```

3. 汇总数据：

```bash
node scripts/build-data.mjs
```

使用 Codex 时，可以通过 `reading-notes-ai` skill 触发：

```text
用 reading-notes-ai 把这篇文章整理成博客笔记并同步到 GitHub
```

## 打开方式

页面会读取 `data/notes.json`，建议通过本地静态服务预览：

```bash
python3 -m http.server 4173
```

然后访问：

```text
http://127.0.0.1:4173/
```

## GitHub Pages

项目包含 GitHub Actions 发布流水线：

- `.github/workflows/deploy-pages.yml`

推送到 `main` 后会自动触发 `Deploy Pages` workflow，发布整个静态站目录到 GitHub Pages。

仓库首次启用 Pages 时，在 GitHub 仓库设置里选择：

- Source: `GitHub Actions`
