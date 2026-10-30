import type { Metadata } from "next";
import LinkPage from "@/components/pages/LinkPage";
import { pageMeta } from "@/lib/seo";

// Halaman utiliti untuk bio TikTok/IG — tak perlu diindeks.
export const metadata: Metadata = {
  ...pageMeta(
    "en",
    "/whatsapp",
    "Helmi Fireworks — Save Our Number & WhatsApp",
    "Save the GRK Fireworks contact and chat with us on WhatsApp."
  ),
  robots: { index: false, follow: true },
};

export default function Page() {
  return <LinkPage lang="en" />;
}
