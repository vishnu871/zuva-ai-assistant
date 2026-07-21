"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface ChatButtonProps {
  onClick: () => void;
}

export default function ChatButton({ onClick }: ChatButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      aria-label="Open Zuva AI Assistant"
      className="
        fixed
        bottom-8
        right-8
        z-50
        flex
        h-16
        w-16
        items-center
        justify-center
        rounded-full
        bg-gradient-to-br
        from-[#4A1C5C]
        via-[#6B2D87]
        to-[#7D4BA8]
        text-white
        shadow-[0_20px_60px_rgba(74,28,92,0.45)]
      "
    >
      <MessageCircle size={28} strokeWidth={2.2} />
    </motion.button>
  );
}