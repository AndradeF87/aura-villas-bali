import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Target modern browsers only
  swcMinify: true,
  
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['gsap', 'framer-motion', 'three', 'lucide-react'],
    optimizeCss: true,
    webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'TTFB', 'INP'],
  },
  
  // Disable polyfills for modern browsers
  transpilePackages: [],
  excludeDefaultMomentLocales: true,
  
  // CSS optimization
  sassOptions: {
    includePaths: ['./styles'],
  },
  
  // Optimize production builds
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  generateEtags: true,
  compress: true,
  
  // Optimize images for animation performance
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Compiler optimizations for production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
    // Target modern browsers to minimize polyfills
    emotion: {
      sourceMap: false,
      autoLabel: 'never',
    },
  },
  
  // Configure webpack for animation libraries
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Optimize GSAP imports
    config.resolve.alias = {
      ...config.resolve.alias,
      'gsap/ScrollTrigger': 'gsap/dist/ScrollTrigger',
      'gsap/TextPlugin': 'gsap/dist/TextPlugin',
      // Disable core-js polyfills
      'core-js': false,
      'core-js-pure': false,
    }

    // Add rules for Lottie files
    config.module.rules.push({
      test: /\.lottie$/,
      type: 'asset/resource',
    })
    
    // Exclude polyfills from being bundled
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        // Disable Node.js polyfills
        fs: false,
        path: false,
        crypto: false,
      }
    }
    
    // Configure to skip transpiling modern JS features
    config.module.rules.forEach(rule => {
      if (rule.oneOf) {
        rule.oneOf.forEach(oneOfRule => {
          if (oneOfRule.use && oneOfRule.use.loader && oneOfRule.use.loader.includes('babel-loader')) {
            oneOfRule.exclude = /node_modules/
          }
        })
      }
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
