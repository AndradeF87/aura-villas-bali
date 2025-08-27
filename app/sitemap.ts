import { MetadataRoute } from 'next';

// Mock data for villas - replace with your actual data source
interface Villa {
  slug: string;
  name: string;
  updatedAt: string;
  priority: number;
}

// Get all villas from your data source
async function getAllVillas(): Promise<Villa[]> {
  // This would typically fetch from your database/CMS
  // For now, returning mock data that matches your actual villas
  return [
    {
      slug: 'suyai',
      name: 'SUYAI',
      updatedAt: '2024-08-26T10:00:00.000Z',
      priority: 0.9
    },
    {
      slug: 'amerta',
      name: 'AMERTA',
      updatedAt: '2024-08-26T10:00:00.000Z',
      priority: 0.9
    },
    {
      slug: 'shambala',
      name: 'SHAMBALA',
      updatedAt: '2024-08-26T10:00:00.000Z',
      priority: 0.9
    }
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://auravillasbali.com';
  const currentDate = new Date().toISOString();
  
  // Core pages that actually exist
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/villas`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: '2024-08-26T10:00:00.000Z',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: '2024-08-26T10:00:00.000Z',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Dynamic villa pages
  const villas = await getAllVillas();
  const villaPages: MetadataRoute.Sitemap = villas.map((villa) => ({
    url: `${baseUrl}/villas/${villa.slug}`,
    lastModified: villa.updatedAt,
    changeFrequency: 'weekly',
    priority: villa.priority,
  }));

  // Combine all pages
  const allPages = [
    ...staticPages,
    ...villaPages,
  ];

  // Sort by priority (highest first) and lastModified (newest first)
  return allPages.sort((a, b) => {
    if (a.priority !== b.priority) {
      return (b.priority || 0) - (a.priority || 0);
    }
    return new Date(b.lastModified || '').getTime() - new Date(a.lastModified || '').getTime();
  });
}