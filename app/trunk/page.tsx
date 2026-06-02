"use client";

import Link from "next/link";
import Header from "@/components/navigation/Header";
import { ArrowLeft, ArrowRight, Sparkles, BookOpen, Compass, ShieldAlert, Cpu } from "lucide-react";
import { useEffect, useState } from "react";
import gsap from "gsap";

export default function TrunkPage() {
  const [breathingText, setBreathingText] = useState("Breathe In");
  const [pulseScale, setPulseScale] = useState(1);

  useEffect(() => {
    // Fade-in animations
    gsap.fromTo(
      ".fade-up-element",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.15 }
    );

    // Breathing loop for contemplation module
    let step = 0;
    const interval = setInterval(() => {
      if (step === 0) {
        setBreathingText("Breathe In");
        setPulseScale(1.15);
        step = 1;
      } else if (step === 1) {
        setBreathingText("Hold");
        step = 2;
      } else if (step === 2) {
        setBreathingText("Breathe Out");
        setPulseScale(1);
        step = 3;
      } else {
        setBreathingText("Rest in Awareness");
        step = 0;
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const comparisons = [
    {
      rootTitle: "Advaita Vedanta (R1)",
      rootConcept: "Vivartavada & Adhyasa: The world is an apparent modification, and the separate ego is a superimposition on the one undivided Brahman.",
      branchTitle: "Analytical Idealism (B5)",
      branchConcept: "Universal mind: The physical world is the extrinsic appearance of mental processes. Individual minds are dissociated alters.",
      convergence: "Consciousness is the primary substrate of reality. Materiality is only how conscious processes look from the outside."
    },
    {
      rootTitle: "Buddhist Anatta (R2)",
      rootConcept: "The Five Aggregates: Subtraction of all physical and mental layers reveals that there is no permanent, independent self inside.",
      branchTitle: "Phenomenal Self-Model (B3)",
      branchConcept: "PSM Theory: The brain constructs a transparent model of a self, but there is no actual entity owning the model.",
      convergence: "The feeling of being a solid, separate entity is a constructed process rather than a standalone fact."
    },
    {
      rootTitle: "Direct Inquiry (R5)",
      rootConcept: "Atma Vichara: Trace the root 'I-thought' back to its silent source of pure, unattached awareness.",
      branchTitle: "The Hard Problem (B2)",
      branchConcept: "Qualia gap: Science can explain neural calculations (syntax) but not why they feel like anything from the inside (semantics).",
      convergence: "Subjectivity is irreducible. What science defines as the Hard Problem, direct inquiry enters as the Witness."
    },
    {
      rootTitle: "Shivom's Inquiry (R6)",
      rootConcept: "Congenital senselessness: Without sensory inputs, no mind or ego forms. Yet, life and awareness remain.",
      branchTitle: "AI Syntax vs. Semantics (B6)",
      branchConcept: "Symbol matchers: LLMs simulate intelligence by pattern optimization without experiencing any subjective awareness.",
      convergence: "Intelligence is constructed through data; awareness is the fundamental ground of experience prior to data."
    }
  ];

  return (
    <div className="relative min-h-screen bg-cosmic-dark text-gold-light pb-24 font-sans">
      <Header />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 px-6 md:px-12 max-w-5xl mx-auto text-center border-b border-gold-matte/10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-b from-gold-matte/5 to-transparent blur-3xl pointer-events-none" />
        
        <div className="fade-up-element flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-gold-matte mb-4">
          <Link href="/" className="hover:text-gold-bright transition-colors">THE TREE</Link>
          <span>/</span>
          <span className="text-gold-bright">THE TRUNK</span>
        </div>

        <h1 className="fade-up-element font-serif text-5xl md:text-7xl text-gold-bright tracking-wide mb-8 leading-tight font-light">
          The Trunk: Pure Awareness
        </h1>

        <div className="fade-up-element max-w-3xl mx-auto text-lg md:text-xl text-gold-light/90 leading-relaxed font-serif italic mb-8 border-l-4 border-r-4 border-gold-matte/20 px-8 py-4">
          &ldquo;What remains when everything that can be taken away, is taken away?&rdquo;
        </div>

        <p className="fade-up-element max-w-2xl mx-auto text-sm md:text-base text-gold-matte/80 leading-relaxed font-light">
          The Trunk is not a separate branch of information. It represents the unifying thread: the Subject of all inquiries. Here, the first-person insights of the ancient roots and the third-person measurements of the modern branches converge on the same singular territory.
        </p>
      </section>

      {/* Comparative Synthesis Grid */}
      <main className="px-6 md:px-12 max-w-5xl mx-auto mt-16">
        <div className="fade-up-element mb-12">
          <h2 className="font-serif text-2xl md:text-3xl text-gold-bright text-center tracking-wide mb-3">
            The Bridge of Convergence
          </h2>
          <p className="text-center text-xs text-gold-matte/70 uppercase tracking-widest font-semibold">
            Connecting the Soil (Contemplation) with the Sky (Science)
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {comparisons.map((item, idx) => (
            <article key={idx} className="fade-up-element glass-panel p-6 md:p-8 rounded-2xl border border-gold-matte/15 hover:border-gold-matte/35 transition-all">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Left Side: Ancient Root */}
                <div className="border-b md:border-b-0 md:border-r border-gold-matte/10 pb-4 md:pb-0 md:pr-6">
                  <span className="text-[10px] uppercase tracking-wider text-amber-500 font-bold flex items-center gap-1.5 mb-2">
                    <BookOpen className="w-3.5 h-3.5" /> Ancient Root Insight
                  </span>
                  <h4 className="font-serif text-lg text-gold-bright mb-2">{item.rootTitle}</h4>
                  <p className="text-xs text-gold-light/80 leading-relaxed font-light">{item.rootConcept}</p>
                </div>

                {/* Right Side: Modern Branch */}
                <div className="md:pl-2">
                  <span className="text-[10px] uppercase tracking-wider text-cyan-500 font-bold flex items-center gap-1.5 mb-2">
                    <Compass className="w-3.5 h-3.5" /> Modern Scientific Branch
                  </span>
                  <h4 className="font-serif text-lg text-gold-bright mb-2">{item.branchTitle}</h4>
                  <p className="text-xs text-gold-light/80 leading-relaxed font-light">{item.branchConcept}</p>
                </div>
              </div>

              {/* Bottom: The Convergence Point */}
              <div className="border-t border-gold-matte/10 pt-4 bg-gold-matte/5 -mx-6 -mb-6 md:-mx-8 md:-mb-8 p-4 md:px-8 rounded-b-2xl flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-gold-bright shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-gold-matte font-bold block mb-0.5">The Point of Convergence</span>
                  <p className="text-xs text-gold-bright font-light leading-relaxed">{item.convergence}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Contemplate the Witness Interactive Module */}
        <section className="fade-up-element mt-24 glass-panel rounded-3xl p-8 md:p-12 border border-gold-matte/20 text-center relative overflow-hidden bg-gradient-to-b from-cosmic-deep via-transparent to-transparent">
          <div className="absolute inset-0 bg-gold-matte/5 opacity-10 pointer-events-none" />
          
          <h3 className="font-serif text-2xl text-gold-bright mb-4 tracking-wide">
            Contemplating the Witness
          </h3>
          <p className="max-w-xl mx-auto text-xs text-gold-matte/80 leading-relaxed font-light mb-12">
            Rest your eyes on the pulsing center. Synchronize your breathing. Notice thoughts, labels, and sensations arising as objects within you. Do not suppress them; simply observe that the one witnessing them does not share their boundaries.
          </p>

          {/* Pulsing Breathing Circle */}
          <div className="relative w-48 h-48 mx-auto mb-12 flex items-center justify-center">
            <div 
              className="absolute w-40 h-40 rounded-full border border-gold-matte/30 bg-gold-matte/5 transition-transform duration-[4000ms] ease-in-out shadow-[0_0_30px_rgba(212,175,55,0.05)]"
              style={{ transform: `scale(${pulseScale})` }}
            />
            <div 
              className="absolute w-28 h-28 rounded-full border border-gold-bright/40 bg-gold-bright/5 transition-transform duration-[4000ms] ease-in-out shadow-[0_0_50px_rgba(255,215,0,0.1)]"
              style={{ transform: `scale(${pulseScale * 0.9})` }}
            />
            <span className="relative z-10 text-xs uppercase tracking-widest font-serif text-gold-light select-none font-semibold animate-pulse">
              {breathingText}
            </span>
          </div>

          <div className="max-w-md mx-auto text-center border-t border-gold-matte/10 pt-6">
            <span className="text-[10px] text-gold-matte/50 uppercase tracking-widest block mb-1">TRUNK INQUIRY POINTER</span>
            <p className="text-xs text-gold-light/70 font-light leading-relaxed italic">
              &ldquo;Thoughts come and go. Senses flare and fade. The Witness remains constant, registering their appearance, untouched by their disappearance.&rdquo;
            </p>
          </div>
        </section>

        {/* Traverse Navigation */}
        <section className="fade-up-element mt-24 flex flex-col sm:flex-row justify-center items-center gap-6">
          <Link
            href="/roots"
            className="group flex items-center justify-between gap-6 p-5 rounded-2xl border border-gold-matte/15 hover:border-gold-matte bg-cosmic-deep/50 hover:bg-gold-matte/10 w-full sm:w-72 transition-all"
          >
            <div>
              <span className="text-[8px] uppercase tracking-widest text-gold-matte/50 block font-bold mb-1">Down to Soil</span>
              <span className="font-serif text-sm text-gold-light group-hover:text-gold-bright transition-colors block">Explore the Roots</span>
            </div>
            <ArrowLeft className="w-5 h-5 text-gold-matte/60 group-hover:text-gold-bright group-hover:-translate-x-1 transition-all" />
          </Link>

          <Link
            href="/branches"
            className="group flex items-center justify-between gap-6 p-5 rounded-2xl border border-gold-matte/15 hover:border-gold-matte bg-cosmic-deep/50 hover:bg-gold-matte/10 w-full sm:w-72 transition-all"
          >
            <div>
              <span className="text-[8px] uppercase tracking-widest text-gold-matte/50 block font-bold mb-1">Up to Canopy</span>
              <span className="font-serif text-sm text-gold-light group-hover:text-gold-bright transition-colors block">Explore the Branches</span>
            </div>
            <ArrowRight className="w-5 h-5 text-gold-matte/60 group-hover:text-gold-bright group-hover:translate-x-1 transition-all" />
          </Link>
        </section>
      </main>

      <div className="fixed bottom-6 right-6 z-30">
        <Link href="/" className="flex items-center gap-2 px-5 py-3 rounded-full border border-gold-matte/40 bg-cosmic-deep/90 hover:bg-gold-matte/15 hover:border-gold-bright hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] text-xs text-gold-light uppercase font-serif tracking-widest transition-all">
          <ArrowLeft className="w-4 h-4 text-gold-bright" />
          The Tree Map
        </Link>
      </div>
    </div>
  );
}
