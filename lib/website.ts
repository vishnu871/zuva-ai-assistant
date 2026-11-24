// const ZUVA_BASE_URL = "https://www.zuva.life";
// const ZUVA_ORIGIN = new URL(ZUVA_BASE_URL).origin;

// const CACHE_TTL_MS = 5 * 60 * 1000;
// const FETCH_TIMEOUT_MS = 8000;

// const MAX_CRAWL_PAGES = 25;
// const MAX_EVENT_PAGES = 20;
// const MAX_PAGE_LENGTH = 18000;
// const MAX_LINKS_PER_PAGE = 80;

// interface WebsitePage {
//   url: string;
//   title: string;
//   text: string;
//   links: string[];
// }

// interface WebsiteCache {
//   query: string;
//   content: string;
//   fetchedAt: number;
// }

// let websiteCache: WebsiteCache | null = null;

// /*
//  * ============================================================
//  * STABLE ZUVA QUERY PATTERNS
//  * ============================================================
//  *
//  * These are questions that should be answered from the local
//  * knowledge base and should NOT trigger a website crawl.
//  */

// const STABLE_QUERY_PATTERNS = [
//   /\bwhat are the four dimensions\b/i,
//   /\bfour dimensions of spark\b/i,
//   /\bwhat is spark experiences?\b/i,
//   /\bwhat are spark experiences\b/i,
//   /\btell me about spark experiences\b/i,
//   /\bwhat is purpose pathways\b/i,
//   /\bwhat are purpose pathways\b/i,
//   /\btell me about purpose pathways\b/i,
//   /\bwhat is discovery journey\b/i,
//   /\bwhat is the discovery journey\b/i,
//   /\btell me about discovery journey\b/i,
//   /\bwhat is zest circle\b/i,
//   /\btell me about zest circle\b/i,
//   /\bwhat is zuva life\b/i,
//   /\btell me about zuva life\b/i,
//   /\bwhat does zuva life do\b/i,
//   /\bwhat does zuva offer\b/i,
//   /\bwhat are zuva life offerings\b/i,
//   /\bwhat are the offerings\b/i,
//   /\bhow does discovery work\b/i,
//   /\bhow does zest circle work\b/i,
//   /\bhow do purpose pathways work\b/i,
// ];

// /*
//  * ============================================================
//  * LIVE WEBSITE QUERY PATTERNS
//  * ============================================================
//  *
//  * These are intentionally focused on information that can change:
//  * dates, current events, registration, availability, pricing,
//  * locations, upcoming experiences, etc.
//  *
//  * Do NOT use a generic "experiences" pattern here because it causes
//  * stable questions about Spark Experiences to trigger crawling.
//  */

// const LIVE_QUERY_PATTERNS = [
//   /\bupcoming\b/i,
//   /\bcurrent\b/i,
//   /\bcurrently\b/i,
//   /\bwhat(?:'s| is) happening\b/i,
//   /\bwhat is happening\b/i,

//   /\bupcoming events?\b/i,
//   /\bupcoming workshops?\b/i,
//   /\bupcoming sessions?\b/i,
//   /\bupcoming experiences?\b/i,
//   /\bupcoming retreats?\b/i,

//   /\bcurrent events?\b/i,
//   /\bcurrent workshops?\b/i,
//   /\bcurrent sessions?\b/i,
//   /\bcurrent experiences?\b/i,
//   /\bcurrent retreats?\b/i,

//   /\bnext event\b/i,
//   /\bnext workshop\b/i,
//   /\bnext session\b/i,
//   /\bnext experience\b/i,
//   /\bnext retreat\b/i,

//   /\bwhat events\b/i,
//   /\bwhat workshops\b/i,
//   /\bwhat sessions\b/i,
//   /\bwhat experiences are coming\b/i,
//   /\bwhat retreats\b/i,

//   /\bretreats? coming up\b/i,
//   /\bworkshops? coming up\b/i,
//   /\bsessions? coming up\b/i,
//   /\bevents? coming up\b/i,
//   /\bexperiences? coming up\b/i,

//   /\bregister\b/i,
//   /\bregistration\b/i,
//   /\bregistration link\b/i,
//   /\bhow do i register\b/i,

//   /\bavailability\b/i,
//   /\bavailable\b/i,
//   /\bcan i attend\b/i,
//   /\bcan i join\b/i,

//   /\bthis week\b/i,
//   /\bthis month\b/i,
//   /\bnext week\b/i,
//   /\bnext month\b/i,

//   /\bcoming up\b/i,
//   /\bcalendar\b/i,

//   /\bdate\b/i,
//   /\bdates\b/i,
//   /\bwhen is\b/i,
//   /\bwhen are\b/i,

//   /\bwhere is\b/i,
//   /\bwhere are\b/i,
//   /\bvenue\b/i,
//   /\blocation\b/i,

//   /\bprice\b/i,
//   /\bpricing\b/i,
//   /\bcost\b/i,
//   /\bfee\b/i,
//   /\bfees\b/i,
// ];

// const CURRENT_EVENT_PATTERNS = [
//   /\bupcoming events?\b/i,
//   /\bupcoming experiences?\b/i,
//   /\bupcoming workshops?\b/i,
//   /\bupcoming sessions?\b/i,
//   /\bupcoming retreats?\b/i,

//   /\bwhat events\b/i,
//   /\bwhat workshops\b/i,
//   /\bwhat sessions\b/i,
//   /\bwhat experiences are coming\b/i,
//   /\bwhat retreats\b/i,

//   /\bwhat can i attend\b/i,
//   /\bwhat can i join\b/i,
//   /\bwhat can i register\b/i,

//   /\bwhat(?:'s| is) coming up\b/i,
//   /\bwhat is happening\b/i,

//   /\bcurrent events?\b/i,
//   /\bcurrent experiences?\b/i,
//   /\bcurrent workshops?\b/i,
//   /\bcurrent retreats?\b/i,

//   /\bnext event\b/i,
//   /\bnext workshop\b/i,
//   /\bnext retreat\b/i,
//   /\bnext experience\b/i,

//   /\bupcoming retreat\b/i,
//   /\bupcoming workshop\b/i,
//   /\bupcoming experience\b/i,
// ];

// /*
//  * ============================================================
//  * TEXT HELPERS
//  * ============================================================
//  */

// function normalizeWhitespace(value: string): string {
//   return value
//     .replace(/\r/g, "")
//     .replace(/[ \t]+/g, " ")
//     .replace(/\n{3,}/g, "\n\n")
//     .trim();
// }

// function stripHtml(html: string): string {
//   return html
//     .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
//     .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
//     .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, "")
//     .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, "")
//     .replace(/<!--[\s\S]*?-->/g, "")
//     .replace(
//       /<(br|\/p|\/div|\/section|\/article|\/li|\/h[1-6])\s*\/?>/gi,
//       "\n"
//     )
//     .replace(/<li\b[^>]*>/gi, "\n- ")
//     .replace(/<[^>]+>/g, " ")
//     .replace(/&nbsp;/gi, " ")
//     .replace(/&amp;/gi, "&")
//     .replace(/&quot;/gi, '"')
//     .replace(/&#39;/gi, "'")
//     .replace(/&lt;/gi, "<")
//     .replace(/&gt;/gi, ">")
//     .replace(/\u00a0/g, " ");
// }

// function extractTitle(html: string): string {
//   const match = html.match(
//     /<title[^>]*>([\s\S]*?)<\/title>/i
//   );

//   if (!match) {
//     return "";
//   }

//   return normalizeWhitespace(stripHtml(match[1]));
// }

// function extractLinks(html: string): string[] {
//   const links = new Set<string>();

//   const linkPattern =
//     /<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi;

//   let match: RegExpExecArray | null;

//   while ((match = linkPattern.exec(html)) !== null) {
//     const rawHref = match[1]?.trim();

//     if (!rawHref) {
//       continue;
//     }

