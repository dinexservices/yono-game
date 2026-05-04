import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/static/"],
      },
    ],
    sitemap: "https://yonoworld.xyz/sitemap.xml",
    host: "https://yonoworld.xyz",
  };
}
