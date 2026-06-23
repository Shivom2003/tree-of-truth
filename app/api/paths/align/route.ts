// app/api/paths/align/route.ts
// Handles the dynamic path alignment questionnaire processing and path generation.

import { NextRequest, NextResponse } from "next/server";
import { getGeminiModel, genAI, DEFAULT_MODEL } from "@/lib/gemini";

// Whitelisted paths in our app that the LLM must choose from
const WHITELISTED_PATHS = [
  { name: "The Trunk (Pure Awareness)", path: "/trunk" },
  { name: "Advaita Vedanta (Roots - R1)", path: "/roots/vedanta" },
  { name: "Direct Self-Inquiry (Roots - R3)", path: "/roots/inquiry" },
  { name: "Neuroscience & Brain (Branches - B1)", path: "/branches/neuroscience" },
  { name: "Philosophy of Mind & Hard Problem (Branches - B2)", path: "/branches/philosophy" },
  { name: "Panpsychism & Analytical Idealism (Branches - B5)", path: "/branches/panpsychism" },
  { name: "Ramana Maharshi (Sage Leaf)", path: "/leaves/ramana" },
  { name: "Bernardo Kastrup (Thinker Leaf)", path: "/leaves/kastrup" },
  { name: "Federico Faggin (Thinker Leaf)", path: "/leaves/faggin" },
  { name: "Dr. Alok Kanojia (Thinker Leaf)", path: "/leaves/kanojia" },
  { name: "Swami Vivekananda (Thinker Leaf)", path: "/leaves/vivekananda" },
  { name: "Sri Aurobindo (Thinker Leaf)", path: "/leaves/aurobindo" },
  { name: "Yoga Paths (Fruit - F1)", path: "/fruit/yoga" },
  { name: "Meditation Portal (Fruit - F5)", path: "/fruit/meditation" },
  { name: "Contemplative Journaling (Fruit - F9)", path: "/fruit/journaling" },
  { name: "Psychedelics & Mind (Fruit - F6)", path: "/fruit/psychedelics" },
  { name: "Fruit Harvest Portal", path: "/fruit" },
];

interface UserAnswer {
  questionText: string;
  selectedOptionText: string;
  orientation: "seeker" | "scientific" | "contemplative" | "practical";
}

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json();

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json({ error: "Invalid or missing answers." }, { status: 400 });
    }

    // 1. Calculate the dominant orientation
    const tallies = { seeker: 0, scientific: 0, contemplative: 0, practical: 0 };
    answers.forEach((ans: UserAnswer) => {
      if (ans.orientation in tallies) {
        tallies[ans.orientation]++;
      }
    });

    let dominantOrientation: "seeker" | "scientific" | "contemplative" | "practical" = "seeker";
    let maxCount = -1;
    for (const key in tallies) {
      const orientationKey = key as "seeker" | "scientific" | "contemplative" | "practical";
      if (tallies[orientationKey] > maxCount) {
        maxCount = tallies[orientationKey];
        dominantOrientation = orientationKey;
      }
    }

    // 2. Build the questionnaire transcript
    const transcript = answers
      .map((ans: UserAnswer, idx: number) => `Q${idx + 1}: ${ans.questionText}\nSelected Option: ${ans.selectedOptionText} (Orientation: ${ans.orientation})`)
      .join("\n\n");

    const model = getGeminiModel();

    const generatorPrompt = `
You are the Path Finder. Based on the following questionnaire transcript, construct a custom philosophical/spiritual alignment path for the user.

User Responses Transcript:
${transcript}

Primary Detected Orientation: ${dominantOrientation.toUpperCase()}
(Orientations Tally: Seeker: ${tallies.seeker}, Scientific: ${tallies.scientific}, Contemplative: ${tallies.contemplative}, Practical: ${tallies.practical})

Whitelisted App Paths:
${JSON.stringify(WHITELISTED_PATHS, null, 2)}

Instructions for Path Generation:
1. Select exactly 4 or 5 steps from the Whitelisted App Paths.
2. Order them logically based on the user's primary orientation:
   - For 'scientific': Start with branches like /branches/neuroscience or /branches/philosophy before guiding them to deep roots or fruits.
   - For 'seeker': Focus heavily on Direct Self-Inquiry (/roots/inquiry), Advaita Vedanta (/roots/vedanta), and Ramana Maharshi (/leaves/ramana).
   - For 'contemplative': Focus on Meditation (/fruit/meditation), The Trunk (/trunk), or Advaita Vedanta.
   - For 'practical': Include structured yoga (/fruit/yoga), journaling (/fruit/journaling), and specific thinkers. If the user leans towards neuropharmacology or chemistry, you may also include psychedelics (/fruit/psychedelics).
3. The response must be a single valid JSON object matching the following structure:
{
  "title": "A personalized title for the path (e.g., 'The Empirical Idealist Pathway')",
  "subtitle": "A one-sentence summary of the alignment",
  "description": "A 2-3 sentence paragraph explaining why this path was aligned to them, referencing details/themes from their selected answers.",
  "icon": "${dominantOrientation}",
  "steps": [
    {
      "title": "Step label matching the chosen whitelist node (e.g. 'Neuroscience & Brain (Branches - B1)')",
      "desc": "Custom instruction explaining why they should study this and how it addresses their specific mindset and selections.",
      "path": "Must be the exact path string from the whitelist (e.g. '/branches/neuroscience')"
    }
  ],
  "bridgeText": "A profound quote or summary pointer bridging their initial viewpoint with non-dual realization (under 30 words).",
  "destination": "A description of the ultimate experiential realization point of their path."
}

Return ONLY the raw JSON object. Do not include markdown code block backticks (like \`\`\`json) or any preamble.
`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: generatorPrompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.4,
        maxOutputTokens: 8192,
      },
    });

    const responseText = result.response.text().trim();
    
    // Clean potential markdown blocks
    let cleanText = responseText;
    if (cleanText.startsWith("```")) {
      cleanText = cleanText.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
    }

    try {
      const parsedPath = JSON.parse(cleanText);
      return NextResponse.json(parsedPath);
    } catch (parseErr) {
      console.error("[api/paths/align] JSON parsing error. Raw response text was:", responseText);
      throw parseErr;
    }

  } catch (err: unknown) {
    console.error("[api/paths/align]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