//     if (
//       rawHref.startsWith("#") ||
//       rawHref.startsWith("mailto:") ||
//       rawHref.startsWith("tel:") ||
//       rawHref.startsWith("javascript:")
//     ) {
//       continue;
//     }

//     try {
//       const url = new URL(
//         rawHref,
//         ZUVA_BASE_URL
//       );

//       if (url.origin !== ZUVA_ORIGIN) {
//         continue;
//       }

//       url.hash = "";

//       const pathname =
//         url.pathname.toLowerCase();

//       if (
//         pathname.includes("/wp-admin") ||
//         pathname.includes("/wp-login") ||
//         pathname.includes("/feed") ||
//         pathname.endsWith(".xml") ||
//         pathname.endsWith(".json") ||
//         pathname.endsWith(".jpg") ||
//         pathname.endsWith(".jpeg") ||
//         pathname.endsWith(".png") ||
//         pathname.endsWith(".gif") ||
//         pathname.endsWith(".webp") ||
//         pathname.endsWith(".svg") ||
//         pathname.endsWith(".pdf")
//       ) {
//         continue;
//       }

//       links.add(url.toString());
//     } catch {
//       // Ignore malformed links.
//     }

//     if (links.size >= MAX_LINKS_PER_PAGE) {
//       break;
//     }
//   }

//   return Array.from(links);
// }

// /*
//  * ============================================================
//  * URL RELEVANCE
//  * ============================================================
//  */

// function scorePageUrl(url: string): number {
//   const pathname =
//     new URL(url).pathname.toLowerCase();

//   let score = 0;

//   if (
//     pathname === "/" ||
//     pathname === ""
//   ) {
//     score += 2;
//   }

//   if (
//     pathname.includes("our-experiences")
//   ) {
//     score += 30;
//   }

//   if (pathname.includes("experience")) {
//     score += 20;
//   }

//   if (pathname.includes("event")) {
//     score += 20;
//   }

//   if (pathname.includes("retreat")) {
//     score += 20;
//   }

//   if (pathname.includes("zest")) {
//     score += 15;
//   }

//   if (pathname.includes("spark")) {
//     score += 15;
//   }

//   if (pathname.includes("workshop")) {
//     score += 15;
//   }

//   if (pathname.includes("journey")) {
//     score += 10;
//   }

//   if (pathname.includes("purpose")) {
//     score += 10;
//   }

//   if (pathname.includes("pathway")) {
//     score += 10;
//   }

//   if (pathname.includes("about")) {
//     score += 5;
//   }

//   if (pathname.includes("approach")) {
//     score += 5;
//   }

//   return score;
// }

// function scoreTextAgainstQuery(
//   value: string,
//   query: string
// ): number {
//   const normalizedValue =
//     value.toLowerCase();

//   const terms = query
//     .toLowerCase()
//     .split(/\s+/)
//     .filter(
//       (term) => term.length > 2
//     );

//   let score = 0;

//   for (const term of terms) {
//     if (
//       normalizedValue.includes(term)
//     ) {
//       score += 3;
//     }
//   }

//   return score;
// }

// function sortUrlsByRelevance(
//   urls: string[],
//   query: string
// ): string[] {
//   return urls
//     .map((url) => ({
//       url,
//       score:
//         scorePageUrl(url) +
//         scoreTextAgainstQuery(
//           url,
//           query
//         ),
//     }))
//     .sort(
//       (a, b) => b.score - a.score
//     )
//     .map((item) => item.url);
// }

// /*
//  * ============================================================
//  * FETCHING
//  * ============================================================
//  */

// async function fetchPage(
//   url: string
// ): Promise<WebsitePage | null> {
//   const controller =
//     new AbortController();

//   const timeout = setTimeout(() => {
//     controller.abort();
//   }, FETCH_TIMEOUT_MS);

//   try {
//     const response = await fetch(
//       url,
//       {
//         method: "GET",
//         headers: {
//           Accept:
//             "text/html,application/xhtml+xml",
//           "User-Agent":
//             "ZuvaLife-Milo/2.1",
//         },
//         cache: "no-store",
//         signal: controller.signal,
//       }
//     );

//     if (!response.ok) {
//       console.warn(
//         `[Milo website reader] ${url} returned HTTP ${response.status}`
//       );

//       return null;
//     }

//     const contentType =
//       response.headers.get(
//         "content-type"
//       ) ?? "";

//     if (
//       !contentType.includes(
//         "text/html"
//       ) &&
//       !contentType.includes(
//         "application/xhtml+xml"
//       )
//     ) {
//       return null;
//     }

//     const html =
//       await response.text();

//     const title =
//       extractTitle(html);

//     const text =
//       normalizeWhitespace(
//         stripHtml(html)
//       );

//     const links =
//       extractLinks(html);

//     if (!text) {
//       return null;
//     }

//     return {
//       url,
//       title,
//       text,
//       links,
//     };
//   } catch (error) {
//     console.warn(
//       `[Milo website reader] Failed to fetch ${url}:`,
//       error instanceof Error
//         ? error.message
//         : String(error)
//     );

//     return null;
//   } finally {
//     clearTimeout(timeout);
//   }
// }

// async function fetchPagesInBatches(
//   urls: string[],
//   batchSize = 6
// ): Promise<WebsitePage[]> {
//   const pages: WebsitePage[] = [];

//   for (
//     let index = 0;
//     index < urls.length;
//     index += batchSize
//   ) {
//     const batch =
//       urls.slice(
//         index,
//         index + batchSize
//       );

//     const results =
//       await Promise.all(
//         batch.map((url) =>
//           fetchPage(url)
//         )
//       );

//     for (const page of results) {
//       if (page) {
//         pages.push(page);
//       }
//     }
//   }

//   return pages;
// }

// /*
//  * ============================================================
//  * DATE HANDLING
//  * ============================================================
//  */

// function getTodayInIndia(): string {
//   return new Intl.DateTimeFormat(
//     "en-CA",
//     {
//       timeZone: "Asia/Kolkata",
//       year: "numeric",
//       month: "2-digit",
//       day: "2-digit",
//     }
//   ).format(new Date());
// }

// function parseDateFromMonthDay(
//   monthName: string,
//   day: string,
//   year?: string
// ): Date | null {
//   const monthMap: Record<
//     string,
//     number
//   > = {
//     january: 0,
//     february: 1,
//     march: 2,
//     april: 3,
//     may: 4,
//     june: 5,
//     july: 6,
//     august: 7,
//     september: 8,
//     october: 9,
//     november: 10,
//     december: 11,

//     jan: 0,
//     feb: 1,
//     mar: 2,
//     apr: 3,
//     jun: 5,
//     jul: 6,
//     aug: 7,
//     sep: 8,
//     sept: 8,
//     oct: 9,
//     nov: 10,
//     dec: 11,
//   };

//   const month =
//     monthMap[
//       monthName.toLowerCase()
//     ];

//   if (month === undefined) {
//     return null;
//   }

//   const parsedDay = Number(day);

//   if (!Number.isFinite(parsedDay)) {
//     return null;
//   }

//   const parsedYear = year
//     ? Number(year)
//     : Number(
//         getTodayInIndia().slice(0, 4)
//       );

//   if (!Number.isFinite(parsedYear)) {
//     return null;
//   }

//   const date = new Date(
//     Date.UTC(
//       parsedYear,
//       month,
//       parsedDay
//     )
//   );

//   if (
//     date.getUTCFullYear() !==
//       parsedYear ||
//     date.getUTCMonth() !== month ||
//     date.getUTCDate() !==
//       parsedDay
//   ) {
//     return null;
//   }

//   return date;
// }

// function extractDates(
//   text: string
// ): Date[] {
//   const dates: Date[] = [];

//   const normalized = text
//     .replace(/\u2013/g, "-")
//     .replace(/\u2014/g, "-")
//     .replace(/\u2011/g, "-");

