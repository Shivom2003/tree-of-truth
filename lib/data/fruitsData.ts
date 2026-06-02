import type { NodeData } from "../contentData";

export const FRUITS_DATA: Record<string, NodeData> = {
  yoga: {
    title: "Yoga (Four Paths)",
    code: "F1",
    question: "How do we channel our energy and intellect into liberation?",
    scope: "The classical four paths of Yoga: Karma (selfless action), Dharma (ethical duty), Kama (sublimation of desire), and Moksha (complete liberation).",
    subsections: [
      {
        title: "Karma Yoga (Selfless Action)",
        desc: "Acting without attachment to the fruits of action, transforming daily labor into a service to the cosmos."
      },
      {
        title: "Jnana Yoga (Knowledge)",
        desc: "The intellectual path of discrimination, separating the real from the unreal through study and inquiry."
      },
      {
        title: "Bhakti Yoga (Devotion)",
        desc: "Channelling emotions and love toward the supreme reality, dissolving the ego through devotion."
      }
    ],
    thinkers: ["Swami Vivekananda", "Patanjali", "Krishna"],
    readings: [
      { title: "Jnana Yoga", author: "Swami Vivekananda" },
      { title: "The Bhagavad Gita", author: "Krishna" }
    ],
    bridge: {
      name: "Advaita Vedanta (R1)",
      path: "/roots/vedanta",
      desc: "Jnana Yoga is the direct path of Advaita, using the intellect to transcend the intellect."
    }
  },
  "yoga-practices": {
    title: "Yoga Practices",
    code: "F2",
    question: "How do we prepare the body and mind for deep silence?",
    scope: "The practical components of classical Ashtanga Yoga: Asanas (postures), Pranayama (breath control), and Dhyana (meditation).",
    subsections: [
      {
        title: "Asanas (Physical Prep)",
        desc: "Preparing the body to sit in stillness without discomfort, stabilizing the nervous system."
      },
      {
        title: "Pranayama (Energy Control)",
        desc: "Regulating the breath to calm the mind and balance the subtle channels (Nadis)."
      },
      {
        title: "Dhyana (Meditation)",
        desc: "Sustained, one-pointed focus that eventually dissolves the boundary between the meditator and the object."
      }
    ],
    thinkers: ["Patanjali"],
    readings: [
      { title: "Yoga Sutras of Patanjali", author: "Patanjali" }
    ],
    bridge: {
      name: "Esoteric (R4)",
      path: "/roots/esoteric",
      desc: "These practices work directly with the Subtle Body maps described in esoteric traditions."
    }
  },
  "moksha-nirvana": {
    title: "Moksha / Nirvana",
    code: "F3",
    question: "What is the nature of absolute liberation?",
    scope: "Comparing the ultimate realizations across traditions: Jivanmukti (liberation while living) in Vedanta, Nirvana in Buddhism, and the Bodhisattva ideal.",
    subsections: [
      {
        title: "Jivanmukti (Living Freedom)",
        desc: "Vedanta holds that liberation is achieved while living. A Jivanmukta acts, eats, and speaks, but knows they are the unattached Witness, untouched by the world."
      },
      {
        title: "Nirvana & Bodhisattva",
        desc: "Buddhism's Nirvana is the blowing out of the fires of greed, hatred, and delusion. The Bodhisattva delays final dissolution to help all beings cross the shore."
      }
    ],
    thinkers: ["Adi Shankaracharya", "Gautama Buddha", "Ramana Maharshi"],
    readings: [
      { title: "Vivekachudamani", author: "Adi Shankaracharya" },
      { title: "Dhammapada", author: "Gautama Buddha" }
    ],
    bridge: {
      name: "Trunk Bridge",
      path: "/trunk",
      desc: "Moksha is the permanent abidance in the Ground State mapped in the Trunk."
    }
  },
  medicine: {
    title: "Modern Medical Acceptance",
    code: "F4",
    question: "How does modern science apply contemplative tools to mental health?",
    scope: "The clinical adoption of non-dual and Buddhist tools, such as Mindfulness-Based Cognitive Therapy (MBCT) and Cognitive Behavioral Therapy (CBT).",
    subsections: [
      {
        title: "Mindfulness in Medicine",
        desc: "Kabat-Zinn's MBSR: stripping Buddhist vipassana of its religious language and using it to treat chronic pain, anxiety, and stress."
      },
      {
        title: "CBT and Ego Distancing",
        desc: "CBT teaches patients to observe their thoughts without identifying with them, a direct clinical application of the Witness methodology."
      }
    ],
    thinkers: ["Dr. Alok Kanojia", "Thomas Metzinger"],
    readings: [
      { title: "Full Catastrophe Living", author: "Jon Kabat-Zinn" }
    ],
    bridge: {
      name: "Cognitive Science (B3)",
      path: "/branches/cognitive",
      desc: "How do clinical mindfulness outcomes validate enactive and embodied cognitive models?"
    }
  },
  meditation: {
    title: "Meditation Portal",
    code: "F5",
    question: "Which meditation method fits your current state?",
    scope: "An overview of primary methods: Vipassana, Zen sitting (Shikantaza), and non-dual pointing.",
    subsections: [
      {
        title: "Vipassana (Insight)",
        desc: "Scanning the body and noting sensations to realize their impermanent, unsatisfactory, and selfless nature."
      },
      {
        title: "Shikantaza (Just Sitting)",
        desc: "Zen practice of objectless meditation. No focus, no visualization, no mantra. Just sitting as open space."
      },
      {
        title: "Non-Dual Abidance",
        desc: "Rupert Spira's 'being aware of being aware', resting attention on the background rather than its content."
      }
    ],
    thinkers: ["Gautama Buddha", "Rupert Spira"],
    readings: [
      { title: "Being Aware of Being Aware", author: "Rupert Spira" }
    ],
    bridge: {
      name: "Direct Inquiry (R3)",
      path: "/roots/inquiry",
      desc: "Meditation is the direct practice that prepares the mind for deep Self-Inquiry."
    }
  },
  "reading-paths": {
    title: "Reading Paths",
    code: "F6",
    question: "How do you navigate this vast literature systematically?",
    scope: "Curated reading lists tailored for different backgrounds: beginners, science-focused seekers, and advanced students.",
    subsections: [
      {
        title: "The Science-First Path",
        desc: "Being You (Seth) -> Galileo's Error (Goff) -> The Case Against Reality (Hoffman) -> The Idea of the World (Kastrup) -> I Am That (Nisargadatta)."
      },
      {
        title: "The Direct Path",
        desc: "Who Am I? (Ramana) -> Being Aware of Being Aware (Spira) -> I Am That (Nisargadatta) -> Ashtavakra Gita."
      }
    ],
    thinkers: ["Swami Sarvapriyananda", "Rupert Spira", "Bernardo Kastrup"],
    readings: [
      { title: "Reading Lists Database", author: "Tree of Truth Editors" }
    ],
    bridge: {
      name: "Trunk Bridge",
      path: "/trunk",
      desc: "The Reading Paths provide the intellectual blueprint to bridge the entire tree."
    }
  },
  "self-inquiry": {
    title: "Guided Self-Inquiry",
    code: "F7",
    question: "Can we trace the sense of being back to its source right now?",
    scope: "A structured, experiential session guiding the seeker through the steps of Self-Inquiry.",
    subsections: [
      {
        title: "Step 1: Relaxing into Presence",
        desc: "Settle into your body. Notice the sensations, thoughts, and sounds. Realize that you are the one aware of them."
      },
      {
        title: "Step 2: Who is Aware?",
        desc: "Ask: 'Who is the one aware of these thoughts?' Notice the immediate silence that follows the question. Abide in that gap."
      }
    ],
    thinkers: ["Ramana Maharshi", "Rupert Spira", "Francis Lucille"],
    readings: [
      { title: "Who Am I?", author: "Ramana Maharshi" }
    ],
    bridge: {
      name: "Direct Inquiry (R3)",
      path: "/roots/inquiry",
      desc: "This is the active practice of the Direct Inquiry root."
    }
  },
  playlists: {
    title: "Video Playlists",
    code: "F8",
    question: "What are the key audio-visual lectures and debates to watch?",
    scope: "Curated lists of YouTube lectures, dialogues, and scientific debates on consciousness.",
    subsections: [
      {
        title: "Vedanta Classics",
        desc: "Sarvapriyananda's Mandukya Upanishad lectures, exploring the three states in detail."
      },
      {
        title: "Science-Philosophy Debates",
        desc: "Bernardo Kastrup vs. physicalist philosophers, Donald Hoffman's visual interface talks."
      }
    ],
    thinkers: ["Swami Sarvapriyananda", "Donald Hoffman", "Bernardo Kastrup"],
    readings: [
      { title: "Video Playlists Archive", author: "Tree of Truth Editors" }
    ],
    bridge: {
      name: "Trunk Bridge",
      path: "/trunk",
      desc: "Playlists help visualize the convergence between science and wisdom."
    }
  },
  journaling: {
    title: "Journaling Prompts",
    code: "F9",
    question: "What questions can you write about to dismantle your ego assumptions?",
    scope: "Writing prompts designed to trigger self-inquiry and phenomenological reduction.",
    subsections: [
      {
        title: "Subtracting Identity",
        desc: "Write: 'What remains when I subtract my name, my memories, and my language?' Observe what is felt in your experience during this subtraction."
      },
      {
        title: "The Womb & Sleep Prompts",
        desc: "Write: 'If I was born senseless, what would I be?' and 'Who was present in deep sleep last night?'"
      }
    ],
    thinkers: ["Ramana Maharshi", "Dan Zahavi"],
    readings: [
      { title: "Journaling Prompts Archive", author: "Tree of Truth Editors" }
    ],
    bridge: {
      name: "Direct Inquiry (R3)",
      path: "/roots/inquiry",
      desc: "Journaling is a reflective method to solidify the insights of Direct Inquiry."
    }
  }
};
