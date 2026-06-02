"use client";

// components/community/UserAvatar.tsx

import { useAuth } from "@/lib/auth/AuthContext";
import Image from "next/image";

interface UserAvatarProps {
  name?: string | null;
  photoURL?: string | null;
  size?: number;
  showBadge?: boolean;
  role?: "member" | "moderator" | "admin";
}

function getInitials(name?: string | null): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(name?: string | null): string {
  const colors = [
    "#7c5cbf", "#4a90d9", "#5bb89a", "#c45c8a",
    "#e08a3c", "#d4af37", "#2abfbf", "#8a6c4a",
  ];
  if (!name) return colors[0];
  const idx = name.charCodeAt(0) % colors.length;
  return colors[idx];
}

export default function UserAvatar({
  name,
  photoURL,
  size = 32,
  showBadge = false,
  role = "member",
}: UserAvatarProps) {
  const badgeColor =
    role === "admin" ? "#ffd700" : role === "moderator" ? "#2abfbf" : null;

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      {photoURL ? (
        <Image
          src={photoURL}
          alt={name ?? "User"}
          width={size}
          height={size}
          className="rounded-full object-cover"
          style={{ border: "1px solid rgba(212,175,55,0.2)" }}
        />
      ) : (
        <div
          className="rounded-full flex items-center justify-center font-sans font-semibold"
          style={{
            width: size,
            height: size,
            fontSize: size * 0.35,
            background: getAvatarColor(name),
            color: "#05060b",
            border: "1px solid rgba(212,175,55,0.2)",
          }}
        >
          {getInitials(name)}
        </div>
      )}
      {showBadge && badgeColor && (
        <div
          className="absolute -bottom-0.5 -right-0.5 rounded-full"
          style={{
            width: size * 0.3,
            height: size * 0.3,
            background: badgeColor,
            border: "1.5px solid #05060b",
          }}
        />
      )}
    </div>
  );
}

// Self-referential avatar for current user
export function CurrentUserAvatar({ size = 32 }: { size?: number }) {
  const { user } = useAuth();
  return (
    <UserAvatar
      name={user?.displayName}
      photoURL={user?.photoURL}
      size={size}
      showBadge
      role={user?.role}
    />
  );
}
