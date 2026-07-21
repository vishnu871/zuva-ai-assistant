"use client";

interface Props {
  text: string;
  onClick: () => void;
}

export default function SuggestedPrompt({
  text,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="
        w-full
        rounded-2xl
        border
        border-[#E7E3DD]
        bg-white
        p-4
        text-left
        transition-all
        duration-200
        hover:-translate-y-1
        hover:border-[#4A1C5C]
        hover:shadow-lg
      "
    >
      {text}
    </button>
  );
}