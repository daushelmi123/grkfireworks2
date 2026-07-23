import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "ms",
  "/about",
  'Tentang Kami | GRK Fireworks Malaysia',
  'Kenali keluarga GRK Fireworks - pembekal bunga api berlesen dari Johor Bahru untuk seluruh Malaysia sejak 2024.'
);

export default function Page() {
  return <AboutPage lang="ms" />;
}
