import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { INITIAL_SEO_META } from '@/src/data/mockData';
import { getCanonicalUrl } from '@/src/lib/seo';

export const metadata: Metadata = {
  title: INITIAL_SEO_META.siteTitle.fa,
  description: INITIAL_SEO_META.metaDescription.fa,
  alternates: {
    canonical: getCanonicalUrl('/'),
    languages: {
      fa: '/fa',
      en: '/en',
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
    
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}