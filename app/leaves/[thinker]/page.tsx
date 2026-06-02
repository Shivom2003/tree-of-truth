"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/navigation/Header";
import { ArrowLeft, BookOpen, Quote, Network, Cpu, Lightbulb, Leaf } from "lucide-react";
import { useEffect } from "react";
import gsap from "gsap";
import { THINKERS_DATA } from "@/lib/contentData";
import RelatedMedia from "@/components/library/RelatedMedia";

// ─── Color map (thinker ID → hex color) ─────────────────────────────────────
const COLOR_MAP: Record<string, string> = {
  shankaracharya: "#e11d48",
  ramana: "#0284c7",
  nisargadatta: "#0284c7",
  buddha: "#d946ef",
  nagarjuna: "#d946ef",
  patanjali: "#0d9488",
  ramakrishna: "#0d9488",
  vivekananda: "#e11d48",
  faggin: "#34d399",
  hoffman: "#34d399",
  kastrup: "#f43f5e",
  chalmers: "#f43f5e",
  goff: "#f43f5e",
  koch: "#94a3b8",
  chopra: "#94a3b8",
  metzinger: "#94a3b8",
  sarvapriyananda: "#e11d48",
  spira: "#0284c7",
  lucille: "#0284c7",
  kanojia: "#94a3b8",
  krishna: "#f59e0b",
  jesus: "#a78bfa",
  papaji: "#0284c7",
  aurobindo: "#10b981",
  williamjames: "#34d399",
  laotzu: "#a3e635",
  krishnamurti: "#0284c7",
  watts: "#0284c7",
  bohm: "#ec407a",
};

// ─── Spectrum percent map (0 = Roots, 100 = Branches) ───────────────────────
const SPECTRUM_MAP: Record<string, number> = {
  krishna: 2, jesus: 5, shankaracharya: 3, buddha: 8, nagarjuna: 10, patanjali: 15,
  ramakrishna: 18, williamjames: 55, vivekananda: 25, aurobindo: 35,
  ramana: 5, nisargadatta: 5, papaji: 8,
  laotzu: 6, krishnamurti: 14, watts: 30, bohm: 75,
  faggin: 68, chopra: 50, hoffman: 72, metzinger: 60,
  chalmers: 85, kastrup: 62, goff: 78, koch: 88,
  sarvapriyananda: 18, spira: 22, lucille: 12, kanojia: 58,
};

// ─────────────────────────────────────────────────────────────────────────────

