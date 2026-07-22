"use client";

import { useMemo, useState } from "react";

import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";

export default function ChatWidget() {
  const isEmbedded = useMemo(() => {
    if (typeof window === "undefined") return false;

    return new URLSearchParams(window.location.search).get("embed") === "true";
  }, []);

  const [isOpen, setIsOpen] = useState(isEmbedded);

  return (
    <>
      <ChatWindow
        isOpen={isOpen}
        onClose={() => {
          if (!isEmbedded) {
            setIsOpen(false);
          }
        }}
      />

      {!isEmbedded && !isOpen && (
        <ChatButton onClick={() => setIsOpen(true)} />
      )}
    </>
  );
}