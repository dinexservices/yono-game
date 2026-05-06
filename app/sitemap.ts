import type { Game } from "./types";

const SITE_URL = "https://www.yonoworld.xyz";
const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api.allyonoogames.com/api";

// ✅ force static generation
export const dynamic = "force-static";
export const revalidate = 3600;

async function getApps(): Promise<Game[]> {
  try {
    const res = await fetch(`${API}/get-all-game`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const data = await res.json();
    return (data.data || []).filter(Boolean);
  } catch {
    return [];
  }
}

export default async function sitemap() {
  // ✅ IMPORTANT: don't block if API slow
  const appsPromise = getApps();

  const staticPages = [
    {
      url: SITE_URL,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/all-yono-games`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: new Date(),
    },
  ];

  let apps: Game[] = [];

  try {
    apps = await Promise.race([
      appsPromise,
      new Promise<Game[]>((resolve) =>
        setTimeout(() => resolve([]), 3000) // ✅ HARD TIMEOUT
      ),
    ]);
  } catch {
    apps = [];
  }

  const appUrls = apps.map((app) => ({
    url: `${SITE_URL}/${app.slug}`,
    lastModified: app.createdAt
      ? new Date(app.createdAt)
      : new Date(),
  }));

  return [...staticPages, ...appUrls];
}