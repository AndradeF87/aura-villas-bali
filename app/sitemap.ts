import { MetadataRoute } from 'next';

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

  // Note: Individual villa pages will be added here when actual villas are configured
  // Currently no individual villa pages exist

  const allPages = [...staticPages];

  // Sort by priority (highest first) and lastModified (newest first)
  return allPages.sort((a, b) => {
    if (a.priority !== b.priority) {
      return (b.priority || 0) - (a.priority || 0);
    }
    return new Date(b.lastModified || '').getTime() - new Date(a.lastModified || '').getTime();
  });
}