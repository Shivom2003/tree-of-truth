import type { NodeData } from "../contentData";

export const ROOTS_DATA: Record<string, NodeData> = {
  // Main Categories
  vedanta: {
    title: "Vedanta Wisdom",
    code: "R1",
    question: "Is the apparent separation of the individual self and the cosmos the ultimate illusion?",
    scope: "Vedanta, meaning the 'end of the Vedas,' represents the pinnacle of ancient Indian metaphysical inquiry. It is not a single philosophy, but a family of traditions dedicated to resolving the relationship between the individual self (Atman), the physical universe (Jada), and the ultimate source of existence (Brahman).\n\nThrough rigorous epistemology and direct contemplation, Vedanta deconstructs the boundaries of the separate ego, showing that the sense of division is an illusion born of ignorance.",
    subsections: [
      {
        title: "Advaita Vedanta (Non-Duality)",
        desc: "Advaita represents the radical non-dual school systematized by Adi Shankaracharya. It asserts the absolute identity of Atman and Brahman.\n\nThe world is deemed 'mithya'—a dependent, relative appearance. The multiplicity we perceive is not an independent reality but an apparent transformation (Vivarta) superimposed upon a single, undivided consciousness, much like mistaking a rope for a snake in dim light."
      },
      {
        title: "Dvaita & Samkhya (Duality & Plurality)",
        desc: "In contrast to Advaita, these dualistic systems assert the eternal reality of separate categories. Samkhya, one of India's oldest philosophies, divides existence into Purusha (pure, contentless witness consciousness) and Prakriti (material nature, which includes both the physical world and the mind).\n\nDvaita Vedanta, founded by Madhvacharya, asserts a three-fold eternal distinction between the Supreme Ruler (Ishvara), the individual souls (Jivas), and matter."
      },
      {
        title: "The Upanishads & Gitas",
        desc: "The Upanishads are the primary scriptural declarations of non-duality, analyzing human experience through systematic methods. The Mandukya Upanishad, for instance, deconstructs identity by studying the waking, dreaming, and deep sleep states to reveal the underlying fourth state (Turiya) of pure awareness.\n\nThe Gitas (such as the Ashtavakra and Bhagavad Gitas) translate these insights into direct pointers and practices for everyday life."
      }
    ],
    thinkers: ["Adi Shankaracharya", "Ramana Maharshi", "Nisargadatta Maharaj", "Sarvapriyananda", "Swami Vivekananda"],
    readings: [
      { title: "Mandukya Upanishad with Gaudapada's Karika", author: "Swami Nikhilananda trans." },
      { title: "Vivekachudamani", author: "Adi Shankaracharya" },
      { title: "I Am That", author: "Nisargadatta Maharaj" }
    ],
    bridge: {
      name: "Panpsychism & Idealism (B5)",
      path: "/branches/panpsychism",
      desc: "Compare how analytical idealism matches Advaita's non-dual formulation."
    }
  },
  "vedanta/advaita": {
    title: "Advaita Vedanta (Non-Duality)",
    code: "R1-A",
    question: "How does one undivided consciousness appear as a universe of separate subjects and objects?",
    scope: "Advaita Vedanta is the premier non-dual system of Indian philosophy. Grounded in the Upanishads, it asserts that the ultimate reality is Brahman—absolute, non-relational, self-luminous consciousness.\n\nThe separate ego is a product of 'Adhyasa' (superimposition), where the properties of the body and mind are falsely attributed to the Self, and the light of the Self is falsely attributed to the body-mind.",
    subsections: [
      {
        title: "Brahman Satyam (The Sole Reality)",
        desc: "Advaita declares that only that which is changeless and independent can be called real. The physical world and mental fluctuations are constantly changing and dependent on observation; therefore, they are classified as 'mithya' (dependent appearances).\n\nBrahman, the silent witness, is the only independent reality supporting these appearances."
      },
      {
        title: "Adhyasa (Superimposition)",
        desc: "Adhyasa is the cognitive error that creates the illusion of personal identity. It is defined as the appearance of a past experience on a different locus, like seeing silver in a mother-of-pearl shell.\n\nWe superimpose the limitations of the body-mind (such as hunger, aging, and sadness) onto pure consciousness, which is eternally free from them."
      },
      {
        title: "Vivartavada (Apparent Transformation)",
        desc: "Unlike other cosmologies that view the world as a physical modification of God (Parinamavada), Advaita advocates Vivartavada. The universe is an apparent modification of Brahman.\n\nBrahman does not undergo any change to become the universe. The world is simply Brahman perceived through the lens of time, space, and causality."
      }
    ],
    thinkers: ["Adi Shankaracharya", "Ramana Maharshi", "Nisargadatta Maharaj", "Sarvapriyananda"],
    readings: [
      { title: "Drg-Drk-Viveka (Inquiry into Seer and Seen)", author: "Adi Shankaracharya" },
      { title: "The Nature of Consciousness", author: "Rupert Spira" }
    ],
    bridge: {
      name: "Direct Inquiry (R3)",
      path: "/roots/inquiry",
      desc: "Self-Inquiry is the direct experiential application of Advaita's philosophical declarations."
    }
  },
  "vedanta/dvaita": {
    title: "Dvaita Vedanta (Duality)",
    code: "R1-B",
    question: "If we are eternally distinct from the Creator, how do we relate to the ultimate reality?",
    scope: "Dvaita Vedanta, established by the philosopher Madhvacharya in the 13th century, stands as a deliberate rejection of Advaita's non-dualism. It asserts that difference is the very nature of things (Dharmi-svarupa).\n\nThe individual soul (Jiva) is eternally distinct from the Supreme Lord (Ishvara), and liberation consists not in merging, but in eternal devotional service in the divine presence.",
    subsections: [
      {
        title: "The Five Differences (Pancha-Bheda)",
        desc: "Dvaita posits five absolute, eternal distinctions that define reality:\n1. Between God (Ishvara) and the individual souls (Jivas).\n2. Between God and inert matter (Jada).\n3. Between individual souls themselves.\n4. Between individual souls and matter.\n5. Between material things themselves.\n\nEach category possesses a unique, unalterable identity."
      },
      {
        title: "Jiva-Paratantrya (Soul Dependence)",
        desc: "While souls are real, eternal, and countless, they are completely dependent (paratantra) on the supreme will of Ishvara. Ishvara alone is independent (svatantra).\n\nThe soul is like a reflection in a mirror: it exists only because the original object exists, yet it can never become the object."
      },
      {
        title: "Upasana and Bhakti (Devotional Practice)",
        desc: "Liberation (Moksha) cannot be achieved by intellectual knowledge alone, as the gulf between Creator and created is infinite. It requires Bhakti—loving devotion—and the grace of Vishnu.\n\nLiberated souls enjoy different levels of bliss in Vaikuntha (heaven) according to their inherent capacity, preserving their individuality eternally."
      }
    ],
    thinkers: ["Madhvacharya", "Ramakrishna Paramahamsa"],
    readings: [
      { title: "Philosophy of Sri Madhvacharya", author: "B.N.K. Sharma" }
    ],
    bridge: {
      name: "Philosophy of Mind (B2)",
      path: "/branches/philosophy",
      desc: "Compare Dvaita's dualism with Descartes' substance dualism in the philosophy of mind."
    }
  },
  "vedanta/sankhya": {
    title: "Sankhya Philosophy (Dualism)",
    code: "R1-C",
    question: "How do pure consciousness and the material world interact without ever truly mixing?",
    scope: "Sankhya is one of the oldest systematic schools of Indian philosophy, traditionally attributed to Sage Kapila. It is a dualistic, atheistic system that explains the cosmos through the interaction of two eternal primitives: Purusha (consciousness) and Prakriti (primordial matter).\n\nSuffering arises from 'Aviveka'—the failure of the intellect to distinguish between the silent, inactive Purusha and the active, material movements of Prakriti.",
    subsections: [
      {
        title: "Purusha and Prakriti",
        desc: "Purusha is pure, contentless consciousness—eternal, inactive, plural, and unaffected. Prakriti is primordial matter—the unconscious, active matrix of the physical and mental universe.\n\nPrakriti is composed of the three Gunas (Sattva - balance, Rajas - activity, Tamas - inertia), which exist in equilibrium until perturbed by the proximity of Purusha."
      },
      {
        title: "The Evolution of Mind & Ego",
        desc: "In Sankhya, the mind (Manas), intellect (Buddhi), and ego (Ahamkara) are entirely material, evolving out of Prakriti, not Purusha. The brain and cognitive faculties are highly sophisticated biological machines.\n\nConsciousness belongs solely to Purusha, which illuminates these material mental instruments."
      },
      {
        title: "Kaivalya (Isolation)",
        desc: "Liberation in Sankhya is called Kaivalya (isolation). It is achieved when the intellect (Buddhi) becomes pure enough to reflect the distinction between Purusha and Prakriti.\n\nWhen Purusha realizes it has never been bound or affected by material nature, the evolutionary dance of Prakriti ceases for that individual, and Purusha rests in its own nature."
      }
    ],
    thinkers: ["Kapila", "Patanjali"],
    readings: [
      { title: "The Samkhya Karika", author: "Ishvara Krishna" },
      { title: "Yoga Sutras of Patanjali", author: "Patanjali" }
    ],
    bridge: {
      name: "Cognitive Science (B3)",
      path: "/branches/cognitive",
      desc: "Compare Samkhya's view of the mind as material with cognitive science's functional models."
    }
  },
  "vedanta/upanishads": {
    title: "The Upanishads",
    code: "R1-D",
    question: "What is the ultimate thread that unites the individual self with the cosmos?",
    scope: "The Upanishads are the secret, mystical scriptures that conclude the Vedic canon, written between 800 and 300 BCE. They mark a historical transition from external ritualism to internal contemplation.\n\nThrough dialogues between sages and students, they repeatedly declare that the subjective self (Atman) is identical to the universal ground of existence (Brahman).",
    subsections: [
      {
        title: "The Mandukya & The Four States",
        desc: "The Mandukya Upanishad deconstructs human identity by analyzing three normal states of experience: waking (Jagrat), dreaming (Svapna), and deep sleep (Susupti).\n\nIt points to the fourth (Turiya)—not a state itself, but the changeless consciousness that underlies and observes the other three. This Turiya is the true Self."
      },
      {
        title: "The Mahavakyas",
        desc: "The Upanishads contain the 'Great Sayings' (Mahavakyas) that summarize non-dual truth:\n- 'Tat Tvam Asi' (That Thou Art) in the Chandogya.\n- 'Aham Brahmasmi' (I am Brahman) in the Brihadaranyaka.\n- 'Ayam Atma Brahma' (This Self is Brahman) in the Mandukya.\n- 'Prajnanam Brahma' (Consciousness is Brahman) in the Aitareya."
      },
      {
        title: "Neti Neti (The Method of Negation)",
        desc: "First formulated in the Brihadaranyaka Upanishad, 'Neti Neti' ('not this, not this') is a key contemplative practice.\n\nBy systematically stripping away identification with the physical body, sensory experiences, and mental concepts, the seeker isolates the ultimate Subject that can never be turned into an object."
      }
    ],
    thinkers: ["Adi Shankaracharya", "Swami Sarvapriyananda"],
    readings: [
      { title: "Eight Upanishads", author: "Swami Gambhirananda trans." },
      { title: "The Upanishads", author: "Eknath Easwaran" }
    ],
    bridge: {
      name: "Direct Inquiry (R3)",
      path: "/roots/inquiry",
      desc: "Upanishadic methods like Neti Neti are the basis of direct contemplative practices."
    }
  },
  "vedanta/gitas": {
    title: "The Gitas",
    code: "R1-E",
    question: "How does non-dual realization translate into action, devotion, and absolute freedom?",
    scope: "The Gitas (Sanskrit for 'songs') are philosophical dialogues that capture the essence of Upanishadic non-duality. While the Bhagavad Gita synthesizes diverse paths to suit human activity, other Gitas like the Ashtavakra and Ribhu Gitas present the direct path of sudden recognition.\n\nThey offer experiential descriptions of liberation, pointing to a state of consciousness that is ever-present and prior to all mental effort.",
    subsections: [
      {
        title: "Ashtavakra Gita (Sudden Recognition)",
        desc: "A dialogue between Sage Ashtavakra and King Janaka. It rejects all preparation, meditation, and progressive paths. It declares that you are already the silent, free witness.\n\nLiberation is not an achievement, but the sudden recognition of your ever-present nature: 'You are the silent witness, forever free. Recognize this right now and be at peace.'"
      },
      {
        title: "Bhagavad Gita (Integrated Path)",
        desc: "A dialogue between Sri Krishna and Arjuna on the battlefield. It synthesizes three primary Yogas: Karma Yoga (acting without attachment to fruits), Bhakti Yoga (devotional surrender), and Jnana Yoga (discrimination of the Self).\n\nIt demonstrates how non-dual awareness can be integrated into the midst of crisis and active engagement."
      },
      {
        title: "Ribhu Gita (Absolute Negation)",
        desc: "A dialogue within the Siva Rahasya Purana. It utilizes relentless negation to dissolve all concepts, including mind, world, paths, and liberation itself.\n\nIt leaves only the self-luminous Brahman, and was highly recommended by Ramana Maharshi for inducing thoughtless awareness."
      }
    ],
    thinkers: ["Krishna", "Ramana Maharshi", "Swami Vivekananda"],
    readings: [
      { title: "Ashtavakra Gita", author: "Swami Nityaswarupananda trans." },
      { title: "The Bhagavad Gita", author: "Swami Chidbhavananda" },
      { title: "The Song of Ribhu", author: "H.H. Sri Siva Rahasya" }
    ],
    bridge: {
      name: "Direct Inquiry (R3)",
      path: "/roots/inquiry",
      desc: "The Gitas provide the philosophical poetry that triggers the direct realization of the witness."
    }
  },
  "vedanta/thinkers": {
    title: "Vedanta Thinkers",
    code: "R1-F",
    question: "How has the non-dual transmission evolved from ancient sages to modern communicators?",
    scope: "The Vedanta lineage represents an unbroken chain of inquiry spanning over two millennia. This node examines the key teachers who have systematized, revitalized, and communicated non-dual philosophy.\n\nFrom the logic of Shankaracharya to the silence of Ramana Maharshi, and from Vivekananda's introduction of Vedanta to the West to Swami Sarvapriyananda's contemporary dialogues with science.",
    subsections: [
      {
        title: "Classical Systematizers",
        desc: "Gaudapada (author of the Mandukya Karika) and Adi Shankaracharya established the academic and dialectical foundation of Advaita Vedanta.\n\nThey wrote commentaries on the Prasthanatrayi (Upanishads, Bhagavad Gita, Brahma Sutras), ensuring its survival against competing schools."
      },
      {
        title: "Modern Sages",
        desc: "Sages like Ramana Maharshi and Nisargadatta Maharaj bypassed academic debates, pointing directly to the living reality of the Self from first-hand realization.\n\nTheir direct methods of Self-Inquiry (Atma Vichara) and resting in the sense of presence (I Am) made non-duality accessible outside traditional monastic life."
      },
      {
        title: "Contemporary Integrators",
        desc: "Swami Vivekananda presented Vedanta as a rational 'science of religion.'\n\nToday, teachers like Swami Sarvapriyananda bridge ancient texts with analytical philosophy and cognitive neuroscience, presenting non-duality to the modern global intellect."
      }
    ],
    thinkers: ["Adi Shankaracharya", "Ramana Maharshi", "Nisargadatta Maharaj", "Sarvapriyananda", "Swami Vivekananda"],
    readings: [
      { title: "The Gospel of Sri Ramakrishna", author: "Mahendranath Gupta" },
      { title: "Talks with Sri Ramana Maharshi", author: "Ramana Maharshi" }
    ],
    bridge: {
      name: "Trunk Bridge",
      path: "/trunk",
      desc: "See how these thinkers connect Vedanta to modern concepts of consciousness."
    }
  },

  buddhism: {
    title: "Buddhist Thought",
    code: "R2",
    question: "If the self is an illusion, what is it that experiences the illusion?",
    scope: "Buddhist philosophy represents a radical deconstruction of metaphysics and selfhood. Starting from the empirical observation of impermanence, Buddhism rejects the notion of a solid, permanent soul (Atman).\n\nThrough schools like Theravada, Madhyamaka, and Dzogchen, it analyzes how the mind constructs the illusion of personal identity and how this construction can be dissolved to reveal the unconditioned ground of awareness.",
    subsections: [
      {
        title: "Anatta (No-Self)",
        desc: "Anatta is the Buddha's core declaration that no permanent, independent self can be found in any physical or mental phenomenon.\n\nBy deconstructing the individual into the Five Aggregates, the Buddha showed that we mistake a shifting, relational process for a solid, persistent owner."
      },
      {
        title: "Sunyata (Emptiness)",
        desc: "Developed by Nagarjuna and the Madhyamaka school, Sunyata is the insight that all things are empty of inherent, independent existence (svabhava).\n\nEmptiness is not a state of nothingness, but the realization that things exist only in dependence on causes, conditions, and conceptual designations."
      },
      {
        title: "Rigpa (Pure Awareness)",
        desc: "The Dzogchen tradition of Tibetan Buddhism points to Rigpa—the primordial, natural state of consciousness.\n\nPrior to the division of subject and object, Rigpa is a spacious, clear, self-luminous awareness that remains unstained by the thoughts and emotions that arise within it."
      }
    ],
    thinkers: ["Gautama Buddha", "Nagarjuna", "Thomas Metzinger"],
    readings: [
      { title: "Mulamadhyamakakarika", author: "Nagarjuna" },
      { title: "The Zen Teaching of Huang Po", author: "John Blofeld trans." },
      { title: "The Embodied Mind", author: "Francisco Varela et al." }
    ],
    bridge: {
      name: "Cognitive Science (B3)",
      path: "/branches/cognitive",
      desc: "Explore how enactivism and the constructed self model align with Buddhist no-self."
    }
  },
  "buddhism/annatta": {
    title: "Anatta (No-Self)",
    code: "R2-A",
    question: "When we look closely at our experience, do we find an owner, or only a stream of events?",
    scope: "Anatta is the unique metaphysical contribution of Buddhism. It asserts that the belief in a permanent, separate soul is the root cause of all psychological suffering (Dukkha).\n\nBy analyzing our sensory-cognitive experience, we find only a dynamic stream of events, with no central controller inside the head.",
    subsections: [
      {
        title: "The Five Aggregates (Skandhas)",
        desc: "Buddhism deconstructs human identity into five changing aggregates:\n1. Form (physical body and senses).\n2. Sensation (felt tone of experience).\n3. Perception (recognition of objects).\n4. Mental Formations (will, habit, thoughts).\n5. Consciousness (sensory awareness).\n\nNone of these, individually or collectively, constitute a permanent self."
      },
      {
        title: "The Chariot Metaphor",
        desc: "As recorded in the Milinda Panha, Sage Nagasena explains that a 'chariot' is only a label for an assembly of wheels, axle, and frame. If you strip away the parts, the chariot vanishes.\n\nSimilarly, 'self' is a conventional designation for a collection of physical and mental processes."
      },
      {
        title: "The Illusion of Continuity",
        desc: "The mind constructs the illusion of a solid self by running rapid, discrete mental moments together, much like a film strip runs individual frames past a light to create a continuous movie.\n\nObserving the gaps between thoughts breaks this illusion."
      }
    ],
    thinkers: ["Gautama Buddha"],
    readings: [
      { title: "The Questions of King Milinda", author: "Bhikkhu Pesala trans." }
    ],
    bridge: {
      name: "Phenomenology (R4)",
      path: "/roots/phenomenology",
      desc: "Metzinger's model of the self as a phantom representation echoes the Anatta doctrine."
    }
  },
  "buddhism/sunyata": {
    title: "Sunyata (Emptiness)",
    code: "R2-B",
    question: "If everything lacks independent existence, how does reality function?",
    scope: "Sunyata, or emptiness, is the heart of Mahayana Buddhist philosophy, formalized by Nagarjuna. It describes the relational nature of reality, showing that everything arises dependently.\n\nTo understand emptiness is to realize that concepts and names do not capture permanent essences, but describe dynamic relations.",
    subsections: [
      {
        title: "Dependent Origination (Pratītyasamutpāda)",
        desc: "This principle asserts that everything arises in dependence on causes and conditions: 'When this is, that is; this arising, that arises.'\n\nNothing exists in isolation. Since all things are dependent, they are empty of separate, independent nature."
      },
      {
        title: "The Two Truths",
        desc: "Nagarjuna distinguishes between Conventional Truth (Samvriti-satya), which describes how the world appears to operate pragmatically, and Ultimate Truth (Paramartha-satya), which is that all things are empty of inherent existence.\n\nCrucially, the two truths are not two worlds, but the same world viewed differently."
      },
      {
        title: "The Emptiness of Emptiness",
        desc: "To prevent emptiness from becoming another metaphysical dogma, Nagarjuna declared that emptiness itself is empty.\n\nEmptiness is a conceptual medicine used to cure the illusion of inherent existence. Once the illusion is dissolved, the concept of emptiness must also be discarded."
      }
    ],
    thinkers: ["Nagarjuna"],
    readings: [
      { title: "Fundamental Wisdom of the Middle Way", author: "Jay Garfield" }
    ],
    bridge: {
      name: "Philosophy of Mind (B2)",
      path: "/branches/philosophy",
      desc: "Emptiness deconstructs the physicalist vs. idealist debate by showing both concepts are empty of inherent existence."
    }
  },
  "buddhism/rigpa": {
    title: "Rigpa (Pure Awareness)",
    code: "R2-C",
    question: "What remains when the busy mind settles into its natural, unfabricated state?",
    scope: "Rigpa is the core term in the Tibetan Dzogchen tradition, translating to 'pure, non-dual awareness.' It refers to the primordial ground state of consciousness, which is empty, luminous, and prior to all conceptual thoughts.\n\nIt is the direct experience of the mind's natural quality before it gets lost in its own reflections.",
    subsections: [
      {
        title: "The Mirror and Reflections",
        desc: "Rigpa is compared to a mirror. Reflections (thoughts, emotions, sensory inputs) appear within the mirror, but they do not modify, stain, or limit the mirror itself.\n\nThe mirror is always empty of its contents, yet inherently luminous and capable of reflecting everything."
      },
      {
        title: "Self-Liberation of Thoughts",
        desc: "Instead of suppressing or analyzing thoughts, Dzogchen teaches us to let them arise and dissolve naturally. Like writing on water or drawing in the air, thoughts liberate themselves when left alone, revealing the silent background of Rigpa."
      },
      {
        title: "The Three Statements of Garab Dorje",
        desc: "The root formulation of Dzogchen practice:\n1. Direct introduction to one's own nature (Rigpa).\n2. Deciding directly on this single state.\n3. Confidence in the self-liberation of thoughts.\n\nThis provides a simple, direct methodology to rest in pure awareness without effort."
      }
    ],
    thinkers: ["Nagarjuna", "Rupert Spira"],
    readings: [
      { title: "The Flight of the Garuda", author: "Keith Dowman" }
    ],
    bridge: {
      name: "Direct Inquiry (R3)",
      path: "/roots/inquiry",
      desc: "Dzogchen pointing-out instructions share a structural method with non-dual Self-Inquiry."
    }
  },

  phenomenology: {
    title: "Phenomenology",
    code: "R3",
    question: "What is left when all assumptions about the external world are suspended?",
    scope: "Phenomenology is the Western philosophical tradition that investigates the structures of conscious experience from the first-person perspective.\n\nBy 'bracketing' our assumptions about an independent external world (the Epoché), phenomenology analyzes the raw presentation of experience, revealing how the self, space, and time are constructed within awareness.",
    subsections: [
      {
        title: "The Phenomenological Reduction (Epoché)",
        desc: "First developed by Edmund Husserl, the Epoché is the method of suspending the 'natural attitude'—the unexamined assumption that a physical world exists independently outside us.\n\nThis bracketing redirects attention to how the world is experienced as a direct phenomenon within consciousness."
      },
      {
        title: "The Self as a Construct",
        desc: "Thomas Metzinger's modern neuro-phenomenological theory. It proposes that the brain generates a representational model of a self (the Phenomenal Self-Model).\n\nBecause we cannot introspect the neural processes that construct this model, we mistake the representation for a solid entity inside the head."
      },
      {
        title: "Pure Presence",
        desc: "Dan Zahavi's exploration of pre-reflective self-awareness. It refers to the basic 'what-it-is-like-ness' that accompanies all experience before we reflect on it.\n\nIt is the minimal subjective quality of presence that exists prior to any narrative or personal identity."
      }
    ],
    thinkers: ["Edmund Husserl", "Thomas Metzinger", "Dan Zahavi"],
    readings: [
      { title: "Phenomenology: The Basics", author: "Dan Zahavi" },
      { title: "The Ego Tunnel", author: "Thomas Metzinger" }
    ],
    bridge: {
      name: "Neuroscience (B1)",
      path: "/branches/neuroscience",
      desc: "The phenomenological reduction matches neuroscience's studies on ego dissolution."
    }
  },
  "phenomenology/reduction": {
    title: "The Phenomenological Reduction",
    code: "R3-A",
    question: "Can we experience experience itself, stripped of all theories and beliefs?",
    scope: "The phenomenological reduction is Edmund Husserl's method for isolating the pure structure of consciousness.\n\nIt aims to strip away scientific theories, common sense, and religious beliefs, allowing us to describe experience exactly as it presents itself to the subject.",
    subsections: [
      {
        title: "Bracketing the Natural Attitude",
        desc: "The natural attitude assumes that objects exist independently out in space. By bracketing this assumption, we shift our focus from the *objects* of experience to the *act* of experiencing.\n\nThe world is treated not as a collection of physical objects, but as a horizon of phenomena."
      },
      {
        title: "Noesis and Noema",
        desc: "Husserl analyzed experience into the intentional act of consciousness (Noesis) and the object toward which it is directed (Noema).\n\nThis reveals that consciousness is never passive; it actively structures meaning and presents objects to the mind."
      },
      {
        title: "Transcendental Subjectivity",
        desc: "When we bracket the entire physical world, we arrive at the ultimate residue: the transcendental field of subjectivity.\n\nThis is the field of awareness within which the world, time, and personal identity are first constituted and made meaningful."
      }
    ],
    thinkers: ["Edmund Husserl"],
    readings: [
      { title: "Ideas I", author: "Edmund Husserl" }
    ],
    bridge: {
      name: "Direct Inquiry (R3)",
      path: "/roots/inquiry",
      desc: "Husserl's Epoché is Western philosophy's counterpart to the Vedantic Neti Neti."
    }
  },
  "phenomenology/self-construct": {
    title: "Self as Construct",
    code: "R3-B",
    question: "If there is no permanent entity inside the head, why does it feel like there is?",
    scope: "This node explores the convergence of phenomenology and cognitive science regarding the illusory nature of the self. Special focus is given to Thomas Metzinger's Self-Model Theory of Subjectivity.\n\nIt asserts that the 'self' is not an ontological entity, but a virtual representation generated by the brain to manage survival and prediction.",
    subsections: [
      {
        title: "The Phenomenal Self-Model (PSM)",
        desc: "The brain creates an ongoing, dynamic simulation of the body and mind. This simulation is the Phenomenal Self-Model.\n\nIt allows the organism to track its states, but it is only a representational tool, not a physical object or soul."
      },
      {
        title: "The Ego Tunnel",
        desc: "Our conscious experience is like an Ego Tunnel. The brain constructs a highly detailed virtual reality, places a self-model at the center of it, and we live inside this simulation.\n\nWe mistake the virtual representation for a real, separate observer."
      },
      {
        title: "Transparency and Opacity",
        desc: "A mental representation is 'transparent' when we are unaware of the representational processes behind it; we look right through it to the world. The PSM is highly transparent, creating the illusion of direct contact with ourselves.\n\nWhen it becomes 'opaque' (in meditation or pathology), we see the self-model *as* a model."
      }
    ],
    thinkers: ["Thomas Metzinger"],
    readings: [
      { title: "Being No One", author: "Thomas Metzinger" }
    ],
    bridge: {
      name: "AI & Consciousness (B6)",
      path: "/branches/ai",
      desc: "Can an artificial intelligence construct a self-model similar to the human PSM?"
    }
  },
  "phenomenology/presence": {
    title: "Pure Presence",
    code: "R3-C",
    question: "What is the minimal sense of being that exists before we think about ourselves?",
    scope: "Pure Presence explores pre-reflective self-awareness and the minimal self, drawing from Dan Zahavi and Maurice Merleau-Ponty.\n\nIt isolates the immediate, non-conceptual quality of subjectivity that accompanies all experience, prior to the construction of a personal history or narrative identity.",
    subsections: [
      {
        title: "Pre-Reflective Self-Awareness",
        desc: "Before we reflect, name, or conceptualize, there is an immediate feeling of subjectivity accompanying our experiences. It is the basic 'for-me-ness' of experience.\n\nThis quality does not require attention or intellectual effort; it is the self-luminous nature of awareness."
      },
      {
        title: "The Minimal Self vs. Narrative Self",
        desc: "Distinguishes the immediate, embodied presence (minimal self) from the story we tell ourselves based on memory, language, and relationships (narrative self).\n\nIf the narrative self is lost (due to amnesia), the minimal self remains intact."
      },
      {
        title: "The Horizon of Time",
        desc: "Pre-reflective self-awareness is not static; it flows. Following Husserl and Zahavi, this temporal flow is structured by retention (holding the immediate past), presentation (experiencing the now), and protention (expecting the immediate future).\n\nThis creates a unified, flowing horizon of presence."
      }
    ],
    thinkers: ["Dan Zahavi", "Maurice Merleau-Ponty"],
    readings: [
      { title: "Subjectivity and Selfhood", author: "Dan Zahavi" }
    ],
    bridge: {
      name: "Direct Inquiry (R3)",
      path: "/roots/inquiry",
      desc: "Pure Presence is the phenomenological equivalent of the Witness in contemplative traditions."
    }
  },

  esoteric: {
    title: "Esoteric Realities",
    code: "R4",
    question: "What do mystical states and anomalous experiences suggest about the limits of materialism?",
    scope: "Esoteric Realities examines unusual human experiences—such as near-death experiences, out-of-body states, and energy maps—from a rigorous phenomenological perspective.\n\nRather than dismissing these states as hallucinations, this root analyzes them to test the limits of materialist production models of consciousness.",
    subsections: [
      {
        title: "Rebirth & Bardo States",
        desc: "Explores the hypothesis of post-mortem consciousness continuity. It examines the Tibetan Bardo maps (the transition states between death and rebirth) and empirical studies of past-life memories."
      },
      {
        title: "The Subtle Body",
        desc: "Analyzes traditional energy maps (Chakras, Nadis) as first-person descriptions of autonomic nervous system states and interoceptive somatic processing.\n\nIt translates 'prana' into the felt quality of the living body."
      },
      {
        title: "Near-Death Experiences (NDEs)",
        desc: "Examines clinical medical data showing structured, vivid conscious experiences during periods of cardiac arrest, when the brain shows flatline electrical activity.\n\nThis poses an explanatory challenge for theories that view the brain as the sole producer of consciousness."
      }
    ],
    thinkers: ["Patanjali", "Ramakrishna Paramahamsa", "Pim van Lommel"],
    readings: [
      { title: "Consciousness Beyond Life", author: "Pim van Lommel" },
      { title: "The Varieties of Religious Experience", author: "William James" }
    ],
    bridge: {
      name: "Quantum Mind (B4)",
      path: "/branches/quantum",
      desc: "Check if non-locality in quantum mechanics provides a plausible framework for non-local awareness."
    }
  },
  "esoteric/rebirth": {
    title: "Rebirth & Bardo States",
    code: "R4-A",
    question: "If consciousness is primary, does it survive the dissolution of the physical body?",
    scope: "This node examines the speculatively proposed continuity of consciousness beyond physical death, focusing on Tibetan Buddhist bardo models and empirical reincarnation research.\n\nIt questions whether consciousness requires a biological brain to exist, or if the brain acts as a filter for a non-local field of awareness.",
    subsections: [
      {
        title: "The Tibetan Bardo Maps",
        desc: "The Bardo Thodol (Tibetan Book of the Dead) maps the transition of awareness after sensory collapse. It describes the dissolution of the material elements into the Clear Light of the Ground State.\n\nIf the soul fails to recognize this light as its own nature, it projects mental archetypes and enters another womb."
      },
      {
        title: "Empirical Reincarnation Studies",
        desc: "Examines the work of Ian Stevenson and the Division of Perceptual Studies at the University of Virginia.\n\nThey cataloged thousands of cases of young children claiming to remember specific details of past lives, analyzing the patterns and evidential limits of this data."
      },
      {
        title: "Memory and Trans-temporal Identity",
        desc: "Discusses the philosophical problem of identity across lives. If personal memory is stored in the physical brain, what is it that travels between bodies?\n\nIt analyzes whether post-mortem continuity requires memory preservation, or if a deeper, impersonal field of awareness suffices."
      }
    ],
    thinkers: ["Gautama Buddha", "Pim van Lommel"],
    readings: [
      { title: "The Tibetan Book of the Dead", author: "Fremantle & Trungpa trans." },
      { title: "Twenty Cases Suggestive of Reincarnation", author: "Ian Stevenson" }
    ],
    bridge: {
      name: "Panpsychism (B5)",
      path: "/branches/panpsychism",
      desc: "If idealism is true, death is a dissociation rather than the destruction of consciousness."
    }
  },
  "esoteric/subtle-body": {
    title: "The Subtle Body Map",
    code: "R4-B",
    question: "Are energy centers physical organs, or maps of deep internal nervous states?",
    scope: "The Subtle Body Map deconstructs yogic and tantric energy models (Chakras, Nadis, Kundalini) from an experiential, interoceptive perspective.\n\nIt argues that these models are not primitive physiology, but highly sophisticated first-person maps of autonomic arousal, emotional storage, and somatic balance.",
    subsections: [
      {
        title: "Prana and Interoception",
        desc: "Prana is experienced not as a gas, but as the felt, alive quality of the physical body. The subtle body map is a systematic representation of somatic sensations (interoception) processed by the insular cortex.\n\nWorking with prana changes autonomic tone."
      },
      {
        title: "Chakras & The Nervous System",
        desc: "The major Chakras (energy centers) align closely with the main nerve plexuses (cervical, cardiac, celiac) and endocrine glands of the physical body.\n\nThey represent concentrated regions of visceral feedback and autonomic regulation."
      },
      {
        title: "Nadis and Energy Flow",
        desc: "Nadis are the subtle pathways of energy. The major nadis—Ida (cooling, parasympathetic) and Pingala (heating, sympathetic)—wind around the central Sushumna channel.\n\nThis maps the balance of the autonomic nervous system, which can be regulated through pranayama."
      }
    ],
    thinkers: ["Patanjali"],
    readings: [
      { title: "The Subtle Body: An Encyclopedia", author: "Cyndi Dale" }
    ],
    bridge: {
      name: "Cognitive Science (B3)",
      path: "/branches/cognitive",
      desc: "Explore how embodied cognition validates the subtle body maps of somatic experience."
    }
  },
  "esoteric/astral-travel": {
    title: "Astral Travel & OBEs",
    code: "R4-C",
    question: "What does the experience of leaving the physical body reveal about the nature of space and mind?",
    scope: "This node investigates Out-of-Body Experiences (OBEs) and astral projection. It combines phenomenological descriptions of somatic separation with scientific analyses of spatial self-location.",
    subsections: [
      {
        title: "Phenomenology of Separation",
        desc: "During an OBE, a subject experiences their center of awareness as detached from their physical body. The subject feels they are floating in space, looking down at their physical form.\n\nThis demonstrates that the brain's integration of vision and balance can be temporarily uncoupled."
      },
      {
        title: "Veridical Perception Claims",
        desc: "Investigates cases where subjects in out-of-body states claim to have observed distant, hidden events that were later verified.\n\nIt examines the evidential weight of these reports under clinical conditions."
      },
      {
        title: "Vestibular-Somatic Disruption",
        desc: "Scientific research shows that stimulating the temporoparietal junction (TPJ)—the brain region that integrates balance, touch, and vision—can reliably induce OBEs.\n\nThis explains the neurological mechanism by which the brain constructs our spatial self-location."
      }
    ],
    thinkers: ["Thomas Metzinger"],
    readings: [
      { title: "Journeys Out of the Body", author: "Robert Monroe" }
    ],
    bridge: {
      name: "Philosophy of Mind (B2)",
      path: "/branches/philosophy",
      desc: "If mind can function outside the physical body, substance dualism becomes a viable philosophical position."
    }
  },
  "esoteric/ndes": {
    title: "Near-Death Experiences (NDEs)",
    code: "R4-D",
    question: "Can consciousness exist when the brain shows flatline electrical activity?",
    scope: "Near-Death Experiences represent a major challenge to the materialist model of consciousness.\n\nThis node examines prospective clinical studies of cardiac arrest survivors who report structured, highly vivid conscious experiences during periods of zero cortical activity.",
    subsections: [
      {
        title: "The Clinical Challenge",
        desc: "NDEs occur during cardiac arrest, when clinical signs show flatline EEG activity. Within 10-15 seconds of cardiac arrest, the brain is deprived of oxygen, yet patients report complex mental activity.\n\nThis challenges the view that the brain generates consciousness."
      },
      {
        title: "Common NDE Elements",
        desc: "Explores the cross-cultural invariants of the NDE: deep peace, out-of-body transition, movement through a tunnel, encounters with a light or deceased relatives, and a life review.\n\nThese elements remain consistent across different cultures and religions."
      },
      {
        title: "Explanatory Hypotheses",
        desc: "Compares materialist explanations (such as anoxia, hypercarbia, or temporal lobe seizures) with non-local theories.\n\nIt discusses whether NDEs show that the brain acts as a transceiver for a fundamental conscious field, rather than its producer."
      }
    ],
    thinkers: ["Pim van Lommel"],
    readings: [
      { title: "Consciousness Beyond Life", author: "Pim van Lommel" }
    ],
    bridge: {
      name: "Neuroscience (B1)",
      path: "/branches/neuroscience",
      desc: "How does clinical brain death during NDEs challenge current neuroscience models of consciousness production?"
    }
  },
  "esoteric/enlightenment": {
    title: "Enlightenment & Mysticism",
    code: "R4-E",
    question: "What is the common core of the mystical experience across history and culture?",
    scope: "This node explores the highest states of human realization, known as enlightenment, union, or satori, from a philosophical perspective.\n\nIt analyzes the common structural characteristics of these experiences, showing that they represent a shift in the sense of identity.",
    subsections: [
      {
        title: "William James' Four Criteria",
        desc: "William James identified four characteristics of mystical states:\n1. Ineffability (defies expression in words).\n2. Noetic quality (direct, intuitive knowledge).\n3. Transiency (temporary duration).\n4. Passivity (feeling held by a larger presence)."
      },
      {
        title: "The Loss of Subject-Object Division",
        desc: "The core of the mystical experience is the collapse of the boundary between the observer and the observed.\n\nThe seeker no longer feels like a separate subject looking at an external world, but experiences reality as a single, seamless field of awareness."
      },
      {
        title: "Permanent Metanoia (Transformation)",
        desc: "Enlightenment is defined not by passing states, but by permanent metanoia—a lasting shift in identity.\n\nThis shift is characterized by a decrease in fear of death, greater empathy, and the permanent recognition of presence prior to biography."
      }
    ],
    thinkers: ["Ramakrishna Paramahamsa", "William James"],
    readings: [
      { title: "The Varieties of Religious Experience", author: "William James" }
    ],
    bridge: {
      name: "Trunk Bridge",
      path: "/trunk",
      desc: "Enlightenment is the direct experiential realization of the unifying thread mapped in the Trunk."
    }
  },

  inquiry: {
    title: "Direct Inquiry",
    code: "R5",
    question: "Who is the one asking the question?",
    scope: "Direct Inquiry is the practical application of non-dual philosophy. Rather than accumulating concepts or beliefs, it uses the intellect to investigate the nature of the seeker.\n\nBy tracing the sense of identity back to its source, this root aims to dissolve false identifications and reveal the ever-present Witness.",
    subsections: [
      {
        title: "Self-Inquiry (Atma Vichara)",
        desc: "Popularized by Ramana Maharshi, Self-Inquiry is the practice of reversing attention. Seekers ask 'Who am I?' to trace the 'I-thought' back to its source.\n\nThis turns the light of awareness back onto itself, bypassing verbal thoughts."
      },
      {
        title: "Neti Neti (The Method of Negation)",
        desc: "The Upanishadic practice of subtracting objective attributes: 'I am not this body, not these emotions, not these thoughts.'\n\nBy negating what can be observed, it isolates the unattached Seer."
      },
      {
        title: "The Witness (Sakshee)",
        desc: "The realization that you are the changeless background of awareness within which all thoughts, sensations, and events arise.\n\nYou are the screen, not the movie playing on it."
      }
    ],
    thinkers: ["Ramana Maharshi", "Nisargadatta Maharaj", "Rupert Spira", "Francis Lucille"],
    readings: [
      { title: "Who Am I?", author: "Ramana Maharshi" },
      { title: "Being Aware of Being Aware", author: "Rupert Spira" }
    ],
    bridge: {
      name: "Philosophy of Mind (B2)",
      path: "/branches/philosophy",
      desc: "Direct Inquiry is the internal investigation of the same subjective reality described by the Hard Problem."
    }
  },
  "inquiry/self-inquiry": {
    title: "Self-Inquiry (Atma Vichara)",
    code: "R5-A",
    question: "Where does the sense of being an 'I' arise from?",
    scope: "Self-Inquiry is the direct path of self-realization taught by Ramana Maharshi. It is a phenomenological investigation into the root of personal identity.\n\nRather than analyzing thoughts, it traces the 'I-thought' back to its silent origin.",
    subsections: [
      {
        title: "Reversing Attention",
        desc: "Ordinary attention flows outward to objects (sights, sounds, thoughts). Self-Inquiry reverses this flow, turning the light of awareness back onto its own source.\n\nIt asks: 'Who is aware of these objects?'"
      },
      {
        title: "The Death of the Ego",
        desc: "The separate ego exists by identifying with thoughts and memories. As attention remains fixed on the core sense of 'I', the conceptual ego dissolves.\n\nThis leaves only the silent, self-evident presence of the Self."
      },
      {
        title: "Abidance in the Source (Jnana)",
        desc: "The transition from the active questioning ('Who am I?') to silent abidance in the source of attention, where the mind dissolves in the Heart.\n\nThis is not a state of unconsciousness, but the realization of pure being."
      }
    ],
    thinkers: ["Ramana Maharshi", "Rupert Spira"],
    readings: [
      { title: "Be As You Are", author: "David Godman ed." }
    ],
    bridge: {
      name: "Cognitive Science (B3)",
      path: "/branches/cognitive",
      desc: "How does reversing attention destabilize the brain's predictive self-model?"
    }
  },
  "inquiry/neti-neti": {
    title: "Neti Neti (Negation)",
    code: "R5-B",
    question: "What remains when everything that can be observed is subtracted?",
    scope: "Neti Neti ('not this, not this') is the classical Upanishadic method of discrimination (Viveka).\n\nIt systematically separates the Seer (Drk) from the seen (Drsya), dismantling the false identification of awareness with material forms.",
    subsections: [
      {
        title: "Not This, Not This",
        desc: "The process of systematically negating identifications: 'I have a body, but I am not the body. I have thoughts, but I am not the thoughts.'\n\nWhatever is observed cannot be the ultimate observer."
      },
      {
        title: "The Ultimate Residue",
        desc: "When everything observable is negated, what remains is not nothing.\n\nIt is the infinite, unattached awareness that witnessed the negation itself—the self-luminous Subject."
      },
      {
        title: "Witnessing the Unseen",
        desc: "The realization that the ultimate observer can never itself be observed, showing that the search for the Self must end in the collapse of all objectification.\n\nYou cannot see the eye that sees."
      }
    ],
    thinkers: ["Adi Shankaracharya", "Swami Sarvapriyananda"],
    readings: [
      { title: "Drg-Drk-Viveka", author: "Adi Shankaracharya" }
    ],
    bridge: {
      name: "Phenomenology (R4)",
      path: "/roots/phenomenology",
      desc: "Husserl's Epoché and Neti Neti are structurally identical methods of negation."
    }
  },
  "inquiry/witness": {
    title: "The Witness",
    code: "R5-C",
    question: "What is the constant background that remains unchanged through all experiences?",
    scope: "The Witness (Sakshee) is the foundational concept of Advaita epistemology.\n\nIt represents the silent, unattached observer that registers all physical and mental changes without being modified by them.",
    subsections: [
      {
        title: "The Unchanging Screen",
        desc: "Awareness is like a cinema screen. Movies play on the screen, but the screen itself is never wet by painted water or burned by painted fire.\n\nSimilarly, awareness is unaffected by the thoughts and emotions that appear within it."
      },
      {
        title: "Objectifying the Subject",
        desc: "Suffering occurs when we mistake ourselves for the objects of experience (body, ego). Realizing your nature as the Witness dissolves this misidentification.\n\nYou are the observer of the mind, not the mind itself."
      },
      {
        title: "Sakshi Chetana (Witness Consciousness)",
        desc: "The classical Vedantic analysis of the Witness as separate from the three states of consciousness, observing the mind's modifications without being stained by them.\n\nIt is the unchanging, self-existent subject."
      }
    ],
    thinkers: ["Nisargadatta Maharaj", "Francis Lucille"],
    readings: [
      { title: "I Am That", author: "Nisargadatta Maharaj" }
    ],
    bridge: {
      name: "Philosophy of Mind (B2)",
      path: "/branches/philosophy",
      desc: "The Witness represents the pure Subject that physicalist models fail to explain."
    }
  },
  "inquiry/who-am-i": {
    title: "Who Am I?",
    code: "R5-D",
    question: "What is the ultimate answer to the question of identity?",
    scope: "This node explores the question 'Who am I?' not as a riddle to be solved by the intellect, but as a phenomenological tool to silence the mind.",
    subsections: [
      {
        title: "Not a Verbal Answer",
        desc: "The question 'Who am I?' is not meant to be answered by a word or a sentence. Its purpose is to silence the mind's verbal search and leave only the silent experience of being.\n\nAny verbal answer is only another concept."
      },
      {
        title: "The Dissolution of the Questioner",
        desc: "In the end, the question 'Who am I?' dissolves along with the ego, exposing that there is no separate questioner.\n\nThere is only the self-evident ground of awareness."
      },
      {
        title: "The Silent Pointer",
        desc: "How the question acts as an arrow that directs attention back to the source of consciousness, rendering the mind completely quiet and receptive.\n\nIt points directly to the subject."
      }
    ],
    thinkers: ["Ramana Maharshi"],
    readings: [
      { title: "Who Am I?", author: "Ramana Maharshi" }
    ],
    bridge: {
      name: "Trunk Bridge",
      path: "/trunk",
      desc: "The question 'Who am I?' is the exact portal that leads to the root question on the Trunk."
    }
  },

  shivom: {
    title: "Shivom's Inquiry",
    code: "R6",
    question: "What remains when memories, senses, language, and the ego are taken away?",
    scope: "Shivom's Inquiry represents a deeply subjective, modern phenomenological approach to the limits of identity.\n\nIt uses thought experiments—such as congenital sensory impairment and total amnesia—to question whether a personality or intellect can exist without sensory data, isolating what remains in their absolute absence.",
    subsections: [
      {
        title: "The Deep Sleep Argument",
        desc: "When the mind, personal identity, and relationships vanish in dreamless sleep, we do not experience unaliveness.\n\nSomething remains to witness the absence of objects, showing that awareness is prior to the mind."
      },
      {
        title: "Congenital Sensory Impairment",
        desc: "If a person were born completely blind, deaf, and senseless, no intellect or personality could form because there would be no sensory data to learn from.\n\nYet, would they be dead? What is the core that remains?"
      },
      {
        title: "The 'I' in the Womb",
        desc: "Exploring the bare sense of existence in the womb, prior to the development of language, memory, and the subject-object division.\n\nIt points to a unified, pre-egoic feeling of being."
      },
      {
        title: "The Memory Loss Argument",
        desc: "If all personal memories, language, and social roles were completely stripped away, who or what remains?\n\nIt deconstructs the narrative self to expose the silent Witness."
      }
    ],
    thinkers: ["Ramana Maharshi", "Thomas Metzinger", "Dan Zahavi"],
    readings: [
      { title: "Prior to Consciousness", author: "Nisargadatta Maharaj" },
      { title: "Subjectivity and Selfhood", author: "Dan Zahavi" }
    ],
    bridge: {
      name: "Cognitive Science (B3)",
      path: "/branches/cognitive",
      desc: "How does the congenital absence of sensory input affect the brain's predictive models of the self?"
    }
  },
  "shivom/deep-sleep": {
    title: "The Deep Sleep Argument",
    code: "R6-A",
    question: "Who registers the peace of deep sleep when the mind is absent?",
    scope: "Deconstructing the waking state by analyzing the continuity of awareness during dreamless sleep.\n\nThis classic Vedantic argument demonstrates that consciousness does not depend on mental activity to exist.",
    subsections: [
      {
        title: "Witnessing Absence",
        desc: "Upon waking, we say 'I slept peacefully; I knew nothing.' Advaita argues this memory is proof that awareness was present.\n\nThe mind was absent, but awareness was active, witnessing the *absence* of objects."
      },
      {
        title: "Awareness is Prior to Mind",
        desc: "Deep sleep proves that the mind and ego are temporary projections.\n\nAwareness does not need the mind to exist; the mind needs awareness to be illuminated."
      },
      {
        title: "Anandamaya Kosha (The Bliss Sheath)",
        desc: "Vedanta describes deep sleep as resting in the sheath of bliss—a state of peace where the individual ego is absent, yet awareness persists as a silent witness.\n\nIt is the closest state to our true nature in daily life."
      }
    ],
    thinkers: ["Ramana Maharshi", "Swami Sarvapriyananda"],
    readings: [
      { title: "Mandukya Upanishad", author: "Swami Nikhilananda trans." }
    ],
    bridge: {
      name: "Philosophy of Mind (B2)",
      path: "/branches/philosophy",
      desc: "How do physicalist theories explain the continuity of subjective awareness during deep sleep?"
    }
  },
  "shivom/sensory-impairment": {
    title: "Congenital Sensory Impairment",
    code: "R6-B",
    question: "If the senses were absent from birth, would a mind or personality ever form?",
    scope: "A thought experiment exploring the dependency of intellect and personality on sensory experiences.\n\nIt highlights that our personal identity is a constructed process, not an inherent entity.",
    subsections: [
      {
        title: "No Data, No Mind",
        desc: "Without sensory inputs (sight, sound, touch), the neural networks of the brain would have no data to learn from.\n\nNo language, intellect, or personality would be constructed. The mind would remain unformed."
      },
      {
        title: "What remains?",
        desc: "In the absolute absence of a constructed mind or personality, there would still be life, being, and awareness.\n\nThis proves that our true nature is prior to the intellect and personality."
      },
      {
        title: "The Transcendent Subject",
        desc: "Explores the metaphysical implication: if a senseless body is still alive and aware, then consciousness is not an emergent property of sensory integration, but is fundamental.\n\nIt is prior to cognitive content."
      }
    ],
    thinkers: ["Thomas Metzinger", "Dan Zahavi"],
    readings: [
      { title: "The Ego Tunnel", author: "Thomas Metzinger" }
    ],
    bridge: {
      name: "Cognitive Science (B3)",
      path: "/branches/cognitive",
      desc: "What does modern cognitive science say about neural network training in the absence of sensory input?"
    }
  },
  "shivom/womb": {
    title: "The 'I' in the Womb",
    code: "R6-C",
    question: "What is the nature of awareness before the ego is constructed?",
    scope: "Exploring the state of awareness in the womb, prior to the development of memory, language, and the subject-object division.",
    subsections: [
      {
        title: "Pre-Egoic Presence",
        desc: "In the womb, there is no language, no memory, and no sense of a separate ego. There is only a bare, unified feeling of existence.\n\nThis shows that the sense of being is prior to the sense of separateness."
      },
      {
        title: "The Root of Separateness",
        desc: "The ego develops only as sensory experiences accumulate and create a division between 'me' (the body-mind) and 'other' (the world).\n\nSeparateness is a learned boundary."
      },
      {
        title: "Primary Subjectivity",
        desc: "The infant's experience before separating 'self' from 'world', representing a natural non-dual state that is later veiled by the structures of language and memory.\n\nIt is a state of open, uncontracted being."
      }
    ],
    thinkers: ["Ramana Maharshi"],
    readings: [
      { title: "Who Am I?", author: "Ramana Maharshi" }
    ],
    bridge: {
      name: "Neuroscience (B1)",
      path: "/branches/neuroscience",
      desc: "How does the development of the Default Mode Network in infants correlate with the emergence of the ego?"
    }
  },
  "shivom/memory-loss": {
    title: "The Memory Loss Argument",
    code: "R6-D",
    question: "If you lost all your memories right now, would you cease to exist?",
    scope: "Deconstructing identity by analyzing what remains when all personal memory and language are stripped away.",
    subsections: [
      {
        title: "Subtracting the Narrative",
        desc: "If a person suffers complete amnesia, their name, history, relationships, and language vanish. The narrative self is destroyed.\n\nYet, the immediate sense of being and witnessing continues, showing that consciousness is not a product of memory."
      },
      {
        title: "The Silent Residue",
        desc: "What remains when all labels are taken away is the pure, contentless presence—the silent Witness.\n\nThis presence does not need a past or a future to exist."
      },
      {
        title: "The Immediate Presence",
        desc: "The realization that even when personal identity is destroyed by cognitive decay, the pure sense of existence remains untarnished.\n\nIt offers peace prior to biography and memory."
      }
    ],
    thinkers: ["Nisargadatta Maharaj", "Dan Zahavi"],
    readings: [
      { title: "I Am That", author: "Nisargadatta Maharaj" }
    ],
    bridge: {
      name: "Philosophy of Mind (B2)",
      path: "/branches/philosophy",
      desc: "Memory loss demonstrates that consciousness (qualia/presence) is distinct from cognitive functions (memory/identity)."
    }
  }
};
