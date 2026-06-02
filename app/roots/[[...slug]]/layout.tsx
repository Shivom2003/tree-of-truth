import type { Metadata } from "next";
import { ROOTS_DATA } from "@/lib/contentData";

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
      title: "Contemplative Roots of Wisdom — Tree of Truth",
      description: "Explore the ancient contemplative and philosophical roots of non-dual wisdom: Vedanta, Buddhism, Phenomenology, and direct self-inquiry.",
      openGraph: {
        title: "Contemplative Roots of Wisdom — Tree of Truth",
        description: "Explore the ancient contemplative and philosophical roots of non-dual wisdom.",
      },
    };
  }

  const data = ROOTS_DATA[key];
  if (!data) {
    return {
      title: "Root Layer — Tree of Truth",
    };
  }

  const cleanDescription = data.scope ? data.scope.split("\n")[0] : data.question;

  return {
    title: `${data.title} — Contemplative Roots | Tree of Truth`,
    description: cleanDescription,
    openGraph: {
      title: `${data.title} — Contemplative Roots | Tree of Truth`,
      description: cleanDescription,
    },
  };
}

export default function RootsLayout({ children }: Props) {
  return <>{children}</>;
}
