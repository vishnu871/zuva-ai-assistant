"use client";

export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="rounded-2xl border border-[#ECE7E1] bg-white px-4 py-3 shadow-sm">
        <div className="flex gap-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-[#4A1C5C]" />
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-[#4A1C5C]"
            style={{ animationDelay: "0.15s" }}
          />
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-[#4A1C5C]"
            style={{ animationDelay: "0.3s" }}
          />
        </div>
      </div>
    </div>
  );
}