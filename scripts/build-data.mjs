import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const notesDir = path.join(root, "notes");
const dataDir = path.join(root, "data");
const outputFile = path.join(dataDir, "notes.json");

async function readJson(file) {
  const raw = await fs.readFile(file, "utf8");
  return JSON.parse(raw);
}

async function main() {
  await fs.mkdir(notesDir, { recursive: true });
  await fs.mkdir(dataDir, { recursive: true });

  const files = (await fs.readdir(notesDir))
    .filter((file) => file.endsWith(".json"))
    .sort();

  const notes = [];
  for (const file of files) {
    notes.push(await readJson(path.join(notesDir, file)));
  }

  notes.sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
  await fs.writeFile(outputFile, `${JSON.stringify(notes, null, 2)}\n`, "utf8");
  console.log(`已生成 ${path.relative(root, outputFile)}，共 ${notes.length} 篇文章。`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
