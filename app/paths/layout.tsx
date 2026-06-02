import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inquiry Alignment Path Finder — Tree of Truth",
  description: "Assess your current background, interests, and temperament to discover a customized path guiding you through the scientific, philosophical, and contemplative branches of truth.",
  openGraph: {
    title: "Inquiry Alignment Path Finder — Tree of Truth",
    description: "Assess your current background, interests, and temperament to discover a customized path.",
    type: "website",
  },
};

export default function PathsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
