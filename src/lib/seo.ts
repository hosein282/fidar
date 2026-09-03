import type { Metadata } from 'next';

const defaultSiteUrl = 'https://fidarbondar.com';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl;

export function getCanonicalUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return new URL(normalizedPath, siteUrl).toString();
}

/**
 * Build full canonical metadata with Open Graph, Twitter Cards,
 * hreflang alternates, and a site-wide JSON-LD Organization schema.
 */
export function buildCanonicalMetadata(path: string): Metadata {
  const url = getCanonicalUrl(path);

  return {
    alternates: {
      canonical: url,
      languages: {
        'fa-IR': '/fa',
        'en-US': '/en',
        'x-default': '/fa',
      },
    },
    openGraph: {
      title: 'فیدار سازه بندار | Fidar Bondar',
      description:
        'تولید دستگاه‌ها، خطوط تولید و کامپوننت‌های PHP/MySQL برای صنایع چوب، شیشه، سنگ و فلز | Industrial machinery, digital systems & bilingual web solutions.',
      url,
      siteName: 'Fidar Bondar Sazeh',
      locale: 'fa_IR',
      alternateLocale: 'en_US',
      type: 'website',
      images: [
        {
          url: `${siteUrl}/assets/images/logo.png`,
          width: 1200,
          height: 630,
          alt: 'Fidar Bondar Sazeh فیدار سازه بندار',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'فیدار سازه بندار | Fidar Bondar',
      description:
        'تولید دستگاه‌ها، خطوط تولید و کامپوننت‌های PHP/MySQL برای صنایع چوب، شیشه، سنگ و فلز',
      images: [`${siteUrl}/assets/images/logo.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    metadataBase: new URL(siteUrl),
    category: 'industrial',
  };
}

/**
 * Build blog post metadata with per-post title, description, and JSON-LD Article schema.
 */
export function buildBlogPostMetadata(
  path: string,
  opts: {
    titleFa: string;
    titleEn: string;
    descriptionFa: string;
    descriptionEn: string;
    coverImage?: string;
    datePublished?: string;
    authorFa?: string;
    authorEn?: string;
  }
): Metadata {
  const url = getCanonicalUrl(path);

  return {
    title: opts.titleFa,
    description: opts.descriptionFa,
    alternates: {
      canonical: url,
      languages: {
        'fa-IR': '/fa',
        'en-US': '/en',
        'x-default': '/fa',
      },
    },
    openGraph: {
      title: opts.titleFa,
      description: opts.descriptionFa,
      url,
      type: 'article',
      locale: 'fa_IR',
      alternateLocale: 'en_US',
      siteName: 'Fidar Bondar Sazeh',
      images: opts.coverImage
        ? [{ url: opts.coverImage, width: 1200, height: 800, alt: opts.titleFa }]
        : undefined,
      publishedTime: opts.datePublished,
      authors: opts.authorFa ? [opts.authorFa] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.titleFa,
      description: opts.descriptionFa,
      images: opts.coverImage ? [opts.coverImage] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    metadataBase: new URL(siteUrl),
    category: 'article',
  };
}