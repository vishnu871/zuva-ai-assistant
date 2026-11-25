// export interface ChatMessage {
//   role: "user" | "assistant";
//   content: string;
// }

// interface ChatRequest {
//   message: string;
//   history?: ChatMessage[];
// }

// interface ChatResponse {
//   message: string;
// }

// export async function sendMessage(
//   message: string,
//   history: ChatMessage[] = []
// ): Promise<ChatResponse> {
//   const response = await fetch("/api/chat", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       message,
//       history,
//     } satisfies ChatRequest),
//   });

//   if (!response.ok) {
//     let errorMessage = "Failed to send message.";

//     try {
//       const error = await response.json();
//       errorMessage = error.error ?? errorMessage;
//     } catch {
//       // Ignore JSON parsing errors
//     }

//     throw new Error(errorMessage);
//   }

//   return response.json();
// }



// export interface ChatMessage {
//   role: "user" | "assistant";
//   content: string;
// }

// interface ChatRequest {
//   message: string;
//   history?: ChatMessage[];
// }

// interface ChatResponse {
//   message: string;
// }

// const API_URL = (import.meta as ImportMeta & {
//   readonly env: { readonly DEV: boolean };
// }).env.DEV
//   ? "http://localhost:3000/api/chat"
//   : "https://zuva-ai-assistant.vercel.app/api/chat";

// export async function sendMessage(
//   message: string,
//   history: ChatMessage[] = []
// ): Promise<ChatResponse> {
//   const response = await fetch(API_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       message,
//       history,
//     } satisfies ChatRequest),
//   });

//   if (!response.ok) {
//     let errorMessage = "Failed to send message.";

//     try {
//       const error = await response.json();
//       errorMessage = error.error ?? errorMessage;
//     } catch {
//       // Ignore JSON parsing errors.
//     }

//     throw new Error(errorMessage);
//   }

//   return response.json();
// }


export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  message: string;
  history?: ChatMessage[];
}

interface ChatResponse {
  message: string;
}

const API_URL = "/api/chat";

export async function sendMessage(
  message: string,
  history: ChatMessage[] = []
): Promise<ChatResponse> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      history,
    } satisfies ChatRequest),
  });

  if (!response.ok) {
    let errorMessage = "Failed to send message.";

    try {
      const error = await response.json();
      errorMessage = error.error ?? errorMessage;
    } catch {
      // Ignore JSON parsing errors.
    }

    throw new Error(errorMessage);
  }

  return response.json();
}
