"use client";

import { ArrowUp } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export default function ChatInput({
  value = "",
  onChange,
  onSend,
  disabled = false,
}: Props) {
  return (
    <div className="border-t border-[#ECE7E1] bg-white p-4">
      <div className="flex items-end gap-3">
        <textarea
          rows={1}
          value={value}
          disabled={disabled}
          placeholder="Ask anything about Zuva Life..."
          className="
            flex-1
            max-h-32
            min-h-[48px]
            resize-none
            overflow-y-auto
            rounded-2xl
            border
            border-[#E5E7EB]
            bg-white
            px-4
            py-3
            text-sm
            leading-6
            outline-none
            shadow-sm
            transition
            focus:border-[#4A1C5C]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
          onChange={(e) => {
            onChange(e.target.value);

            e.target.style.height = "48px";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          onInput={(e) => {
            const target = e.currentTarget;
            target.style.height = "48px";
            target.style.height = `${target.scrollHeight}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
        />

        <button
          type="button"
          onClick={onSend}
          disabled={disabled || value.trim() === ""}
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#4A1C5C]
            text-white
            shadow-lg
            transition-all
            hover:scale-105
            hover:bg-[#5A2671]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </div>
  );
}