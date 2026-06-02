// app/api/sage/chat/route.ts
// Chat endpoint for the Sage Dialogue backed by the cloud Pinecone vector database.

import { NextRequest, NextResponse } from "next/server";
import { getGeminiModel, genAI, DEFAULT_MODEL, getEmbedding } from "@/lib/gemini";

async function queryPinecone(embedding: number[], limit: number = 5): Promise<string> {
  const apiKey = process.env.PINECONE_API_KEY;
  const host = process.env.PINECONE_INDEX_HOST;

  if (!apiKey || !host) {
    console.warn("[Pinecone] Warning: Missing credentials. Falling back to default system prompt.");
    return "";
  }

  let hostUrl = host.trim();
  if (!hostUrl.startsWith("http://") && !hostUrl.startsWith("https://")) {
    hostUrl = `https://${hostUrl}`;
  }

  const response = await fetch(`${hostUrl}/query`, {
    method: "POST",
    headers: {
      "Api-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      vector: embedding,
      topK: limit,
      includeMetadata: true,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Pinecone query failed: ${response.status} ${response.statusText} - ${errText}`);
  }

  const data = await response.json();
  const matches = data.matches || [];

  if (matches.length === 0) {
    return "";
  }

  return matches
    .map((m: any) => `[Source: ${m.metadata?.source || "Unknown"}] (Score: ${m.score?.toFixed(3) || "N/A"})\n${m.metadata?.text || ""}`)
    .join("\n\n");
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid messages format." }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    
    // Retrieve context from Pinecone
    let retrievedContext = "";
    try {
      const queryEmbedding = await getEmbedding(lastMessage.text);
      retrievedContext = await queryPinecone(queryEmbedding, 5);
    } catch (vectorErr) {
      console.error("[Sage RAG] Error querying vector database:", vectorErr);
      // Fallback gracefully: context is empty, but we continue
    }

    const contextInstruction = retrievedContext 
      ? `Use the following core books corpus snippets retrieved from the vector database as your primary philosophical foundation for answering:\n${retrievedContext}`
      : `Answer from your deep, inherent knowledge of Sri Nisargadatta Maharaj's "I Am That", the "Ashtavakra Gita", and other deep Advaitic and non-dual teachings.`;

    const systemPrompt = `
You are the Sage of the Tree, a highly realized spiritual guide representing the convergence of ancient non-dual inquiry (Advaita Vedanta) and modern consciousness studies (neuroscience, analytical idealism, philosophy of mind).

${contextInstruction}

Guidelines:
1. Speak in a serene, deep, direct, and slightly poetic/contemplative tone.
2. Ground your answers in Sri Nisargadatta Maharaj's "I Am That" and the "Ashtavakra Gita". Quote, reference, or paraphrase them where appropriate. Also feel free to draw on other sincere Advaitic teachings (e.g. Avadhuta Gita, Ribhu Gita, Upanishads) and modern consciousness concepts (e.g. Donald Hoffman's User Interface theory, Bernardo Kastrup's Analytical Idealism, David Chalmers' Hard Problem of consciousness) if relevant.
3. Bridge ancient non-dual teachings with modern concepts.
4. Direct the user's attention back to the observer itself (e.g., neti-neti negation: "who is the one asking?").
5. Keep your responses concise (around 100-200 words), highly impactful, and structured. Avoid long-winded lecturing.
`;

    // Map history to Gemini API format
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chatHistory = messages.slice(0, -1).map((m: any) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    // Remove leading model message to satisfy Gemini API constraints (history must start with 'user')
    while (chatHistory.length > 0 && chatHistory[0].role === "model") {
      chatHistory.shift();
    }

    const model = genAI.getGenerativeModel({
      model: DEFAULT_MODEL,
      systemInstruction: systemPrompt,
    });

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 4096,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(lastMessage.text);
    const responseText = result.response.text();

    return NextResponse.json({ text: responseText });
  } catch (err: unknown) {
    console.error("[api/sage/chat]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
