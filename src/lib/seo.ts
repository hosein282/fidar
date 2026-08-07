import type { Metadata } from 'next';

const defaultSiteUrl = 'https://example.com';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl;

export function getCanonicalUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return new URL(normalizedPath, siteUrl).toString();
}

export function buildCanonicalMetadata(path: string): Metadata {
  return {
    alternates: {
      canonical: getCanonicalUrl(path),
      languages: {
        fa: '/fa',
        en: '/en',
      },
    },
  };
}
