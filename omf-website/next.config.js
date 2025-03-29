/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Ensure the base path matches your hosting URL path if not at root
  basePath: '',
  // Configure static export
  distDir: '.next',
  experimental: {
    // Enable modern static export features
    staticWorkerRequestDeduping: true,
    optimizePackageImports: ['@radix-ui/react-icons'],
  },
}

module.exports = nextConfig