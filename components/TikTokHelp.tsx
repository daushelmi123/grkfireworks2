"use client";

import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import type { Lang } from "@/lib/seo";

/**
 * Panduan untuk pelawat dari TikTok / Instagram / Facebook.
 *
 * Browser dalam app (in-app webview) sekat muat turun fail (vCard) DAN
 * redirect WhatsApp — jadi pelawat kena buka dulu dalam pelayar sebenar.
 *
 * variant="banner" -> muncul di ATAS butang, hanya bila dikesan in-app browser
 * variant="box"    -> kotak biasa di bawah butang, hanya bila browser normal
 */

const IN_APP = /TikTok|Bytedance|musical_ly|FBAN|FBAV|Instagram|Line\/|Twitter/i;

const T: Record<Lang, { title: string; steps: string[] }> = {
  en: {
    title: "Open this page in your browser first",
    steps: [
      "Tap the ⋯ icon at the top right",
      "Choose “Open in browser”",
      "Then the buttons below will work",
    ],
  },
  ms: {
    title: "Buka halaman ini dalam pelayar dahulu",
    steps: [
      "Tekan ikon ⋯ di penjuru atas",
      "Pilih “Buka dalam pelayar”",
      "Lepas tu butang di bawah baru berfungsi",
    ],
  },
};

export default function TikTokHelp({
  lang,
  variant,
}: {
  lang: Lang;
  variant: "banner" | "box";
}) {
  const [inApp, setInApp] = useState<boolean | null>(null);

  useEffect(() => {
    setInApp(IN_APP.test(navigator.userAgent));
  }, []);

  const t = T[lang];

  // Elak hydration mismatch: jangan render apa-apa sebelum UA dibaca.
  if (inApp === null) return null;
  if (variant === "banner" && !inApp) return null;
  if (variant === "box" && inApp) return null;

  const steps = (
    <ol className="mt-3 space-y-2 text-sm">
      {t.steps.map((step, i) => (
        <li key={i} className="flex gap-3">
          <span className="grid size-5 shrink-0 place-items-center rounded-full bg-gold/20 text-[0.7rem] font-bold text-gold">
            {i + 1}
          </span>
          {step}
        </li>
      ))}
    </ol>
  );

  if (variant === "banner") {
    return (
      <div
        role="alert"
        className="mt-6 rounded-2xl border-2 border-gold bg-gold/10 p-5"
      >
        <h2 className="flex items-center gap-2 text-sm font-extrabold text-gold">
          <Info className="size-4 shrink-0" />
          {t.title}
        </h2>
        {steps}
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-2xl bg-card border border-line p-5">
      <h2 className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
        <Info className="size-4 shrink-0 text-gold" />
        {lang === "ms" ? "Datang dari TikTok?" : "Coming from TikTok?"}
      </h2>
      {steps}
    </div>
  );
}
