import type { Game } from "./types";

const SITE_URL = "https://yonoworld.xyz";
const API = process.env.NEXT_PUBLIC_API_URL || "https://api.yonoworld.xyz/api";

export default async function sitemap() {
  let apps: Game[] = [];
  try {
    const res = await fetch(`${API}/get-all-game`, { next: { revalidate: 60 } });
    const data = await res.json();
    apps = (data.data || []).filter(Boolean);
  } catch {
    apps = [];
  }

  const appUrls = apps.map((app) => ({
    url: `${SITE_URL}/${app.slug}`,
    lastModified: app.createdAt ? new Date(app.createdAt) : new Date("2025-01-01"),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/all-yono-games`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
    ...appUrls,
  ];
}
