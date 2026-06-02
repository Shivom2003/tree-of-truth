import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Knowledge Well — Library of Consciousness | Tree of Truth",
  description: "Browse curated research papers, academic studies, podcasts, lectures, and YouTube videos mapping the convergence of science, philosophy, and spirituality.",
  openGraph: {
    title: "Knowledge Well — Library of Consciousness | Tree of Truth",
    description: "Browse curated research papers, academic studies, podcasts, lectures, and YouTube videos.",
    type: "website",
  },
};

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
