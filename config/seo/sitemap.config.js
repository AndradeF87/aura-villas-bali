/** @type {import('next-sitemap').IConfig} */

const sitemapConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://auravillasbali.com',
  generateRobotsText: true,
  generateIndexSitemap: true,
  
  // Exclude paths from sitemap
  exclude: [
    '/admin/*',
    '/api/*',
    '/private/*',
    '/temp/*',
    '/_*',
    '/404',
    '/500'
  ],

  // Additional paths to include
  additionalPaths: async (config) => {
    const additionalSitemaps = [];

    // Add villa pages
    const villas = await getVillas(); // You'll need to implement this
    villas.forEach(villa => {
      additionalSitemaps.push({
        loc: `/villas/${villa.location.toLowerCase()}/${villa.slug}`,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date(villa.updatedAt).toISOString(),
        // Add images for villa pages
        images: villa.images.map(image => ({
          loc: image.url,
          caption: image.alt,
          title: `${villa.name} - ${image.alt}`
        }))
      });
    });

    // Add location pages
    const locations = await getLocations(); // You'll need to implement this
    locations.forEach(location => {
      additionalSitemaps.push({
        loc: `/villas/${location.slug}`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date(location.updatedAt).toISOString()
      });
    });

    // Add blog posts
    const blogPosts = await getBlogPosts(); // You'll need to implement this
    blogPosts.forEach(post => {
      additionalSitemaps.push({
        loc: `/blog/${post.category}/${post.slug}`,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date(post.publishedAt).toISOString(),
        ...(post.featuredImage && {
          images: [{
            loc: post.featuredImage.url,
            caption: post.featuredImage.alt,
            title: post.title
          }]
        })
      });
    });

    // Add experience pages
    const experiences = await getExperiences(); // You'll need to implement this
    experiences.forEach(experience => {
      additionalSitemaps.push({
        loc: `/experiences/${experience.category}/${experience.slug}`,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date(experience.updatedAt).toISOString()
      });
    });

    return additionalSitemaps;
  },

  // Custom robots.txt content
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/private/',
          '/temp/',
          '/_next/',
          '/static/',
          '/*.json$',
          '/*_buildManifest.js$',
          '/*_middlewareManifest.js$',
          '/*_ssgManifest.js$',
          '/*.js.map$'
        ]
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/private/']
      }
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL}/villa-sitemap.xml`,
      `${process.env.NEXT_PUBLIC_SITE_URL}/blog-sitemap.xml`,
      `${process.env.NEXT_PUBLIC_SITE_URL}/image-sitemap.xml`
    ],
    // Add crawl delay for specific bots if needed
    crawlDelay: {
      '*': 1,
      'Bingbot': 5,
      'SemrushBot': 10
    }
  },

  // Custom transform function for specific page types
  transform: async (config, path) => {
    // Custom priority and change frequency based on path
    let priority = 0.5;
    let changefreq = 'monthly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'weekly';
    } else if (path.includes('/villas/')) {
      if (path.split('/').length === 4) { // Individual villa page
        priority = 0.9;
        changefreq = 'weekly';
      } else { // Location page
        priority = 0.8;
        changefreq = 'weekly';
      }
    } else if (path.includes('/blog/')) {
      priority = 0.7;
      changefreq = 'monthly';
    } else if (path.includes('/experiences/')) {
      priority = 0.6;
      changefreq = 'monthly';
    } else if (['/about', '/contact', '/terms', '/privacy'].includes(path)) {
      priority = 0.4;
      changefreq = 'yearly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined
    };
  }
};

// Helper functions - you'll need to implement these based on your data source
async function getVillas() {
  // This should fetch from your database, CMS, or API
  // Return array of villa objects with necessary fields
  return [];
}

async function getLocations() {
  // This should fetch location data
  return [];
}

async function getBlogPosts() {
  // This should fetch blog posts
  return [];
}

async function getExperiences() {
  // This should fetch experiences/activities
  return [];
}

module.exports = sitemapConfig;