//   const monthNamePatterns = [
//     /\b(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday)?\s*,?\s*(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{1,2})(?:st|nd|rd|th)?(?:\s*,?\s*(20\d{2}))?/gi,

//     /\b(?:mon|tue|wed|thu|fri|sat|sun)?\.?\s*,?\s*(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)\s+(\d{1,2})(?:st|nd|rd|th)?(?:\s*,?\s*(20\d{2}))?/gi,
//   ];

//   for (
//     const pattern of monthNamePatterns
//   ) {
//     let match: RegExpExecArray | null;

//     while (
//       (match =
//         pattern.exec(normalized)) !==
//       null
//     ) {
//       const date =
//         parseDateFromMonthDay(
//           match[1],
//           match[2],
//           match[3]
//         );

//       if (date) {
//         dates.push(date);
//       }
//     }
//   }

//   const numericMonthDayPattern =
//     /\b(\d{1,2})[\/\-](\d{1,2})[\/\-](20\d{2})\b/g;

//   let numericMatch: RegExpExecArray | null;

//   while (
//     (numericMatch =
//       numericMonthDayPattern.exec(
//         normalized
//       )) !== null
//   ) {
//     const month =
//       Number(numericMatch[1]);

//     const day =
//       Number(numericMatch[2]);

//     const year =
//       Number(numericMatch[3]);

//     const date = new Date(
//       Date.UTC(
//         year,
//         month - 1,
//         day
//       )
//     );

//     if (
//       date.getUTCFullYear() ===
//         year &&
//       date.getUTCMonth() ===
//         month - 1 &&
//       date.getUTCDate() === day
//     ) {
//       dates.push(date);
//     }
//   }

//   const numericYearFirstPattern =
//     /\b(20\d{2})[\/\-](\d{1,2})[\/\-](\d{1,2})\b/g;

//   let yearFirstMatch:
//     | RegExpExecArray
//     | null;

//   while (
//     (yearFirstMatch =
//       numericYearFirstPattern.exec(
//         normalized
//       )) !== null
//   ) {
//     const year =
//       Number(yearFirstMatch[1]);

//     const month =
//       Number(yearFirstMatch[2]);

//     const day =
//       Number(yearFirstMatch[3]);

//     const date = new Date(
//       Date.UTC(
//         year,
//         month - 1,
//         day
//       )
//     );

//     if (
//       date.getUTCFullYear() ===
//         year &&
//       date.getUTCMonth() ===
//         month - 1 &&
//       date.getUTCDate() === day
//     ) {
//       dates.push(date);
//     }
//   }

//   return dates;
// }

// function dateToKey(
//   date: Date
// ): string {
//   return date
//     .toISOString()
//     .slice(0, 10);
// }

// /*
//  * ============================================================
//  * EVENT STATUS
//  * ============================================================
//  */

// function pageHasExplicitPastStatus(
//   page: WebsitePage
// ): boolean {
//   const text =
//     page.text.toLowerCase();

//   return (
//     /\bexpired\b/.test(text) ||
//     /\bcompleted\b/.test(text) ||
//     /\bpast event\b/.test(text) ||
//     /\bpast experience\b/.test(text) ||
//     /\bevent has ended\b/.test(text) ||
//     /\bregistration closed\b/.test(
//       text
//     ) ||
//     /\bregistrations closed\b/.test(
//       text
//     )
//   );
// }

// function pageHasExplicitUpcomingStatus(
//   page: WebsitePage
// ): boolean {
//   const text =
//     page.text.toLowerCase();

//   return (
//     /\bupcoming\b/.test(text) ||
//     /\bcoming up\b/.test(text) ||
//     /\breserve your spot\b/.test(
//       text
//     ) ||
//     /\bregister here\b/.test(text) ||
//     /\benroll now\b/.test(text)
//   );
// }

// interface EventStatus {
//   status:
//     | "upcoming"
//     | "past"
//     | "unknown";
//   dates: string[];
//   reason: string;
// }

// function determineEventStatus(
//   page: WebsitePage
// ): EventStatus {
//   const today =
//     getTodayInIndia();

//   const dates =
//     extractDates(page.text);

//   const dateKeys = dates
//     .map(dateToKey)
//     .filter(
//       (value, index, array) =>
//         array.indexOf(value) ===
//         index
//     )
//     .sort();

//   if (
//     pageHasExplicitPastStatus(page)
//   ) {
//     return {
//       status: "past",
//       dates: dateKeys,
//       reason:
//         "The page explicitly indicates that the event is past, completed, or expired.",
//     };
//   }

//   if (dates.length > 0) {
//     const hasFutureDate =
//       dates.some(
//         (date) =>
//           dateToKey(date) >=
//           today
//       );

//     if (hasFutureDate) {
//       return {
//         status: "upcoming",
//         dates: dateKeys,
//         reason:
//           "The event page contains a date that is today or in the future.",
//       };
//     }

//     return {
//       status: "past",
//       dates: dateKeys,
//       reason:
//         "All event dates on the page are before today.",
//     };
//   }

//   if (
//     pageHasExplicitUpcomingStatus(
//       page
//     )
//   ) {
//     return {
//       status: "upcoming",
//       dates: [],
//       reason:
//         "The website explicitly presents the page as upcoming/current but does not expose a parseable event date.",
//     };
//   }

//   return {
//     status: "unknown",
//     dates: [],
//     reason:
//       "The page does not contain enough information to determine current event status.",
//   };
// }

// function isLikelyEventPage(
//   page: WebsitePage
// ): boolean {
//   const combined =
//     `${page.url} ${page.title} ${page.text}`.toLowerCase();

//   const signals = [
//     "event",
//     "experience",
//     "retreat",
//     "workshop",
//     "zest circle",
//     "register here",
//     "reserve your spot",
//     "date & time",
//     "who is it for",
//   ];

//   const matches =
//     signals.filter(
//       (signal) =>
//         combined.includes(signal)
//     ).length;

//   return matches >= 2;
// }

// function scoreEventCandidate(
//   page: WebsitePage,
//   query: string
// ): number {
//   const url =
//     page.url.toLowerCase();

//   const title =
//     page.title.toLowerCase();

//   const text =
//     page.text.toLowerCase();

//   const normalizedQuery =
//     query.toLowerCase();

//   let score = 0;

//   if (
//     url.includes("event") ||
//     url.includes("experience") ||
//     url.includes("retreat") ||
//     url.includes("workshop") ||
//     url.includes("zest") ||
//     url.includes("midlife")
//   ) {
//     score += 15;
//   }

//   if (
//     title.includes("event") ||
//     title.includes("retreat") ||
//     title.includes("workshop") ||
//     title.includes("zest") ||
//     title.includes("midlife")
//   ) {
//     score += 15;
//   }

//   if (
//     text.includes("date & time")
//   ) {
//     score += 15;
//   }

//   if (text.includes("register")) {
//     score += 10;
//   }

//   if (
//     text.includes(
//       "reserve your spot"
//     )
//   ) {
//     score += 10;
//   }

//   if (text.includes("upcoming")) {
//     score += 8;
//   }

//   if (text.includes("retreat")) {
//     score += 8;
//   }

//   if (text.includes("experience")) {
//     score += 5;
//   }

//   const queryTerms =
//     normalizedQuery
//       .split(/\s+/)
//       .filter(
//         (term) =>
//           term.length > 2
//       );

//   for (const term of queryTerms) {
//     if (title.includes(term)) {
//       score += 8;
//     }

//     if (url.includes(term)) {
//       score += 6;
//     }

//     if (text.includes(term)) {
//       score += 2;
//     }
//   }

//   return score;
// }

