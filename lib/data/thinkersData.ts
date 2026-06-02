import type { ThinkerData } from "../contentData";

export const THINKERS_DATA: Record<string, ThinkerData> = {
  shankaracharya: {
    name: "Adi Shankaracharya",
    era: "c. 788–820 CE — India",
    question: "Is the individual self ultimately different from the ground of being — or is the sense of separation the only illusion?",
    contribution: "Shankaracharya systematized Advaita Vedanta. He introduced Adhyasa (superimposition) as the mechanism of the ego, and Vivartavada (apparent transformation) to explain how multiplicity arises from one undivided reality without actually modifying it.",
    quote: "Brahma satyam jagan mithya, jivo brahmaiva naparah. (Brahman alone is real. The world is appearance. The individual self is none other than Brahman.)",
    works: [
      "Vivekachudamani (Crest-Jewel of Discrimination)",
      "Atma Bodha (Self-Knowledge)",
      "Commentaries on the Upanishads & Bhagavad Gita"
    ],
    spectrum: "Deep Roots — R1 (Advaita Vedanta)",
    connections: ["Advaita Vedanta (R1)", "Direct Inquiry (R3)", "Panpsychism (B5)", "Ramana Maharshi"],
    color: "#e11d48",
    spectrumPercent: 3,
    keyIdeas: [
      "Adhyasa (superimposition): the ego is a false identification of pure awareness with the body-mind",
      "Vivartavada: the world is an apparent, not actual, modification of the one Brahman",
      "Neti Neti ('not this, not this'): systematic negation pointing to the unqualifiable Absolute",
      "Mahavakyas: 'Aham Brahmasmi' (I Am Brahman), 'Tat Tvam Asi' (That Thou Art)",
      "Turiya: the fourth, stateless awareness underlying waking, dream, and deep sleep"
    ],
    legacy: "Shankaracharya's systematization of Advaita Vedanta established the philosophical backbone of the entire Hindu philosophical tradition. His commentaries on the Upanishads, the Bhagavad Gita, and the Brahma Sutras remain the canonical reference works. He founded four sacred monasteries (Mathas) at the four corners of India, ensuring unbroken transmission for over twelve centuries.",
    additionalQuotes: [
      "Just as the space within a jar is not different from the infinite space outside, so the individual self is not different from Brahman.",
      "The world, filled with attachments and aversions, is like a dream. It appears to be real as long as one is dreaming, but becomes unreal when one wakes up.",
      "Knowing oneself to be the witness of the intellect and its modifications, one is freed from the bondage of birth and death."
    ]
  },
  ramana: {
    name: "Ramana Maharshi",
    era: "1879–1950 — India",
    question: "Who am I?",
    contribution: "Popularized Atma Vichara (Self-Inquiry). Following a spontaneous death experience at age 16, he recognized that his true nature was the silent Witness. He instructed seekers to trace the 'I-thought' back to its source.",
    quote: "The mind will subside only by means of the enquiry 'Who am I?'. The thought 'Who am I?' will destroy all other thoughts, and like the stick used for stirring the burning pyre, it will itself in the end get destroyed.",
    works: [
      "Who Am I? (Nan Yar)",
      "Forty Verses on Reality (Ulladu Narpadu)",
      "Talks with Sri Ramana Maharshi"
    ],
    spectrum: "Deep Roots — R1, R5",
    connections: ["Advaita Vedanta (R1)", "Direct Inquiry (R3)", "Nisargadatta Maharaj", "Rupert Spira"],
    color: "#0284c7",
    spectrumPercent: 5,
    keyIdeas: [
      "Atma Vichara: trace the 'I-thought' back to its silent source — not conceptually, but directly",
      "The I-thought is the root of all suffering; when it subsides, the Self shines",
      "The Heart is the seat of the Self — not the physical organ, but pure being-consciousness",
      "Silence is the highest teaching; the inner Guru is identical to the Self",
      "The Self was never bound; only the false idea of bondage needs to dissolve"
    ],
    legacy: "Ramana is the convergence point of Advaita Vedanta and direct phenomenological method. His influence reaches virtually every living non-dual teacher: H.W.L. Poonja (Papaji) was his direct disciple; Rupert Spira and Francis Lucille carry the lineage through Papaji. Paul Brunton's A Search in Secret India (1934) first introduced Ramana to the Western world, initiating a global transmission that continues today.",
    additionalQuotes: [
      "There is no greater mystery than this, that we keep seeking reality though in fact we are reality.",
      "Your duty is to be, not to be this or that. 'I am that I am' sums up the whole truth. The method is summed up by 'be still.'",
      "Reality is simply loss of ego. Destroy the ego by seeking its identity."
    ]
  },
  nisargadatta: {
    name: "Nisargadatta Maharaj",
    era: "1897–1981 — India",
    question: "What are you before you think you are something?",
    contribution: "A bidi-seller from Mumbai who taught radical non-duality. He pointed to the 'I Am' (the bare feeling of presence prior to labels) as the doorway to the Absolute. His dialogues are collected in the masterpiece 'I Am That'.",
    quote: "You are not what you think you are. Find out what you are. The 'I Am' is the last illusion — but it is also the door.",
    works: [
      "I Am That",
      "Prior to Consciousness",
      "The Ultimate Medicine"
    ],
    spectrum: "Deep Roots — R1, R3",
    connections: ["Advaita Vedanta (R1)", "Direct Inquiry (R3)", "Ramana Maharshi", "Francis Lucille"],
    color: "#0284c7",
    spectrumPercent: 5,
    keyIdeas: [
      "Abide as the I Am — the bare, conceptless sense of being prior to all mental labels",
      "The 'I Am' is the last pointer: not a final truth, but the final doorway",
      "Consciousness is the substance of the world — but you are prior even to consciousness",
      "Nothing received a single instruction: remain as I Am. Liberation followed in three years",
      "The Absolute is beyond consciousness — the I Am arises in it like a sunrise in a clear sky"
    ],
    legacy: "I Am That is considered one of the most direct transmission texts in any spiritual tradition. Maurice Frydman's translation (1973) brought Nisargadatta to the global stage. His radical pointing — beyond all systems, all practices, all traditions — has influenced every subsequent direct-path teacher, including Rupert Spira and Francis Lucille. His final talks, recorded in Prior to Consciousness, go beyond even the I Am to the trackless Absolute.",
    additionalQuotes: [
      "Love says 'I am everything.' Wisdom says 'I am nothing.' Between the two, my life flows.",
      "To be born means to die. To be a person means to suffer. The witness is prior to all, untouched by either.",
      "Awareness is primordial; it is the original state. Consciousness is of the mind; it is relational and changing."
    ]
  },
  buddha: {
    name: "Gautama Buddha",
    era: "c. 5th–4th century BCE — India/Nepal",
    question: "What causes suffering — and can awareness itself be liberated from it?",
    contribution: "Established the Anatta (no-self) teaching: the five aggregates constituting a person are not a self, not mine, not what I am. When identification with these aggregates ceases, suffering is extinguished.",
    quote: "Mind is the forerunner of all states. Mind is chief, mind-made are they. If one speaks or acts with a pure mind, happiness follows, as a shadow that never departs.",
    works: [
      "Dhammapada",
      "Majjhima Nikaya (Middle Length Discourses)",
      "Samyutta Nikaya (Connected Discourses)"
    ],
    spectrum: "Deep Roots — R2 (Buddhist Thought)",
    connections: ["Buddhist Thought (R2)", "Direct Inquiry (R3)", "Nagarjuna", "Advaita Vedanta"],
    color: "#d946ef",
    spectrumPercent: 8,
    keyIdeas: [
      "Anatta (no-self): the five aggregates are not a self, not mine, not what I am",
      "Four Noble Truths: suffering exists, has a cause (craving), can cease, and there is a path",
      "The Noble Eightfold Path: right view, intention, speech, action, livelihood, effort, mindfulness, concentration",
      "Dependent Origination (Pratityasamutpada): all phenomena arise in dependence on causes and conditions",
      "The middle way: between extreme asceticism and indulgence; between existence and non-existence"
    ],
    legacy: "The Buddha's teaching gave rise to the most geographically extensive spiritual tradition in history — from India through Southeast Asia, China, Japan, Tibet, and now the West. His Anatta doctrine is the deepest challenge to the materialist assumption of a persistent self, and anticipates by 2500 years the no-self findings of cognitive neuroscience (Metzinger, Seth). The mindfulness revolution in clinical medicine is a direct secularization of vipassana practice.",
    additionalQuotes: [
      "All conditioned things are impermanent — when one sees this with wisdom, one turns away from suffering.",
      "Do not believe in anything simply because you have heard it. But after observation and analysis, when you find that anything agrees with reason and is conducive to the good and benefit of one and all, then accept it and live up to it.",
      "He who sees dependent co-origination sees the Dharma; he who sees the Dharma sees dependent co-origination."
    ]
  },
  nagarjuna: {
    name: "Nagarjuna",
    era: "c. 2nd century CE — India",
    question: "Does anything — including consciousness or emptiness itself — have inherent existence?",
    contribution: "Nagarjuna's Mulamadhyamakakarika is one of the most rigorous works of philosophical argumentation in human history. His method: take any phenomenon — causation, motion, the self, time, nirvana — and demonstrate through relentless logical analysis that it cannot be found to have inherent existence from its own side. Nothing exists independently; everything arises in dependence on everything else. Crucially, emptiness (śūnyatā) is itself empty — this is not nihilism but the most radical openness. His Two Truths doctrine distinguishes conventional truth (how things appear to operate) from ultimate truth (that all things lack inherent existence), and his Middle Way steers between the extremes of eternalism and nihilism.",
    quote: "Whatever is dependently co-arisen, that is explained to be emptiness. That, being a dependent designation, is itself the middle way.",
    works: [
      "Mulamadhyamakakarika (Fundamental Wisdom of the Middle Way)",
      "Vigrahavyavartani (The Dispeller of Disputes)",
      "Precious Garland (Ratnavali)"
    ],
    spectrum: "Deep Roots — R2 (Buddhist Thought)",
    connections: ["Buddhist Thought (R2)", "Phenomenology (R3)", "Gautama Buddha", "Philosophy of Mind (B2)"],
    color: "#d946ef",
    spectrumPercent: 10,
    keyIdeas: [
      "Śūnyatā (emptiness): all phenomena are empty of inherent, independent existence — they exist only relationally",
      "Pratītyasamutpāda (dependent co-origination): nothing arises from itself, from another, from both, or without cause",
      "Two Truths: conventional truth (vyavahāra) and ultimate truth (paramārtha) are not two separate realities but two aspects of one",
      "The Middle Way (Madhyamaka): between the extremes of eternalism (things permanently exist) and nihilism (nothing exists at all)",
      "Emptiness is itself empty — śūnyatā is not a substance, not a ground, not a thing; it is the absence of inherent nature in all things, including itself"
    ],
    additionalQuotes: [
      "If śūnyatā is possible, then everything is possible. If śūnyatā is not possible, then nothing is possible.",
      "The victorious ones have said that emptiness is the relinquishing of all views. For whomever emptiness is a view, that one has accomplished nothing.",
      "There does not exist anything that is not dependently arisen. Therefore there does not exist anything that is not empty."
    ],
    legacy: "Nagarjuna is widely regarded as the most important Buddhist philosopher after the Buddha himself. His Madhyamaka system became the philosophical foundation of Mahayana Buddhism and profoundly shaped Tibetan, Chinese, Japanese, and Korean Buddhist traditions. His logical method — the prasanga (reductio ad absurdum) — anticipates Wittgenstein's therapeutic philosophy by 1800 years: both demonstrate that philosophical problems dissolve when their hidden assumptions are exposed. Jay Garfield's 1995 translation brought the Mulamadhyamakakarika into direct conversation with contemporary analytic philosophy. His influence on modern thinkers includes Graham Priest (dialetheism), Mark Siderits (Buddhist philosophy of mind), and the Dalai Lama, who considers Nagarjuna the supreme philosopher of the Buddhist tradition."
  },
  patanjali: {
    name: "Patanjali",
    era: "c. 2nd century BCE – 4th century CE (disputed)",
    question: "How does the movement of the mind obscure the nature of pure consciousness, and how can that movement be stilled?",
    contribution: "The Yoga Sutras — 196 aphorisms that constitute the most systematic pre-modern psychology of consciousness in any tradition. Patanjali distinguishes between the Seer (Purusha — pure consciousness, the witness) and the seen (Prakriti — the field of nature, including the mind). The mind's fluctuations (vrittis) create the illusion of identification with what is seen. Yoga — in its original meaning — is the cessation of those fluctuations, not physical postures. His eight-limbed path (Ashtanga Yoga) provides a comprehensive method from ethical conduct through concentration to the highest states of absorption (samadhi). His taxonomy of the samadhi states — savikalpa (with seed/content) and nirvikalpa (seedless/contentless) — provides an experiential map of the territory beyond ordinary mind.",
    quote: "Yoga chitta vritti nirodha. — Yoga is the cessation of the fluctuations of the mind-field. Then the Seer abides in its own nature.",
    works: [
      "Yoga Sutras of Patanjali",
      "Inside the Yoga Sutras (commentary by Jaganath Carrera)",
      "The Science of Yoga — I.K. Taimni (technical commentary)"
    ],
    spectrum: "Roots — R1, R4",
    connections: ["Advaita Vedanta (R1)", "Esoteric Realities (R4)", "Yoga Practices (F2)", "Samkhya Philosophy"],
    color: "#0d9488",
    spectrumPercent: 15,
    keyIdeas: [
      "Chitta-Vritti-Nirodha: yoga is the cessation of the fluctuations of the mind-field, revealing pure consciousness",
      "The Eight Limbs (Ashtanga): yama, niyama, asana, pranayama, pratyahara, dharana, dhyana, samadhi — a complete map from ethics to absorption",
      "Purusha and Prakriti: consciousness is the eternal witness; matter/mind is what is witnessed — suffering arises from confusing the two",
      "Samadhi taxonomy: savikalpa (absorption with content/seed) → nirvikalpa (seedless absorption) → kaivalya (final isolation of pure awareness)",
      "Kleshas (afflictions): ignorance, egoism, attachment, aversion, and fear of death — the five root causes of suffering"
    ],
    additionalQuotes: [
      "With the cessation of mental modifications, the Seer rests in its own essential nature. This is Self-realization.",
      "Ignorance is the field in which all other afflictions can grow and flourish, whether they are dormant, attenuated, interrupted, or fully active.",
      "Practice becomes firmly grounded when it is pursued for a long time, without interruption, and with sincere devotion."
    ],
    legacy: "Patanjali's Yoga Sutras remain the foundational text of contemplative practice across the world. His psychological framework — distinguishing consciousness from its contents — anticipated by two millennia the core insight of phenomenology (Husserl) and the hard problem of consciousness (Chalmers). The eight-limbed path became the structural basis for virtually every systematic meditation tradition. His influence extends through Swami Vivekananda's Raja Yoga (which introduced the Sutras to the West), through the modern mindfulness movement, and into clinical psychology (MBSR, MBCT). The Sutras have been translated into over 40 languages and remain required reading in consciousness studies."
  },
  ramakrishna: {
    name: "Ramakrishna Paramahamsa",
    era: "1836–1886 — India",
    question: "Are all genuine spiritual paths — across traditions — pointing at the same undivided reality?",
    contribution: "Ramakrishna did not argue for the unity of religions — he experimented with it. He practiced Advaita Vedanta, Shakta devotion, Vaishnavism, Sufism, and Christianity, in succession, reaching states of samadhi in each. His life is a phenomenological demonstration — not a theological claim — that the same ground is accessible from different directions. He experienced nirvikalpa samadhi (total absorption beyond subject-object distinction) repeatedly, and his ecstatic states were documented by his disciples in extraordinary detail. His influence on Swami Vivekananda, who brought Vedanta to the West, makes him the indirect source of the modern Vedantic conversation.",
    quote: "As many faiths, so many paths.",
    works: [
      "The Gospel of Sri Ramakrishna — M. (Mahendranath Gupta)",
      "Ramakrishna and His Disciples — Christopher Isherwood",
      "The Great Master — Swami Saradananda"
    ],
    spectrum: "Roots — R1, R4",
    connections: ["Advaita Vedanta (R1)", "Esoteric Realities (R4)", "Swami Vivekananda", "Direct Inquiry (R5)"],
    color: "#0d9488",
    spectrumPercent: 18,
    keyIdeas: [
      "All genuine spiritual paths lead to the same ground — tested phenomenologically, not argued theologically",
      "Nirvikalpa samadhi: total absorption where subject-object distinction dissolves into undifferentiated consciousness",
      "Lila (divine play): the universe is not a mistake or an illusion to be escaped, but the creative play of consciousness",
      "The parable of the blind men and the elephant: each tradition touches one aspect of an infinite reality",
      "Direct experience is the only valid authority — no amount of scripture or argument substitutes for realization"
    ],
    additionalQuotes: [
      "God can be realized through all paths. All religions are true. The important thing is to reach the roof.",
      "The winds of grace blow all the time. All we need to do is set our sails.",
      "You see many stars in the sky at night, but not when the sun rises. Can you therefore say that there are no stars in the daytime? So too, because you cannot find God in the days of your ignorance, you should not say there is no God."
    ],
    legacy: "Ramakrishna's life is the most thoroughly documented case of cross-traditional mystical realization in history. The Gospel of Sri Ramakrishna (over 1,000 pages of direct dialogue) remains one of the richest primary sources in world religious literature. Through his disciple Vivekananda, he catalyzed the modern Vedanta movement in the West. The Ramakrishna Order — with centers in over 20 countries — continues his legacy of direct experience over dogma. His influence extends to Aldous Huxley's Perennial Philosophy, Romain Rolland's Nobel Prize-winning biography, and the entire interfaith movement of the 20th century."
  },
  vivekananda: {
    name: "Swami Vivekananda",
    era: "1863–1902 — India / International",
    question: "How can the depth of Vedantic non-dualism speak to the modern, scientific, and Western mind — without losing its radical edge?",
    contribution: "Brought Advaita Vedanta to the West, beginning with his electrifying address at the Parliament of the World's Religions in Chicago in 1893. More importantly for this project: he framed Vedanta in terms that could engage scientific and philosophical modernity — not as religion but as the science of consciousness. His four yogas (karma, jnana, raja, bhakti) as paths suited to different temperaments created a universal framework for spiritual practice. His Raja Yoga remains the most accessible introduction to Patanjali's system in the English language. He insisted that Vedanta is not about escapism but about strength — 'each soul is potentially divine' — and that practical service to humanity is inseparable from spiritual realization.",
    quote: "You are not sinners — you are gods. The Atman is the witness, the eternal consciousness behind all states. Arise, awake, and stop not till the goal is reached.",
    works: [
      "Raja Yoga — Patanjali's system made accessible",
      "Jnana Yoga — the path of knowledge",
      "Karma Yoga & Bhakti Yoga — the paths of action and devotion"
    ],
    spectrum: "Roots, Bridge to modern — R1",
    connections: ["Advaita Vedanta (R1)", "Ramakrishna Paramahamsa", "Sarvapriyananda", "Direct Inquiry (R5)"],
    color: "#e11d48",
    spectrumPercent: 25,
    keyIdeas: [
      "Each soul is potentially divine — the goal is to manifest this divinity within, by controlling nature external and internal",
      "The four yogas: karma (action), jnana (knowledge), raja (meditation), bhakti (devotion) — different paths for different temperaments",
      "Vedanta is not religion but the science of consciousness — testable, verifiable, and universal",
      "Practical Vedanta: service to humanity (seva) is identical to worship of God — the divine is present in every being",
      "Strength is the medicine the world needs — weakness is the root of suffering, not sin"
    ],
    additionalQuotes: [
      "All the powers in the universe are already ours. It is we who have put our hands before our eyes and cry that it is dark.",
      "In a conflict between the heart and the brain, follow your heart.",
      "The greatest religion is to be true to your own nature. Have faith in yourselves.",
      "Take up one idea. Make that one idea your life — think of it, dream of it, live on that idea."
    ],
    legacy: "Vivekananda single-handedly introduced Vedanta and Yoga to the Western intellectual mainstream. His 1893 Chicago address — beginning with 'Sisters and Brothers of America' — is considered one of the most consequential speeches of the 19th century. He founded the Ramakrishna Mission and Math, which continue to operate hospitals, schools, and relief organizations worldwide. His influence reaches through every subsequent effort to present Eastern philosophy in Western terms: Alan Watts, Aldous Huxley, Christopher Isherwood, and the entire modern yoga movement all trace intellectual lineage to Vivekananda. Swami Sarvapriyananda carries this transmission today at the Vedanta Society of New York — the same institution Vivekananda founded."
  },
  faggin: {
    name: "Federico Faggin",
    era: "1941– — Italy / USA",
    question: "Can consciousness — with its qualia, free will, and meaning — be reduced to computation?",
    contribution: "Faggin invented the microprocessor (the Intel 4004, 1971) — the foundational technology of the digital age. Decades later, through his own scientific reasoning, he concluded that consciousness cannot be what computation produces, because consciousness has properties that are irreducibly non-computational: qualia (the felt quality of experience), free will, and semantic meaning. Computers process syntax — formal rules for manipulating symbols — but only conscious agents experience semantics — what those symbols mean. His book Irreducible argues this from first principles, then proposes a quantum information framework in which consciousness is fundamental to reality. His journey — from the architect of computing to consciousness researcher — is itself one of the most compelling arguments in this project.",
    quote: "Consciousness is not what the brain does. It is what the brain is an expression of.",
    works: [
      "Irreducible: Consciousness, Life, Computers, and Human Nature (2021)",
      "Silicon: From the Invention of the Microprocessor to the Science of Consciousness",
      "Galileo Commission reports and Science & Nonduality (SAND) conference talks"
    ],
    spectrum: "Branches → Roots convergence — B4, B5",
    connections: ["Quantum Mind (B4)", "Panpsychism (B5)", "Donald Hoffman", "Bernardo Kastrup"],
    color: "#34d399",
    spectrumPercent: 68,
    keyIdeas: [
      "Consciousness is irreducible: qualia, free will, and semantic meaning cannot emerge from computational processes alone",
      "Syntax vs. semantics: computers manipulate symbols (syntax) but do not experience what symbols mean (semantics) — the gap is unbridgeable",
      "Quantum information as the substrate of consciousness: conscious experience may utilize quantum coherence in ways classical computation cannot",
      "The inventor's dilemma: having built the most powerful computational machines, Faggin concluded they can never be conscious",
      "One consciousness, many expressions: individual minds are like waves in a single ocean of awareness"
    ],
    additionalQuotes: [
      "I designed the first microprocessor, and after fifty years of reflection, I can tell you: no computer will ever be conscious.",
      "What I discovered is that the universe is made of consciousness, not of matter. Matter is what consciousness looks like from the outside.",
      "The feeling of being alive — the qualia of experience — is the most fundamental fact of reality, not an epiphenomenon."
    ],
    legacy: "Faggin's unique authority — the father of the microprocessor declaring that computation cannot produce consciousness — carries extraordinary weight in the consciousness debate. His Federico and Elvia Faggin Foundation funds research into the physics of consciousness. His work has influenced the Galileo Commission's challenge to scientific materialism and placed him alongside Hoffman and Kastrup as one of the three most prominent scientist-advocates for consciousness as fundamental. His personal trajectory — from engineering matter to studying mind — mirrors the project's central arc from Branches to Roots."
  },
  hoffman: {
    name: "Donald Hoffman",
    era: "1955– — USA",
    question: "Is the world we perceive the world as it actually is — or a user interface shaped by fitness, not truth?",
    contribution: "Hoffman applied evolutionary game theory to perception and reached a radical conclusion: organisms that perceive reality accurately are consistently out-competed by organisms that perceive fitness payoffs. Natural selection does not favor truth — it favors survival. Our perceptions are therefore a species-specific user interface — like desktop icons — not windows into objective reality. What lies behind the interface? His Conscious Agents Theory proposes a mathematical framework in which reality is fundamentally a network of interacting conscious agents, not physical objects in space-time. Space-time itself, he argues, is the interface — the desktop — not the reality. His work converges with Kastrup's idealism and Vedantic māyā from a purely scientific starting point.",
    quote: "Evolution has shaped us with perceptions that allow us to survive. But part of that involves hiding from us the stuff we don't need to know. And that's pretty much all of reality.",
    works: [
      "The Case Against Reality: Why Evolution Hid the Truth from Our Eyes (2019)",
      "Objects of Consciousness (2015 research paper)",
      "TED Talk: 'Do We See Reality as It Is?' (2015) — 11M+ views"
    ],
    spectrum: "Branches → Roots — B4, B5",
    connections: ["Quantum Mind (B4)", "Panpsychism (B5)", "Federico Faggin", "Bernardo Kastrup", "Advaita Vedanta (māyā)"],
    color: "#34d399",
    spectrumPercent: 72,
    keyIdeas: [
      "Fitness-Beats-Truth (FBT) theorem: natural selection systematically drives perception away from truth and toward fitness payoffs",
      "Interface Theory of Perception (ITP): our perceptions are a species-specific user interface, like desktop icons — not a window into objective reality",
      "Conscious Agents Theory: reality is a network of interacting conscious agents — space-time and physical objects are the interface, not the territory",
      "Space-time is doomed: following physicists Nima Arkani-Hamed and others, space-time is not fundamental but emergent from deeper structures",
      "Convergence with Vedantic māyā: what Vedanta calls the veil of illusion, Hoffman demonstrates through mathematical proof"
    ],
    additionalQuotes: [
      "Space-time is not fundamental. It's a data structure — a user interface — and not the reality behind the interface.",
      "Every time I open my eyes, I am constructing something. I'm not perceiving objective reality. I'm constructing an adaptive interface.",
      "The hard problem isn't just hard — it's the clue that we've been thinking about consciousness in the wrong direction entirely."
    ],
    legacy: "Hoffman's Fitness-Beats-Truth theorem has been formally proven and published in peer-reviewed journals, making it one of the few mathematical demonstrations that perception systematically misrepresents reality. His TED talk is one of the most-viewed consciousness talks in history. His Conscious Agents Theory — still under development — represents one of the most ambitious attempts to derive physics from consciousness rather than the reverse. His work explicitly bridges to Vedantic māyā (the veil of appearance), making him one of the key convergence figures in this project: a scientist whose mathematics led him to the same conclusion that Ramana Maharshi reached through self-inquiry."
  },
  kastrup: {
    name: "Bernardo Kastrup",
    era: "1973– — Netherlands",
    question: "Why is idealism — consciousness as the ground of all existence — the most parsimonious and coherent account of reality?",
    contribution: "Kastrup has done more than anyone to rehabilitate idealism as a serious philosophical position in contemporary analytic philosophy. His Analytical Idealism: consciousness is all there is; the physical world is its extrinsic appearance; individual minds are dissociated alters of a universal consciousness — analogous, at cosmic scale, to dissociative identity disorder. His argument is rigorous and directly engages the standard materialist objections. He draws explicit parallels between analytical idealism and Advaita Vedanta, arguing they are the same position arrived at by different routes. His work at the Essentia Foundation has created a platform for consciousness-first science that engages physicists, neuroscientists, and philosophers.",
    quote: "The world is in mind, not mind in the world. What we call matter is the extrinsic appearance of mental processes we cannot introspect from the outside.",
    works: [
      "The Idea of the World — the rigorous philosophical case for idealism",
      "Why Materialism Is Baloney — accessible introduction",
      "More Than Allegory — on myth, consciousness, and meaning"
    ],
    spectrum: "Branches → Roots convergence — B5",
    connections: ["Panpsychism (B5)", "Philosophy of Mind (B2)", "Donald Hoffman", "Philip Goff", "Advaita Vedanta (R1)"],
    color: "#f43f5e",
    spectrumPercent: 62,
    keyIdeas: [
      "Analytical Idealism: consciousness is the sole ontological primitive — matter is what mental processes look like from the outside",
      "The dissociation metaphor: individual minds are dissociated alters of one universal consciousness, analogous to dissociative identity disorder",
      "The combination problem is dissolved: instead of asking how tiny consciousnesses combine into big ones, idealism starts from one consciousness that dissociates",
      "Explicit structural identity with Advaita Vedanta: what Shankara calls Brahman, Kastrup calls universal consciousness; what Shankara calls māyā, Kastrup calls the dashboard of perception",
      "Materialism's hard problem is not solvable within materialism — it is a category error, not an engineering challenge"
    ],
    additionalQuotes: [
      "We don't have a hard problem of consciousness. We have a hard problem of matter — why does anything appear physical at all?",
      "Materialism is not a conclusion of science. It is an assumption science adopted and then forgot it was an assumption.",
      "If reality is fundamentally mental, then what physics describes are the patterns and regularities of mentation at a universal scale."
    ],
    legacy: "Kastrup has published over a dozen peer-reviewed papers in top philosophy journals, making analytical idealism a position that materialist philosophers must now formally respond to. His Essentia Foundation has become the leading institution for consciousness-first science. He has been described as the most important idealist philosopher since Berkeley. His explicit mapping of analytical idealism onto Advaita Vedanta makes him the single most important convergence figure in this project — the thinker who demonstrates, with full analytic rigor, that Western philosophy and Eastern non-duality have arrived at the same place."
  },
  chalmers: {
    name: "David Chalmers",
    era: "1966– — Australia / USA",
    question: "Why is there something it is like to have an experience?",
    contribution: "Formulated the 'Hard Problem of Consciousness' (1995) — the distinction that changed the philosophy of mind forever. Easy problems: explaining attention, memory, sleep, behavior — these are hard in practice but tractable in principle, because they involve explaining functions. Hard problem: explaining why any of these functions is accompanied by subjective experience at all. Why doesn't the processing happen 'in the dark,' without any felt quality? Chalmers showed this is not a problem of insufficient data — it is a problem of kind. No amount of functional explanation tells you why there is something it is like to see red. His work legitimized consciousness as a serious, irreducible philosophical problem after decades of dismissal by behaviorists and functionalists. More recently, he has moved toward panpsychism as the most promising framework.",
    quote: "Why is it that when our cognitive systems engage in visual and auditory information-processing, we have visual or auditory experience? Why doesn't all of this information-processing go on 'in the dark,' without any accompanying experience?",
    works: [
      "The Conscious Mind: In Search of a Fundamental Theory (1996)",
      "Facing Up to the Problem of Consciousness (1995 paper — the defining formulation)",
      "Reality+: Virtual Worlds and the Problems of Philosophy (2022)"
    ],
    spectrum: "Deep Branches — B2, B5",
    connections: ["Philosophy of Mind (B2)", "Panpsychism (B5)", "Philip Goff", "Christof Koch", "Bernardo Kastrup"],
    color: "#f43f5e",
    spectrumPercent: 85,
    keyIdeas: [
      "The Hard Problem: why is any physical process accompanied by subjective experience? This is not an engineering problem but an explanatory gap of kind",
      "Easy vs. Hard problems: explaining cognitive functions (attention, memory, behavior) is 'easy' in principle; explaining why they feel like something is categorically different",
      "The zombie argument: a being physically identical to you but with no inner experience is conceivable — this shows consciousness is not logically entailed by physical structure",
      "Property dualism → panpsychism: if consciousness cannot be reduced to the physical, perhaps it is a fundamental property of reality alongside mass and charge",
      "The meta-problem: why do we think consciousness is hard to explain? Even explaining our intuition about the hard problem is itself a philosophical puzzle"
    ],
    additionalQuotes: [
      "Consciousness is the biggest mystery. It may be the largest outstanding obstacle in our quest for a scientific understanding of the universe.",
      "Even when we have explained the performance of all the cognitive and behavioral functions in the vicinity of experience, there may still remain a further unanswered question: why is the performance of these functions accompanied by experience?",
      "I think that consciousness has always been the most important topic in philosophy of mind. And I think it's the most important problem in the science of the mind."
    ],
    legacy: "The phrase 'the hard problem of consciousness' has become one of the most cited concepts in modern philosophy — it reframed the entire discipline. Before Chalmers' 1995 paper, consciousness was widely dismissed in analytic philosophy as either reducible to brain function or not a real problem. After it, consciousness became the central question. His work directly influenced Koch's move toward IIT, Goff's panpsychism, Kastrup's idealism, and the Templeton Foundation's adversarial collaboration on consciousness theories. He co-founded the Association for the Scientific Study of Consciousness (ASSC) and remains the most widely cited living philosopher of mind."
  },
  goff: {
    name: "Philip Goff",
    era: "1978– — UK",
    question: "What if consciousness was never something to be explained by physics — but something physics was always built on top of?",
    contribution: "Goff's central argument in Galileo's Error: Galileo's methodological choice to exclude qualities (consciousness, color, sound as experienced) from the scientific description of the world — keeping only quantities (mass, charge, spin) — was a productive choice for physics, but it built the hard problem in from the start. Science can only describe the quantitative behavior of matter; it cannot, by design, explain the qualitative feel of experience. Panpsychism — the view that consciousness is a fundamental and ubiquitous feature of reality, present at all levels of complexity — is the natural resolution. Not that electrons think, but that the intrinsic nature of physical reality includes experiential properties. His work is rigorous, clear, and directly addresses the standard objections (the combination problem, the simplicity problem). He is currently the most publicly prominent philosopher of panpsychism.",
    quote: "The hard problem of consciousness is not a problem about consciousness. It's a problem about matter — about why our purely quantitative conception of matter leaves no room for the qualities of experience.",
    works: [
      "Galileo's Error: Foundations for a New Science of Consciousness (2019)",
      "Consciousness and Fundamental Reality (academic monograph)",
      "Mind Chat podcast (with Keith Frankish — the debate itself is valuable)"
    ],
    spectrum: "Branches → Roots — B5",
    connections: ["Panpsychism (B5)", "Philosophy of Mind (B2)", "David Chalmers", "Bernardo Kastrup"],
    color: "#f43f5e",
    spectrumPercent: 78,
    keyIdeas: [
      "Galileo's Error: the decision to exclude qualities from physics was productive for prediction but created the hard problem — consciousness was methodologically excluded, not explained away",
      "Panpsychism: consciousness is a fundamental feature of reality, not something that emerges from unconscious matter at a certain level of complexity",
      "The intrinsic nature argument: physics tells us what matter does (its relational/dispositional properties) but not what matter is — consciousness may be the intrinsic nature of physical reality",
      "The combination problem: how do micro-level experiential properties combine into the unified consciousness we experience? This is hard, but no harder than the hard problem itself",
      "Cosmopsychism: perhaps it is not small things (particles) that are conscious, but the cosmos as a whole — and individual minds are aspects of this cosmic consciousness"
    ],
    additionalQuotes: [
      "Panpsychism is crazy. But all the alternatives are crazier.",
      "We know more about consciousness than about anything else. The problem is explaining how it fits into the physical world as described by science.",
      "If Galileo's quantitative revolution was the birth of modern science, addressing what was left out may be its next great transformation."
    ],
    legacy: "Goff has made panpsychism respectable in mainstream analytic philosophy — a position that was considered fringe a decade ago. Galileo's Error became a bestseller and introduced the general public to the philosophical foundations of the consciousness debate. His podcast Mind Chat (co-hosted with illusionist Keith Frankish) models the kind of rigorous, good-faith disagreement that the consciousness field needs. He is a key figure in the growing 'post-materialist' movement in philosophy of mind, and his cosmopsychism has opened a new direction that converges with the idealism of Kastrup and the non-dualism of Advaita."
  },
  koch: {
    name: "Christof Koch",
    era: "1956– — Germany / USA",
    question: "What are the neural correlates of consciousness — and what do decades of searching for them reveal about the nature of consciousness itself?",
    contribution: "Koch spent decades as Francis Crick's closest collaborator on the neuroscience of consciousness — the empirical project of finding what brain states are jointly sufficient for conscious experience (the Neural Correlates of Consciousness, or NCC). Together they established the scientific study of consciousness as a legitimate field within neuroscience. His journey is as significant as his findings: beginning as a confident reductionist who believed consciousness would be fully explained by neural circuits, he gradually moved toward Integrated Information Theory (IIT) and scientific panpsychism as the only frameworks that could account for what neuroscience was actually finding. IIT's central claim — that consciousness is identical to integrated information (Φ) — implies that consciousness is widespread in nature, not limited to brains. A rigorous scientist who followed the evidence away from materialism.",
    quote: "Consciousness is the central fact of your life. You can doubt the existence of an external world, you can doubt other minds, you can doubt many things. But you cannot doubt your own consciousness.",
    works: [
      "The Feeling of Life Itself: Why Consciousness Is Widespread but Can't Be Computed (2019)",
      "Consciousness: Confessions of a Romantic Reductionist (2012)",
      "The Quest for Consciousness: A Neurobiological Approach (2004)"
    ],
    spectrum: "Branches — B1, B5",
    connections: ["Neuroscience (B1)", "Panpsychism (B5)", "Philosophy of Mind (B2)", "David Chalmers"],
    color: "#94a3b8",
    spectrumPercent: 88,
    keyIdeas: [
      "Neural Correlates of Consciousness (NCC): the minimal set of neuronal mechanisms jointly sufficient for any one conscious experience",
      "Integrated Information Theory (IIT): consciousness is identical to integrated information (Φ) — the more a system integrates information irreducibly, the more conscious it is",
      "The posterior hot zone: consciousness correlates most strongly with activity in posterior cortical areas, not the prefrontal cortex as previously assumed",
      "Consciousness is widespread: IIT implies that many systems beyond brains — potentially including simple organisms and even non-biological systems — have some degree of experience",
      "The honest limit of neuroscience: decades of searching for the NCC revealed that correlation is not explanation — knowing which neurons fire during experience does not explain why there is experience at all"
    ],
    additionalQuotes: [
      "I started out as a reductionist. After forty years of research, I no longer believe consciousness can be reduced to neural activity.",
      "The question is not whether consciousness exists — that is the one thing we know for certain. The question is what kind of physical system gives rise to it.",
      "Francis Crick and I set out to solve consciousness. We didn't solve it. But we showed it could be studied scientifically, and that changed everything."
    ],
    legacy: "Koch and Crick's collaboration (1990–2004) established consciousness as a legitimate object of neuroscientific study — before them, it was considered too subjective for serious science. Koch's subsequent championing of IIT has made it one of the two leading scientific theories of consciousness (alongside Global Workspace Theory). His intellectual honesty — publicly acknowledging that his own reductionist assumptions were wrong — gives his work extraordinary credibility. He served as President and Chief Scientist of the Allen Institute for Brain Science and remains one of the most respected neuroscientists alive."
  },
  chopra: {
    name: "Deepak Chopra",
    era: "1946– — India / USA",
    question: "How do consciousness, healing, and the nature of reality intersect — and how can these ideas reach people who need them most?",
    contribution: "Chopra is a bridge figure — the thinker who brought Vedantic and mind-body ideas to a mass audience that would not otherwise have encountered them. Trained as an endocrinologist, he synthesized Ayurvedic medicine, Vedantic philosophy, and quantum physics metaphors into a popular framework for understanding the mind-body connection. His academic critics are right that he sometimes overextends quantum language beyond its technical meaning; they are wrong to dismiss the underlying intuition, which is grounded in genuine Vedantic understanding. His more recent collaborations with physicist Menas Kafatos (You Are the Universe) represent a more rigorous engagement with the science. His contribution to this project is specifically as a gateway: millions of people first encountered the idea that consciousness might be fundamental through his work.",
    quote: "Consciousness is the ground of all being. The universe is not made of dead matter; it is made of living consciousness.",
    works: [
      "You Are the Universe — with Menas Kafatos (more rigorous scientific collaboration)",
      "Quantum Healing (with caveat: quantum language is partly metaphorical)",
      "Conversations with Kastrup and Hoffman (YouTube — the more rigorous side)"
    ],
    spectrum: "Bridge — R1 → B1 (accessible entry point)",
    connections: ["Advaita Vedanta (R1)", "Panpsychism (B5)", "Bernardo Kastrup", "Federico Faggin"],
    color: "#94a3b8",
    spectrumPercent: 50,
    keyIdeas: [
      "Consciousness is the ground of all being — the universe is fundamentally aware, not fundamentally material",
      "Mind-body unity: the division between mind and body is a conceptual abstraction, not a biological reality — thoughts directly influence physiology",
      "The participatory universe: the observer is not separate from the observed; consciousness actively shapes reality",
      "Ayurveda and Vedanta as complementary systems: one for healing the body, one for liberating the mind — both grounded in consciousness",
      "Gateway function: making the idea that consciousness is primary accessible to audiences who would never read Shankara or Kastrup directly"
    ],
    additionalQuotes: [
      "The physical world, including our bodies, is a response of the observer. We create our bodies as we create the experience of our world.",
      "Every cell in your body is eavesdropping on your thoughts.",
      "In the midst of movement and chaos, keep stillness inside of you."
    ],
    legacy: "Chopra has sold over 90 million books in 43 languages, making him the most commercially successful communicator of consciousness-related ideas in history. His Chopra Foundation funds research into meditation and mind-body medicine. While his relationship with scientific rigor is debated, his cultural impact is undeniable: he has introduced more people to the idea that consciousness might be fundamental than any other living figure. His role in this project is as an entry point — the accessible door that leads, for those who follow the thread, to the rigorous arguments of Kastrup, Hoffman, and Faggin."
  },
  metzinger: {
    name: "Thomas Metzinger",
    era: "1958– — Germany",
    question: "What is the self — and what happens when the brain's model of the self breaks down?",
    contribution: "Metzinger's phenomenal self-model (PSM) theory is one of the most rigorous accounts of selfhood in modern philosophy. The self is not an entity — it is a self-representing process, a model the brain generates of itself. The sense of being a unified, embodied subject is an internally generated representation, not a direct window onto an existing self. Because the model is 'transparent' — we cannot see the neural machinery generating it — we mistake the model for reality. When the PSM is destabilized — in meditation, out-of-body experiences, certain psychedelic states, some psychiatric conditions — the sense of being a separate self dissolves or distorts. His work is the most rigorous bridge between phenomenology and the neuroscience of self-experience. He arrives at a no-self conclusion through purely scientific means — without any traditional framework — and then explicitly acknowledges the convergence with Buddhist anatta.",
    quote: "No such things as selves exist in the world. Nobody ever was or had a self. All that ever existed were conscious self-models that nobody owned.",
    works: [
      "The Ego Tunnel: The Science of the Mind and the Myth of the Self",
      "Being No One: The Self-Model Theory of Subjectivity (the full technical theory)",
      "Mind & Life Institute talks and lectures (YouTube)"
    ],
    spectrum: "Bridge — R3, B3",
    connections: ["Phenomenology (R3)", "Cognitive Science (B3)", "Buddhist Thought (anatta)", "Christof Koch"],
    color: "#94a3b8",
    spectrumPercent: 60,
    keyIdeas: [
      "The Phenomenal Self-Model (PSM): the self is not an entity but a transparent representational process — the brain's model of itself",
      "Transparency: we cannot see the neural machinery generating the self-model, so we mistake the model for reality — like looking through a window we cannot see",
      "No-self through science: Metzinger arrives at the Buddhist anatta conclusion through neuroscience and phenomenology, without any traditional framework",
      "The Ego Tunnel: conscious experience is a tunnel — the brain constructs a virtual reality, places a self-model at the center, and we live inside this constructed simulation",
      "Minimal phenomenal experience (MPE): investigating the simplest possible conscious state — what remains when all content is stripped away — converges with contemplative accounts of pure awareness"
    ],
    additionalQuotes: [
      "The self is not a thing. It is a process — and the process can be seen through.",
      "What we call 'the self' is a very sophisticated simulation generated by the brain. But there is no user who uses the simulation.",
      "The loss of the sense of self in meditation is not pathological. It is the recognition of what was always the case — that there was never a self there in the first place."
    ],
    legacy: "Metzinger's Being No One is considered one of the landmark works in the philosophy of consciousness — a 700-page technical masterpiece that bridged Continental phenomenology with Anglo-American philosophy of mind. His PSM theory has become a standard reference point in consciousness studies, neuroscience, and the philosophy of personal identity. His explicit acknowledgment that his scientific no-self converges with Buddhist anatta has made him one of the most important bridge figures between Western cognitive science and Eastern contemplative traditions. He was a key participant in the Mind & Life Institute dialogues with the Dalai Lama."
  },
  sarvapriyananda: {
    name: "Swami Sarvapriyananda",
    era: "1969– — India / USA",
    question: "How can Vedanta be communicated with complete rigor and zero dilution to the modern mind?",
    contribution: "Spiritual head of the Vedanta Society of NY and leading modern communicator of Advaita in English, integrating neuroscience, analytic philosophy, and traditional Sanskrit texts.",
    quote: "The Witness is never the witnessed. Consciousness is never an object... It is the Subject of all subjects.",
    works: [
      "Mandukya Upanishad lecture series (YouTube)",
      "Drg-Drsya Viveka lectures (YouTube)",
      "Who Am I? lectures (YouTube)"
    ],
    spectrum: "Deep Roots, Bridge to modern — R1, R5",
    connections: ["Advaita Vedanta (R1)", "Direct Inquiry (R5)", "Adi Shankaracharya", "Ramana Maharshi"],
    color: "#e11d48",
    spectrumPercent: 18,
    keyIdeas: [
      "The deep sleep argument: awareness was present even when the mind was absent — proving awareness is prior to mind",
      "The three-states analysis (waking, dream, deep sleep) as the complete map of ordinary experience",
      "Drk-Drsya Viveka: strict separation of the Seer (Drk) from everything seen (Drsya)",
      "Mandukya Upanishad: OM as the symbol of all states, and Turiya as the substratum of all three",
      "Engaging neuroscience and analytic philosophy without compromising the Vedantic conclusion"
    ],
    additionalQuotes: [
      "Consciousness is the only thing in the universe that cannot be objectified, because it is the very light by which objects are known.",
      "The body-mind is in you; you are not in the body-mind. You are the infinite space of awareness in which the body-mind appears.",
      "Vedanta does not tell you to change your life; it tells you to notice what is already true of you."
    ],
    legacy: "Sarvapriyananda has made Advaita Vedanta genuinely accessible to English-speaking audiences without the dilution common in Western presentations. His YouTube series at the Vedanta Society of New York — freely available — constitute the most rigorous, accessible English-language treatment of classical Vedantic epistemology. He has directly engaged Chalmers' hard problem and Metzinger's PSM theory, showing their convergence with Shankara's conclusions."
  },
  spira: {
    name: "Rupert Spira",
    era: "1960– — UK",
    question: "What is the nature of experience itself — and what does careful attention to experience reveal about what we ultimately are?",
    contribution: "Spira articulates the non-dual understanding with unusual philosophical clarity and felt immediacy. His inquiry method — 'being aware of being aware' — is a direct, accessible pointer that does not require any traditional background. His primary argument: we already know that we are aware; the question is only whether that awareness is a property of the body-mind or its ground. Careful attention reveals that awareness is not located in the body — rather, the body, like all experience, appears within awareness. His books and retreats build this case patiently, without assumption. His work bridges the direct transmission of Nisargadatta (through Francis Lucille) with the philosophical clarity the Western mind needs. He has become one of the most influential living teachers of non-duality.",
    quote: "You are not inside the body. The body is inside you — inside awareness. Awareness is not a product of experience. Experience is a movement within awareness.",
    works: [
      "The Nature of Consciousness: Essays on the Unity of Mind and Matter",
      "Being Aware of Being Aware — direct and brief",
      "Presence: The Art of Peace and Happiness (Volumes I & II)"
    ],
    spectrum: "Roots, Bridge to contemporary — R5",
    connections: ["Direct Inquiry (R5)", "Advaita Vedanta (R1)", "Nisargadatta Maharaj", "Francis Lucille"],
    color: "#0284c7",
    spectrumPercent: 22,
    keyIdeas: [
      "'Being aware of being aware': the most direct pointer — you already know you are aware; rest as that knowing, not as any object known",
      "Awareness is not in the body; the body is in awareness — this reversal is the heart of the non-dual recognition",
      "Experience is a single field: the apparent boundary between 'inside' and 'outside', between self and world, is a concept superimposed on seamless experience",
      "The screen metaphor: awareness is like a screen on which the movie of experience plays — the screen is never modified by the images that appear on it",
      "Peace and happiness are not states to achieve but the nature of awareness itself — when the mind's agitation settles, what remains is innate peace"
    ],
    additionalQuotes: [
      "We do not need to stop thinking in order to be aware. Awareness is always present, regardless of the content of experience.",
      "The search for happiness is the very thing that prevents us from finding it — because it implies that happiness is somewhere other than here.",
      "The separate self is not an entity. It is an activity — the activity of resisting what is.",
      "What we essentially are is not something we need to become. It is something we need to notice."
    ],
    legacy: "Spira has become one of the most widely recognized living teachers of non-duality in the English-speaking world. His YouTube channel has over 500,000 subscribers, and his retreats draw seekers from across the globe. His phrase 'being aware of being aware' has become a widely used contemplative pointer. His lineage runs through Francis Lucille → Jean Klein → Atmananda Krishna Menon — one of the most philosophically rigorous lines of non-dual transmission. His contribution is unique: combining the directness of Nisargadatta's pointing with the philosophical precision and warmth that Western seekers need to hear the teaching without traditional prerequisites."
  },
  lucille: {
    name: "Francis Lucille",
    era: "1944– — France / USA",
    question: "What is the direct recognition of our true nature — and how does that recognition dissolve the felt sense of separation?",
    contribution: "Lucille is Rupert Spira's teacher, and the lineage connection runs through Jean Klein to Atmananda Krishna Menon — one of the most philosophically rigorous lines of non-dual transmission in the modern world. His approach is Socratic and precise: he does not give answers so much as help the questioner see what they are already assuming and what remains when that assumption is released. His inquiries dissolve the sense of being a separate entity by directing attention to the knowing presence that is always already here. His teaching style is deeply mathematical and logical — he was trained as a scientist — while remaining profoundly intimate. His work is less widely known than Spira's but represents the philosophical root of that lineage.",
    quote: "You are not the one who has experiences. You are the experiencing itself. Not a subject among objects, but the knowing presence in which all objects and subjects appear.",
    works: [
      "Eternity Now — direct pointers and dialogues",
      "Truth Love Beauty — essays on the nature of consciousness",
      "The Perfume of Silence — dialogues from retreats"
    ],
    spectrum: "Deep Roots — R5",
    connections: ["Direct Inquiry (R5)", "Rupert Spira", "Nisargadatta Maharaj", "Jean Klein"],
    color: "#0284c7",
    spectrumPercent: 12,
    keyIdeas: [
      "The knowing presence: you are not a subject who has experiences — you are the experiencing itself, the knowing presence in which all subjects and objects appear",
      "Socratic dissolution: rather than giving answers, Lucille helps questioners see the assumptions hidden in their questions — when the assumption drops, the answer is revealed",
      "The separate self is a thought, not an experience: when attention is directed to what is actually present, no separate entity can be found — only seamless knowing",
      "Beauty as a doorway: aesthetic experience — art, music, nature — momentarily dissolves the sense of separation, giving a taste of our true nature",
      "The scientific temperament: Lucille brings a scientist's precision to the inquiry — every claim is tested against direct experience, never accepted on authority"
    ],
    additionalQuotes: [
      "There is only one reality. And it is that which is aware of these words right now.",
      "The question 'Who am I?' is not answered by a concept. It is answered by the dissolution of the questioner.",
      "Happiness is not a state of mind. It is the absence of the sense of being a separate self.",
      "What you are looking for is what is looking."
    ],
    legacy: "Lucille represents the quieter, deeper root of the modern non-dual movement in the West. While less publicly visible than his student Spira, he is revered by teachers and practitioners as one of the most precise and uncompromising living voices of the Direct Path. His lineage — Atmananda Krishna Menon → Jean Klein → Francis Lucille → Rupert Spira — is considered the most philosophically rigorous chain of non-dual transmission in the modern era. His influence extends through hundreds of students who have integrated his teaching into their own lives and, in some cases, become teachers themselves. His work ensures that the transmission from Atmananda's Kerala to the contemporary West remains unbroken."
  },
  kanojia: {
    name: "Dr. Alok Kanojia (HealthyGamer)",
    era: "1985– — India / USA",
    question: "How can psychiatry, neuroscience, and contemplative practices be integrated to heal modern mental health crises?",
    contribution: "Psychiatrist and founder of HealthyGamer. Integrates neuroscience, modern psychiatry, and contemplative psychology into actionable clinical tools to treat digital addiction and identity crisis.",
    quote: "The mind is not broken — it is a tool we were never taught to use.",
    works: [
      "HealthyGamer YouTube — Neuroscience & addiction series",
      "Guide to Mental Health"
    ],
    spectrum: "Bridge — B1 (Neuroscience) → practical mental health",
    connections: ["Neuroscience (B1)", "Yoga Practices (F2)", "Swami Vivekananda"],
    color: "#94a3b8",
    spectrumPercent: 58,
    keyIdeas: [
      "The ancient Vedantic model of the ego is the most precise map of modern identity dysfunction",
      "Digital addiction is a symptom of a deeper spiritual hunger — the search for meaning and the Witness",
      "Psychiatric frameworks alone are insufficient; Vedantic psychology fills the gap",
      "The mind is not broken; it is a tool with no instruction manual — Vedanta is the manual",
      "Modern suffering (burnout, addiction, meaninglessness) is rooted in mistaken self-identification"
    ],
    legacy: "Kanojia has built the most direct bridge between modern neuroscience, psychiatry, and contemplative practices in the digital age. HealthyGamer has reached over four million subscribers, with content that integrates neuroscience and clinical psychiatry with traditional mindfulness and self-inquiry, bringing healing to those who need it most.",
    additionalQuotes: [
      "The modern ego is constantly seeking validation from the external world because it has lost touch with the internal witness.",
      "Mindfulness is not a spiritual luxury; it is a clinical necessity for navigating a hyper-connected, dopamine-depleted world.",
      "We are trained to manage our thoughts, but we are never taught how to stand back and watch them as the witness."
    ]
  },

  // ===================== NEW THINKERS =====================

  krishna: {
    name: "Krishna",
    era: "c. 3000 BCE (mythological) — India",
    question: "How can one act fully and skillfully in the world while remaining inwardly untouched by the fruits of action?",
    contribution: "The divine teacher of the Bhagavad Gita. On the battlefield of Kurukshetra, Krishna reveals to Arjuna the eternal nature of the Self (Atman), the three primary paths of liberation — Karma Yoga (selfless action), Jnana Yoga (knowledge), and Bhakti Yoga (devotion) — and the ultimate non-dual truth: all of existence is a manifestation of one divine reality. His teaching is simultaneously a philosophy of consciousness, a psychology of liberation, and a practical ethics of engaged presence.",
    quote: "You have a right to perform your prescribed duty, but never claim ownership of the fruits of action. Never let the fruits of action be your motivation, and never cease to act.",
    works: [
      "Bhagavad Gita (as narrated through Vyasa to Arjuna)",
      "Uddhava Gita — Book 11 of the Bhagavata Purana",
      "Anu Gita (Ashvamedha Parva of the Mahabharata)"
    ],
    spectrum: "Deep Roots — Divine Synthesis (R1, R5, F1)",
    connections: ["Advaita Vedanta (R1)", "Yoga Practices (F2)", "Patanjali", "Swami Vivekananda"],
    color: "#f59e0b",
    spectrumPercent: 2,
    keyIdeas: [
      "The Atman is eternal, indestructible, and beyond all change — it is never born and never dies",
      "Karma Yoga: act without attachment to outcomes; offer all action as an offering to the divine",
      "Samatvam (equanimity): yoga is not a state to achieve but a way of relating to all experience equally",
      "All paths — karma, jnana, bhakti — converge at the same realization of the divine Self",
      "The divine is simultaneously the innermost witness (Atman) and the totality of existence (Brahman)"
    ],
    legacy: "The Bhagavad Gita is among the most widely studied spiritual texts in human history. It has been commented upon by Shankaracharya, Ramanuja, Madhvacharya, Ramana Maharshi, Swami Vivekananda, and virtually every significant Vedantic teacher. Revered by Thoreau, Emerson, Einstein ('the most beautiful philosophical song existing in any known tongue'), and Oppenheimer (who quoted it at the first atomic test). The Gita remains the primary bridge between the absolute of Advaita and the ethics of engaged action.",
    additionalQuotes: [
      "The Self is not born, nor does It ever die. It is unborn, eternal, ever-existing, and primeval. It is not slain when the body is slain.",
      "As a person puts on new garments, giving up old ones, the soul similarly accepts new material bodies, giving up the old and useless ones.",
      "Equanimity of mind is called Yoga."
    ]
  },

  jesus: {
    name: "Jesus of Nazareth",
    era: "c. 4 BCE – 30 CE — Galilee, Palestine",
    question: "What is the Kingdom of Heaven within — and what does the unity 'I and the Father are one' reveal about the nature of self and its divine source?",
    contribution: "Jesus taught that the Kingdom of Heaven is not a future destination but a present interior reality ('The Kingdom of Heaven is within you,' Luke 17:21). His most radical sayings point to a non-dual unity between the individual soul and its divine source: 'I and the Father are one' (John 10:30), 'Before Abraham was, I Am' (John 8:58). The Sermon on the Mount presents a radical ethics of inner transformation. Contemporary mystical scholars — from Meister Eckhart to Thomas Merton to Ramakrishna Paramahamsa — recognize in his teaching profound convergences with Advaita Vedanta and Buddhist non-duality.",
    quote: "The Kingdom of Heaven is within you. I and the Father are one. Before Abraham was, I Am.",
    works: [
      "Gospel of John (the I Am sayings and the mystical teaching in depth)",
      "Gospel of Thomas — 114 direct sayings without narrative (Nag Hammadi, 1945)",
      "The Sermon on the Mount — Matthew 5–7 (the ethics of the inner kingdom)"
    ],
    spectrum: "Deep Roots — Universal Mystical Source",
    connections: ["Advaita Vedanta (R1)", "Esoteric Realities (R4)", "Ramakrishna Paramahamsa", "Direct Inquiry (R5)"],
    color: "#a78bfa",
    spectrumPercent: 5,
    keyIdeas: [
      "'The Kingdom of Heaven is within you' — liberation is not spatial or temporal, but the present depth of being",
      "'I and the Father are one' — non-dual unity: the finite self and the infinite ground are not two",
      "'Before Abraham was, I Am' — identification with pure being (Sat / Existence) prior to all history and form",
      "Agape (unconditional love) as the direct lived expression of divine nature — not sentiment, but ontology",
      "Inner transformation precedes outer: 'Be ye perfect, as your Father in heaven is perfect'"
    ],
    additionalQuotes: [
      "The Kingdom of Heaven is within you.",
      "The Father and I are one.",
      "What you do to the least of these, you do to me.",
      "Ask and it shall be given; seek and you shall find; knock and the door shall be opened."
    ],
    legacy: "Two billion adherents make the teachings of Jesus the most widely followed in recorded history. Beyond religion, his mystical statements have been the subject of sustained philosophical analysis: Meister Eckhart read 'I and the Father are one' as pure non-dual Advaita; Thomas Merton saw the contemplative tradition of Christianity as parallel to Zen. Ramakrishna Paramahamsa achieved samadhi through Christian devotion and saw Jesus as a manifestation of the same divine reality he accessed through Vedanta — testifying to the universality of the path."
  },

  papaji: {
    name: "H.W.L. Poonja (Papaji)",
    era: "1910–1997 — India",
    question: "Who is the one seeking liberation — and what remains when the seeker itself is seen through?",
    contribution: "Direct disciple of Ramana Maharshi and one of the most potent transmission points in the modern Self-Inquiry lineage. Papaji taught that liberation is not a future achievement but the ever-present nature of awareness itself — not a state to enter, but what remains when seeking ceases. His primary instruction — 'Keep Quiet' — is not a suppression of thought but a pointer to the natural stillness that precedes and contains thought. He catalyzed a wave of Western teachers and seekers in the 1980s–1990s in his satsangs in Lucknow.",
    quote: "There is no one who needs to be liberated. There is only the idea that there is someone in bondage. When this idea is seen through, what remains is freedom itself.",
    works: [
      "Nothing Ever Happened — David Godman (the definitive 3-volume biography and teaching record)",
      "Wake Up and Roar (Volumes I & II — satsang dialogues)",
      "The Truth Is (compiled teachings)"
    ],
    spectrum: "Deep Roots — R3 (Direct Inquiry)",
    connections: ["Direct Inquiry (R5)", "Ramana Maharshi (teacher)", "Rupert Spira", "Advaita Vedanta (R1)"],
    color: "#0284c7",
    spectrumPercent: 8,
    keyIdeas: [
      "'Keep Quiet' — not suppression of thought, but the recognition of the stillness prior to all thought",
      "Liberation is always already the case — it cannot be achieved because it was never lost",
      "The seeker must dissolve: the one who seeks liberation IS the very problem",
      "Satsang (meeting in truth) as the primary vehicle of transmission",
      "Ramana's Atma Vichara transmitted to Western seekers without religious prerequisites"
    ],
    legacy: "Papaji's satsangs in Lucknow in the 1980s–1990s were the epicenter of a global wave of non-dual awakening. His direct students went on to become influential teachers worldwide — including Gangaji, Isaac Shapiro, and Andrew Cohen — spreading the Ramana–Papaji lineage across Europe, the Americas, and Australia. He is credited with making the direct path of Advaita accessible to Western seekers completely without religious prerequisites or cultural barriers.",
    additionalQuotes: [
      "Do not search for truth. Just stop. Stop all looking, all thinking, all efforts, and see what is already here.",
      "Freedom is not something that you will get in the future. You are free right now. Just remove the thought that says you are bound.",
      "Your true nature is like space — nothing can touch it, stain it, or destroy it."
    ]
  },

  aurobindo: {
    name: "Sri Aurobindo",
    era: "1872–1950 — India / International",
    question: "If consciousness is the ground of reality, can matter itself be transformed into a transparent vehicle of that consciousness — and is this the purpose of cosmic evolution?",
    contribution: "Developed Integral Yoga — a synthesis of Vedantic, tantric, and evolutionary thought that stands uniquely apart from traditional non-dual paths. Where Advaita teaches transcendence (the world is mithya — appearance), Aurobindo taught world-transformation: consciousness is actively evolving through matter toward the Supramental — a level of being beyond ordinary mind in which the divine is not merely recognized but fully expressed in material existence. His literary masterpiece Savitri (24,000 lines) embodies this vision in poetry.",
    quote: "Man is a transitional being. He is not final. The step from man to Superman is the next approaching achievement in the earth's evolution.",
    works: [
      "The Life Divine — his magnum opus: a complete philosophy of consciousness and evolution",
      "Synthesis of Yoga — comprehensive guide to integral practice",
      "Savitri — 24,000-line epic poem: 'a symbol of the universe and its history'"
    ],
    spectrum: "Roots, Bridge to evolutionary thought — R1, R4",
    connections: ["Advaita Vedanta (R1)", "Esoteric Realities (R4)", "Swami Vivekananda", "Ramana Maharshi"],
    color: "#10b981",
    spectrumPercent: 35,
    keyIdeas: [
      "Evolution is the progressive self-manifestation of Spirit through increasingly complex forms of matter",
      "The Supramental: a new level of consciousness beyond mind — the next step in terrestrial evolution",
      "Integral Yoga: not transcendence of the world but transformation of it — spirit made material",
      "The Mother (Shakti): the creative, executive power of consciousness in material evolution",
      "Vedanta and tantra are not opposed but complementary — consciousness and energy are one reality"
    ],
    legacy: "Sri Aurobindo's vision is one of the most ambitious integrations of spirituality and evolutionary biology in modern thought. The community of Auroville in Tamil Nadu (founded 1968) continues to embody his vision of a unified human community. His influence extends to integral theory (Ken Wilber's entire model is built on Aurobindo's maps), evolutionary spirituality, and the contemporary dialogue between consciousness science and contemplative practice.",
    additionalQuotes: [
      "The whole of life is a Yoga. Evolution is the self-manifestation of the divine through matter.",
      "Mind is not the summit of consciousness. It is a narrow, analytical tool that must be transcended to reach the Supramental truth.",
      "The spirit without matter is a ghost; matter without spirit is a corpse. The goal of Integral Yoga is their divine marriage."
    ]
  },

  williamjames: {
    name: "William James",
    era: "1842–1910 — USA",
    question: "Are mystical states merely subjective distortions — or genuine noetic experiences that reveal something true about the structure of consciousness?",
    contribution: "Father of American psychology and founder of philosophical pragmatism. His Varieties of Religious Experience (1902) was the first systematic, empirically grounded study of mystical and religious experience. He established four defining marks for mystical states — ineffability, noetic quality, transiency, and passivity — and argued from clinical and historical evidence that they represent a genuine form of knowledge, not mere emotion. His concept of the 'stream of consciousness' influenced both psychology and philosophy of mind for a century. His radical empiricism positioned relations between things as equally real to the things themselves, anticipating process philosophy.",
    quote: "The greatest revolution of our generation is the discovery that human beings, by changing the inner attitudes of their minds, can change the outer aspects of their lives.",
    works: [
      "The Varieties of Religious Experience (1902) — the foundational text of the psychology of religion",
      "The Principles of Psychology (1890) — definitive work; coined 'stream of consciousness'",
      "Essays in Radical Empiricism — his mature philosophical position"
    ],
    spectrum: "Bridge — Empirical Psychology of Mysticism (R4, B3)",
    connections: ["Esoteric Realities (R4)", "Phenomenology (R3)", "Cognitive Science (B3)", "Direct Inquiry (R5)"],
    color: "#34d399",
    spectrumPercent: 55,
    keyIdeas: [
      "Four marks of mystical experience: ineffability, noetic quality (direct knowledge), transiency, passivity",
      "'Stream of consciousness' — experience is a continuous, flowing river, not discrete units",
      "Pragmatism: truth is not a fixed property but a value assigned by what works in lived experience",
      "Radical empiricism: the relations between things are as real as the things themselves",
      "Mystical experience is a genuine source of knowledge about reality — irreducible to emotion or pathology"
    ],
    additionalQuotes: [
      "Act as if what you do makes a difference. It does.",
      "The greatest use of a life is to spend it on something that will outlast it.",
      "The art of being wise is the art of knowing what to overlook."
    ],
    legacy: "The Varieties of Religious Experience remains the foundational academic text for the psychology of religion and empirical consciousness studies. James established the legitimacy of studying consciousness from the first-person perspective — prefiguring both phenomenology and contemporary consciousness science. His influence is visible in Thomas Metzinger's phenomenological method, Stanislav Grof's studies of non-ordinary states, William Tart's transpersonal psychology, and the entire tradition of contemplative neuroscience. He was the bridge-builder who made mystical experience academically discussable."
  },
  laotzu: {
    name: "Lao Tzu",
    era: "c. 6th century BCE — China",
    question: "How can one live in effortless alignment with the flow of the universe (Tao) before the thinking mind creates division?",
    contribution: "Authored the Tao Te Ching, establishing Taoism. Taught that the Tao (the Way) is the source and substance of all things, ineffable and nameless. Introduced Wu Wei (effortless action) and the deconstruction of the conceptual self in favor of natural harmony.",
    quote: "The Tao that can be spoken of is not the eternal Tao. The name that can be named is not the eternal name.",
    works: [
      "Tao Te Ching (transl. Stephen Mitchell)",
      "Tao: The Watercourse Way (Alan Watts)",
      "The Way of Chuang Tzu (Thomas Merton)"
    ],
    spectrum: "Deep Roots — Taoist Non-Dualism (R2, R3)",
    connections: ["Buddhist Thought (R2)", "Direct Inquiry (R5)", "Alan Watts", "Gautama Buddha"],
    color: "#a3e635",
    spectrumPercent: 6,
    keyIdeas: [
      "Tao: the nameless, formless source and flow of all existence",
      "Wu Wei: effortless, unattached action aligned with the natural order",
      "Yin and Yang: the dynamic harmony of opposing but complementary forces",
      "The uncarved block (Pu): returning to the simple, pre-conceptual state of being",
      "Humility and softness: water as the ultimate symbol of strength through yielding"
    ],
    additionalQuotes: [
      "Knowing others is intelligence; knowing yourself is true wisdom. Mastering others is strength; mastering yourself is true power.",
      "To the mind that is still, the whole universe surrenders.",
      "A journey of a thousand miles begins with a single step."
    ],
    legacy: "Lao Tzu's Tao Te Ching is one of the most translated texts in world history. His philosophy of effortless action (wu wei) and yielding strength profoundly shaped Chinese culture, Zen Buddhism (which arose from the merger of Buddhism and Taoism), and modern environmentalism/deep ecology. His deconstruction of the social, conceptual ego serves as an ancient counterpart to modern enactivism and phenomenological reduction."
  },
  krishnamurti: {
    name: "Jiddu Krishnamurti",
    era: "1895–1986 — India / International",
    question: "Can the human mind empty itself of all memory, conditioning, and authority to discover the unconditioned?",
    contribution: "Maintained that truth is a pathless land. Rejected all gurus, belief systems, and psychological authority. Highlighted that the observer is the observed, and that psychological time is the source of all human conflict.",
    quote: "The observer is the observed. Truth is a pathless land, and you cannot approach it by any path whatsoever.",
    works: [
      "The First and Last Freedom",
      "Freedom from the Known",
      "The Awakening of Intelligence"
    ],
    spectrum: "Deep Roots — Pathless Direct Inquiry (R5, R3)",
    connections: ["Direct Inquiry (R5)", "David Bohm", "Ramana Maharshi", "Cognitive Science (B3)"],
    color: "#0284c7",
    spectrumPercent: 14,
    keyIdeas: [
      "The observer is the observed: the thinker is not separate from the thought; division is the root of conflict",
      "Truth is a pathless land: no system, religion, or technique can lead to ultimate reality",
      "Freedom from the known: true intelligence arises only when the mind is empty of past conditioning and memories",
      "Psychological time: the projection of past into future creates the false search for a future self-attainment",
      "Choiceless awareness: observing the movement of the mind without judgment, choice, or control"
    ],
    additionalQuotes: [
      "It is no measure of health to be well adjusted to a profoundly sick society.",
      "The ability to observe without evaluating is the highest form of intelligence.",
      "One is never afraid of the unknown; one is afraid of the known coming to an end."
    ],
    legacy: "Krishnamurti's rejection of spiritual authority and emphasis on direct, unconditioned investigation influenced millions worldwide. He conducted decades of deep dialogues with physicists (David Bohm), psychologists (Rollo May), and neuroscientists, positioning contemplative inquiry as a rigorous, scientific examination of the human mind. His school in Rishi Valley, India, and Ojai, California, continue his educational legacy of holistic, unconditioned learning."
  },
  watts: {
    name: "Alan Watts",
    era: "1915–1973 — UK / USA",
    question: "What if the feeling of being a separate ego 'shrink-wrapped' in a bag of skin is a cultural hallucination?",
    contribution: "Interpreted Zen Buddhism, Taoism, and Vedanta for the West. Popularized the idea that the individual is not an isolated stranger in the universe, but an expression of the entire cosmic energy patterns.",
    quote: "You are an aperture through which the universe is looking at and exploring itself.",
    works: [
      "The Book: On the Taboo Against Knowing Who You Are",
      "The Wisdom of Insecurity",
      "The Way of Zen"
    ],
    spectrum: "Roots to Bridge Integration — R1, R5",
    connections: ["Advaita Vedanta (R1)", "Direct Inquiry (R5)", "Lao Tzu", "Jiddu Krishnamurti"],
    color: "#0284c7",
    spectrumPercent: 30,
    keyIdeas: [
      "The skin-encapsulated ego is an illusion: we do not 'come into' this world; we 'come out' of it, like leaves from a tree",
      "The wisdom of insecurity: trying to find security in a constantly changing world is impossible; sanity is floating in the flow",
      "The game of black and white: existence is a play of opposites that define each other; there is no light without dark",
      "Reality is play, not work: the universe is a musical and artistic phenomenon, existing for its own expression in the present moment",
      "Western science and Eastern non-duality convergence: the relational nature of modern physics matches the non-dual view"
    ],
    additionalQuotes: [
      "Trying to define yourself is like trying to bite your own teeth.",
      "Muddy water is best cleared by leaving it alone.",
      "Man suffers only because he takes seriously what the gods made for fun."
    ],
    legacy: "Alan Watts remains the most eloquent and popular Western interpreter of Eastern non-dual philosophy. His books and recorded audio lectures have attained legendary status, introducing millions in the West to Zen, Taoism, and Advaita Vedanta. He bridged the gap between analytical scholarship and experiential insight, influencing the Beat generation, the counterculture of the 1960s, and contemporary transpersonal psychology."
  },
  bohm: {
    name: "David Bohm",
    era: "1917–1992 — USA / UK",
    question: "Does quantum physics reveal an undivided, flowing wholeness in which matter and consciousness are folded into each other?",
    contribution: "Proposed the Implicate and Explicate Order. Argued that space-time and physical particles are a surface appearance (explicate order) emerging from an underlying, undivided wholeness (implicate order). Conducted historic dialogues with J. Krishnamurti exploring the nature of thought as a material process.",
    quote: "Reality is an undivided wholeness, and all parts, including the observer and the observed, merge and coalesce in a single flow.",
    works: [
      "Wholeness and the Implicate Order",
      "The Ending of Time (dialogues with J. Krishnamurti)",
      "On Dialogue"
    ],
    spectrum: "Deep Branches — Quantum Metaphysics (B4, B5)",
    connections: ["Quantum Mind (B4)", "Panpsychism (B5)", "Jiddu Krishnamurti", "Donald Hoffman"],
    color: "#ec407a",
    spectrumPercent: 75,
    keyIdeas: [
      "The Implicate Order: the underlying, undivided reality where everything is folded (enfolded) into everything else",
      "The Explicate Order: the manifest, unfolded world of separate physical objects and space-time",
      "Holomovement: reality is not static but a dynamic, flowing movement of enfolding and unfolding",
      "Thought as a material system: thought is a physical process in the brain and body, not a separate spiritual entity",
      "Dialogue: a process of collective awareness where individuals observe their own reactions and thoughts together without agenda"
    ],
    additionalQuotes: [
      "Deep down, the consciousness of mankind is one. This is a virtual certainty because the brain in its evolutionary origin is one.",
      "The ability to perceive or think differently is more important than the knowledge gained.",
      "Thought is constantly creating problems that it then tries to solve."
    ],
    legacy: "David Bohm was one of the most original theoretical physicists of the 20th century, making fundamental contributions to quantum theory. His work on the Aharonov-Bohm effect and the causal interpretation of quantum mechanics remains highly influential. His bridge-building dialogues with J. Krishnamurti represent one of the most rigorous historical intersections between a theoretical physicist and a spiritual investigator, exploring whether the physical brain can transcend its evolutionary programming."
  }
};
