"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Compass, Search, Sparkles, BookOpen, Heart, Landmark, Users, Brain } from "lucide-react";

interface SearchItem {
  name: string;
  path: string;
  category: string;
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [viewMode, setViewMode] = useState<"nav" | "map">("nav");
  const pathname = usePathname();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (!query) {
      setSearchResults([]);
      return;
    }

    const items: SearchItem[] = [
      // Trunk
      { name: "The Trunk (Pure Awareness)", path: "/trunk", category: "Trunk" },

      // Roots Overview
      { name: "The Root Layer (Overview)", path: "/roots", category: "Roots" },
      { name: "Vedanta Wisdom", path: "/roots/vedanta", category: "Roots" },
      { name: "Advaita Vedanta (Non-Duality)", path: "/roots/vedanta/advaita", category: "Roots" },
      { name: "Dvaita Vedanta (Duality)", path: "/roots/vedanta/dvaita", category: "Roots" },
      { name: "Samkhya Philosophy", path: "/roots/vedanta/sankhya", category: "Roots" },
      { name: "The Upanishads", path: "/roots/vedanta/upanishads", category: "Roots" },
      { name: "The Gitas (Ashtavakra, Bhagavad)", path: "/roots/vedanta/gitas", category: "Roots" },
      
      { name: "Buddhist Thought (Overview)", path: "/roots/buddhism", category: "Roots" },
      { name: "Anatta (No-Self)", path: "/roots/buddhism/annatta", category: "Roots" },
      { name: "Sunyata (Emptiness)", path: "/roots/buddhism/sunyata", category: "Roots" },
      { name: "Rigpa (Pure Awareness)", path: "/roots/buddhism/rigpa", category: "Roots" },

      { name: "Phenomenology (Overview)", path: "/roots/phenomenology", category: "Roots" },
      { name: "The Phenomenological Reduction (Epoché)", path: "/roots/phenomenology/reduction", category: "Roots" },
      { name: "Self as Construct (Ego Tunnel)", path: "/roots/phenomenology/self-construct", category: "Roots" },
      { name: "Pure Presence (Subjectivity)", path: "/roots/phenomenology/presence", category: "Roots" },

      { name: "Esoteric Realities (Overview)", path: "/roots/esoteric", category: "Roots" },
      { name: "Rebirth & Bardo States", path: "/roots/esoteric/rebirth", category: "Roots" },
      { name: "Subtle Body Map (Chakras)", path: "/roots/esoteric/subtle-body", category: "Roots" },
      { name: "Astral Travel & OBEs", path: "/roots/esoteric/astral-travel", category: "Roots" },
      { name: "Near-Death Experiences (NDEs)", path: "/roots/esoteric/ndes", category: "Roots" },
      { name: "Enlightenment & Mysticism", path: "/roots/esoteric/enlightenment", category: "Roots" },

      { name: "Direct Inquiry (Overview)", path: "/roots/inquiry", category: "Roots" },
      { name: "Self-Inquiry (Atma Vichara)", path: "/roots/inquiry/self-inquiry", category: "Roots" },
      { name: "Neti Neti Negation", path: "/roots/inquiry/neti-neti", category: "Roots" },
      { name: "The Witness (Sakshee)", path: "/roots/inquiry/witness", category: "Roots" },
      { name: "Who Am I? (Direct Pointer)", path: "/roots/inquiry/who-am-i", category: "Roots" },

      { name: "Shivom's Inquiry (Overview)", path: "/roots/shivom", category: "Roots" },
      { name: "Deep Sleep Argument", path: "/roots/shivom/deep-sleep", category: "Roots" },
      { name: "Congenital Sensory Impairment", path: "/roots/shivom/sensory-impairment", category: "Roots" },
      { name: "The Womb State", path: "/roots/shivom/womb", category: "Roots" },
      { name: "The Memory Loss Argument", path: "/roots/shivom/memory-loss", category: "Roots" },

      // Branches Overview
      { name: "The Branches Layer (Overview)", path: "/branches", category: "Branches" },
      { name: "Neuroscience of Consciousness", path: "/branches/neuroscience", category: "Branches" },
      { name: "Neural Correlates of Consciousness (NCC)", path: "/branches/neuroscience/ncc", category: "Branches" },
      { name: "Default Mode Network (DMN)", path: "/branches/neuroscience/dmn", category: "Branches" },
      { name: "The Binding Problem", path: "/branches/neuroscience/binding", category: "Branches" },
      { name: "Global Workspace Theory (GWT)", path: "/branches/neuroscience/global-workspace", category: "Branches" },

      { name: "Philosophy of Mind (Overview)", path: "/branches/philosophy", category: "Branches" },
      { name: "The Hard Problem of Consciousness", path: "/branches/philosophy/hard-problem", category: "Branches" },
      { name: "Qualia & Thought Experiments", path: "/branches/philosophy/qualia", category: "Branches" },
      { name: "Philosophical Zombies", path: "/branches/philosophy/zombies", category: "Branches" },
      { name: "Integrated Information Theory (IIT)", path: "/branches/philosophy/iit", category: "Branches" },

      { name: "Cognitive Science (Overview)", path: "/branches/cognitive", category: "Branches" },
      { name: "Embodied & Enacted Cognition", path: "/branches/cognitive/embodied", category: "Branches" },
      { name: "Self-Construction (Beast Machine)", path: "/branches/cognitive/self-construction", category: "Branches" },
      { name: "Predictive Processing Brain", path: "/branches/cognitive/predictive", category: "Branches" },

      { name: "Quantum Mind (Overview)", path: "/branches/quantum", category: "Branches" },
      { name: "The Observer Problem (Physics)", path: "/branches/quantum/observer", category: "Branches" },
      { name: "Penrose-Hameroff (Orch-OR)", path: "/branches/quantum/orch-or", category: "Branches" },
      { name: "Non-Locality & Entanglement", path: "/branches/quantum/non-locality", category: "Branches" },
      { name: "Interface Theory (Donald Hoffman)", path: "/branches/quantum/interface", category: "Branches" },

      { name: "Panpsychism & Idealism", path: "/branches/panpsychism", category: "Branches" },
      { name: "Analytical Idealism (Kastrup)", path: "/branches/panpsychism/idealism", category: "Branches" },
      { name: "Philip Goff & Panpsychism", path: "/branches/panpsychism/goff", category: "Branches" },
      { name: "David Chalmers on Panpsychism", path: "/branches/panpsychism/chalmers", category: "Branches" },
      { name: "Federico Faggin (Semantic Quantum)", path: "/branches/panpsychism/faggin", category: "Branches" },

      { name: "AI & Consciousness (Overview)", path: "/branches/ai", category: "Branches" },
      { name: "Intelligence vs. Awareness (LLMs)", path: "/branches/ai/learning-comparison", category: "Branches" },
      { name: "Syntax vs. Semantics (Chinese Room)", path: "/branches/ai/experience", category: "Branches" },

      // Fruits
      { name: "The Fruits Layer (Overview)", path: "/fruit", category: "Fruit" },
      { name: "Yoga (Four Paths)", path: "/fruit/yoga", category: "Fruit" },
      { name: "Yoga Practices (Asanas, Pranayama)", path: "/fruit/yoga-practices", category: "Fruit" },
      { name: "Moksha / Nirvana (Liberation)", path: "/fruit/moksha-nirvana", category: "Fruit" },
      { name: "Acceptance in Medicine (MBSR/CBT)", path: "/fruit/medicine", category: "Fruit" },
      { name: "Meditation Portal", path: "/fruit/meditation", category: "Fruit" },
      { name: "Reading Paths", path: "/fruit/reading-paths", category: "Fruit" },
      { name: "Guided Self-Inquiry Practice", path: "/fruit/self-inquiry", category: "Fruit" },
      { name: "Video Playlists Archive", path: "/fruit/playlists", category: "Fruit" },
      { name: "Contemplative Journaling Prompts", path: "/fruit/journaling", category: "Fruit" },

      // Thinker Leaves
      { name: "Adi Shankaracharya", path: "/leaves/shankaracharya", category: "Leaves" },
      { name: "Ramana Maharshi", path: "/leaves/ramana", category: "Leaves" },
      { name: "Nisargadatta Maharaj", path: "/leaves/nisargadatta", category: "Leaves" },
      { name: "Gautama Buddha", path: "/leaves/buddha", category: "Leaves" },
      { name: "Nagarjuna", path: "/leaves/nagarjuna", category: "Leaves" },
      { name: "Patanjali", path: "/leaves/patanjali", category: "Leaves" },
      { name: "Ramakrishna Paramahamsa", path: "/leaves/ramakrishna", category: "Leaves" },
      { name: "Swami Vivekananda", path: "/leaves/vivekananda", category: "Leaves" },
      { name: "Federico Faggin", path: "/leaves/faggin", category: "Leaves" },
      { name: "Donald Hoffman", path: "/leaves/hoffman", category: "Leaves" },
      { name: "Bernardo Kastrup", path: "/leaves/kastrup", category: "Leaves" },
      { name: "David Chalmers", path: "/leaves/chalmers", category: "Leaves" },
      { name: "Philip Goff", path: "/leaves/goff", category: "Leaves" },
      { name: "Christof Koch", path: "/leaves/koch", category: "Leaves" },
      { name: "Deepak Chopra", path: "/leaves/chopra", category: "Leaves" },
      { name: "Thomas Metzinger", path: "/leaves/metzinger", category: "Leaves" },
      { name: "Swami Sarvapriyananda", path: "/leaves/sarvapriyananda", category: "Leaves" },
      { name: "Rupert Spira", path: "/leaves/spira", category: "Leaves" },
      { name: "Francis Lucille", path: "/leaves/lucille", category: "Leaves" },
      { name: "Dr. Alok Kanojia (HealthyGamer)", path: "/leaves/kanojia", category: "Leaves" },
      { name: "Krishna", path: "/leaves/krishna", category: "Leaves" },
      { name: "Jesus of Nazareth", path: "/leaves/jesus", category: "Leaves" },
      { name: "H.W.L. Poonja (Papaji)", path: "/leaves/papaji", category: "Leaves" },
      { name: "Sri Aurobindo", path: "/leaves/aurobindo", category: "Leaves" },
      { name: "William James", path: "/leaves/williamjames", category: "Leaves" },
      { name: "Lao Tzu", path: "/leaves/laotzu", category: "Leaves" },
      { name: "Jiddu Krishnamurti", path: "/leaves/krishnamurti", category: "Leaves" },
      { name: "Alan Watts", path: "/leaves/watts", category: "Leaves" },
      { name: "David Bohm", path: "/leaves/bohm", category: "Leaves" },
    ];

