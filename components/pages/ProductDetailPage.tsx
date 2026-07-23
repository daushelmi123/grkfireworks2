import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getDict } from "@/lib/dict";
import { WHATSAPP, pathFor, urlFor, breadcrumbJsonLd, type Lang } from "@/lib/seo";
import { categoryLabel, productName, type Product } from "@/lib/products";

export default function ProductDetailPage({
  lang,
  product,
}: {
  lang: Lang;
  product: Product;
}) {
  const dict = getDict(lang);
  const t = dict.product;
  const name = productName(product, lang);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    image: product.imageUrl,
    category: categoryLabel(product.category, "en"),
    offers: {
      "@type": "Offer",
      price: product.price.replace(/[^\d.]/g, ""),
      priceCurrency: "MYR",
      availability: "https://schema.org/InStock",
    },
  };
  const crumbs = breadcrumbJsonLd([
    { name: dict.nav.home, url: urlFor(lang, "/") },
    { name: dict.nav.products, url: urlFor(lang, "/products") },
    { name, url: urlFor(lang, `/product/${product.id}`) },
  ]);

  const waText = encodeURIComponent(
    lang === "ms"
      ? `Hi GRK, saya nak tanya pasal produk: ${name} (${product.price})`
      : `Hi GRK, I'd like to ask about: ${name} (${product.price})`
  );

  return (
    <div className="flex flex-col min-h-screen">
      {[productSchema, crumbs].map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(d).replace(/</g, "\\u003c"),
          }}
        />
      ))}
      <Header lang={lang} dict={dict} />

      <section className="container mx-auto px-4 py-10 max-w-5xl">
        <Link
          href={pathFor(lang, "/products")}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> {t.back}
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative aspect-square bg-card border border-line rounded-2xl overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={name}
              fill
              sizes="(max-width:768px) 100vw, 500px"
              className="object-contain"
              priority
            />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
              {t.category}: {categoryLabel(product.category, lang)}
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">{name}</h1>
            <p className="text-sm text-muted-foreground mb-1">{t.price}</p>
            <p className="text-3xl font-bold text-gold mb-8">{product.price}</p>

            <a
              href={`${WHATSAPP}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-gold text-gold-foreground font-bold px-8 py-4 rounded-xl hover:brightness-110 mb-2"
            >
              {t.cta}
            </a>
            <p className="text-xs text-muted-foreground text-center">{t.ctaSub}</p>
          </div>
        </div>

        {product.videoUrl && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">{t.video}</h2>
            <video
              src={product.videoUrl}
              controls
              preload="metadata"
              playsInline
              className="w-full max-w-2xl mx-auto rounded-2xl border border-line bg-black"
            />
          </div>
        )}
      </section>

      <Footer dict={dict} />
    </div>
  );
}
