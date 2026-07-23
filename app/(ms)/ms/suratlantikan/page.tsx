import type { Metadata } from "next";
import SuratPage from "@/components/pages/SuratPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "ms",
  "/suratlantikan",
  'Surat Lantikan Ejen - Borang Automasi | GRK Fireworks',
  'Satu borang untuk semua dokumen PDRM. GRK auto-isi Surat Lantikan, borang IPD dan PBT - PDF siap dalam beberapa minit.'
);

export default function Page() {
  return <SuratPage lang="ms" />;
}
