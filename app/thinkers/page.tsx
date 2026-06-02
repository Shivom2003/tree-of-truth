"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/navigation/Header";
import StarField from "@/components/ui/StarField";
import { Search, BookOpen, Quote, Sparkles, ChevronRight } from "lucide-react";

interface Thinker {
  id: string;
  name: string;
  period: string;
  category: "ancient" | "classical" | "scientific" | "contemporary";
  coreQuestion: string;
  contribution: string;
  quote: string;
  works: string[];
  color: string;
  path: string;
  spectrumPercent: number;
  tag: string;
}

const THINKERS: Thinker[] = [
  // ──── ANCIENT & CLASSICAL ────────────────────────────────────────────────
  {
    id: "krishna",
    name: "Krishna",
    period: "c. 3000 BCE — India",
    category: "ancient",
    coreQuestion: "How can one act fully in the world while remaining untouched by the fruits of action?",
    contribution:
      "Divine teacher of the Bhagavad Gita. Revealed to Arjuna the eternal nature of the Self, the three paths of Yoga (Karma, Jnana, Bhakti), and the non-dual truth that all of existence is one divine reality.",
    quote:
      "You have a right to perform your prescribed duty, but never claim ownership of the fruits of action.",
    works: ["Bhagavad Gita", "Uddhava Gita (Bhagavata Purana)"],
    color: "#f59e0b",
    path: "/leaves/krishna",
    spectrumPercent: 2,
    tag: "Divine Source",
  },
  {
    id: "jesus",
    name: "Jesus of Nazareth",
    period: "c. 4 BCE – 30 CE — Palestine",
    category: "ancient",
    coreQuestion:
      "What does the Kingdom of Heaven within reveal about the unity of the individual soul and its divine source?",
    contribution:
      "Taught that the Kingdom of Heaven is a present interior reality. 'I and the Father are one' and 'Before Abraham was, I Am' point to a non-dual unity of the finite self and the infinite ground.",
    quote: "The Kingdom of Heaven is within you. I and the Father are one. Before Abraham was, I Am.",
    works: ["Gospel of John", "Gospel of Thomas (Gnostic)", "Sermon on the Mount — Matthew 5–7"],
    color: "#a78bfa",
    path: "/leaves/jesus",
    spectrumPercent: 5,
    tag: "Mystical Source",
  },
  {
    id: "shankaracharya",
    name: "Adi Shankaracharya",
    period: "c. 788–820 CE — India",
    category: "ancient",
    coreQuestion:
      "Is the individual self ultimately different from the ground of being — or is the sense of separation the only illusion?",
    contribution:
      "Systematized Advaita Vedanta. Introduced adhyasa (superimposition) to explain how the infinite mistakenly identifies with the finite. Brahman alone is real; the world is appearance.",
    quote:
      "Brahman alone is real. The world is appearance. The individual self is none other than Brahman.",
    works: ["Vivekachudamani (Crest-Jewel of Discrimination)", "Atma Bodha (Self-Knowledge)"],
    color: "#e11d48",
    path: "/leaves/shankaracharya",
    spectrumPercent: 3,
    tag: "Advaita Vedanta",
  },
  {
    id: "buddha",
    name: "Gautama Buddha",
    period: "c. 5th–4th century BCE — India",
    category: "ancient",
    coreQuestion: "What causes suffering — and can awareness itself be liberated from it?",
    contribution:
      "Articulated the anatta (no-self) teaching: the five aggregates are not a self. Taught mindfulness and the Noble Eightfold Path as the systematic dissolution of suffering through direct investigation.",
    quote:
      "Mind is the forerunner of all actions. If one acts with a serene mind, happiness follows as a shadow that never departs.",
    works: ["The Dhammapada", "In the Buddha's Words (ed. Bhikkhu Bodhi)", "Majjhima Nikaya"],
    color: "#d946ef",
    path: "/leaves/buddha",
    spectrumPercent: 8,
    tag: "Buddhist Inquiry",
  },
  {
    id: "nagarjuna",
    name: "Nagarjuna",
    period: "c. 2nd century CE — India",
    category: "ancient",
    coreQuestion:
      "Does anything — including consciousness, including emptiness itself — have inherent existence?",
    contribution:
      "Formulated Madhyamaka philosophy. Proved logically that all phenomena are empty (śūnyatā) of independent, inherent existence — arising only in dependent co-origination. The Middle Way between existence and non-existence.",
    quote:
      "Whatever is dependently co-arisen, that is explained to be emptiness. That, being a dependent designation, is itself the middle way.",
    works: ["Mulamadhyamakakarika (Fundamental Verses on the Middle Way)"],
    color: "#d946ef",
    path: "/leaves/nagarjuna",
    spectrumPercent: 10,
    tag: "Madhyamaka",
  },
  {
    id: "patanjali",
    name: "Patanjali",
    period: "c. 2nd century BCE–4th century CE — India",
    category: "ancient",
    coreQuestion:
      "How does the movement of the mind obscure the nature of pure consciousness — and how can it be stilled?",
    contribution:
      "Systematized the Yoga Sutras: the foundational psychology of consciousness. Distinguished purusha (pure consciousness) from prakriti (matter/mind); defined yoga as stilling the fluctuations of the mind-field.",
    quote:
      "Yoga is the cessation of the fluctuations of the mind-field. Then the Seer abides in its own nature.",
    works: ["The Yoga Sutras", "Inside the Yoga Sutras (commentary by Jaganath Carrera)"],
    color: "#0d9488",
    path: "/leaves/patanjali",
    spectrumPercent: 15,
    tag: "Classical Yoga",
  },
  {
    id: "laotzu",
    name: "Lao Tzu",
    period: "c. 6th century BCE — China",
    category: "ancient",
    coreQuestion: "How can one live in effortless alignment with the flow of the universe (Tao) before the thinking mind creates division?",
    contribution:
      "Authored the Tao Te Ching, establishing Taoism. Taught that the Tao (the Way) is the source and substance of all things, ineffable and nameless. Introduced Wu Wei (effortless action) and the deconstruction of the conceptual self in favor of natural harmony.",
    quote: "The Tao that can be spoken of is not the eternal Tao. The name that can be named is not the eternal name.",
    works: ["Tao Te Ching (transl. Stephen Mitchell)", "Tao: The Watercourse Way (Alan Watts)"],
    color: "#a3e635",
    path: "/leaves/laotzu",
    spectrumPercent: 6,
    tag: "Taoism",
  },

  // ──── CLASSICAL ERA ───────────────────────────────────────────────────────
  {
    id: "ramakrishna",
    name: "Ramakrishna Paramahamsa",
    period: "1836–1886 — India",
    category: "classical",
    coreQuestion:
      "Are all genuine spiritual paths — across traditions — pointing at the same undivided reality?",
    contribution:
      "Demonstrated phenomenologically that different spiritual paths lead to the same non-dual realization. Practiced Vedanta, Islam, and Christianity in succession, reaching samadhi in each.",
    quote: "As many faiths, so many paths.",
    works: ["The Gospel of Sri Ramakrishna (compiled by M.)", "Ramakrishna and His Disciples (Isherwood)"],
    color: "#0d9488",
    path: "/leaves/ramakrishna",
    spectrumPercent: 18,
    tag: "Mystic Union",
  },
  {
    id: "vivekananda",
    name: "Swami Vivekananda",
    period: "1863–1902 — India / International",
    category: "classical",
    coreQuestion:
      "How can the depth of Vedantic non-dualism speak to the modern, scientific, and Western mind?",
    contribution:
      "Introduced Vedanta and Yoga to the West as an empirical science of mind — not dogma. Formulated the four paths (Karma, Jnana, Bhakti, Raja Yoga) to suit different human temperaments.",
    quote:
      "The Atman is the witness, the eternal consciousness behind all states. Arise, awake, and stop not till the goal is reached.",
    works: ["Raja Yoga", "Jnana Yoga", "The Complete Works (selected, free online)"],
    color: "#e11d48",
    path: "/leaves/vivekananda",
    spectrumPercent: 25,
    tag: "Modern Vedanta",
  },
  {
    id: "williamjames",
    name: "William James",
    period: "1842–1910 — USA",
    category: "classical",
    coreQuestion:
      "Are mystical states mere subjective distortions — or genuine noetic revelations about the nature of consciousness?",
    contribution:
      "Father of American psychology. His Varieties of Religious Experience was the first systematic, empirical study of mystical states. Established four marks of mystical experience and coined 'stream of consciousness'.",
    quote:
      "The greatest revolution of our generation is the discovery that human beings, by changing the inner attitudes of their minds, can change the outer aspects of their lives.",
    works: [
      "The Varieties of Religious Experience (1902)",
      "The Principles of Psychology (1890)",
      "Essays in Radical Empiricism",
    ],
    color: "#34d399",
    path: "/leaves/williamjames",
    spectrumPercent: 55,
    tag: "Empirical Mysticism",
  },
  {
    id: "aurobindo",
    name: "Sri Aurobindo",
    period: "1872–1950 — India / International",
    category: "classical",
    coreQuestion:
      "If consciousness is the ground of reality, can matter itself be transformed into a vehicle of that consciousness?",
    contribution:
      "Developed Integral Yoga: consciousness is not merely to be transcended but to actively transform matter. Proposed the Supramental as the next emergent level of evolution beyond ordinary mind.",
    quote:
      "Man is a transitional being. He is not final. The step from man to Superman is the next approaching achievement in the earth's evolution.",
    works: ["The Life Divine", "Synthesis of Yoga", "Savitri (24,000-line epic poem)"],
    color: "#10b981",
    path: "/leaves/aurobindo",
    spectrumPercent: 35,
    tag: "Integral Philosophy",
  },
  {
    id: "ramana",
    name: "Ramana Maharshi",
    period: "1879–1950 — India",
    category: "classical",
    coreQuestion: "Who am I?",
    contribution:
      "Pioneered atma vichara (self-inquiry). Following a spontaneous death-recognition at 16, he taught seekers to trace the 'I-thought' back to its silent source — discovering awareness as the foundational ground.",
    quote:
      "The thought 'Who am I?' will destroy all other thoughts, and like the stick used for stirring the funeral pyre, will itself in the end get destroyed. Then Self-realization arises.",
    works: ["Who Am I? (Nan Yar)", "Forty Verses on Reality", "Be As You Are (David Godman)"],
    color: "#0284c7",
    path: "/leaves/ramana",
    spectrumPercent: 5,
    tag: "Self-Inquiry",
  },
  {
    id: "nisargadatta",
    name: "Nisargadatta Maharaj",
    period: "1897–1981 — India",
    category: "classical",
    coreQuestion: "What are you before you think you are something?",
    contribution:
      "Taught the most uncompromising non-duality. Pointed to the bare 'I Am' — the sense of being prior to all concepts — as the last doorway to the Absolute.",
    quote:
      "You are not what you think you are. Find out what you are. The 'I Am' is the last illusion — but it is also the door.",
    works: ["I Am That", "Prior to Consciousness", "The Ultimate Medicine"],
    color: "#0284c7",
    path: "/leaves/nisargadatta",
    spectrumPercent: 5,
    tag: "I Am That",
  },
  {
    id: "papaji",
    name: "H.W.L. Poonja (Papaji)",
    period: "1910–1997 — India",
    category: "classical",
    coreQuestion: "Who is the one seeking liberation — and what remains when the seeker is seen through?",
    contribution:
      "Direct disciple of Ramana Maharshi. Taught that liberation is always already the case — not a future achievement. 'Keep Quiet' was his primary pointer: the natural stillness prior to thought.",
    quote:
      "There is no one who needs to be liberated. There is only the idea that there is someone in bondage. When this idea is seen through, what remains is freedom itself.",
    works: [
      "Nothing Ever Happened (David Godman — 3 vols.)",
      "Wake Up and Roar",
      "The Truth Is",
    ],
    color: "#0284c7",
    path: "/leaves/papaji",
    spectrumPercent: 8,
    tag: "Direct Path",
  },
  {
    id: "krishnamurti",
    name: "Jiddu Krishnamurti",
    period: "1895–1986 — India / International",
    category: "classical",
    coreQuestion: "Can the human mind empty itself of all memory, conditioning, and authority to discover the unconditioned?",
    contribution:
      "Maintained that truth is a pathless land. Rejected all gurus, belief systems, and psychological authority. Highlighted that the observer is the observed, and that psychological time is the source of all human conflict.",
    quote: "The observer is the observed. Truth is a pathless land, and you cannot approach it by any path whatsoever.",
    works: ["The First and Last Freedom", "Freedom from the Known", "The Awakening of Intelligence"],
    color: "#0284c7",
    path: "/leaves/krishnamurti",
    spectrumPercent: 14,
    tag: "Pathless Path",
  },
  {
    id: "watts",
    name: "Alan Watts",
    period: "1915–1973 — UK / USA",
    category: "classical",
    coreQuestion: "What if the feeling of being a separate ego 'shrink-wrapped' in a bag of skin is a cultural hallucination?",
    contribution:
      "Interpreted Zen Buddhism, Taoism, and Vedanta for the West. Popularized the idea that the individual is not an isolated stranger in the universe, but an expression of the entire cosmic energy patterns.",
    quote: "You are an aperture through which the universe is looking at and exploring itself.",
    works: ["The Book: On the Taboo Against Knowing Who You Are", "The Wisdom of Insecurity", "The Way of Zen"],
    color: "#0284c7",
    path: "/leaves/watts",
    spectrumPercent: 30,
    tag: "Western Zen",
  },

  // ──── MODERN SCIENTISTS & PHILOSOPHERS ───────────────────────────────────
  {
    id: "faggin",
    name: "Federico Faggin",
    period: "1941– — Italy / USA",
    category: "scientific",
    coreQuestion: "Can consciousness — with its qualia, free will, and meaning — be reduced to computation?",
    contribution:
      "Inventor of the microprocessor. Concluded that consciousness cannot arise from computation — qualia and meaning are irreducibly non-computational. Proposed a quantum model for fundamental awareness.",
    quote: "Consciousness is not what the brain does. It is what the brain is an expression of.",
    works: ["Irreducible: Consciousness, Life, Computers, and Human Nature"],
    color: "#34d399",
    path: "/leaves/faggin",
    spectrumPercent: 68,
    tag: "Quantum Mind",
  },
  {
    id: "chopra",
    name: "Deepak Chopra",
    period: "1946– — India / USA",
    category: "scientific",
    coreQuestion: "How do consciousness, healing, and the nature of reality intersect?",
    contribution:
      "Prominent bridge bringing mind-body medicine and non-dual Vedantic philosophy into mainstream Western culture, collaborating with scientists to ground these concepts in contemporary frameworks.",
    quote:
      "Consciousness is the ground of all being. The universe is not made of dead matter; it is made of living consciousness.",
    works: ["You Are the Universe (with Menas Kafatos)", "Quantum Healing"],
    color: "#94a3b8",
    path: "/leaves/chopra",
    spectrumPercent: 50,
    tag: "Integrative Bridge",
  },
  {
    id: "metzinger",
    name: "Thomas Metzinger",
    period: "1958– — Germany",
    category: "scientific",
    coreQuestion: "What is the self — and what happens when the brain's model of the self breaks down?",
    contribution:
      "Developed the Phenomenal Self-Model (PSM): selves do not exist in the world — there are only transparent mental models of the self generated by the brain, arriving at the Buddhist no-self through purely scientific means.",
    quote:
      "No such things as selves exist in the world. Nobody ever was or had a self. All that ever existed were conscious self-models that nobody owned.",
    works: ["The Ego Tunnel", "Being No One"],
    color: "#94a3b8",
    path: "/leaves/metzinger",
    spectrumPercent: 60,
    tag: "PSM Theory",
  },
  {
    id: "hoffman",
    name: "Donald Hoffman",
    period: "1955– — USA",
    category: "scientific",
    coreQuestion:
      "Is the world we perceive the world as it actually is — or a user interface shaped by fitness?",
    contribution:
      "Applied evolutionary game theory to prove that our perception is a species-specific interface hiding objective reality. Hypothesizes that reality is a network of interacting conscious agents — not physical objects.",
    quote:
      "Evolution has shaped us with perceptions that allow us to survive. But part of that involves hiding from us the stuff we don't need to know. And that's pretty much all of reality.",
    works: ["The Case Against Reality", "Objects of Consciousness (research paper)"],
    color: "#34d399",
    path: "/leaves/hoffman",
    spectrumPercent: 72,
    tag: "Conscious Agents",
  },
  {
    id: "chalmers",
    name: "David Chalmers",
    period: "1966– — Australia / USA",
    category: "scientific",
    coreQuestion: "Why is there something it is like to have an experience?",
    contribution:
      "Formulated the 'Hard Problem of Consciousness'. Demonstrated that explaining cognitive functions is entirely distinct from explaining subjective feel — legitimizing consciousness as an irreducible fundamental parameter.",
    quote:
      "Why is it that when our cognitive systems engage in visual and auditory information-processing, we have visual or auditory experience? Why doesn't all of this go on 'in the dark'?",
    works: ["Facing Up to the Problem of Consciousness (1995)", "The Conscious Mind", "Reality+"],
    color: "#f43f5e",
    path: "/leaves/chalmers",
    spectrumPercent: 85,
    tag: "Hard Problem",
  },
  {
    id: "kastrup",
    name: "Bernardo Kastrup",
    period: "1973– — Netherlands",
    category: "scientific",
    coreQuestion:
      "Why is idealism — consciousness as the ground of all existence — the most parsimonious account of reality?",
    contribution:
      "Rehabilitated Analytical Idealism. Reality is a singular cosmic mind; individual minds are dissociated alters of that cosmic consciousness — the same position as Advaita Vedanta, arrived at by different routes.",
    quote:
      "The world is in mind, not mind in the world. What we call matter is the extrinsic appearance of mental processes we cannot introspect from the outside.",
    works: ["The Idea of the World", "Why Materialism Is Baloney", "More Than Allegory"],
    color: "#f43f5e",
    path: "/leaves/kastrup",
    spectrumPercent: 62,
    tag: "Analytical Idealism",
  },
  {
    id: "goff",
    name: "Philip Goff",
    period: "1978– — UK",
    category: "scientific",
    coreQuestion:
      "What if consciousness was never something to be explained by physics — but something physics was always built on top of?",
    contribution:
      "Argued that Galileo's exclusion of qualities from physics created the Hard Problem. Advocates panpsychism: consciousness is the intrinsic nature of matter, present at all levels of reality.",
    quote:
      "The hard problem of consciousness is not a problem about consciousness. It's a problem about matter — about why our purely quantitative conception of matter leaves no room for the qualities of experience.",
    works: ["Galileo's Error: Foundations for a New Science of Consciousness"],
    color: "#f43f5e",
    path: "/leaves/goff",
    spectrumPercent: 78,
    tag: "Panpsychism",
  },
  {
    id: "koch",
    name: "Christof Koch",
    period: "1956– — Germany / USA",
    category: "scientific",
    coreQuestion:
      "What are the neural correlates of consciousness — and what do decades of searching for them reveal?",
    contribution:
      "Spent decades mapping the brain structures necessary for conscious states with Francis Crick. Followed empirical evidence away from strict reductionism toward Integrated Information Theory and scientific panpsychism.",
    quote:
      "Consciousness is the central fact of your life... You can doubt many things. But you cannot doubt your own consciousness.",
    works: ["The Feeling of Life Itself", "Consciousness: Confessions of a Romantic Reductionist"],
    color: "#94a3b8",
    path: "/leaves/koch",
    spectrumPercent: 88,
    tag: "Neuroscience",
  },
  {
    id: "bohm",
    name: "David Bohm",
    period: "1917–1992 — USA / UK",
    category: "scientific",
    coreQuestion: "Does quantum physics reveal an undivided, flowing wholeness in which matter and consciousness are folded into each other?",
    contribution:
      "Proposed the Implicate and Explicate Order. Argued that space-time and physical particles are a surface appearance (explicate order) emerging from an underlying, undivided wholeness (implicate order). Conducted historic dialogues with J. Krishnamurti exploring the nature of thought as a material process.",
    quote: "Reality is an undivided wholeness, and all parts, including the observer and the observed, merge and coalesce in a single flow.",
    works: ["Wholeness and the Implicate Order", "The Ending of Time (with J. Krishnamurti)", "On Dialogue"],
    color: "#ec407a",
    path: "/leaves/bohm",
    spectrumPercent: 75,
    tag: "Quantum Whole",
  },

  // ──── CONTEMPORARY TEACHERS ───────────────────────────────────────────────
  {
    id: "sarvapriyananda",
    name: "Swami Sarvapriyananda",
    period: "1969– — India / USA",
    category: "contemporary",
    coreQuestion:
      "How can Advaita Vedanta be conveyed with full philosophical rigour and zero dilution to the modern mind?",
    contribution:
      "Spiritual head of the Vedanta Society of New York. His freely available lecture series — Mandukya Upanishad, Drk-Drsya Viveka — represent the most rigorous English-language treatment of Vedantic epistemology.",
    quote:
      "The Witness is never the witnessed. Consciousness is never an object... That which is aware is the Subject of all subjects.",
    works: ["Mandukya Upanishad lecture series (YouTube)", "Drk-Drsya Viveka lectures"],
    color: "#e11d48",
    path: "/leaves/sarvapriyananda",
    spectrumPercent: 18,
    tag: "Advaita Teacher",
  },
  {
    id: "spira",
    name: "Rupert Spira",
    period: "1960– — UK",
    category: "contemporary",
    coreQuestion:
      "What is the nature of experience itself — and what does careful attention to experience reveal?",
    contribution:
      "Conveys the 'Direct Path' of non-duality. Guides students to look closely at immediate experience to discover that consciousness is unlimited, universal, and the primary container of all occurrence.",
    quote:
      "You are not inside the body. The body is inside you — inside awareness. Experience is a movement within awareness.",
    works: ["The Nature of Consciousness", "Being Aware of Being Aware", "Presence Vol. I & II"],
    color: "#0284c7",
    path: "/leaves/spira",
    spectrumPercent: 22,
    tag: "Direct Path",
  },
  {
    id: "lucille",
    name: "Francis Lucille",
    period: "1944– — France / USA",
    category: "contemporary",
    coreQuestion:
      "What is the direct recognition of our true nature — and how does it dissolve the sense of separation?",
    contribution:
      "Carries the lineage of Atmananda Krishna Menon. Uses Socratic, precise dialogue to help questioners discover the unattached knowing presence — teacher of Rupert Spira.",
    quote:
      "You are not the one who has experiences. You are the experiencing itself. Not a subject among objects, but the knowing presence.",
    works: ["Eternity Now", "Truth Love Beauty", "The Perfume of Silence"],
    color: "#0284c7",
    path: "/leaves/lucille",
    spectrumPercent: 12,
    tag: "Non-Duality",
  },
  {
    id: "kanojia",
    name: "Dr. Alok Kanojia",
    period: "1985– — India / USA",
    category: "scientific",
    coreQuestion:
      "How can psychiatry, neuroscience, and contemplative practices be integrated to heal modern mental health crises?",
    contribution:
      "Psychiatrist and founder of HealthyGamer. Integrates neuroscience, modern psychiatry, and contemplative psychology into actionable clinical tools to treat digital addiction and identity crisis.",
    quote:
      "The mind is not broken — it is a tool we were never taught to use. And the ancient traditions knew this.",
    works: ["HealthyGamer YouTube — Neuroscience & addiction series", "How to ADHD & Addiction lectures"],
    color: "#94a3b8",
    path: "/leaves/kanojia",
    spectrumPercent: 58,
    tag: "Psychiatry",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Era configuration
// ─────────────────────────────────────────────────────────────────────────────

const ERA_CONFIG = {
  ancient: {
    label: "Ancient & Classical",
    subtitle: "Pre-900 CE · Foundational Sages",
  },
  classical: {
    label: "Classical Era",
    subtitle: "1800–1950 · Transmission & Synthesis",
  },
  scientific: {
    label: "Modern Science & Philosophy",
    subtitle: "1941–Present · Researchers & Philosophers",
  },
  contemporary: {
    label: "Living Teachers",
    subtitle: "1944–Present · Contemporary Integrators",
  },
} as const;

type FilterKey = "all" | "ancient" | "classical" | "scientific" | "contemporary";

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function SpectrumBar({ percent, color }: { percent: number; color: string }) {
  return (
    <div className="relative h-px bg-white/5 mb-5 mt-1">
      <div
        className="absolute -top-[5px] w-2.5 h-2.5 rounded-full border-2 border-[#05060b] -translate-x-1/2"
        style={{
          left: `${Math.min(Math.max(percent, 2), 98)}%`,
          backgroundColor: color,
          boxShadow: `0 0 6px ${color}`,
        }}
      />
      <span className="absolute left-0 -bottom-3.5 text-[7px] font-mono text-white/15 tracking-widest leading-none">
        ROOTS
      </span>
      <span className="absolute right-0 -bottom-3.5 text-[7px] font-mono text-white/15 tracking-widest leading-none">
        BRANCHES
      </span>
    </div>
  );
}

function ThinkerCard({ t }: { t: Thinker }) {
  return (
    <Link href={t.path} className="block h-full">
      <div
        className="group relative rounded-2xl border bg-[#07080f]/90 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] cursor-pointer h-full flex flex-col justify-between"
        style={{ borderColor: `${t.color}18` }}
      >
        {/* Left accent stripe */}
        <div
          className="absolute inset-y-0 left-0 w-[2px] transition-opacity duration-300 opacity-40 group-hover:opacity-100"
          style={{ background: t.color }}
        />

        {/* Hover glow bg */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 0% 0%, ${t.color}0c, transparent 65%)`,
          }}
        />

        <div className="relative px-5 pt-5 pb-4 flex flex-col flex-1 justify-between">
          <div>
            {/* Meta row */}
            <div className="flex justify-between items-start gap-2 mb-3">
              <span className="text-[10px] font-mono tracking-[0.12em] text-white/25 uppercase leading-none">
                {t.period}
              </span>
              <span
                className="text-[9px] rounded-full px-2 py-0.5 tracking-[0.12em] border font-mono whitespace-nowrap uppercase"
                style={{
                  color: t.color,
                  borderColor: `${t.color}28`,
                  background: `${t.color}0a`,
                }}
              >
                {t.tag}
              </span>
            </div>

            {/* Name */}
            <h3
              className="font-serif text-xl leading-snug text-[#f3e5ab] group-hover:text-white transition-colors duration-300 mb-4"
            >
              {t.name}
            </h3>

            {/* Spectrum bar */}
            <SpectrumBar percent={t.spectrumPercent} color={t.color} />

            {/* Core question */}
            <p className="italic text-[13px] text-white/70 leading-relaxed mt-4">
              &ldquo;{t.coreQuestion}&rdquo;
            </p>

            {/* Contribution (static, clamped to 3 lines) */}
            <p className="text-[12px] text-white/45 leading-relaxed mt-3 line-clamp-3 group-hover:text-white/60 transition-colors duration-300">
              {t.contribution}
            </p>
          </div>

          {/* CTA ─ always visible at bottom */}
          <div
            className="mt-6 pt-3 border-t flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 opacity-40 group-hover:opacity-90"
            style={{ borderColor: `${t.color}10`, color: t.color }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Full Profile</span>
            <ChevronRight className="w-3.5 h-3.5 ml-auto group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function EraHeader({ category }: { category: keyof typeof ERA_CONFIG }) {
  const cfg = ERA_CONFIG[category];
  return (
    <div className="relative flex items-center gap-6 mb-8">
      <div className="flex-1 h-px bg-white/5" />
      <div className="text-center px-4 shrink-0">
        <div className="text-[9px] font-mono tracking-[0.22em] text-[#d4af37]/25 uppercase mb-1">
          {cfg.subtitle}
        </div>
        <h2 className="font-serif text-xl text-[#ffd700]/70 tracking-wide">{cfg.label}</h2>
      </div>
      <div className="flex-1 h-px bg-white/5" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function ThinkersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return THINKERS.filter((t) => {
      const matchSearch =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.coreQuestion.toLowerCase().includes(q) ||
        t.contribution.toLowerCase().includes(q) ||
        t.tag.toLowerCase().includes(q);
      const matchFilter = filter === "all" || t.category === filter;
      return matchSearch && matchFilter;
    });
  }, [search, filter]);

  const eraGroups = useMemo(() => {
    if (filter !== "all") return null;
    const groups: Partial<Record<keyof typeof ERA_CONFIG, Thinker[]>> = {};
    for (const cat of ["ancient", "classical", "scientific", "contemporary"] as const) {
      const items = filtered.filter((t) => t.category === cat);
      if (items.length > 0) groups[cat] = items;
    }
    return groups;
  }, [filtered, filter]);

  const filterOptions: { key: FilterKey; label: string }[] = [
    { key: "all", label: `All (${THINKERS.length})` },
    {
      key: "ancient",
      label: `Ancient (${THINKERS.filter((t) => t.category === "ancient").length})`,
    },
    {
      key: "classical",
      label: `Classical (${THINKERS.filter((t) => t.category === "classical").length})`,
    },
    {
      key: "scientific",
      label: `Modern Science (${THINKERS.filter((t) => t.category === "scientific").length})`,
    },
    {
      key: "contemporary",
      label: `Living Teachers (${THINKERS.filter((t) => t.category === "contemporary").length})`,
    },
  ];

  return (
    <main
      className="relative flex flex-col min-h-screen text-[#f3e5ab] overflow-x-hidden"
      style={{ background: "#05060b" }}
    >
      <StarField blur />
      <Header />

      <div className="relative z-10 max-w-6xl mx-auto w-full px-6 pt-32 pb-28">
        {/* ── Page hero ─────────────────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[9px] tracking-[0.22em] font-mono uppercase border-[#d4af37]/18 bg-[#d4af37]/4 text-[#d4af37]/50 mb-5">
            ⬡ &nbsp;Thinker Leaves
          </div>
          <h1 className="font-serif text-4xl md:text-[58px] tracking-wide text-[#ffd700] mb-5 leading-tight">
            Sages &amp; Scientists
          </h1>
          <p className="text-xs leading-relaxed text-[#d4af37]/45 italic max-w-lg mx-auto">
            The historical and living minds whose inquiries form the leaves of the Tree of Truth —
            from ancient sages to frontier researchers converging on the same ground.
          </p>
          {/* Stats chips */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            {(
              [
                { label: "Ancient Sages", cat: "ancient", color: "#f59e0b" },
                { label: "Classical Era", cat: "classical", color: "#0284c7" },
                { label: "Modern Science", cat: "scientific", color: "#34d399" },
                { label: "Living Teachers", cat: "contemporary", color: "#e11d48" },
              ] as const
            ).map(({ label, cat, color }) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
                style={{
                  borderColor: filter === cat ? `${color}50` : `${color}18`,
                  background: filter === cat ? `${color}10` : "transparent",
                  color: filter === cat ? color : `${color}60`,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: color, boxShadow: `0 0 5px ${color}` }}
                />
                <span className="text-[9px] font-mono tracking-widest uppercase">{label}</span>
                <span
                  className="text-[9px] font-mono"
                  style={{ color: filter === cat ? color : `${color}50` }}
                >
                  {THINKERS.filter((t) => t.category === cat).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Search + filter bar ──────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-12 items-start sm:items-center border-b border-white/5 pb-8">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
            <input
              type="text"
              placeholder="Search names, questions, ideas…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full text-[11px] outline-none border bg-white/3 border-white/8 text-[#f3e5ab] placeholder-white/18 focus:border-[#d4af37]/30 transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-3 py-1.5 rounded-full text-[9px] font-bold tracking-widest uppercase border transition-all duration-300 cursor-pointer ${
                  filter === f.key
                    ? "bg-[#d4af37] text-[#05060b] border-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.3)]"
                    : "border-white/10 text-white/35 hover:text-white/60 hover:border-white/20"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Content ──────────────────────────────────────────────────────── */}
        {eraGroups ? (
          // Grouped by era (All view)
          <div className="flex flex-col gap-16">
            {(["ancient", "classical", "scientific", "contemporary"] as const).map((era) => {
              const thinkers = eraGroups[era];
              if (!thinkers) return null;
              return (
                <section key={era}>
                  <EraHeader category={era} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {thinkers.map((t) => (
                      <ThinkerCard key={t.id} t={t} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : filtered.length > 0 ? (
          // Flat grid (filtered)
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((t) => (
              <ThinkerCard key={t.id} t={t} />
            ))}
          </div>
        ) : (
          // Empty state
          <div className="text-center py-28 border rounded-2xl border-white/5 bg-white/[0.015]">
            <div className="text-5xl mb-5 opacity-15">◎</div>
            <p className="font-serif text-lg text-[#d4af37]/40 mb-2">No thinkers found</p>
            <p className="text-xs text-white/20">Adjust your search or clear the filters.</p>
          </div>
        )}
      </div>
    </main>
  );
}