    const filtered = items.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered.slice(0, 5));
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b py-4 px-6 md:px-12 flex items-center justify-between transition-colors duration-500 bg-cosmic-dark/30 border-gold-matte/10">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 border-gold-matte/40 bg-gold-matte/10 group-hover:border-gold-bright">
            <Sparkles className="w-4 h-4 transition-colors text-gold-matte group-hover:text-gold-bright" />
          </div>
          <span className="font-serif text-lg md:text-xl tracking-widest transition-colors text-gold-light group-hover:text-gold-bright">
            TREE OF TRUTH
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-[11px] uppercase tracking-[0.18em] font-serif">
          {pathname !== "/" && (
            <Link
              href="/"
              className="flex items-center gap-1.5 text-gold-matte/70 hover:text-gold-bright transition-colors text-[10px]"
              title="Back to the Tree Map"
            >
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Tree
            </Link>
          )}
          <Link href="/" className={`transition-colors hover:drop-shadow-[0_0_6px_rgba(255,215,0,0.6)] ${pathname === "/" ? "text-gold-bright" : "text-gold-light/75 hover:text-gold-bright"}`}>The Tree</Link>
          <Link href="/thinkers" className={`transition-colors hover:drop-shadow-[0_0_6px_rgba(255,215,0,0.6)] ${pathname.startsWith("/thinkers") ? "text-gold-bright" : "text-gold-light/75 hover:text-gold-bright"}`}>Thinkers</Link>
          <Link href="/library" className={`transition-colors hover:drop-shadow-[0_0_6px_rgba(255,215,0,0.6)] ${pathname.startsWith("/library") ? "text-gold-bright" : "text-gold-light/75 hover:text-gold-bright"}`}>Library</Link>
          <Link href="/community" className={`transition-colors hover:drop-shadow-[0_0_6px_rgba(255,215,0,0.6)] ${pathname.startsWith("/community") ? "text-gold-bright" : "text-gold-light/75 hover:text-gold-bright"}`}>Community</Link>
          <Link href="/sage" className={`transition-colors hover:drop-shadow-[0_0_6px_rgba(255,215,0,0.6)] ${pathname.startsWith("/sage") ? "text-gold-bright" : "text-gold-light/75 hover:text-gold-bright"}`}>Sage</Link>
          <Link href="/paths" className={`transition-colors hover:drop-shadow-[0_0_6px_rgba(255,215,0,0.6)] ${pathname.startsWith("/paths") ? "text-gold-bright" : "text-gold-light/75 hover:text-gold-bright"}`}>Paths</Link>
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Search Box */}
          <div className="relative hidden sm:block">
            <div className="flex items-center border rounded-full px-3 py-1.5 transition-all w-48 focus-within:w-64 bg-cosmic-dark/80 border-gold-matte/20 focus-within:border-gold-matte">
              <Search className="w-4 h-4 mr-2 text-gold-matte/60" />
              <input
                type="text"
                placeholder="Search the tree..."
                value={searchQuery}
                onChange={handleSearch}
                className="bg-transparent text-xs outline-none w-full text-gold-light placeholder-gold-matte/40"
              />
            </div>
            {searchResults.length > 0 && (
              <div className="absolute right-0 mt-2 w-72 glass-panel rounded-xl p-2 z-50">
                <div className="text-[10px] uppercase tracking-wider text-gold-matte/50 px-3 py-1 border-b border-gold-matte/10 font-serif">
                  Search Results
                </div>
                <div className="mt-1 flex flex-col gap-0.5">
                  {searchResults.map((result, idx) => (
                    <Link
                      key={idx}
                      href={result.path}
                      onClick={() => { setSearchQuery(""); setSearchResults([]); }}
                      className="flex justify-between items-center px-3 py-2 rounded-lg hover:bg-gold-matte/10 text-xs text-gold-light transition-colors"
                    >
                      <span>{result.name}</span>
                      <span className="text-[9px] text-gold-matte/60 border border-gold-matte/20 px-1.5 py-0.5 rounded uppercase">{result.category}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="p-2 border rounded-full transition-all cursor-pointer border-gold-matte/20 bg-cosmic-dark/50 hover:bg-gold-matte/15 hover:border-gold-matte text-gold-matte hover:text-gold-bright"
            aria-label="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Slide-out Sidebar Panel */}
      <div
        className={`fixed inset-0 z-50 flex justify-end bg-cosmic-dark/70 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`w-full max-w-md h-full bg-cosmic-deep/95 border-l border-gold-matte/20 p-8 flex flex-col justify-between transition-transform duration-500 ease-out shadow-2xl overflow-y-auto ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="font-serif text-base tracking-widest text-gold-matte">
                {viewMode === "nav" ? "NAV MENU" : "TREE MAP"}
              </span>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setViewMode(viewMode === "nav" ? "map" : "nav")}
                  className="px-3 py-1 text-[9px] font-mono tracking-widest uppercase border rounded-full transition-all border-gold-matte/30 bg-gold-matte/5 hover:bg-gold-matte/15 hover:border-gold-bright text-gold-light hover:text-gold-bright cursor-pointer"
                >
                  {viewMode === "nav" ? "To Tree Map" : "To Menu"}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 border border-gold-matte/20 rounded-full hover:border-gold-bright hover:bg-gold-matte/10 text-gold-matte hover:text-gold-bright transition-all cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Mobile Search */}
            <div className="relative sm:hidden mb-6">
              <div className="flex items-center border rounded-full px-3 py-2 w-full bg-cosmic-dark border-gold-matte/20">
                <Search className="w-4 h-4 mr-2 text-gold-matte/60" />
                <input
                  type="text"
                  placeholder="Search the tree..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="bg-transparent text-sm outline-none w-full text-gold-light placeholder-gold-matte/40"
                />
              </div>
              {searchResults.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 rounded-xl p-2 z-50 glass-panel">
                  {searchResults.map((result, idx) => (
                    <Link
                      key={idx}
                      href={result.path}
                      onClick={() => {
                        setIsOpen(false);
                        setSearchQuery("");
                        setSearchResults([]);
                      }}
                      className="flex justify-between items-center px-3 py-2 rounded-lg text-xs transition-colors hover:bg-gold-matte/10 text-gold-light"
                    >
                      <span>{result.name}</span>
                      <span className="text-[9px] border px-1.5 py-0.5 rounded uppercase text-gold-matte/60 border-gold-matte/20">
                        {result.category}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {/* Navigation Content */}
            {viewMode === "nav" ? (
              /* Main Menu Navigation List (Default) */
              <div className="flex flex-col gap-3 text-left py-2">
                {[
                  { href: "/", label: "The Tree Map", desc: "Interactive Banyan & 3D Constellation", icon: Sparkles },
                  { href: "/thinkers", label: "Sages & Scientists", desc: "Philosophical & empirical thinker profiles", icon: Landmark },
                  { href: "/library", label: "The Library", desc: "Curated research papers, videos & podcasts", icon: BookOpen },
                  { href: "/community", label: "Community Hub", desc: "Engage in non-dual discussions & questions", icon: Users },
                  { href: "/sage", label: "Sage AI Dialogue", desc: "Chat with the non-dual assistant", icon: Brain },
                  { href: "/paths", label: "Traversal Paths", desc: "Discover custom learning journeys", icon: Compass },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center gap-3.5 p-3.5 rounded-xl border transition-all duration-300 ${
                        isActive
                          ? "border-gold-bright bg-gold-matte/10 shadow-[0_0_12px_rgba(212,175,55,0.15)]"
                          : "border-gold-matte/10 hover:border-gold-matte/45 bg-gold-matte/2 hover:bg-gold-matte/5"
                      }`}
                    >
                      <div className={`p-2 rounded-lg border transition-colors ${
                        isActive ? "border-gold-bright bg-gold-matte/10 text-white" : "border-gold-matte/20 text-gold-matte group-hover:border-gold-matte/60"
                      }`}>
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <span className={`font-serif text-sm tracking-wider block transition-colors ${isActive ? "text-gold-bright" : "text-gold-light group-hover:text-gold-bright"}`}>
                          {item.label}
                        </span>
                        <span className="text-[9px] text-gold-matte/50 block font-light mt-0.5 group-hover:text-gold-matte/75">
                          {item.desc}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              /* Detailed Tree Navigation Map */
              <div className="flex flex-col gap-6 text-left">
                {[
                  {
                    label: "The Roots (Contemplation Soil)",
                    href: "/roots",
                    icon: BookOpen,
                    links: [
                      { href: "/roots/vedanta",       label: "Vedanta" },
                      { href: "/roots/buddhism",      label: "Buddhism" },
                      { href: "/roots/phenomenology", label: "Phenomenology" },
                      { href: "/roots/esoteric",      label: "Esoteric" },
                      { href: "/roots/inquiry",       label: "Direct Inquiry" },
                      { href: "/roots/shivom",        label: "Shivom's Inquiry" },
                    ],
                  },
                  {
                    label: "The Trunk (Unifying Spine)",
                    href: "/trunk",
                    icon: Landmark,
                    links: [],
                  },
                  {
                    label: "The Branches (Science Canopy)",
                    href: "/branches",
                    icon: Compass,
                    links: [
                      { href: "/branches/neuroscience", label: "Neuroscience" },
                      { href: "/branches/philosophy",   label: "Philosophy of Mind" },
                      { href: "/branches/cognitive",    label: "Cognitive Sci" },
                      { href: "/branches/quantum",      label: "Quantum Mind" },
                      { href: "/branches/panpsychism",  label: "Panpsychism" },
                      { href: "/branches/ai",           label: "AI & Mind" },
                    ],
                  },
                  {
                    label: "The Fruits (Practices & Integration)",
                    href: "/fruit",
                    icon: Heart,
                    links: [
                      { href: "/fruit/yoga",          label: "Yoga Paths" },
                      { href: "/fruit/yoga-practices",label: "Yoga Practices" },
                      { href: "/fruit/moksha-nirvana",label: "Moksha/Nirvana" },
                      { href: "/fruit/medicine",      label: "Medical Mindfulness" },
                      { href: "/fruit/meditation",    label: "Meditations" },
                      { href: "/fruit/reading-paths", label: "Reading Paths" },
                      { href: "/fruit/self-inquiry",  label: "Self-Inquiry" },
                      { href: "/fruit/playlists",     label: "Playlists" },
                      { href: "/fruit/journaling",    label: "Journaling" },
                    ],
                  },
                ].map((section) => {
                  const Icon = section.icon as React.ElementType;
                  return (
                    <div key={section.label} className="border-b border-gold-matte/10 pb-4 last:border-b-0 last:pb-0">
                      <Link
                        href={section.href}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center justify-between mb-3 text-gold-bright hover:text-white transition-colors"
                      >
                        <span className="text-[10px] uppercase tracking-widest font-bold font-serif underline decoration-gold-matte/30 group-hover:decoration-gold-bright underline-offset-4 flex items-center gap-1.5 drop-shadow-[0_0_4px_rgba(255,215,0,0.25)]">
                          <Icon className="w-3.5 h-3.5 text-gold-bright shrink-0" />
                          {section.label}
                        </span>
                        <span className="text-[11px] font-mono text-gold-bright group-hover:translate-x-1 transition-transform flex items-center">
                          ➔
                        </span>
                      </Link>
                      {section.links.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 pl-5">
                          {section.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={() => setIsOpen(false)}
                              className="flex items-center gap-1.5 text-xs text-gold-light/80 hover:text-gold-bright transition-colors"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-gold-matte/35 shrink-0" />
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="border-t pt-5 mt-6 flex flex-col gap-3 border-gold-matte/10">
            <button
              onClick={() => setViewMode(viewMode === "nav" ? "map" : "nav")}
              className="w-full py-3 rounded-lg border font-serif tracking-widest text-[10px] uppercase transition-all border-gold-matte/30 hover:border-gold-bright bg-gold-matte/5 hover:bg-gold-matte/10 text-gold-light/95 hover:text-white shadow-lg cursor-pointer"
            >
              {viewMode === "nav" ? "View Tree Navigation Map" : "View Main Navigation Menu"}
            </button>
            <p className="text-[9px] text-center mt-1 font-sans italic text-gold-matte/40">
              &ldquo;What Am I &mdash; Qualia, Brahman, Neurons, or just Nothing?&rdquo;
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
