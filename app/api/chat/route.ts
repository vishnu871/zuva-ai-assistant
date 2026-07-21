import { NextResponse } from "next/server";
import { ai } from "@/lib/gemini";
import { SYSTEM_PROMPT } from "@/lib/prompts";
import { searchKnowledge } from "@/lib/search";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const message: string = body.message;
    const history: ChatMessage[] = body.history ?? [];

    if (!message?.trim()) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const relevantKnowledge = searchKnowledge(message);

    const conversation = history
      .map(
        (msg) =>
          `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`
      )
      .join("\n");

    const prompt = `
${SYSTEM_PROMPT}

==============================
RELEVANT ZUVA KNOWLEDGE
==============================

${relevantKnowledge || "No relevant knowledge found."}

==============================
CONVERSATION
==============================

${conversation || "No previous conversation."}

==============================
USER QUESTION
==============================

${message}

Instructions:

- Use the Zuva knowledge above whenever possible.
- Do not invent information.
- If the answer is not available in the knowledge provided, clearly say:
  "I couldn't find that information in the current Zuva Life knowledge base."
- If appropriate, provide general wellbeing guidance, but clearly distinguish it from Zuva Life information.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.6,
        maxOutputTokens: 1024,
      },
    });

    return NextResponse.json({
      message:
        response.text?.trim() ??
        "I couldn't generate a response.",
    });
  } catch (error: unknown) {
    console.error("========== CHAT API ERROR ==========");
    console.error(error);
    console.error("===================================");

    const errorMessage =
      error instanceof Error ? error.message : String(error);

    return NextResponse.json(
      {
        error: errorMessage,
      },
      {
        status: 500,
      }
    );
  }
}