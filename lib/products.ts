import productsData from "@/data/products.json";

export interface Product {
  id: string;
  category: string;
  nameEn: string;
  nameMs: string;
  price: string;
  imageUrl: string;
  videoUrl: string;
}

export const products: Product[] = productsData as Product[];

export const categories = [...new Set(products.map((p) => p.category))];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function productName(p: Product, lang: "en" | "ms"): string {
  return lang === "ms" ? p.nameMs : p.nameEn;
}

/** Label kategori mesra pengguna. */
export const categoryLabels: Record<string, { en: string; ms: string }> = {
  sparklers: { en: "Sparklers", ms: "Lilin Bunga Api" },
  "Pop-Pop": { en: "Pop-Pop", ms: "Pop-Pop" },
  kids: { en: "Kids Fireworks", ms: "Bunga Api Kanak-kanak" },
  fountains: { en: "Fountains", ms: "Air Pancut" },
  "single-shots": { en: "Single Shots", ms: "Single Shot" },
  rockets: { en: "Rockets", ms: "Roket" },
  "red-dragon": { en: "Red Dragon", ms: "Red Dragon" },
  "merdeka-fireworks": { en: "Celebration Cakes", ms: "Kek Perayaan" },
};

export function categoryLabel(cat: string, lang: "en" | "ms"): string {
  return categoryLabels[cat]?.[lang] ?? cat;
}
