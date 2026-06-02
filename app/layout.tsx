import type { Metadata } from "next";
import { Cinzel, Outfit } from "next/font/google";
import { AuthProvider } from "@/lib/auth/AuthContext";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tree of Truth — Exploring Consciousness & Reality",
  description: "A living knowledge architecture bridging ancient non-dual wisdom traditions (Advaita Vedanta, Buddhism) and modern scientific inquiry (neuroscience, quantum physics, philosophy of mind).",
  keywords: "Advaita Vedanta, Buddhism, Consciousness, Self-Inquiry, Neuroscience, Quantum Physics, Philosophy of Mind, Panpsychism, Idealism, Ramana Maharshi, Nisargadatta Maharaj, Donald Hoffman",
  authors: [{ name: "Tree of Truth Project" }],
  openGraph: {
    title: "Tree of Truth — Exploring Consciousness & Reality",
    description: "A living knowledge architecture bridging ancient non-dual wisdom and modern science.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;

  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#05060b] text-gold-light select-none selection:bg-gold-matte selection:text-cosmic-dark">
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}

