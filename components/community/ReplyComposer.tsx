"use client";

// components/community/ReplyComposer.tsx
// Rich reply input supporting text, image upload, GIF URL, and external links

import { useState, useRef } from "react";
import {
  Image as ImageIcon,
  Link as LinkIcon,
  Send,
  Loader2,
  X,
} from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import { triggerAuthModal } from "@/lib/auth/AuthContext";
import { getIdToken } from "@/lib/auth/getIdToken";
import UserAvatar from "./UserAvatar";

interface ReplyComposerProps {
  questionId: string;
  communitySlug: string;
  onReplyPosted?: () => void;
  placeholder?: string;
}

export default function ReplyComposer({
  questionId,
  onReplyPosted,
  placeholder = "Share your perspective...",
}: ReplyComposerProps) {
  const { user } = useAuth();
  const [body, setBody]               = useState("");
  const [linkUrl, setLinkUrl]         = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [mediaPreview, setMediaPreview]   = useState<string | null>(null);
  const [mediaFile, setMediaFile]     = useState<File | null>(null);
  const [submitting, setSubmitting]   = useState(false);
  const [error, setError]             = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5 MB.");
      return;
    }
    setMediaFile(file);
    setMediaPreview(URL.createObjectURL(file));
  };

  const removeMedia = () => {
    setMediaFile(null);
    setMediaPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleFocus = () => {
    if (!user) triggerAuthModal("login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { triggerAuthModal("login"); return; }
    if (!body.trim() && !mediaFile) return;

    setSubmitting(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("questionId", questionId);
      formData.append("body", body.trim());
      if (linkUrl.trim()) formData.append("linkUrl", linkUrl.trim());
      if (mediaFile) formData.append("media", mediaFile);

      const token = await getIdToken();
      const res = await fetch("/api/community/posts", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token ?? ""}` },
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to post reply");
      }

      setBody("");
      setLinkUrl("");
      setShowLinkInput(false);
      removeMedia();
      onReplyPosted?.();
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl overflow-hidden"
      style={{
        background: "rgba(10,13,26,0.7)",
        border: "1px solid rgba(212,175,55,0.12)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="flex gap-3 p-4">
        {user && (
          <div className="shrink-0 pt-0.5">
            <UserAvatar name={user.displayName} photoURL={user.photoURL} size={32} />
          </div>
        )}
        <div className="flex-1">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onFocus={handleFocus}
            placeholder={user ? placeholder : "Sign in to join the discussion..."}
            rows={3}
            className="w-full bg-transparent resize-none outline-none text-sm text-gold-light/80 placeholder:text-gold-matte/25 leading-relaxed"
            style={{ fontFamily: "var(--font-sans)" }}
          />

          {/* Media preview */}
          {mediaPreview && (
            <div className="relative inline-block mt-2 mb-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mediaPreview}
                alt="Preview"
                className="max-h-32 rounded-lg object-cover"
                style={{ border: "1px solid rgba(212,175,55,0.15)" }}
              />
              <button
                type="button"
                onClick={removeMedia}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: "#05060b", border: "1px solid rgba(212,175,55,0.3)" }}
              >
                <X className="w-3 h-3 text-gold-matte/60" />
              </button>
            </div>
          )}

          {/* Link input */}
          {showLinkInput && (
            <div className="mt-2 flex items-center gap-2">
              <LinkIcon className="w-3.5 h-3.5 text-gold-matte/40 shrink-0" />
              <input
                type="url"
                placeholder="Paste a URL..."
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="flex-1 bg-transparent outline-none text-xs text-gold-light/70 placeholder:text-gold-matte/25 border-b border-gold-matte/15 pb-0.5"
                style={{ fontFamily: "var(--font-sans)" }}
              />
              <button type="button" onClick={() => { setShowLinkInput(false); setLinkUrl(""); }}>
                <X className="w-3 h-3 text-gold-matte/30" />
              </button>
            </div>
          )}

          {error && (
            <p className="text-[10px] text-red-400/70 mt-2">{error}</p>
          )}
        </div>
      </div>

      {/* Toolbar */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ borderTop: "1px solid rgba(212,175,55,0.06)" }}
      >
        <div className="flex items-center gap-1">
          {/* Image upload */}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="p-1.5 rounded-lg transition-colors text-gold-matte/30 hover:text-gold-matte/70 hover:bg-gold-matte/5"
            title="Attach image or GIF"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*,.gif"
            className="hidden"
            onChange={handleImageChange}
          />

          {/* Link */}
          <button
            type="button"
            onClick={() => setShowLinkInput(!showLinkInput)}
            className="p-1.5 rounded-lg transition-colors text-gold-matte/30 hover:text-gold-matte/70 hover:bg-gold-matte/5"
            title="Add a link"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
        </div>

        <button
          type="submit"
          disabled={submitting || (!body.trim() && !mediaFile)}
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg font-mono text-[10px] tracking-widest uppercase transition-all"
          style={{
            background: (body.trim() || mediaFile) ? "rgba(212,175,55,0.15)" : "rgba(212,175,55,0.04)",
            border: `1px solid ${(body.trim() || mediaFile) ? "rgba(212,175,55,0.3)" : "rgba(212,175,55,0.1)"}`,
            color: (body.trim() || mediaFile) ? "#d4af37" : "rgba(212,175,55,0.25)",
          }}
        >
          {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
          {submitting ? "Posting..." : "Post"}
        </button>
      </div>
    </form>
  );
}
