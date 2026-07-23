import type { Metadata } from "next";
import ProductsPage from "@/components/pages/ProductsPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "en",
  "/products",
  'Fireworks Products Catalog | GRK Fireworks Malaysia',
  '93 premium fireworks products - sparklers, fountains, rockets, celebration cakes. Wholesale prices for dealers, 100% legal.'
);

export default function Page() {
  return <ProductsPage lang="en" />;
}
