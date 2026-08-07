import { notFound } from 'next/navigation';
import { BlogPage } from '@/src/pages/BlogPage';
import { INITIAL_BLOG_POSTS, INITIAL_SEO_META } from '@/src/data/mockData';
import { sanitizePosts } from '@/src/utils/sanitize';
import { Language } from '@/src/types';

interface PageProps {
  params: Promise<{ lang: string; id: string }>;
}

async function getData() {
  return {
    posts: sanitizePosts(INITIAL_BLOG_POSTS),
    seoConfig: INITIAL_SEO_META,
  };
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