export default function ThinkerLeafPage() {
  const params = useParams();
  const thinker = (params?.thinker as string)?.toLowerCase() || "";
  const data = THINKERS_DATA[thinker];
  const color = (data?.color ?? COLOR_MAP[thinker]) || "#d4af37";
  const spectrumPct = data?.spectrumPercent ?? SPECTRUM_MAP[thinker] ?? 50;

  useEffect(() => {
    if (data) {
      gsap.fromTo(
        ".fade-up",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", stagger: 0.13 }
      );
    }
  }, [thinker, data]);

  // ── 404 State ──────────────────────────────────────────────────────────────
  if (!data) {
    return (
      <div className="relative min-h-screen bg-[#05060b] text-[#f3e5ab] pb-24">
        <Header />
        <section className="relative pt-36 pb-16 px-6 max-w-3xl mx-auto text-center">
          <Cpu className="w-12 h-12 text-[#d4af37]/40 mx-auto mb-6 animate-pulse" />
          <h1 className="font-serif text-4xl text-[#ffd700] tracking-wide mb-4">
            Profile Uncharted
          </h1>
          <p className="text-sm text-[#d4af37]/60 leading-relaxed mb-8">
            This thinker profile is currently being composed.
          </p>
          <Link
            href="/thinkers"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#d4af37]/25 hover:border-[#ffd700] text-xs uppercase tracking-widest text-[#f3e5ab] transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> All Thinkers
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#05060b] text-[#f3e5ab] pb-28">
      <Header />

      {/* ── Atmospheric hero gradient ─────────────────────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 h-[480px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% -10%, ${color}14 0%, transparent 70%)`,
        }}
      />

      <main className="relative pt-32 px-6 md:px-10 max-w-4xl mx-auto">

        {/* ── Breadcrumb ─────────────────────────────────────────────────────── */}
        <div className="fade-up flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] font-mono text-[#d4af37]/35 mb-10">
          <Link href="/" className="hover:text-[#d4af37] transition-colors">
            The Tree
          </Link>
          <span>/</span>
          <Link href="/thinkers" className="hover:text-[#d4af37] transition-colors">
            Thinkers
          </Link>
          <span>/</span>
          <span style={{ color }}>{thinker.toUpperCase()}</span>
        </div>

        {/* ── Hero card ──────────────────────────────────────────────────────── */}
        <div
          className="fade-up relative rounded-3xl border overflow-hidden mb-10"
          style={{ borderColor: `${color}20`, background: `linear-gradient(135deg, #07080f, #05060b)` }}
        >
          {/* Corner accent */}
          <div
            className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
            style={{
              background: `radial-gradient(circle at top right, ${color}12, transparent 60%)`,
            }}
          />
          <div className="relative px-7 py-8 md:px-10 md:py-10">
            <span
              className="text-[9px] font-mono tracking-[0.22em] uppercase block mb-2"
              style={{ color: `${color}80` }}
            >
              {data.spectrum}
            </span>
            <h1
              className="font-serif text-3xl md:text-5xl tracking-wide mb-2 leading-tight"
              style={{ color: "#ffd700" }}
            >
              {data.name}
            </h1>
            <p className="text-xs text-[#d4af37]/50 italic font-light mb-6">{data.era}</p>

            {/* Spectrum bar */}
            <div className="relative h-px bg-white/5 max-w-xs">
              <div
                className="absolute -top-[5px] w-3 h-3 rounded-full border-2 border-[#05060b] -translate-x-1/2"
                style={{
                  left: `${Math.min(Math.max(spectrumPct, 2), 98)}%`,
                  backgroundColor: color,
                  boxShadow: `0 0 8px ${color}`,
                }}
              />
              <span className="absolute left-0 top-3 text-[8px] font-mono text-white/15 tracking-widest">
                ROOTS
              </span>
              <span className="absolute right-0 top-3 text-[8px] font-mono text-white/15 tracking-widest">
                BRANCHES
              </span>
            </div>
          </div>
        </div>

        {/* ── Core question ──────────────────────────────────────────────────── */}
        <div className="fade-up border-l-2 pl-5 py-1 mb-10" style={{ borderColor: color }}>
          <span className="text-[8px] uppercase tracking-[0.2em] font-mono block mb-1.5" style={{ color: `${color}70` }}>
            The Core Question
          </span>
          <p className="font-serif text-lg md:text-xl text-[#f3e5ab] italic font-light leading-relaxed">
            &ldquo;{data.question}&rdquo;
          </p>
        </div>

        {/* ── Primary contribution + sidebar ──────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

          {/* Left column: contribution + works + key ideas */}
          <div className="md:col-span-2 flex flex-col gap-8">

            {/* Contribution */}
            <div className="fade-up">
              <h3
                className="text-[9px] uppercase tracking-[0.2em] font-mono font-bold mb-3"
                style={{ color }}
              >
                Primary Contribution
              </h3>
              <p className="text-sm text-[#f3e5ab]/75 leading-relaxed font-light">
                {data.contribution}
              </p>
            </div>

            {/* Key Ideas — if available */}
            {data.keyIdeas && data.keyIdeas.length > 0 && (
              <div className="fade-up">
                <h3
                  className="text-[9px] uppercase tracking-[0.2em] font-mono font-bold mb-3 flex items-center gap-1.5"
                  style={{ color }}
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  Key Ideas
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {data.keyIdeas.map((idea, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs text-[#f3e5ab]/65 leading-relaxed"
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: color, boxShadow: `0 0 4px ${color}` }}
                      />
                      {idea}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Works */}
            <div className="fade-up">
              <h3
                className="text-[9px] uppercase tracking-[0.2em] font-mono font-bold mb-3 flex items-center gap-1.5"
                style={{ color }}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Recommended Works
              </h3>
              <ul className="flex flex-col gap-2">
                {data.works.map((work, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-xs text-[#f3e5ab]/80 font-light leading-relaxed"
                  >
                    <Leaf
                      className="w-3 h-3 mt-0.5 shrink-0"
                      style={{ color, opacity: 0.5 }}
                    />
                    {work}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column: quote + connections */}
          <div className="flex flex-col gap-5">

            {/* Signature quote */}
            <div
              className="fade-up relative overflow-hidden rounded-2xl border p-6"
              style={{
                borderColor: `${color}15`,
                background: `linear-gradient(135deg, ${color}06, transparent)`,
              }}
            >
              <Quote
                className="absolute -right-3 -bottom-3 w-16 h-16 opacity-[0.04]"
                style={{ color }}
              />
              <span
                className="text-[8px] uppercase tracking-[0.2em] font-mono font-bold block mb-3"
                style={{ color: `${color}70` }}
              >
                Signature Quote
              </span>
              <p className="font-serif text-xs md:text-sm text-[#f3e5ab]/85 italic leading-relaxed">
                &ldquo;{data.quote}&rdquo;
              </p>
            </div>

            {/* Connections */}
            <div
              className="fade-up rounded-2xl border p-5"
              style={{ borderColor: `${color}15`, background: "#07080f" }}
            >
              <span
                className="text-[8px] uppercase tracking-[0.2em] font-mono font-bold flex items-center gap-1.5 mb-3"
                style={{ color: `${color}70` }}
              >
                <Network className="w-3 h-3" />
                Related Connections
              </span>
              <div className="flex flex-wrap gap-1.5">
                {data.connections.map((conn, i) => (
                  <span
                    key={i}
                    className="text-[9px] rounded border px-2 py-1 text-[#f3e5ab]/65 font-mono"
                    style={{ borderColor: `${color}18`, background: `${color}07` }}
                  >
                    {conn}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Additional quotes ─────────────────────────────────────────────── */}
        {data.additionalQuotes && data.additionalQuotes.length > 0 && (
          <div className="fade-up mb-10">
            <h3
              className="text-[9px] uppercase tracking-[0.2em] font-mono font-bold mb-5"
              style={{ color }}
            >
              Further Sayings
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.additionalQuotes.map((q, i) => (
                <div
                  key={i}
                  className="relative rounded-xl border px-5 py-4 italic text-xs text-[#f3e5ab]/60 leading-relaxed"
                  style={{ borderColor: `${color}10`, background: `${color}04` }}
                >
                  <Quote
                    className="absolute top-2 left-2 w-3 h-3 opacity-15"
                    style={{ color }}
                  />
                  <span className="pl-4 block">&ldquo;{q}&rdquo;</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Legacy ──────────────────────────────────────────────────────────── */}
        {data.legacy && (
          <div
            className="fade-up rounded-2xl border px-7 py-7 mb-6"
            style={{
              borderColor: `${color}15`,
              background: `linear-gradient(135deg, ${color}05, transparent)`,
            }}
          >
            <h3
              className="text-[9px] uppercase tracking-[0.2em] font-mono font-bold mb-4 flex items-center gap-1.5"
              style={{ color }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: color, boxShadow: `0 0 5px ${color}` }}
              />
              Legacy &amp; Influence
            </h3>
            <p className="text-sm text-[#f3e5ab]/65 leading-relaxed font-light">{data.legacy}</p>
          </div>
        )}

        {/* ── Related Media Widget ───────────────────────────────────────────── */}
        <RelatedMedia thinkerId={thinker} />
      </main>

      {/* ── Floating back button ─────────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-30 flex gap-2">
        <Link
          href="/thinkers"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#d4af37]/20 bg-[#08090f]/90 hover:border-[#d4af37]/50 text-[10px] text-[#f3e5ab] uppercase font-mono tracking-widest transition-all hover:shadow-[0_0_15px_rgba(212,175,55,0.1)]"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#d4af37]" />
          All Thinkers
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#d4af37]/20 bg-[#08090f]/90 hover:border-[#d4af37]/50 text-[10px] text-[#f3e5ab] uppercase font-mono tracking-widest transition-all hover:shadow-[0_0_15px_rgba(212,175,55,0.1)]"
        >
          The Tree
        </Link>
      </div>
    </div>
  );
}
