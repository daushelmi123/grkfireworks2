import { Warehouse, ShieldCheck, Users, Flame, Star } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getDict } from "@/lib/dict";
import { WHATSAPP, type Lang } from "@/lib/seo";

const CARD_ICONS = [Warehouse, ShieldCheck, Users, Flame, Star];

export default function AboutPage({ lang }: { lang: Lang }) {
  const dict = getDict(lang);
  const t = dict.about;

  return (
    <div className="flex flex-col min-h-screen">
      <Header lang={lang} dict={dict} />

      <section className="container mx-auto px-4 py-14 md:py-20 text-center max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">{t.h1}</h1>
        <p className="text-lg text-muted-foreground">{t.sub}</p>
      </section>

      <section className="container mx-auto px-4 pb-14 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-5">{t.journeyH2}</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>{t.journey1}</p>
          <p>{t.journey2}</p>
        </div>

        <div className="bg-card border border-gold/30 rounded-2xl p-6 mt-8">
          <h3 className="font-bold text-lg mb-4">{t.factsTitle}</h3>
          <dl className="grid sm:grid-cols-2 gap-3 text-sm">
            {t.facts.map((f, i) => (
              <div key={i} className="flex gap-2">
                <dt className="font-semibold text-gold">{f.k}:</dt>
                <dd className="text-muted-foreground">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-8">
          {t.cards.map((c, i) => {
            const Icon = CARD_ICONS[i % CARD_ICONS.length];
            return (
              <div key={i} className="bg-card border border-line rounded-2xl p-6">
                <Icon className="w-7 h-7 text-gold mb-3" />
                <h3 className="font-bold mb-2">{c.t}</h3>
                <p className="text-sm text-muted-foreground">{c.d}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center bg-card border border-gold/30 rounded-2xl p-8 mt-10">
          <h3 className="text-xl font-bold mb-3">{t.ctaTitle}</h3>
          <p className="text-sm text-muted-foreground mb-5 max-w-xl mx-auto">{t.ctaSub}</p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gold text-gold-foreground font-bold px-8 py-3.5 rounded-xl hover:brightness-110"
          >
            {t.ctaBtn}
          </a>
        </div>
      </section>

      <Footer dict={dict} />
    </div>
  );
}
