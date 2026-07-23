import type { Metadata } from "next";
import ProductsPage from "@/components/pages/ProductsPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "ms",
  "/products",
  'Katalog Produk Bunga Api | GRK Fireworks Malaysia',
  '93 produk bunga api premium - sparklers, fountains, roket, kek perayaan. Harga borong untuk dealer, 100% sah.'
);

export default function Page() {
  return <ProductsPage lang="ms" />;
}
