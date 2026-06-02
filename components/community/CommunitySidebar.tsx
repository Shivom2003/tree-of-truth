"use client";

// components/community/CommunitySidebar.tsx
// Left sidebar for community navigation in the Seeker Circle.

import { SEED_COMMUNITIES } from "@/lib/data/communities";
import { useAuth } from "@/lib/auth/AuthContext";
import { Layers, Sparkles } from "lucide-react";

interface CommunitySidebarProps {
  activeId: string | null; // null = "All"
  onSelect: (id: string | null) => void;
}

export default function CommunitySidebar({ activeId, onSelect }: CommunitySidebarProps) {
  const { user } = useAuth();

  return (
    <aside
      className="hidden lg:flex flex-col gap-1 w-64 shrink-0 sticky top-24 self-start max-h-[calc(100vh-6rem)] overflow-y-auto pr-1"
      style={{ scrollbarWidth: "none" }}
    >
      {/* Header */}
      <p className="text-[9px] font-mono uppercase tracking-widest text-gold-matte/30 px-3 mb-2">
        Communities
      </p>

      {/* All Discussions */}
      <button
        onClick={() => onSelect(null)}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 group w-full"
        style={{
          background: activeId === null ? "rgba(212,175,55,0.1)" : "transparent",
          border:     activeId === null ? "1px solid rgba(212,175,55,0.2)" : "1px solid transparent",
        }}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: "rgba(212,175,55,0.12)" }}
        >
          <Layers className="w-3.5 h-3.5 text-gold-matte/70" />
        </div>
        <span
          className="text-[11px] font-mono transition-colors"
          style={{ color: activeId === null ? "#d4af37" : "rgba(212,175,55,0.5)" }}
        >
          All Discussions
        </span>
      </button>

      {/* Divider */}
      <div className="h-px mx-3 my-1" style={{ background: "rgba(212,175,55,0.06)" }} />

      {/* Community list */}
      {SEED_COMMUNITIES.map((c) => {
        const isActive = activeId === c.id;
        return (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 w-full"
            style={{
              background: isActive ? `${c.accentColor}12` : "transparent",
              border:     isActive ? `1px solid ${c.accentColor}30` : "1px solid transparent",
            }}
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0"
              style={{ background: `${c.accentColor}15` }}
            >
              {c.icon}
            </div>
            <span
              className="text-[11px] font-mono leading-tight transition-colors line-clamp-2"
              style={{ color: isActive ? c.accentColor : "rgba(212,175,55,0.45)" }}
            >
              {c.name}
            </span>
          </button>
        );
      })}

      {/* Divider */}
      {user && (
        <>
          <div className="h-px mx-3 my-1" style={{ background: "rgba(212,175,55,0.06)" }} />
          <p className="text-[9px] font-mono uppercase tracking-widest text-gold-matte/30 px-3 mt-1 mb-1">
            Quick Actions
          </p>
          <div
            className="mx-2 px-3 py-2.5 rounded-xl text-[10px] text-gold-matte/40 font-mono leading-relaxed"
            style={{ background: "rgba(212,175,55,0.03)", border: "1px solid rgba(212,175,55,0.06)" }}
          >
            <Sparkles className="w-3 h-3 mb-1 opacity-40" />
            Tip: Questions posted to multiple communities reach more seekers.
          </div>
        </>
      )}
    </aside>
  );
}
