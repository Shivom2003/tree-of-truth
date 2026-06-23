"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/navigation/Header";
import { ArrowLeft, BookOpen, HelpCircle, ArrowRight, Compass, Sparkles } from "lucide-react";
import { useEffect } from "react";
import gsap from "gsap";
import { BRANCHES_DATA } from "@/lib/contentData";
import { TREE_NODES } from "@/lib/treeNodes";
import RelatedMedia from "@/components/library/RelatedMedia";

export default function BranchesPage() {
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

  // Case 1: Overview Dashboard (/branches)
  if (slugArr.length === 0) {
    const mainBranches = [
      { id: "neuroscience", title: "Neuroscience of Consciousness", code: "B1", desc: "NCC, Default Mode Network, the Binding Problem, and Global Workspace Theory.", color: "from-blue-500/10 to-indigo-600/5", q: "What does the brain do, and what does it fail to explain?" },
      { id: "philosophy", title: "Philosophy of Mind", code: "B2", desc: "The Hard Problem, Qualia, Philosophical Zombies, and Integrated Information Theory.", color: "from-indigo-500/10 to-purple-600/5", q: "Is consciousness fully explainable in physical terms?" },
      { id: "cognitive", title: "Cognitive Science", desc: "Embodied cognition, predictive processing, and the neural construction of the self.", code: "B3", color: "from-purple-500/10 to-pink-600/5", q: "How does the mind construct its model of reality?" },
      { id: "quantum", title: "Quantum Mind", code: "B4", desc: "The Observer Problem, Penrose-Hameroff (Orch-OR), Non-locality, and Interface Theory.", color: "from-pink-500/10 to-rose-600/5", q: "Does quantum mechanics have anything to say about the mind?" },
      { id: "panpsychism", title: "Panpsychism & Idealism", code: "B5", desc: "Galileo's Error, Philip Goff's panpsychism, and Bernardo Kastrup's Analytical Idealism.", color: "from-rose-500/10 to-red-600/5", q: "What if consciousness is not produced by matter, but is the ground of all reality?" },
      { id: "ai", title: "AI & Consciousness", code: "B6", desc: "The Chinese Room, intelligence vs. awareness, and comparing LLMs to human brains.", color: "from-cyan-500/10 to-blue-600/5", q: "Can a system that learns from data ever experience?" }
    ];

    return (
      <div className="relative min-h-screen bg-cosmic-dark text-gold-light pb-24 font-sans">
        <Header />
        <section className="relative pt-32 pb-12 px-6 md:px-12 max-w-6xl mx-auto text-center overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-matte/5 blur-3xl pointer-events-none" />
          <span className="fade-up-element text-xs uppercase tracking-widest text-gold-bright mb-2 block font-serif">NAVIGATING THE CANOPY</span>
          <h1 className="fade-up-element font-serif text-4xl md:text-6xl text-gold-bright tracking-wide mb-6 leading-tight font-light">
            The Branches Layer
          </h1>
          <p className="fade-up-element max-w-2xl mx-auto text-sm md:text-base text-gold-matte/80 leading-relaxed font-light mb-12">
            The scientific and philosophical traditions currently circling, from the outside, the same territory the ancients explored directly from the inside.
          </p>
        </section>

        <main className="px-6 md:px-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainBranches.map((branch) => (
            <Link
              key={branch.id}
              href={`/branches/${branch.id}`}
              className={`fade-up-element group glass-panel glass-panel-hover p-6 rounded-2xl border border-gold-matte/15 bg-gradient-to-br ${branch.color} flex flex-col justify-between h-72`}
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-serif text-xs border border-gold-matte/30 px-2 py-0.5 rounded text-gold-matte group-hover:border-gold-bright group-hover:text-gold-bright transition-colors">
                    {branch.code}
                  </span>
                  <Compass className="w-4 h-4 text-gold-matte/40 group-hover:text-gold-bright group-hover:scale-110 transition-all" />
                </div>
                <h3 className="font-serif text-xl text-gold-bright mb-2">
                  {branch.title}
                </h3>
                <p className="text-[11px] text-gold-matte/60 uppercase tracking-wider mb-3 italic">
                  &ldquo;{branch.q}&rdquo;
                </p>
                <p className="text-xs text-gold-light/75 leading-relaxed font-light">
                  {branch.desc}
                </p>
              </div>
              <span className="text-[10px] text-gold-bright font-semibold uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-all mt-4">
                Explore Branch <ArrowRight className="w-3.5 h-3.5" />
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
  const data = BRANCHES_DATA[key];
  if (!data) {
    notFound();
  }

  const node = TREE_NODES.find(n => n.path === `/branches/${key}`);
  const nodeId = node?.id;

  const isSubbranch = slugArr.length > 1;
  const parentId = slugArr[0];

  // Retrieve sibling offshoots if we are on a parent page (to allow sub-branch navigation)
  const subbranchKeys = Object.keys(BRANCHES_DATA).filter(
    (k) => k.startsWith(`${parentId}/`) && k.split("/").length === 2
  );

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
          <Link href="/branches" className="hover:text-gold-bright transition-colors">
            BRANCHES
          </Link>
          <span>/</span>
          {isSubbranch ? (
            <>
              <Link href={`/branches/${parentId}`} className="hover:text-gold-bright transition-colors">
                {parentId.toUpperCase()}
              </Link>
              <span>/</span>
              <span className="text-gold-bright">{slugArr[1].toUpperCase()}</span>
            </>
          ) : (
            <span className="text-gold-bright">{parentId.toUpperCase()}</span>
          )}
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

      {/* Main Philosophy & Sub-sections */}
      <main className="px-6 md:px-12 max-w-5xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Deep Content Sections */}
        <div className="lg:col-span-2 flex flex-col gap-12">
          <div className="fade-up-element">
            <h3 className="text-xs uppercase tracking-wider text-gold-matte font-bold mb-3">Scope of Investigation</h3>
            <p className="text-sm md:text-base text-gold-light/80 leading-relaxed font-light whitespace-pre-line">
              {data.scope}
            </p>
          </div>

          {/* Sub-branches navigation block if on parent branch page */}
          {!isSubbranch && subbranchKeys.length > 0 && (
            <div className="fade-up-element border-t border-b border-gold-matte/10 py-6 my-2">
              <h3 className="text-xs uppercase tracking-wider text-gold-bright font-bold mb-4 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Diversified Offshoots
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {subbranchKeys.map((subKey) => {
                  const subData = BRANCHES_DATA[subKey];
                  const subSlug = subKey.split("/")[1];
                  return (
                    <Link
                      key={subKey}
                      href={`/branches/${parentId}/${subSlug}`}
                      className="group p-4 rounded-xl border border-gold-matte/10 bg-gold-matte/5 hover:bg-gold-matte/10 hover:border-gold-matte transition-all flex justify-between items-center"
                    >
                      <div>
                        <span className="text-[9px] text-gold-matte/60 block font-serif uppercase tracking-widest">{subData.code}</span>
                        <span className="text-sm font-serif text-gold-light group-hover:text-gold-bright transition-colors block">{subData.title}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gold-matte/40 group-hover:text-gold-bright group-hover:translate-x-1 transition-all" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {data.subsections?.map((sub, index) => (
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

      {/* Related Media Section */}
      <div className="fade-up-element px-6 md:px-12 max-w-5xl mx-auto mt-6">
        <RelatedMedia nodeId={nodeId} />
      </div>

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
