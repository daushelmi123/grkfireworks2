import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { SITE_URL, organizationJsonLd } from "@/lib/seo";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "GRK Fireworks - Pembekal Bunga Api & Mercun Sah Malaysia",
  description:
    "Pengedar bunga api berlesen PDRM. Jadi dealer, jana pendapatan setiap musim perayaan. Surat Lantikan auto-generate dalam 2 minit.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/** Root layout untuk semua route /ms/* — <html lang="ms"> */
export default function MsRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ms" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <WhatsAppFloat lang="ms" />
      </body>
    </html>
  );
}
