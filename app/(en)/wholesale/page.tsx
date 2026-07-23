import type { Metadata } from "next";
import WholesalePage from "@/components/pages/WholesalePage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "en",
  "/wholesale",
  'Wholesale Fireworks Supplier | GRK Fireworks Malaysia',
  'Start your fireworks business from RM500. Wholesale prices, A-Z training, nationwide delivery, 24/7 support.'
);

export default function Page() {
  return <WholesalePage lang="en" />;
}
