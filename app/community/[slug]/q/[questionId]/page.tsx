"use client";

// app/community/[slug]/q/[questionId]/page.tsx
// Full discussion thread page

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  doc, getDoc, collection, query, orderBy, onSnapshot,
  updateDoc, increment, arrayUnion, where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { SEED_COMMUNITIES } from "@/lib/data/communities";
import Header from "@/components/navigation/Header";
import StarField from "@/components/ui/StarField";
import ReplyComposer from "@/components/community/ReplyComposer";
import UserAvatar from "@/components/community/UserAvatar";
import VoteButton from "@/components/community/VoteButton";
import FlagButton from "@/components/community/FlagButton";
import { useAuth } from "@/lib/auth/AuthContext";
import { triggerAuthModal } from "@/lib/auth/AuthContext";
import { ArrowLeft, Loader2, MessageSquare, ExternalLink } from "lucide-react";

interface Reply {
  id: string;
  authorId: string;
  authorName: string;
  authorPhoto?: string | null;
  body: string;
  mediaUrls?: string[];
  linkUrl?: string;
  createdAt: Date;
  upvotes: number;
  status: "visible" | "removed";
}

function relativeTime(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function DiscussionThreadPage() {
  const { slug, questionId } = useParams<{ slug: string; questionId: string }>();
  const router = useRouter();
  const { user } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [question, setQuestion] = useState<any | null>(null);
  const [replies, setReplies]   = useState<Reply[]>([]);
  const [loading, setLoading]   = useState(true);
  const [qVoted, setQVoted]     = useState(false);
  const [deletingQ, setDeletingQ] = useState(false);

  const handleDeleteQuestion = async () => {
    if (!confirm("Are you sure you want to permanently delete this discussion and all of its replies? This action cannot be undone.")) return;
    setDeletingQ(true);
    try {
      const { getIdToken } = await import("@/lib/auth/getIdToken");
      const token = await getIdToken();
      const res = await fetch(`/api/community/posts?targetType=question&targetId=${questionId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token ?? ""}` },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to delete question");
      }
      router.replace("/community");
    } catch (err: unknown) {
      alert((err as Error).message);
      setDeletingQ(false);
    }
  };

  const handleDeleteReply = async (replyId: string) => {
    if (!confirm("Are you sure you want to permanently delete this reply? This action cannot be undone.")) return;
    try {
      const { getIdToken } = await import("@/lib/auth/getIdToken");
      const token = await getIdToken();
      const res = await fetch(`/api/community/posts?targetType=reply&targetId=${replyId}&questionId=${questionId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token ?? ""}` },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to delete reply");
      }
      setReplies((prev) => prev.filter((r) => r.id !== replyId));
    } catch (err: unknown) {
      alert((err as Error).message);
    }
  };

  const community = SEED_COMMUNITIES.find((c) => c.slug === slug);

  // Fetch question
  useEffect(() => {
    if (!questionId) return;
    getDoc(doc(db, "questions", questionId)).then((snap) => {
      if (snap.exists()) {
        const d = snap.data();
        setQuestion({ id: snap.id, ...d, createdAt: d.createdAt?.toDate?.() ?? new Date() });
        if (user && d.upvotedBy?.includes(user.uid)) setQVoted(true);
      }
      setLoading(false);
    });
  }, [questionId, user]);

  // Real-time replies
  useEffect(() => {
    if (!questionId) return;
    const q = query(
      collection(db, "questions", questionId, "replies"),
      where("status", "==", "visible"),
      orderBy("createdAt", "asc")
    );
    const unsub = onSnapshot(q, (snap) => {
      const docs = snap.docs
        .map((d) => ({
          id: d.id,
          ...d.data(),
          createdAt: d.data().createdAt?.toDate?.() ?? new Date(),
        }))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((r: any) => r.status !== "removed") as Reply[];
      setReplies(docs);
    });
    return unsub;
  }, [questionId]);

  const handleQUpvote = useCallback(async () => {
    if (!user) { triggerAuthModal("login"); return; }
    if (!questionId || qVoted) return;
    setQVoted(true);
    setQuestion((prev: typeof question) => ({ ...prev, upvotes: (prev?.upvotes ?? 0) + 1 }));
    await updateDoc(doc(db, "questions", questionId), {
      upvotes: increment(1),
      upvotedBy: arrayUnion(user.uid),
    });
  }, [user, questionId, qVoted]);

  const handleReplyUpvote = useCallback(async (replyId: string, hasVoted: boolean) => {
    if (!user) { triggerAuthModal("login"); return; }
    if (hasVoted) return;
    await updateDoc(doc(db, "questions", questionId, "replies", replyId), {
      upvotes: increment(1),
      upvotedBy: arrayUnion(user.uid),
    });
    setReplies((prev) =>
      prev.map((r) => (r.id === replyId ? { ...r, upvotes: r.upvotes + 1 } : r))
    );
  }, [user, questionId]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#05060b" }}>
        <Loader2 className="w-6 h-6 animate-spin text-gold-matte/30" />
      </main>
    );
  }

  if (!question || !community) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#05060b" }}>
        <p className="text-gold-matte/50 font-mono text-sm">Discussion not found.</p>
      </main>
    );
  }

  return (
    <main className="relative flex flex-col min-h-screen overflow-hidden text-gold-light" style={{ backgroundColor: "#05060b" }}>
      <StarField blur />
      <Header />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 pt-28 pb-20">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] font-mono text-gold-matte/40 mb-8">
          <Link href="/community" className="hover:text-gold-matte/70 transition-colors">Seeker Circle</Link>
          <span>/</span>
          <Link href={`/community/${slug}`} className="hover:text-gold-matte/70 transition-colors">
            {community.icon} {community.name}
          </Link>
          <span>/</span>
          <span className="text-gold-matte/60">Discussion</span>
        </div>

        {/* Question card */}
        <div
          className="rounded-2xl overflow-hidden mb-8"
          style={{
            background: "rgba(10,13,26,0.75)",
            border: `1px solid ${community.accentColor}20`,
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            className="h-0.5"
            style={{ background: `linear-gradient(90deg, transparent, ${community.accentColor}60, transparent)` }}
          />
          <div className="p-6">
            {/* Author */}
            <div className="flex items-center gap-3 mb-5">
              <UserAvatar name={question.authorName} photoURL={question.authorPhoto} size={36} />
              <div>
                <p className="text-[11px] font-mono text-gold-matte/70">{question.authorName}</p>
                <p className="text-[10px] text-gold-matte/35">{relativeTime(question.createdAt)}</p>
              </div>
            </div>

            {/* Title */}
            <h1 className="font-serif text-xl md:text-2xl text-gold-bright leading-snug mb-4">
              {question.title}
            </h1>

            {/* Body */}
            <div className="text-sm font-light text-gold-light/70 leading-relaxed whitespace-pre-wrap mb-5">
              {question.body}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4" style={{ borderTop: "1px solid rgba(212,175,55,0.06)" }}>
              <VoteButton count={question.upvotes ?? 0} hasVoted={qVoted} onVote={handleQUpvote} />
              <div className="flex items-center gap-1 text-gold-matte/35">
                <MessageSquare className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono">{replies.length} replies</span>
              </div>
              <div className="ml-auto flex items-center gap-2">
                {user?.role === "admin" && (
                  <button
                    onClick={handleDeleteQuestion}
                    disabled={deletingQ}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg font-mono text-[9px] uppercase tracking-wider transition-all border border-red-500/20 bg-red-500/5 hover:bg-red-500/15 text-red-400"
                  >
                    {deletingQ ? "Deleting..." : "Delete"}
                  </button>
                )}
                <FlagButton targetType="question" targetId={question.id} />
              </div>
            </div>
          </div>
        </div>

        {/* Replies */}
        {replies.length > 0 && (
          <div className="space-y-4 mb-8">
            <h2 className="text-[10px] font-mono uppercase tracking-widest text-gold-matte/40 mb-4">
              {replies.length} {replies.length === 1 ? "Response" : "Responses"}
            </h2>
            {replies.map((reply) => {
              const hasVoted = user ? (reply as unknown as Record<string, unknown[]>)?.["upvotedBy"] as unknown[]
                ? ((reply as unknown as { upvotedBy?: string[] }).upvotedBy ?? []).includes(user.uid)
                : false : false;

              return (
                <div
                  key={reply.id}
                  className="rounded-xl p-4"
                  style={{
                    background: "rgba(10,13,26,0.55)",
                    border: "1px solid rgba(212,175,55,0.07)",
                  }}
                >
                  {/* Reply author */}
                  <div className="flex items-center gap-2.5 mb-3">
                    <UserAvatar name={reply.authorName} photoURL={reply.authorPhoto} size={28} />
                    <div>
                      <p className="text-[11px] font-mono text-gold-matte/70">{reply.authorName}</p>
                      <p className="text-[10px] text-gold-matte/30">{relativeTime(reply.createdAt)}</p>
                    </div>
                  </div>

                  {/* Reply body */}
                  <div className="text-sm font-light text-gold-light/70 leading-relaxed whitespace-pre-wrap mb-3">
                    {reply.body}
                  </div>

                  {/* Media */}
                  {reply.mediaUrls && reply.mediaUrls.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {reply.mediaUrls.map((url, i) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={i}
                          src={url}
                          alt="Attached media"
                          className="max-h-48 rounded-lg object-cover"
                          style={{ border: "1px solid rgba(212,175,55,0.1)" }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Link */}
                  {reply.linkUrl && (
                    <a
                      href={reply.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[10px] text-gold-matte/50 hover:text-gold-matte/80 transition-colors mb-3"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {reply.linkUrl.length > 60 ? reply.linkUrl.slice(0, 60) + "..." : reply.linkUrl}
                    </a>
                  )}

                  {/* Reply actions */}
                  <div className="flex items-center gap-3 mt-2">
                    <VoteButton
                      count={reply.upvotes}
                      hasVoted={hasVoted as boolean}
                      onVote={() => handleReplyUpvote(reply.id, hasVoted as boolean)}
                      size="sm"
                    />
                    <div className="ml-auto flex items-center gap-2">
                      {user?.role === "admin" && (
                        <button
                          onClick={() => handleDeleteReply(reply.id)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg font-mono text-[9px] uppercase tracking-wider transition-all border border-red-500/20 bg-red-500/5 hover:bg-red-500/15 text-red-400"
                        >
                          Delete
                        </button>
                      )}
                      <FlagButton targetType="reply" targetId={reply.id} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Reply composer */}
        <div>
          <h2 className="text-[10px] font-mono uppercase tracking-widest text-gold-matte/40 mb-4">
            Share Your Perspective
          </h2>
          <ReplyComposer
            questionId={questionId}
            communitySlug={slug}
            onReplyPosted={() => {}}
          />
        </div>

        {/* Back */}
        <Link
          href={`/community/${slug}`}
          className="inline-flex items-center gap-1.5 text-gold-matte/30 hover:text-gold-matte/60 transition-colors text-[10px] font-mono uppercase tracking-widest mt-10"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to {community.name}
        </Link>
      </div>
    </main>
  );
}