// function selectEventPages(
//   pages: WebsitePage[],
//   query: string
// ): WebsitePage[] {
//   return pages
//     .filter(isLikelyEventPage)
//     .map((page) => ({
//       page,
//       score:
//         scoreEventCandidate(
//           page,
//           query
//         ),
//     }))
//     .sort(
//       (a, b) => b.score - a.score
//     )
//     .slice(
//       0,
//       MAX_EVENT_PAGES
//     )
//     .map(
//       (item) => item.page
//     );
// }

// /*
//  * ============================================================
//  * WEBSITE CONTEXT
//  * ============================================================
//  */

// function buildGeneralWebsiteContext(
//   pages: WebsitePage[]
// ): string {
//   if (pages.length === 0) {
//     return "";
//   }

//   const sections =
//     pages.map((page) => {
//       const trimmedText =
//         page.text.slice(
//           0,
//           MAX_PAGE_LENGTH
//         );

//       return [
//         `SOURCE URL: ${page.url}`,
//         `PAGE TITLE: ${
//           page.title ||
//           "Zuva Life website page"
//         }`,
//         "",
//         trimmedText,
//       ].join("\n");
//     });

//   return `
// ==============================
// LIVE ZUVA LIFE WEBSITE
// ==============================

// The following information was fetched directly from the public Zuva Life
// website.

// SOURCE RULES:
// - This is current public website information.
// - Use it as the primary source for Zuva Life website content.
// - Do not invent facts that are not present here.
// - Do not assume an event is current merely because it appears somewhere
//   on the website.
// - For current events, use the event-status section below.
// - SOURCE URL identifies the exact page where the information came from.

// ${sections.join(
//   "\n\n------------------------------\n\n"
// )}
// `.trim();
// }

// function buildEventWebsiteContext(
//   pages: WebsitePage[]
// ): string {
//   if (pages.length === 0) {
//     return "";
//   }

//   const eventRecords =
//     pages.map((page) => {
//       const status =
//         determineEventStatus(
//           page
//         );

//       return [
//         `EVENT PAGE URL: ${page.url}`,
//         `EVENT PAGE TITLE: ${
//           page.title ||
//           "Untitled event"
//         }`,
//         `STATUS DETERMINATION: ${status.status.toUpperCase()}`,
//         `STATUS REASON: ${status.reason}`,
//         `DATES FOUND: ${
//           status.dates.length > 0
//             ? status.dates.join(", ")
//             : "No parseable date found"
//         }`,
//         "",
//         page.text.slice(
//           0,
//           MAX_PAGE_LENGTH
//         ),
//       ].join("\n");
//     });

//   return `
// ==============================
// LIVE ZUVA LIFE EVENT DATABASE
// ==============================

// Today in India is:
// ${getTodayInIndia()}

// The following event and experience pages were fetched directly from the
// Zuva Life website.

// CRITICAL EVENT RULES:

// 1. An event is UPCOMING only when its specific event page supports that
//    conclusion.

// 2. If a specific event page contains an actual date that is before today,
//    treat it as PAST.

// 3. If a page explicitly says "Expired", "Completed", "Past Event",
//    "Registration Closed", or equivalent, treat it as PAST.

// 4. If an event is listed on an "Upcoming Events" page but its individual
//    event page says that it is expired or its date has passed, do NOT call
//    it upcoming.

// 5. If an event/retreat page explicitly indicates that it is upcoming/current
//    but does not expose a parseable date, it may be described as upcoming,
//    but do not invent a date.

// 6. Retreats are valid Zuva Life experiences. Do not exclude a retreat just
//    because it is hosted or registered through another platform.

// 7. When Zuva's website and an external registration page conflict, use the
//    most specific current event/registration status available and explain
//    the uncertainty rather than inventing a resolution.

// 8. Never use historical knowledge-base event data to fill a missing current
//    event.

// 9. Never describe a completed event as "upcoming".

// 10. Never invent registration availability, prices, dates, venues,
//     facilitators, or links.

// 11. EVENT PAGE URL is the authoritative URL for that individual event
//     whenever the user asks for details, registration, or where to learn
//     more.

// EVENT PAGES:

// ${eventRecords.join(
//   "\n\n==============================\n\n"
// )}
// `.trim();
// }

// /*
//  * ============================================================
//  * CRAWLER
//  * ============================================================
//  */

// async function crawlZuvaWebsite(
//   query: string,
//   currentEventQuery: boolean
// ): Promise<string> {
//   const homepage =
//     await fetchPage(
//       `${ZUVA_BASE_URL}/`
//     );

//   if (!homepage) {
//     return "";
//   }

//   const discoveredUrls =
//     new Set<string>();

//   discoveredUrls.add(
//     `${ZUVA_BASE_URL}/`
//   );

//   for (const link of homepage.links) {
//     discoveredUrls.add(link);
//   }

//   let prioritizedUrls =
//     sortUrlsByRelevance(
//       Array.from(
//         discoveredUrls
//       ),
//       query
//     );

//   prioritizedUrls =
//     prioritizedUrls.slice(
//       0,
//       MAX_CRAWL_PAGES
//     );

//   const additionalPages =
//     await fetchPagesInBatches(
//       prioritizedUrls.filter(
//         (url) =>
//           url !==
//           `${ZUVA_BASE_URL}/`
//       ),
//       6
//     );

//   const firstPassPages = [
//     homepage,
//     ...additionalPages,
//   ];

//   const secondLevelUrls =
//     new Set<string>();

//   for (const page of firstPassPages) {
//     for (const link of page.links) {
//       secondLevelUrls.add(link);
//     }
//   }

//   const existingUrls =
//     new Set(
//       firstPassPages.map(
//         (page) => page.url
//       )
//     );

//   const remainingUrls =
//     Array.from(
//       secondLevelUrls
//     ).filter(
//       (url) =>
//         !existingUrls.has(url)
//     );

//   const prioritizedSecondLevelUrls =
//     sortUrlsByRelevance(
//       remainingUrls,
//       query
//     ).slice(
//       0,
//       Math.max(
//         0,
//         MAX_CRAWL_PAGES -
//           firstPassPages.length
//       )
//     );

//   const secondPassPages =
//     prioritizedSecondLevelUrls.length >
//     0
//       ? await fetchPagesInBatches(
//           prioritizedSecondLevelUrls,
//           6
//         )
//       : [];

//   const allPages = [
//     ...firstPassPages,
//     ...secondPassPages,
//   ];

//   const uniquePages =
//     Array.from(
//       new Map(
//         allPages.map((page) => [
//           page.url,
//           page,
//         ])
//       ).values()
//     );

//   const eventPages =
//     currentEventQuery
//       ? selectEventPages(
//           uniquePages,
//           query
//         )
//       : [];

//   const generalPages =
//     uniquePages
//       .filter(
//         (page) =>
//           !currentEventQuery ||
//           !eventPages.some(
//             (eventPage) =>
//               eventPage.url ===
//               page.url
//           )
//       )
//       .slice(
//         0,
//         MAX_CRAWL_PAGES
//       );

//   const generalContext =
//     buildGeneralWebsiteContext(
//       generalPages
//     );

//   const eventContext =
//     currentEventQuery
//       ? buildEventWebsiteContext(
//           eventPages
//         )
//       : "";

//   return [
//     generalContext,
//     eventContext,
//   ]
//     .filter(Boolean)
//     .join("\n\n");
// }

// /*
//  * ============================================================
//  * QUERY ROUTING
//  * ============================================================
//  */

// export function shouldUseLiveWebsite(
//   query: string
// ): boolean {
//   const normalizedQuery =
//     query.toLowerCase().trim();

//   if (!normalizedQuery) {
//     return false;
//   }

//   /*
//    * Stable knowledge questions always win.
//    *
//    * This prevents phrases such as "Spark Experiences"
//    * from accidentally triggering a website crawl.
//    */
//   if (
//     STABLE_QUERY_PATTERNS.some(
//       (pattern) =>
//         pattern.test(
//           normalizedQuery
//         )
//     )
//   ) {
//     return false;
//   }

