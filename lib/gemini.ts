import { GoogleGenAI } from "@google/genai";

const useVertex = process.env.USE_VERTEX_AI === "true";
const projectId = process.env.GOOGLE_CLOUD_PROJECT || process.env.GCP_PROJECT_ID;
const location = process.env.GOOGLE_CLOUD_LOCATION || process.env.GCP_LOCATION || "us-central1";

if (useVertex) {
  if (!projectId) {
    console.warn(
      "[Vertex AI] Warning: USE_VERTEX_AI is set to true, but GOOGLE_CLOUD_PROJECT or GCP_PROJECT_ID is not set. " +
      "API requests to /api/sage/chat and /api/paths/align will fail."
    );
  } else {
    console.log(`[Vertex AI] Initializing for project "${projectId}" in location "${location}" using Application Default Credentials.`);
  }
} else if (!process.env.GEMINI_API_KEY) {
  console.warn(
    "[Gemini] Warning: GEMINI_API_KEY is not set in environment variables and Vertex AI is disabled. " +
    "API requests to /api/sage/chat and /api/paths/align will fail."
  );
}

const serviceAccountJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
let parsedCreds: any = undefined;

if (useVertex) {
  if (projectId) {
    process.env.GOOGLE_CLOUD_PROJECT = projectId;
  }
  if (location) {
    process.env.GOOGLE_CLOUD_LOCATION = location;
  }
  if (serviceAccountJson) {
    try {
      parsedCreds = JSON.parse(serviceAccountJson);
      console.log("[Vertex AI] Using explicit Service Account credentials from environment.");
    } catch (err) {
      console.error("[Vertex AI] Failed to parse GOOGLE_APPLICATION_CREDENTIALS_JSON:", err);
    }
  }
}

// Initialize the unified SDK client
export const aiClient = useVertex
  ? new GoogleGenAI({
    vertexai: true,
    project: projectId,
    location: location,
    googleAuthOptions: parsedCreds
      ? {
        credentials: {
          client_email: parsedCreds.client_email,
          private_key: parsedCreds.private_key,
        },
      }
      : undefined,
  })
  : new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
  });

export const DEFAULT_MODEL = "gemini-2.5-flash";
export const EMBEDDING_MODEL = useVertex ? "text-embedding-004" : "gemini-embedding-2";

// Backward-compatible wrapper object mapping old SDK interfaces to unified SDK methods
export const genAI = {
  getGenerativeModel: (options: { model: string; systemInstruction?: string }) => {
    return {
      // Used in /api/paths/align/route.ts
      generateContent: async (args: { contents: Array<{ role: string; parts: Array<{ text: string }> }>; generationConfig?: any }) => {
        const promptText = args.contents[0]?.parts[0]?.text || "";
        const response = await aiClient.models.generateContent({
          model: options.model,
          contents: promptText,
          config: args.generationConfig ? {
            responseMimeType: args.generationConfig.responseMimeType,
            temperature: args.generationConfig.temperature,
            maxOutputTokens: args.generationConfig.maxOutputTokens,
          } : undefined,
        });
        return {
          response: {
            text: () => response.text || "",
          },
        };
      },
      // Used in /api/sage/chat/route.ts
      startChat: (args: { history: any[]; generationConfig?: any }) => {
        const chat = aiClient.chats.create({
          model: options.model,
          history: args.history,
          config: {
            systemInstruction: options.systemInstruction,
            temperature: args.generationConfig?.temperature,
            maxOutputTokens: args.generationConfig?.maxOutputTokens,
          },
        });
        return {
          sendMessage: async (text: string) => {
            const response = await chat.sendMessage({ message: text });
            return {
              response: {
                text: () => response.text || "",
              },
            };
          },
        };
      },
    };
  },
};

/**
 * Gets a configured model instance (backward compatible).
 */
export function getGeminiModel(modelName: string = DEFAULT_MODEL) {
  return genAI.getGenerativeModel({
    model: modelName,
  });
}

/**
 * Generates a 768-dimension vector embedding for the given text.
 */
export async function getEmbedding(text: string): Promise<number[]> {
  const response = await aiClient.models.embedContent({
    model: EMBEDDING_MODEL,
    contents: text,
  });
  if (!response.embeddings || response.embeddings.length === 0 || !response.embeddings[0].values) {
    throw new Error("Failed to generate embedding");
  }
  return response.embeddings[0].values;
}

export async function getBatchEmbeddings(texts: string[]): Promise<number[][]> {
  const response = await aiClient.models.embedContent({
    model: EMBEDDING_MODEL,
    contents: texts,
  });
  if (!response.embeddings || response.embeddings.length === 0) {
    throw new Error("Failed to generate batch embeddings");
  }
  return response.embeddings.map((e) => {
    if (!e.values) {
      throw new Error("Empty embedding returned in batch");
    }
    return e.values;
  });
}
