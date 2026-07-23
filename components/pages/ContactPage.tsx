import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getDict } from "@/lib/dict";
import { WHATSAPP, type Lang } from "@/lib/seo";

export default function ContactPage({ lang }: { lang: Lang }) {
  const dict = getDict(lang);
  const t = dict.contact;

  return (
    <div className="flex flex-col min-h-screen">
      <Header lang={lang} dict={dict} />

      <section className="container mx-auto px-4 py-14 md:py-20 text-center max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">{t.h1}</h1>
        <p className="text-muted-foreground">{t.sub}</p>
      </section>

      <section className="container mx-auto px-4 pb-14 max-w-4xl grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-line rounded-2xl p-6">
          <h2 className="font-bold text-lg mb-4">{t.visitTitle}</h2>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="w-5 h-5 text-gold shrink-0" />
              <span className="text-muted-foreground">{t.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="w-5 h-5 text-gold shrink-0" />
              <a href="tel:+60137340415" className="hover:text-gold">{t.phone}</a>
            </li>
            <li className="flex gap-3">
              <Mail className="w-5 h-5 text-gold shrink-0" />
              <a href="mailto:info@grkfireworks.com" className="hover:text-gold">{t.email}</a>
            </li>
            <li className="flex gap-3">
              <Clock className="w-5 h-5 text-gold shrink-0" />
              <span className="text-muted-foreground">
                <strong className="text-foreground">{t.hoursTitle}</strong> {t.hours}
              </span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="font-bold text-lg">{t.startTitle}</h2>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-card border border-gold/40 rounded-2xl p-5 hover:border-gold"
          >
            <MessageCircle className="w-8 h-8 text-gold" />
            <div>
              <p className="font-bold">{t.waTitle}</p>
              <p className="text-xs text-muted-foreground">{t.waSub}</p>
            </div>
          </a>
          <a
            href="tel:+60137340415"
            className="flex items-center gap-4 bg-card border border-line rounded-2xl p-5 hover:border-gold"
          >
            <Phone className="w-8 h-8 text-gold" />
            <div>
              <p className="font-bold">{t.callTitle}</p>
              <p className="text-xs text-muted-foreground">{t.phone}</p>
            </div>
          </a>
          <a
            href="mailto:info@grkfireworks.com"
            className="flex items-center gap-4 bg-card border border-line rounded-2xl p-5 hover:border-gold"
          >
            <Mail className="w-8 h-8 text-gold" />
            <div>
              <p className="font-bold">{t.emailTitle}</p>
              <p className="text-xs text-muted-foreground">{t.email}</p>
            </div>
          </a>
        </div>
      </section>

      <Footer dict={dict} />
    </div>
  );
}
