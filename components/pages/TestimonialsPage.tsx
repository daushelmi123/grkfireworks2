import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getDict } from "@/lib/dict";
import { WHATSAPP, pathFor, type Lang } from "@/lib/seo";

export default function TestimonialsPage({ lang }: { lang: Lang }) {
  const dict = getDict(lang);
  const t = dict.testimonials;

  return (
    <div className="flex flex-col min-h-screen">
      <Header lang={lang} dict={dict} />

      <section className="container mx-auto px-4 py-14 md:py-20 text-center max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">{t.h1}</h1>
        <p className="text-muted-foreground mb-6">{t.sub}</p>
        <p className="inline-flex items-center gap-1.5 text-sm font-semibold">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="ml-1 text-muted-foreground">{t.basedOn}</span>
        </p>
      </section>

      <section className="container mx-auto px-4 pb-14 max-w-5xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {t.reviews.map((r, i) => (
            <figure key={i} className="bg-card border border-line rounded-2xl p-6 flex flex-col">
              <blockquote className="text-sm mb-4 flex-1">&ldquo;{r.q}&rdquo;</blockquote>
              <figcaption>
                <p className="font-bold text-sm">{r.n}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" /> {r.l} · {r.d}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {t.stats.map((s, i) => (
            <div key={i} className="bg-card border border-gold/30 rounded-2xl p-6 text-center">
              <p className="text-3xl font-extrabold text-gold mb-1">{s.v}</p>
              <h3 className="font-bold mb-1">{s.t}</h3>
              <p className="text-xs text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">{t.baseH2}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {t.base.map((b, i) => (
            <div key={i} className="bg-card border border-line rounded-2xl p-5 text-center text-sm font-semibold">
              {b}
            </div>
          ))}
        </div>

        <div className="text-center bg-card border border-gold/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-3">{t.ctaTitle}</h3>
          <p className="text-sm text-muted-foreground mb-5 max-w-xl mx-auto">{t.ctaSub}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold text-gold-foreground font-bold px-7 py-3.5 rounded-xl hover:brightness-110"
            >
              {t.ctaBtn}
            </a>
            <Link
              href={pathFor(lang, "/products")}
              className="border border-line font-semibold px-7 py-3.5 rounded-xl hover:border-gold hover:text-gold"
            >
              {t.ctaProducts}
            </Link>
          </div>
        </div>
      </section>

      <Footer dict={dict} />
    </div>
  );
}
