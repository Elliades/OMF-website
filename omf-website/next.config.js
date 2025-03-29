/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Ensure the base path matches your hosting URL path if not at root
  basePath: '',
  // Disable server-side features since we're doing static export
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig