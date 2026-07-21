"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sendMessage } from "@/services/chat";

import ChatHeader from "./ChatHeader";
import ChatWelcome from "./ChatWelcome";
import SuggestedPrompt from "./SuggestedPrompt";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: number;
  sender: "user" | "assistant";
  text: string;
}

export default function ChatWindow({
  isOpen,
  onClose,
}: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const suggestions = [
    "🌿 Learn about our programs",
    "📅 Upcoming workshops",
    "✨ Which journey suits me?",
    "💜 Tell me about Zuva Life",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  async function handleSendMessage(text?: string) {
    const content = (text ?? input).trim();

    if (!content || typing) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTyping(true);

    try {
      const response = await sendMessage(content);

      const aiMessage: Message = {
        id: Date.now() + 1,
        sender: "assistant",
        text:
          response.message ??
          "Sorry, I couldn't generate a response.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);

      const aiMessage: Message = {
        id: Date.now() + 1,
        sender: "assistant",
        text:
          "⚠️ Something went wrong. Please try again.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setTyping(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 30,
            scale: 0.95,
          }}
          transition={{
            duration: 0.25,
          }}
          className="
            fixed
            bottom-5
            right-5
            z-50
            flex
            flex-col
            w-[calc(100vw-32px)]
            max-w-[460px]
            h-[85vh]
            max-h-[850px]
            min-h-[620px]
            overflow-hidden
            rounded-3xl
            border
            border-[#ECE7E1]
            bg-[#F8F6F2]
            shadow-[0_25px_80px_rgba(0,0,0,0.18)]
          "
        >
          <ChatHeader onClose={onClose} />

          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
            {messages.length === 0 ? (
              <>
                <ChatWelcome />

                <div className="mt-8 space-y-4">
                  {suggestions.map((item) => (
                    <SuggestedPrompt
                      key={item}
                      text={item}
                      onClick={() => handleSendMessage(item)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    sender={message.sender}
                    message={message.text}
                  />
                ))}

                {typing && <TypingIndicator />}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          <div className="shrink-0 border-t border-[#ECE7E1] bg-white">
            <ChatInput
              value={input}
              onChange={setInput}
              onSend={() => handleSendMessage()}
              disabled={typing}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}