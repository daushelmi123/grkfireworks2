import { Download, MessageCircle } from "lucide-react";
import CopyPhone from "@/components/CopyPhone";
import TikTokHelp from "@/components/TikTokHelp";
import type { Lang } from "@/lib/seo";

/**
 * Halaman pautan ringkas untuk bio TikTok/Instagram.
 * Dua tindakan: simpan nombor (vCard) dan buka WhatsApp.
 * Trafik utama datang dari TikTok — browser dalam app TIDAK boleh buka
 * WhatsApp terus, jadi ada panduan "buka dalam pelayar".
 */

const BRAND = "Helmi Fireworks";
const PHONE_DISPLAY = "+60 11-2443 0415";
/** Mesej WhatsApp pra-isi — trafik dari TikTok, jadi mesej terus beritahu sumbernya. */
const waLink = (lang: Lang) =>
  `https://wa.me/601124430415?text=${encodeURIComponent(
    lang === "ms" ? "Hi, saya dari TikTok" : "Hi, I\u2019m from TikTok"
  )}`;
/** Fail vCard dihidang oleh app/vcard/route.ts (BUKAN di bawah /api — Apache proxy /api ke servis PDF). */
const VCARD_LINK = "/whatsapp/helmi-fireworks.vcf";

const T: Record<
  Lang,
  {
    tagline: string;
    saveTitle: string;
    saveSub: string;
    waTitle: string;
    waSub: string;
  }
> = {
  en: {
    tagline: "Wholesale fireworks & firecrackers — Johor, Malaysia",
    saveTitle: "Save Our Number",
    saveSub: "Add us to your contacts",
    waTitle: "WhatsApp Us",
    waSub: "Chat with our team now",
  },
  ms: {
    tagline: "Borong bunga api & mercun — Johor, Malaysia",
    saveTitle: "Simpan No. Telefon Kami",
    saveSub: "Tambah kami dalam contact anda",
    waTitle: "WhatsApp Kami",
    waSub: "Borak dengan team kami sekarang",
  },
};

export default function LinkPage({ lang }: { lang: Lang }) {
  const t = T[lang];

  return (
    <main className="min-h-screen bg-background flex justify-center px-5 py-14">
      <div className="w-full max-w-md">
        {/* Jenama */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold">{BRAND}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t.tagline}</p>
          <p className="mt-4 text-xl font-bold text-gold tracking-wide">{PHONE_DISPLAY}</p>
        </div>

        {/* Peringatan khas bila dibuka dalam app TikTok/IG/FB */}
        <TikTokHelp lang={lang} variant="banner" />

        {/* Butang */}
        <div className="mt-9 space-y-3">
          <a
            href={VCARD_LINK}
            className="flex items-center gap-4 rounded-2xl bg-gold text-gold-foreground p-5 font-bold"
          >
            <Download className="size-6 shrink-0" />
            <span className="flex flex-col">
              <span>{t.saveTitle}</span>
              <span className="text-xs font-medium opacity-80">{t.saveSub}</span>
            </span>
          </a>

          <a
            href={waLink(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl bg-[#25D366] text-white p-5 font-bold"
          >
            <MessageCircle className="size-6 shrink-0" />
            <span className="flex flex-col">
              <span>{t.waTitle}</span>
              <span className="text-xs font-medium opacity-80">{t.waSub}</span>
            </span>
          </a>

          {/* Jalan walaupun dalam webview TikTok (clipboard dibenarkan) */}
          <CopyPhone lang={lang} />
        </div>
        <TikTokHelp lang={lang} variant="box" />
      </div>
    </main>
  );
}
