"use client";

// components/community/FlagButton.tsx

import { useState } from "react";
import { Flag, X, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import { triggerAuthModal } from "@/lib/auth/AuthContext";
import { getIdToken } from "@/lib/auth/getIdToken";

const REASONS = [
  "Harmful or abusive content",
  "Misinformation or false claims",
  "Spam or promotional content",
  "NSFW or inappropriate",
  "Harassment or personal attack",
  "Off-topic for this community",
];

interface FlagButtonProps {
  targetType: "question" | "reply";
  targetId: string;
}

export default function FlagButton({ targetType, targetId }: FlagButtonProps) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleFlag = () => {
    if (!user) { triggerAuthModal("login"); return; }
    setOpen(true);
  };

  const submit = async () => {
    if (!selected) return;
    setSubmitting(true);
    try {
      const token = await getIdToken();
      await fetch("/api/community/flag", {
        method: "POST",
        headers: {
          "Content-Type":  "application/json",
          "Authorization": `Bearer ${token ?? ""}`,
        },
        body: JSON.stringify({ targetType, targetId, reason: selected }),
      });
      setDone(true);
    } finally {
      setSubmitting(false);
      setTimeout(() => { setOpen(false); setDone(false); setSelected(null); }, 1500);
    }
  };

  return (
    <>
      <button
        onClick={handleFlag}
        className="flex items-center gap-1 transition-colors text-gold-matte/25 hover:text-red-400/60"
        title="Flag this content"
      >
        <Flag className="w-3 h-3" />
        <span className="text-[9px] font-mono">flag</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(5,6,11,0.7)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div
            className="w-full max-w-xs rounded-2xl p-6"
            style={{
              background: "rgba(10,13,26,0.97)",
              border: "1px solid rgba(212,175,55,0.15)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-serif text-sm text-gold-bright flex items-center gap-2">
                <Flag className="w-3.5 h-3.5 text-red-400/70" />
                Report Content
              </h4>
              <button onClick={() => setOpen(false)} className="text-gold-matte/30 hover:text-gold-matte/60">
                <X className="w-4 h-4" />
              </button>
            </div>

            {done ? (
              <p className="text-[11px] text-gold-matte/70 text-center py-4">
                ✓ Report submitted. Thank you for keeping the Seeker Circle safe.
              </p>
            ) : (
              <>
                <p className="text-[10px] text-gold-matte/50 mb-3">Why are you flagging this?</p>
                <div className="space-y-1.5 mb-4">
                  {REASONS.map((reason) => (
                    <button
                      key={reason}
                      onClick={() => setSelected(reason)}
                      className="w-full text-left px-3 py-2 rounded-lg text-[11px] transition-all"
                      style={{
                        background: selected === reason ? "rgba(212,175,55,0.12)" : "rgba(255,255,255,0.02)",
                        border: `1px solid ${selected === reason ? "rgba(212,175,55,0.25)" : "rgba(212,175,55,0.06)"}`,
                        color: selected === reason ? "#d4af37" : "rgba(212,175,55,0.5)",
                      }}
                    >
                      {reason}
                    </button>
                  ))}
                </div>
                <button
                  onClick={submit}
                  disabled={!selected || submitting}
                  className="w-full py-2.5 rounded-xl text-[10px] font-mono tracking-widest uppercase flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: selected ? "rgba(239,68,68,0.12)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${selected ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.05)"}`,
                    color: selected ? "rgba(239,68,68,0.8)" : "rgba(212,175,55,0.25)",
                  }}
                >
                  {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Submit Report"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
