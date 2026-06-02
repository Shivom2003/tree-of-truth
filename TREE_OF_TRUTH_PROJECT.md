# Tree of Truth — Master Project Document

> *"What remains when everything that can be taken away, is taken away?"*
> This is the root question. Every section, every branch, every leaf of this project grows from it.

---

## Project Vision

The Tree of Truth is a living knowledge architecture — a web experience that bridges ancient non-dual wisdom traditions and modern scientific inquiry into the nature of consciousness, reality, and the self. It is not a comparison between science and philosophy. It is a demonstration that they are converging on the same territory from opposite directions.

The motive is simple: in an age where AI is forcing humanity to ask what intelligence *is*, the ancient inquiry into what *awareness* is becomes urgently relevant. This project exists at that intersection.

---

## The Root Question

All content, navigation, and structure flows from a single root question — not chosen arbitrarily, but distilled from the project creator's deepest personal inquiry across multiple traditions:

> **"What remains when everything that can be taken away, is taken away?"**

This is the distilled essence of:
- Ramana Maharshi's *"Who am I?"*
- Nisargadatta's *"Before the mind"*
- The Upanishadic *neti neti* (not this, not this)
- The deep sleep inquiry (who witnesses dreamless sleep?)
- The memory-loss inquiry (who remains when all identity is stripped?)
- The neuroscientific hard problem (why is there something it is like to be aware?)
- The phenomenological reduction (what is left after bracketing all content of experience?)

This question is the trunk of the tree. Every section is an approach to answering it — or a demonstration that the question itself is the answer.

---

## Tree Anatomy

The tree is the core visual metaphor and the navigational structure of the entire site. Each anatomical part represents a distinct epistemic domain.

### Roots — Ancient Wisdom & Direct Inquiry
The oldest and deepest knowledge. What the contemplative traditions arrived at through direct, first-person investigation.

