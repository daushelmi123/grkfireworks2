import Link from "next/link";
import Image from "next/image";
import { TrendingUp, GraduationCap, Truck, Trophy } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getDict } from "@/lib/dict";
import { WHATSAPP, pathFor, type Lang } from "@/lib/seo";
import { products, productName } from "@/lib/products";

const WHY_ICONS = [TrendingUp, GraduationCap, Truck, Trophy];
// Produk terlaris sama macam SPA asal
const BEST_IDS = ["sunset", "fountain-flower", "cili-padi", "pop-pop"];

export default function WholesalePage({ lang }: { lang: Lang }) {
  const dict = getDict(lang);
  const t = dict.wholesale;
  const best = products.filter(
    (p) => BEST_IDS.includes(p.id) || BEST_IDS.some((b) => p.id.startsWith(b))
  ).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <Header lang={lang} dict={dict} />

      <section className="container mx-auto px-4 py-14 md:py-20 text-center max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">{t.h1}</h1>
        <p className="text-muted-foreground mb-8">{t.sub}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold text-gold-foreground font-bold px-7 py-3.5 rounded-xl hover:brightness-110"
          >
            {t.ctaJoin}
          </a>
          <Link
            href={pathFor(lang, "/products")}
            className="border border-line font-semibold px-7 py-3.5 rounded-xl hover:border-gold hover:text-gold"
          >
            {t.ctaPrice}
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-14 max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">{t.bestH2}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {best.map((p) => (
            <Link
              key={p.id}
              href={pathFor(lang, `/product/${p.id}`)}
              className="bg-card border border-line rounded-2xl overflow-hidden hover:border-gold group"
            >
              <div className="relative aspect-square bg-black">
                <Image
                  src={p.imageUrl}
                  alt={productName(p, lang)}
                  fill
                  sizes="(max-width:768px) 50vw, 250px"
                  className="object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-3.5">
                <h3 className="font-semibold text-sm">{productName(p, lang)}</h3>
                <p className="text-gold font-bold text-sm mt-1">{p.price}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center">
          <Link
            href={pathFor(lang, "/products")}
            className="inline-block border border-gold text-gold font-bold px-8 py-3 rounded-xl hover:bg-gold hover:text-gold-foreground"
          >
            {t.viewAll}
          </Link>
        </div>
      </section>

      <section className="bg-card/50 border-y border-line">
        <div className="container mx-auto px-4 py-14 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">{t.whyH2}</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {t.why.map((x, i) => {
              const Icon = WHY_ICONS[i];
              return (
                <div key={i} className="bg-background border border-line rounded-2xl p-6">
                  <Icon className="w-7 h-7 text-gold mb-3" />
                  <h3 className="font-bold mb-2">{x.t}</h3>
                  <p className="text-sm text-muted-foreground">{x.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14 max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">{t.topH2}</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {t.top.map((x, i) => (
            <div key={i} className="bg-card border border-line rounded-2xl p-6">
              <h3 className="font-bold mb-3">{x.t}</h3>
              <ul className="space-y-1.5 text-sm text-muted-foreground list-disc pl-4">
                {x.pts.map((pt, j) => (
                  <li key={j}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 max-w-2xl text-center">
        <div className="bg-card border border-gold/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-2">{t.ctaH2}</h2>
          <p className="text-sm text-muted-foreground mb-6">{t.ctaSub}</p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gold text-gold-foreground font-bold px-8 py-4 rounded-xl hover:brightness-110"
          >
            {t.ctaBtn}
          </a>
        </div>
      </section>

      <Footer dict={dict} />
    </div>
  );
}
