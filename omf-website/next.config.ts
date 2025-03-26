import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Enable standalone output for Docker
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*',
      },
    ];
  }
};

export default nextConfig;
