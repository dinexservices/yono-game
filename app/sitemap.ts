import type { Game } from "./types";

const SITE_URL = "https://www.yonoworld.xyz";
const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api.allyonoogames.com/api";

// ✅ Cache sitemap for 1 hour (VERY IMPORTANT)
export const revalidate = 3600;

// ✅ Timeout-safe fetch
async function fetchWithTimeout(url: string, timeout = 4000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 60 },
    });

    clearTimeout(id);

    if (!res.ok) throw new Error("API failed");

    return res.json();
  } catch (error) {
    clearTimeout(id);
    console.warn("Sitemap API failed:", error);
    return { data: [] }; // ✅ fallback so sitemap still works
  }
}

export default async function sitemap() {
  let apps: Game[] = [];

  try {
    const data = await fetchWithTimeout(`${API}/get-all-game`, 4000);
    apps = (data.data || []).filter(Boolean);
  } catch {
    apps = [];
  }

  const appUrls = apps.map((app) => ({
    url: `${SITE_URL}/${app.slug}`,
    lastModified: app.createdAt
      ? new Date(app.createdAt)
      : new Date("2025-01-01"),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    // ✅ Main pages
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

    // ✅ Dynamic pages
    ...appUrls,
  ];
}