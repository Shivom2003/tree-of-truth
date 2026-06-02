"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Header from "@/components/navigation/Header";
import StarField from "@/components/ui/StarField";
import { Sparkles, ArrowRight, Eye, Library, Compass, Leaf, Network } from "lucide-react";
import gsap from "gsap";

const TreeCanvas = dynamic(() => import("@/components/tree/TreeCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center text-gold-matte font-serif tracking-widest text-sm animate-pulse">
      COMMUNING WITH AWARENESS...
    </div>
  ),
});

const BanyanTree = dynamic(() => import("@/components/tree/BanyanTree"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center text-gold-matte font-serif tracking-widest text-sm animate-pulse">
      GROWING ORGANIC BANYAN...
    </div>
  ),
});

export default function HomePageClient() {
  const [hasEntered, setHasEntered] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("tree-entered") === "1";
    }
    return false;
  });
  const [viewMode, setViewMode] = useState<"constellation" | "banyan">("constellation");
  const [isLegendOpen, setIsLegendOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      ".intro-fade",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1.8, ease: "power2.out", stagger: 0.4 },
    );
  }, []);

  const handleEnter = () => {
    gsap.to(".intro-container", {
      opacity: 0,
      y: -30,
      duration: 1.2,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.set(".intro-container", { clearProps: "all" });
        setHasEntered(true);
        localStorage.setItem("tree-entered", "1");
        setTimeout(() => {
          gsap.fromTo(
            ".tree-controls-fade",
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          );
        }, 100);
      },
    });
  };

  return (
    <main
      className="relative flex flex-col min-h-screen overflow-hidden"
      style={{ backgroundColor: "#05060b" }}
    >
      {/* Twinkling star / dust particle field */}
      <StarField maxYFrac={hasEntered && viewMode === "banyan" ? 0.57 : 1} />

      {/* Navigation header — only after entry */}
      {hasEntered && <Header />}

      {/* Main experience area */}
      <div className="relative flex-1 w-full h-[78vh] md:h-[85vh] flex items-center justify-center">
        {!hasEntered ? (
          /* ── Contemplative Entry Screen ─────────────────────────── */
          <div className="intro-container z-20 flex flex-col items-center justify-center max-w-4xl px-6 text-center select-none">
            <div className="intro-fade mb-6 w-12 h-12 rounded-full border border-gold-matte/20 flex items-center justify-center bg-gold-matte/5">
              <Sparkles className="w-5 h-5 animate-pulse text-gold-matte" />
            </div>

            <h1 className="intro-fade font-serif text-3xl md:text-5xl lg:text-6xl leading-tight tracking-wide mb-8 font-light text-gold-light">
              &ldquo;What Am I &mdash; Qualia, Brahman, Neurons, or just Nothing?&rdquo;
            </h1>

            <p className="intro-fade max-w-lg text-sm md:text-base font-light leading-relaxed mb-12 italic text-gold-matte/70">
              Explore with us the profound intersection of modern branches of Science and Ancient Philosophical Truths.
            </p>

            <button
              onClick={handleEnter}
              className="intro-fade group relative px-8 py-3.5 overflow-hidden rounded-full border text-sm tracking-widest font-serif transition-all duration-300 border-gold-matte/40 bg-gold-matte/5 text-gold-light hover:border-gold-bright hover:bg-gold-matte/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.25)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                BEHOLD THE TREE
                <ArrowRight className="w-4 h-4 transition-all group-hover:translate-x-1 text-gold-matte group-hover:text-gold-bright" />
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-gold-matte/0 via-gold-matte/10 to-gold-matte/0" />
            </button>
          </div>
        ) : (
          /* ── Immersive Tree Views ────────────────────────────────── */
          <>
            <div
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                viewMode === "constellation" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}
            >
              <TreeCanvas />
            </div>
            <div
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                viewMode === "banyan" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}
            >
              <BanyanTree />
            </div>

            {/* View Mode Toggle Switch (Shifted to Top Right) */}
            <div className="tree-controls-fade absolute top-24 right-6 md:right-12 z-30 pointer-events-auto">
              <div className="flex items-center gap-1 p-1 rounded-full border backdrop-blur-md shadow-xl text-xs border-gold-matte/20 bg-cosmic-deep/85">
                <button
                  onClick={() => setViewMode("banyan")}
                  className={`px-3.5 py-1.5 rounded-full text-[9px] uppercase font-bold tracking-widest transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                    viewMode === "banyan"
                      ? "bg-gold-matte text-cosmic-dark font-extrabold shadow-[0_0_12px_rgba(212,175,55,0.45)]"
                      : "text-gold-light/60 hover:text-gold-light"
                  }`}
                >
                  <Leaf className="w-3.5 h-3.5" />
                  Organic Banyan
                </button>
                <button
                  onClick={() => setViewMode("constellation")}
                  className={`px-3.5 py-1.5 rounded-full text-[9px] uppercase font-bold tracking-widest transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                    viewMode === "constellation"
                      ? "bg-gold-matte text-cosmic-dark font-extrabold shadow-[0_0_12px_rgba(212,175,55,0.45)]"
                      : "text-gold-light/60 hover:text-gold-light"
                  }`}
                >
                  <Network className="w-3.5 h-3.5" />
                  3D Constellation
                </button>
              </div>
            </div>

            {/* UI Controls overlay */}
            <div className="tree-controls-fade absolute bottom-8 left-6 right-6 md:left-12 md:right-12 z-30 pointer-events-none flex flex-col md:flex-row md:items-end justify-between gap-4">
              {/* Legend */}
              <div className="pointer-events-auto">
                {!isLegendOpen ? (
                  <button
                    onClick={() => setIsLegendOpen(true)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full border backdrop-blur-md text-[10px] uppercase font-bold tracking-widest transition-all shadow-lg cursor-pointer border-gold-matte/20 bg-cosmic-deep/80 hover:bg-cosmic-deep/95 text-gold-light/90 hover:text-gold-bright hover:border-gold-matte/45"
                  >
                    <Library className="w-3.5 h-3.5 text-gold-bright animate-pulse" />
                    Navigation Legend
                  </button>
                ) : (
                  <div className="relative border backdrop-blur-md rounded-2xl p-5 w-80 shadow-2xl transition-all duration-500 bg-cosmic-deep/85 border-gold-matte/20 min-h-[350px] overflow-hidden">
                    <button
                      onClick={() => setIsLegendOpen(false)}
                      className="absolute top-3 right-3 z-10 transition-colors text-xs p-1 cursor-pointer font-bold text-gold-matte/60 hover:text-gold-bright"
                      aria-label="Close legend"
                    >
                      ✕
                    </button>

                    {/* Banyan Legend */}
                    <div
                      className={`transition-all duration-500 transform ${
                        viewMode === "banyan"
                          ? "opacity-100 translate-y-0 relative pointer-events-auto"
                          : "opacity-0 -translate-y-4 absolute top-5 left-5 right-5 pointer-events-none"
                      }`}
                    >
                      <span className="text-[9px] uppercase font-bold tracking-widest block mb-1 text-gold-matte/50">
                        Organic Banyan View
                      </span>
                      <h3 className="font-serif text-base mb-1.5 text-gold-bright">
                        Banyan Tree Architecture
                      </h3>
                      <p className="text-[11px] leading-relaxed font-light mb-3 text-gold-light/85">
                        An organic representation of knowledge. Ancient wisdom forms the soil roots, scientific logic forms the rising branches, and practices hang as harvestable fruit.
                      </p>
                      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[9px] font-semibold uppercase tracking-wider border-t pt-3 text-gold-matte/70 border-gold-matte/10">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                          Roots (Foundation)
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-white border border-gold-matte/30" />
                          Trunk (Convergence)
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-blue-400" />
                          Branches (Canopy)
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-orange-400" />
                          Fruits (Harvest)
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-lime-400" />
                          Sages (Leaves)
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-yellow-200 animate-pulse" />
                          Moksha (Apex)
                        </div>
                      </div>
                    </div>

                    {/* Constellation Legend */}
                    <div
                      className={`transition-all duration-500 transform ${
                        viewMode === "constellation"
                          ? "opacity-100 translate-y-0 relative pointer-events-auto"
                          : "opacity-0 translate-y-4 absolute top-5 left-5 right-5 pointer-events-none"
                      }`}
                    >
                      <span className="text-[9px] uppercase font-bold tracking-widest block mb-1 text-gold-matte/50">
                        3D Constellation View
                      </span>
                      <h3 className="font-serif text-base mb-1.5 text-gold-bright">
                        Celestial Constellation Map
                      </h3>
                      <p className="text-[11px] leading-relaxed font-light mb-3 text-gold-light/85">
                        A multidimensional galaxy of consciousness. Traverse gravity-linked nodes to trace specific lineages of ancient inquiry, modern science, and practice paths.
                      </p>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[8.5px] font-semibold uppercase tracking-wider border-t pt-3 text-gold-matte/70 border-gold-matte/10">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_4px_#fff]" />
                          Awareness (Core)
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-bright shadow-[0_0_6px_#ffd700]" />
                          Moksha (Apex)
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48]" />
                          Vedanta (Red)
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#d946ef]" />
                          Buddhism (Orchid)
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
                          Inquiry (Ocean)
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                          Shivom (Green)
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#d1d5db]" />
                          Phenom/Neuro (Silver)
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488]" />
                          Esoteric (Teal)
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1]" />
                          Phil/CogSci (Indigo)
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
                          Quantum (Mint)
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#f43f5e]" />
                          Panpsychism (Coral)
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9]" />
                          AI & Mind (Cyan)
                        </div>
                        <div className="flex items-center gap-1.5 col-span-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
                          Sages &amp; Thinkers (Lime)
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right side controls */}
              <div className="flex flex-col items-start md:items-end gap-3 pointer-events-auto">
                {/* Section quick-links */}
                <div className="flex flex-wrap gap-2 md:justify-end">
                  <Link
                    href="/roots"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] uppercase font-semibold tracking-wider border transition-all border-gold-matte/20 bg-cosmic-dark/50 hover:bg-gold-matte/15 hover:border-gold-matte text-gold-light/95"
                  >
                    <Eye className="w-3 h-3 text-gold-bright" />
                    Roots Soil
                  </Link>
                  <Link
                    href="/trunk"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] uppercase font-semibold tracking-wider border transition-all border-gold-matte/20 bg-cosmic-dark/50 hover:bg-gold-matte/15 hover:border-gold-matte text-gold-light/95"
                  >
                    <Sparkles className="w-3 h-3 text-white" />
                    Trunk Bridge
                  </Link>
                  <Link
                    href="/branches"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] uppercase font-semibold tracking-wider border transition-all border-gold-matte/20 bg-cosmic-dark/50 hover:bg-gold-matte/15 hover:border-gold-matte text-gold-light/95"
                  >
                    <Compass className="w-3.5 h-3.5 text-blue-400" />
                    Branches Canopy
                  </Link>
                  <Link
                    href="/fruit"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] uppercase font-semibold tracking-wider border transition-all border-gold-matte/20 bg-cosmic-dark/50 hover:bg-gold-matte/15 hover:border-gold-matte text-gold-light/95"
                  >
                    <Library className="w-3.5 h-3.5 text-orange-400" />
                    Fruit Harvest
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* SEO semantic footer */}
      <footer className="sr-only">
        <h2>Tree of Truth Site Map</h2>
        <ul>
          <li>
            <h3>Roots — Ancient Wisdom</h3>
            <ul>
              <li>
                <Link href="/roots/vedanta">Advaita Vedanta</Link>
              </li>
              <li>
                <Link href="/roots/buddhism">Buddhist Inquiry (No-Self)</Link>
              </li>
              <li>
                <Link href="/roots/inquiry">Direct Self-Inquiry</Link>
              </li>
              <li>
                <Link href="/roots/phenomenology">Phenomenology</Link>
              </li>
              <li>
                <Link href="/roots/esoteric">Esoteric &amp; Mystical States</Link>
              </li>
            </ul>
          </li>
          <li>
            <h3>Branches — Modern Science</h3>
            <ul>
              <li>
                <Link href="/branches/neuroscience">Neuroscience of Consciousness</Link>
              </li>
              <li>
                <Link href="/branches/philosophy">Philosophy of Mind &amp; The Hard Problem</Link>
              </li>
              <li>
                <Link href="/branches/cognitive">Cognitive Science &amp; Predictive Mind</Link>
              </li>
              <li>
                <Link href="/branches/quantum">Quantum Mechanics &amp; Observer</Link>
              </li>
              <li>
                <Link href="/branches/panpsychism">Panpsychism &amp; Analytical Idealism</Link>
              </li>
              <li>
                <Link href="/branches/ai">Artificial Intelligence &amp; Awareness</Link>
              </li>
            </ul>
          </li>
        </ul>
      </footer>
    </main>
  );
}
