import fs from "fs";
import path from "path";
import matter from "gray-matter";

const KNOWLEDGE_PATH = path.join(process.cwd(), "knowledge");

export function readMarkdown(file: string) {
  const fullPath = path.join(KNOWLEDGE_PATH, file);

  const raw = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(raw);

  return {
    metadata: data,
    content,
  };
}