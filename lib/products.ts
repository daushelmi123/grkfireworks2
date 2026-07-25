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

/**
 * Deskripsi generik per kategori (bilingual). Bukan spesifik setiap produk,
 * tapi tepat untuk jenis bunga api tersebut + rangka borong/legal GRK.
 * Digunakan pada page produk (paparan + schema description).
 */
const categoryDescriptions: Record<string, { en: string; ms: string }> = {
  sparklers: {
    en: "Handheld sparklers that burn with bright, crackling light — a festive favourite that's safe and easy for the whole family, from weddings to Deepavali. Supplied by GRK at wholesale prices, 100% legal with PDRM permits.",
    ms: "Lilin bunga api pegang tangan yang menyala terang dan berkilauan — pilihan popular yang selamat dan mudah untuk seluruh keluarga, dari majlis kahwin hingga Deepavali. Dibekalkan GRK pada harga borong, 100% sah dengan permit PDRM.",
  },
  "Pop-Pop": {
    en: "Throw-down snappers (pop-pop) that crackle on impact — one of the safest, child-friendly novelties, perfect for celebrations of any age. Available by carton at GRK wholesale prices, fully licensed.",
    ms: "Pop-pop yang meletup bila dihentak — antara novelti paling selamat dan mesra kanak-kanak, sesuai untuk perayaan semua peringkat umur. Tersedia secara borong pada harga GRK, berlesen penuh.",
  },
  kids: {
    en: "Low-noise, child-friendly fireworks designed for safe fun — colourful ground effects and sparkling novelties that light up any celebration. GRK wholesale supply, 100% legal for resale during festive seasons.",
    ms: "Bunga api mesra kanak-kanak berbunyi rendah yang direka untuk keseronokan selamat — kesan tanah berwarna-warni dan novelti berkilauan yang menyerikan perayaan. Bekalan borong GRK, 100% sah untuk jualan semula musim perayaan.",
  },
  fountains: {
    en: "Ground fountains that shoot a rich cascade of coloured sparks upward — a stunning centrepiece for weddings, festivals and grand openings. Supplied by GRK in wholesale cartons, fully PDRM-licensed.",
    ms: "Air pancut tanah yang menyembur pancutan percikan berwarna ke atas — pusat tumpuan menakjubkan untuk majlis kahwin, perayaan dan majlis perasmian. Dibekalkan GRK secara borong, berlesen penuh PDRM.",
  },
  "single-shots": {
    en: "Single-shot tubes that fire one powerful burst into the sky — simple to use and ideal for building custom displays. GRK wholesale pricing, 100% legal with proper permits.",
    ms: "Tiub single-shot yang menembak satu letupan kuat ke langit — mudah digunakan dan sesuai untuk membina paparan tersendiri. Harga borong GRK, 100% sah dengan permit yang betul.",
  },
  rockets: {
    en: "Sky rockets that launch high before bursting into brilliant colour and sound — a classic showstopper for major celebrations. Available by carton at GRK wholesale prices, fully licensed for resale.",
    ms: "Roket yang melancar tinggi sebelum meletup dengan warna dan bunyi yang menakjubkan — persembahan klasik untuk perayaan besar. Tersedia secara borong pada harga GRK, berlesen penuh untuk jualan semula.",
  },
  "red-dragon": {
    en: "Traditional Red Dragon firecracker strings that deliver the loud, rapid crackle synonymous with Chinese New Year and temple celebrations. Supplied by GRK at wholesale prices, 100% legal with PDRM permits.",
    ms: "Rentetan mercun Red Dragon tradisional yang menghasilkan letupan pantas dan kuat sinonim dengan Tahun Baru Cina dan perayaan tokong. Dibekalkan GRK pada harga borong, 100% sah dengan permit PDRM.",
  },
  "merdeka-fireworks": {
    en: "Multi-shot celebration cakes that fire a sequenced barrage of aerial effects — the grand finale for Merdeka, weddings and festive displays. GRK wholesale supply by carton, fully PDRM-licensed for resellers.",
    ms: "Kek perayaan multi-tembakan yang menembak siri kesan udara berturutan — kemuncak untuk Merdeka, majlis kahwin dan paparan perayaan. Bekalan borong GRK secara peti, berlesen penuh PDRM untuk penjual semula.",
  },
};

export function productDescription(p: Product, lang: "en" | "ms"): string {
  const base = categoryDescriptions[p.category]?.[lang];
  if (base) return base;
  return lang === "ms"
    ? "Bunga api berkualiti dibekalkan GRK pada harga borong, 100% sah dengan permit PDRM."
    : "Quality fireworks supplied by GRK at wholesale prices, 100% legal with PDRM permits.";
}
