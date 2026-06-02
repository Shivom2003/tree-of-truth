"use client";

import { useState } from "react";
import { MediaItem } from "@/lib/data/curatedMedia";
import { BookOpen, Video, Headphones, FileText, ExternalLink, Clock, Calendar, Bookmark, Play } from "lucide-react";

interface MediaCardProps {
  item: MediaItem;
}

// Map tags/categories to custom color strings for borders and badge text
export function getTagColor(tag: string): string {
  const t = tag.toLowerCase();

  // Thinkers
  if (t === "hoffman" || t === "faggin") return "#34d399"; // Mint
  if (t === "kastrup" || t === "chalmers" || t === "goff") return "#f43f5e"; // Coral/Red
  if (t === "ramana" || t === "nisargadatta" || t === "spira" || t === "lucille" || t === "papaji" || t === "krishnamurti" || t === "watts") return "#0284c7"; // Ocean Blue
  if (t === "shankaracharya" || t === "vivekananda" || t === "sarvapriyananda" || t === "aurobindo" || t === "krishna") return "#e11d48"; // Crimson
  if (t === "buddha" || t === "nagarjuna" || t === "laotzu") return "#d946ef"; // Orchid Purple
  if (t === "patanjali" || t === "ramakrishna" || t === "jesus" || t === "williamjames") return "#0d9488"; // Deep Teal
  if (t === "bohm") return "#ec407a"; // Deep Pink
  if (t === "koch" || t === "chopra" || t === "metzinger" || t === "kanojia") return "#94a3b8"; // Slate Silver

  // Root Families
  if (t.includes("vedanta")) return "#ffe082"; // Gold
  if (t.includes("buddhism") || t.includes("sunyata") || t.includes("rigpa")) return "#d946ef"; // Orchid
  if (t.includes("inquiry")) return "#0284c7"; // Ocean
  if (t.includes("shivom")) return "#059669"; // Green
  if (t.includes("phenomenology") || t.includes("selfconstruct")) return "#94a3b8"; // Silver
  if (t.includes("esoteric") || t.includes("subtle") || t.includes("astral")) return "#0d9488"; // Teal

  // Branch Families
  if (t.includes("neuroscience") || t.includes("ncc") || t.includes("dmn")) return "#60a5fa"; // Light Blue
  if (t.includes("philosophy") || t.includes("hardproblem")) return "#6366f1"; // Indigo
  if (t.includes("cognitive") || t.includes("predictive")) return "#8b5cf6"; // Amethyst
  if (t.includes("quantum") || t.includes("observer") || t.includes("interface")) return "#34d399"; // Mint
  if (t.includes("panpsychism") || t.includes("idealism")) return "#f43f5e"; // Coral
  if (t.includes("ai")) return "#0ea5e9"; // Cyan

  return "#d4af37"; // Fallback Gold
}

