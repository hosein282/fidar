import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { BlogPage } from '@/src/pages/BlogPage';
import { INITIAL_SEO_META } from '@/src/data/mockData';
import { Language, BlogPost } from '@/src/types';
import { buildCanonicalMetadata } from '@/src/lib/seo';
import { getPublishedPosts } from '../../api/lib/store';

interface PageProps {
  params: Promise<{ lang: string }>;
}

// ISR: Revalidate every 5 minutes — keeps blog list fresh without hammering MySQL
export const revalidate = 300;

// SSG: Pre-render blog listing for both locales at build time
export function generateStaticParams() {
  return [{ lang: 'fa' }, { lang: 'en' }];
}

async function getData() {
  let posts: BlogPost[] = [];
  try {
    // Fetch ONLY published posts from MySQL database
    posts = await getPublishedPosts();
  } catch (error) {
    // Fallback to empty array if DB is not available
    console.error('Failed to fetch posts from database:', error);
  }

  return {
    posts,
    seoConfig: INITIAL_SEO_META,
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const path = lang === 'en' ? '/en/blog' : '/fa/blog';
  return buildCanonicalMetadata(path);
}

export default async function BlogListPage({ params }: PageProps) {
  const { lang } = await params;
  const currentLang = lang === 'en' ? 'en' : 'fa';

  if (currentLang !== 'fa' && currentLang !== 'en') {
    notFound();
  }

  const data = await getData();

  return (
    <BlogPage
      posts={data.posts}
      seoConfig={data.seoConfig}
      lang={currentLang as Language}
    />
  );
}
