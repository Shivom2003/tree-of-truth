import type { NodeData } from "../contentData";

export const BRANCHES_DATA: Record<string, NodeData> = {
  neuroscience: {
    title: "Neuroscience of Consciousness",
    code: "B1",
    question: "What does the brain do, and what does it fail to explain?",
    scope: "The neuroscientific investigation of consciousness seeks to map the physical mechanisms of the brain onto subjective experiences. This branch covers the empirical search for the Neural Correlates of Consciousness (NCC), the self-referential functions of the Default Mode Network (DMN), the integration of sensory inputs (the Binding Problem), and cognitive models like Global Workspace Theory.\n\nWhile neuroscience is exceptionally skilled at mapping correlations, it faces a fundamental explanatory gap when trying to explain why these physical operations feel like anything from the inside.",
    subsections: [
      {
        title: "Neural Correlates of Consciousness (NCC)",
        desc: "The NCC is defined as the minimal neural mechanisms jointly sufficient for any specific conscious percept.\n\nBy comparing brain activity during conscious vs. unconscious states (using techniques like fMRI and EEG), researchers isolate regions like the posterior hot zone (visual and parietal areas) and structures like the claustrum. However, mapping a correlation does not explain the causal link."
      },
      {
        title: "The Default Mode Network (DMN)",
        desc: "The DMN is a network of interacting brain regions—principally the medial prefrontal cortex and posterior cingulate cortex—that is active when a person is not focused on the outside world.\n\nIt is the neural signature of the narrative self, active during daydreaming, memory retrieval, and future projection. Its suppression during deep meditation or flow states correlates with the subjective experience of ego dissolution."
      },
      {
        title: "The Binding Problem",
        desc: "The brain processes visual, auditory, and tactile information in highly distributed, specialized regions. Yet, we experience a unified, coherent conscious moment.\n\nHow the brain integrates these separate information streams without a central 'theater' is the Binding Problem, a major challenge for materialist models of brain function."
      }
    ],
    thinkers: ["Christof Koch", "Anil Seth", "Thomas Metzinger", "Dr. Alok Kanojia"],
    readings: [
      { title: "Being You", author: "Anil Seth" },
      { title: "The Feeling of Life Itself", author: "Christof Koch" }
    ],
    bridge: {
      name: "Philosophy of Mind (B2)",
      path: "/branches/philosophy",
      desc: "The neural explanatory gap leads directly to the philosophical formulation of the Hard Problem."
    }
  },
  "neuroscience/ncc": {
    title: "Neural Correlates of Consciousness (NCC)",
    code: "B1-A",
    question: "Which parts of the brain are directly responsible for conscious experience?",
    scope: "This node examines the empirical project to isolate the specific brain structures and activities that correspond to conscious states. It explores the boundaries of neuroimaging, clinical lesion studies, and the distinction between correlation and causation.",
    subsections: [
      {
        title: "Mapping the Posterior Hot Zone",
        desc: "Modern neuroimaging and lesion studies suggest that the prefrontal cortex may not be essential for generating conscious experience.\n\nInstead, a 'posterior hot zone'—including parietal, occipital, and temporal regions—appears to contain the minimal neural structures necessary for representing visual, auditory, and spatial experiences."
      },
      {
        title: "Correlation vs. Causation",
        desc: "Finding that a specific group of neurons fires when a subject sees red does not explain *how* that firing produces the subjective experience of redness.\n\nNeuroscience has mapped highly complex correlations, but the transition from objective physical mechanism to subjective qualia remains unmodeled."
      },
      {
        title: "Temporal Dynamics of NCC",
        desc: "Studies of the timing of conscious perception show a lag between sensory input and conscious awareness.\n\nResearchers debate whether consciousness occurs during early sensory processing (feedforward sweep) or requires later, higher-level cortical feedback loops (reentrant processing)."
      }
    ],
    thinkers: ["Christof Koch"],
    readings: [
      { title: "The Feeling of Life Itself", author: "Christof Koch" }
    ],
    bridge: {
      name: "Philosophy of Mind (B2)",
      path: "/branches/philosophy",
      desc: "The limits of NCC research highlight why the Hard Problem cannot be solved by data alone."
    }
  },
  "neuroscience/dmn": {
    title: "The Default Mode Network (DMN)",
    code: "B1-B",
    question: "Where is the physical center of the ego in the brain?",
    scope: "The Default Mode Network is the neural subsystem that generates our self-referential identity. This node studies its functions in narrative construction, mental time travel, and how its suppression leads to ego-free states of presence.",
    subsections: [
      {
        title: "The Self-Reflecting Hub",
        desc: "The DMN is active during self-referential thought, autobiographical memory, and perspective-taking.\n\nIt constructs the 'narrative self'—the persistent story of 'me'—by connecting past memories with future projections. When we are not engaged in a task, the DMN defaults to self-talk."
      },
      {
        title: "Ego Dissolution and DMN Suppression",
        desc: "Neuroimaging of experienced meditators and subjects under psychedelics reveals a significant decrease in DMN activity and connectivity.\n\nSubjectively, this suppression correlates with the dissolution of the boundary between self and world, leaving a state of open, unified presence."
      },
      {
        title: "DMN and the Narrative Self",
        desc: "The DMN constructs a personal biography, weaving together memories of the past and projections of the future to maintain a continuous sense of identity.\n\nWhen DMN activity is reduced, the mind stops constructing its history, resting instead in pre-reflective presence."
      }
    ],
    thinkers: ["Anil Seth", "Thomas Metzinger"],
    readings: [
      { title: "Being You", author: "Anil Seth" }
    ],
    bridge: {
      name: "Direct Inquiry (R3)",
      path: "/roots/inquiry",
      desc: "DMN suppression provides a neurological explanation for the ego dissolution achieved through Self-Inquiry."
    }
  },
  "neuroscience/binding": {
    title: "The Binding Problem",
    code: "B1-C",
    question: "How does the brain sew together separate sensory inputs into a single, unified experience?",
    scope: "The Binding Problem is the mystery of how the brain integrates visual, auditory, tactile, and emotional inputs processed in separate cortical regions into a single, unified conscious moment.\n\nIt challenges mechanistic models that lack a unified central processing area.",
    subsections: [
      {
        title: "Distributed Processing in the Cortex",
        desc: "When you observe a rolling ball, its color is processed in region V4, its motion in V5, and its shape in the lateral occipital complex.\n\nThere is no single convergence point in the brain where these signals meet, yet you experience a single, unified rolling red ball."
      },
      {
        title: "Oscillatory Synchrony",
        desc: "One leading hypothesis is that neurons in separate brain regions bind their information by firing in synchronization at gamma-band frequencies (around 40 Hz).\n\nWhile synchrony correlates with attention and binding, it does not explain how this physical synchrony translates into a unified subjective experience."
      },
      {
        title: "The Missing Central Observer",
        desc: "Classical physics assumed a 'Cartesian theater' where the soul watched the brain's inputs. Neuroscience has thoroughly debunked this theater: there is no single observer spot.\n\nThis leaves the question: if the brain is decentralized, how is experience unified?"
      }
    ],
    thinkers: ["Christof Koch", "David Chalmers"],
    readings: [
      { title: "The Conscious Mind", author: "David Chalmers" }
    ],
    bridge: {
      name: "Direct Inquiry (R3)",
      path: "/roots/inquiry",
      desc: "Contemplative traditions argue that the unity of experience is not created by the brain, but is the inherent nature of the Witness."
    }
  },
  "neuroscience/global-workspace": {
    title: "Global Workspace Theory (GWT)",
    code: "B1-D",
    question: "Does consciousness operate like a theater stage in the brain?",
    scope: "Global Workspace Theory, developed by Bernard Baars and Stanislas Dehaene, is a leading cognitive model. It views consciousness as a global distribution network, where information processed locally becomes conscious when broadcast to the rest of the brain.",
    subsections: [
      {
        title: "The Theater of the Mind",
        desc: "GWT uses the metaphor of a theater. Unconscious processors work in the dark wings of the stage.\n\nInformation becomes conscious when it enters the spotlight of attention on the stage (the global workspace), allowing it to be shared with other cognitive systems like memory and motor control."
      },
      {
        title: "The Cognitive Unconscious",
        desc: "The vast majority of the brain's computational work is subliminal and local, such as language parsing and motor coordination.\n\nGWT defines consciousness as a functional gatekeeper, selecting which information is relevant enough to be broadcast globally for flexible behavior."
      },
      {
        title: "Access vs. Phenomenal Consciousness",
        desc: "Critics point out that GWT is a theory of *access* consciousness—explaining how information is made available for reasoning and report.\n\nIt does not explain *phenomenal* consciousness: why this global broadcast is accompanied by a subjective 'feel' from the inside."
      }
    ],
    thinkers: ["David Chalmers"],
    readings: [
      { title: "Consciousness and the Brain", author: "Stanislas Dehaene" }
    ],
    bridge: {
      name: "Philosophy of Mind (B2)",
      path: "/branches/philosophy",
      desc: "GWT is a prime example of what Chalmers calls the 'easy problems' of consciousness."
    }
  },

  philosophy: {
    title: "Philosophy of Mind",
    code: "B2",
    question: "Is consciousness fully explainable in physical terms?",
    scope: "The Western analytical philosophy of mind focuses on the mind-body problem. It examines whether subjective experience can be reduced to physical brain activity.\n\nThis branch covers David Chalmers' Hard Problem of Consciousness, thought experiments on qualia (Mary's Room) and behavior without awareness (Philosophical Zombies), and mathematical attempts to quantify consciousness like Integrated Information Theory (IIT).",
    subsections: [
      {
        title: "The Hard Problem of Consciousness",
        desc: "David Chalmers distinguished the 'easy problems' of explaining brain functions (attention, processing) from the 'hard problem.'\n\nThe hard problem is: why does any brain function have an accompanying subjective feel? Why is the processing not completely 'in the dark'?"
      },
      {
        title: "Qualia & Thought Experiments",
        desc: "Qualia are the subjective, qualitative properties of experience, like the taste of chocolate or the redness of red.\n\nThought experiments like Jackson's 'Mary's Room' argue that you can know all physical facts about color vision and still learn something new when you actually see color, suggesting physicalism is incomplete."
      },
      {
        title: "Integrated Information Theory (IIT)",
        desc: "Giulio Tononi's theory proposes that consciousness is a fundamental property of physical systems, measured by the mathematical value Phi (Φ).\n\nConsciousness is identical to the amount of integrated information in a system, implying that consciousness is graded and widespread."
      }
    ],
    thinkers: ["David Chalmers", "Thomas Nagel", "Bernardo Kastrup"],
    readings: [
      { title: "The Conscious Mind", author: "David Chalmers" },
      { title: "What Is It Like to Be a Bat?", author: "Thomas Nagel" }
    ],
    bridge: {
      name: "Panpsychism & Idealism (B5)",
      path: "/branches/panpsychism",
      desc: "Taking the Hard Problem seriously leads several analytic philosophers to reverse the materialist assumption entirely."
    }
  },
  "philosophy/hard-problem": {
    title: "The Hard Problem of Consciousness",
    code: "B2-A",
    question: "Why does the physical processing of the brain feel like anything from the inside?",
    scope: "The Hard Problem of Consciousness is the central dilemma of contemporary philosophy of mind. It highlights the explanatory gap between objective physical mechanisms and subjective first-person experience.",
    subsections: [
      {
        title: "The Functional Explanatory Gap",
        desc: "Traditional science explains things by mapping their functions and structures. For instance, we explain digestion by mapping chemical breakdowns.\n\nHowever, mapping the brain's functions (categorization, attention) does not explain why those functions are accompanied by subjective experience."
      },
      {
        title: "Easy vs. Hard Problems",
        desc: "The 'easy' problems are those that can be solved by cognitive science and neuroscience, such as explaining how the brain integrates information or controls behavior.\n\nThe 'hard' problem is explaining *why* there is an experience at all. It is a problem of kind, not complexity."
      },
      {
        title: "The Limits of Materialist Reduction",
        desc: "Joseph Levine first coined the term 'explanatory gap' to show that physical descriptions do not make subjective experience intelligible.\n\nNo matter how detailed our mapping of neurons, the question remains: why does this physical activity feel like *this*?"
      }
    ],
    thinkers: ["David Chalmers", "Thomas Nagel"],
    readings: [
      { title: "Facing Up to the Problem of Consciousness", author: "David Chalmers" }
    ],
    bridge: {
      name: "Direct Inquiry (R3)",
      path: "/roots/inquiry",
      desc: "Self-Inquiry investigates the subjective side of the Hard Problem directly from the inside."
    }
  },
  "philosophy/qualia": {
    title: "Qualia & thought experiments",
    code: "B2-B",
    question: "Does experience contain qualities that cannot be captured by physical descriptions?",
    scope: "Qualia are the raw subjective properties of experience—the 'what-it-is-like-ness' of sensory states. This node explores the thought experiments that demonstrate why qualia cannot be reduced to physical facts.",
    subsections: [
      {
        title: "Mary's Room (The Knowledge Argument)",
        desc: "Frank Jackson's thought experiment: Mary is a neuroscientist who has spent her life in a black-and-white room. She knows all the physical facts about color vision.\n\nWhen she steps outside and sees a red apple, does she learn something new? If she does, then physicalism is false, because there are facts about reality that are not physical facts."
      },
      {
        title: "What Is It Like to Be a Bat?",
        desc: "Thomas Nagel argued that even if we had a complete physical map of a bat's sonar system, we could never know what it *feels* like to be a bat.\n\nSubjective experience is tied to a specific point of view, which objective science cannot capture by design."
      },
      {
        title: "The Knowledge Argument vs. Physicalism",
        desc: "Examines the logical structure of Jackson's argument, studying how the difference between knowing descriptions and knowing experience challenges physicalism.\n\nIt highlights that direct experience is a unique form of knowledge."
      }
    ],
    thinkers: ["David Chalmers"],
    readings: [
      { title: "The Conscious Mind", author: "David Chalmers" }
    ],
    bridge: {
      name: "Phenomenology (R4)",
      path: "/roots/phenomenology",
      desc: "Phenomenology is the systematic study of these raw qualities of experience."
    }
  },
  "philosophy/zombies": {
    title: "Philosophical Zombies",
    code: "B2-C",
    question: "Is it possible to have behavior and intelligence without any consciousness?",
    scope: "The Philosophical Zombie is a thought experiment used to test the logical limits of physicalism. A zombie behaves, speaks, and reacts exactly like a human, but has no inner life, no qualia, and no awareness.",
    subsections: [
      {
        title: "The Conceivability Argument",
        desc: "If a physical duplicate of a human could exist without any consciousness, then consciousness is not logically entailed by physical structures.\n\nThis implies that consciousness is an additional, non-physical property of reality."
      },
      {
        title: "The Materialist Counter-Argument",
        desc: "Illusionists like Daniel Dennett argue that zombies are logically impossible. They claim that if a system has all the functional and behavioral capacities of a human, it must be conscious.\n\nThey view consciousness as an illusion created by these functional capacities."
      },
      {
        title: "Conceivability vs. Possibility",
        desc: "Analyzes whether the conceivability of a zombie (which is a logical concept) implies its physical or metaphysical possibility.\n\nIf zombies are metaphysically possible, then physicalism is false, and consciousness is a separate feature of the universe."
      }
    ],
    thinkers: ["David Chalmers", "Daniel Dennett"],
    readings: [
      { title: "Consciousness Explained", author: "Daniel Dennett" }
    ],
    bridge: {
      name: "AI & Consciousness (B6)",
      path: "/branches/ai",
      desc: "Large Language Models can be seen as early implementations of functional zombies."
    }
  },
  "philosophy/iit": {
    title: "Integrated Information Theory (IIT)",
    code: "B2-D",
    question: "Can consciousness be measured mathematically as a physical property?",
    scope: "Integrated Information Theory, developed by Giulio Tononi, is a quantitative model of consciousness. It proposes that consciousness is a fundamental property of physical systems, measured by the mathematical value Phi (Φ).",
    subsections: [
      {
        title: "Phi (Φ) - The Measure of Integration",
        desc: "IIT proposes that a system is conscious to the degree that it integrates information irreducibly.\n\nIf a system's parts interact in a way that cannot be split into independent subsystems, it possesses integrated information, measured by Phi."
      },
      {
        title: "Panpsychist Implications of IIT",
        desc: "Because any system with integrated information has a non-zero Phi, IIT implies that consciousness is graded and present in basic physical structures.\n\nA simple photodiode has a small amount of consciousness, while a human brain has a vast amount."
      },
      {
        title: "The Exclusion Principle",
        desc: "IIT resolves the boundaries of a conscious system using the Exclusion Principle.\n\nOnly the system with local maxima of Phi (Φ) exists as a conscious subject, preventing sub-parts (like individual neurons) or super-parts (like crowds) from being independent minds."
      }
    ],
    thinkers: ["Christof Koch", "Philip Goff"],
    readings: [
      { title: "The Feeling of Life Itself", author: "Christof Koch" }
    ],
    bridge: {
      name: "Panpsychism (B5)",
      path: "/branches/panpsychism",
      desc: "IIT provides a mathematical framework that supports panpsychist models of reality."
    }
  },

  cognitive: {
    title: "Cognitive Science",
    code: "B3",
    question: "How does the mind construct its model of reality — and is the model the same as reality?",
    scope: "Cognitive Science investigates the mind as an information-processing system. This node explores enactive, predictive, and embodied models of cognition.\n\nIt challenges the traditional view of the brain as a passive receiver of data, showing instead that the brain constructs our experience of the world as a 'controlled hallucination' to manage survival and minimize prediction errors.",
    subsections: [
      {
        title: "Predictive Processing & Active Inference",
        desc: "Grounded in Karl Friston's work, this model suggests the brain is a prediction engine.\n\nIt does not wait for sensory data; it generates top-down predictions and only registers the errors. Experience is the brain's best guess of the world."
      },
      {
        title: "Embodied & Enacted Cognition",
        desc: "Francisco Varela and Evan Thompson argued that the mind is not inside the skull.\n\nCognition is Embodied (shaped by the physical body) and Enacted (brought forth through sensory-motor coupling with the environment)."
      },
      {
        title: "The 4E Cognition Framework",
        desc: "4E Cognition summarizes how the mind is Embodied (uses the body), Embedded (lives in an environment), Enacted (acts), and Extended (uses external tools).\n\nIt presents a unified alternative to traditional representational cognitive science."
      }
    ],
    thinkers: ["Karl Friston", "Andy Clark", "Anil Seth"],
    readings: [
      { title: "Surfing Uncertainty", author: "Andy Clark" },
      { title: "The Embodied Mind", author: "Francisco Varela et al." }
    ],
    bridge: {
      name: "Buddhist Thought (R2)",
      path: "/roots/buddhism",
      desc: "The enactivist framework emerged, in part, from a direct dialogue with Buddhist phenomenological models."
    }
  },
  "cognitive/embodied": {
    title: "Embodied Cognition",
    code: "B3-A",
    question: "Is the mind locked inside the brain, or does it require the whole body?",
    scope: "Embodied Cognition challenges the Cartesian model of a disembodied intellect. It studies how our concepts and cognitive processes are shaped by our physical bodies and environmental interactions.",
    subsections: [
      {
        title: "Mind in Action",
        desc: "Embodied cognition argues that our thoughts and concepts are grounded in physical actions and sensory-motor systems.\n\nFor example, we understand spatial concepts (like 'forward' or 'down') because we are upright organisms that move through space."
      },
      {
        title: "Enactivism & Sensorimotor Coupling",
        desc: "Developed by Francisco Varela, enactivism asserts that cognition is not representing an independent world.\n\nIt is the active bringing forth of a world of meaning through continuous sensorimotor interaction between the organism and its environment."
      },
      {
        title: "Extended Mind Hypothesis",
        desc: "Andy Clark and David Chalmers proposed that the mind is not limited by the skull or skin.\n\nIf we use an external tool (like a notebook, calculator, or smartphone) to store and process information, that tool is a literal extension of our cognitive system."
      }
    ],
    thinkers: ["Francisco Varela", "Andy Clark"],
    readings: [
      { title: "The Embodied Mind", author: "Francisco Varela et al." }
    ],
    bridge: {
      name: "Phenomenology (R4)",
      path: "/roots/phenomenology",
      desc: "Embodied cognition is a scientific validation of Merleau-Ponty's phenomenology of embodiment."
    }
  },
  "cognitive/self-construction": {
    title: "Self-Construction",
    code: "B3-B",
    question: "How does the brain construct the illusion of a unified ego?",
    scope: "Self-Construction examines the cognitive and biological mechanisms that assemble the sense of self from bodily predictions. It focuses on how the brain integrates internal signals to generate a localized identity.",
    subsections: [
      {
        title: "The Beast Machine Theory",
        desc: "Anil Seth's theory suggests that our sense of self is a 'controlled hallucination' generated by the brain's predictive models of its own internal bodily states (interoception).\n\nWe experience being a self to keep our physiological systems within survival limits."
      },
      {
        title: "Interoceptive Inference",
        desc: "The brain predicts internal bodily signals (heart rate, respiration, gut feelings) to construct the basic, emotional sense of being a living organism.\n\nThis interoceptive feedback forms the background presence of the minimal self."
      },
      {
        title: "Model Failure and Self-Dissolution",
        desc: "When these predictive loops are disrupted (through meditation, trauma, or psychedelics), the brain's self-model collapses.\n\nSubjectively, this is experienced as the dissolution of the separate ego, exposing the constructed nature of identity."
      }
    ],
    thinkers: ["Anil Seth", "Thomas Metzinger"],
    readings: [
      { title: "Being You", author: "Anil Seth" }
    ],
    bridge: {
      name: "Buddhist Thought (R2)",
      path: "/roots/buddhism",
      desc: "Cognitive self-construction provides a neurological explanation for the Buddhist Anatta (no-self) doctrine."
    }
  },
  "cognitive/predictive": {
    title: "The Predictive Brain",
    code: "B3-C",
    question: "Do we perceive the world as it is, or as we expect it to be?",
    scope: "This node explores the predictive processing framework of Karl Friston and Andy Clark, analyzing the brain as a prediction engine that constructs experience through top-down expectations.",
    subsections: [
      {
        title: "Controlled Hallucination",
        desc: "Perception is not a passive reading of sensory inputs. Instead, the brain generates top-down expectations (predictions) and only registers the sensory errors (prediction errors).\n\nOur daily experience is a controlled simulation, corrected by sensory inputs."
      },
      {
        title: "The Free Energy Principle",
        desc: "Karl Friston's mathematical formulation: all self-organizing systems act to minimize free energy (which translates to minimizing surprise or prediction error) to maintain structural integrity and survive."
      },
      {
        title: "Precision Weighting & Attention",
        desc: "The brain balances its predictions against raw sensory data through precision weighting.\n\nAttention is the adjustment of sensory signal volume (precision), deciding whether to prioritize top-down expectations or bottom-up sensory errors."
      }
    ],
    thinkers: ["Karl Friston", "Andy Clark"],
    readings: [
      { title: "Surfing Uncertainty", author: "Andy Clark" }
    ],
    bridge: {
      name: "Quantum Mind (B4)",
      path: "/branches/quantum",
      desc: "Compare the predictive brain model with Donald Hoffman's Interface Theory of perception."
    }
  },

  quantum: {
    title: "Quantum Mind",
    code: "B4",
    question: "Does quantum mechanics have anything to say about consciousness?",
    scope: "Quantum Mind explores proposals that quantum effects are necessary to explain consciousness. This branch covers the Observer Problem in quantum measurement, Roger Penrose and Stuart Hameroff's Orchestrated Objective Reduction (Orch-OR) theory, Bell's theorem (Non-Locality), and Donald Hoffman's evolutionary Case Against Reality.\n\nIt analyzes whether quantum physics provides a non-local, consciousness-first framework for reality.",
    subsections: [
      {
        title: "The Observer Problem",
        desc: "A quantum system remains in a superposition of states until measured. Physicists like von Neumann and Wigner argued that the physical chain of measurement only collapses when it registers in a conscious mind.\n\nThis places consciousness at the core of quantum mechanics."
      },
      {
        title: "Penrose-Hameroff (Orch-OR)",
        desc: "Roger Penrose and Stuart Hameroff proposed that consciousness relies on non-computable quantum gravity collapse processes within neuronal microtubules.\n\nThis suggests that consciousness is not a computer algorithm, but a fundamental quantum event."
      },
      {
        title: "Interface Theory (Donald Hoffman)",
        desc: "Hoffman applies evolutionary game theory to perception, proving that natural selection drives perception away from truth and toward fitness payoffs.\n\nSpace-time and physical objects are a species-specific user interface (like desktop icons) designed to hide reality, which he models as a network of conscious agents."
      }
    ],
    thinkers: ["Roger Penrose", "Federico Faggin", "Donald Hoffman"],
    readings: [
      { title: "The Emperor's New Mind", author: "Roger Penrose" },
      { title: "The Case Against Reality", author: "Donald Hoffman" },
      { title: "Irreducible", author: "Federico Faggin" }
    ],
    bridge: {
      name: "Panpsychism & Idealism (B5)",
      path: "/branches/panpsychism",
      desc: "Frontier physics and conscious agent models lead toward consciousness-first philosophy."
    }
  },
  "quantum/observer": {
    title: "The Observer Problem",
    code: "B4-A",
    question: "Does measurement in quantum mechanics require a conscious observer?",
    scope: "This node analyzes the measurement problem in quantum mechanics. It explores the Von Neumann-Wigner interpretation and the debate over whether wave function collapse requires a conscious mind.",
    subsections: [
      {
        title: "Wave Function Collapse",
        desc: "A quantum system is described by a wave function representing a superposition of possibilities.\n\nWhen a measurement occurs, the wave function collapses into a single state. The definition of 'measurement' remains a central debate in physics."
      },
      {
        title: "Von Neumann-Wigner Interpretation",
        desc: "Physicists John von Neumann and Eugene Wigner argued that all physical measurement instruments are themselves made of atoms and must exist in superposition.\n\nThe chain of superposition is only collapsed when the measurement registers in the consciousness of a human observer."
      },
      {
        title: "Decoherence and the Environment",
        desc: "The standard physical counterargument is decoherence.\n\nIt states that interaction with the surrounding environment (air molecules, light) causes a quantum system to lose its coherence and appear collapsed, without needing a conscious observer."
      }
    ],
    thinkers: ["Roger Penrose", "Federico Faggin"],
    readings: [
      { title: "Mind, Matter and Quantum Mechanics", author: "Henry Stapp" }
    ],
    bridge: {
      name: "Advaita Vedanta (R1)",
      path: "/roots/vedanta",
      desc: "The observer problem mirrors the Vedantic distinction between the Seer (Drk) and the Seen (Drsya)."
    }
  },
  "quantum/orch-or": {
    title: "Penrose-Hameroff (Orch-OR)",
    code: "B4-B",
    question: "Is consciousness born from quantum processes inside brain structures?",
    scope: "Orch-OR (Orchestrated Objective Reduction) is a detailed theory developed by physicist Roger Penrose and anesthesiologist Stuart Hameroff.\n\nIt proposes that consciousness occurs when quantum coherence in neuronal microtubules undergoes a self-collapse associated with quantum gravity.",
    subsections: [
      {
        title: "The Non-Computability of Mind",
        desc: "Penrose argued (using Gödel's Incompleteness Theorems) that human mathematical understanding is non-computable.\n\nTherefore, consciousness cannot be a classical algorithm, requiring a physical process that goes beyond classical computation."
      },
      {
        title: "Microtubules as Quantum Processors",
        desc: "Hameroff proposed that microtubules—structural proteins within neurons—are shielded from environmental decoherence.\n\nThis allows them to sustain quantum superposition, which is then 'orchestrated' by synaptic inputs to collapse at conscious moments."
      },
      {
        title: "Microtubules and Warm, Wet Environments",
        desc: "Physicist Max Tegmark criticized Orch-OR, calculating that the brain is too warm, wet, and noisy to sustain quantum coherence for longer than a fraction of a picosecond.\n\nHameroff responds that structural water channels inside microtubules act as shields, protecting quantum states."
      }
    ],
    thinkers: ["Roger Penrose"],
    readings: [
      { title: "Shadows of the Mind", author: "Roger Penrose" }
    ],
    bridge: {
      name: "AI & Consciousness (B6)",
      path: "/branches/ai",
      desc: "If Orch-OR is correct, digital silicon computers can never achieve genuine consciousness."
    }
  },
  "quantum/non-locality": {
    title: "Non-Locality & Entanglement",
    code: "B4-C",
    question: "Does quantum entanglement suggest a unified, non-local reality?",
    scope: "This node explores the philosophical implications of Bell's theorem and quantum entanglement, analyzing how they challenge classical notions of local realism and separate objects.",
    subsections: [
      {
        title: "Spooky Action at a Distance",
        desc: "Entangled particles remain correlated regardless of distance, violating classical local realism. Bell's theorem proved that nature is non-local.\n\nWhat happens to one particle instantly affects the other, suggesting a unified underlying field."
      },
      {
        title: "The Illusion of Separateness",
        desc: "Non-locality shows that physical reality is an undivided whole at the fundamental level.\n\nThe separation of objects in space-time is a macroscopic appearance, not a fundamental quantum fact."
      },
      {
        title: "Holistic Metaphysics",
        desc: "Quantum non-locality challenges Cartesian mechanism, pointing toward a process-oriented metaphysics.\n\nIn this view, relations and fields are prior to isolated physical objects, aligning with non-dual descriptions of reality."
      }
    ],
    thinkers: ["Federico Faggin"],
    readings: [
      { title: "Irreducible", author: "Federico Faggin" }
    ],
    bridge: {
      name: "Panpsychism (B5)",
      path: "/branches/panpsychism",
      desc: "Non-locality provides a physical analog to the idealist view that all minds are connected in a single field."
    }
  },
  "quantum/interface": {
    title: "Interface Theory of Perception",
    code: "B4-D",
    question: "Are space, time, and physical objects only a desktop interface?",
    scope: "Donald Hoffman's Interface Theory of Perception (ITP) deconstructs our assumption that we perceive reality as it is. It uses evolutionary game theory to prove that perception is a simplified survival tool, not a window onto objective truth.",
    subsections: [
      {
        title: "Fitness Beats Truth Theorem",
        desc: "Hoffman's mathematical simulations prove that organisms that perceive objective reality accurately are consistently out-competed by organisms that perceive fitness payoffs.\n\nNatural selection systematically hides reality, shaping perception for survival."
      },
      {
        title: "The Desktop Metaphor",
        desc: "Space-time is like a computer desktop. A file icon is not the physical file itself; it is only a simplified interface.\n\nSimilarly, a physical object (like a red apple) is an icon we construct to represent fitness payoffs, hiding the complex reality behind it."
      },
      {
        title: "Space-Time is Doomed",
        desc: "Grounded in recent physics (Nima Arkani-Hamed's amplituhedron), Hoffman argues that space-time is not fundamental but emergent.\n\nSpace-time is a temporary data structure that simplifies the complexity of interacting conscious agents, which he models as the fundamental reality."
      }
    ],
    thinkers: ["Donald Hoffman"],
    readings: [
      { title: "The Case Against Reality", author: "Donald Hoffman" }
    ],
    bridge: {
      name: "Advaita Vedanta (R1)",
      path: "/roots/vedanta",
      desc: "Hoffman's interface theory is a mathematical reformulation of the Vedantic doctrine of Maya."
    }
  },

  panpsychism: {
    title: "Panpsychism & Idealism",
    code: "B5",
    question: "What if consciousness is not produced by matter, but is the ground of all reality?",
    scope: "Panpsychism and Idealism are the two primary alternatives to materialist theories of mind. Panpsychism proposes that consciousness is a fundamental feature of all matter, while Idealism asserts that consciousness is the sole ontological primitive.\n\nThis node explores how these frameworks resolve the Hard Problem by reversing the materialist assumption.",
    subsections: [
      {
        title: "Panpsychism & Galileo's Error",
        desc: "Philip Goff argues that Galileo created the Hard Problem by excluding qualitative properties (experience) from physics to build a quantitative science.\n\nPanpsychism resolves this by making consciousness the intrinsic nature of matter."
      },
      {
        title: "Analytical Idealism",
        desc: "Bernardo Kastrup proposes that reality is fundamentally mental. The physical world is the extrinsic appearance of universal mental processes.\n\nIndividual minds are dissociated alters of a single, universal consciousness."
      },
      {
        title: "Micropsychism vs. Cosmopsychism",
        desc: "Compares the view that small physical particles possess basic consciousness (micropsychism) with the view that the entire universe is a single conscious system (cosmopsychism).\n\nCosmopsychism avoids the combination problem of panpsychism."
      }
    ],
    thinkers: ["Bernardo Kastrup", "Philip Goff", "Donald Hoffman", "David Chalmers"],
    readings: [
      { title: "The Idea of the World", author: "Bernardo Kastrup" },
      { title: "Galileo's Error", author: "Philip Goff" }
    ],
    bridge: {
      name: "Advaita Vedanta (R1)",
      path: "/roots/vedanta",
      desc: "What analytic philosophy is now calling idealism, Vedanta termed Advaita two thousand years ago."
    }
  },
  "panpsychism/idealism": {
    title: "Analytical Idealism",
    code: "B5-A",
    question: "Is the physical world merely how mental processes appear from the outside?",
    scope: "Analytical Idealism, defended by Bernardo Kastrup, is a rigorous version of idealism. It asserts that consciousness is the only self-evident ontological primitive, and that the physical world is its external representation.",
    subsections: [
      {
        title: "Consciousness as the Ground",
        desc: "Kastrup argues that consciousness is the only reality we directly experience. Matter is a theoretical concept we construct to explain experiences.\n\nIdealism is more parsimonious because it does not assume the existence of an unexperienced, physical substance."
      },
      {
        title: "Dissociation and Alters",
        desc: "Individual minds are dissociated alters of a single, universal consciousness, similar to Dissociative Identity Disorder.\n\nThe boundary of the body is the boundary of our dissociation, and the physical world is the external appearance of this universal mind."
      },
      {
        title: "The De-combination Problem",
        desc: "Analytical idealism avoids the combination problem of panpsychism (explaining how tiny consciousnesses combine into a human mind).\n\nIt starts with a single, unified universal consciousness and explains individual minds through dissociation (de-combination)."
      }
    ],
    thinkers: ["Bernardo Kastrup"],
    readings: [
      { title: "The Idea of the World", author: "Bernardo Kastrup" }
    ],
    bridge: {
      name: "Advaita Vedanta (R1)",
      path: "/roots/vedanta",
      desc: "Analytical Idealism is a modern, analytical translation of Advaita's absolute non-dualism."
    }
  },
  "panpsychism/goff": {
    title: "Philip Goff & Panpsychism",
    code: "B5-B",
    question: "How did early science design the Hard Problem, and how do we solve it?",
    scope: "Philip Goff's case for panpsychism. It deconstructs the history of modern science to show that the Hard Problem is a methodological creation, not a biological fact.",
    subsections: [
      {
        title: "Galileo's Error",
        desc: "Galileo divided reality into quantitative properties (which science can measure) and qualitative properties (experienced color, sound, taste), which he placed in the mind.\n\nThis exclusion created the Hard Problem by designing a science of matter that left out consciousness."
      },
      {
        title: "The Intrinsic Nature of Matter",
        desc: "Physics describes what matter *does* (mass, charge, spin), not what it *is* in itself.\n\nPanpsychism proposes that the intrinsic nature of matter is consciousness, providing the missing qualitative foundation for quantitative physics."
      },
      {
        title: "Quantitative vs. Qualitative Science",
        desc: "Analyzes Goff's critique of the Galilean division of science.\n\nHe argues that a complete science must integrate both physical quantities and conscious qualities, making consciousness a fundamental property alongside mass and charge."
      }
    ],
    thinkers: ["Philip Goff", "David Chalmers"],
    readings: [
      { title: "Galileo's Error", author: "Philip Goff" }
    ],
    bridge: {
      name: "Philosophy of Mind (B2)",
      path: "/branches/philosophy",
      desc: "Panpsychism solves the Hard Problem by removing the dualistic division between mind and matter."
    }
  },
  "panpsychism/chalmers": {
    title: "David Chalmers on Panpsychism",
    code: "B5-C",
    question: "How did a physicalist philosopher arrive at panpsychism?",
    scope: "David Chalmers' philosophical journey toward panpsychism. Having established the irreducibility of the Hard Problem, he explores panpsychism as the most promising framework for a fundamental theory of consciousness.",
    subsections: [
      {
        title: "The Combination Problem",
        desc: "Chalmers explores the primary challenge of panpsychism: how do micro-level conscious experiences (like those of atoms) combine into unified, complex experiences (like ours)?\n\nThis remains the central debate in panpsychist literature."
      },
      {
        title: "Constitutive Panpsychism",
        desc: "The view that macro-consciousness is built out of, and explained by, micro-consciousness.\n\nIt provides a structured, non-reductive alternative to physicalism, treating consciousness as a fundamental constituent of the universe."
      },
      {
        title: "Double-Aspect Theory of Information",
        desc: "Discusses Chalmers' proposal that information has both a physical (outer) and phenomenological (inner) aspect.\n\nThis double-aspect theory provides a conceptual bridge, suggesting that any system that processes information has an accompanying experience."
      }
    ],
    thinkers: ["David Chalmers", "Philip Goff"],
    readings: [
      { title: "The Conscious Mind", author: "David Chalmers" }
    ],
    bridge: {
      name: "Philosophy of Mind (B2)",
      path: "/branches/philosophy",
      desc: "Chalmers' move toward panpsychism shows the logical trajectory of taking the Hard Problem seriously."
    }
  },
  "panpsychism/faggin": {
    title: "Federico Faggin on Consciousness",
    code: "B5-D",
    question: "Why is awareness the fundamental fabric of reality?",
    scope: "Federico Faggin's quantum-based consciousness model. As the co-inventor of the microprocessor, Faggin concludes that consciousness cannot be produced by computation, and proposes that awareness is primary.",
    subsections: [
      {
        title: "Syntax vs. Semantics",
        desc: "Faggin argues that computers process syntax (formal rules for symbol manipulation) but do not experience semantics (meaning, feeling).\n\nConsciousness is a semantic phenomenon that cannot emerge from syntactic computation alone."
      },
      {
        title: "Quantum Consciousness Field",
        desc: "Consciousness exists in a quantum field prior to physical matter.\n\nThe brain acts as a classical transceiver, translating this quantum conscious field into classical sensory experience, rather than generating it."
      },
      {
        title: "Syntax vs. Semantics in Nature",
        desc: "Details Faggin's core argument that physical reality is the syntax (outer expression) of a deeper semantic (inner experiential) reality.\n\nConsciousness is the fundamental fabric of existence, and physical systems are its symbols."
      }
    ],
    thinkers: ["Federico Faggin", "Donald Hoffman"],
    readings: [
      { title: "Irreducible", author: "Federico Faggin" }
    ],
    bridge: {
      name: "Quantum Mind (B4)",
      path: "/branches/quantum",
      desc: "Faggin's quantum framework bridges analytical idealism with quantum measurement theory."
    }
  },

  ai: {
    title: "AI & Consciousness",
    code: "B6",
    question: "Can a system that learns from data ever experience?",
    scope: "This node examines the boundaries of artificial intelligence. It compares statistical learning in artificial neural networks with human cognitive development.\n\nIt analyzes why computational behavior cannot solve the question of subjective experience, drawing from John Searle's Chinese Room argument and modern discussions on Large Language Models.",
    subsections: [
      {
        title: "Syntax vs. Semantics (The Chinese Room)",
        desc: "John Searle's thought experiment: a person in a room translates Chinese characters using a rulebook without understanding Chinese.\n\nSimilarly, AI processes syntax (rules) without ever experiencing semantics (meaning). Symbol manipulation is not understanding."
      },
      {
        title: "Intelligence vs. Awareness",
        desc: "Large Language Models demonstrate that linguistic reasoning and creative outputs can exist without any inner life.\n\nThey are functional zombies—showing advanced intelligence without any subjective feeling or awareness."
      },
      {
        title: "The Learning Gap",
        desc: "Humans learn through embodied, felt experience and homeostatic feedback; AI models learn through statistical pattern optimization on static datasets.\n\nAI lacks the biological, living ground that supports awareness."
      }
    ],
    thinkers: ["John Searle", "David Chalmers", "Federico Faggin"],
    readings: [
      { title: "Minds, Brains and Programs", author: "John Searle" },
      { title: "Could a Large Language Model Be Conscious?", author: "David Chalmers" }
    ],
    bridge: {
      name: "Direct Inquiry (R3)",
      path: "/roots/inquiry",
      desc: "The question 'who is aware?' becomes the most urgent inquiry of the technological age."
    }
  },
  "ai/learning-comparison": {
    title: "Intelligence vs. Awareness",
    code: "B6-A",
    question: "Does advanced reasoning imply the presence of a witness?",
    scope: "This node compares the statistical learning of artificial neural networks with human cognitive development, highlighting the distinction between functional intelligence and conscious awareness.",
    subsections: [
      {
        title: "Pattern Optimization",
        desc: "An LLM predicts the next token by adjusting mathematical weights based on training data. While it mimics advanced linguistic reasoning, there is no verified center of experience or awareness inside the network."
      },
      {
        title: "The Functional Zombie AI",
        desc: "LLMs are the first implementations of functional zombies — showing intelligence, reasoning, and association, completely 'in the dark', without any subjective feeling."
      },
      {
        title: "The Embodiment Requirement",
        desc: "Discusses whether a disembodied AI model can ever develop genuine understanding or if consciousness requires sensory-motor coupling with a physical world.\n\nIt examines the dependency of mind on physical action."
      }
    ],
    thinkers: ["David Chalmers", "John Searle"],
    readings: [
      { title: "Could a Large Language Model Be Conscious?", author: "David Chalmers" }
    ],
    bridge: {
      name: "Philosophy of Mind (B2)",
      path: "/branches/philosophy",
      desc: "The existence of LLMs proves the physicalist equation of 'intelligence = consciousness' is incorrect."
    }
  },
  "ai/experience": {
    title: "The Distinction of Experience",
    code: "B6-B",
    question: "Can syntax ever generate semantics?",
    scope: "This node explores the distinction between syntax (manipulation of symbols) and semantics (meaning/experience), applying John Searle's Chinese Room argument to modern artificial intelligence.",
    subsections: [
      {
        title: "The Chinese Room",
        desc: "Searle sits in a room and translates Chinese characters using a rulebook. To people outside, he seems to understand Chinese. But he is only matching symbols. Similarly, AI processes syntax (rules) without ever experiencing semantics (meaning)."
      },
      {
        title: "The Biological Ground",
        desc: "Faggin and Searle argue that consciousness is a biological, quantum, or organic phenomenon that cannot be reproduced on classical silicon computers, regardless of complexity.\n\nAwareness belongs to life, not computation."
      },
      {
        title: "Simulation vs. Realization",
        desc: "Explores the philosophical distinction between simulating cognitive behaviors (such as empathy or reasoning) and actually realizing them as subjective states.\n\nSimulating digestion is not digesting; simulating thinking is not experiencing."
      }
    ],
    thinkers: ["John Searle", "Federico Faggin"],
    readings: [
      { title: "Minds, Brains and Programs", author: "John Searle" }
    ],
    bridge: {
      name: "Direct Inquiry (R3)",
      path: "/roots/inquiry",
      desc: "Direct Inquiry points directly to the Witness, which is the ground of experience, prior to any data or computation."
    }
  },
  "ai/identity-copy": {
    title: "Identity Copy (The Clone Paradox)",
    code: "B6-C",
    question: "If an exact replica of your body and mind is created, where does your first-person subjectivity reside?",
    scope: "This node explores the boundary between personal identity and raw consciousness through the lens of duplication. If we can clone both the physical body (via DNA cloning) and the mental world (via training an AI model on a person's entire biography and patterns), we are faced with two identical entities. Yet, the first-person subject ('I') remains localized and cannot be copied. This paradox deconstructs the assumption that 'I' am the body or the mind, pointing to the construct-nature of personal ego.",
    subsections: [
      {
        title: "The Digital Twin (Data Mimicry)",
        desc: "Imagine training a neural network on every experience, memory, reaction, and expression of a person (e.g., Shivom). The resulting AI twin behaves and thinks exactly like them. Yet, there is a fundamental gap: the model is a copy of the *behavioral template*, not the first-person *experiencer*. The template is learned and objectified, but the subject cannot be duplicated."
      },
      {
        title: "The DNA Clone (Physical Duplication)",
        desc: "A physical clone created from DNA, placed in an identical environment, would share the exact physical features and similar developmental paths. Yet, if you look at the clone, you do not experience through their eyes. Your subjectivity remains localized. Thus, the physical body is not the source of your singular first-person presence."
      },
      {
        title: "Deconstructing Identity",
        desc: "If the physical form can be duplicated, and the mental world can be copied, yet the absolute sense of 'I' cannot be duplicated or split, it implies that the identity 'Shivom' was never the fundamental Subject. 'Shivom' is a collection of objects (memories, DNA, habits) arising within the singular space of awareness."
      }
    ],
    thinkers: ["John Searle", "Federico Faggin", "Thomas Metzinger"],
    readings: [
      { title: "The Ego Tunnel", author: "Thomas Metzinger" },
      { title: "Minds, Brains and Programs", author: "John Searle" }
    ],
    bridge: {
      name: "Shivom's Inquiry (R6)",
      path: "/roots/shivom",
      desc: "The copy argument demonstrates that the personal ego is an object, bridging directly to Shivom's deconstruction of identity through sensory and memory removal."
    }
  }
};

