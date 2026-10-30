import type { Metadata } from "next";
import LinkPage from "@/components/pages/LinkPage";
import { pageMeta } from "@/lib/seo";

// Halaman utiliti untuk bio TikTok/IG — tak perlu diindeks.
export const metadata: Metadata = {
  ...pageMeta(
    "ms",
    "/whatsapp",
    "Helmi Fireworks — Simpan No. Telefon & WhatsApp",
    "Simpan nombor GRK Fireworks dan hubungi kami melalui WhatsApp."
  ),
  robots: { index: false, follow: true },
};

export default function Page() {
  return <LinkPage lang="ms" />;
}
