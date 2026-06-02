"use client";

// components/community/NotificationPanel.tsx
// Slide-in notifications panel. Marks items read on open.

import { useState, useEffect } from "react";
import { X, Bell, MessageSquare, ArrowUp, Sparkles } from "lucide-react";
import {
  collection, query, orderBy, limit,
  onSnapshot, writeBatch, doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth/AuthContext";
import UserAvatar from "./UserAvatar";
import Link from "next/link";

interface Notification {
  id: string;
  type: "new_reply" | "new_question" | "upvote_milestone";
  fromName?: string;
  fromPhoto?: string | null;
  questionId?: string;
  questionTitle?: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

function relativeTime(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60)    return "just now";
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

const typeIcon = (type: string) => {
  if (type === "new_reply")          return <MessageSquare className="w-3.5 h-3.5" />;
  if (type === "upvote_milestone")   return <ArrowUp className="w-3.5 h-3.5" />;
  return <Sparkles className="w-3.5 h-3.5" />;
};

interface NotificationPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function NotificationPanel({ open, onClose }: NotificationPanelProps) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // Real-time listener
  useEffect(() => {
    if (!user || !open) return;
    setLoading(true);

    const q = query(
      collection(db, "users", user.uid, "notifications"),
      orderBy("createdAt", "desc"),
      limit(30)
    );

    const unsub = onSnapshot(q, (snap) => {
      setNotifications(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
          createdAt: d.data().createdAt?.toDate?.() ?? new Date(),
        })) as Notification[]
      );
      setLoading(false);
    });

    return unsub;
  }, [user, open]);

  // Mark all unread as read when panel opens
  useEffect(() => {
    if (!open || !user || notifications.length === 0) return;
    const unread = notifications.filter((n) => !n.read);
    if (unread.length === 0) return;

    const batch = writeBatch(db);
    unread.forEach((n) => {
      batch.update(
        doc(db, "users", user.uid, "notifications", n.id),
        { read: true }
      );
    });
    batch.commit().catch(console.error);
  }, [open, notifications, user]);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape" && open) onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 transition-all duration-300"
        style={{
          background:    open ? "rgba(5,6,11,0.4)" : "transparent",
          backdropFilter: open ? "blur(4px)" : "blur(0px)",
          pointerEvents: open ? "auto" : "none",
          opacity:       open ? 1 : 0,
        }}
      />

      {/* Panel */}
      <div
        className="fixed top-0 right-0 h-full z-50 flex flex-col"
        style={{
          width:      "min(420px, 90vw)",
          background: "rgba(8,10,20,0.97)",
          borderLeft: "1px solid rgba(212,175,55,0.1)",
          backdropFilter: "blur(20px)",
          transform:  open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 320ms cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow:  open ? "-16px 0 48px rgba(0,0,0,0.5)" : "none",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 shrink-0"
          style={{ borderBottom: "1px solid rgba(212,175,55,0.08)" }}
        >
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-gold-matte/50" />
            <h2 className="font-mono text-sm text-gold-bright tracking-wide">Notifications</h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
            style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.1)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,175,55,0.12)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,175,55,0.06)"; }}
          >
            <X className="w-3.5 h-3.5 text-gold-matte/50" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-5 h-5 rounded-full border border-gold-matte/20 border-t-gold-matte/60 animate-spin" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <Bell className="w-8 h-8 text-gold-matte/15 mb-3" />
              <p className="text-[11px] font-mono text-gold-matte/30">No notifications yet</p>
              <p className="text-[10px] text-gold-matte/20 mt-1">
                Replies to your questions will appear here.
              </p>
            </div>
          ) : (
            <div className="py-2">
              {notifications.map((n) => (
                <Link
                  key={n.id}
                  href={n.questionId ? `/community/q/${n.questionId}` : "/community"}
                  onClick={onClose}
                  className="flex items-start gap-3 px-5 py-3.5 transition-all"
                  style={{
                    background: n.read ? "transparent" : "rgba(212,175,55,0.03)",
                    borderBottom: "1px solid rgba(212,175,55,0.04)",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(212,175,55,0.06)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = n.read ? "transparent" : "rgba(212,175,55,0.03)"; }}
                >
                  {/* Icon or avatar */}
                  <div className="shrink-0 mt-0.5">
                    {n.fromName ? (
                      <UserAvatar name={n.fromName} photoURL={n.fromPhoto} size={28} />
                    ) : (
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(212,175,55,0.1)" }}
                      >
                        <span className="text-gold-matte/50">{typeIcon(n.type)}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-gold-light/80 leading-snug">
                      {n.message}
                    </p>
                    {n.questionTitle && (
                      <p className="text-[10px] text-gold-matte/40 mt-0.5 truncate font-light italic">
                        &ldquo;{n.questionTitle}&rdquo;
                      </p>
                    )}
                    <p className="text-[9px] font-mono text-gold-matte/25 mt-1">
                      {relativeTime(n.createdAt)}
                    </p>
                  </div>

                  {/* Unread dot */}
                  {!n.read && (
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                      style={{ background: "#d4af37" }}
                    />
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
