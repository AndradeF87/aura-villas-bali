import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://auravillasbali.com';
  
  return {
    rules: [
      // Main crawling rules for all bots
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          // Admin and private areas
          '/admin/',
          '/admin/*',
          '/dashboard/',
          '/dashboard/*',
          
          // API endpoints (unless you want them indexed)
          '/api/',
          '/api/*',
          
          // Private user areas
          '/account/',
          '/account/*',
          '/profile/',
          '/profile/*',
          
          // Temporary and system files
          '/tmp/',
          '/*.tmp$',
          '/cache/',
          '/logs/',
          
          // Search and filter URLs to prevent duplicate content
          '/search?*',
          '/villas?*', // Allow category pages but block filtered URLs
          '/*?sort=*',
          '/*?filter=*',
          '/*?price=*',
          '/*?availability=*',
          
          // Booking process pages (let users find them through proper flow)
          '/booking/step-*',
          '/payment/',
          '/payment/*',
          '/checkout/',
          '/checkout/*',
          
          // Development and testing
          '/test/',
          '/staging/',
          '/dev/',
          '/_next/',
          '/_error',
          '/404',
          '/500',
          
          // File types that shouldn't be crawled
          '/*.pdf$',
          '/*.doc$',
          '/*.docx$',
          '/*.xls$',
          '/*.xlsx$',
          
          // Duplicate content patterns
          '/villas/*/print', // Print versions
          '/villas/*/amp', // AMP versions (if you have separate AMP pages)
          '/*?utm_*', // UTM tracking parameters
          '/*?ref=*', // Referral parameters
          '/*?campaign=*', // Campaign parameters
          
          // Dynamic calendar/availability paths
          '/availability/*',
          '/calendar/*',
          
          // Internal tools
          '/tools/',
          '/utilities/',
          '/backup/',
          '/exports/',
        ],
        // Specific crawl delay for all bots (in seconds)
        crawlDelay: 1,
      },
      
      // Google-specific optimizations
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/villas/',
          '/blog/',
          '/experiences/',
          '/about',
          '/contact',
          '/services',
          '/*.jpg$',
          '/*.jpeg$',
          '/*.png$',
          '/*.webp$',
          '/*.gif$',
          '/*.svg$',
          '/*.css$',
          '/*.js$',
        ],
        disallow: [
          '/admin/*',
          '/api/*',
          '/account/*',
          '/booking/step-*',
          '/search?*',
          '/*?sort=*',
          '/*?filter=*',
        ],
        crawlDelay: 0, // No delay for Google
      },
      
      // Bing-specific rules
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/admin/*',
          '/api/*',
          '/account/*',
          '/search?*',
        ],
        crawlDelay: 2, // Slightly slower for Bing
      },
      
      // Facebook crawler for social sharing
      {
        userAgent: 'facebookexternalhit',
        allow: [
          '/',
          '/villas/',
          '/blog/',
          '/experiences/',
        ],
        disallow: [
          '/admin/*',
          '/account/*',
          '/api/*',
        ],
      },
      
      // Twitter/X crawler
      {
        userAgent: 'Twitterbot',
        allow: [
          '/',
          '/villas/',
          '/blog/',
          '/experiences/',
        ],
        disallow: [
          '/admin/*',
          '/account/*',
          '/api/*',
        ],
      },
      
      // LinkedIn crawler
      {
        userAgent: 'LinkedInBot',
        allow: [
          '/',
          '/villas/',
          '/blog/',
          '/about',
        ],
        disallow: [
          '/admin/*',
          '/account/*',
          '/api/*',
        ],
      },
      
      // Block known bad bots and scrapers
      {
        userAgent: [
          'SemrushBot',
          'AhrefsBot', 
          'MJ12bot',
          'DotBot',
          'AspiegelBot',
          'SurveyBot',
          'BLEXBot',
          'YandexBot', // Block Yandex if not targeting Russian market
          'BaiduSpider', // Block Baidu if not targeting Chinese market
        ],
        disallow: '/',
      },
      
      // AI/GPT bots - adjust based on your preference
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'CCBot',
          'anthropic-ai',
          'Claude-Web',
        ],
        disallow: '/', // Block AI training crawlers
      },
      
      // Allow image crawlers for better image SEO
      {
        userAgent: [
          'Googlebot-Image',
          'Bingbot',
        ],
        allow: [
          '/*.jpg$',
          '/*.jpeg$',
          '/*.png$',
          '/*.webp$',
          '/*.gif$',
          '/images/',
          '/media/',
        ],
        disallow: [
          '/admin/*',
          '/private/*',
        ],
      },
    ],
    
    // Multiple sitemaps for better organization
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-images.xml`, // Separate image sitemap
      `${baseUrl}/sitemap-news.xml`, // News/blog sitemap if applicable
    ],
    
    // Specify the host (helpful for crawlers)
    host: baseUrl,
  };
}

// Additional robots.txt configurations for different environments
export function generateRobotsForEnvironment(env: 'production' | 'staging' | 'development') {
  const baseUrl = env === 'production' 
    ? 'https://auravillasbali.com'
    : env === 'staging'
    ? 'https://staging.auravillasbali.com'
    : 'http://localhost:3000';

  if (env !== 'production') {
    // Block all crawlers on non-production environments
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
      sitemap: `${baseUrl}/sitemap.xml`,
      host: baseUrl,
    };
  }
  
  // Return production robots.txt
  return robots();
}

// Utility function to validate robots.txt rules
export function validateRobotsRules() {
  const issues: string[] = [];
  
  // Check for common mistakes
  const robotsResult = robots();
  const rules = Array.isArray(robotsResult.rules) ? robotsResult.rules : [robotsResult.rules];
  
  rules.forEach((rule, index) => {
    // Check for overly broad disallow rules
    const disallowArray = Array.isArray(rule.disallow) ? rule.disallow : [rule.disallow].filter(Boolean);
    if (disallowArray.some(d => d?.includes('/*'))) {
      issues.push(`Rule ${index + 1}: Broad disallow pattern '/*' might block important content`);
    }
    
    // Check for conflicting allow/disallow
    if (rule.allow && rule.disallow) {
      const allowArray = Array.isArray(rule.allow) ? rule.allow : [rule.allow].filter(Boolean);
      const conflicts = allowArray.filter(allow => 
        disallowArray.some(disallow => 
          disallow && allow.startsWith(disallow.replace('*', ''))
        )
      );
      
      if (conflicts.length > 0) {
        issues.push(`Rule ${index + 1}: Potential conflicts between allow and disallow: ${conflicts.join(', ')}`);
      }
    }
  });
  
  return {
    isValid: issues.length === 0,
    issues,
  };
}

// Export configuration for different bot behaviors
export const BOT_CONFIGURATIONS = {
  // Aggressive SEO bots (slower crawl rate)
  AGGRESSIVE_BOTS: [
    'SemrushBot',
    'AhrefsBot',
    'MJ12bot',
  ],
  
  // Search engine bots (allowed with optimization)
  SEARCH_ENGINES: [
    'Googlebot',
    'Bingbot',
    'DuckDuckBot',
  ],
  
  // Social media bots (need access for sharing)
  SOCIAL_BOTS: [
    'facebookexternalhit',
    'Twitterbot',
    'LinkedInBot',
  ],
  
  // AI training bots (blocked by default)
  AI_BOTS: [
    'GPTBot',
    'ChatGPT-User',
    'CCBot',
    'anthropic-ai',
  ],
};