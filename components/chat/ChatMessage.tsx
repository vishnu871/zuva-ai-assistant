"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: string;
  sender: "user" | "assistant";
}

export default function ChatMessage({
  message,
  sender,
}: ChatMessageProps) {
  const isUser = sender === "user";

  return (
    <div
      className={`mb-6 flex items-start gap-3 ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar */}
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          isUser
            ? "bg-[#4A1C5C] text-white"
            : "bg-[#EFE7F4] text-[#4A1C5C]"
        }`}
      >
        {isUser ? <User size={18} /> : <Bot size={18} />}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[78%] rounded-3xl px-5 py-4 shadow-sm ${
          isUser
            ? "bg-[#4A1C5C] text-white"
            : "border border-[#ECE7E1] bg-white text-gray-800"
        }`}
      >
        <div
          className={`prose prose-sm max-w-none ${
            isUser ? "prose-invert" : ""
          }`}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="mb-3 text-xl font-bold">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="mb-2 text-lg font-semibold">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="mb-2 text-base font-semibold">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="mb-3 leading-7 last:mb-0">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="mb-3 list-disc space-y-1 pl-5">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-3 list-decimal space-y-1 pl-5">
                  {children}
                </ol>
              ),
              li: ({ children }) => <li>{children}</li>,
              strong: ({ children }) => (
                <strong className="font-semibold">
                  {children}
                </strong>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`underline ${
                    isUser
                      ? "text-white"
                      : "text-[#4A1C5C]"
                  }`}
                >
                  {children}
                </a>
              ),
              code: ({ children }) => (
                <code
                  className={`rounded px-1.5 py-0.5 text-sm ${
                    isUser
                      ? "bg-white/20"
                      : "bg-gray-100"
                  }`}
                >
                  {children}
                </code>
              ),
            }}
          >
            {message}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}