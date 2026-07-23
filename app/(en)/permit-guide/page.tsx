import type { Metadata } from "next";
import PermitGuidePage from "@/components/pages/PermitGuidePage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "en",
  "/permit-guide",
  'Fireworks Permit Guide Malaysia | GRK Fireworks',
  'Step-by-step guide to getting your PDRM fireworks permit - who can apply, required documents, and processing timeline.'
);

export default function Page() {
  return <PermitGuidePage lang="en" />;
}
