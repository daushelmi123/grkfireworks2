import Link from "next/link";
import Image from "next/image";
import { Shield, Truck, Headphones, CheckCircle2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getDict } from "@/lib/dict";
import { WHATSAPP, pathFor, type Lang } from "@/lib/seo";
import { products, categories, categoryLabel, productName } from "@/lib/products";

const TRUST_ICONS = [Shield, Truck, Headphones];

// Best sellers ikut SPA asal + tambahan popular
const BEST_IDS = ["sunset", "fountain-flower", "cili-padi", "pop-pop"];

export default function HomePage({ lang }: { lang: Lang }) {
  const dict = getDict(lang);
  const t = dict.home;
  const p = (path: string) => pathFor(lang, path);

  // Satu produk wakil setiap kategori (untuk kad kategori)
  const catCards = categories.map((c) => ({
    cat: c,
    count: products.filter((x) => x.category === c).length,
    image: products.find((x) => x.category === c)!.imageUrl,
  }));

  const best = [
    ...products.filter((x) => BEST_IDS.includes(x.id)),
    ...products.filter((x) => x.category === "merdeka-fireworks").slice(0, 4),
  ].slice(0, 8);

  return (
    <div className="flex flex-col min-h-screen">
      <Header lang={lang} dict={dict} />

      {/* Hero — fokus produk */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(236,189,22,0.15),transparent_60%)]" />
        <div className="container mx-auto px-4 py-14 md:py-20 relative text-center max-w-3xl">
          <p className="inline-block text-xs font-bold tracking-wide bg-card border border-gold/40 text-gold rounded-full px-4 py-1.5 mb-6">
            {t.badge}
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
            {t.heroH1}
          </h1>
          <p className="text-lg text-muted-foreground mb-8">{t.heroSub}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={p("/products")}
              className="bg-gold text-gold-foreground font-bold px-8 py-4 rounded-xl hover:brightness-110"
            >
              {t.ctaCatalog}
            </Link>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-line font-semibold px-8 py-4 rounded-xl hover:border-gold hover:text-gold"
            >
              {t.ctaWhatsapp}
            </a>
          </div>
        </div>
      </section>

      {/* Kategori */}
      <section className="container mx-auto px-4 py-10 max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">{t.categoriesH2}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {catCards.map((c) => (
            <Link
              key={c.cat}
              href={p("/products")}
              className="bg-card border border-line rounded-2xl overflow-hidden hover:border-gold transition-colors group"
            >
              <div className="relative aspect-[4/3] bg-black">
                <Image
                  src={c.image}
                  alt={categoryLabel(c.cat, lang)}
                  fill
                  sizes="(max-width:768px) 50vw, 250px"
                  className="object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="font-bold text-sm">{categoryLabel(c.cat, lang)}</h3>
                <p className="text-xs text-muted-foreground">
                  {c.count} {lang === "ms" ? "produk" : "products"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best sellers */}
      <section className="bg-card/50 border-y border-line">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">{t.bestH2}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {best.map((prod) => (
              <Link
                key={prod.id}
                href={p(`/product/${prod.id}`)}
                className="bg-background border border-line rounded-2xl overflow-hidden hover:border-gold transition-colors group"
              >
                <div className="relative aspect-square bg-black">
                  <Image
                    src={prod.imageUrl}
                    alt={productName(prod, lang)}
                    fill
                    sizes="(max-width:768px) 50vw, 250px"
                    className="object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-3.5">
                  <h3 className="font-semibold text-sm leading-snug">{productName(prod, lang)}</h3>
                  <p className="text-gold font-bold text-sm mt-1">{prod.price}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link
              href={p("/products")}
              className="inline-block border border-gold text-gold font-bold px-8 py-3.5 rounded-xl hover:bg-gold hover:text-gold-foreground transition-colors"
            >
              {t.viewCatalog}
            </Link>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid md:grid-cols-3 gap-5">
          {t.trust.map((x, i) => {
            const Icon = TRUST_ICONS[i];
            return (
              <div key={i} className="bg-card border border-line rounded-2xl p-6 text-center">
                <Icon className="w-8 h-8 text-gold mx-auto mb-3" />
                <h3 className="font-bold mb-1.5">{x.t}</h3>
                <p className="text-sm text-muted-foreground">{x.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== Seksyen dealer (diturunkan ke bawah, tak dibuang) ===== */}
      <section className="bg-card/50 border-y border-line">
        <div className="container mx-auto px-4 py-14 max-w-4xl text-center">
          <p className="inline-block text-xs font-bold bg-background border border-gold/40 text-gold rounded-full px-4 py-1.5 mb-5">
            {t.dealerBadge}
          </p>
          <h2 className="text-2xl md:text-4xl font-bold mb-3">{t.h1}</h2>
          <p className="text-muted-foreground mb-6">{t.sub}</p>
          <div className="bg-background border border-gold/30 rounded-2xl p-5 mb-8 text-sm">
            {t.permitFlash}
          </div>

          {/* Permit lama vs GRK */}
          <div className="grid md:grid-cols-2 gap-5 text-left mb-8">
            <div className="bg-background border border-red-900/50 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4 text-red-400">❌ {t.oldWayTitle}</h3>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {t.oldWay.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </div>
            <div className="bg-background border border-gold/40 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4 text-gold">✅ {t.grkWayTitle}</h3>
              <ul className="space-y-2.5 text-sm">
                {t.grkWay.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
          <Link
            href={p("/suratlantikan")}
            className="inline-block bg-gold text-gold-foreground font-bold px-8 py-4 rounded-xl hover:brightness-110"
          >
            {t.permitCta}
          </Link>
        </div>
      </section>

      {/* Langkah jadi dealer + 3 perayaan */}
      <section className="container mx-auto px-4 py-14 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">{t.stepsH2}</h2>
        <ol className="space-y-4 mb-6">
          {t.steps.map((x, i) => (
            <li key={i} className="flex gap-4 bg-card border border-line rounded-2xl p-5">
              <span className="shrink-0 w-10 h-10 rounded-full bg-gold text-gold-foreground font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <div>
                <h3 className="font-bold mb-1">{x.t}</h3>
                <p className="text-sm text-muted-foreground">{x.d}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="text-center text-sm text-gold font-semibold mb-10">⚡ {t.setupTime}</p>

        <div className="grid md:grid-cols-3 gap-4">
          {t.seasons.map((x, i) => (
            <div key={i} className="bg-card border border-line rounded-2xl p-5 text-center">
              <span className="text-3xl">{x.e}</span>
              <h3 className="font-bold mt-2 mb-1 text-sm">{x.t}</h3>
              <p className="text-xs text-muted-foreground">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimoni */}
      <section className="bg-card/50 border-y border-line">
        <div className="container mx-auto px-4 py-14 max-w-5xl">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">{t.testiH2}</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {t.testi.map((x, i) => (
              <figure key={i} className="bg-background border border-line rounded-2xl p-6">
                <blockquote className="text-sm mb-4">&ldquo;{x.q}&rdquo;</blockquote>
                <figcaption className="text-xs text-gold font-semibold">{x.n}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA akhir */}
      <section className="container mx-auto px-4 py-16 max-w-3xl text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-3">{t.finalH2}</h2>
        <p className="text-muted-foreground mb-6">{t.finalSub}</p>
        <ul className="flex flex-wrap justify-center gap-4 text-sm mb-8">
          {t.finalPoints.map((x, i) => (
            <li key={i} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-gold" /> {x}
            </li>
          ))}
        </ul>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gold text-gold-foreground font-bold px-8 py-4 rounded-xl hover:brightness-110"
        >
          {t.ctaWhatsapp}
        </a>
      </section>

      <Footer dict={dict} />
    </div>
  );
}
