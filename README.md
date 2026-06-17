# Reading Notes

一个面向个人阅读资料整理的静态博客项目，适合部署到 GitHub Pages。

## 功能

- 所有文章列表：默认展示全部文章，点击文章查看右侧预览
- 标题搜索：只按文章标题搜索
- 标签筛选：侧边栏标签池支持单标签过滤
- 日期筛选：支持全部时间、最近 30 天、按月份过滤
- 文章首图：保留在文章列表中，详情区专注标题、摘要和引文
- 文章引文：详情区只保留关键引文
- 侧边栏：文章库可以收起和展开，阅读区保持更大的阅读空间

## 数据模型

```json
{
  "title": "文章标题",
  "source": "原始链接或文件名",
  "type": "PDF | Web | HTML",
  "date": "2026-06-12",
  "tags": ["AI", "Research"],
  "excerpts": ["原文摘录"],
  "summary": "文章摘要"
}
```

## 打开方式

直接打开 `index.html` 即可预览。

## GitHub Pages

仓库根目录已经包含 `index.html`，发布时在 GitHub 仓库的 Pages 设置中选择：

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/root`
