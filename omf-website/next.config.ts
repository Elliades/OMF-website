import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverComponentsExternalPackages: [],
  },
  server: {
    port: 3280,
  },
  output: 'standalone',
};

export default nextConfig;
