import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "en",
  "/about",
  'About Us | GRK Fireworks Malaysia',
  'Meet the GRK Fireworks family - Johor Bahru based licensed fireworks supplier serving all of Malaysia since 2024.'
);

export default function Page() {
  return <AboutPage lang="en" />;
}
