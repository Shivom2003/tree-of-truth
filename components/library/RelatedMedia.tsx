"use client";

import { useEffect, useState } from "react";
import { MediaItem, CURATED_MEDIA } from "@/lib/data/curatedMedia";
import MediaCard from "./MediaCard";
import Link from "next/link";
import { Library, ArrowRight, Loader2 } from "lucide-react";
import { TREE_NODES } from "@/lib/treeNodes";

interface RelatedMediaProps {
  thinkerId?: string; // e.g., 'hoffman'
  nodeId?: string;    // e.g., 'b_quantum'
  limit?: number;     // default 3
}

// Maps nodeId/slug to specific query words to get high quality scientific / debate results
const SEARCH_KEYWORDS: Record<string, string> = {
  // Roots
  r_vedanta: "Vedanta philosophy consciousness",
  r_buddhism: "Buddhism consciousness self empty",
  r_inquiry: "non-dual self-inquiry Atma Vichara",
  r_shivom: "consciousness deep sleep memory loss",
  r_phenomenology: "phenomenology consciousness subjectivity",
  r_esoteric: "mystical experiences near death experiences consciousness",
  rs_advaita: "Advaita Vedanta non-duality consciousness",
  rs_dvaita: "Dvaita Vedanta Madhvacharya dualism",
  rs_sankhya: "Samkhya Purusha Prakriti dualism",
  rs_upanishads: "Upanishads consciousness Self Brahman",
  rs_gitas: "Ashtavakra Gita Bhagavad Gita non-duality",
  rs_annatta: "Buddhist Anatta no-self consciousness",
  rs_sunyata: "Buddhist Sunyata emptiness Nagarjuna",
  rs_rigpa: "Dzogchen Rigpa pure awareness",
  rs_reduction: "phenomenological reduction epoche Husserl",
  rs_selfconstruct: "self construct ego tunnel Metzinger",
  rs_presence: "pure presence consciousness subjectivity",
  rs_rebirth: "consciousness rebirth bardo continuation",
  rs_subtlebody: "subtle body chakras energy pathways",
  rs_astral: "astral projection out of body experience",
  rs_ndes: "near-death experiences clinical flatline consciousness",
  rs_enlightenment: "mystical enlightenment unity consciousness",
  rs_selfinquiry: "Ramana Maharshi self inquiry practice",
  rs_netineti: "Neti Neti negation non-duality",
  rs_witness: "witness consciousness sakshee non-duality",
  rs_whoami: "Who am I inquiry Ramana Maharshi",
  rs_deepsleep: "deep sleep witness consciousness",
  rs_sensory: "congenital sensory impairment ego development",
  rs_womb: "womb state prenatal consciousness",
  rs_memoryloss: "memory loss identity witness consciousness",

  // Branches
  b_neuroscience: "neuroscience consciousness brain",
  b_philosophy: "philosophy of mind consciousness hard problem",
  b_cognitive: "cognitive science consciousness mind",
  b_quantum: "quantum mechanics consciousness mind",
  b_panpsychism: "panpsychism idealism consciousness",
  b_ai: "artificial intelligence consciousness awareness LLM",
  bs_ncc: "neural correlates of consciousness NCC Mapping",
  bs_dmn: "default mode network ego self",
  bs_binding: "binding problem neuroscience consciousness",
  bs_global: "global workspace theory consciousness",
  bs_hardproblem: "hard problem of consciousness Chalmers",
  bs_qualia: "qualia Marys room thought experiment",
  bs_zombies: "philosophical zombies consciousness",
  bs_iit: "integrated information theory consciousness Tononi",
  bs_embodied: "embodied cognition enactivism mind",
  bs_selfconstruction: "self construction brain predictive ego",
  bs_predictive: "predictive processing brain controlled hallucination",
  bs_observer: "quantum measurement observer problem physics",
  "bs_orch-or": "Orch OR Penrose Hameroff microtubules",
  bs_nonlocality: "quantum non locality entanglement consciousness",
  bs_interface: "interface theory of perception Donald Hoffman",
  bs_idealism: "analytical idealism Bernardo Kastrup",
  bs_goff: "Philip Goff panpsychism consciousness",
  bs_chalmers_pan: "David Chalmers panpsychism consciousness",
  bs_faggin_pan: "Federico Faggin semantic quantum consciousness",
  bs_learning: "machine learning vs human consciousness",
  bs_experience: "silicon semantics Chinese room Searle",

  // Fruits
  f_yoga: "four paths of yoga Karma Jnana Bhakti Raja",
  f_yogaprac: "yoga asanas pranayama meditation",
  f_moksha: "Moksha Nirvana spiritual liberation",
  f_medicine: "mindfulness based stress reduction clinical CBT",
  f_meditation: "Vipassana Zen meditation practice",
  f_reading: "books consciousness philosophy science readings",
  f_guided: "guided self inquiry non dual pointers",
  f_playlists: "consciousness debates lectures videos",
  f_journaling: "contemplative journaling self deconstruction",
};

