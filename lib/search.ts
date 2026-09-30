import {
  loadKnowledge,
  KnowledgeDocument,
} from "./loader";

interface RankedDocument {
  document: KnowledgeDocument;
  score: number;
}

const STOP_WORDS = new Set([
  "what",
  "which",
  "who",
  "when",
  "where",
  "why",
  "how",
  "are",
  "is",
  "the",
  "a",
  "an",
  "of",
  "for",
  "to",
  "in",
  "on",
  "and",
  "or",
  "with",
  "about",
  "tell",
  "me",
  "does",
  "do",
  "can",
  "could",
  "would",
  "should",
  "there",
  "their",
  "our",
]);

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getSearchTerms(query: string): string[] {
  return normalize(query)
    .split(/\s+/)
    .filter(
      (term) =>
        term.length > 2 &&
        !STOP_WORDS.has(term)
    );
}

function calculateScore(
  document: KnowledgeDocument,
  query: string
): number {
  const normalizedQuery = normalize(query);

  const title =
    normalize(document.title);

  const content =
    normalize(document.content);

  const keywords =
    (document.keywords ?? []).map(
      normalize
    );

  const terms =
    getSearchTerms(query);

  let score = 0;

  /*
   * Exact phrase matching.
   */
  if (
    normalizedQuery.length > 0 &&
    title.includes(normalizedQuery)
  ) {
    score += 100;
  }

  if (
    normalizedQuery.length > 0 &&
    content.includes(normalizedQuery)
  ) {
    score += 60;
  }

  /*
   * Important concept matching.
   */
  const importantPhrases = [
    "spark experiences",
    "wealth wellness",
    "agile living",
    "lifelong learning",
    "community connection",
    "purpose pathways",
    "discovery journey",
    "zest circle",
    "sharing circles",
  ];

  for (const phrase of importantPhrases) {
    if (
      normalizedQuery.includes(phrase)
    ) {
      if (title.includes(phrase)) {
        score += 80;
      }

      if (content.includes(phrase)) {
        score += 45;
      }

      if (
        keywords.some((keyword) =>
          keyword.includes(phrase)
        )
      ) {
        score += 35;
      }
    }
  }

  /*
   * Individual term matching.
   */
  for (const term of terms) {
    if (title.includes(term)) {
      score += 25;
    }

    if (
      keywords.some(
        (keyword) =>
          keyword.includes(term) ||
          term.includes(keyword)
      )
    ) {
      score += 15;
    }

    if (content.includes(term)) {
      score += 5;
    }
  }

  /*
   * Reward documents containing multiple
   * important query concepts together.
   */
  const matchedTerms = terms.filter(
    (term) =>
      title.includes(term) ||
      content.includes(term) ||
      keywords.some((keyword) =>
        keyword.includes(term)
      )
  );

  if (terms.length > 0) {
    const coverage =
      matchedTerms.length / terms.length;

    score += Math.round(
      coverage * 40
    );
  }

  /*
   * Special handling for Spark dimension
   * questions.
   *
   * A document containing all four
   * dimensions should strongly outrank
   * generic Zuva documents.
   */
  if (
    normalizedQuery.includes("spark") &&
    (
      normalizedQuery.includes("dimension") ||
      normalizedQuery.includes("dimensions")
    )
  ) {
    const sparkTerms = [
      "wealth wellness",
      "agile living",
      "lifelong learning",
      "community connection",
    ];

    const matchingSparkTerms =
      sparkTerms.filter((term) =>
        content.includes(term)
      );

    score +=
      matchingSparkTerms.length * 35;

    if (
      matchingSparkTerms.length ===
      sparkTerms.length
    ) {
      score += 150;
    }
  }

  return score;
}

export function searchKnowledge(
  query: string
): string {
  const documents = loadKnowledge();

  const ranked: RankedDocument[] =
    documents
      .filter(
        (document) =>
          document.content.trim().length > 0
      )
      .map((document) => ({
        document,
        score: calculateScore(
          document,
          query
        ),
      }))
      .filter(
        ({ score }) => score > 0
      )
      .sort(
        (a, b) => b.score - a.score
      )
      .slice(0, 5);

  if (ranked.length === 0) {
    return "";
  }

  return ranked
    .map(
      ({
        document,
        score,
      }) => `
# ${document.title}

Knowledge source: ${document.filePath}
Relevance score: ${score}
Category: ${document.category}

${document.content}
`
    )
    .join(
      "\n\n------------------------------\n\n"
    );
}