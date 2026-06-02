"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/navigation/Header";
import { ArrowLeft, BookOpen, HelpCircle, ArrowRight, Heart, Sparkles } from "lucide-react";
import { useEffect } from "react";
import gsap from "gsap";
import { FRUITS_DATA } from "@/lib/contentData";

export default function FruitPage() {
  const params = useParams();
  const slugArr = (params?.slug as string[]) || [];
  const key = slugArr.join("/");

  useEffect(() => {
    gsap.fromTo(
      ".fade-up-element",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.15 }
    );
  }, [key]);

  // Case 1: Overview Dashboard (/fruit)
  if (slugArr.length === 0) {
    const mainFruits = [
      { id: "yoga", title: "Yoga (Four Paths)", code: "F1", desc: "Karma, Jnana, Bhakti, and Raja yoga as paths of action, knowledge, emotion, and concentration.", color: "from-amber-600/10 to-yellow-800/5", q: "How do we channel our energy and intellect into liberation?" },
      { id: "yoga-practices", title: "Yoga Practices", code: "F2", desc: "Asanas, Pranayama, and Dhyana to still the mind-field and somatic fluctuations.", color: "from-yellow-500/10 to-amber-700/5", q: "How do we prepare the body and mind for deep silence?" },
      { id: "moksha-nirvana", title: "Moksha / Nirvana", code: "F3", desc: "Jivanmukti (living freedom), Bodhisattva ideals, and examples of enlightened beings.", color: "from-amber-700/10 to-orange-800/5", q: "What is the nature of absolute liberation?" },
      { id: "medicine", title: "Acceptance in Medicine", code: "F4", desc: "Mindfulness, MBCT, and CBT techniques as clinical applications of self-distancing.", color: "from-rose-500/10 to-red-600/5", q: "How does modern science apply contemplative tools to mental health?" },
      { id: "meditation", title: "Meditation Portal", code: "F5", desc: "Vipassana, Shikantaza (just sitting), and direct path non-dual meditations.", color: "from-orange-500/10 to-amber-600/5", q: "Which meditation method fits your current state?" },
      { id: "reading-paths", title: "Reading Paths", code: "F6", desc: "Curated book lists for beginners, science backgrounds, and advanced philosophical seekers.", color: "from-yellow-600/10 to-yellow-700/5", q: "How do you navigate this vast literature systematically?" },
      { id: "self-inquiry", title: "Guided Self-Inquiry", code: "F7", desc: "Step-by-step guidance to trace the I-thought back to its silent source.", color: "from-amber-500/10 to-yellow-600/5", q: "Can we trace the sense of being back to its source right now?" },
      { id: "playlists", title: "Video Playlists", code: "F8", desc: "Curated YouTube playlists containing lectures, direct pointers, and scientific debates.", color: "from-yellow-500/10 to-amber-700/5", q: "What are the key audio-visual lectures and debates to watch?" },
      { id: "journaling", title: "Journaling Prompts", code: "F9", desc: "Contemplative prompts to deconstruct personal identity, womb awareness, and sleep.", color: "from-amber-700/10 to-orange-800/5", q: "What questions can you write about to dismantle your ego assumptions?" }
    ];

    return (
      <div className="relative min-h-screen bg-cosmic-dark text-gold-light pb-24 font-sans">
        <Header />
        <section className="relative pt-32 pb-12 px-6 md:px-12 max-w-6xl mx-auto text-center overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-matte/5 blur-3xl pointer-events-none" />
          <span className="fade-up-element text-xs uppercase tracking-widest text-gold-bright mb-2 block font-serif">HARVESTING THE REALIZATION</span>
          <h1 className="fade-up-element font-serif text-4xl md:text-6xl text-gold-bright tracking-wide mb-6 leading-tight font-light">
            The Fruits Layer
          </h1>
          <p className="fade-up-element max-w-2xl mx-auto text-sm md:text-base text-gold-matte/80 leading-relaxed font-light mb-12">
            What the tree produces. Not dry academic information, but practical transformation, practices, reading paths, and tools to integrate realization.
          </p>
        </section>

        <main className="px-6 md:px-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainFruits.map((fruit) => (
            <Link
              key={fruit.id}
              href={`/fruit/${fruit.id}`}
              className={`fade-up-element group glass-panel glass-panel-hover p-6 rounded-2xl border border-gold-matte/15 bg-gradient-to-br ${fruit.color} flex flex-col justify-between h-72`}
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-serif text-xs border border-gold-matte/30 px-2 py-0.5 rounded text-gold-matte group-hover:border-gold-bright group-hover:text-gold-bright transition-colors">
                    {fruit.code}
                  </span>
                  <Heart className="w-4 h-4 text-gold-matte/40 group-hover:text-gold-bright group-hover:scale-110 transition-all" />
                </div>
                <h3 className="font-serif text-xl text-gold-bright mb-2">
                  {fruit.title}
                </h3>
                <p className="text-[11px] text-gold-matte/60 uppercase tracking-wider mb-3 italic">
                  &ldquo;{fruit.q}&rdquo;
                </p>
                <p className="text-xs text-gold-light/75 leading-relaxed font-light">
                  {fruit.desc}
                </p>
              </div>
              <span className="text-[10px] text-gold-bright font-semibold uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-all mt-4">
                Explore practice <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </main>

        <div className="fixed bottom-6 right-6 z-30">
          <Link href="/" className="flex items-center gap-2 px-5 py-3 rounded-full border border-gold-matte/40 bg-cosmic-deep/90 hover:bg-gold-matte/15 hover:border-gold-bright hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] text-xs text-gold-light uppercase font-serif tracking-widest transition-all">
            <ArrowLeft className="w-4 h-4 text-gold-bright" />
            The Trunk
          </Link>
        </div>
      </div>
    );
  }

  // Look up node data
  const data = FRUITS_DATA[key];
  if (!data) {
    notFound();
  }

  const parentId = slugArr[0];

  return (
    <div className="relative min-h-screen bg-cosmic-dark text-gold-light pb-24 font-sans">
      <Header />

      {/* Hero Header */}
      <section className="relative pt-32 pb-12 px-6 md:px-12 max-w-5xl mx-auto border-b border-gold-matte/10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-matte/5 blur-3xl pointer-events-none" />

        <div className="fade-up-element flex flex-wrap items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest text-gold-matte mb-4">
          <Link href="/" className="hover:text-gold-bright flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> THE TRUNK
          </Link>
          <span>/</span>
          <Link href="/fruit" className="hover:text-gold-bright transition-colors">
            FRUITS
          </Link>
          <span>/</span>
          <span className="text-gold-bright">{parentId.toUpperCase()}</span>
          <span>/</span>
          <span>{data.code}</span>
        </div>

        <h1 className="fade-up-element font-serif text-4xl md:text-6xl text-gold-bright tracking-wide mb-6 leading-tight font-light">
          {data.title}
        </h1>

        <div className="fade-up-element relative glass-panel rounded-2xl p-6 md:p-8 max-w-4xl border-l-4 border-l-gold-matte">
          <HelpCircle className="absolute right-6 top-6 w-8 h-8 text-gold-matte/15" />
          <span className="text-[10px] uppercase font-bold tracking-widest text-gold-matte/60 block mb-2">
            The Core Inquiry
          </span>
          <p className="font-serif text-lg md:text-2xl text-gold-light/95 leading-relaxed font-light italic mb-4">
            &ldquo;{data.question}&rdquo;
          </p>
          <Link
            href={`/sage?query=${encodeURIComponent(`Tell me about the core inquiry of ${data.title}: "${data.question}"`)}`}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold-matte/30 bg-gold-matte/5 hover:bg-gold-matte/15 hover:border-gold-bright text-[10px] text-gold-light uppercase font-mono tracking-widest transition-all"
          >
            <Sparkles className="w-3 h-3 text-gold-bright" />
            Chat with Sage
          </Link>
        </div>
      </section>

      {/* Main Content & Sub-sections */}
      <main className="px-6 md:px-12 max-w-5xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Deep Content Sections */}
        <div className="lg:col-span-2 flex flex-col gap-12">
          <div className="fade-up-element">
            <h3 className="text-xs uppercase tracking-wider text-gold-matte font-bold mb-3">Scope of Investigation</h3>
            <p className="text-sm md:text-base text-gold-light/80 leading-relaxed font-light whitespace-pre-line">
              {data.scope}
            </p>
          </div>

          {data.subsections.map((sub, index) => (
            <article key={index} className="fade-up-element scroll-mt-28 border-l-2 border-gold-matte/10 pl-6 py-1 hover:border-gold-matte/40 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-serif text-[10px] border border-gold-matte/30 px-2 py-0.5 rounded text-gold-matte">
                  0{index + 1}
                </span>
                <h2 className="font-serif text-xl md:text-2xl text-gold-bright tracking-wide">
                  {sub.title}
                </h2>
              </div>
              <p className="text-xs md:text-sm text-gold-light/80 leading-relaxed font-light whitespace-pre-line">
                {sub.desc}
              </p>
            </article>
          ))}
        </div>

        {/* Right Column: Thinkers & Readings */}
        <div className="flex flex-col gap-8">
          {/* Thinkers List */}
          <div className="fade-up-element glass-panel p-5 rounded-2xl border border-gold-matte/15">
            <h3 className="font-serif text-base text-gold-bright mb-4 flex items-center gap-2 pb-2 border-b border-gold-matte/10">
              <BookOpen className="w-4 h-4" /> Key Thinkers
            </h3>
            <div className="flex flex-col gap-2 text-xs">
              {data.thinkers.map((thinkerName, i) => {
                const thinkerKey = thinkerName.toLowerCase()
                  .replace("adi ", "")
                  .replace("swami ", "")
                  .replace("dr. ", "")
                  .replace(" maharshi", "")
                  .replace(" maharaj", "")
                  .replace(" paramahamsa", "")
                  .replace("gautama ", "")
                  .trim();

                return (
                  <Link
                    key={i}
                    href={`/leaves/${thinkerKey}`}
                    className="flex justify-between items-center p-2 rounded-lg hover:bg-gold-matte/5 group"
                  >
                    <span className="text-gold-light font-semibold group-hover:text-gold-bright transition-colors">{thinkerName}</span>
                    <span className="text-[9px] text-gold-matte/60 border border-gold-matte/20 group-hover:border-gold-matte group-hover:text-gold-bright px-1.5 py-0.5 rounded transition-all">
                      Profile
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Reading List */}
          <div className="fade-up-element glass-panel p-5 rounded-2xl border border-gold-matte/15">
            <h3 className="font-serif text-base text-gold-bright mb-4 flex items-center gap-2 pb-2 border-b border-gold-matte/10">
              <BookOpen className="w-4 h-4" /> Recommended Readings
            </h3>
            <div className="flex flex-col gap-4">
              {data.readings.map((reading, i) => (
                <div key={i} className={i !== data.readings.length - 1 ? "border-b border-gold-matte/5 pb-3" : ""}>
                  <span className="text-xs font-semibold text-gold-light block">{reading.title}</span>
                  <span className="text-[10px] text-gold-matte/60 block">{reading.author}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Convergence Bridge / Cross Links */}
      <section className="fade-up-element mt-16 px-6 md:px-12 max-w-5xl mx-auto border-t border-gold-matte/10 pt-12">
        <h3 className="font-serif text-lg text-gold-bright mb-6 text-center tracking-wide">
          Traverse the Convergence Paths
        </h3>
        <div className="max-w-2xl mx-auto">
          <Link href={data.bridge.path} className="group glass-panel glass-panel-hover p-6 rounded-2xl border border-gold-matte/15 flex flex-col justify-between">
            <div>
              <span className="text-[9px] uppercase font-bold tracking-widest text-gold-matte/60 block mb-1">
                Cross-link Bridge
              </span>
              <h4 className="font-serif text-base md:text-lg text-gold-bright group-hover:text-gold-bright transition-colors mb-2">
                {data.bridge.name}
              </h4>
              <p className="text-xs text-gold-light/80 leading-relaxed font-light mb-4">
                {data.bridge.desc}
              </p>
            </div>
            <span className="text-[10px] text-gold-bright font-semibold uppercase tracking-wider flex items-center gap-1 mt-2">
              Cross over the bridge <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </section>

      {/* Floating Back to Tree Anchor */}
      <div className="fixed bottom-6 right-6 z-30">
        <Link href="/" className="flex items-center gap-2 px-5 py-3 rounded-full border border-gold-matte/40 bg-cosmic-deep/90 hover:bg-gold-matte/15 hover:border-gold-bright hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] text-xs text-gold-light uppercase font-serif tracking-widest transition-all">
          <ArrowLeft className="w-4 h-4 text-gold-bright" />
          The Tree Map
        </Link>
      </div>
    </div>
  );
}
