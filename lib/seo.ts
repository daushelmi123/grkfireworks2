import type { Metadata } from "next";

export const SITE_URL = "https://grkfireworks.com";
export const WHATSAPP = "https://wa.me/60137340415";

export type Lang = "en" | "ms";

/**
 * Skema URL mengekalkan struktur SPA lama (penting — canonical GSC dah betul):
 *   EN: /about          BM: /ms/about
 *   EN: /               BM: /ms
 */
export function urlFor(lang: Lang, path: string): string {
  const suffix = path === "/" ? "" : path;
  return lang === "ms" ? `${SITE_URL}/ms${suffix}` : `${SITE_URL}${suffix || "/"}`;
}

export function pathFor(lang: Lang, path: string): string {
  const suffix = path === "/" ? "" : path;
  return lang === "ms" ? `/ms${suffix}` : suffix || "/";
}

/** Metadata standard: title, description, canonical + hreflang EN<->BM. */
export function pageMeta(
  lang: Lang,
  path: string,
  title: string,
  description: string
): Metadata {
  const self = urlFor(lang, path);
  return {
    title,
    description,
    alternates: {
      canonical: self,
      languages: {
        en: urlFor("en", path),
        ms: urlFor("ms", path),
        "x-default": urlFor("en", path),
      },
    },
    openGraph: { title, description, url: self, siteName: "GRK Fireworks" },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GRK Fireworks",
    url: SITE_URL,
    telephone: "+60137340415",
    email: "info@grkfireworks.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "10, Jalan Pelepas 4/2, Taman Perindustrian Gelang Patah",
      postalCode: "81550",
      addressLocality: "Johor Bahru",
      addressRegion: "Johor",
      addressCountry: "MY",
    },
  };
}
