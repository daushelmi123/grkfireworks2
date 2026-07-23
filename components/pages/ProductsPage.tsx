import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/products/ProductGrid";
import { getDict } from "@/lib/dict";
import { products, categories, productName } from "@/lib/products";
import { urlFor, type Lang } from "@/lib/seo";

export default function ProductsPage({ lang }: { lang: Lang }) {
  const dict = getDict(lang);
  const t = dict.products;

  // ItemList JSON-LD — bantu Google faham katalog (had 30 untuk saiz page)
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: products.length,
    itemListElement: products.slice(0, 30).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: urlFor(lang, `/product/${p.id}`),
      name: productName(p, lang),
    })),
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemList).replace(/</g, "\\u003c"),
        }}
      />
      <Header lang={lang} dict={dict} />
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">{t.h1}</h1>
          <p className="text-muted-foreground">{t.sub}</p>
        </div>
        <ProductGrid
          lang={lang}
          products={products}
          categories={categories}
          labels={{ all: t.all, searchPh: t.searchPh, empty: t.empty }}
        />
      </section>
      <Footer dict={dict} />
    </div>
  );
}
