import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { BlogPage } from '@/src/pages/BlogPage';
import { INITIAL_BLOG_POSTS, INITIAL_SEO_META } from '@/src/data/mockData';
import { sanitizePosts } from '@/src/utils/sanitize';
import { Language } from '@/src/types';
import { buildCanonicalMetadata } from '@/src/lib/seo';

interface PageProps {
  params: Promise<{ lang: string; id: string }>;
}

async function getData() {
  return {
    posts: sanitizePosts(INITIAL_BLOG_POSTS),
    seoConfig: INITIAL_SEO_META,
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, id } = await params;
  const path = lang === 'en' ? `/en/blog/${id}` : `/fa/blog/${id}`;
  return buildCanonicalMetadata(path);
}

export default async function BlogPostPage({ params }: PageProps) {
  const { lang, id } = await params;
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
      postId={id}
    />
  );
}
