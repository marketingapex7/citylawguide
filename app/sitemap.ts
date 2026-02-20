import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://citylawguide.com";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      priority: 1.0,
    },
    {
      url: `${baseUrl}/editorial-policy`,
      lastModified: new Date(),
      priority: 0.3,
    },
    {
      url: `${baseUrl}/sponsorship-disclosure`,
      lastModified: new Date(),
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      priority: 0.3,
    },
    {
      url: `${baseUrl}/dui-lawyer`,
      lastModified: new Date(),
      priority: 0.6,
    },
  ];
}