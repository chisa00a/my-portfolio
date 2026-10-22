import type { MetadataRoute } from 'next';
import { siteMetadata } from '@/data/content';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteMetadata.canonicalUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
