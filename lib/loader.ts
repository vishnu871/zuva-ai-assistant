import fs from "fs";
import path from "path";
import fg from "fast-glob";
import matter from "gray-matter";

export interface KnowledgeDocument {
  id: string;
  title: string;
  category: string;
  keywords: string[];
  content: string;
  filePath: string;
}

const KNOWLEDGE_DIR = path.join(process.cwd(), "knowledge");

export function loadKnowledge(): KnowledgeDocument[] {
  const files = fg.sync("**/*.md", {
    cwd: KNOWLEDGE_DIR,
  });

  return files.map((file) => {
    const fullPath = path.join(KNOWLEDGE_DIR, file);

    const raw = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(raw);

    return {
      id: file.replace(".md", ""),
      title: data.title ?? file.replace(".md", ""),
      category: data.category ?? "general",
      keywords: Array.isArray(data.keywords)
  ? data.keywords.map((k: unknown) => String(k))
  : [],
      content: content.trim(),
      filePath: file,
    };
  });
}