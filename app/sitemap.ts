import type { MetadataRoute } from "next";
import { ROOTS_DATA, BRANCHES_DATA, FRUITS_DATA, THINKERS_DATA } from "@/lib/contentData";
import { SEED_COMMUNITIES } from "@/lib/data/communities";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://science-of-truth.vercel.app";

  // Static routes
  const staticRoutes = [
    "",
    "/sage",
    "/thinkers",
    "/library",
    "/paths",
    "/community",
    "/roots",
    "/branches",
    "/fruit",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic root pages
  const rootRoutes = Object.keys(ROOTS_DATA).map((key) => ({
    url: `${baseUrl}/roots/${key}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Dynamic branch pages
  const branchRoutes = Object.keys(BRANCHES_DATA).map((key) => ({
    url: `${baseUrl}/branches/${key}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Dynamic fruit pages
  const fruitRoutes = Object.keys(FRUITS_DATA).map((key) => ({
    url: `${baseUrl}/fruit/${key}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Dynamic thinker profile leaves
  const thinkerRoutes = Object.keys(THINKERS_DATA).map((key) => ({
    url: `${baseUrl}/leaves/${key}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Dynamic community category pages
  const communityRoutes = SEED_COMMUNITIES.map((c) => ({
    url: `${baseUrl}/community/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...rootRoutes,
    ...branchRoutes,
    ...fruitRoutes,
    ...thinkerRoutes,
    ...communityRoutes,
  ];
}

