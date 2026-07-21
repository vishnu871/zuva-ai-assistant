import { loadKnowledge, KnowledgeDocument } from "./loader";

function calculateScore(
  document: KnowledgeDocument,
  query: string
): number {
  const searchTerms = query.toLowerCase().split(/\s+/);

  const title = document.title.toLowerCase();
  const content = document.content.toLowerCase();
  const keywords = (document.keywords ?? []).map((k) =>
  String(k).toLowerCase()
);

  let score = 0;

  for (const term of searchTerms) {
    if (title.includes(term)) score += 10;

    if (keywords.some((keyword) => keyword.includes(term))) {
      score += 8;
    }

    if (content.includes(term)) score += 2;
  }

  return score;
}

export function searchKnowledge(query: string): string {
  const documents = loadKnowledge();

  const ranked = documents
    .map((doc) => ({
      ...doc,
      score: calculateScore(doc, query),
    }))
    .filter((doc) => doc.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (ranked.length === 0) {
    return "";
  }

  return ranked
    .map(
      (doc) => `
# ${doc.title}

Category: ${doc.category}

${doc.content}
`
    )
    .join("\n\n------------------------------\n\n");
}