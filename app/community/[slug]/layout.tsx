import type { Metadata } from "next";
import { SEED_COMMUNITIES } from "@/lib/data/communities";

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || "";

  const data = SEED_COMMUNITIES.find((c) => c.slug === slug);
  if (!data) {
    return {
      title: "Community Forum — Tree of Truth",
    };
  }

  return {
    title: `${data.name} Forum — Seeker Circle | Tree of Truth`,
    description: data.description,
    openGraph: {
      title: `${data.name} Forum — Seeker Circle | Tree of Truth`,
      description: data.description,
    },
  };
}

export default function CommunitySlugLayout({ children }: Props) {
  return <>{children}</>;
}