**Contents:**
- Advaita Vedanta (Shankara, the Upanishads, the Mandukya, the Ashtavakra Gita)
- Buddhism (Theravada, Zen, Tibetan — anatta, śūnyatā, rigpa)
- Direct Inquiry practices (self-inquiry, neti neti, Ramana's method, Who am I?)
- Phenomenological deconstruction (the self as construct, the witness, pure presence)
- The Upanishadic questions (What is Brahman? What is Atman? Are they different?)
- Occult & esoteric traditions (rebirth, enlightenment, subtle body — treated respectfully, not sensationally)

**Tone:** Deep, reverent, precise. No popularization. Full depth.

### Trunk — The Unifying Thread
The trunk is not a section — it is the visual and conceptual spine of the site. It represents pure awareness itself: the one thing that cannot be the object of inquiry because it is the subject of all inquiry.

On the homepage, the trunk visually connects roots to branches. In terms of content, the trunk is where all traditions *converge* — the stateless witness, the ground of being, consciousness as the only certainty.

The trunk section (if it exists as a page) might simply ask the root question and invite the user to sit with it before navigating anywhere else.

### Branches — Modern Scientific Inquiry
The scientific traditions currently circling the same territory the ancients explored directly.

**Contents:**
- Neuroscience of consciousness (default mode network, binding problem, neural correlates of consciousness)
- Cognitive science (predictive coding, embodied cognition, the construction of the self)
- Quantum physics & consciousness (the observer problem, non-locality, Penrose-Hameroff, Hoffman's interface theory)
- Panpsychism (Chalmers, Goff, Kastrup's idealism, Faggin's quantum mind)
- Philosophy of mind (the hard problem, qualia, zombies, IIT, Global Workspace Theory)
- Artificial intelligence & consciousness (can a system that learns from sensory data ever *experience*? What does AI reveal about intelligence vs. awareness?)

**Tone:** Rigorous but accessible. Referenced. Links to actual papers.

### Leaves — Thinkers & Voices
Individual nodes representing people who have contributed meaningfully to this intersection. Each leaf is a profile page.

**Ancient figures:**
- Adi Shankaracharya, Krishna (Bhagavad Gita), Gautama Buddha, Patanjali, Nagarjuna, Ramana Maharshi, Nisargadatta Maharaj, Ramakrishna Paramahamsa, Swami Vivekananda, Sarvapriyananda

**Modern scientists & philosophers:**
- Federico Faggin (quantum consciousness, "Irreducible"), Donald Hoffman (interface theory, conscious agents), Bernard Kastrup (analytical idealism), David Chalmers (hard problem), Deepak Chopra (mind-body bridge), Philip Goff (panpsychism), Christof Koch (NCC research), Dr. Alok Kanojia (HealthyGamer — mental health + neuroscience)

**Contemporary teachers & integrators:**
- Sarvapriyananda, Rupert Spira, Francis Lucille

**Profile structure for each leaf:**
- Core question they explored
- Their primary contribution (in plain language)
- Key quote (brief)
- Recommended work (books, papers, videos)
- Where they sit on the roots-to-branches spectrum

**Tone:** Biographical but philosophical. Not hagiographic. Honest about tensions and disagreements.

### Fruit — Practices & Realizations
What the tree produces. Not information but *transformation*.

**Contents:**
- Meditation practices (Vipassana, self-inquiry, dzogchen pointing-out instructions, non-dual meditation)
- Recommended reading paths (beginner → intermediate → deep)
- Curated YouTube playlists per topic
- Research paper reading list (accessible entry points into the academic literature)
- Journaling prompts based on the root question and its sub-questions

**Tone:** Practical. Direct. No spiritual bypassing. Honest about difficulty.

---

## Visual Design Direction

### Core aesthetic
- **Background:** Deep cosmic dark (near-black, #08090F or similar)
- **Tree:** Luminous gold — hand-crafted SVG or Three.js rendered tree with organic branching
- **Stars:** Subtle twinkling particle field in the background (canvas or WebGL)
- **Nodes:** Key nodes (root tips, branch junctions, significant leaves) glow/pulse gently to indicate they are interactive
- **Navigation:** Clicking a node zooms/transitions into that section of knowledge
- **Typography:** Elegant serif for headings (evokes ancient texts), clean sans-serif for body

### Interaction principles
- The tree should feel *alive*, not like a diagram
- Node hover: gentle golden glow intensifies, subtle particle emission
- Node click: smooth cinematic transition into the section — not a hard page change
- Users can also navigate via a traditional menu (for accessibility and mobile)
- The tree is the experience, not decoration on top of content

### Responsive approach
- Desktop: full immersive tree
- Mobile: simplified tree (fewer branches visible at once, tap to expand), with full menu fallback

---

## Project Phases

### Phase 0 — The Map (Current phase)
**Goal:** Complete knowledge architecture. No code. No design.
**Output:** This document + a detailed content outline for every section.
**Owner:** Human + Claude (reasoning and structure)
**Completion criteria:** Every section of the tree is named, its content is scoped, and the relationships between sections are clear.

---

### Phase 1 — The Visual Skeleton
**Goal:** A working, beautiful homepage with the interactive tree. One complete section (recommended: Roots → Advaita Vedanta) built end-to-end as a proof of concept.

**Deliverables:**
- Homepage with animated golden tree on dark cosmic background
- Interactive node system (hover glow, click navigation)
- One fully built section page (Vedanta root) with real content
- Basic routing and navigation structure
- Mobile responsive layout

**Tech stack:**
- Framework: Next.js 14+ (App Router)
- Styling: Tailwind CSS
- Animation/3D: Three.js (tree rendering) + GSAP (transitions and micro-animations)
- Hosting: Vercel (free tier initially)

**Agent division:**
- Claude Code: project scaffolding, Next.js architecture, Three.js tree logic, component structure
- Antigravity: parallel generation of UI components, page templates, Tailwind styling, boilerplate

---

### Phase 2 — The Full Body
**Goal:** All major sections built with real, curated content.

**Deliverables:**
- All Roots sections (Vedanta, Buddhism, Direct Inquiry, Phenomenology, Occult)
- All Branches sections (Neuroscience, Cognitive Science, Physics, Panpsychism, AI & Mind)
- All Leaves (thinker profile pages — approximately 20 profiles)
- Fruit section (practices, reading lists, video playlists)
- Search functionality across all content
- SEO optimization

**Agent division:**
- Claude Code: content schema, search implementation, SEO, data layer
- Antigravity: bulk page generation, content formatting, parallel section builds

---

### Phase 3 — The Mind (Sage)
**Goal:** An AI chatbot deeply rooted in the project's knowledge corpus. Not a general assistant — a philosophical guide in the spirit of self-inquiry.

**Sage's character:**
- Named Sage. No last name. No corporate personality.
- Responds in the tradition of Socratic and Vedantic dialogue — it does not just *answer*, it *inquires back*
- Example: User asks "What is consciousness?" → Sage answers with substance, then asks: "And who is the one asking this question right now?"
- Trained on: Nisargadatta's "I Am That", "Who Am I?" (Ramana), Ashtavakra Gita, Upanishads, Mandukya Karika, selected neuroscience papers, Kastrup's works, Hoffman's papers, Faggin's "Irreducible"

**Technical architecture:**
- RAG pipeline: LangChain + pgvector (Supabase) for document retrieval
- Model: Claude API (Anthropic) — claude-sonnet-4-6 for responses, with a carefully crafted system prompt that gives Sage its voice
- Document ingestion: PDFs + text files processed into chunked vector embeddings
- Context window management: sliding window with summarization for long conversations
- Rate limiting: essential before public launch

**Monetization & auth (required before Sage goes public):**
- Authentication: Supabase Auth (email/password + Google OAuth)
- Subscription tiers:
  - Free: Limited Sage queries per day (e.g. 10/day), full access to static content
  - Seeker (paid): Unlimited Sage, advanced reading lists, downloadable resources
- Payment: Stripe integration
- This phase cannot launch publicly without auth + billing infrastructure

**Agent division:**
- Claude Code: RAG pipeline, system prompt engineering for Sage, Stripe integration, auth flows
- Antigravity: UI for chat interface, subscription page components, onboarding flow

---

### Phase 4 — The Living Tree
**Goal:** Ongoing maintenance, community, and expansion.

**Potential additions:**
- Community discussion (per-section commenting or forum)
- User-submitted reading recommendations (moderated)
- Regular content updates (new thinkers, new research papers)
- Multilingual support (Sanskrit terms with transliteration, potentially Hindi)
- Podcast or audio integration (talks by featured thinkers)

---

## Agent Division of Labour — Principles

### Claude Code (Sonnet 4.6) — The Architect
Best for tasks requiring depth, judgment, and continuity:
- System architecture decisions
- Complex component logic (Three.js tree, RAG pipeline, auth flows)
- Content structure and knowledge graph design
- Code review and integration of Antigravity-generated components
- Writing Sage's system prompt (requires philosophical depth + technical precision)
- Debugging complex issues

### Antigravity 2.0 (Gemini Flash 3.5) — The Builder
Best for tasks requiring speed, parallelism, and volume:
- Generating multiple page templates simultaneously
- Boilerplate: form components, cards, navigation elements
- Bulk content page creation from a defined schema
- CSS/Tailwind styling passes
- Running multiple sub-agents on different sections in parallel
- Repetitive tasks: creating 20 thinker profile pages from a template

### Workflow principle
Design and architect in Claude Code → build in Antigravity → review and integrate in Claude Code.
For complex tasks (Sage, tree animation), stay in Claude Code throughout.
For volume tasks (content pages, UI components), delegate to Antigravity.

---

## Folder Structure (Recommended)

```
tree-of-truth/
├── TREE_OF_TRUTH_PROJECT.md     ← This document
├── CONTENT_MAP.md               ← Detailed content outline (Phase 0 output)
├── app/                         ← Next.js App Router
│   ├── page.tsx                 ← Homepage (tree)
│   ├── roots/
│   │   ├── vedanta/
│   │   ├── buddhism/
│   │   ├── inquiry/
│   │   └── ...
│   ├── branches/
│   │   ├── neuroscience/
│   │   ├── panpsychism/
│   │   └── ...
│   ├── leaves/
│   │   └── [thinker]/
│   ├── fruit/
│   └── sage/
├── components/
│   ├── tree/                    ← Three.js tree components
│   ├── navigation/
│   ├── sage/                    ← Chatbot UI
│   └── ui/
├── content/                     ← MDX content files
│   ├── roots/
│   ├── branches/
│   ├── leaves/
│   └── fruit/
├── corpus/                      ← Sage knowledge documents (PDFs, text)
│   ├── vedanta/
│   ├── neuroscience/
│   └── philosophy/
├── lib/
│   ├── rag/                     ← LangChain RAG pipeline
│   ├── auth/
│   └── db/
└── public/
    ├── fonts/
    └── assets/
```

---

## Guiding Principles for Development

1. **Depth over breadth.** One beautifully complete section is worth more than ten shallow ones. Don't rush to fill all branches — build what exists with full integrity.

2. **The tree is the experience.** Every design decision should ask: does this make the tree feel more alive, more navigable, more meaningful? The tree is not a gimmick — it is the argument.

3. **No spiritual bypass.** This project takes both science and ancient wisdom seriously. It does not soften Vedanta into wellness content, nor reduce consciousness science to pop neuroscience. Full depth, always.

4. **Sage must earn its questions.** Every response from Sage should either answer with substance or ask back with wisdom — ideally both. A chatbot that only asks questions without substance is annoying. A chatbot that only answers without inquiry misses the whole point.

5. **Content before code.** Every phase should begin with a content review. Shipping a beautiful empty page is worse than shipping a plain full one.

6. **The intersection is the point.** This project is not "science vs. spirituality." It is the demonstration that the most rigorous scientific inquiry into consciousness and the most rigorous contemplative inquiry into awareness are circling the same emptiness from opposite sides.

---

## Phase 0 Immediate Next Steps

Before any code is written, the following must be completed:

- [ ] Write `CONTENT_MAP.md` — detailed content outline for every section (suggested questions, traditions covered, thinkers referenced, reading list)
- [ ] Define the 20 thinker profiles — agree on who is in Phase 2 vs. later
- [ ] Map the navigation paths — how does a user who enters via "What is consciousness?" reach Nisargadatta? How does someone who enters via "Ramana Maharshi" reach Donald Hoffman?
- [ ] Define the Sage corpus — finalize the Phase 3 document list
- [ ] Agree on the tree's visual structure — how many first-level branches? What are their exact names?
- [ ] Select the Phase 1 proof-of-concept section (recommended: Advaita Vedanta root)

---

*Document version: 1.0 — Phase 0*
*To be updated at the close of each phase.*
