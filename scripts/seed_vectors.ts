// scripts/seed_vectors.ts
// Command-line script to chunk, batch embed, and upload the entire text corpus to Pinecone.
// Run using: npx tsx scripts/seed_vectors.ts

import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env.local
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  const envConfig = dotenv.parse(envContent);
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
}

import { getBatchEmbeddings } from "../lib/gemini";

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_INDEX_HOST = process.env.PINECONE_INDEX_HOST;
const useVertex = process.env.USE_VERTEX_AI === "true";
const projectId = process.env.GOOGLE_CLOUD_PROJECT || process.env.GCP_PROJECT_ID;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!PINECONE_API_KEY || !PINECONE_INDEX_HOST) {
  console.error("❌ Error: Missing required Pinecone environment variables in .env.local!");
  console.error("Required: PINECONE_API_KEY, PINECONE_INDEX_HOST");
  process.exit(1);
}

if (useVertex && !projectId) {
  console.error("❌ Error: USE_VERTEX_AI is true but GOOGLE_CLOUD_PROJECT / GCP_PROJECT_ID is missing in .env.local!");
  process.exit(1);
}

if (!useVertex && !GEMINI_API_KEY) {
  console.error("❌ Error: USE_VERTEX_AI is false/unset but GEMINI_API_KEY is missing in .env.local!");
  process.exit(1);
}

// Clean host URL to ensure it starts with https://
let hostUrl = PINECONE_INDEX_HOST.trim();
if (!hostUrl.startsWith("http://") && !hostUrl.startsWith("https://")) {
  hostUrl = `https://${hostUrl}`;
}

// Configuration
const CHUNK_SIZE = 4000;
const OVERLAP = 500;
const BATCH_SIZE = 100; // Batch size for batchEmbedContents (Max 100)

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Retrieve batch embeddings with retry and backoff logic
async function getBatchEmbeddingsWithRetry(texts: string[], retries = 5, delay = 4000): Promise<number[][]> {
  for (let i = 0; i < retries; i++) {
    try {
      const embeddings = await getBatchEmbeddings(texts);
      return embeddings;
    } catch (err: any) {
      const errMsg = err?.message || "";
      const isRateLimit = err?.status === 429 || errMsg.includes("429") || errMsg.includes("Quota") || errMsg.includes("Limit");
      
      if (isRateLimit && i < retries - 1) {
        const waitTime = delay * Math.pow(2, i) + Math.random() * 1000;
        console.warn(`[Vertex AI / Gemini API] Rate limited (429) on batch. Retrying in ${Math.round(waitTime)}ms (attempt ${i + 1}/${retries})...`);
        await sleep(waitTime);
      } else {
        throw err;
      }
    }
  }
  throw new Error("Failed to generate batch embeddings after multiple retries");
}

// Pinecone batch upsert helper
async function upsertToPinecone(vectors: any[]) {
  const url = `${hostUrl}/vectors/upsert`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Api-Key": PINECONE_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ vectors }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Pinecone API error: ${response.status} ${response.statusText} - ${errText}`);
  }
}

// Pinecone index clear helper
async function clearPineconeIndex() {
  console.log("🧹 Clearing existing vectors from Pinecone index...");
  const url = `${hostUrl}/vectors/delete`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Api-Key": PINECONE_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ deleteAll: true }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.warn(`⚠️ Warning: Failed to clear Pinecone index: ${response.status} - ${errText}`);
  } else {
    console.log("✅ Pinecone index cleared successfully.");
  }
}

// Main logic
async function run() {
  console.log("🚀 Starting Pinecone Vector Database Seeder (Batch-Optimized)...");
  console.log(`Index Host: ${hostUrl}`);
  
  try {
    await clearPineconeIndex();
  } catch (clearErr: any) {
    console.error("⚠️ Failed to clear Pinecone index, continuing anyway:", clearErr.message || clearErr);
  }
  
  const corpusDir = path.join(process.cwd(), "resources", "corpus");
  if (!fs.existsSync(corpusDir)) {
    console.error(`❌ Error: Corpus directory not found at ${corpusDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(corpusDir).filter(f => f.endsWith(".txt"));
  if (files.length === 0) {
    console.warn("⚠️ No .txt files found in resources/corpus!");
    return;
  }

  console.log(`Found ${files.length} corpus files to process.`);
  
  const allChunks: { id: string; text: string; source: string }[] = [];
  
  for (const file of files) {
    const filePath = path.join(corpusDir, file);
    const content = fs.readFileSync(filePath, "utf-8");
    
    let start = 0;
    let chunkIndex = 0;
    const fileIdBase = file.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
    
    while (start < content.length) {
      const chunkText = content.substring(start, start + CHUNK_SIZE).trim();
      if (chunkText.length > 50) {
        allChunks.push({
          id: `${fileIdBase}_chunk_${chunkIndex}`,
          text: chunkText,
          source: file,
        });
        chunkIndex++;
      }
      start += CHUNK_SIZE - OVERLAP;
    }
    console.log(`  - ${file}: Created ${chunkIndex} chunks`);
  }

  const totalChunks = allChunks.length;
  console.log(`\nTotal generated chunks: ${totalChunks}`);
  console.log(`Processing in batches of ${BATCH_SIZE}...`);

  let successCount = 0;

  for (let i = 0; i < totalChunks; i += BATCH_SIZE) {
    const batch = allChunks.slice(i, i + BATCH_SIZE);
    
    try {
      const texts = batch.map(c => c.text);
      const embeddings = await getBatchEmbeddingsWithRetry(texts);
      
      const vectors = batch.map((chunk, idx) => ({
        id: chunk.id,
        values: embeddings[idx],
        metadata: {
          text: chunk.text,
          source: chunk.source,
        }
      }));
      
      // Upload to Pinecone
      await upsertToPinecone(vectors);
      
      successCount += batch.length;
      const progressPercent = ((successCount / totalChunks) * 100).toFixed(1);
      console.log(`✅ Indexed ${successCount}/${totalChunks} chunks (${progressPercent}%)`);
      
      // Enforce a 6-second cooldown between batches to stay well within 15 RPM (free tier)
      await sleep(6000);

    } catch (err: any) {
      console.error(`\n❌ Error processing batch starting at index ${i}:`, err.message || err);
      console.log("Retrying this batch in 10 seconds...");
      await sleep(10000);
      i -= BATCH_SIZE; // Decrement counter to retry this batch
    }
  }

  console.log(`\n🎉 Success! Seeding completed. Indexed ${successCount} chunks to Pinecone.`);
}

run().catch(err => {
  console.error("Fatal Seeder Error:", err);
  process.exit(1);
});
