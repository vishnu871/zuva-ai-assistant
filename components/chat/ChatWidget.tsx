"use client";

import { useEffect, useState } from "react";

import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEmbedded, setIsEmbedded] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("embed") === "true") {
      setIsEmbedded(true);
      setIsOpen(true);
    }
  }, []);

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

      {!isOpen && !isEmbedded && (
        <ChatButton
          onClick={() => setIsOpen(true)}
        />
      )}
    </>
  );
}