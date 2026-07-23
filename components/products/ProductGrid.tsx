"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { categoryLabel, productName, type Product } from "@/lib/products";
import { pathFor, type Lang } from "@/lib/seo";

export default function ProductGrid({
  lang,
  products,
  categories,
  labels,
}: {
  lang: Lang;
  products: Product[];
  categories: string[];
  labels: { all: string; searchPh: string; empty: string };
}) {
  const [cat, setCat] = useState<string>("");
  const [q, setQ] = useState("");

  const shown = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return products.filter(
      (p) =>
        (!cat || p.category === cat) &&
        (!ql ||
          p.nameEn.toLowerCase().includes(ql) ||
          p.nameMs.toLowerCase().includes(ql))
    );
  }, [products, cat, q]);

  return (
    <div>
      <div className="relative max-w-md mx-auto mb-6">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={labels.searchPh}
          className="w-full bg-card border border-line rounded-xl pl-10 pr-4 py-3 text-sm focus:border-gold outline-none"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button
          onClick={() => setCat("")}
          className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors ${
            !cat ? "bg-gold text-gold-foreground border-gold" : "border-line text-gray-300 hover:border-gold"
          }`}
        >
          {labels.all} ({products.length})
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c === cat ? "" : c)}
            className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors ${
              cat === c ? "bg-gold text-gold-foreground border-gold" : "border-line text-gray-300 hover:border-gold"
            }`}
          >
            {categoryLabel(c, lang)} ({products.filter((p) => p.category === c).length})
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="text-center text-muted-foreground py-16">{labels.empty}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {shown.map((p) => (
            <Link
              key={p.id}
              href={pathFor(lang, `/product/${p.id}`)}
              className="bg-card border border-line rounded-2xl overflow-hidden hover:border-gold transition-colors group"
            >
              <div className="relative aspect-square bg-black">
                <Image
                  src={p.imageUrl}
                  alt={productName(p, lang)}
                  fill
                  sizes="(max-width:768px) 50vw, 280px"
                  className="object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-3.5">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
                  {categoryLabel(p.category, lang)}
                </p>
                <h3 className="font-semibold text-sm leading-snug mb-1.5">
                  {productName(p, lang)}
                </h3>
                <p className="text-gold font-bold text-sm">{p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
