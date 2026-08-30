import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { BlogPage } from '@/src/pages/BlogPage';
import { INITIAL_SEO_META } from '@/src/data/mockData';
import { Language, BlogPost } from '@/src/types';
import { buildCanonicalMetadata, buildBlogPostMetadata } from '@/src/lib/seo';
import { getPublishedPosts } from '../../../api/lib/store';

interface PageProps {
  params: Promise<{ lang: string; id: string }>;
}

// ISR: Revalidate every 5 minutes — article pages stay fast & fresh
export const revalidate = 300;

// SSG: Pre-render all known blog posts for both locales at build time
// Dynamic IDs not present at build time are server-rendered on demand (dynamicParams defaults to true)
export async function generateStaticParams(): Promise<{ lang: string; id: string }[]> {
  try {
    const posts = await getPublishedPosts();
    return posts.flatMap((post) => [
      { lang: 'fa', id: post.id },
      { lang: 'en', id: post.id },
    ]);
  } catch {
    // If DB is unavailable during build, fall back to no static pages
    return [];
  }
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
  const { lang, id } = await params;
  const path = lang === 'en' ? `/en/blog/${id}` : `/fa/blog/${id}`;

  // Try to fetch the specific post for richer per-post metadata
  try {
    const posts = await getPublishedPosts();
    const post = posts.find(p => p.id === id);

    if (post) {
      return buildBlogPostMetadata(path, {
        titleFa: post.seoTitle?.fa || post.title.fa,
        titleEn: post.seoTitle?.en || post.title.en || post.title.fa,
        descriptionFa: post.seoDescription?.fa || post.excerpt?.fa || '',
        descriptionEn: post.seoDescription?.en || post.excerpt?.en || '',
        coverImage: post.coverImage,
        datePublished: post.date,
        authorFa: post.author?.fa,
        authorEn: post.author?.en,
      });
    }
  } catch {
    // Fall back to generic metadata if DB is unavailable
  }

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
