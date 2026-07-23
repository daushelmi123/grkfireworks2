import type { Metadata } from "next";
import TestimonialsPage from "@/components/pages/TestimonialsPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "en",
  "/testimonials",
  'Customer Testimonials | GRK Fireworks Malaysia',
  'Real stories from GRK customers and dealers across Malaysia - weddings, festivals, and business success stories.'
);

export default function Page() {
  return <TestimonialsPage lang="en" />;
}
