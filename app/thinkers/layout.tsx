import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sages & Scientists — Thinker Leaves | Tree of Truth",
  description: "Explore profiles and lineages of the great minds spanning science, philosophy of mind, and non-dual traditions—from Shankaracharya and Gautama Buddha to David Chalmers, Donald Hoffman, and Bernardo Kastrup.",
  openGraph: {
    title: "Sages & Scientists — Thinker Leaves | Tree of Truth",
    description: "Explore profiles and lineages of the great minds spanning science, philosophy of mind, and non-dual traditions.",
    type: "website",
  },
};

export default function ThinkersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
