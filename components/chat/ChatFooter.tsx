"use client";

import { ArrowUp } from "lucide-react";

export default function ChatFooter() {
  return (
    <footer className="border-t border-neutral-200 p-4">
      <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3">
        <input
          placeholder="Ask anything..."
          className="flex-1 outline-none"
        />

        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4A1C5C] text-white">
          <ArrowUp size={18} />
        </button>
      </div>
    </footer>
  );
}