//   /*
//    * Current-event queries always use
//    * the live website.
//    */
//   if (
//     CURRENT_EVENT_PATTERNS.some(
//       (pattern) =>
//         pattern.test(
//           normalizedQuery
//         )
//     )
//   ) {
//     return true;
//   }

//   return LIVE_QUERY_PATTERNS.some(
//     (pattern) =>
//       pattern.test(
//         normalizedQuery
//       )
//   );
// }

// export function isCurrentEventQuery(
//   query: string
// ): boolean {
//   const normalizedQuery =
//     query.toLowerCase().trim();

//   if (!normalizedQuery) {
//     return false;
//   }

//   return CURRENT_EVENT_PATTERNS.some(
//     (pattern) =>
//       pattern.test(
//         normalizedQuery
//       )
//   );
// }

// /*
//  * ============================================================
//  * PUBLIC WEBSITE READER
//  * ============================================================
//  */

// export async function readLiveZuvaWebsite(
//   query: string
// ): Promise<string> {
//   if (
//     !shouldUseLiveWebsite(query)
//   ) {
//     return "";
//   }

//   const currentEventQuery =
//     isCurrentEventQuery(query);

//   /*
//    * Cache only when the cached query is
//    * the same query.
//    *
//    * This prevents an event answer from
//    * being reused for another question.
//    */
//   if (
//     websiteCache &&
//     websiteCache.query ===
//       query.trim().toLowerCase() &&
//     Date.now() -
//       websiteCache.fetchedAt <
//       CACHE_TTL_MS &&
//     websiteCache.content
//   ) {
//     console.log(
//       "[Milo website reader] Using cached website context."
//     );

//     return websiteCache.content;
//   }

//   try {
//     console.log(
//       `[Milo website reader] Crawling Zuva website for: "${query}"`
//     );

//     const websiteContext =
//       await crawlZuvaWebsite(
//         query,
//         currentEventQuery
//       );

//     if (!websiteContext) {
//       console.warn(
//         "[Milo website reader] No website context was retrieved."
//       );

//       return "";
//     }

//     websiteCache = {
//       query: query
//         .trim()
//         .toLowerCase(),
//       content:
//         websiteContext,
//       fetchedAt:
//         Date.now(),
//     };

//     console.log(
//       "[Milo website reader] Website context successfully built."
//     );

//     return websiteContext;
//   } catch (error) {
//     console.error(
//       "[Milo website reader] Website crawl failed:",
//       error instanceof Error
//         ? error.message
//         : String(error)
//     );

//     return "";
//   }
// }\




const ZUVA_BASE_URL = "https://www.zuva.life";
const ZUVA_ORIGIN = new URL(ZUVA_BASE_URL).origin;

const CACHE_TTL_MS = 60 * 1000;
const FETCH_TIMEOUT_MS = 10000;

const MAX_CRAWL_PAGES = 35;
const MAX_LINKS_PER_PAGE = 120;

interface WebsiteLink {
  url: string;
  label: string;
  isExternal: boolean;
}

interface WebsitePage {
  url: string;
  title: string;
  text: string;
  links: WebsiteLink[];
  structuredDates: string[];
}

interface WebsiteCache {
  query: string;
  content: string;
  events: EventRecord[];
  fetchedAt: number;
}

export interface EventRecord {
  title: string;
  url: string;
  status: "upcoming" | "past" | "unknown";
  dates: string[];
  location: string;
  registrationLinks: string[];
  reason: string;
  description: string;
}

interface CrawlResult {
  content: string;
  events: EventRecord[];
}

let websiteCache: WebsiteCache | null = null;

/* ============================================================
   QUERY CLASSIFICATION
============================================================ */

const STABLE_QUERY_PATTERNS = [
  /\bwhat are the four dimensions\b/i,
  /\bfour dimensions of spark\b/i,
  /\bwhat is spark experiences?\b/i,
  /\bwhat are spark experiences\b/i,
  /\btell me about spark experiences\b/i,

  /\bwhat is purpose pathways\b/i,
  /\bwhat are purpose pathways\b/i,
  /\btell me about purpose pathways\b/i,

  /\bwhat is discovery journey\b/i,
  /\bwhat is the discovery journey\b/i,
  /\btell me about discovery journey\b/i,

  /\bwhat is zest circle\b/i,
  /\btell me about zest circle\b/i,

  /\bwhat is zuva life\b/i,
  /\btell me about zuva life\b/i,
  /\bwhat does zuva life do\b/i,
  /\bwhat does zuva offer\b/i,
  /\bwhat are zuva life offerings\b/i,
  /\bwhat are the offerings\b/i,

  /\bhow does discovery work\b/i,
  /\bhow does zest circle work\b/i,
  /\bhow do purpose pathways work\b/i,
];

const CURRENT_EVENT_PATTERNS = [
  /\bupcoming\b.{0,60}\b(events?|workshops?|sessions?|experiences?|retreats?)\b/i,
  /\b(current|latest)\b.{0,60}\b(events?|workshops?|sessions?|experiences?|retreats?)\b/i,

  /\bnext\b.{0,60}\b(events?|workshops?|sessions?|experiences?|retreats?)\b/i,

  /\bwhat(?:'s| is)\s+(?:the\s+)?next\b.{0,60}\b(events?|workshops?|sessions?|experiences?|retreats?)\b/i,

  /\bwhat (?:events?|workshops?|sessions?|experiences?|retreats?)\b/i,

  /\bwhat can i attend\b/i,
  /\bwhat can i join\b/i,
  /\bwhat can i register\b/i,

  /\bwhat(?:'s| is) coming up\b/i,
  /\bwhat is happening\b/i,

  /\bretreats? coming up\b/i,
  /\bworkshops? coming up\b/i,
  /\bsessions? coming up\b/i,
  /\bevents? coming up\b/i,
  /\bexperiences? coming up\b/i,

  /\bshow me (?:the )?(?:events?|workshops?|sessions?|experiences?)\b/i,
  /\blist (?:the )?(?:events?|workshops?|sessions?|experiences?)\b/i,
];

const LIVE_QUERY_PATTERNS = [
  /\bupcoming\b/i,
  /\bcurrent\b/i,
  /\bcurrently\b/i,
  /\bwhat(?:'s| is) happening\b/i,

  /\bregister\b/i,
  /\bregistration\b/i,
  /\bregistration link\b/i,
  /\bhow do i register\b/i,

  /\bavailability\b/i,
  /\bavailable\b/i,
  /\bcan i attend\b/i,
  /\bcan i join\b/i,

  /\bthis week\b/i,
  /\bthis month\b/i,
  /\bnext week\b/i,
  /\bnext month\b/i,
  /\bcoming up\b/i,
  /\bcalendar\b/i,

  /\bdate\b/i,
  /\bdates\b/i,
  /\bwhen is\b/i,
  /\bwhen are\b/i,

  /\bwhere is\b/i,
  /\bwhere are\b/i,
  /\bvenue\b/i,
  /\blocation\b/i,

  /\bprice\b/i,
  /\bpricing\b/i,
  /\bcost\b/i,
  /\bfee\b/i,
  /\bfees\b/i,

  /\bnext\b.{0,60}\b(events?|workshops?|sessions?|experiences?|retreats?)\b/i,
];

export function isCurrentEventQuery(query: string): boolean {
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) return false;

  return CURRENT_EVENT_PATTERNS.some((pattern) =>
    pattern.test(normalizedQuery)
  );
}

export function shouldUseLiveWebsite(query: string): boolean {
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) return false;

  if (
    STABLE_QUERY_PATTERNS.some((pattern) =>
      pattern.test(normalizedQuery)
    )
  ) {
    return false;
  }

  if (isCurrentEventQuery(normalizedQuery)) {
    return true;
  }

  return LIVE_QUERY_PATTERNS.some((pattern) =>
    pattern.test(normalizedQuery)
  );
}

/* ============================================================
   TEXT AND HTML HELPERS
============================================================ */

function normalizeWhitespace(value: string): string {
  return value
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function decodeEntities(value: string): string {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_, code: string) =>
      String.fromCodePoint(Number(code))
    )
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) =>
      String.fromCodePoint(parseInt(code, 16))
    )
    .replace(/\u00a0/g, " ");
}

