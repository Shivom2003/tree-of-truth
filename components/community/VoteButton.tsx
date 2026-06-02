"use client";

// components/community/VoteButton.tsx

import { ChevronUp } from "lucide-react";

interface VoteButtonProps {
  count: number;
  hasVoted: boolean;
  onVote: () => void;
  size?: "sm" | "md";
}

export default function VoteButton({ count, hasVoted, onVote, size = "md" }: VoteButtonProps) {
  return (
    <button
      onClick={onVote}
      className="flex flex-col items-center gap-0.5 transition-all duration-150 rounded-lg px-2 py-1.5"
      style={{
        color: hasVoted ? "#d4af37" : "rgba(212,175,55,0.35)",
        background: hasVoted ? "rgba(212,175,55,0.08)" : "transparent",
        border: `1px solid ${hasVoted ? "rgba(212,175,55,0.25)" : "transparent"}`,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLButtonElement;
        if (!hasVoted) {
          el.style.color = "rgba(212,175,55,0.7)";
          el.style.background = "rgba(212,175,55,0.05)";
        }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLButtonElement;
        if (!hasVoted) {
          el.style.color = "rgba(212,175,55,0.35)";
          el.style.background = "transparent";
        }
      }}
    >
      <ChevronUp className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
      <span className={`font-mono font-semibold ${size === "sm" ? "text-[10px]" : "text-[11px]"}`}>{count}</span>
    </button>
  );
}
