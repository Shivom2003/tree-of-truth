// lib/questions.ts
// A pool of 24 highly curated questions mapping user responses to their philosophical alignment.

export interface QuestionnaireOption {
  text: string;
  orientation: "seeker" | "scientific" | "contemplative" | "practical";
}

export interface Question {
  id: string;
  text: string;
  options: QuestionnaireOption[];
}

export const QUESTIONS_POOL: Question[] = [
  {
    id: "q1",
    text: "When you consider the nature of your own self, what is your primary starting point?",
    options: [
      { text: "A changeless witness that observes thoughts but is untouched by them.", orientation: "seeker" },
      { text: "An emergent property of complex neural networks and brain processing.", orientation: "scientific" },
      { text: "A silent space of open awareness that expands through quiet presence.", orientation: "contemplative" },
      { text: "A personal identity that grows through concrete habits and self-reflection.", orientation: "practical" }
    ]
  },
  {
    id: "q2",
    text: "How do you prefer to approach reality's deepest questions?",
    options: [
      { text: "Through neti-neti negation: stripping away all mental and physical concepts.", orientation: "seeker" },
      { text: "Through systematic reasoning, physical evidence, and cognitive models.", orientation: "scientific" },
      { text: "Through silent meditation and direct phenomenal absorption.", orientation: "contemplative" },
      { text: "Through structured journaling and actionable daily exercises.", orientation: "practical" }
    ]
  },
  {
    id: "q3",
    text: "How do you perceive the concept of time?",
    options: [
      { text: "An illusion occurring entirely within the eternal Now of awareness.", orientation: "seeker" },
      { text: "A dimension of spacetime studied by physics and perceived by the brain.", orientation: "scientific" },
      { text: "A flow that slows down or dissolves during deep, focused presence.", orientation: "contemplative" },
      { text: "A valuable framework to be organized using routines and reading tracks.", orientation: "practical" }
    ]
  },
  {
    id: "q4",
    text: "What do you find to be the primary obstacle to peace of mind?",
    options: [
      { text: "Identifying with the ego and believing I am the body or the mind.", orientation: "seeker" },
      { text: "Cognitive distortions, neural overactivity, or evolutionary survival anxiety.", orientation: "scientific" },
      { text: "Restlessness of the mind and attachment to passing sensations.", orientation: "contemplative" },
      { text: "Lack of clean daily habits, structured routines, and proper guidance.", orientation: "practical" }
    ]
  },
  {
    id: "q5",
    text: "When you sit in quiet contemplation or meditate, what is your primary goal?",
    options: [
      { text: "To locate the observer itself—the one who is witnessing the silence.", orientation: "seeker" },
      { text: "To observe neurobiological shifts and calm the Default Mode Network.", orientation: "scientific" },
      { text: "To cultivate deep mindfulness, presence, and calm absorption.", orientation: "contemplative" },
      { text: "To reduce stress, gain mental clarity, and journal my insights.", orientation: "practical" }
    ]
  },
  {
    id: "q6",
    text: "How do you view the origin and nature of your thoughts?",
    options: [
      { text: "Spontaneous arisings in consciousness that have no power over the real Self.", orientation: "seeker" },
      { text: "Electrochemical signaling in the brain's cerebral cortex.", orientation: "scientific" },
      { text: "Passing clouds in the open, spacious sky of the mind.", orientation: "contemplative" },
      { text: "Prompts for actions, decisions, and creative journaling.", orientation: "practical" }
    ]
  },
  {
    id: "q7",
    text: "What is the physical universe, ultimately?",
    options: [
      { text: "A dreamlike appearance occurring within the one infinite Consciousness.", orientation: "seeker" },
      { text: "A physical system of matter and energy, or a representation of cosmic mind.", orientation: "scientific" },
      { text: "An interconnected web of phenomena experienced in the present moment.", orientation: "contemplative" },
      { text: "A field of experience to be navigated using practical wisdom and books.", orientation: "practical" }
    ]
  },
  {
    id: "q8",
    text: "How do you react to intense emotional turmoil?",
    options: [
      { text: "By asking: 'Who is the one suffering?' and resting as the witness.", orientation: "seeker" },
      { text: "By analyzing the cognitive root cause and down-regulating the amygdala.", orientation: "scientific" },
      { text: "By breathing, observing bodily sensations, and letting them pass.", orientation: "contemplative" },
      { text: "By writing down my thoughts in a journal and applying practical coping steps.", orientation: "practical" }
    ]
  },
  {
    id: "q9",
    text: "What represents 'ultimate truth' to you?",
    options: [
      { text: "Direct, non-dual realization that cannot be expressed in words.", orientation: "seeker" },
      { text: "A mathematically consistent model that matches empirical observations.", orientation: "scientific" },
      { text: "The silent space of direct experience prior to conceptual thought.", orientation: "contemplative" },
      { text: "Principles that successfully guide daily life and spiritual practices.", orientation: "practical" }
    ]
  },
  {
    id: "q10",
    text: "What is the role of the brain in consciousness?",
    options: [
      { text: "A transceiver that filters or localizes boundless, pre-existing awareness.", orientation: "seeker" },
      { text: "The biological generator of all conscious experience and qualia.", orientation: "scientific" },
      { text: "An instrument that quietens to allow pure presence to shine.", orientation: "contemplative" },
      { text: "An organ that needs proper sleep, exercise, and reading to function optimally.", orientation: "practical" }
    ]
  },
  {
    id: "q11",
    text: "When reading spiritual or philosophical texts, you look for:",
    options: [
      { text: "Pointers that immediately direct my attention back to my true nature.", orientation: "seeker" },
      { text: "Rigorous theories, arguments, and scientific references.", orientation: "scientific" },
      { text: "Verses that invite me into a deep state of quiet contemplation.", orientation: "contemplative" },
      { text: "Clear instructions, reading paths, and actionable techniques.", orientation: "practical" }
    ]
  },
  {
    id: "q12",
    text: "If you could solve one big mystery, what would it be?",
    options: [
      { text: "The nature of the ultimate subject: what is the 'I' behind the eyes?", orientation: "seeker" },
      { text: "The Hard Problem of consciousness: how brain tissue creates feelings.", orientation: "scientific" },
      { text: "How to stay continuously anchored in the present moment.", orientation: "contemplative" },
      { text: "How to perfectly integrate spiritual realization with modern daily life.", orientation: "practical" }
    ]
  },
  {
    id: "q13",
    text: "How do you view your physical body?",
    options: [
      { text: "An object perceived in consciousness, not my true identity.", orientation: "seeker" },
      { text: "A complex homeostatic machine evolved for gene replication.", orientation: "scientific" },
      { text: "A vehicle of sensory experience and an anchor for mindfulness.", orientation: "contemplative" },
      { text: "A system requiring yoga, physical alignment, and healthy habits.", orientation: "practical" }
    ]
  },
  {
    id: "q14",
    text: "What is your primary tool for spiritual growth?",
    options: [
      { text: "Self-Inquiry (Atma-Vichara): asking 'Who am I?' incessantly.", orientation: "seeker" },
      { text: "Critically studying neuroscience, idealism, and cognitive science.", orientation: "scientific" },
      { text: "Vipassana, Zen meditation, or non-judgmental presence.", orientation: "contemplative" },
      { text: "Yoga practices, structured journaling, and reading lists.", orientation: "practical" }
    ]
  },
  {
    id: "q15",
    text: "The concept of the 'ego' is best understood as:",
    options: [
      { text: "A false identification that disappears when closely investigated.", orientation: "seeker" },
      { text: "An evolutionary survival mechanism for social coordination and protection.", orientation: "scientific" },
      { text: "A set of mental patterns that can be softened through meditation.", orientation: "contemplative" },
      { text: "A persona that can be balanced and refined through journaling.", orientation: "practical" }
    ]
  },
  {
    id: "q16",
    text: "Which metaphor for consciousness resonates most?",
    options: [
      { text: "A screen on which the movie of life is projected without leaving a mark.", orientation: "seeker" },
      { text: "A user interface (like desktop icons) hiding physical reality.", orientation: "scientific" },
      { text: "A calm lake reflecting the moon, undistorted when still.", orientation: "contemplative" },
      { text: "A library of knowledge and practices to be studied and integrated.", orientation: "practical" }
    ]
  },
  {
    id: "q17",
    text: "The idea of 'non-duality' (Advaita) suggests:",
    options: [
      { text: "The observer and the observed are one single, undivided reality.", orientation: "seeker" },
      { text: "A monistic foundation, such as Kastrup's cosmic mind or single field.", orientation: "scientific" },
      { text: "The collapse of the subject-object division in deep meditation.", orientation: "contemplative" },
      { text: "Living in harmony with life without creating mental conflicts.", orientation: "practical" }
    ]
  },
  {
    id: "q18",
    text: "What is your attitude toward skepticism?",
    options: [
      { text: "I negate all thoughts and beliefs, using skepticism to reach the pre-verbal Self.", orientation: "seeker" },
      { text: "It is essential; all claims must face empirical testing and logical rigor.", orientation: "scientific" },
      { text: "Skepticism helps clear dogmas, allowing direct, open-minded presence.", orientation: "contemplative" },
      { text: "It is useful to filter out impractical ideas that do not produce results.", orientation: "practical" }
    ]
  },
  {
    id: "q19",
    text: "What is the purpose of suffering?",
    options: [
      { text: "To show us the limitation of the ego and force us to seek our true nature.", orientation: "seeker" },
      { text: "An evolutionary signal indicating physical threat or social misalignment.", orientation: "scientific" },
      { text: "A teacher that invites us to observe resistance and let go.", orientation: "contemplative" },
      { text: "A feedback signal showing us where our habits or actions need adjusting.", orientation: "practical" }
    ]
  },
  {
    id: "q20",
    text: "When you look at a tree, you experience:",
    options: [
      { text: "Consciousness observing itself in a temporary form.", orientation: "seeker" },
      { text: "Photons hitting my retina, parsed by the visual cortex into a model.", orientation: "scientific" },
      { text: "A silent presence that roots me in the beauty of the now.", orientation: "contemplative" },
      { text: "A representation of growth, branches, and fruits of knowledge.", orientation: "practical" }
    ]
  },
  {
    id: "q21",
    text: "How do you define a successful spiritual life?",
    options: [
      { text: "The complete dissolution of the false self and resting in pure awareness.", orientation: "seeker" },
      { text: "Optimizing brain states, coherence, and intellectual understanding.", orientation: "scientific" },
      { text: "Living with constant presence, compassion, and inner stillness.", orientation: "contemplative" },
      { text: "Successfully balancing inner peace, daily work, and healthy relationships.", orientation: "practical" }
    ]
  },
  {
    id: "q22",
    text: "The best way to start the morning is:",
    options: [
      { text: "Asking 'Who is awake?' before thoughts start and resting in that.", orientation: "seeker" },
      { text: "Reviewing cognitive goals and aligning circadian biology.", orientation: "scientific" },
      { text: "Sitting in silent meditation, focusing on the breath.", orientation: "contemplative" },
      { text: "Doing physical yoga stretches, hydration, and setting the schedule.", orientation: "practical" }
    ]
  },
  {
    id: "q23",
    text: "How do you view books and spiritual texts?",
    options: [
      { text: "Pointers that should be discarded once they point you to your own awareness.", orientation: "seeker" },
      { text: "Hypotheses and theories to be evaluated for logical coherence.", orientation: "scientific" },
      { text: "Contemplative fuel that calms the mind and invites presence.", orientation: "contemplative" },
      { text: "Curated blueprints and step-by-step reading pathways.", orientation: "practical" }
    ]
  },
  {
    id: "q24",
    text: "What is the most important quality for an inquirer?",
    options: [
      { text: "An intense, burning desire for direct liberation and self-inquiry.", orientation: "seeker" },
      { text: "Intellectual honesty, critical thinking, and logical rigor.", orientation: "scientific" },
      { text: "Patience, stillness, and non-judgmental awareness.", orientation: "contemplative" },
      { text: "Consistency, self-discipline, and dedication to practice.", orientation: "practical" }
    ]
  }
];
