export interface TreeNode {
  id: string;
  name: string;
  question: string;
  path: string;
  category: "roots" | "branches" | "trunk" | "leaves" | "fruit";
  x: number;
  y: number;
  z: number;
  x2d: number;
  y2d: number;
  color: string;
  size: number;
  parentId?: string;
}

export const TREE_NODES: TreeNode[] = [
  // 1. Trunk (Pure Awareness) - center spine
  {
    id: "trunk",
    name: "Pure Awareness",
    question: "What remains when everything that can be taken away is taken away?",
    path: "/trunk",
    category: "trunk",
    x: 0,
    y: 0,
    z: 0,
    x2d: 500,
    y2d: 490,
    color: "#ffffff",
    size: 0.45,
  },

  // 2. Roots (Ancient Wisdom)
  // Main Root Nodes
  { id: "r_vedanta", name: "Vedanta Wisdom", question: "Is individual self-identity an illusion?", path: "/roots/vedanta", category: "roots", x: -1.8, y: -1.2, z: 0.2, x2d: 320, y2d: 640, color: "#ffb300", size: 0.32, parentId: "trunk" },
  { id: "r_buddhism", name: "Buddhist Thought", question: "If the self is empty, what experiences?", path: "/roots/buddhism", category: "roots", x: -0.6, y: -1.3, z: -0.6, x2d: 400, y2d: 650, color: "#ff8f00", size: 0.32, parentId: "trunk" },
  { id: "r_inquiry", name: "Direct Inquiry", question: "Who is the one asking?", path: "/roots/inquiry", category: "roots", x: 0.2, y: -1.0, z: 0.8, x2d: 460, y2d: 645, color: "#ffd54f", size: 0.34, parentId: "trunk" },
  { id: "r_shivom", name: "Shivom's Inquiry", question: "What remains without senses and memory?", path: "/roots/shivom", category: "roots", x: -0.9, y: -0.9, z: 0.6, x2d: 540, y2d: 645, color: "#ffca28", size: 0.34, parentId: "trunk" },
  { id: "r_phenomenology", name: "Phenomenology", question: "What structures experience itself?", path: "/roots/phenomenology", category: "roots", x: 0.8, y: -1.2, z: 0.3, x2d: 600, y2d: 650, color: "#f57c00", size: 0.32, parentId: "trunk" },
  { id: "r_esoteric", name: "Esoteric Realities", question: "Does awareness survive physical death?", path: "/roots/esoteric", category: "roots", x: 1.8, y: -1.1, z: 0.5, x2d: 680, y2d: 640, color: "#e65100", size: 0.32, parentId: "trunk" },

  // Vedanta Subroots
  { id: "rs_advaita", name: "Advaita (Non-Duality)", question: "Brahman alone is real; all is one.", path: "/roots/vedanta/advaita", category: "roots", x: -2.8, y: -2.0, z: 0.4, x2d: 200, y2d: 700, color: "#ffe082", size: 0.22, parentId: "r_vedanta" },
  { id: "rs_dvaita", name: "Dvaita (Duality)", question: "Individual soul and God are eternally separate.", path: "/roots/vedanta/dvaita", category: "roots", x: -3.2, y: -1.7, z: -0.4, x2d: 250, y2d: 745, color: "#ffd54f", size: 0.20, parentId: "r_vedanta" },
  { id: "rs_sankhya", name: "Samkhya Philosophy", question: "Discrimination between witness and matter.", path: "/roots/vedanta/sankhya", category: "roots", x: -2.4, y: -2.3, z: 0.8, x2d: 290, y2d: 755, color: "#ffca28", size: 0.20, parentId: "r_vedanta" },
  { id: "rs_upanishads", name: "The Upanishads", question: "The ancient texts declaring unity.", path: "/roots/vedanta/upanishads", category: "roots", x: -1.8, y: -2.1, z: -0.5, x2d: 340, y2d: 725, color: "#ffc107", size: 0.22, parentId: "r_vedanta" },
  { id: "rs_gitas", name: "The Gitas", question: "Dialogues pointing to absolute freedom.", path: "/roots/vedanta/gitas", category: "roots", x: -1.2, y: -1.9, z: 0.4, x2d: 380, y2d: 700, color: "#ffb300", size: 0.22, parentId: "r_vedanta" },

  // Buddhist Subroots
  { id: "rs_annatta", name: "Anatta (No-Self)", question: "No permanent, independent ego exists.", path: "/roots/buddhism/annatta", category: "roots", x: -0.9, y: -2.1, z: -1.0, x2d: 370, y2d: 735, color: "#ffcc80", size: 0.20, parentId: "r_buddhism" },
  { id: "rs_sunyata", name: "Sunyata (Emptiness)", question: "All things are empty of independent essence.", path: "/roots/buddhism/sunyata", category: "roots", x: -0.2, y: -2.7, z: -1.4, x2d: 405, y2d: 785, color: "#ffb74d", size: 0.20, parentId: "r_buddhism" },
  { id: "rs_rigpa", name: "Rigpa (Pure Awareness)", question: "The spacious, self-luminous state.", path: "/roots/buddhism/rigpa", category: "roots", x: -0.7, y: -2.7, z: -0.5, x2d: 435, y2d: 775, color: "#ffa726", size: 0.20, parentId: "r_buddhism" },

  // Phenomenology Subroots
  { id: "rs_reduction", name: "The Reduction (Epoché)", question: "Bracket physical theories for raw experience.", path: "/roots/phenomenology/reduction", category: "roots", x: 1.2, y: -2.0, z: 0.2, x2d: 570, y2d: 690, color: "#ffab91", size: 0.20, parentId: "r_phenomenology" },
  { id: "rs_selfconstruct", name: "Self as Construct", question: "The transparent phenomenal self-model.", path: "/roots/phenomenology/self-construct", category: "roots", x: 1.7, y: -1.9, z: -0.4, x2d: 565, y2d: 735, color: "#ff8a65", size: 0.20, parentId: "r_phenomenology" },
  { id: "rs_presence", name: "Pure Presence", question: "The minimal pre-reflective subject.", path: "/roots/phenomenology/presence", category: "roots", x: 0.6, y: -2.3, z: 0.6, x2d: 590, y2d: 735, color: "#ff7043", size: 0.20, parentId: "r_phenomenology" },

  // Esoteric Subroots
  { id: "rs_rebirth", name: "Rebirth & Bardo", question: "Hypotheses on post-death continuity.", path: "/roots/esoteric/rebirth", category: "roots", x: 2.3, y: -1.9, z: 0.8, x2d: 620, y2d: 700, color: "#ffcc80", size: 0.20, parentId: "r_esoteric" },
  { id: "rs_subtlebody", name: "The Subtle Body Map", question: "Interoceptive nervous system energy paths.", path: "/roots/esoteric/subtle-body", category: "roots", x: 2.7, y: -1.7, z: 0.4, x2d: 660, y2d: 725, color: "#ffb74d", size: 0.20, parentId: "r_esoteric" },
  { id: "rs_astral", name: "Astral Travel & OBEs", question: "Awareness projecting outside spatial body.", path: "/roots/esoteric/astral-travel", category: "roots", x: 2.5, y: -2.4, z: 0.6, x2d: 695, y2d: 700, color: "#ffa726", size: 0.20, parentId: "r_esoteric" },
  { id: "rs_ndes", name: "NDEs & Flatlines", question: "Consciousness active during brain shutdown.", path: "/roots/esoteric/ndes", category: "roots", x: 2.6, y: -2.3, z: 1.1, x2d: 720, y2d: 705, color: "#ff9800", size: 0.20, parentId: "r_esoteric" },
  { id: "rs_enlightenment", name: "Enlightenment & Union", question: "Universal loss of subject-object boundary.", path: "/roots/esoteric/enlightenment", category: "roots", x: 1.5, y: -2.0, z: 1.0, x2d: 720, y2d: 670, color: "#fb8c00", size: 0.20, parentId: "r_esoteric" },

  // Direct Inquiry Subroots
  { id: "rs_selfinquiry", name: "Self-Inquiry Practice", question: "Inquire: 'To whom does this arise?'", path: "/roots/inquiry/self-inquiry", category: "roots", x: -0.2, y: -1.9, z: 1.3, x2d: 495, y2d: 785, color: "#ffe082", size: 0.22, parentId: "r_inquiry" },
  { id: "rs_netineti", name: "Neti Neti Negation", question: "Subtracting observer from observed.", path: "/roots/inquiry/neti-neti", category: "roots", x: 0.8, y: -1.8, z: 1.4, x2d: 485, y2d: 705, color: "#ffd54f", size: 0.22, parentId: "r_inquiry" },
  { id: "rs_witness", name: "The Witness", question: "The unchanging, silent screen of awareness.", path: "/roots/inquiry/witness", category: "roots", x: 0.2, y: -2.7, z: 1.0, x2d: 490, y2d: 745, color: "#ffca28", size: 0.22, parentId: "r_inquiry" },
  { id: "rs_whoami", name: "Who Am I?", question: "Reversing attention to its source.", path: "/roots/inquiry/who-am-i", category: "roots", x: -0.4, y: -2.4, z: 1.4, x2d: 475, y2d: 685, color: "#ffc107", size: 0.22, parentId: "r_inquiry" },

  // Shivom's Inquiry Subroots
  { id: "rs_deepsleep", name: "Deep Sleep Argument", question: "continuity of being in dreamless void.", path: "/roots/shivom/deep-sleep", category: "roots", x: -1.3, y: -1.8, z: 1.1, x2d: 505, y2d: 735, color: "#ffe082", size: 0.22, parentId: "r_shivom" },
  { id: "rs_sensory", name: "Sensory Impairment", question: "Ego formation without sensory datasets.", path: "/roots/shivom/sensory-impairment", category: "roots", x: -1.7, y: -2.0, z: 0.8, x2d: 515, y2d: 720, color: "#ffd54f", size: 0.22, parentId: "r_shivom" },
  { id: "rs_womb", name: "The Womb", question: "Pure subjectivity prior to language.", path: "/roots/shivom/womb", category: "roots", x: -1.0, y: -2.3, z: 1.3, x2d: 535, y2d: 715, color: "#ffca28", size: 0.22, parentId: "r_shivom" },
  { id: "rs_memoryloss", name: "Memory Loss", question: "Witnessing identity without personal recall.", path: "/roots/shivom/memory-loss", category: "roots", x: -2.0, y: -2.2, z: 1.2, x2d: 570, y2d: 705, color: "#ffc107", size: 0.22, parentId: "r_shivom" },

  // 3. Branches (Modern Science)
  // Main Branch Nodes
  { id: "b_neuroscience", name: "Neuroscience", question: "What does the brain do, and what are its limits?", path: "/branches/neuroscience", category: "branches", x: -1.8, y: 1.2, z: 0.3, x2d: 320, y2d: 340, color: "#42a5f5", size: 0.32, parentId: "trunk" },
  { id: "b_philosophy", name: "Philosophy of Mind", question: "Is experience fully explainable physically?", path: "/branches/philosophy", category: "branches", x: -0.6, y: 1.3, z: -0.4, x2d: 400, y2d: 310, color: "#26a69a", size: 0.32, parentId: "trunk" },
  { id: "b_cognitive", name: "Cognitive Science", question: "How does the brain model reality?", path: "/branches/cognitive", category: "branches", x: 0.5, y: 1.3, z: 0.3, x2d: 460, y2d: 290, color: "#ab47bc", size: 0.32, parentId: "trunk" },
  { id: "b_quantum", name: "Quantum Mind", question: "Does quantum physics describe awareness?", path: "/branches/quantum", category: "branches", x: 1.5, y: 1.2, z: -0.4, x2d: 540, y2d: 290, color: "#ec407a", size: 0.32, parentId: "trunk" },
  { id: "b_panpsychism", name: "Panpsychism & Idealism", question: "Is consciousness the fundamental ground?", path: "/branches/panpsychism", category: "branches", x: 2.0, y: 1.0, z: 0.5, x2d: 600, y2d: 310, color: "#ef5350", size: 0.34, parentId: "trunk" },
  { id: "b_ai", name: "AI & Consciousness", question: "Can silicon computation generate feel?", path: "/branches/ai", category: "branches", x: -0.8, y: 1.4, z: 0.6, x2d: 680, y2d: 340, color: "#26c6da", size: 0.32, parentId: "trunk" },

  // Neuroscience Sub-branches
  { id: "bs_ncc", name: "NCC Mapping", question: "Isolating the posterior hot zones.", path: "/branches/neuroscience/ncc", category: "branches", x: -2.5, y: 1.8, z: 0.5, x2d: 220, y2d: 280, color: "#90caf9", size: 0.20, parentId: "b_neuroscience" },
  { id: "bs_dmn", name: "Default Mode Network", question: "Neural signature of egoic projection.", path: "/branches/neuroscience/dmn", category: "branches", x: -2.9, y: 1.6, z: 0.2, x2d: 250, y2d: 250, color: "#64b5f6", size: 0.20, parentId: "b_neuroscience" },
  { id: "bs_binding", name: "Binding Problem", question: "Sewing separate sensory streams together.", path: "/branches/neuroscience/binding", category: "branches", x: -2.3, y: 2.1, z: -0.2, x2d: 290, y2d: 230, color: "#42a5f5", size: 0.20, parentId: "b_neuroscience" },
  { id: "bs_global", name: "Global Workspace", question: "Access consciousness via brain broadcasts.", path: "/branches/neuroscience/global-workspace", category: "branches", x: -1.8, y: 1.9, z: 0.7, x2d: 340, y2d: 240, color: "#2196f3", size: 0.20, parentId: "b_neuroscience" },

  // Philosophy Sub-branches
  { id: "bs_hardproblem", name: "The Hard Problem", question: "Subjective feel vs. mechanical syntax.", path: "/branches/philosophy/hard-problem", category: "branches", x: -1.0, y: 1.9, z: -0.5, x2d: 340, y2d: 200, color: "#80cbc4", size: 0.22, parentId: "b_philosophy" },
  { id: "bs_qualia", name: "Qualia & Mary's Room", question: "Experienced colors outside physical facts.", path: "/branches/philosophy/qualia", category: "branches", x: -1.3, y: 1.8, z: -0.9, x2d: 370, y2d: 185, color: "#4db6ac", size: 0.20, parentId: "b_philosophy" },
  { id: "bs_zombies", name: "Philosophical Zombies", question: "Conceiving intelligence without experience.", path: "/branches/philosophy/zombies", category: "branches", x: -0.5, y: 2.3, z: -0.7, x2d: 405, y2d: 175, color: "#26a69a", size: 0.20, parentId: "b_philosophy" },
  { id: "bs_iit", name: "IIT Model", question: "Consciousness as integrated information (Φ).", path: "/branches/philosophy/iit", category: "branches", x: -0.3, y: 1.9, z: -0.3, x2d: 430, y2d: 195, color: "#00897b", size: 0.20, parentId: "b_philosophy" },

  // Cognitive Sub-branches
  { id: "bs_embodied", name: "Embodied Cognition", question: "Mind extending through biological action.", path: "/branches/cognitive/embodied", category: "branches", x: 0.6, y: 1.9, z: 0.4, x2d: 440, y2d: 230, color: "#ce93d8", size: 0.20, parentId: "b_cognitive" },
  { id: "bs_selfconstruction", name: "Self-Construction", question: "Ego assembled from bodily predictions.", path: "/branches/cognitive/self-construction", category: "branches", x: 1.0, y: 1.8, z: 0.1, x2d: 470, y2d: 220, color: "#ba68c8", size: 0.20, parentId: "b_cognitive" },
  { id: "bs_predictive", name: "Predictive Brain", question: "Experience as a controlled hallucination.", path: "/branches/cognitive/predictive", category: "branches", x: 0.3, y: 2.3, z: 0.5, x2d: 490, y2d: 200, color: "#ab47bc", size: 0.20, parentId: "b_cognitive" },

  // Quantum Sub-branches
  { id: "bs_observer", name: "Observer Problem", question: "Measurement wave collapse requirements.", path: "/branches/quantum/observer", category: "branches", x: 1.8, y: 1.8, z: -0.5, x2d: 510, y2d: 200, color: "#f48fb1", size: 0.20, parentId: "b_quantum" },
  { id: "bs_orch-or", name: "Penrose-Hameroff", question: "Quantum coherence inside microtubules.", path: "/branches/quantum/orch-or", category: "branches", x: 2.2, y: 1.6, z: -0.2, x2d: 530, y2d: 220, color: "#f06292", size: 0.20, parentId: "b_quantum" },
  { id: "bs_nonlocality", name: "Non-locality", question: "Entangled reality challenging separation.", path: "/branches/quantum/non-locality", category: "branches", x: 1.5, y: 2.2, z: -0.4, x2d: 560, y2d: 230, color: "#ec407a", size: 0.20, parentId: "b_quantum" },
  { id: "bs_interface", name: "Interface Theory", question: "Space-time as desktop user icons.", path: "/branches/quantum/interface", category: "branches", x: 2.0, y: 2.0, z: -0.8, x2d: 590, y2d: 195, color: "#d81b60", size: 0.20, parentId: "b_quantum" },

  // Panpsychism Sub-branches
  { id: "bs_idealism", name: "Analytical Idealism", question: "Dissociated alters of a single mind.", path: "/branches/panpsychism/idealism", category: "branches", x: 2.4, y: 1.8, z: 0.6, x2d: 570, y2d: 175, color: "#ef9a9a", size: 0.22, parentId: "b_panpsychism" },
  { id: "bs_goff", name: "Philip Goff", question: "Galileo's error excluding experience.", path: "/branches/panpsychism/goff", category: "branches", x: 2.8, y: 1.6, z: 0.3, x2d: 630, y2d: 185, color: "#e57373", size: 0.20, parentId: "b_panpsychism" },
  { id: "bs_chalmers_pan", name: "David Chalmers", question: "Property dualism to fundamental panpsychism.", path: "/branches/panpsychism/chalmers", category: "branches", x: 2.0, y: 2.0, z: 0.6, x2d: 660, y2d: 200, color: "#ef5350", size: 0.20, parentId: "b_panpsychism" },
  { id: "bs_faggin_pan", name: "Federico Faggin", question: "Semantic reality prior to physical syntax.", path: "/branches/panpsychism/faggin", category: "branches", x: 2.7, y: 2.0, z: 0.8, x2d: 690, y2d: 220, color: "#e53935", size: 0.20, parentId: "b_panpsychism" },

  // AI Sub-branches
  { id: "bs_learning", name: "Learning Comparison", question: "Statistical weight optimization vs. experience.", path: "/branches/ai/learning-comparison", category: "branches", x: -1.2, y: 2.0, z: 0.8, x2d: 660, y2d: 240, color: "#80deea", size: 0.20, parentId: "b_ai" },
  { id: "bs_experience", name: "Distinction of Feel", question: "Silicon symbol manipulation lacks semantics.", path: "/branches/ai/experience", category: "branches", x: -0.6, y: 2.2, z: 0.9, x2d: 710, y2d: 230, color: "#4dd0e1", size: 0.20, parentId: "b_ai" },
  { id: "bs_clone", name: "Identity Copy", question: "If your body and mind can be copied, who are you?", path: "/branches/ai/identity-copy", category: "branches", x: -1.1, y: 2.6, z: 2.1, x2d: 760, y2d: 250, color: "#26c6da", size: 0.20, parentId: "b_ai" },

  // 4. Fruits (Practices & Realization) - outer canopy
  { id: "f_yoga", name: "Yoga (Four Paths)", question: "Karma, Jnana, Bhakti, and Raja.", path: "/fruit/yoga", category: "fruit", x: -1.5, y: 3.0, z: 0.4, x2d: 280, y2d: 140, color: "#ffb74d", size: 0.25, parentId: "b_philosophy" },
  { id: "f_yogaprac", name: "Yoga Practices", question: "Asanas, Pranayama, and Dhyana.", path: "/fruit/yoga-practices", category: "fruit", x: -0.8, y: 3.3, z: 0.2, x2d: 430, y2d: 100, color: "#ffa726", size: 0.25, parentId: "b_cognitive" },
  { id: "f_moksha", name: "Non-Dual Realization", question: "Absolute dissolution of subject-object boundary.", path: "/fruit/non-dual-realization", category: "fruit", x: 0, y: 3.4, z: 0, x2d: 500, y2d: 80, color: "#ff9800", size: 0.30, parentId: "trunk" },
  { id: "f_medicine", name: "Acceptance in Medicine", question: "Clinical mindfulness, MBCT, and CBT.", path: "/fruit/medicine", category: "fruit", x: 0.8, y: 3.3, z: -0.2, x2d: 570, y2d: 100, color: "#fb8c00", size: 0.25, parentId: "b_quantum" },
  { id: "f_meditation", name: "Meditation Portal", question: "Vipassana, Zen Shikantaza, and Direct Path.", path: "/fruit/meditation", category: "fruit", x: 1.5, y: 3.0, z: -0.4, x2d: 720, y2d: 140, color: "#f57c00", size: 0.25, parentId: "b_panpsychism" },
  { id: "f_psychedelics", name: "Psychedelics & Mind", question: "Can chemical intervention trigger ego dissolution?", path: "/fruit/psychedelics", category: "fruit", x: -2.0, y: 2.8, z: -0.3, x2d: 180, y2d: 220, color: "#ffca28", size: 0.25, parentId: "b_neuroscience" },
  { id: "f_guided", name: "Guided Self-Inquiry", question: "Experiential pointers to reverse attention.", path: "/fruit/self-inquiry", category: "fruit", x: 2.0, y: 2.8, z: 0.3, x2d: 820, y2d: 220, color: "#ffb300", size: 0.25, parentId: "b_ai" },
  { id: "f_playlists", name: "Video Playlists", question: "Debates, visual lectures, and pointers.", path: "/fruit/playlists", category: "fruit", x: -1.2, y: 2.6, z: -0.6, x2d: 360, y2d: 120, color: "#ffb300", size: 0.23, parentId: "b_cognitive" },
  { id: "f_journaling", name: "Journaling Prompts", question: "Reflections to deconstruct self-assumptions.", path: "/fruit/journaling", category: "fruit", x: 1.2, y: 2.6, z: 0.6, x2d: 640, y2d: 120, color: "#ffa726", size: 0.23, parentId: "b_panpsychism" },

  // 5. Thinkers Leaves
  { id: "l_shankaracharya", name: "Adi Shankaracharya", question: "Systematizer of Advaita.", path: "/leaves/shankaracharya", category: "leaves", x: -2.4, y: -1.4, z: 0.4, x2d: 180, y2d: 680, color: "#fbc02d", size: 0.14, parentId: "r_vedanta" },
  { id: "l_ramana", name: "Ramana Maharshi", question: "Sage of Atma Vichara.", path: "/leaves/ramana", category: "leaves", x: -0.6, y: -1.6, z: 0.8, x2d: 480, y2d: 800, color: "#fbc02d", size: 0.14, parentId: "r_inquiry" },
  { id: "l_nisargadatta", name: "Nisargadatta Maharaj", question: "Sage of 'I Am That'.", path: "/leaves/nisargadatta", category: "leaves", x: -0.2, y: -1.8, z: 0.7, x2d: 450, y2d: 760, color: "#fbc02d", size: 0.14, parentId: "r_inquiry" },
  { id: "l_buddha", name: "Gautama Buddha", question: "Sower of the Anatta seed.", path: "/leaves/buddha", category: "leaves", x: -0.8, y: -1.8, z: -0.9, x2d: 355, y2d: 760, color: "#fbc02d", size: 0.14, parentId: "r_buddhism" },
  { id: "l_nagarjuna", name: "Nagarjuna", question: "Logician of Emptiness.", path: "/leaves/nagarjuna", category: "leaves", x: -0.2, y: -2.3, z: -1.0, x2d: 385, y2d: 735, color: "#fbc02d", size: 0.14, parentId: "r_buddhism" },
  { id: "l_patanjali", name: "Patanjali", question: "Systematizer of Chitta stillness.", path: "/leaves/patanjali", category: "leaves", x: 2.2, y: -1.4, z: 0.4, x2d: 770, y2d: 660, color: "#fbc02d", size: 0.14, parentId: "r_esoteric" },
  { id: "l_ramakrishna", name: "Ramakrishna Paramahamsa", question: "Phenomenologist of Unity.", path: "/leaves/ramakrishna", category: "leaves", x: 1.9, y: -1.7, z: 0.6, x2d: 725, y2d: 740, color: "#fbc02d", size: 0.14, parentId: "r_esoteric" },
  { id: "l_vivekananda", name: "Swami Vivekananda", question: "Scientific translator of Vedanta.", path: "/leaves/vivekananda", category: "leaves", x: -1.9, y: -1.1, z: 0.1, x2d: 220, y2d: 750, color: "#fbc02d", size: 0.14, parentId: "r_vedanta" },
  { id: "l_faggin", name: "Federico Faggin", question: "Microprocessor architect to idealist.", path: "/leaves/faggin", category: "leaves", x: 2.1, y: 1.4, z: 0.5, x2d: 580, y2d: 250, color: "#81d4fa", size: 0.14, parentId: "b_quantum" },
  { id: "l_hoffman", name: "Donald Hoffman", question: "Visual Interface theorist.", path: "/leaves/hoffman", category: "leaves", x: 1.4, y: 1.6, z: -0.5, x2d: 550, y2d: 255, color: "#81d4fa", size: 0.14, parentId: "b_quantum" },
  { id: "l_kastrup", name: "Bernardo Kastrup", question: "Analytic Idealist pioneer.", path: "/leaves/kastrup", category: "leaves", x: 1.7, y: 1.7, z: 0.4, x2d: 670, y2d: 260, color: "#81d4fa", size: 0.14, parentId: "b_panpsychism" },
  { id: "l_chalmers", name: "David Chalmers", question: "Formulator of the Hard Problem.", path: "/leaves/chalmers", category: "leaves", x: -0.8, y: 1.4, z: -0.4, x2d: 330, y2d: 260, color: "#81d4fa", size: 0.14, parentId: "b_philosophy" },
  { id: "l_goff", name: "Philip Goff", question: "Advocate of Panpsychist matter.", path: "/leaves/goff", category: "leaves", x: 1.9, y: 1.6, z: 0.2, x2d: 700, y2d: 280, color: "#81d4fa", size: 0.14, parentId: "b_panpsychism" },
  { id: "l_koch", name: "Christof Koch", question: "NCC mapper turned panpsychist.", path: "/leaves/koch", category: "leaves", x: -1.6, y: 1.2, z: 0.2, x2d: 210, y2d: 310, color: "#81d4fa", size: 0.14, parentId: "b_neuroscience" },
  { id: "l_chopra", name: "Deepak Chopra", question: "Broad-spectrum bridging guide.", path: "/leaves/chopra", category: "leaves", x: 1.1, y: 1.2, z: 0.3, x2d: 740, y2d: 300, color: "#81d4fa", size: 0.14, parentId: "b_panpsychism" },
  { id: "l_metzinger", name: "Thomas Metzinger", question: "Ego Tunnel theorist.", path: "/leaves/metzinger", category: "leaves", x: 1.4, y: -1.6, z: 0.3, x2d: 665, y2d: 745, color: "#81d4fa", size: 0.14, parentId: "r_phenomenology" },
  { id: "l_sarvapriyananda", name: "Sarvapriyananda", question: "Deep Sleep & Mandukya guide.", path: "/leaves/sarvapriyananda", category: "leaves", x: -1.4, y: -1.4, z: 0.4, x2d: 360, y2d: 765, color: "#fbc02d", size: 0.14, parentId: "r_vedanta" },
  { id: "l_spira", name: "Rupert Spira", question: "Direct Path guide.", path: "/leaves/spira", category: "leaves", x: 0.2, y: -1.4, z: 0.9, x2d: 410, y2d: 630, color: "#fbc02d", size: 0.14, parentId: "r_inquiry" },
  { id: "l_lucille", name: "Francis Lucille", question: "Socratic non-dual teacher.", path: "/leaves/lucille", category: "leaves", x: 0.5, y: -1.7, z: 0.7, x2d: 400, y2d: 710, color: "#fbc02d", size: 0.14, parentId: "r_inquiry" },
  { id: "l_kanojia", name: "Dr. Alok Kanojia", question: "Neuroscience-focused psychiatrist.", path: "/leaves/kanojia", category: "leaves", x: -1.5, y: 1.0, z: 0.5, x2d: 250, y2d: 290, color: "#81d4fa", size: 0.14, parentId: "b_neuroscience" },
  // ── New thinker leaves ──────────────────────────────────────────────────────
  { id: "l_krishna", name: "Krishna", question: "Divine teacher of the Bhagavad Gita.", path: "/leaves/krishna", category: "leaves", x: -2.6, y: -1.5, z: 0.3, x2d: 145, y2d: 730, color: "#f59e0b", size: 0.15, parentId: "r_vedanta" },
  { id: "l_jesus", name: "Jesus of Nazareth", question: "Kingdom of Heaven is within you.", path: "/leaves/jesus", category: "leaves", x: 2.3, y: -1.5, z: 0.7, x2d: 681, y2d: 735, color: "#a78bfa", size: 0.15, parentId: "r_esoteric" },
  { id: "l_papaji", name: "H.W.L. Poonja (Papaji)", question: "Direct disciple of Ramana Maharshi.", path: "/leaves/papaji", category: "leaves", x: -0.3, y: -1.7, z: 0.6, x2d: 400, y2d: 735, color: "#fbc02d", size: 0.14, parentId: "r_inquiry" },
  { id: "l_aurobindo", name: "Sri Aurobindo", question: "Integral Yoga — consciousness transforming matter.", path: "/leaves/aurobindo", category: "leaves", x: -2.8, y: -2.6, z: 0.5, x2d: 240, y2d: 800, color: "#10b981", size: 0.14, parentId: "r_vedanta" },
  { id: "l_williamjames", name: "William James", question: "Father of empirical mysticism.", path: "/leaves/williamjames", category: "leaves", x: 2.5, y: -1.3, z: 0.5, x2d: 765, y2d: 690, color: "#34d399", size: 0.14, parentId: "r_esoteric" },
  { id: "l_laotzu", name: "Lao Tzu", question: "Author of the Tao Te Ching.", path: "/leaves/laotzu", category: "leaves", x: -1.1, y: -1.5, z: -0.7, x2d: 330, y2d: 710, color: "#a3e635", size: 0.14, parentId: "r_buddhism" },
  { id: "l_krishnamurti", name: "Jiddu Krishnamurti", question: "Truth is a pathless land.", path: "/leaves/krishnamurti", category: "leaves", x: -0.1, y: -1.4, z: 0.9, x2d: 440, y2d: 720, color: "#0284c7", size: 0.14, parentId: "r_inquiry" },
  { id: "l_watts", name: "Alan Watts", question: "Ego is a skin-encapsulated illusion.", path: "/leaves/watts", category: "leaves", x: 0.6, y: -1.3, z: 0.8, x2d: 455, y2d: 745, color: "#0284c7", size: 0.14, parentId: "r_inquiry" },
  { id: "l_bohm", name: "David Bohm", question: "Undivided wholeness of implicate order.", path: "/leaves/bohm", category: "leaves", x: 1.7, y: 1.3, z: -0.4, x2d: 505, y2d: 250, color: "#ec407a", size: 0.14, parentId: "b_quantum" },
];

