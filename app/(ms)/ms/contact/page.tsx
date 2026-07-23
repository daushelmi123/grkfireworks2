import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "ms",
  "/contact",
  'Hubungi Kami | GRK Fireworks Malaysia',
  'Hubungi GRK Fireworks - WhatsApp, telefon atau lawati warehouse kami di Johor Bahru. Isnin-Sabtu 9AM-6PM.'
);

export default function Page() {
  return <ContactPage lang="ms" />;
}
