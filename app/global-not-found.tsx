import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });

export const metadata: Metadata = {
  title: "404 - Halaman Tidak Ditemui | GRK Fireworks",
  robots: { index: false, follow: true },
};

/**
 * 404 global — perlu sebab app ni ada dua root layout (route group en/ms),
 * jadi Next tak boleh compose 404 dari satu layout. Sama corak dengan
 * fireworksmalaysia.
 */
export default function GlobalNotFound() {
  return (
    <html lang="ms" className={poppins.className}>
      <body className="min-h-screen flex items-center justify-center bg-black text-white px-6">
        <div className="text-center max-w-md">
          <p className="text-6xl font-bold text-yellow-400 mb-3">404</p>
          <h1 className="text-2xl font-bold mb-3">Halaman Tidak Ditemui</h1>
          <p className="text-gray-400 mb-8">
            Halaman yang anda cari tidak wujud. Jom kembali ke koleksi bunga api kami!
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="/" className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-lg">
              Kembali ke Utama
            </a>
            <a href="/products" className="border border-gray-600 px-6 py-3 rounded-lg">
              Lihat Produk
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
