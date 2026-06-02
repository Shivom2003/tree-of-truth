import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seeker Circle Community Forum — Tree of Truth",
  description: "Join the Seeker Circle to connect with other practitioners, share insights, discuss non-duality and physics, and participate in collaborative contemplation.",
  openGraph: {
    title: "Seeker Circle Community Forum — Tree of Truth",
    description: "Join the Seeker Circle to connect with other practitioners, share insights, and discuss non-duality and physics.",
    type: "website",
  },
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
