import { MetadataRoute } from 'next';

// Mock data interfaces - replace with your actual data layer
interface Villa {
  slug: string;
  location: string;
  updatedAt: string;
  priority: number;
}

interface Location {
  slug: string;
  name: string;
  updatedAt: string;
}

interface BlogPost {
  slug: string;
  category: string;
  updatedAt: string;
}

interface Experience {
  slug: string;
  category: string;
  updatedAt: string;
}

// Mock data functions - replace with your actual API calls
async function getAllVillas(): Promise<Villa[]> {
  // This would typically fetch from your database/CMS
  return [
    {
      slug: 'boutique-beachfront-villa',
      location: 'seminyak',
      updatedAt: '2024-01-15T10:00:00.000Z',
      priority: 0.9
    },
    {
      slug: 'tropical-garden-retreat',
      location: 'ubud',
      updatedAt: '2024-01-14T10:00:00.000Z',
      priority: 0.8
    },
    {
      slug: 'modern-cliff-villa',
      location: 'uluwatu',
      updatedAt: '2024-01-13T10:00:00.000Z',
      priority: 0.9
    }
  ];
}

async function getAllLocations(): Promise<Location[]> {
  return [
    {
      slug: 'seminyak',
      name: 'Seminyak',
      updatedAt: '2024-01-15T10:00:00.000Z'
    },
    {
      slug: 'ubud',
      name: 'Ubud',
      updatedAt: '2024-01-14T10:00:00.000Z'
    },
    {
      slug: 'uluwatu',
      name: 'Uluwatu',
      updatedAt: '2024-01-13T10:00:00.000Z'
    },
    {
      slug: 'canggu',
      name: 'Canggu',
      updatedAt: '2024-01-12T10:00:00.000Z'
    }
  ];
}

async function getAllBlogPosts(): Promise<BlogPost[]> {
  return [
    {
      slug: 'best-wedding-venues-bali',
      category: 'wedding-planning',
      updatedAt: '2024-01-10T10:00:00.000Z'
    },
    {
      slug: 'ultimate-bali-travel-guide',
      category: 'travel-guides',
      updatedAt: '2024-01-08T10:00:00.000Z'
    },
    {
      slug: 'bali-villa-booking-tips',
      category: 'travel-tips',
      updatedAt: '2024-01-05T10:00:00.000Z'
    }
  ];
}

async function getAllExperiences(): Promise<Experience[]> {
  return [
    {
      slug: 'private-chef-service',
      category: 'dining',
      updatedAt: '2024-01-15T10:00:00.000Z'
    },
    {
      slug: 'spa-wellness-retreats',
      category: 'wellness',
      updatedAt: '2024-01-14T10:00:00.000Z'
    },
    {
      slug: 'cultural-temple-tours',
      category: 'culture',
      updatedAt: '2024-01-13T10:00:00.000Z'
    }
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://auravillasbali.com';
  const currentDate = new Date().toISOString();
  
  // Static high-priority pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/villas`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: '2024-01-15T10:00:00.000Z',
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: '2024-01-15T10:00:00.000Z',
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: '2024-01-15T10:00:00.000Z',
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: '2024-01-01T10:00:00.000Z',
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-conditions`,
      lastModified: '2024-01-01T10:00:00.000Z',
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    }
  ];

  // Location pages - high priority for local SEO
  const locations = await getAllLocations();
  const locationPages: MetadataRoute.Sitemap = locations.map((location) => ({
    url: `${baseUrl}/villas/${location.slug}`,
    lastModified: location.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Villa detail pages - highest priority for conversions
  const villas = await getAllVillas();
  const villaPages: MetadataRoute.Sitemap = villas.map((villa) => ({
    url: `${baseUrl}/villas/${villa.location}/${villa.slug}`,
    lastModified: villa.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: villa.priority || 0.9,
  }));

  // Villa gallery pages for enhanced indexing
  const villaGalleryPages: MetadataRoute.Sitemap = villas.map((villa) => ({
    url: `${baseUrl}/villas/${villa.location}/${villa.slug}/gallery`,
    lastModified: villa.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Feature-based villa listings
  const featurePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/villas/private-pool`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/villas/beachfront`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/villas/family-friendly`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/villas/boutique`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/villas/wedding-venues`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }
  ];

  // Experience and service pages
  const experiences = await getAllExperiences();
  const experiencePages: MetadataRoute.Sitemap = [
    // Main experiences page
    {
      url: `${baseUrl}/experiences`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    // Individual experience pages
    ...experiences.map((experience) => ({
      url: `${baseUrl}/experiences/${experience.category}/${experience.slug}`,
      lastModified: experience.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  ];

  // Blog pages for content marketing
  const blogPosts = await getAllBlogPosts();
  const blogPages: MetadataRoute.Sitemap = [
    // Main blog page
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.6,
    },
    // Blog category pages
    {
      url: `${baseUrl}/blog/travel-guides`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/wedding-planning`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/travel-tips`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    // Individual blog posts
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.category}/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))
  ];

  // Special offer pages (seasonal content)
  const offerPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/offers`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/offers/early-bird-discounts`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/offers/long-stay-deals`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/offers/wedding-packages`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }
  ];

  // API documentation (if public APIs exist)
  const apiPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/api-docs`,
      lastModified: '2024-01-15T10:00:00.000Z',
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    }
  ];

  // Combine all pages
  const allPages = [
    ...staticPages,
    ...locationPages,
    ...villaPages,
    ...villaGalleryPages,
    ...featurePages,
    ...experiencePages,
    ...blogPages,
    ...offerPages,
    ...apiPages
  ];

  // Sort by priority (highest first) and lastModified (newest first)
  return allPages.sort((a, b) => {
    if (a.priority !== b.priority) {
      return (b.priority || 0) - (a.priority || 0);
    }
    return new Date(b.lastModified || '').getTime() - new Date(a.lastModified || '').getTime();
  });
}

// Image sitemap for enhanced image SEO
export async function generateImageSitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://auravillasbali.com';
  const villas = await getAllVillas();
  
  // This would be a separate sitemap for images
  const imageSitemap = villas.flatMap((villa) => 
    // Assuming each villa has multiple images
    Array.from({ length: 5 }, (_, index) => ({
      url: `${baseUrl}/images/villas/${villa.location}/${villa.slug}/image-${index + 1}.jpg`,
      lastModified: villa.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  );
  
  return imageSitemap;
}