function stripHtml(html: string): string {
  return decodeEntities(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(
        /<\/?(p|div|section|article|li|h[1-6]|tr|br|main|header|footer|time)[^>]*>/gi,
        "\n"
      )
      .replace(/<li\b[^>]*>/gi, "\n- ")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/[ \t]+/g, " ")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function extractTitle(html: string): string {
  const heading = html.match(
    /<h1\b[^>]*>([\s\S]*?)<\/h1>/i
  );

  const title = html.match(
    /<title\b[^>]*>([\s\S]*?)<\/title>/i
  );

  return normalizeWhitespace(
    stripHtml(heading?.[1] || title?.[1] || "")
  );
}

function extractLinks(html: string): WebsiteLink[] {
  const links = new Map<string, WebsiteLink>();

  const pattern =
    /<a\b([^>]*?)href\s*=\s*["']([^"']+)["']([^>]*)>([\s\S]*?)<\/a>/gi;

  let match: RegExpExecArray | null;

  while ((match = pattern.exec(html)) !== null) {
    const rawHref = match[2]?.trim();

    if (
      !rawHref ||
      rawHref.startsWith("#") ||
      /^(mailto:|tel:|javascript:)/i.test(rawHref)
    ) {
      continue;
    }

    try {
      const url = new URL(rawHref, ZUVA_BASE_URL);

      if (!["http:", "https:"].includes(url.protocol)) {
        continue;
      }

      url.hash = "";

      const normalizedUrl = url.toString();

      if (!links.has(normalizedUrl)) {
        links.set(normalizedUrl, {
          url: normalizedUrl,
          label:
            normalizeWhitespace(stripHtml(match[4])) || "Link",
          isExternal: url.origin !== ZUVA_ORIGIN,
        });
      }

      if (links.size >= MAX_LINKS_PER_PAGE) {
        break;
      }
    } catch {
      // Ignore malformed URLs.
    }
  }

  return Array.from(links.values());
}

/* ============================================================
   STRUCTURED EVENT DATE EXTRACTION
============================================================ */

function extractStructuredDates(html: string): string[] {
  const dates = new Set<string>();

  const scripts =
    html.match(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi
    ) || [];

  function inspect(value: unknown): void {
    if (Array.isArray(value)) {
      value.forEach(inspect);
      return;
    }

    if (!value || typeof value !== "object") {
      return;
    }

    const item = value as Record<string, unknown>;
    const type = item["@type"];

    const isEvent =
      type === "Event" ||
      (Array.isArray(type) && type.includes("Event"));

    if (isEvent) {
      for (const key of ["startDate", "endDate"]) {
        const rawDate = item[key];

        if (typeof rawDate === "string") {
          const match = rawDate.match(
            /^(\d{4}-\d{2}-\d{2})/
          );

          if (match && isValidISODate(match[1])) {
            dates.add(match[1]);
          }
        }
      }
    }

    Object.values(item).forEach(inspect);
  }

  for (const script of scripts) {
    const json = script
      .replace(/^<script\b[^>]*>/i, "")
      .replace(/<\/script>$/i, "");

    try {
      inspect(JSON.parse(json));
    } catch {
      // Ignore malformed JSON-LD.
    }
  }

  return Array.from(dates).sort();
}

/* ============================================================
   URL HELPERS
============================================================ */

function isExcludedUrl(url: string): boolean {
  try {
    const pathname = new URL(url).pathname.toLowerCase();

    return (
      pathname.includes("/wp-admin") ||
      pathname.includes("/wp-login") ||
      pathname.includes("/feed") ||
      pathname.includes("/tag/") ||
      pathname.includes("/category/") ||
      /\.(xml|json|jpg|jpeg|png|gif|webp|svg|pdf|zip|css|js)$/i.test(
        pathname
      )
    );
  } catch {
    return true;
  }
}

function normalizeInternalUrl(url: string): string | null {
  try {
    const parsed = new URL(url, ZUVA_BASE_URL);

    if (parsed.origin !== ZUVA_ORIGIN) return null;
    if (isExcludedUrl(parsed.toString())) return null;

    parsed.hash = "";
    parsed.search = "";

    if (parsed.pathname !== "/") {
      parsed.pathname = parsed.pathname.replace(/\/+$/, "");
    }

    return parsed.toString();
  } catch {
    return null;
  }
}

/* ============================================================
   PAGE RELEVANCE
============================================================ */

function scorePageUrl(url: string, query: string): number {
  const pathname = new URL(url).pathname.toLowerCase();
  const normalizedQuery = query.toLowerCase();

  let score = 0;

  const priorityPaths = [
    { path: "/our-experiences", score: 100 },
    { path: "/events", score: 95 },
    { path: "/upcoming-events", score: 95 },
    { path: "/experiences", score: 85 },
    { path: "/spark-experiences", score: 45 },
    { path: "/zest-circle", score: 45 },
  ];

  for (const item of priorityPaths) {
    if (pathname === item.path) {
      score += item.score;
    }
  }

  if (pathname.includes("event")) score += 35;
  if (pathname.includes("workshop")) score += 35;
  if (pathname.includes("experience")) score += 25;
  if (pathname.includes("retreat")) score += 25;
  if (pathname.includes("zest")) score += 15;
  if (pathname.includes("spark")) score += 10;

  const queryTerms = normalizedQuery
    .split(/\s+/)
    .filter((term) => term.length > 2);

  for (const term of queryTerms) {
    if (pathname.includes(term)) {
      score += 5;
    }
  }

  return score;
}

function sortUrlsByRelevance(
  urls: string[],
  query: string
): string[] {
  return [...new Set(urls)]
    .map((url) => ({
      url,
      score: scorePageUrl(url, query),
    }))
    .sort((a, b) => b.score - a.score)
    .map((item) => item.url);
}

function isLikelyEventPage(page: WebsitePage): boolean {
  const combined =
    `${page.url} ${page.title} ${page.text}`.toLowerCase();

  const signals = [
    "event",
    "experience",
    "retreat",
    "workshop",
    "register here",
    "register now",
    "reserve your spot",
    "date & time",
    "who is it for",
    "facilitator",
    "upcoming events",
  ];

  const matches = signals.filter((signal) =>
    combined.includes(signal)
  ).length;

  const path = new URL(page.url).pathname.toLowerCase();

  return (
    /event|experience|workshop|retreat|zest|midlife|session/.test(
      path
    ) ||
    matches >= 2
  );
}

/* ============================================================
   WEBSITE FETCHING
============================================================ */

async function fetchPage(
  url: string
): Promise<WebsitePage | null> {
  const controller = new AbortController();

  const timeout = setTimeout(
    () => controller.abort(),
    FETCH_TIMEOUT_MS
  );

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "User-Agent": "ZuvaLife-Milo/4.0",
      },
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      console.warn(
        `[Milo website reader] ${url} returned HTTP ${response.status}`
      );

      return null;
    }

    const contentType =
      response.headers.get("content-type") ?? "";

    if (
      !contentType.includes("text/html") &&
      !contentType.includes("application/xhtml+xml")
    ) {
      return null;
    }

    const html = await response.text();

    const title = extractTitle(html);
    const text = normalizeWhitespace(stripHtml(html));
    const links = extractLinks(html);
    const structuredDates = extractStructuredDates(html);

    if (!text) return null;

    return {
      url,
      title,
      text,
      links,
      structuredDates,
    };
  } catch (error) {
    console.warn(
      `[Milo website reader] Failed to fetch ${url}:`,
      error instanceof Error ? error.message : String(error)
    );

    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchPagesInBatches(
  urls: string[],
  batchSize = 6
): Promise<WebsitePage[]> {
  const pages: WebsitePage[] = [];

  for (let index = 0; index < urls.length; index += batchSize) {
    const batch = urls.slice(index, index + batchSize);

    const results = await Promise.all(
      batch.map((url) => fetchPage(url))
    );

    for (const page of results) {
      if (page) {
        pages.push(page);
      }
    }
  }

  return pages;
}

/* ============================================================
   DATE VALIDATION
============================================================ */

function getTodayInIndia(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function isValidISODate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00Z`);

  return (
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
  );
}

/**
 * Extract dates that explicitly include a year.
 *
 * Yearless dates are intentionally ignored because assigning the
 * current year automatically can make a completed workshop appear
 * to be upcoming.
 */
function extractDatesFromText(text: string): string[] {
  const normalized = text.replace(/[–—‑]/g, "-");

  const dates = new Set<string>();

  const monthMap: Record<string, string> = {
    january: "01",
    jan: "01",
    february: "02",
    feb: "02",
    march: "03",
    mar: "03",
    april: "04",
    apr: "04",
    may: "05",
    june: "06",
    jun: "06",
    july: "07",
    jul: "07",
    august: "08",
    aug: "08",
    september: "09",
    sep: "09",
    sept: "09",
    october: "10",
    oct: "10",
    november: "11",
    nov: "11",
    december: "12",
    dec: "12",
  };

  const monthPattern =
    /\b(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec)\s+(\d{1,2})(?:st|nd|rd|th)?[,]?\s+(20\d{2})\b/gi;

  let match: RegExpExecArray | null;

  while ((match = monthPattern.exec(normalized)) !== null) {
    const month = monthMap[match[1].toLowerCase()];
    const day = match[2].padStart(2, "0");
    const year = match[3];

    const value = `${year}-${month}-${day}`;

    if (isValidISODate(value)) {
      dates.add(value);
    }
  }

  const isoPattern =
    /\b(20\d{2})-(\d{1,2})-(\d{1,2})\b/g;

  while ((match = isoPattern.exec(normalized)) !== null) {
    const value =
      `${match[1]}-${match[2].padStart(2, "0")}-${match[3].padStart(2, "0")}`;

    if (isValidISODate(value)) {
      dates.add(value);
    }
  }

  const dayFirstPattern =
    /\b(\d{1,2})[/-](\d{1,2})[/-](20\d{2})\b/g;

  while ((match = dayFirstPattern.exec(normalized)) !== null) {
    const value =
      `${match[3]}-${match[2].padStart(2, "0")}-${match[1].padStart(2, "0")}`;

    if (isValidISODate(value)) {
      dates.add(value);
    }
  }

  return Array.from(dates).sort();
}

/**
 * Extract dates from event-specific date fields rather than scanning
 * every date on a page. This helps avoid using unrelated dates,
 * publication dates, or general website dates as event dates.
 */
function extractEventDates(page: WebsitePage): string[] {
  const dates = new Set<string>(page.structuredDates);

  const lines = page.text
    .split(/\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const dateLabel =
    /\b(date(?:s)?(?:\s*(?:&|and)\s*time)?|event date|when|starts on|start date|event schedule)\b/i;

  for (let index = 0; index < lines.length; index++) {
    if (!dateLabel.test(lines[index])) {
      continue;
    }

    const context = [
      lines[index],
      lines[index + 1] || "",
      lines[index + 2] || "",
    ].join(" ");

    for (const date of extractDatesFromText(context)) {
      dates.add(date);
    }
  }

  const flattened = page.text.replace(/\s+/g, " ");

  const labelPattern =
    /\b(?:date(?:s)?(?:\s*(?:&|and)\s*time)?|event date|starts on|start date)\b/gi;

  let labelMatch: RegExpExecArray | null;

  while ((labelMatch = labelPattern.exec(flattened)) !== null) {
    const start = labelMatch.index;
    const context = flattened.slice(start, start + 180);

    for (const date of extractDatesFromText(context)) {
      dates.add(date);
    }
  }

  return Array.from(dates).sort();
}

/* ============================================================
   EVENT STATUS CLASSIFICATION
============================================================ */

function getEventStatus(
  page: WebsitePage,
  dates: string[]
): {
  status: EventRecord["status"];
  reason: string;
} {
  const text = page.text.toLowerCase();
  const today = getTodayInIndia();

  const explicitlyPast =
    /\b(expired|completed|past event|past experience|event has ended|event concluded|registration closed|registrations closed|workshop has ended|session has ended)\b/i.test(
      text
    );

  if (explicitlyPast) {
    return {
      status: "past",
      reason:
        "The event page explicitly indicates that the event has ended or registration is closed.",
    };
  }

  if (dates.length === 0) {
    return {
      status: "unknown",
      reason:
        "No reliable event-specific date with an explicit year was found.",
    };
  }

  const futureDates = dates.filter(
    (date) => date >= today
  );

  if (futureDates.length > 0) {
    return {
      status: "upcoming",
      reason:
        `An event-specific date on or after today (${today}) was found.`,
    };
  }

  return {
    status: "past",
    reason:
      `All extracted event-specific dates are before today (${today}).`,
  };
}

/* ============================================================
   EVENT DETAIL EXTRACTION
============================================================ */

function extractLocation(text: string): string {
  const patterns = [
    /\bLocation\s*[:\-]?\s*([\s\S]{0,180}?)(?:Date\s*&?\s*Time|Reserve Your Spot|Register|Facilitators?:|$)/i,

    /\bVenue\s*[:\-]?\s*([\s\S]{0,180}?)(?:Date\s*&?\s*Time|Reserve Your Spot|Register|Facilitators?:|$)/i,

    /\bWhere it is\s*[:\-]?\s*([\s\S]{0,180}?)(?:Date\s*&?\s*Time|Reserve Your Spot|Register|Facilitators?:|$)/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);

    if (match?.[1]) {
      return normalizeWhitespace(match[1]).slice(0, 180);
    }
  }

  return "";
}

function extractRegistrationLinks(
  page: WebsitePage
): string[] {
  const registrationWords =
    /\b(register|registration|reserve|book|tickets?|sign up|enrol|enroll|rsvp|join now)\b/i;

  return Array.from(
    new Set(
      page.links
        .filter((link) => registrationWords.test(link.label))
        .map((link) => link.url)
    )
  ).slice(0, 20);
}

function createEventRecord(
  page: WebsitePage
): EventRecord {
  const dates = extractEventDates(page);

  const statusResult = getEventStatus(
    page,
    dates
  );

  return {
    title: page.title || "Untitled Zuva Life experience",
    url: page.url,
    status: statusResult.status,
    dates,
    location: extractLocation(page.text),
    registrationLinks: extractRegistrationLinks(page),
    reason: statusResult.reason,
    description: page.text.slice(0, 1800),
  };
}

/* ============================================================
   CRAWLER DISCOVERY
============================================================ */

async function crawlZuvaWebsite(
  query: string
): Promise<CrawlResult> {
  console.log(
    "[Milo website reader] Starting fresh website discovery."
  );

  const seedUrls = [
    `${ZUVA_BASE_URL}/`,
    `${ZUVA_BASE_URL}/our-experiences`,
    `${ZUVA_BASE_URL}/spark-experiences`,
    `${ZUVA_BASE_URL}/zest-circle`,
  ];

  const homepage = await fetchPage(
    `${ZUVA_BASE_URL}/`
  );

  const experiencesPage = await fetchPage(
    `${ZUVA_BASE_URL}/our-experiences`
  );

  const discoveredUrls = new Set<string>(seedUrls);

  for (const page of [homepage, experiencesPage]) {
    if (!page) continue;

    for (const link of page.links) {
      const internalUrl = normalizeInternalUrl(link.url);

      if (internalUrl) {
        discoveredUrls.add(internalUrl);
      }
    }
  }

  const firstLevelUrls = sortUrlsByRelevance(
    Array.from(discoveredUrls).filter(
      (url) =>
        url !== `${ZUVA_BASE_URL}/` &&
        url !== `${ZUVA_BASE_URL}/our-experiences`
    ),
    query
  ).slice(0, MAX_CRAWL_PAGES);

  const firstLevelPages = await fetchPagesInBatches(
    firstLevelUrls,
    6
  );

  const firstPassPages = [
    ...(homepage ? [homepage] : []),
    ...(experiencesPage ? [experiencesPage] : []),
    ...firstLevelPages,
  ];

  const existingUrls = new Set(
    firstPassPages.map((page) => page.url)
  );

  const secondLevelUrls = new Set<string>();

  for (const page of firstPassPages) {
    for (const link of page.links) {
      const internalUrl = normalizeInternalUrl(link.url);

      if (
        internalUrl &&
        !existingUrls.has(internalUrl)
      ) {
        secondLevelUrls.add(internalUrl);
      }
    }
  }

  const remainingUrls = sortUrlsByRelevance(
    Array.from(secondLevelUrls),
    query
  ).slice(
    0,
    Math.max(0, MAX_CRAWL_PAGES - firstPassPages.length)
  );

  const secondPassPages = await fetchPagesInBatches(
    remainingUrls,
    6
  );

  const allPages = [
    ...firstPassPages,
    ...secondPassPages,
  ];

  const uniquePages = Array.from(
    new Map(
      allPages.map((page) => [page.url, page])
    ).values()
  );

  console.log(
    `[Milo website reader] Pages fetched: ${uniquePages.length}`
  );

  /* ============================================================
     EVENT DISCOVERY AND VALIDATION
  ============================================================ */

  const eventPages = uniquePages.filter(
    isLikelyEventPage
  );

  const records = eventPages.map(createEventRecord);

  const upcomingRecords = records.filter(
    (record) => record.status === "upcoming"
  );

  const unknownRecords = records.filter(
    (record) => record.status === "unknown"
  );

  const pastRecords = records.filter(
    (record) => record.status === "past"
  );

  console.log(
    `[Milo website reader] Event results — candidates: ${records.length}, upcoming: ${upcomingRecords.length}, unknown: ${unknownRecords.length}, past: ${pastRecords.length}`
  );

  for (const record of records) {
    console.log(
      `[Milo website reader] Event: "${record.title}" | ${record.status} | Dates: ${record.dates.join(", ") || "None"} | URL: ${record.url}`
    );
  }

  /* ============================================================
     GENERAL WEBSITE CONTEXT
  ============================================================ */

  const relevantPages = uniquePages
    .filter((page) => {
      const combined =
        `${page.url} ${page.title} ${page.text}`.toLowerCase();

      return (
        combined.includes("zuva") ||
        combined.includes("experience") ||
        combined.includes("workshop") ||
        combined.includes("program") ||
        combined.includes("pathway")
      );
    })
    .slice(0, 12);

  const generalContext = [
    "LIVE ZUVA LIFE WEBSITE INFORMATION",

    ...relevantPages.map((page) =>
      [
        `SOURCE URL: ${page.url}`,
        `PAGE TITLE: ${page.title || "Zuva Life website page"}`,
        page.text.slice(0, 12000),
      ].join("\n")
    ),
  ]
    .join("\n\n------------------------------\n\n")
    .slice(0, 65000);

  /* ============================================================
     EVENT CONTEXT
  ============================================================ */

  const eventContext = [
    "LIVE ZUVA LIFE EVENT RESULTS",
    `TODAY IN INDIA: ${getTodayInIndia()}`,
    `PAGES FETCHED: ${uniquePages.length}`,
    `EVENT CANDIDATES: ${records.length}`,

    "",
    "STRICT EVENT VALIDATION RULES:",
    "- Only events with verified event-specific future dates can be presented as upcoming.",
    "- Past dates must never be presented as upcoming.",
    "- Registration buttons do not prove that an event is upcoming.",
    "- Unknown-status events must not be presented as confirmed upcoming events.",
    "- Never invent event dates, prices, venues or registration links.",
    "- Preserve exact event page URLs and registration URLs.",

    "",
    "VERIFIED UPCOMING EVENTS:",

    ...(upcomingRecords.length
      ? upcomingRecords.map((record) =>
          [
            `TITLE: ${record.title}`,
            `EVENT PAGE URL: ${record.url}`,
            `DATES: ${record.dates.join(", ")}`,
            `LOCATION: ${record.location || "Not specified"}`,
            `REGISTRATION LINKS: ${record.registrationLinks.join(", ") || "Not found"}`,
            `STATUS REASON: ${record.reason}`,
            `PAGE DETAILS: ${record.description}`,
          ].join("\n")
        )
      : [
          "No events could be verified as upcoming from the fetched event pages.",
        ]),

    "",
    "EVENTS WITH UNKNOWN STATUS — DO NOT PRESENT AS UPCOMING:",

    ...(unknownRecords.length
      ? unknownRecords.map((record) =>
          [
            `TITLE: ${record.title}`,
            `EVENT PAGE URL: ${record.url}`,
            `DATES: ${record.dates.join(", ") || "No reliable date extracted"}`,
            `REGISTRATION LINKS: ${record.registrationLinks.join(", ") || "Not found"}`,
            `REASON: ${record.reason}`,
          ].join("\n")
        )
      : ["None."]),

    "",
    "PAST EVENTS — DO NOT PRESENT AS UPCOMING:",

    ...(pastRecords.length
      ? pastRecords.map(
          (record) =>
            `${record.title} | ${record.url} | ${record.dates.join(", ") || "No date"}`
        )
      : ["None identified."]),
  ].join("\n\n");

  return {
    content: eventContext.slice(0, 65000),
    events: records,
  };
}

/* ============================================================
   CACHE AND DATA RETRIEVAL
============================================================ */

async function getWebsiteData(
  query: string
): Promise<WebsiteCache> {
  const normalizedQuery = query.trim().toLowerCase();

  if (
    websiteCache &&
    websiteCache.query === normalizedQuery &&
    Date.now() - websiteCache.fetchedAt < CACHE_TTL_MS
  ) {
    console.log(
      "[Milo website reader] Using cached website context."
    );

    return websiteCache;
  }

  const result = await crawlZuvaWebsite(query);

  websiteCache = {
    query: normalizedQuery,
    content: result.content,
    events: result.events,
    fetchedAt: Date.now(),
  };

  return websiteCache;
}

/* ============================================================
   PUBLIC EVENT RETRIEVAL
============================================================ */

/**
 * Returns only events classified as upcoming.
 *
 * This function is intended for current-event questions in the
 * chat API. The stable knowledge base must not override its result.
 */
export async function getUpcomingZuvaEvents(
  query: string
): Promise<EventRecord[]> {
  if (!isCurrentEventQuery(query)) {
    return [];
  }

  console.log(
    `[Milo website reader] Retrieving verified upcoming events for: "${query}"`
  );

  const data = await getWebsiteData(query);

  return data.events
    .filter(
      (event) => event.status === "upcoming"
    )
    .map((event) => ({ ...event }));
}

/* ============================================================
   PUBLIC LIVE WEBSITE READER
============================================================ */

export async function readLiveZuvaWebsite(
  query: string
): Promise<string> {
  if (!shouldUseLiveWebsite(query)) {
    return "";
  }

  try {
    const data = await getWebsiteData(query);

    if (!data.content) {
      console.warn(
        "[Milo website reader] No useful website context was retrieved."
      );

      return "";
    }

    console.log(
      "[Milo website reader] Website context successfully built."
    );

    return data.content;
  } catch (error) {
    console.error(
      "[Milo website reader] Website crawl failed:",
      error instanceof Error ? error.message : String(error)
    );

    return "";
  }
}


