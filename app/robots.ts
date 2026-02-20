import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/clusters/",
        ],
      },
    ],
    sitemap: "https://citylawguide.com/sitemap.xml",
  };
}