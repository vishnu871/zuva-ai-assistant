"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const isEmbedded = searchParams.get("embed") === "true";

    if (isEmbedded) {
      setIsOpen(true);
    }
  }, [searchParams]);

  const isEmbedded = searchParams.get("embed") === "true";

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