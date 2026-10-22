import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { privacy } from "@/content/privacy";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    {
      url: `${site.url}/privacy`,
      lastModified: privacy.updated,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
