import type { Metadata } from "next";
import TestimonialsPage from "@/components/pages/TestimonialsPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "ms",
  "/testimonials",
  'Testimoni Pelanggan | GRK Fireworks Malaysia',
  'Kisah sebenar pelanggan dan dealer GRK seluruh Malaysia - majlis kahwin, perayaan, dan kisah kejayaan bisnes.'
);

export default function Page() {
  return <TestimonialsPage lang="ms" />;
}
