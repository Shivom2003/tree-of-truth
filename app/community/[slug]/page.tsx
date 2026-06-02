"use client";

// app/community/[slug]/page.tsx
// Community feed — lists questions with real-time Firestore listener

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { collection, query, where, orderBy, onSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { SEED_COMMUNITIES } from "@/lib/data/communities";
import Header from "@/components/navigation/Header";
import StarField from "@/components/ui/StarField";
import QuestionCard, { type Question } from "@/components/community/QuestionCard";
import { useAuth } from "@/lib/auth/AuthContext";
import { triggerAuthModal } from "@/lib/auth/AuthContext";
import { PlusCircle, Users, ArrowLeft, Loader2 } from "lucide-react";

type SortKey = "newest" | "top";

export default function CommunityFeedPage() {
  const { slug }      = useParams<{ slug: string }>();
  const { user }      = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading]     = useState(true);
  const [sort, setSort]           = useState<SortKey>("newest");
  const [memberCount, setMemberCount] = useState<number>(0);

  const community = SEED_COMMUNITIES.find((c) => c.slug === slug);

  // Real-time questions listener
  useEffect(() => {
    if (!community) return;

    const q = query(
      collection(db, "questions"),
      where("communityIds", "array-contains", community.id),
      where("status", "==", "open"),
      orderBy(sort === "newest" ? "createdAt" : "upvotes", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const docs = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        createdAt: d.data().createdAt?.toDate?.() ?? new Date(),
      })) as Question[];
      setQuestions(docs);
      setLoading(false);
    });
    return unsub;
  }, [community, sort]);

  // Fetch member count from community doc
  useEffect(() => {
    if (!community) return;
    getDoc(doc(db, "communities", community.id)).then((snap) => {
      if (snap.exists()) setMemberCount(snap.data().memberCount ?? 0);
    });
  }, [community]);

  if (!community) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#05060b" }}>
        <p className="text-gold-matte/50 font-mono text-sm">Community not found.</p>
      </main>
    );
  }

  return (
    <main className="relative flex flex-col min-h-screen overflow-hidden text-gold-light" style={{ backgroundColor: "#05060b" }}>
      <StarField blur />
      <Header />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-28 pb-20">

        {/* Back link */}
        <Link
          href="/community"
          className="inline-flex items-center gap-1.5 text-gold-matte/65 hover:text-gold-matte/80 transition-colors text-[10px] font-mono uppercase tracking-widest mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          All Communities
        </Link>

        {/* Community header */}
        <div
          className="rounded-2xl p-6 mb-8"
          style={{
            background: "rgba(10,13,26,0.7)",
            border: `1px solid ${community.accentColor}25`,
            backdropFilter: "blur(12px)",
            boxShadow: `0 0 60px ${community.accentColor}08`,
          }}
        >
          {/* Top accent line */}
          <div
            className="h-0.5 w-full mb-6 -mt-6 -mx-0 rounded-t-2xl"
            style={{ background: `linear-gradient(90deg, transparent, ${community.accentColor}60, transparent)` }}
          />

          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
              style={{ background: `${community.accentColor}18`, border: `1px solid ${community.accentColor}30` }}
            >
              {community.icon}
            </div>
            <div className="flex-1">
              <h1 className="font-serif text-2xl md:text-3xl text-gold-bright mb-1">{community.name}</h1>
              <p className="text-[11px] font-mono text-gold-matte/75 italic mb-3">
                &ldquo;{community.tagline}&rdquo;
              </p>
              <p className="text-sm font-light text-gold-light/80 leading-relaxed">
                {community.description}
              </p>
            </div>
          </div>

          {/* Stats + Actions */}
          <div className="flex items-center justify-between mt-5 pt-5" style={{ borderTop: "1px solid rgba(212,175,55,0.06)" }}>
            <div className="flex items-center gap-2 text-gold-matte/65">
              <Users className="w-3.5 h-3.5" />
              <span className="text-[10px] font-mono">{memberCount} members · {questions.length} discussions</span>
            </div>
            <button
              onClick={() => user ? null : triggerAuthModal("signup")}
              className="px-4 py-1.5 rounded-full font-mono text-[10px] tracking-widest uppercase transition-all"
              style={{
                background: `${community.accentColor}18`,
                border: `1px solid ${community.accentColor}30`,
                color: community.accentColor,
              }}
            >
              {user ? "✓ Joined" : "Join Community"}
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          {/* Sort */}
          <div className="flex items-center gap-1.5">
            {(["newest", "top"] as SortKey[]).map((s) => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className="px-3 py-1.5 rounded-lg font-mono text-[10px] tracking-widest uppercase transition-all"
                style={{
                  background: sort === s ? "rgba(212,175,55,0.12)" : "transparent",
                  border: `1px solid ${sort === s ? "rgba(212,175,55,0.25)" : "transparent"}`,
                  color: sort === s ? "#d4af37" : "rgba(212,175,55,0.6)",
                }}
              >
                {s === "newest" ? "Newest" : "Top"}
              </button>
            ))}
          </div>

          {/* Ask */}
          <Link
            href={user ? `/community/ask?community=${community.id}` : "#"}
            onClick={!user ? (e) => { e.preventDefault(); triggerAuthModal("signup"); } : undefined}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-mono text-[10px] tracking-widest uppercase transition-all"
            style={{
              background: "rgba(212,175,55,0.1)",
              border: "1px solid rgba(212,175,55,0.25)",
              color: "#d4af37",
            }}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Ask a Question
          </Link>
        </div>

        {/* Questions list */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-gold-matte/30" />
          </div>
        ) : questions.length === 0 ? (
          <div
            className="rounded-2xl py-16 text-center"
            style={{ border: "1px dashed rgba(212,175,55,0.1)", background: "rgba(10,13,26,0.4)" }}
          >
            <p className="font-serif text-gold-bright/75 text-lg mb-2">The inquiry begins with you</p>
            <p className="text-[11px] text-gold-matte/65 mb-5">No discussions yet in this community. Be the first to ask.</p>
            <button
              onClick={() => user
                ? (window.location.href = `/community/ask?community=${community.id}`)
                : triggerAuthModal("signup")
              }
              className="px-5 py-2 rounded-full font-mono text-[10px] tracking-widest uppercase"
              style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)", color: "#d4af37" }}
            >
              Post the First Question
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {questions.map((q) => (
              <QuestionCard
                key={q.id}
                question={q}
                communitySlug={slug}
                hasUpvoted={false}
                showSnippet={true}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
