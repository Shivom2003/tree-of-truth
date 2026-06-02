import type { Metadata } from "next";
import { FRUITS_DATA } from "@/lib/contentData";

type Props = {
  params: Promise<{ slug?: string[] }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slugArr = resolvedParams.slug || [];
  const key = slugArr.join("/");

  if (slugArr.length === 0) {
    return {
      title: "Practices & Realizations — Fruit of Truth",
      description: "Explore the practical realizations and pathways of consciousness: Yoga, clinical meditation, reading lists, guided self-inquiry, and curated playlists.",
      openGraph: {
        title: "Practices & Realizations — Fruit of Truth",
        description: "Explore the practical realizations and pathways of consciousness.",
      },
    };
  }

  const data = FRUITS_DATA[key];
  if (!data) {
    return {
      title: "Fruit Layer — Tree of Truth",
    };
  }

  const cleanDescription = data.scope ? data.scope.split("\n")[0] : data.question;

  return {
    title: `${data.title} — Practices & Realization | Tree of Truth`,
    description: cleanDescription,
    openGraph: {
      title: `${data.title} — Practices & Realization | Tree of Truth`,
      description: cleanDescription,
    },
  };
}

export default function FruitsLayout({ children }: Props) {
  return <>{children}</>;
}
