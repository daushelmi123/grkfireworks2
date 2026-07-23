import type { MetadataRoute } from "next";
import { SITE_URL, urlFor } from "@/lib/seo";
import { products } from "@/lib/products";

const ROUTES: Array<{ path: string; priority: number }> = [
  { path: "/", priority: 1.0 },
  { path: "/products", priority: 0.9 },
  { path: "/wholesale", priority: 0.9 },
  { path: "/suratlantikan", priority: 0.9 },
  { path: "/permit-guide", priority: 0.8 },
  { path: "/about", priority: 0.7 },
  { path: "/testimonials", priority: 0.6 },
  { path: "/contact", priority: 0.6 },
];

function entry(path: string, priority: number): MetadataRoute.Sitemap[number] {
  return {
    url: urlFor("en", path),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority,
    alternates: {
      languages: { en: urlFor("en", path), ms: urlFor("ms", path) },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = ROUTES.map((r) => entry(r.path, r.priority));
  const productEntries = products.map((p) => entry(`/product/${p.id}`, 0.6));
  return [...staticEntries, ...productEntries];
}
