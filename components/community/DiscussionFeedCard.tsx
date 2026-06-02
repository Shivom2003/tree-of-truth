"use client";

// components/community/DiscussionFeedCard.tsx
// Rich snippet card for a question in the global/community feed.

import { useState, useEffect } from "react";
import Link from "next/link";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import UserAvatar from "./UserAvatar";
import { ArrowUp, MessageSquare, Clock } from "lucide-react";
import { SEED_COMMUNITIES } from "@/lib/data/communities";

interface FeedCardProps {
  id: string;
  title: string;
  body?: string;
  authorName: string;
  authorPhoto?: string | null;
  createdAt: Date;
  upvotes: number;
  replyCount: number;
  communityIds: string[];
  status: string;
}

function relativeTime(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60)    return "just now";
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const isNew = (date: Date) => Date.now() - date.getTime() < 86_400_000;

export default function DiscussionFeedCard({
  id, title, body, authorName, authorPhoto,
  createdAt, upvotes, replyCount, communityIds,
}: FeedCardProps) {
  const communities = communityIds
    .map((cid) => SEED_COMMUNITIES.find((c) => c.id === cid))
    .filter(Boolean);
  const primary = communities[0];

  const [isHovered, setIsHovered] = useState(false);
  const [snippetReplies, setSnippetReplies] = useState<any[]>([]);
  const [loadingSnippet, setLoadingSnippet] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (isHovered && !fetched && !loadingSnippet) {
      setLoadingSnippet(true);
      const q = query(
        collection(db, "questions", id, "replies"),
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
          setFetched(true);
        })
        .catch((err) => {
          console.error("Error fetching snippet replies", err);
        })
        .finally(() => {
          setLoadingSnippet(false);
        });
    }
  }, [isHovered, fetched, loadingSnippet, id]);

  const targetLink = `/community/${primary?.slug ?? communityIds[0]}/q/${id}`;

  return (
    <div
      className="group block rounded-2xl transition-all duration-300 overflow-hidden"
      style={{
        background:   isHovered ? "rgba(10,13,26,0.85)" : "rgba(10,13,26,0.65)",
        border:       `1px solid ${
          isHovered
            ? (primary ? primary.accentColor + "30" : "rgba(212,175,55,0.2)")
            : (primary ? primary.accentColor + "14" : "rgba(212,175,55,0.08)")
        }`,
        backdropFilter: "blur(8px)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Accent line */}
      {primary && (
        <div
          className="h-px rounded-t-2xl"
          style={{ background: `linear-gradient(90deg, ${primary.accentColor}50, transparent)` }}
        />
      )}

      <Link href={targetLink} className="block p-5">
        {/* Community badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {communities.slice(0, 3).map((c) => c && (
            <span
              key={c.id}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono"
              style={{
                background: `${c.accentColor}12`,
                border:     `1px solid ${c.accentColor}22`,
                color:       c.accentColor,
              }}
            >
              {c.icon} {c.name.split(" ")[0]}
            </span>
          ))}
          {isNew(createdAt) && (
            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400/80">
              New
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-serif text-base md:text-lg text-gold-bright leading-snug mb-2 group-hover:text-gold-light transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Body excerpt */}
        {body && (
          <p className="text-[12px] font-light text-gold-matte/75 leading-relaxed line-clamp-2 mb-4">
            {body}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center gap-4 mt-3">
          {/* Author */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <UserAvatar name={authorName} photoURL={authorPhoto} size={22} />
            <span className="text-[10px] font-mono text-gold-matte/70 truncate">{authorName}</span>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="flex items-center gap-1 text-[10px] font-mono text-gold-matte/60">
              <Clock className="w-3.5 h-3.5" />
              {relativeTime(createdAt)}
            </span>
            <span className="flex items-center gap-1 text-[10px] font-mono text-gold-matte/60">
              <ArrowUp className="w-3.5 h-3.5" />
              {upvotes}
            </span>
            <span className="flex items-center gap-1 text-[10px] font-mono text-gold-matte/60">
              <MessageSquare className="w-3.5 h-3.5" />
              {replyCount}
            </span>
          </div>
        </div>
      </Link>

      {/* Snippet Replies on Hover */}
      <div
        className="transition-all duration-300 ease-in-out border-t border-gold-matte/10 bg-black/25 overflow-hidden"
        style={{
          maxHeight: isHovered ? "500px" : "0px",
          opacity: isHovered ? 1 : 0,
          paddingTop: isHovered ? "12px" : "0px",
          paddingBottom: isHovered ? "16px" : "0px",
          borderTopWidth: isHovered ? "1px" : "0px",
        }}
      >
        <div className="px-5">
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
              <div className="pl-4 pt-1">
                <Link
                  href={targetLink}
                  className="inline-flex items-center gap-1 text-[10px] font-mono text-gold-matte/50 hover:text-gold-matte/80 transition-colors uppercase tracking-wider"
                >
                  <span>Join the conversation</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-mono text-gold-matte/40 italic">No responses yet.</p>
              <Link
                href={targetLink}
                className="text-[10px] font-mono text-gold-matte/50 hover:text-gold-matte/80 uppercase tracking-wider"
              >
                Be the first to reply
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
