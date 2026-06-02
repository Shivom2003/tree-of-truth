"use client";

// app/community/ask/page.tsx
// Question posting form — auth-gated, can post to multiple communities

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/navigation/Header";
import StarField from "@/components/ui/StarField";
import { useAuth } from "@/lib/auth/AuthContext";
import { triggerAuthModal } from "@/lib/auth/AuthContext";
import { SEED_COMMUNITIES } from "@/lib/data/communities";
import { ArrowLeft, Loader2, Send, X } from "lucide-react";

function AskQuestionForm() {
  const { user, loading: authLoading } = useAuth();
  const router       = useRouter();
  const searchParams = useSearchParams();
  const preselected  = searchParams.get("community");

  const [title, setTitle]             = useState("");
  const [body, setBody]               = useState("");
  const [selected, setSelected]       = useState<string[]>(preselected ? [preselected] : []);
  const [submitting, setSubmitting]   = useState(false);
  const [error, setError]             = useState("");
  const [charCount, setCharCount]     = useState(0);

  const MAX_BODY = 2000;

  // Redirect if not logged in once auth resolves
  useEffect(() => {
    if (!authLoading && !user) {
      triggerAuthModal("login");
    }
  }, [authLoading, user]);

  const toggleCommunity = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { triggerAuthModal("login"); return; }
    if (!title.trim()) { setError("Please enter a title for your question."); return; }
    if (selected.length === 0) { setError("Please select at least one community."); return; }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/community/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "question",
          title: title.trim(),
          body: body.trim(),
          communityIds: selected,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to post question");
      }

      const { id, communitySlug } = await res.json();
      router.push(`/community/${communitySlug}/q/${id}`);
    } catch (err: unknown) {
      setError((err as Error).message);
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#05060b" }}>
        <Loader2 className="w-6 h-6 animate-spin text-gold-matte/30" />
      </main>
    );
  }

  return (
    <main className="relative flex flex-col min-h-screen overflow-hidden text-gold-light" style={{ backgroundColor: "#05060b" }}>
      <StarField blur />
      <Header />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 pt-28 pb-20">

        {/* Back */}
        <Link
          href="/community"
          className="inline-flex items-center gap-1.5 text-gold-matte/40 hover:text-gold-matte/70 transition-colors text-[10px] font-mono uppercase tracking-widest mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Communities
        </Link>

        {/* Header */}
        <div className="mb-10">
          <span className="text-[10px] uppercase tracking-widest font-mono text-gold-matte/50 block mb-2">
            New Inquiry
          </span>
          <h1 className="font-serif text-3xl text-gold-bright mb-3">Ask a Question</h1>
          <p className="text-[12px] font-light text-gold-matte/55 leading-relaxed">
            Pose a genuine question to the community. The best questions are specific, curious, and
            open to exploration — not debates seeking a predetermined answer.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="text-[10px] font-mono uppercase tracking-widest text-gold-matte/50 block mb-2">
              Question Title <span className="text-red-400/60">*</span>
            </label>
            <input
              type="text"
              placeholder="What is the nature of consciousness?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={200}
              required
              className="w-full px-4 py-3.5 rounded-xl bg-transparent text-sm text-gold-light placeholder:text-gold-matte/20 outline-none transition-all"
              style={{
                border: "1px solid rgba(212,175,55,0.15)",
                fontFamily: "var(--font-sans)",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.15)"; }}
            />
            <p className="text-[9px] font-mono text-gold-matte/25 mt-1 text-right">{title.length}/200</p>
          </div>

          {/* Body */}
          <div>
            <label className="text-[10px] font-mono uppercase tracking-widest text-gold-matte/50 block mb-2">
              Question Detail <span className="text-gold-matte/30">(optional)</span>
            </label>
            <textarea
              placeholder="Provide context, background, or specific aspects you want explored..."
              value={body}
              onChange={(e) => {
                if (e.target.value.length <= MAX_BODY) {
                  setBody(e.target.value);
                  setCharCount(e.target.value.length);
                }
              }}
              rows={6}
              className="w-full px-4 py-3.5 rounded-xl bg-transparent text-sm text-gold-light placeholder:text-gold-matte/20 outline-none resize-none transition-all leading-relaxed"
              style={{
                border: "1px solid rgba(212,175,55,0.15)",
                fontFamily: "var(--font-sans)",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.15)"; }}
            />
            <p className="text-[9px] font-mono text-gold-matte/25 mt-1 text-right">{charCount}/{MAX_BODY}</p>
          </div>

          {/* Community selection */}
          <div>
            <label className="text-[10px] font-mono uppercase tracking-widest text-gold-matte/50 block mb-3">
              Post to Communities <span className="text-red-400/60">*</span>
            </label>
            <p className="text-[10px] text-gold-matte/35 mb-3">
              Select one or more communities where this question belongs.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SEED_COMMUNITIES.map((c) => {
                const isSelected = selected.includes(c.id);
                return (
                  <button
                    type="button"
                    key={c.id}
                    onClick={() => toggleCommunity(c.id)}
                    className="flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-150"
                    style={{
                      background: isSelected ? `${c.accentColor}12` : "rgba(255,255,255,0.02)",
                      border: `1px solid ${isSelected ? `${c.accentColor}35` : "rgba(212,175,55,0.08)"}`,
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0"
                      style={{ background: `${c.accentColor}18` }}
                    >
                      {c.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-[11px] font-mono truncate"
                        style={{ color: isSelected ? c.accentColor : "rgba(212,175,55,0.5)" }}
                      >
                        {c.name}
                      </p>
                    </div>
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

            {/* Selected tags */}
            {selected.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {selected.map((id) => {
                  const c = SEED_COMMUNITIES.find((x) => x.id === id);
                  if (!c) return null;
                  return (
                    <span
                      key={id}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono"
                      style={{
                        background: `${c.accentColor}15`,
                        border: `1px solid ${c.accentColor}25`,
                        color: c.accentColor,
                      }}
                    >
                      {c.icon} {c.name.split(" ")[0]}
                      <button
                        type="button"
                        onClick={() => toggleCommunity(id)}
                        className="ml-0.5 opacity-60 hover:opacity-100"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  );
                })}
              </div>
            )}
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

          {/* Guidelines */}
          <div
            className="rounded-xl p-4 text-[10px] text-gold-matte/45 leading-relaxed space-y-1"
            style={{ background: "rgba(212,175,55,0.03)", border: "1px solid rgba(212,175,55,0.08)" }}
          >
            <p className="font-mono text-gold-matte/60 mb-2 text-[9px] uppercase tracking-widest">Community Guidelines</p>
            <p>• Ask genuine questions open to exploration, not rhetorical arguments.</p>
            <p>• Be respectful — critique ideas, not people.</p>
            <p>• Avoid NSFW, harmful, or unlawful content.</p>
            <p>• Disclose if you are quoting or paraphrasing AI-generated content.</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting || !title.trim() || selected.length === 0}
            className="w-full py-3.5 rounded-xl font-mono text-[11px] tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-200"
            style={{
              background:
                !submitting && title.trim() && selected.length > 0
                  ? "rgba(212,175,55,0.15)"
                  : "rgba(212,175,55,0.05)",
              border: `1px solid ${!submitting && title.trim() && selected.length > 0
                ? "rgba(212,175,55,0.35)"
                : "rgba(212,175,55,0.1)"}`,
              color:
                !submitting && title.trim() && selected.length > 0
                  ? "#d4af37"
                  : "rgba(212,175,55,0.25)",
            }}
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {submitting ? "Posting..." : "Post to the Seeker Circle"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function AskQuestionPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#05060b" }}>
        <Loader2 className="w-6 h-6 animate-spin text-gold-matte/30" />
      </main>
    }>
      <AskQuestionForm />
    </Suspense>
  );
}
