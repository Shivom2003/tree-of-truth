// scripts/seedCommunities.js
// Run once to seed the 8 initial Seeker Circle communities into Firestore.
//
// Usage (from project root):
//   node scripts/seedCommunities.js

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env.local") });

const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc, Timestamp } = require("firebase/firestore");

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const COMMUNITIES = [
  {
    id: "advaita-vedanta",
    slug: "advaita-vedanta",
    name: "Advaita Vedanta & Non-Duality",
    tagline: "Tat Tvam Asi — Thou Art That",
    description: "Explore the ancient wisdom of Advaita Vedanta, the path of self-inquiry, and the direct recognition of non-dual awareness. Discussions on Ramana Maharshi, Nisargadatta Maharaj, Shankaracharya, and contemporary neo-advaita.",
    icon: "🕉️",
    accentColor: "#d4af37",
    tags: ["Vedanta", "Non-Duality", "Self-Inquiry", "Advaita", "Hinduism"],
  },
  {
    id: "consciousness-neuroscience",
    slug: "consciousness-neuroscience",
    name: "Consciousness & Neuroscience",
    tagline: "The Hard Problem at the frontier of science",
    description: "Where neuroscience meets the ineffable. Investigate the neural correlates of consciousness, the hard problem, integrated information theory, global workspace theory, and what it means to have a subjective experience.",
    icon: "🧠",
    accentColor: "#7c5cbf",
    tags: ["Neuroscience", "Hard Problem", "IIT", "Qualia", "Consciousness"],
  },
  {
    id: "quantum-reality",
    slug: "quantum-reality",
    name: "Quantum Reality & Physics",
    tagline: "Observer, wave function, and the fabric of reality",
    description: "Dive into the philosophical implications of quantum mechanics — Copenhagen, Many Worlds, pilot wave theory, quantum Bayesianism, and what physics reveals (or conceals) about the nature of reality.",
    icon: "⚛️",
    accentColor: "#4a90d9",
    tags: ["Quantum Mechanics", "Physics", "Many Worlds", "Reality", "Wavefunction"],
  },
  {
    id: "buddhist-philosophy",
    slug: "buddhist-philosophy",
    name: "Buddhist Philosophy & Emptiness",
    tagline: "Śūnyatā — the nature of empty appearances",
    description: "Explore Madhyamaka, Yogācāra, Zen, Theravāda, and Tibetan Buddhist philosophical frameworks. Topics include dependent origination, emptiness, Buddha-nature, and the cessation of suffering.",
    icon: "☸️",
    accentColor: "#e08a3c",
    tags: ["Buddhism", "Emptiness", "Madhyamaka", "Zen", "Dharma"],
  },
  {
    id: "philosophy-of-mind",
    slug: "philosophy-of-mind",
    name: "Philosophy of Mind",
    tagline: "Functionalism, qualia, and the ghost in the machine",
    description: "Engage with analytic and continental philosophy of mind — dualism, physicalism, panpsychism, idealism, functionalism, eliminativism, and the evolving landscape of consciousness studies in academic philosophy.",
    icon: "💭",
    accentColor: "#5bb89a",
    tags: ["Philosophy", "Mind", "Panpsychism", "Dualism", "Idealism"],
  },
  {
    id: "science-spirituality",
    slug: "science-spirituality",
    name: "Science & Spirituality (Bridging)",
    tagline: "Where empiricism meets direct experience",
    description: "A dialogue space for thinkers who refuse the false dichotomy between science and spirituality. Explore how contemplative practice, mystical experience, and scientific inquiry can enrich one another.",
    icon: "🔭",
    accentColor: "#c45c8a",
    tags: ["Bridging", "Contemplation", "Science", "Mysticism", "Integration"],
  },
  {
    id: "existentialism-meaning",
    slug: "existentialism-meaning",
    name: "Existentialism & Meaning",
    tagline: "Authentic existence in the face of the absurd",
    description: "Sartre, Camus, Heidegger, Kierkegaard — and the lived question: how does one create meaning in an indifferent universe? Discuss existential anxiety, freedom, responsibility, and authentic selfhood.",
    icon: "🌑",
    accentColor: "#888888",
    tags: ["Existentialism", "Meaning", "Authenticity", "Camus", "Heidegger"],
  },
  {
    id: "ai-vs-consciousness",
    slug: "ai-vs-consciousness",
    name: "AI vs. Consciousness",
    tagline: "Can machines ever truly be aware?",
    description: "The most urgent philosophical debate of our era. Can artificial systems ever be conscious? What does large language model behaviour tell us (or not) about the nature of mind? Where does intelligence end and awareness begin?",
    icon: "🤖",
    accentColor: "#2abfbf",
    tags: ["AI", "Machine Consciousness", "LLM", "Turing", "Awareness"],
  },
];

async function seed() {
  console.log("🌱 Seeding Seeker Circle communities...\n");

  if (!firebaseConfig.projectId || firebaseConfig.projectId === "your_project_id_here") {
    console.error("❌ Firebase config not found. Make sure .env.local is populated.");
    process.exit(1);
  }

  const app = initializeApp(firebaseConfig);
  const db  = getFirestore(app);

  for (const community of COMMUNITIES) {
    const ref = doc(db, "communities", community.id);
    await setDoc(ref, {
      name:          community.name,
      slug:          community.slug,
      description:   community.description,
      tagline:       community.tagline,
      icon:          community.icon,
      accentColor:   community.accentColor,
      tags:          community.tags,
      createdBy:     "admin",
      createdAt:     Timestamp.now(),
      memberCount:   0,
      questionCount: 0,
    });
    console.log(`  ✓ ${community.icon}  ${community.name}`);
  }

  console.log("\n✅ All 8 communities seeded successfully.");
  console.log("   You can view them at: https://console.firebase.google.com/project/tree-of-truth-f17e9/firestore");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err.message ?? err);
  process.exit(1);
});
