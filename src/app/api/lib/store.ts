import { BlogPost, ContactMessage, BilingualText, PostStatus } from '@/src/types';
import { sanitizeHtml } from '@/src/utils/sanitize';
import { prisma } from './prisma';
import { revalidateTag, unstable_cache } from 'next/cache';


// ========================================================
// Prisma Data Store
// All functions interact with the `fidar_db` database
// through the Prisma ORM (see prisma/schema.prisma).
// ========================================================

type PostType = 'article' | 'news';
type MessageLang = 'fa' | 'en';
type MessageStatus = 'new' | 'contacted' | 'resolved';

// --- Date helpers ---

function isoNow(iso?: string): string {
  const d = iso ? new Date(iso) : new Date();
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

function dateToIso(date: Date | string): string {
  if (date instanceof Date) {
    return date.toISOString().split('T')[0];
  }
  return String(date).split('T')[0];
}

// --- Row to BlogPost mappers ---

interface PostRowShape {
  id: string;
  postType: PostType;
  status: PostStatus;
  slugFa: string;
  slugEn: string;
  titleFa: string;
  titleEn: string;
  excerptFa: string | null;
  excerptEn: string | null;
  contentFa: string | null;
  contentEn: string | null;
  authorFa: string | null;
  authorEn: string | null;
  date: Date;
  readTime: string | null;
  categoryFa: string | null;
  categoryEn: string | null;
  coverImage: string | null;
  seoTitleFa: string | null;
  seoTitleEn: string | null;
  seoDescFa: string | null;
  seoDescEn: string | null;
  seoKeywordsFa: string | null;
  seoKeywordsEn: string | null;
  views: number;
}

function parseKeywords(raw: string | null): { fa: string[]; en: string[] } {
  const split = (s: string | null) =>
    s ? s.split(',').map(x => x.trim()).filter(Boolean) : [];
  return { fa: split(raw), en: split(raw) };
}

function rowToBlogPost(row: PostRowShape): BlogPost {
  const slug: BilingualText = { fa: row.slugFa, en: row.slugEn };
  const title: BilingualText = { fa: row.titleFa, en: row.titleEn };
  const excerpt: BilingualText = {
    fa: sanitizeHtml(row.excerptFa || ''),
    en: sanitizeHtml(row.excerptEn || ''),
  };
  const content: BilingualText = {
    fa: sanitizeHtml(row.contentFa || ''),
    en: sanitizeHtml(row.contentEn || ''),
  };
  const author: BilingualText = {
    fa: row.authorFa || 'تیم فنی فیدار',
    en: row.authorEn || 'Biesss Engineering',
  };
  const category: BilingualText = {
    fa: row.categoryFa || 'مقالات تخصصی',
    en: row.categoryEn || 'Technical Articles',
  };

  return {
    id: row.id,
    postType: row.postType,
    status: row.status || 'published',
    slug,
    title,
    excerpt,
    content,
    author,
    date: dateToIso(row.date),
    readTime: row.readTime || '5 min',
    category,
    coverImage: row.coverImage || '',
    seoTitle: {
      fa: row.seoTitleFa || title.fa,
      en: row.seoTitleEn || title.en,
    },
    seoDescription: {
      fa: row.seoDescFa || excerpt.fa,
      en: row.seoDescEn || excerpt.en,
    },
    seoKeywords: {
      fa: parseKeywords(row.seoKeywordsFa).fa,
      en: parseKeywords(row.seoKeywordsEn).en,
    },
    views: typeof row.views === 'number' ? row.views : 0,
  };
}

function blogPostToData(post: BlogPost) {
  const postType: PostType = post.postType || 'article';
  const status: PostStatus = post.status || 'published';

  const slugFa =
    post.slug?.fa || post.title.fa.toLowerCase().replace(/\\s+/g, '-');
  const slugEn =
    post.slug?.en || post.title.en.toLowerCase().replace(/\\s+/g, '-');

  return {
    postType,
    status,
    slugFa,
    slugEn,
    titleFa: post.title.fa,
    titleEn: post.title.en || post.title.fa,
    excerptFa: post.excerpt?.fa || '',
    excerptEn: post.excerpt?.en || '',
    contentFa: post.content?.fa || '',
    contentEn: post.content?.en || '',
    authorFa: post.author?.fa || 'تیم فنی فیدار',
    authorEn: post.author?.en || 'Biesss Engineering',
    date: post.date || new Date().toISOString().split('T')[0],
    readTime: post.readTime || '5 min',
    categoryFa:
      post.category?.fa || (postType === 'news' ? 'اخبار و اطلاعیه‌ها' : 'مقالات تخصصی'),
    categoryEn:
      post.category?.en || (postType === 'news' ? 'News & Announcements' : 'Technical Articles'),
    coverImage: post.coverImage || '',
    seoTitleFa: post.seoTitle?.fa || '',
    seoTitleEn: post.seoTitle?.en || '',
    seoDescFa: post.seoDescription?.fa || '',
    seoDescEn: post.seoDescription?.en || '',
    seoKeywordsFa: post.seoKeywords?.fa?.join(', ') || '',
    seoKeywordsEn: post.seoKeywords?.en?.join(', ') || '',
    views: post.views || 0,
  };
}

// --- Blog Posts CRUD ---

export async function getAllPosts(): Promise<BlogPost[]> {

  const getRows = unstable_cache(
    async () => {
      return await prisma.post.findMany({
        orderBy: [{ createdAt: 'desc' }, { date: 'desc' }],
      });
    }, ['posts'],
    { revalidate: 3600, tags: ['posts'] }
  );

  const rows = await getRows();
  return rows.map(rowToBlogPost);
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const getRows = unstable_cache(
    async () => {
      return await prisma.post.findMany({
        where: { status: 'published' },
        orderBy: [{ createdAt: 'desc' }, { date: 'desc' }],
      });
    }, ['posts'],
    { revalidate: 3600, tags: ['posts'] }
  );

  const rows = await getRows();
  return rows.map(rowToBlogPost);
}

export async function getPostById(id: string): Promise<BlogPost | undefined> {
  const row = await prisma.post.findUnique({ where: { id } });
  return row ? rowToBlogPost(row) : undefined;
}

export async function getPostsByType(type: PostType): Promise<BlogPost[]> {
  const rows = await prisma.post.findMany({
    where: { postType: type, status: 'published' },
    orderBy: [{ createdAt: 'desc' }, { date: 'desc' }],
  });

  return rows.map(rowToBlogPost);
}

export async function addPost(post: BlogPost): Promise<BlogPost[]> {
  const data = blogPostToData(post);

  const payload = {
    postType: data.postType,
    status: data.status,
    slugFa: data.slugFa,
    slugEn: data.slugEn,
    titleFa: data.titleFa,
    titleEn: data.titleEn,
    excerptFa: data.excerptFa,
    excerptEn: data.excerptEn,
    contentFa: data.contentFa,
    contentEn: data.contentEn,
    authorFa: data.authorFa,
    authorEn: data.authorEn,
    date: new Date(data.date),
    readTime: data.readTime,
    categoryFa: data.categoryFa,
    categoryEn: data.categoryEn,
    coverImage: data.coverImage,
    seoTitleFa: data.seoTitleFa,
    seoTitleEn: data.seoTitleEn,
    seoDescFa: data.seoDescFa,
    seoDescEn: data.seoDescEn,
    seoKeywordsFa: data.seoKeywordsFa,
    seoKeywordsEn: data.seoKeywordsEn,
    views: data.views,
  };

  await prisma.post.upsert({
    where: { id: post.id },
    update: payload,
    create: { ...payload, id: post.id },
  });

  revalidateTag('posts');
  console.log("revaldated posts")

  return getAllPosts();
}

export async function deletePost(id: string): Promise<BlogPost[]> {
  await prisma.post.deleteMany({ where: { id } });
  return getAllPosts();
}

// --- Contact Messages ---

interface MessageRowShape {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  service: string | null;
  budget: string | null;
  message: string;
  lang: MessageLang;
  status: MessageStatus;
  createdAt: Date;
}

function rowToContactMessage(row: MessageRowShape): ContactMessage {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    company: row.company || undefined,
    service: row.service || '',
    budget: row.budget || '',
    message: row.message,
    lang: row.lang,
    createdAt: isoNow(row.createdAt.toISOString()),
    status: row.status,
  };
}

export async function addMessage(message: ContactMessage): Promise<ContactMessage[]> {
  await prisma.contactMessage.create({
    data: {
      id: message.id || `msg-${Date.now()}`,
      name: message.name,
      email: message.email,
      phone: message.phone,
      company: message.company || null,
      service: message.service || null,
      budget: message.budget || null,
      message: message.message,
      lang: message.lang === 'en' ? 'en' : 'fa',
      status: message.status || 'new',
      createdAt: new Date(isoNow(message.createdAt)),
    },
  });
  return getAllMessages();
}

export async function getAllMessages(): Promise<ContactMessage[]> {
  const rows = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return rows.map(rowToContactMessage);
}


export async function deleteMessage(id: string): Promise<ContactMessage[]> {
  await prisma.contactMessage.deleteMany({ where: { id } });
  return getAllMessages();
}