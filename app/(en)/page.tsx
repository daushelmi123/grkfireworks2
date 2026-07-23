import type { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "en",
  "/",
  'GRK Fireworks - Pembekal Bunga Api Terbaik Malaysia | Jual Mercun Sah',
  '100% PDRM licensed fireworks dealer program. Earn side income every festive season. Surat Lantikan auto-generated in 2 minutes.'
);

export default function Page() {
  return <HomePage lang="en" />;
}
