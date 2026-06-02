import type { Metadata } from "next";
import { THINKERS_DATA } from "@/lib/contentData";

type Props = {
  params: Promise<{ thinker: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: { params: Promise<{ thinker: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const thinkerKey = (resolvedParams.thinker || "").toLowerCase();

  const data = THINKERS_DATA[thinkerKey];
  if (!data) {
    return {
      title: "Thinker Profile — Tree of Truth",
    };
  }

  const cleanDescription = `Explore ${data.name}'s era (${data.era}), core inquiry ("${data.question}"), contribution (${data.contribution.slice(0, 150)}...), and connections.`;

  return {
    title: `${data.name} — Sages & Scientists | Tree of Truth`,
    description: cleanDescription,
    openGraph: {
      title: `${data.name} — Sages & Scientists | Tree of Truth`,
      description: cleanDescription,
    },
  };
}

export default function ThinkerLayout({ children }: Props) {
  return <>{children}</>;
}
