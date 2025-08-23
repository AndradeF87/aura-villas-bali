import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['gsap', 'framer-motion', 'three'],
  },
  
  // Optimize images for animation performance
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Configure webpack for animation libraries
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Optimize GSAP imports
    config.resolve.alias = {
      ...config.resolve.alias,
      'gsap/ScrollTrigger': 'gsap/dist/ScrollTrigger',
      'gsap/TextPlugin': 'gsap/dist/TextPlugin',
    }

    // Add rules for Lottie files
    config.module.rules.push({
      test: /\.lottie$/,
      type: 'asset/resource',
    })

    return config
  },
  
  // Headers for animation performance
  async headers() {
    return [
      {
        source: '/animations/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
