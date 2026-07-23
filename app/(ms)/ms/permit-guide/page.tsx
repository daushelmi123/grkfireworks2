import type { Metadata } from "next";
import PermitGuidePage from "@/components/pages/PermitGuidePage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "ms",
  "/permit-guide",
  'Panduan Permit Bunga Api Malaysia | GRK Fireworks',
  'Panduan langkah demi langkah dapatkan permit bunga api PDRM - siapa layak, dokumen diperlukan, dan timeline pemprosesan.'
);

export default function Page() {
  return <PermitGuidePage lang="ms" />;
}
