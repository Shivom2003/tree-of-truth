"use client";

import dynamic from "next/dynamic";

const HomePageClient = dynamic(() => import("@/components/tree/HomePageClient"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-[#05060b]" />
});

export default function Home() {
  return <HomePageClient />;
}
