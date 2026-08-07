import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { HomePage } from '@/src/pages/HomePage';
import { INITIAL_SERVICES, INITIAL_PORTFOLIO, INITIAL_BLOG_POSTS, INITIAL_SEO_META } from '@/src/data/mockData';
import { sanitizePosts } from '@/src/utils/sanitize';
import { Language } from '@/src/types';
import { buildCanonicalMetadata } from '@/src/lib/seo';

interface PageProps {
  params: Promise<{ lang: string }>;
}

async function getData() {
  return {
    services: INITIAL_SERVICES,
    portfolio: INITIAL_PORTFOLIO,
    posts: sanitizePosts(INITIAL_BLOG_POSTS),
    seoConfig: INITIAL_SEO_META,
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const path = lang === 'en' ? '/en' : '/fa';
  return buildCanonicalMetadata(path);
}

export default async function LangHomePage({ params }: PageProps) {
  const { lang } = await params;
  const currentLang = lang === 'en' ? 'en' : 'fa';

  if (currentLang !== 'fa' && currentLang !== 'en') {
    notFound();
  }

  const data = await getData();

  return (
    <HomePage
      services={data.services}
      portfolio={data.portfolio}
      posts={data.posts}
      seoConfig={data.seoConfig}
      lang={currentLang as Language}
    />
  );
}
