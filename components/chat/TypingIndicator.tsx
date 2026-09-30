"use client";

interface TypingIndicatorProps {
  message: string;
}

export default function TypingIndicator({
  message,
}: TypingIndicatorProps) {
  return (
    <div className="flex justify-start mb-4">
      <div className="rounded-2xl border border-[#ECE7E1] bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#4A1C5C]">
            {message}
          </span>

          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#4A1C5C]" />

            <span
              className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#4A1C5C]"
              style={{ animationDelay: "0.15s" }}
            />

            <span
              className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#4A1C5C]"
              style={{ animationDelay: "0.3s" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}