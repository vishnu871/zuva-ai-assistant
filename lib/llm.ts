// import { ai } from "@/lib/gemini";
// import { ThinkingLevel } from "@google/genai";

// const GEMINI_MODEL =
//   process.env.GEMINI_MODEL ??
//   "gemini-3.5-flash-lite";

// function sleep(ms: number): Promise<void> {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }

// function getErrorStatus(error: unknown): number | null {
//   if (!error || typeof error !== "object") {
//     return null;
//   }

//   const possibleError = error as {
//     status?: unknown;
//     statusCode?: unknown;
//     code?: unknown;
//     error?: {
//       code?: unknown;
//       status?: unknown;
//     };
//   };

//   const status =
//     possibleError.status ??
//     possibleError.statusCode ??
//     possibleError.error?.code ??
//     possibleError.error?.status;

//   if (typeof status === "number") {
//     return status;
//   }

//   if (typeof status === "string") {
//     const parsed = Number(status);

//     if (!Number.isNaN(parsed)) {
//       return parsed;
//     }
//   }

//   return null;
// }

// function getErrorMessage(error: unknown): string {
//   if (error instanceof Error) {
//     return error.message;
//   }

//   if (typeof error === "string") {
//     return error;
//   }

//   try {
//     return JSON.stringify(error);
//   } catch {
//     return String(error);
//   }
// }

// function isRetryableError(error: unknown): boolean {
//   const status = getErrorStatus(error);
//   const message = getErrorMessage(error).toLowerCase();

//   /*
//    * Do NOT retry:
//    * 400 - bad request
//    * 401 - invalid API key
//    * 403 - permission
//    * 404 - model not found
//    * 402 - billing
//    *
//    * Retry only temporary failures.
//    */
//   if (
//     status === 408 ||
//     status === 429 ||
//     status === 500 ||
//     status === 502 ||
//     status === 503 ||
//     status === 504
//   ) {
//     return true;
//   }

//   const transientPatterns = [
//     "fetch failed",
//     "connect timeout",
//     "connecttimedout",
//     "und_err_connect_timeout",
//     "etimedout",
//     "econnreset",
//     "econnrefused",
//     "socket hang up",
//     "network timeout",
//     "network error",
//     "timed out",
//     "timeout",
//   ];

//   return transientPatterns.some((pattern) =>
//     message.includes(pattern)
//   );
// }

// async function generateWithGemini(
//   prompt: string
// ): Promise<string> {
//   const maxAttempts = 3;

//   for (
//     let attempt = 1;
//     attempt <= maxAttempts;
//     attempt++
//   ) {
//     try {
//       console.log(
//         `[Milo Gemini] Attempt ${attempt}/${maxAttempts}`
//       );

//       console.log(
//         `[Milo Gemini] Model: ${GEMINI_MODEL}`
//       );

//       const response =
//         await ai.models.generateContent({
//           model: GEMINI_MODEL,
//           contents: prompt,
//           config: {
//             maxOutputTokens: 700,
//             thinkingConfig: {
//               thinkingLevel: ThinkingLevel.LOW,
//             },
//           },
//         });

//       const text =
//         response.text?.trim();

//       if (!text) {
//         throw new Error(
//           "Gemini returned an empty response."
//         );
//       }

//       console.log(
//         "[Milo Gemini] Response received successfully."
//       );

//       return text;
//     } catch (error) {
//       console.error(
//         `[Milo Gemini] Attempt ${attempt} failed.`
//       );
//       console.error(error);

//       if (
//         isRetryableError(error) &&
//         attempt < maxAttempts
//       ) {
//         const delay =
//           1000 * 2 ** (attempt - 1);

//         console.warn(
//           `[Milo Gemini] Temporary error. Retrying in ${delay}ms...`
//         );

//         await sleep(delay);
//         continue;
//       }

//       throw error;
//     }
//   }

//   throw new Error(
//     "Gemini request failed after multiple attempts."
//   );
// }

// export async function generateLLMResponse(
//   prompt: string
// ): Promise<string> {
//   console.log(
//     `[Milo LLM] Active provider: Gemini`
//   );

