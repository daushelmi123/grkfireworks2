import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SuratForm from "@/components/suratlantikan/SuratForm";
import { getDict } from "@/lib/dict";
import type { Lang } from "@/lib/seo";

export default function SuratPage({ lang }: { lang: Lang }) {
  const dict = getDict(lang);
  const t = dict.surat;

  return (
    <div className="flex flex-col min-h-screen">
      <Header lang={lang} dict={dict} />
      <section className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">{t.h1}</h1>
          <p className="text-muted-foreground">{t.sub}</p>
        </div>
        <SuratForm />
      </section>
      <Footer dict={dict} />
    </div>
  );
}
