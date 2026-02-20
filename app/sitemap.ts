import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const SITE = "https://citylawguide.com";

type CityPack = {
  slug: string;
  practice: string; // e.g. "dui"
};

// Reads all city packs from /data/cities and returns DUI URLs
function getDuiCityUrls(): { url: string; lastModified?: Date }[] {
  const dir = path.join(process.cwd(), "data", "cities");
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));

  const urls: { url: string; lastModified?: Date }[] = [];

  for (const file of files) {
    const full = path.join(dir, file);

    try {
      const raw = fs.readFileSync(full, "utf8");
      const data = JSON.parse(raw) as CityPack;

      // Only include DUI city pages for now
      if (data.practice !== "dui") continue;
      if (!data.slug) continue;

      const stat = fs.statSync(full);
      urls.push({
        url: `${SITE}/dui-lawyer/${data.slug}`,
        lastModified: stat?.mtime ? new Date(stat.mtime) : undefined,
      });
    } catch {
      // If a pack is malformed, skip it from sitemap (build will catch malformed packs elsewhere)
      continue;
    }
  }

  return urls;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/dui-lawyer`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/editorial-policy`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE}/sponsorship-disclosure`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];

  const duiCityRoutes: MetadataRoute.Sitemap = getDuiCityUrls().map((x) => ({
    url: x.url,
    lastModified: x.lastModified ?? now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...duiCityRoutes];
}