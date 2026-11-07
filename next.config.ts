import type { NextConfig } from "next";

const strapiUrl = new URL(
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337",
);

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
  experimental: {
    optimizePackageImports: ['react-icons'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: strapiUrl.protocol === "https:" ? "https" : "http",
        hostname: strapiUrl.hostname,
        port: strapiUrl.port,
      },
    ],
  },
};

export default nextConfig;
