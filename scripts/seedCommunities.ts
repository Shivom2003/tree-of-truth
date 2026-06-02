// scripts/seedCommunities.ts
// Run once to seed the 8 initial Seeker Circle communities into Firestore.
//
// Usage:
//   npx ts-node --project tsconfig.json scripts/seedCommunities.ts
//
// Prerequisites:
//   1. Set NEXT_PUBLIC_FIREBASE_* env vars in .env.local
//   2. npm install dotenv (if not already installed)

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { SEED_COMMUNITIES } from "../lib/data/communities";

const app = initializeApp({
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

const db = getFirestore(app);

async function seed() {
  console.log("🌱 Seeding Seeker Circle communities...\n");

  for (const community of SEED_COMMUNITIES) {
    const ref = doc(db, "communities", community.id);
    await setDoc(ref, {
      name:        community.name,
      slug:        community.slug,
      description: community.description,
      tagline:     community.tagline,
      icon:        community.icon,
      accentColor: community.accentColor,
      tags:        community.tags,
      createdBy:   "admin",
      createdAt:   serverTimestamp(),
      memberCount: 0,
      questionCount: 0,
    });
    console.log(`  ✓ ${community.icon}  ${community.name}`);
  }

  console.log("\n✅ All communities seeded successfully.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
