"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import type { Lang } from "@/lib/seo";

/**
 * Butang salin nombor — jalan walaupun dalam webview TikTok/IG (clipboard dibenarkan),
 * jadi pelawat boleh simpan nombor secara manual walau vCard tak boleh dibuka.
 */

const T: Record<Lang, { idle: string; done: string }> = {
  en: { idle: "Copy Number", done: "Number Copied!" },
  ms: { idle: "Salin Nombor", done: "Nombor Disalin!" },
};

export default function CopyPhone({
  lang,
  phone = "+601124430415",
}: {
  lang: Lang;
  phone?: string;
}) {
  const [done, setDone] = useState(false);
  const t = T[lang];

  async function copy() {
    try {
      await navigator.clipboard.writeText(phone);
    } catch {
      // Fallback untuk webview lama
      const el = document.createElement("textarea");
      el.value = phone;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      try {
        document.execCommand("copy");
      } catch {
        /* abaikan */
      }
      document.body.removeChild(el);
    }
    setDone(true);
    window.setTimeout(() => setDone(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="flex w-full items-center justify-center gap-2 rounded-2xl border border-line bg-card p-4 text-sm font-bold hover:border-gold"
    >
      {done ? (
        <Check className="size-5 shrink-0 text-gold" />
      ) : (
        <Copy className="size-5 shrink-0 text-gold" />
      )}
      {done ? t.done : t.idle}
    </button>
  );
}
