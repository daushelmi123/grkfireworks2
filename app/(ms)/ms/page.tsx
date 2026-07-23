import type { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "ms",
  "/",
  'GRK Fireworks - Pembekal Bunga Api & Mercun Sah Malaysia',
  'Program dealer bunga api 100% berlesen PDRM. Jana pendapatan sampingan setiap musim perayaan. Surat Lantikan auto-generate dalam 2 minit.'
);

export default function Page() {
  return <HomePage lang="ms" />;
}
