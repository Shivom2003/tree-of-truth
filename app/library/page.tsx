"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/navigation/Header";
import StarField from "@/components/ui/StarField";
import MediaCard from "@/components/library/MediaCard";
import { MediaItem, CURATED_MEDIA } from "@/lib/data/curatedMedia";
import { Search, Library, Compass, Cpu, BookOpen, Sparkles, Filter, RefreshCw } from "lucide-react";

// List of major tree node families for dropdown filter
const CATEGORY_FAMILIES = [
  { id: "all", name: "All Traditions & Fields" },
  { id: "vedanta", name: "Advaita Vedanta" },
  { id: "buddhism", name: "Buddhist Thought" },
  { id: "inquiry", name: "Direct Inquiry" },
  { id: "shivom", name: "Shivom's Inquiry" },
  { id: "phenomenology", name: "Phenomenology" },
  { id: "esoteric", name: "Esoteric & NDEs" },
  { id: "neuroscience", name: "Neuroscience" },
  { id: "philosophy", name: "Philosophy of Mind" },
  { id: "cognitive", name: "Cognitive Science" },
  { id: "quantum", name: "Quantum Mechanics" },
  { id: "panpsychism", name: "Panpsychism & Idealism" },
  { id: "ai", name: "AI & Consciousness" },
];

function LibraryClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams ? searchParams.get("q") || "" : "";

  const [query, setQuery] = useState(initialQuery);
  const [searchInput, setSearchInput] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<"all" | "paper" | "video" | "podcast">("all");
  const [selectedFamily, setSelectedFamily] = useState<string>("all");
  
  // Media items state (starts with curated local items, grows with API search)
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(CURATED_MEDIA);
  const [isSearching, setIsSearching] = useState(false);

  // Perform search (local matching + async API fetch)
  const performSearch = async (searchTerm: string) => {
    setQuery(searchTerm);
    if (!searchTerm.trim()) {
      setMediaItems(CURATED_MEDIA);
      return;
    }

    setIsSearching(true);
    try {
      // Fetch results from our secure server-side API proxies in parallel
      const [papersRes, videosRes] = await Promise.all([
        fetch(`/api/papers?q=${encodeURIComponent(searchTerm)}`),
        fetch(`/api/videos?q=${encodeURIComponent(searchTerm)}`),
      ]);

      const papers: MediaItem[] = papersRes.ok ? await papersRes.json() : [];
      const videos: MediaItem[] = videosRes.ok ? await videosRes.json() : [];

      // Combine both results and eliminate duplicate IDs
      const combined = [...papers, ...videos];
      const uniqueItems: MediaItem[] = [];
      const seenIds = new Set<string>();

      // Keep local curated items matching the search first, then append fresh API items
      combined.forEach((item) => {
        if (!seenIds.has(item.id)) {
          seenIds.add(item.id);
          uniqueItems.push(item);
        }
      });

      setMediaItems(uniqueItems);
    } catch (error) {
      console.error("Error executing API search:", error);
    } finally {
      setIsSearching(false);
    }
  };

  // Trigger search on mount if initial query param exists
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  // Form submit handler
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchInput);
  };

  // Filtered items computed based on query, format tab, and category dropdown family
  const filteredItems = useMemo(() => {
    return mediaItems.filter((item) => {
      // 1. Format/Type Filter Tab
      if (activeTab !== "all" && item.type !== activeTab) {
        return false;
      }

      // 2. Tree Node Family Filter
      if (selectedFamily !== "all") {
        const familyMatch = item.tags.some((tag) => {
          const t = tag.toLowerCase();
          // Map category family selections to individual node sub-tags
          if (selectedFamily === "vedanta" && (t.includes("vedanta") || t === "shankaracharya" || t === "vivekananda" || t === "sarvapriyananda" || t === "krishna" || t === "aurobindo")) return true;
          if (selectedFamily === "buddhism" && (t.includes("buddhism") || t === "buddha" || t === "nagarjuna" || t === "laotzu")) return true;
          if (selectedFamily === "inquiry" && (t.includes("inquiry") || t === "ramana" || t === "nisargadatta" || t === "spira" || t === "lucille" || t === "papaji" || t === "krishnamurti" || t === "watts")) return true;
          if (selectedFamily === "shivom" && t.includes("shivom")) return true;
          if (selectedFamily === "phenomenology" && (t.includes("phenomenology") || t === "metzinger")) return true;
          if (selectedFamily === "esoteric" && (t.includes("esoteric") || t === "patanjali" || t === "ramakrishna" || t === "jesus" || t === "williamjames")) return true;
          if (selectedFamily === "neuroscience" && (t.includes("neuroscience") || t === "koch" || t === "kanojia")) return true;
          if (selectedFamily === "philosophy" && (t.includes("philosophy") || t === "chalmers")) return true;
          if (selectedFamily === "cognitive" && (t.includes("cognitive") || t === "metzinger")) return true;
          if (selectedFamily === "quantum" && (t.includes("quantum") || t === "hoffman" || t === "faggin" || t === "bohm")) return true;
          if (selectedFamily === "panpsychism" && (t.includes("panpsychism") || t === "kastrup" || t === "goff" || t === "chopra")) return true;
          if (selectedFamily === "ai" && t.includes("ai")) return true;

          // Direct match check (e.g. tag 'b_quantum' matching family filter 'quantum')
          return t === selectedFamily || t.replace("b_", "").replace("r_", "").replace("rs_", "").replace("bs_", "") === selectedFamily;
        });
        if (!familyMatch) return false;
      }

      // 3. Fallback Query Filter (in case APIs returned extra un-searched items or for local state)
      if (query.trim()) {
        const term = query.toLowerCase();
        const titleMatch = item.title.toLowerCase().includes(term);
        const descMatch = item.description.toLowerCase().includes(term);
        const authorMatch = item.authorsOrChannel.some((a) => a.toLowerCase().includes(term));
        const tagMatch = item.tags.some((t) => t.toLowerCase().includes(term));
        return titleMatch || descMatch || authorMatch || tagMatch;
      }

      return true;
    });
  }, [mediaItems, activeTab, selectedFamily, query]);

  return (
    <main
      className="relative flex flex-col min-h-screen overflow-hidden"
      style={{ backgroundColor: "#05060b" }}
    >
      <StarField />
      <Header />

      {/* Hero background aura */}
      <div className="absolute top-0 left-0 right-0 h-[450px] bg-gradient-to-b from-[#d4af37]/5 to-transparent pointer-events-none" />

      <div className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-6 pt-32 pb-24 flex flex-col">
        {/* Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-matte/10 bg-gold-matte/5 text-[9px] uppercase tracking-[0.22em] font-mono text-gold-matte mb-4">
            <Library className="w-3.5 h-3.5 animate-pulse text-gold-bright" />
            Knowledge Well
          </div>
          <h1 className="font-serif text-3xl md:text-5xl tracking-wide text-gold-light mb-4">
            The Library of Consciousness
          </h1>
          <p className="text-xs md:text-sm text-gold-matte/70 font-light leading-relaxed">
            A centralized hub containing scientific publications, philosophical papers, debates, podcasts, and experimental pointers mapped to the Tree of Truth.
          </p>
        </div>

        {/* Search & Filter Controls Panel */}
        <div className="w-full max-w-4xl mx-auto mb-10 flex flex-col gap-4">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="flex-1 relative flex items-center border rounded-full px-4 py-3 bg-[#07080f]/80 border-gold-matte/20 focus-within:border-gold-matte transition-all shadow-2xl">
              <Search className="w-4 h-4 mr-3 text-gold-matte/50" />
              <input
                type="text"
                placeholder="Search research papers, channel topics, channels, or thinker names..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="bg-transparent text-sm outline-none w-full text-gold-light placeholder-gold-matte/30"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput("");
                    performSearch("");
                  }}
                  className="text-gold-matte/40 hover:text-gold-bright text-xs pr-2 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="px-6 py-3 rounded-full border text-xs tracking-widest font-serif font-semibold border-gold-matte/30 bg-gold-matte/10 text-gold-bright hover:bg-gold-matte/20 hover:border-gold-bright transition-all shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSearching ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5" />
              )}
              {isSearching ? "SEARCHING..." : "SEARCH"}
            </button>
          </form>

          {/* Tab Filters and Category Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t pt-4 border-gold-matte/10">
            {/* Format Filter Tabs */}
            <div className="flex flex-wrap gap-1 p-0.5 rounded-full border max-w-max border-gold-matte/15 bg-cosmic-deep/30">
              {(["all", "paper", "video", "podcast"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-full text-[9px] uppercase font-bold tracking-widest transition-all cursor-pointer ${
                    activeTab === tab
                      ? "bg-gold-matte text-cosmic-dark font-extrabold shadow-[0_0_10px_rgba(212,175,55,0.3)]"
                      : "text-gold-light/60 hover:text-gold-light"
                  }`}
                >
                  {tab === "all" ? "All Formats" : tab === "paper" ? "Papers" : tab === "video" ? "Videos" : "Podcasts"}
                </button>
              ))}
            </div>

            {/* Tree Nodes Dropdown */}
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-gold-matte/40" />
              <select
                value={selectedFamily}
                onChange={(e) => setSelectedFamily(e.target.value)}
                className="bg-[#07080f] border rounded-full px-4 py-1.5 text-[10px] uppercase font-bold tracking-wider text-gold-light outline-none border-gold-matte/20 cursor-pointer hover:border-gold-matte/50 focus:border-gold-matte"
              >
                {CATEGORY_FAMILIES.map((fam) => (
                  <option key={fam.id} value={fam.id}>
                    {fam.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Searching Loader */}
        {isSearching ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-gold-matte font-serif text-sm tracking-widest animate-pulse gap-3">
            <RefreshCw className="w-6 h-6 animate-spin text-gold-bright" />
            COMMUNING WITH ACADEMIA & MEDIA DATABASES...
          </div>
        ) : filteredItems.length === 0 ? (
          /* Empty Search State */
          <div className="flex-1 flex flex-col items-center justify-center py-24 border rounded-3xl border-gold-matte/10 bg-cosmic-dark/20 max-w-4xl w-full mx-auto px-6 text-center">
            <Compass className="w-10 h-10 text-gold-matte/30 mb-4 animate-pulse" />
            <h3 className="font-serif text-lg text-gold-bright mb-1">No matches in the Well</h3>
            <p className="text-xs text-gold-matte/60 font-light max-w-sm leading-relaxed">
              We couldn&apos;t find any curated resources or API results matching your query. Try querying a different keyword or check your spelling.
            </p>
          </div>
        ) : (
          /* Media Cards Grid */
          <div className="flex-1 flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full mx-auto">
              {filteredItems.map((item) => (
                <div key={item.id} className="h-full">
                  <MediaCard item={item} />
                </div>
              ))}
            </div>
            
            {/* Pagination/Summary count footer */}
            <div className="text-center mt-12 text-[10px] font-mono text-gold-matte/45">
              Showing {filteredItems.length} resources in the library
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function LibraryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#05060b] flex items-center justify-center text-gold-matte font-serif tracking-widest text-xs animate-pulse">
          LOADING KNOWLEDGE WELL...
        </div>
      }
    >
      <LibraryClient />
    </Suspense>
  );
}
