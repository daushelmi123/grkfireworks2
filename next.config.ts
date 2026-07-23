import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dua root layout (route group en & ms) -> perlukan 404 global.
  experimental: {
    globalNotFound: true,
  },
  images: {
    remotePatterns: [
      // Gambar & video produk GRK di Bunny CDN
      { protocol: "https", hostname: "helmifireworks.b-cdn.net", pathname: "/**" },
      { protocol: "https", hostname: "helmifireworks2.b-cdn.net", pathname: "/**" },
    ],
  },
};

export default nextConfig;
