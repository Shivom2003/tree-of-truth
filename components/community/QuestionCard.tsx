"use client";

// components/community/QuestionCard.tsx

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronUp, MessageSquare, Clock } from "lucide-react";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import UserAvatar from "./UserAvatar";

export interface Question {
  id: string;
  title: string;
  body: string;
  authorId: string;
  authorName: string;
  authorPhoto?: string | null;
  communityIds: string[];
  communityNames?: string[];
  createdAt: Date | { toDate: () => Date };
  upvotes: number;
  replyCount: number;
  status: "open" | "closed" | "removed";
}

function relativeTime(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

interface QuestionCardProps {
  question: Question;
  communitySlug: string;
  onUpvote?: (id: string) => void;
  hasUpvoted?: boolean;
  showSnippet?: boolean;
}

export default function QuestionCard({
  question,
  communitySlug,
  onUpvote,
  hasUpvoted = false,
  showSnippet = false,
}: QuestionCardProps) {
  const date =
    question.createdAt instanceof Date
      ? question.createdAt
      : question.createdAt.toDate();

  const [snippetReplies, setSnippetReplies] = useState<any[]>([]);
  const [loadingSnippet, setLoadingSnippet] = useState(false);

  useEffect(() => {
    if (showSnippet) {
      setLoadingSnippet(true);
      const q = query(
        collection(db, "questions", question.id, "replies"),
        where("status", "==", "visible"),
        orderBy("createdAt", "asc"),
        limit(2)
      );
      getDocs(q)
        .then((snap) => {
          const docs = snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
            createdAt: d.data().createdAt?.toDate?.() ?? new Date(),
          }));
          setSnippetReplies(docs);
        })
        .catch((err) => {
          console.error("Error fetching snippet replies", err);
        })
        .finally(() => {
          setLoadingSnippet(false);
        });
    }
  }, [question.id, showSnippet]);

  return (
    <div
      className="group relative rounded-xl overflow-hidden transition-all duration-200"
      style={{
        background: "rgba(10,13,26,0.6)",
        border: "1px solid rgba(212,175,55,0.08)",
        backdropFilter: "blur(8px)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,175,55,0.2)";
        (e.currentTarget as HTMLDivElement).style.background = "rgba(12,15,28,0.8)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,175,55,0.08)";
        (e.currentTarget as HTMLDivElement).style.background = "rgba(10,13,26,0.6)";
      }}
    >
      <div className="flex gap-0">
        {/* Upvote column */}
        <div
          className="flex flex-col items-center justify-start gap-1 px-3 pt-4 pb-4 shrink-0"
          style={{ borderRight: "1px solid rgba(212,175,55,0.06)", minWidth: "52px" }}
        >
          <button
            onClick={(e) => { e.preventDefault(); onUpvote?.(question.id); }}
            className="flex flex-col items-center gap-0.5 transition-all duration-150"
            style={{ color: hasUpvoted ? "#d4af37" : "rgba(212,175,55,0.4)" }}
            onMouseEnter={(e) => {
              if (!hasUpvoted) (e.currentTarget as HTMLButtonElement).style.color = "rgba(212,175,55,0.7)";
            }}
            onMouseLeave={(e) => {
              if (!hasUpvoted) (e.currentTarget as HTMLButtonElement).style.color = "rgba(212,175,55,0.4)";
            }}
          >
            <ChevronUp className="w-4 h-4" />
            <span className="text-[11px] font-mono font-semibold">{question.upvotes}</span>
          </button>
        </div>

        {/* Content */}
        <Link
          href={`/community/${communitySlug}/q/${question.id}`}
          className="flex-1 p-4 block"
        >
          <h3 className="font-serif text-sm text-gold-bright leading-snug mb-2 group-hover:text-gold-bright transition-colors">
            {question.title}
          </h3>

          <p className="text-[11px] font-light text-gold-light/75 leading-relaxed line-clamp-2 mb-3">
            {question.body}
          </p>

          <div className="flex items-center justify-between">
            {/* Author */}
            <div className="flex items-center gap-2">
              <UserAvatar name={question.authorName} photoURL={question.authorPhoto} size={22} />
              <span className="text-[10px] text-gold-matte/70 font-mono">{question.authorName}</span>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-gold-matte/60">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono">{relativeTime(date)}</span>
              </div>
              <div className="flex items-center gap-1 text-gold-matte/60">
                <MessageSquare className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono">{question.replyCount}</span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Snippet Replies */}
      {showSnippet && (
        <div className="border-t border-gold-matte/10 bg-black/20 px-5 py-4">
          {loadingSnippet ? (
            <p className="text-[10px] font-mono text-gold-matte/50 italic animate-pulse">Loading recent activity...</p>
          ) : snippetReplies.length > 0 ? (
            <div className="space-y-3.5">
              <p className="text-[9px] font-mono uppercase tracking-widest text-gold-matte/45 mb-2">Recent activity</p>
              <div className="relative pl-4 space-y-3 border-l border-gold-matte/15">
                {snippetReplies.map((reply) => (
                  <div key={reply.id} className="text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <UserAvatar name={reply.authorName} photoURL={reply.authorPhoto} size={18} />
                      <span className="text-[10px] font-mono text-gold-matte/70">{reply.authorName}</span>
                      <span className="text-[9px] text-gold-matte/45 font-mono">{relativeTime(reply.createdAt)}</span>
                    </div>
                    <p className="text-[11px] font-light text-gold-light/80 leading-relaxed pl-6 line-clamp-2">
                      {reply.body}
                    </p>
                  </div>
                ))}
              </div>
              {question.replyCount > 2 && (
                <div className="pl-4 pt-1">
                  <Link
                    href={`/community/${communitySlug}/q/${question.id}`}
                    className="inline-flex items-center gap-1 text-[10px] font-mono text-gold-matte/50 hover:text-gold-matte/80 transition-colors uppercase tracking-wider"
                  >
                    <span>View all {question.replyCount} responses</span>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <p className="text-[10px] font-mono text-gold-matte/40 italic">No responses yet. Be the first to reply!</p>
          )}
        </div>
      )}
    </div>
  );
}
