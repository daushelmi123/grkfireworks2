import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailPage from "@/components/pages/ProductDetailPage";
import { getProduct, products, productName, categoryLabel } from "@/lib/products";
import { pageMeta } from "@/lib/seo";

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const p = getProduct(id);
  if (!p) return { title: "Produk Tidak Ditemui" };
  const name = productName(p, "ms");
  return {
    ...pageMeta(
      "ms",
      `/product/${id}`,
      `${name} - ${p.price} | GRK Fireworks`,
      `${name} (${categoryLabel(p.category, "ms")}) pada harga borong ${p.price}. Bunga api 100% sah dari GRK Malaysia.`
    ),
    openGraph: { images: [{ url: p.imageUrl }] },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();
  return <ProductDetailPage lang="ms" product={product} />;
}
