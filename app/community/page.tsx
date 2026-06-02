"use client";

// app/community/page.tsx
// Seeker Circle — Community landing with live discussion feed + sidebar.

import { useState, useEffect, useCallback } from "react";
import {
  collection, query, where, orderBy, limit,
  onSnapshot, startAfter, QueryDocumentSnapshot, DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth/AuthContext";
import { triggerAuthModal } from "@/lib/auth/AuthContext";
import Header from "@/components/navigation/Header";
import StarField from "@/components/ui/StarField";
import CommunitySidebar from "@/components/community/CommunitySidebar";
import DiscussionFeedCard from "@/components/community/DiscussionFeedCard";
import AskPanel from "@/components/community/AskPanel";
import NotificationBell from "@/components/community/NotificationBell";
import NotificationPanel from "@/components/community/NotificationPanel";
import { SEED_COMMUNITIES } from "@/lib/data/communities";
import { Loader2, PenLine, TrendingUp, Clock, Flame } from "lucide-react";

type SortMode = "newest" | "top" | "hot";

interface FeedQuestion {
  id: string;
  title: string;
  body: string;
  authorName: string;
  authorPhoto?: string | null;
  createdAt: Date;
  upvotes: number;
  replyCount: number;
  communityIds: string[];
  status: string;
}

const PAGE_SIZE = 15;

export default function CommunityPage() {
  const { user } = useAuth();

  const [activeCommunity, setActiveCommunity] = useState<string | null>(null);
  const [sortMode, setSortMode]               = useState<SortMode>("newest");
  const [questions, setQuestions]             = useState<FeedQuestion[]>([]);
  const [loading, setLoading]                 = useState(true);
  const [askOpen, setAskOpen]                 = useState(false);
  const [notifOpen, setNotifOpen]             = useState(false);
  const [lastDoc, setLastDoc]                 = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore]                 = useState(true);
  const [loadingMore, setLoadingMore]         = useState(false);

  // Build and subscribe to feed query
  useEffect(() => {
    setLoading(true);
    setLastDoc(null);
    setHasMore(true);

    let q = query(
      collection(db, "questions"),
      where("status", "==", "open"),
    );

    if (activeCommunity) {
      q = query(q, where("communityIds", "array-contains", activeCommunity));
    }

    const sortField = sortMode === "newest" ? "createdAt"
      : sortMode === "top" ? "upvotes"
      : "replyCount";

    q = query(q, orderBy(sortField, "desc"), limit(PAGE_SIZE));

    const unsub = onSnapshot(q, (snap) => {
      const docs = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        createdAt: d.data().createdAt?.toDate?.() ?? new Date(),
      })) as FeedQuestion[];

      setQuestions(docs);
      setLastDoc(snap.docs[snap.docs.length - 1] ?? null);
      setHasMore(snap.docs.length === PAGE_SIZE);
      setLoading(false);
    });

    return unsub;
  }, [activeCommunity, sortMode]);

  const loadMore = useCallback(async () => {
    if (!lastDoc || loadingMore || !hasMore) return;
    setLoadingMore(true);

    let q = query(
      collection(db, "questions"),
      where("status", "==", "open"),
    );
    if (activeCommunity) {
      q = query(q, where("communityIds", "array-contains", activeCommunity));
    }
    const sortField = sortMode === "newest" ? "createdAt"
      : sortMode === "top" ? "upvotes"
      : "replyCount";
    q = query(q, orderBy(sortField, "desc"), startAfter(lastDoc), limit(PAGE_SIZE));

    const { getDocs } = await import("firebase/firestore");
    const snap = await getDocs(q);
    const more = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
      createdAt: d.data().createdAt?.toDate?.() ?? new Date(),
    })) as FeedQuestion[];

    setQuestions((prev) => [...prev, ...more]);
    setLastDoc(snap.docs[snap.docs.length - 1] ?? null);
    setHasMore(snap.docs.length === PAGE_SIZE);
    setLoadingMore(false);
  }, [lastDoc, loadingMore, hasMore, activeCommunity, sortMode]);

  const handleAskClick = () => {
    if (!user) { triggerAuthModal("login"); return; }
    setAskOpen(true);
  };

  return (
    <main
      className="relative flex flex-col min-h-screen overflow-x-hidden text-gold-light"
      style={{ backgroundColor: "#05060b" }}
    >
      <StarField blur />
      <Header />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-20">

        {/* ── Top bar ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-gold-matte/60 block mb-1">
              The Seeker Circle
            </span>
            <h1 className="font-serif text-2xl md:text-3xl text-gold-bright">
              Discussions
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <NotificationBell onOpen={() => setNotifOpen(true)} />
            <button
              onClick={handleAskClick}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-[11px] tracking-wide uppercase transition-all duration-200"
              style={{
                background: "rgba(212,175,55,0.1)",
                border:     "1px solid rgba(212,175,55,0.25)",
                color:      "#d4af37",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,175,55,0.18)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,175,55,0.1)"; }}
            >
              <PenLine className="w-3.5 h-3.5" />
              Ask
            </button>
          </div>
        </div>

        {/* ── Main layout ─────────────────────────────────────────── */}
        <div className="flex gap-6">

          {/* Sidebar */}
          <CommunitySidebar
            activeId={activeCommunity}
            onSelect={(id) => { setActiveCommunity(id); setLastDoc(null); }}
          />

          {/* Feed */}
          <div className="flex-1 min-w-0">

            {/* Mobile horizontal scroll selector */}
            <div className="block lg:hidden mb-6 overflow-x-auto pb-2 scrollbar-none" style={{ scrollbarWidth: "none" }}>
              <div className="flex gap-2 min-w-max">
                <button
                  onClick={() => { setActiveCommunity(null); setLastDoc(null); }}
                  className="px-3.5 py-2 rounded-xl text-xs font-mono transition-all"
                  style={{
                    background: activeCommunity === null ? "rgba(212,175,55,0.12)" : "rgba(10,13,26,0.5)",
                    border: `1px solid ${activeCommunity === null ? "rgba(212,175,55,0.3)" : "rgba(212,175,55,0.08)"}`,
                    color: activeCommunity === null ? "#d4af37" : "rgba(212,175,55,0.6)",
                  }}
                >
                  All
                </button>
                {SEED_COMMUNITIES.map((c) => {
                  const isActive = activeCommunity === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => { setActiveCommunity(c.id); setLastDoc(null); }}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono transition-all"
                      style={{
                        background: isActive ? `${c.accentColor}18` : "rgba(10,13,26,0.5)",
                        border: `1px solid ${isActive ? `${c.accentColor}40` : "rgba(212,175,55,0.08)"}`,
                        color: isActive ? c.accentColor : "rgba(212,175,55,0.6)",
                      }}
                    >
                      <span>{c.icon}</span>
                      <span>{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sort controls */}
            <div className="flex items-center gap-2 mb-5">
              {([
                { id: "newest", label: "Newest", icon: Clock },
                { id: "top",    label: "Top",    icon: TrendingUp },
                { id: "hot",    label: "Active",  icon: Flame },
              ] as const).map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setSortMode(id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[10px] transition-all"
                  style={{
                    background: sortMode === id ? "rgba(212,175,55,0.1)" : "transparent",
                    border:     `1px solid ${sortMode === id ? "rgba(212,175,55,0.22)" : "rgba(212,175,55,0.08)"}`,
                    color:      sortMode === id ? "#d4af37" : "rgba(212,175,55,0.6)",
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              ))}

              <span className="ml-auto text-[9px] font-mono text-gold-matte/55">
                {activeCommunity
                  ? "Showing: selected community"
                  : "Showing: all communities"}
              </span>
            </div>

            {/* Feed content */}
            {loading ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="w-5 h-5 animate-spin text-gold-matte/30" />
              </div>
            ) : questions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="font-serif text-xl text-gold-matte/60 mb-2">No discussions yet</p>
                <p className="text-[11px] text-gold-matte/50 font-mono">
                  Be the first to ask a question in this community.
                </p>
                <button
                  onClick={handleAskClick}
                  className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-[11px] uppercase tracking-wide transition-all"
                  style={{
                    background: "rgba(212,175,55,0.08)",
                    border:     "1px solid rgba(212,175,55,0.2)",
                    color:      "#d4af37",
                  }}
                >
                  <PenLine className="w-3.5 h-3.5" />
                  Start the Inquiry
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {questions.map((q) => (
                    <DiscussionFeedCard key={q.id} {...q} />
                  ))}
                </div>

                {/* Load more */}
                {hasMore && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={loadMore}
                      disabled={loadingMore}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-mono text-[10px] uppercase tracking-widest transition-all"
                      style={{
                        background: "rgba(212,175,55,0.05)",
                        border:     "1px solid rgba(212,175,55,0.12)",
                        color:      "rgba(212,175,55,0.45)",
                      }}
                    >
                      {loadingMore
                        ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        : "Load More"}
                    </button>
                  </div>
                )}

                {!hasMore && questions.length > 0 && (
                  <p className="text-center text-[9px] font-mono text-gold-matte/50 mt-8 tracking-widest">
                    — End of discussions —
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Panels ─────────────────────────────────────────────────── */}
      <AskPanel
        open={askOpen}
        onClose={() => setAskOpen(false)}
        defaultCommunityId={activeCommunity}
      />
      <NotificationPanel
        open={notifOpen}
        onClose={() => setNotifOpen(false)}
      />
    </main>
  );
}
