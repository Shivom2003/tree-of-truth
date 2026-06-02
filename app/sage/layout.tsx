import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dialogue with the Sage — Tree of Truth",
  description: "Engage in direct dialogue and philosophical inquiry with our contemplative AI Sage, drawing from Nisargadatta Maharaj and the Ashtavakra Gita.",
  openGraph: {
    title: "Dialogue with the Sage — Tree of Truth",
    description: "Engage in direct dialogue and philosophical inquiry with our contemplative AI Sage.",
    type: "website",
  },
};

export default function SageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
