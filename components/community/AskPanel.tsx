"use client";

// components/community/AskPanel.tsx
// Slide-in question panel — 75% width from right, blur backdrop on remaining 25%.
// Contains the full question posting form.

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { X, Send, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import { triggerAuthModal } from "@/lib/auth/AuthContext";
import { getIdToken } from "@/lib/auth/getIdToken";
import { SEED_COMMUNITIES } from "@/lib/data/communities";

interface AskPanelProps {
  open: boolean;
  onClose: () => void;
  defaultCommunityId?: string | null;
}

export default function AskPanel({ open, onClose, defaultCommunityId }: AskPanelProps) {
  const { user } = useAuth();
  const router   = useRouter();

  const [title, setTitle]         = useState("");
  const [body, setBody]           = useState("");
  const [selected, setSelected]   = useState<string[]>(defaultCommunityId ? [defaultCommunityId] : []);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]         = useState("");
  const panelRef                  = useRef<HTMLDivElement>(null);

  const MAX_BODY = 2000;

  // Reset when opened
  useEffect(() => {
    if (open) {
      setTitle("");
      setBody("");
      setSelected(defaultCommunityId ? [defaultCommunityId] : []);
      setError("");
    }
  }, [open, defaultCommunityId]);

  // Escape key to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const toggleCommunity = useCallback((id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { triggerAuthModal("login"); return; }
    if (!title.trim()) { setError("Please enter a title for your question."); return; }
    if (selected.length === 0) { setError("Please select at least one community."); return; }

    setSubmitting(true);
    setError("");

    try {
      const token = await getIdToken();
      const res = await fetch("/api/community/posts", {
        method:  "POST",
        headers: {
          "Content-Type":  "application/json",
          "Authorization": `Bearer ${token ?? ""}`,
        },
        body: JSON.stringify({
          type:         "question",
          title:        title.trim(),
          body:         body.trim(),
          communityIds: selected,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to post question");
      }

      const { id, communitySlug } = await res.json();
      onClose();
      router.push(`/community/${communitySlug}/q/${id}`);
    } catch (err: unknown) {
      setError((err as Error).message);
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 transition-all duration-350"
        style={{
          backdropFilter: open ? "blur(6px)" : "blur(0px)",
          background:     open ? "rgba(5,6,11,0.5)" : "transparent",
          pointerEvents:  open ? "auto" : "none",
          opacity:        open ? 1 : 0,
        }}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="fixed top-0 right-0 h-full z-50 flex flex-col"
        style={{
          width:     "min(75vw, 640px)",
          background: "rgba(8,10,20,0.97)",
          borderLeft: "1px solid rgba(212,175,55,0.12)",
          backdropFilter: "blur(20px)",
          transform:  open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 350ms cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow:  open ? "-20px 0 60px rgba(0,0,0,0.5)" : "none",
        }}
      >
        {/* Panel header */}
        <div
          className="flex items-center justify-between px-6 py-5 shrink-0"
          style={{ borderBottom: "1px solid rgba(212,175,55,0.08)" }}
        >
          <div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-gold-matte/40 block mb-0.5">
              New Inquiry
            </span>
            <h2 className="font-serif text-xl text-gold-bright">Ask a Question</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.1)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,175,55,0.12)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,175,55,0.06)"; }}
          >
            <X className="w-4 h-4 text-gold-matte/60" />
          </button>
        </div>

        {/* Scrollable form */}
        <div className="flex-1 overflow-y-auto px-6 py-6" style={{ scrollbarWidth: "none" }}>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="text-[9px] font-mono uppercase tracking-widest text-gold-matte/40 block mb-2">
                Question Title <span className="text-red-400/60">*</span>
              </label>
              <input
                type="text"
                placeholder="What is the nature of consciousness?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={200}
                className="w-full px-4 py-3 rounded-xl bg-transparent text-sm text-gold-light placeholder:text-gold-matte/20 outline-none transition-all"
                style={{ border: "1px solid rgba(212,175,55,0.12)", fontFamily: "var(--font-sans)" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.35)"; }}
                onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.12)"; }}
                autoFocus={open}
              />
              <p className="text-[9px] font-mono text-gold-matte/20 mt-1 text-right">{title.length}/200</p>
            </div>

            {/* Body */}
            <div>
              <label className="text-[9px] font-mono uppercase tracking-widest text-gold-matte/40 block mb-2">
                Context <span className="text-gold-matte/25">(optional)</span>
              </label>
              <textarea
                placeholder="Provide context, background, or specific aspects you want explored..."
                value={body}
                onChange={(e) => { if (e.target.value.length <= MAX_BODY) setBody(e.target.value); }}
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-transparent text-sm text-gold-light placeholder:text-gold-matte/20 outline-none resize-none transition-all leading-relaxed"
                style={{ border: "1px solid rgba(212,175,55,0.12)", fontFamily: "var(--font-sans)" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.35)"; }}
                onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.12)"; }}
              />
              <p className="text-[9px] font-mono text-gold-matte/20 mt-1 text-right">{body.length}/{MAX_BODY}</p>
            </div>

            {/* Community selection */}
            <div>
              <label className="text-[9px] font-mono uppercase tracking-widest text-gold-matte/40 block mb-2">
                Post to Communities <span className="text-red-400/60">*</span>
              </label>
              <div className="grid grid-cols-1 gap-1.5">
                {SEED_COMMUNITIES.map((c) => {
                  const isSelected = selected.includes(c.id);
                  return (
                    <button
                      type="button"
                      key={c.id}
                      onClick={() => toggleCommunity(c.id)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150"
                      style={{
                        background: isSelected ? `${c.accentColor}10` : "rgba(255,255,255,0.015)",
                        border:     `1px solid ${isSelected ? `${c.accentColor}30` : "rgba(212,175,55,0.06)"}`,
                      }}
                    >
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0"
                        style={{ background: `${c.accentColor}15` }}
                      >
                        {c.icon}
                      </div>
                      <span
                        className="text-[11px] font-mono flex-1 text-left"
                        style={{ color: isSelected ? c.accentColor : "rgba(212,175,55,0.4)" }}
                      >
                        {c.name}
                      </span>
                      {isSelected && (
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: c.accentColor }}
                        >
                          <span className="text-[8px] text-black font-bold">✓</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Guidelines */}
            <div
              className="rounded-xl p-3.5 text-[10px] text-gold-matte/40 leading-relaxed space-y-1"
              style={{ background: "rgba(212,175,55,0.02)", border: "1px solid rgba(212,175,55,0.06)" }}
            >
              <p>• Ask genuine questions open to exploration.</p>
              <p>• Critique ideas, not people.</p>
              <p>• Disclose AI-generated content.</p>
            </div>

            {/* Error */}
            {error && (
              <div
                className="px-4 py-3 rounded-xl text-[11px] text-red-400/80"
                style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting || !title.trim() || selected.length === 0}
              className="w-full py-3 rounded-xl font-mono text-[11px] tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-200"
              style={{
                background: !submitting && title.trim() && selected.length > 0
                  ? "rgba(212,175,55,0.14)" : "rgba(212,175,55,0.04)",
                border: `1px solid ${!submitting && title.trim() && selected.length > 0
                  ? "rgba(212,175,55,0.35)" : "rgba(212,175,55,0.08)"}`,
                color: !submitting && title.trim() && selected.length > 0
                  ? "#d4af37" : "rgba(212,175,55,0.2)",
              }}
            >
              {submitting
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Posting...</>
                : <><Send className="w-4 h-4" /> Post to the Seeker Circle</>
              }
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