export default function MediaCard({ item }: MediaCardProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const primaryTag = item.tags[0] || "general";
  const glowColor = getTagColor(primaryTag);

  const renderIcon = () => {
    switch (item.type) {
      case "paper":
        return <FileText className="w-4 h-4 text-emerald-400" />;
      case "podcast":
        return <Headphones className="w-4 h-4 text-amber-400" />;
      case "video":
      case "short":
      default:
        return <Video className="w-4 h-4 text-sky-400" />;
    }
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    if (item.type !== "paper") {
      e.preventDefault();
      setIsLightboxOpen(true);
    }
  };

  return (
    <>
      {item.type === "paper" ? (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full cursor-pointer transition-transform duration-300 hover:-translate-y-1.5"
        >
          <div
            className="group relative rounded-2xl border transition-all duration-500 overflow-hidden flex flex-col h-full bg-[#07080f]/80 backdrop-blur-sm"
            style={{
              borderColor: "rgba(212, 175, 55, 0.12)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${glowColor}50`;
              e.currentTarget.style.boxShadow = `0 0 25px ${glowColor}15`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.12)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[8px] uppercase tracking-widest font-mono border-gold-matte/10 bg-gold-matte/5 text-gold-matte/80">
                    {renderIcon()}
                    {item.type}
                  </span>
                  <span className="text-[9px] font-mono text-white/20 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.publishedDate.split("-")[0]}
                  </span>
                </div>

                {/* Title */}
                <h4 className="font-serif text-sm tracking-wide text-[#ffd700] mb-2.5 line-clamp-2 group-hover:text-gold-bright transition-colors">
                  {item.title}
                </h4>

                {/* Authors / Channel */}
                <p className="text-[10px] text-[#f3e5ab]/60 font-light mb-3 italic">
                  By {item.authorsOrChannel.join(", ")}
                </p>

                {/* Description */}
                <p className="text-xs text-[#f3e5ab]/70 font-light leading-relaxed mb-4 line-clamp-3">
                  {item.description}
                </p>
              </div>

              <div>
                {/* Metadata (Citations / Read link) */}
                {item.citationCount !== undefined && (
                  <div className="text-[9px] font-mono text-[#d4af37]/45 mb-4 flex items-center gap-1">
                    <Bookmark className="w-3 h-3" />
                    Citations: <span className="text-gold-light">{item.citationCount}</span>
                  </div>
                )}

                {/* Tags footer */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[8px] font-mono rounded px-1.5 py-0.5 border"
                      style={{
                        color: getTagColor(tag),
                        borderColor: `${getTagColor(tag)}20`,
                        backgroundColor: `${getTagColor(tag)}08`,
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Call to action */}
                <span
                  className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-mono text-gold-matte group-hover:text-gold-bright transition-colors pt-1"
                >
                  Read Paper
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        </a>
      ) : (
        /* Video / Podcast Card (opens lightbox modal on play click) */
        <div
          className="group relative rounded-2xl border transition-all duration-500 hover:-translate-y-1.5 overflow-hidden flex flex-col h-full bg-[#07080f]/80 backdrop-blur-sm"
          style={{
            borderColor: "rgba(212, 175, 55, 0.12)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = `${glowColor}50`;
            e.currentTarget.style.boxShadow = `0 0 25px ${glowColor}15`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.12)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {/* Visual Anchor for Videos */}
          <div className="relative aspect-video w-full overflow-hidden bg-black/40 border-b border-gold-matte/10">
            {item.thumbnailUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-cosmic-deep/30">
                <Video className="w-8 h-8 text-gold-matte/20" />
              </div>
            )}
            
            {/* Play Button Overlay */}
            <button
              onClick={handlePlayClick}
              className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              aria-label="Play video"
            >
              <div className="w-12 h-12 rounded-full border border-gold-matte/40 bg-cosmic-dark/80 flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110">
                <Play className="w-5 h-5 text-gold-bright ml-0.5 fill-gold-bright" />
              </div>
            </button>

            {item.duration && (
              <span className="absolute bottom-2.5 right-2.5 text-[9px] font-mono px-2 py-0.5 rounded bg-black/80 text-gold-light/90 border border-gold-matte/20">
                <Clock className="w-2.5 h-2.5 inline mr-1" />
                {item.duration}
              </span>
            )}
          </div>

          {/* Content Body */}
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              {/* Header info */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[8px] uppercase tracking-widest font-mono border-gold-matte/10 bg-gold-matte/5 text-gold-matte/80">
                  {renderIcon()}
                  {item.type}
                </span>
                <span className="text-[9px] font-mono text-white/20 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {item.publishedDate.split("-")[0]}
                </span>
              </div>

              {/* Title */}
              <h4 className="font-serif text-sm tracking-wide text-[#ffd700] mb-2.5 line-clamp-2 group-hover:text-gold-bright transition-colors">
                {item.title}
              </h4>

              {/* Authors / Channel */}
              <p className="text-[10px] text-[#f3e5ab]/60 font-light mb-3 italic">
                Channel: {item.authorsOrChannel.join(", ")}
              </p>

              {/* Description */}
              <p className="text-xs text-[#f3e5ab]/70 font-light leading-relaxed mb-4 line-clamp-3">
                {item.description}
              </p>
            </div>

            <div>
              {/* Tags footer */}
              <div className="flex flex-wrap gap-1 mb-4">
                {item.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[8px] font-mono rounded px-1.5 py-0.5 border"
                    style={{
                      color: getTagColor(tag),
                      borderColor: `${getTagColor(tag)}20`,
                      backgroundColor: `${getTagColor(tag)}08`,
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Call to action */}
              <button
                onClick={handlePlayClick}
                className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-mono text-gold-matte hover:text-gold-bright transition-colors pt-1 cursor-pointer"
              >
                Watch Video
                <Play className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* YouTube Lightbox Modal */}
      {isLightboxOpen && item.type !== "paper" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-4xl aspect-video rounded-2xl border border-gold-matte/20 overflow-hidden bg-cosmic-dark shadow-2xl">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full border border-gold-matte/30 bg-cosmic-dark/90 hover:bg-black text-gold-matte hover:text-gold-bright flex items-center justify-center text-sm transition-colors cursor-pointer"
              aria-label="Close video"
            >
              ✕
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${item.id}?autoplay=1`}
              title={item.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
