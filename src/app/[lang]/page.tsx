import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { HomePage } from '@/src/pages/HomePage';
import { INITIAL_SERVICES, INITIAL_PORTFOLIO, INITIAL_SEO_META } from '@/src/data/mockData';
import { Language, BlogPost } from '@/src/types';
import { buildCanonicalMetadata } from '@/src/lib/seo';
import { getAllPosts } from '../api/lib/store';

interface PageProps {
  params: Promise<{ lang: string }>;
}

async function getData() {
  let posts: BlogPost[] = [];
  try {
    // Fetch posts from MySQL database
    posts = await getAllPosts();
  } catch (error) {
    // Fallback to empty array if DB is not available
    console.error('Failed to fetch posts from database:', error);
  }

  return {
    services: INITIAL_SERVICES,
    portfolio: INITIAL_PORTFOLIO,
    posts,
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