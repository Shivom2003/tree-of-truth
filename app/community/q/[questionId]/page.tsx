"use client";

// app/community/q/[questionId]/page.tsx
// Dynamic redirect resolver: Maps /community/q/[questionId] to /community/[slug]/q/[questionId]
// by looking up the question doc and its community slug.

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { SEED_COMMUNITIES } from "@/lib/data/communities";
import { Loader2 } from "lucide-react";

export default function QuestionRedirectPage() {
  const { questionId } = useParams<{ questionId: string }>();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!questionId) return;

    const resolveRedirect = async () => {
      try {
        const questionDoc = await getDoc(doc(db, "questions", questionId));
        if (!questionDoc.exists()) {
          setError("Discussion not found.");
          return;
        }

        const data = questionDoc.data();
        const communityIds = (data.communityIds || []) as string[];
        
        if (communityIds.length === 0) {
          setError("This discussion is not associated with any community.");
          return;
        }

        // Map first community ID to its slug
        const primaryCommunity = SEED_COMMUNITIES.find((c) => c.id === communityIds[0]);
        const slug = primaryCommunity?.slug ?? communityIds[0];

        // Redirect to `/community/[slug]/q/[questionId]`
        router.replace(`/community/${slug}/q/${questionId}`);
      } catch (err: unknown) {
        console.error("Redirect error:", err);
        setError("An error occurred while loading the discussion.");
      }
    };

    resolveRedirect();
  }, [questionId, router]);

  if (error) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-center p-6" style={{ backgroundColor: "#05060b" }}>
        <p className="text-red-400 font-mono text-sm mb-4">{error}</p>
        <button
          onClick={() => router.replace("/community")}
          className="px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-widest transition-all duration-200"
          style={{
            background: "rgba(212,175,55,0.1)",
            border:     "1px solid rgba(212,175,55,0.25)",
            color:      "#d4af37",
          }}
        >
          Back to Discussions
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: "#05060b" }}>
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-gold-matte/30" />
        <p className="text-gold-matte/50 font-mono text-xs uppercase tracking-widest animate-pulse">
          Resolving discussion path...
        </p>
      </div>
    </main>
  );
}
