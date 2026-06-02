"use client";

// components/community/NotificationBell.tsx
// Real-time notification bell with unread badge count.

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { collection, query, where, onSnapshot, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth/AuthContext";

interface NotificationBellProps {
  onOpen: () => void;
}

export default function NotificationBell({ onOpen }: NotificationBellProps) {
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user) { setUnreadCount(0); return; }

    const q = query(
      collection(db, "users", user.uid, "notifications"),
      where("read", "==", false),
      orderBy("createdAt", "desc"),
      limit(99)
    );

    const unsub = onSnapshot(q, (snap) => {
      setUnreadCount(snap.size);
    });

    return unsub;
  }, [user]);

  if (!user) return null;

  return (
    <button
      onClick={onOpen}
      className="relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
      style={{
        background: "rgba(212,175,55,0.06)",
        border:     "1px solid rgba(212,175,55,0.12)",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,175,55,0.12)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,175,55,0.06)"; }}
      title="Notifications"
    >
      <Bell className="w-4 h-4 text-gold-matte/60" />
      {unreadCount > 0 && (
        <span
          className="absolute -top-1 -right-1 min-w-[16px] h-4 rounded-full flex items-center justify-center text-[8px] font-bold font-mono px-1"
          style={{ background: "#d4af37", color: "#05060b" }}
        >
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </button>
  );
}
