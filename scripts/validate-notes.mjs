import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const notesDir = path.join(root, "notes");
const required = ["id", "title", "source", "type", "date", "tags", "summary", "excerpts"];

async function main() {
  await fs.mkdir(notesDir, { recursive: true });
  const files = (await fs.readdir(notesDir)).filter((file) => file.endsWith(".json"));
  const seen = new Set();

  for (const file of files) {
    const note = JSON.parse(await fs.readFile(path.join(notesDir, file), "utf8"));
    const missing = required.filter((field) => !hasValue(note[field]));
    if (missing.length > 0) {
      throw new Error(`${file} 缺少字段：${missing.join(", ")}`);
    }
    if (seen.has(note.id)) {
      throw new Error(`重复的 note id：${note.id}`);
    }
    seen.add(note.id);
    if (!Array.isArray(note.tags) || !note.tags.every((tag) => typeof tag === "string")) {
      throw new Error(`${file} 的 tags 必须是字符串数组。`);
    }
    if (!Array.isArray(note.excerpts) || !note.excerpts.every((excerpt) => typeof excerpt === "string")) {
      throw new Error(`${file} 的 excerpts 必须是字符串数组。`);
    }
  }

  console.log(`校验通过，共 ${files.length} 篇文章。`);
}

function hasValue(value) {
  if (Array.isArray(value)) return value.length > 0;
  return value !== undefined && value !== null && String(value).trim() !== "";
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
