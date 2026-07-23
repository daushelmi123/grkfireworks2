import type { Metadata } from "next";
import WholesalePage from "@/components/pages/WholesalePage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "ms",
  "/wholesale",
  'Borong Bunga Api Malaysia | GRK Fireworks',
  'Mula bisnes bunga api dari RM500. Harga borong, ajar A-Z, penghantaran seluruh Malaysia, support 24/7.'
);

export default function Page() {
  return <WholesalePage lang="ms" />;
}