// Maps thinkerId to query terms
const THINKER_NAMES: Record<string, string> = {
  shankaracharya: "Adi Shankaracharya Vedanta",
  ramana: "Ramana Maharshi self inquiry",
  nisargadatta: "Nisargadatta Maharaj I Am That",
  buddha: "Gautama Buddha Anatta",
  nagarjuna: "Nagarjuna Sunyata Madhyamaka",
  patanjali: "Patanjali Yoga Sutras",
  ramakrishna: "Ramakrishna Paramahamsa",
  vivekananda: "Swami Vivekananda Vedanta",
  faggin: "Federico Faggin consciousness",
  hoffman: "Donald Hoffman interface theory",
  kastrup: "Bernardo Kastrup idealism",
  chalmers: "David Chalmers hard problem",
  goff: "Philip Goff panpsychism",
  koch: "Christof Koch consciousness",
  chopra: "Deepak Chopra consciousness",
  metzinger: "Thomas Metzinger ego tunnel",
  sarvapriyananda: "Swami Sarvapriyananda Vedanta",
  spira: "Rupert Spira non duality",
  lucille: "Francis Lucille non duality",
  kanojia: "Dr Alok Kanojia HealthyGamer",
  krishna: "Krishna Bhagavad Gita",
  jesus: "Jesus of Nazareth mysticism",
  papaji: "HWL Poonja Papaji",
  aurobindo: "Sri Aurobindo integral yoga",
  williamjames: "William James mysticism",
  laotzu: "Lao Tzu Tao Te Ching",
  krishnamurti: "Jiddu Krishnamurti",
  watts: "Alan Watts ego",
  bohm: "David Bohm quantum implicate order",
};

export default function RelatedMedia({ thinkerId, nodeId, limit = 3 }: RelatedMediaProps) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Find local curated items matching tags as immediate fallback/base
  const curatedItems = CURATED_MEDIA.filter((item) => {
    if (thinkerId) {
      return item.tags.some((t) => t.toLowerCase() === thinkerId.toLowerCase());
    }
    if (nodeId) {
      return item.tags.some((t) => t.toLowerCase() === nodeId.toLowerCase());
    }
    return false;
  });

  useEffect(() => {
    let active = true;

    // Get search term
    let term = "";
    if (thinkerId) {
      term = THINKER_NAMES[thinkerId.toLowerCase()] || thinkerId;
    } else if (nodeId) {
      term = SEARCH_KEYWORDS[nodeId] || "";
      if (!term) {
        const found = TREE_NODES.find((n) => n.id === nodeId);
        term = found ? found.name : nodeId;
      }
    }

    if (!term) {
      setItems(curatedItems);
      setLoading(false);
      return;
    }

    async function loadDynamicMedia() {
      try {
        setLoading(true);
        // Call papers and videos search APIs in parallel
        const [papersRes, videosRes] = await Promise.all([
          fetch(`/api/papers?q=${encodeURIComponent(term)}`),
          fetch(`/api/videos?q=${encodeURIComponent(term)}`),
        ]);

        const papers: MediaItem[] = papersRes.ok ? await papersRes.json() : [];
        const videos: MediaItem[] = videosRes.ok ? await videosRes.json() : [];

        if (!active) return;

        // Combine local curated ones first, then dynamic API ones
        const combined = [...curatedItems, ...papers, ...videos];
        const uniqueItems: MediaItem[] = [];
        const seenIds = new Set<string>();

        combined.forEach((item) => {
          if (!seenIds.has(item.id)) {
            seenIds.add(item.id);
            uniqueItems.push(item);
          }
        });

        setItems(uniqueItems);
      } catch (err) {
        console.error("RelatedMedia failed to fetch dynamic content:", err);
        if (active) {
          setItems(curatedItems);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadDynamicMedia();

    return () => {
      active = false;
    };
  }, [thinkerId, nodeId]);

  const displayItems = items.slice(0, limit);

  if (displayItems.length === 0 && !loading) return null;

  return (
    <div className="fade-up w-full mt-12 mb-10 border-t border-gold-matte/10 pt-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-[9px] uppercase tracking-[0.2em] font-mono font-bold text-gold-matte mb-1.5 flex items-center gap-1.5">
            <Library className="w-3.5 h-3.5 text-gold-bright" />
            Knowledge Well &amp; Media
          </h3>
          <p className="text-xs text-[#f3e5ab]/50 font-light font-serif italic flex items-center gap-2">
            Recommended research papers, debates, and lectures
            {loading && <Loader2 className="w-3 h-3 animate-spin text-gold-bright/60" />}
          </p>
        </div>
        
        <Link
          href={`/library?q=${thinkerId || nodeId || ""}`}
          className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-mono text-gold-matte hover:text-gold-bright transition-all group"
        >
          Explore All Media
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayItems.map((item) => (
          <div key={item.id} className="h-full">
            <MediaCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
