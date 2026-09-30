"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "Generating your insight",
  "Connecting the relevant dots",
  "Curating the details for you",
  "Shaping a thoughtful response",
  "Almost there — putting it all together",
];

export default function TypingIndicator() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setMessageIndex(1), 5000),
      setTimeout(() => setMessageIndex(2), 10000),
      setTimeout(() => setMessageIndex(3), 15000),
      setTimeout(() => setMessageIndex(4), 20000),
    ];

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="flex justify-start mb-4">
      <div className="rounded-2xl border border-[#ECE7E1] bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#4A1C5C]">
            {MESSAGES[messageIndex]}
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