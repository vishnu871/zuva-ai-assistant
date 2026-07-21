"use client";

import { useState } from "react";

import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      {!isOpen && (
        <ChatButton
          onClick={() => setIsOpen(true)}
        />
      )}
    </>
  );
}