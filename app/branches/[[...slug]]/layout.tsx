import type { Metadata } from "next";
import { BRANCHES_DATA } from "@/lib/contentData";

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
      title: "Scientific Branches of Inquiry — Tree of Truth",
      description: "Investigate scientific and analytical formulations of consciousness, including neuroscience, philosophy of mind, cognitive science, quantum theories, and AI.",
      openGraph: {
        title: "Scientific Branches of Inquiry — Tree of Truth",
        description: "Investigate scientific and analytical formulations of consciousness.",
      },
    };
  }

  const data = BRANCHES_DATA[key];
  if (!data) {
    return {
      title: "Branch Layer — Tree of Truth",
    };
  }

  const cleanDescription = data.scope ? data.scope.split("\n")[0] : data.question;

  return {
    title: `${data.title} — Scientific Branches | Tree of Truth`,
    description: cleanDescription,
    openGraph: {
      title: `${data.title} — Scientific Branches | Tree of Truth`,
      description: cleanDescription,
    },
  };
}

export default function BranchesLayout({ children }: Props) {
  return <>{children}</>;
}
