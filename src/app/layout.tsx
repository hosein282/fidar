import './globals.css';
import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';
import { INITIAL_SEO_META } from '@/src/data/mockData';
import { getCanonicalUrl } from '@/src/lib/seo';

export const metadata: Metadata = {
  title: {
    default: INITIAL_SEO_META.siteTitle.fa,
    template: `%s | ${INITIAL_SEO_META.siteTitle.fa}`,
  },
  description: INITIAL_SEO_META.metaDescription.fa,
  alternates: {
    canonical: getCanonicalUrl('/'),
    languages: {
      'fa-IR': '/fa',
      'en-US': '/en',
      'x-default': '/fa',
    },
  },
  openGraph: {
    title: INITIAL_SEO_META.siteTitle.fa,
    description: INITIAL_SEO_META.metaDescription.fa,
    url: getCanonicalUrl('/'),
    siteName: 'Fidar Bondar Sazeh',
    locale: 'fa_IR',
    alternateLocale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/assets/images/logo.png`,
        width: 1200,
        height: 630,
        alt: 'Fidar Bondar Sazeh فیدار سازه بندار',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: INITIAL_SEO_META.siteTitle.fa,
    description: INITIAL_SEO_META.metaDescription.fa,
    images: [`${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/assets/images/logo.png`],
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'),
  category: 'industrial',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2a3470',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'فیدار سازه بندار | Fidar Bondar Sazeh',
    url: siteUrl,
    logo: `${siteUrl}/assets/images/logo.png`,
    description: INITIAL_SEO_META.metaDescription.fa,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'خیابان اسکندری، پلاک 432 ساختمان پردیس',
      addressLocality: 'تهران',
      addressCountry: 'IR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+98-21-66129310',
      contactType: 'customer service',
      availableLanguage: ['fa', 'en'],
    },
    sameAs: [
      'https://www.facebook.com/Fidar BondarHQ/',
      'https://www.instagram.com/Fidar Bondar/',
      'https://www.linkedin.com/company/Fidar Bondar',
      'https://www.youtube.com/channel/UClGlpjMxN5E4L8eU81Vu7rg',
    ],
  };

  return (
    <html lang="fa" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}