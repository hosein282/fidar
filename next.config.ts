import type { NextConfig } from 'next';
import { url } from 'node:inspector';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  images: {
    domains: ['images.ctfassets.net'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Tree-shake heavy icon libraries for smaller bundles
  experimental: {
    optimizePackageImports: ['lucide-react', 'date-fns', 'date-fns-jalali'],
  },
  // Improve performance with HTTP caching headers for static assets
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
