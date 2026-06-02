"use client";

// components/community/CommunityCard.tsx

import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";
import type { CommunityDef } from "@/lib/data/communities";

interface CommunityCardProps {
  community: CommunityDef & { memberCount?: number; questionCount?: number };
  joined?: boolean;
}

export default function CommunityCard({ community, joined = false }: CommunityCardProps) {
  return (
    <Link href={`/community/${community.slug}`} className="group block">
      <div
        className="relative rounded-2xl overflow-hidden h-full transition-all duration-300"
        style={{
          background: "rgba(10,13,26,0.7)",
          border: "1px solid rgba(212,175,55,0.1)",
          backdropFilter: "blur(12px)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = `${community.accentColor}40`;
          el.style.transform = "translateY(-3px)";
          el.style.boxShadow = `0 12px 40px ${community.accentColor}15`;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = "rgba(212,175,55,0.1)";
          el.style.transform = "translateY(0)";
          el.style.boxShadow = "none";
        }}
      >
        {/* Color accent bar */}
        <div
          className="h-0.5 w-full"
          style={{ background: `linear-gradient(90deg, transparent, ${community.accentColor}80, transparent)` }}
        />

        <div className="p-5">
          {/* Icon + Name */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: `${community.accentColor}18`, border: `1px solid ${community.accentColor}30` }}
              >
                {community.icon}
              </div>
              <div>
                <h3 className="font-serif text-sm text-gold-bright leading-tight group-hover:text-gold-bright transition-colors">
                  {community.name}
                </h3>
                {joined && (
                  <span
                    className="text-[9px] font-mono tracking-widest uppercase px-1.5 py-0.5 rounded-full mt-0.5 inline-block"
                    style={{
                      background: `${community.accentColor}20`,
                      color: community.accentColor,
                      border: `1px solid ${community.accentColor}30`,
                    }}
                  >
                    Member
                  </span>
                )}
              </div>
            </div>
            <ArrowRight
              className="w-4 h-4 text-gold-matte/20 group-hover:text-gold-matte/60 transition-all group-hover:translate-x-1"
            />
          </div>

          {/* Tagline */}
          <p className="text-[10px] font-mono text-gold-matte/50 italic mb-3">
            &ldquo;{community.tagline}&rdquo;
          </p>

          {/* Description */}
          <p className="text-[11px] font-light text-gold-light/60 leading-relaxed line-clamp-3 mb-4">
            {community.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {community.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-mono px-2 py-0.5 rounded-full"
                style={{ background: "rgba(212,175,55,0.06)", color: "rgba(212,175,55,0.5)", border: "1px solid rgba(212,175,55,0.1)" }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 pt-3" style={{ borderTop: "1px solid rgba(212,175,55,0.06)" }}>
            <div className="flex items-center gap-1.5 text-gold-matte/40">
              <Users className="w-3 h-3" />
              <span className="text-[10px] font-mono">
                {community.memberCount ?? 0} members
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-gold-matte/40">
              <span className="text-[10px] font-mono">
                {community.questionCount ?? 0} discussions
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
