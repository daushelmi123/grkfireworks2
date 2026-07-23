"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import type { Lang } from "@/lib/seo";
import type { Dict } from "@/lib/dict";

export default function Header({ lang, dict }: { lang: Lang; dict: Dict }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const p = (path: string) => (lang === "ms" ? `/ms${path === "/" ? "" : path}` || "/ms" : path);

  // Produk diutamakan — susunan ikut keputusan Firdaus (produk dulu, dealer kekal)
  const nav = [
    { label: dict.nav.home, href: p("/") || "/" },
    { label: dict.nav.products, href: p("/products") },
    { label: dict.nav.wholesale, href: p("/wholesale") },
    { label: dict.nav.suratlantikan, href: p("/suratlantikan") },
    { label: dict.nav.permitGuide, href: p("/permit-guide") },
    { label: dict.nav.about, href: p("/about") },
    { label: dict.nav.contact, href: p("/contact") },
  ];

  // Tukar bahasa kekal di page sama: /about <-> /ms/about
  const basePath = pathname.replace(/^\/ms(?=\/|$)/, "") || "/";
  const enHref = basePath;
  const msHref = basePath === "/" ? "/ms" : `/ms${basePath}`;

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur border-b border-line">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={lang === "ms" ? "/ms" : "/"} className="flex items-center gap-2">
          <span className="text-2xl">🎆</span>
          <span className="font-bold text-lg tracking-tight">
            GRK <span className="text-gold">Fireworks</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`hover:text-gold transition-colors ${
                pathname === n.href ? "text-gold" : "text-gray-200"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex rounded-lg overflow-hidden border border-line text-xs font-bold">
            <Link
              href={enHref}
              className={`px-2.5 py-1.5 ${lang === "en" ? "bg-gold text-gold-foreground" : "text-gray-300 hover:text-white"}`}
            >
              EN
            </Link>
            <Link
              href={msHref}
              className={`px-2.5 py-1.5 ${lang === "ms" ? "bg-gold text-gold-foreground" : "text-gray-300 hover:text-white"}`}
            >
              BM
            </Link>
          </div>
          <button
            className="lg:hidden p-2 text-gray-200"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-line bg-black px-4 py-3 space-y-1">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className={`block py-2.5 px-2 rounded-lg font-medium ${
                pathname === n.href ? "text-gold bg-card" : "text-gray-200"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
