import { CheckCircle2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getDict } from "@/lib/dict";
import { WHATSAPP, type Lang } from "@/lib/seo";

export default function PermitGuidePage({ lang }: { lang: Lang }) {
  const dict = getDict(lang);
  const t = dict.permitGuide;

  const List = ({ items }: { items: string[] }) => (
    <ul className="space-y-2 text-sm text-muted-foreground">
      {items.map((x, i) => (
        <li key={i} className="flex gap-2">
          <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" /> {x}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header lang={lang} dict={dict} />

      <section className="container mx-auto px-4 py-14 md:py-20 text-center max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">{t.h1}</h1>
        <p className="text-muted-foreground">{t.sub}</p>
      </section>

      <section className="container mx-auto px-4 pb-14 max-w-4xl space-y-10">
        <div className="bg-card border border-gold/30 rounded-2xl p-6">
          <h2 className="font-bold text-lg mb-2">{t.whyTitle}</h2>
          <p className="text-sm text-muted-foreground">{t.why}</p>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-5">{t.whoH2}</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-card border border-line rounded-2xl p-6">
              <h3 className="font-bold mb-3">{t.eligibleTitle}</h3>
              <List items={t.eligible} />
            </div>
            <div className="bg-card border border-line rounded-2xl p-6">
              <h3 className="font-bold mb-3">{t.purposesTitle}</h3>
              <List items={t.purposes} />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-5">{t.stepsH2}</h2>
          <ol className="space-y-4">
            {t.steps.map((s, i) => (
              <li key={i} className="flex gap-4 bg-card border border-line rounded-2xl p-5">
                <span className="shrink-0 w-9 h-9 rounded-full bg-gold text-gold-foreground font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold mb-1">{s.t}</h3>
                  <p className="text-sm text-muted-foreground">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-5">{t.docsH2}</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-card border border-line rounded-2xl p-6">
              <h3 className="font-bold mb-3">{t.indivTitle}</h3>
              <List items={t.indiv} />
            </div>
            <div className="bg-card border border-line rounded-2xl p-6">
              <h3 className="font-bold mb-3">{t.orgTitle}</h3>
              <List items={t.org} />
            </div>
          </div>
        </div>

        <div className="bg-card border border-line rounded-2xl p-6">
          <h3 className="font-bold mb-4">{t.timelineTitle}</h3>
          <dl className="space-y-2 text-sm">
            {t.timeline.map((x, i) => (
              <div key={i} className="flex justify-between border-b border-line/50 pb-2">
                <dt className={i === t.timeline.length - 1 ? "font-bold" : "text-muted-foreground"}>
                  {x.k}
                </dt>
                <dd className={i === t.timeline.length - 1 ? "font-bold text-gold" : ""}>{x.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="text-center bg-card border border-gold/30 rounded-2xl p-8">
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
