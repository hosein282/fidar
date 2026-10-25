import type { MetadataRoute } from 'next';
import { getPublishedPosts } from './api/lib/store';
import { MATERIALS, SERVICES } from '@/src/data/mockData';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fidarbondar.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/fa`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/fa/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/en/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  // Add individual blog post URLs for both locales
  try {
    const posts = await getPublishedPosts();
    for (const post of posts) {
      baseRoutes.push({
        url: `${siteUrl}/fa/blog/${post.id}`,
        lastModified: post.date ? new Date(post.date) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
      baseRoutes.push({
        url: `${siteUrl}/en/blog/${post.id}`,
        lastModified: post.date ? new Date(post.date) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  } catch {
    // If DB is unavailable, just return base routes
  }

  // Add static product pages for both locales (SSG/ISR routes)
  for (const item of MATERIALS) {
    baseRoutes.push({
      url: `${siteUrl}/fa/products/${encodeURIComponent(item.slugFa)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
    baseRoutes.push({
      url: `${siteUrl}/en/products/${encodeURIComponent(item.slugEn)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

   for (const item of SERVICES) {
    baseRoutes.push({
      url: `${siteUrl}/fa/services/${encodeURIComponent(item.slugFa)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
    baseRoutes.push({
      url: `${siteUrl}/en/services/${encodeURIComponent(item.slugEn)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  return baseRoutes;
}