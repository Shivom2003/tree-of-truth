"use client";

// components/auth/AuthModal.tsx
// Glassmorphic authentication modal — Email/Password + Google OAuth

import { useState, useEffect } from "react";
import { X, Mail, Lock, User, Eye, EyeOff, Loader2, Globe } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";

interface AuthModalProps {
  mode: "login" | "signup";
  onClose: () => void;
  onModeChange: (m: "login" | "signup") => void;
}

export default function AuthModal({ mode, onClose, onModeChange }: AuthModalProps) {
  const { signIn, signUp, signInWithGoogle } = useAuth();

  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [name, setName]           = useState("");
  const [showPass, setShowPass]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [gLoading, setGLoading]   = useState(false);
  const [error, setError]         = useState("");
  const [mounted, setMounted]     = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Clear error when switching modes
  useEffect(() => { setError(""); }, [mode]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const friendlyError = (code: string) => {
    const map: Record<string, string> = {
      "auth/invalid-email":            "That doesn't look like a valid email address.",
      "auth/user-not-found":           "No account found with that email.",
      "auth/wrong-password":           "Incorrect password. Try again.",
      "auth/email-already-in-use":     "An account with this email already exists.",
      "auth/weak-password":            "Password must be at least 6 characters.",
      "auth/popup-closed-by-user":     "Google sign-in was cancelled.",
      "auth/network-request-failed":   "Network error. Check your connection.",
      "auth/too-many-requests":        "Too many attempts. Please wait a moment.",
    };
    return map[code] ?? "Something went wrong. Please try again.";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "login") {
        await signIn(email, password);
      } else {
        if (!name.trim()) { setError("Please enter your name."); setLoading(false); return; }
        await signUp(email, password, name.trim());
      }
      onClose();
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      setError(friendlyError(code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setGLoading(true);
    try {
      await signInWithGoogle();
      onClose();
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      setError(friendlyError(code));
    } finally {
      setGLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(5,6,11,0.85)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl overflow-hidden"
        style={{
          background: "rgba(10,13,26,0.95)",
          border: "1px solid rgba(212,175,55,0.2)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.6), 0 0 80px rgba(212,175,55,0.05)",
          transform: mounted ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
          transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease",
          opacity: mounted ? 1 : 0,
        }}
      >
        {/* Gold top accent bar */}
        <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, #d4af37, transparent)" }} />

        {/* Header */}
        <div className="px-8 pt-8 pb-4 text-center relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 w-8 h-8 rounded-full flex items-center justify-center text-gold-matte/40 hover:text-gold-matte hover:bg-gold-matte/10 transition-all"
          >
            <X className="w-4 h-4" />
          </button>

          <div
            className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)" }}
          >
            <span className="text-xl">🕉️</span>
          </div>
          <h2 className="font-serif text-xl text-gold-bright mb-1">
            {mode === "login" ? "Welcome Back, Seeker" : "Join the Seeker Circle"}
          </h2>
          <p className="text-[11px] text-gold-matte/50 font-light">
            {mode === "login"
              ? "Continue your inquiry where you left off"
              : "Begin your journey with fellow truth-seekers"}
          </p>
        </div>

        {/* Mode tabs */}
        <div className="mx-8 mb-6 flex rounded-xl overflow-hidden" style={{ border: "1px solid rgba(212,175,55,0.1)" }}>
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => onModeChange(m)}
              className="flex-1 py-2 text-[11px] font-mono tracking-widest uppercase transition-all duration-200"
              style={{
                background: mode === m ? "rgba(212,175,55,0.12)" : "transparent",
                color: mode === m ? "#d4af37" : "rgba(212,175,55,0.35)",
                borderRight: m === "login" ? "1px solid rgba(212,175,55,0.1)" : "none",
              }}
            >
              {m === "login" ? "Sign In" : "Register"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-3">
          {mode === "signup" && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-matte/30" />
              <input
                type="text"
                placeholder="Your name or alias"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-gold-light placeholder:text-gold-matte/25 outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(212,175,55,0.15)",
                  fontFamily: "var(--font-sans)",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.5)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.15)"; }}
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-matte/30" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-gold-light placeholder:text-gold-matte/25 outline-none transition-all"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(212,175,55,0.15)",
                fontFamily: "var(--font-sans)",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.5)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.15)"; }}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-matte/30" />
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-10 py-3 rounded-xl text-sm text-gold-light placeholder:text-gold-matte/25 outline-none transition-all"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(212,175,55,0.15)",
                fontFamily: "var(--font-sans)",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.5)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.15)"; }}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gold-matte/30 hover:text-gold-matte/60 transition-colors"
            >
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Error */}
          {error && (
            <p className="text-[11px] text-red-400/80 text-center px-2">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-mono text-[11px] tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2"
            style={{
              background: loading ? "rgba(212,175,55,0.1)" : "rgba(212,175,55,0.15)",
              border: "1px solid rgba(212,175,55,0.3)",
              color: loading ? "rgba(212,175,55,0.4)" : "#d4af37",
            }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "rgba(212,175,55,0.22)"; }}
            onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = "rgba(212,175,55,0.15)"; }}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              mode === "login" ? "Enter the Seeker Circle" : "Begin the Journey"
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 py-1">
            <div className="flex-1 h-px" style={{ background: "rgba(212,175,55,0.1)" }} />
            <span className="text-[10px] text-gold-matte/30 font-mono">OR</span>
            <div className="flex-1 h-px" style={{ background: "rgba(212,175,55,0.1)" }} />
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={gLoading}
            className="w-full py-3 rounded-xl font-mono text-[11px] tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(243,229,171,0.6)",
            }}
            onMouseEnter={(e) => { if (!gLoading) e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; }}
            onMouseLeave={(e) => { if (!gLoading) e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
          >
            {gLoading
              ? <Loader2 className="w-4 h-4 animate-spin" />
              : <Globe className="w-4 h-4" />
            }
            Continue with Google
          </button>

          {/* Switch mode */}
          <p className="text-center text-[10px] text-gold-matte/35 pt-1">
            {mode === "login" ? (
              <>
                New to the Seeker Circle?{" "}
                <button
                  type="button"
                  onClick={() => onModeChange("signup")}
                  className="text-gold-matte/70 hover:text-gold-matte underline underline-offset-2 transition-colors"
                >
                  Create an account
                </button>
              </>
            ) : (
              <>
                Already a member?{" "}
                <button
                  type="button"
                  onClick={() => onModeChange("login")}
                  className="text-gold-matte/70 hover:text-gold-matte underline underline-offset-2 transition-colors"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
