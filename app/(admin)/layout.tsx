import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GRK Admin — Pengurusan Template PDF",
  robots: { index: false, follow: false }, // JANGAN index dashboard admin
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ms" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full bg-neutral-950 text-neutral-100">{children}</body>
    </html>
  );
}
