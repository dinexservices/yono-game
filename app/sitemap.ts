import { apps } from "./data/apps";

const SITE_URL = "https://www.allyonoogames.com";

export default function sitemap() {
  const appUrls = apps.map((app) => ({
    url: `${SITE_URL}/app/${app.slug}`,
    lastModified: new Date(),
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
