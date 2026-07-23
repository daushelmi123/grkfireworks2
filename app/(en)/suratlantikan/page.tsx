import type { Metadata } from "next";
import SuratPage from "@/components/pages/SuratPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "en",
  "/suratlantikan",
  'Surat Lantikan Ejen - Borang Automasi | GRK Fireworks',
  'One form for all PDRM documents. GRK auto-fills your Surat Lantikan, IPD and PBT forms - PDF ready in minutes.'
);

export default function Page() {
  return <SuratPage lang="en" />;
}
