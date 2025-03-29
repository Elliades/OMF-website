import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Changed from 'standalone' to 'export' for Firebase static hosting
  images: {
    unoptimized: true, // Required for static export
  },
  // Remove rewrites as they're not needed for static export
};

export default nextConfig;
