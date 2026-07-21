"use client";

import { Sparkles, X } from "lucide-react";

interface ChatHeaderProps {
  onClose: () => void;
}

export default function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-[#ECE7E1] bg-white px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#4A1C5C] text-white shadow-md">
          <Sparkles size={20} />
        </div>

        <div>
          <h2 className="text-base font-semibold text-[#4A1C5C]">
            Zuva AI
          </h2>

          <p className="text-xs text-gray-500">
            Your AI Companion
          </p>
        </div>
      </div>

      <button
        onClick={onClose}
        className="rounded-full p-2 transition hover:bg-gray-100"
      >
        <X size={18} />
      </button>
    </header>
  );
}