//   return generateWithGemini(prompt);
// }





import { ai } from "@/lib/gemini";
import { ThinkingLevel } from "@google/genai";

const GEMINI_MODEL =
  process.env.GEMINI_MODEL ?? "gemini-3.5-flash-lite";

const MAX_ATTEMPTS = 3;
const ATTEMPT_TIMEOUT_MS = 15_000;
const MAX_OUTPUT_TOKENS = 1200;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getErrorStatus(error: unknown): number | null {
  if (!error || typeof error !== "object") return null;

  const e = error as {
    status?: unknown;
    statusCode?: unknown;
    code?: unknown;
    error?: { code?: unknown; status?: unknown };
  };

  const status =
    e.status ?? e.statusCode ?? e.error?.code ?? e.error?.status;

  if (typeof status === "number") return status;

  if (typeof status === "string") {
    const parsed = Number(status);
    if (!Number.isNaN(parsed)) return parsed;
  }

  return null;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;

  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}

function isRetryableError(error: unknown): boolean {
  const status = getErrorStatus(error);
  const message = getErrorMessage(error).toLowerCase();

  if ([408, 429, 500, 502, 503, 504].includes(status ?? -1)) {
    return true;
  }

  const patterns = [
    "fetch failed",
    "connect timeout",
    "connecttimedout",
    "und_err_connect_timeout",
    "etimedout",
    "econnreset",
    "econnrefused",
    "socket hang up",
    "network timeout",
    "network error",
    "timed out",
    "timeout",
    "aborted",
  ];

  return patterns.some((pattern) => message.includes(pattern));
}

async function generateWithTimeout(prompt: string) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  try {
    return await Promise.race([
      ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
        config: {
          maxOutputTokens: MAX_OUTPUT_TOKENS,
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.LOW,
          },
        },
      }),

      new Promise<never>((_, reject) => {
        timeoutId = setTimeout(() => {
          const error = new Error(
            `Gemini timed out after ${ATTEMPT_TIMEOUT_MS / 1000} seconds.`
          );
          error.name = "TimeoutError";
          reject(error);
        }, ATTEMPT_TIMEOUT_MS);
      }),
    ]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

async function generateWithGemini(prompt: string): Promise<string> {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      console.log(`[Milo Gemini] Attempt ${attempt}/${MAX_ATTEMPTS}`);
      console.log(`[Milo Gemini] Model: ${GEMINI_MODEL}`);
      console.log(`[Milo Gemini] Output limit: ${MAX_OUTPUT_TOKENS}`);

      const response = await generateWithTimeout(prompt);

      const candidate = response.candidates?.[0];
      const finishReason = candidate?.finishReason ?? "UNKNOWN";
      const text = response.text?.trim();

      console.log(`[Milo Gemini] Finish reason: ${finishReason}`);
      console.log(
        `[Milo Gemini] Output tokens: ${
          response.usageMetadata?.candidatesTokenCount ?? "unknown"
        }`
      );

      if (!text) {
        throw new Error(
          `Gemini returned an empty response. Finish reason: ${finishReason}`
        );
      }

      if (finishReason === "MAX_TOKENS") {
        console.warn(
          "[Milo Gemini] Response reached the output token limit."
        );
      }

      console.log("[Milo Gemini] Response received successfully.");

      return text;
    } catch (error) {
      console.error(
        `[Milo Gemini] Attempt ${attempt} failed:`,
        getErrorMessage(error)
      );

      if (!isRetryableError(error) || attempt === MAX_ATTEMPTS) {
        throw error;
      }

      const delay = 1000 * 2 ** (attempt - 1);

      console.warn(
        `[Milo Gemini] Retrying in ${delay / 1000} second(s)...`
      );

      await sleep(delay);
    }
  }

  throw new Error("Gemini request failed after multiple attempts.");
}

export async function generateLLMResponse(
  prompt: string
): Promise<string> {
  console.log("[Milo LLM] Active provider: Gemini");

  return generateWithGemini(prompt);
}

