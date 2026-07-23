import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "en",
  "/contact",
  'Contact Us | GRK Fireworks Malaysia',
  'Contact GRK Fireworks - WhatsApp, phone or visit our Johor Bahru warehouse. Mon-Sat 9AM-6PM.'
);

export default function Page() {
  return <ContactPage lang="en" />;
}
