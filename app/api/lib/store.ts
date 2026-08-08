import { BlogPost, ContactMessage, BilingualText } from '@/src/types';
import { query } from './db';

// ========================================================
// MySQL Data Store
// All functions interact with the `biesss_db` database.
// ========================================================

// --- Row to BlogPost mappers ---

interface PostRow {
  id: string;
  post_type: 'article' | 'news';
  slug_fa: string;
  slug_en: string;
  title_fa: string;
  title_en: string;
  excerpt_fa: string;
  excerpt_en: string;
  content_fa: string;
  content_en: string;
  author_fa: string;
  author_en: string;
  date: string;
  read_time: string;
  category_fa: string;
  category_en: string;
  cover_image: string;
  seo_title_fa: string;
  seo_title_en: string;
  seo_desc_fa: string;
  seo_desc_en: string;
  seo_keywords_fa: string;
  seo_keywords_en: string;
  views: number;
  created_at?: string;
}

function parseKeywords(raw: string | null): { fa: string[]; en: string[] } {
  const split = (s: string | null) => (s ? s.split(',').map(x => x.trim()).filter(Boolean) : []);
  return { fa: split(raw), en: split(raw) };
}

function rowToBlogPost(row: PostRow): BlogPost {
  const slug: BilingualText = { fa: row.slug_fa, en: row.slug_en };
  const title: BilingualText = { fa: row.title_fa, en: row.title_en };
  const excerpt: BilingualText = { fa: row.excerpt_fa || '', en: row.excerpt_en || '' };
  const content: BilingualText = { fa: row.content_fa || '', en: row.content_en || '' };
  const author: BilingualText = { fa: row.author_fa, en: row.author_en };
  const category: BilingualText = { fa: row.category_fa, en: row.category_en };

  return {
    id: row.id,
    postType: row.post_type,
    slug,
    title,
    excerpt,
    content,
    author,
    date: row.date,
    readTime: row.read_time,
    category,
    coverImage: row.cover_image,
    seoTitle: {
      fa: row.seo_title_fa || title.fa,
      en: row.seo_title_en || title.en,
    },
    seoDescription: {
      fa: row.seo_desc_fa || excerpt.fa,
      en: row.seo_desc_en || excerpt.en,
    },
    seoKeywords: {
      fa: parseKeywords(row.seo_keywords_fa).fa,
      en: parseKeywords(row.seo_keywords_en).en,
    },
    views: typeof row.views === 'number' ? row.views : parseInt(String(row.views || '0'), 10) || 0,
  };
}

function blogPostToRow(post: BlogPost) {
  return [
    post.id,
    post.postType || 'article',
    post.slug?.fa || post.title.fa.toLowerCase().replace(/\s+/g, '-'),
    post.slug?.en || post.title.en.toLowerCase().replace(/\s+/g, '-'),
    post.title.fa,
    post.title.en || post.title.fa,
    post.excerpt?.fa || '',
    post.excerpt?.en || '',
    post.content?.fa || '',
    post.content?.en || '',
    post.author?.fa || 'تیم فنی بیئس',
    post.author?.en || 'Biesss Engineering',
    post.date || new Date().toISOString().split('T')[0],
    post.readTime || '5 min',
    post.category?.fa || 'مقالات تخصصی',
    post.category?.en || 'Technical Articles',
    post.coverImage || '',
    post.seoTitle?.fa || '',
    post.seoTitle?.en || '',
    post.seoDescription?.fa || '',
    post.seoDescription?.en || '',
    post.seoKeywords?.fa?.join(', ') || '',
    post.seoKeywords?.en?.join(', ') || '',
    post.views || 0,
  ];
}

// --- Blog Posts CRUD ---

export async function getAllPosts(): Promise<BlogPost[]> {
  const rows = await query<PostRow[]>(
    'SELECT * FROM posts ORDER BY created_at DESC, date DESC'
  );
  return rows.map(rowToBlogPost);
}

export async function getPostById(id: string): Promise<BlogPost | undefined> {
  const rows = await query<PostRow[]>('SELECT * FROM posts WHERE id = ? LIMIT 1', [id]);
  return rows.length > 0 ? rowToBlogPost(rows[0]) : undefined;
}

export async function getPostsByType(type: 'article' | 'news'): Promise<BlogPost[]> {
  const rows = await query<PostRow[]>(
    'SELECT * FROM posts WHERE post_type = ? ORDER BY created_at DESC, date DESC',
    [type]
  );
  return rows.map(rowToBlogPost);
}

export async function addPost(post: BlogPost): Promise<BlogPost[]> {
  const params = blogPostToRow(post);
  await query(
    `INSERT INTO posts (
      id, post_type, slug_fa, slug_en, title_fa, title_en,
      excerpt_fa, excerpt_en, content_fa, content_en,
      author_fa, author_en, date, read_time,
      category_fa, category_en, cover_image,
      seo_title_fa, seo_title_en, seo_desc_fa, seo_desc_en,
      seo_keywords_fa, seo_keywords_en, views
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      post_type = VALUES(post_type),
      slug_fa = VALUES(slug_fa),
      slug_en = VALUES(slug_en),
      title_fa = VALUES(title_fa),
      title_en = VALUES(title_en),
      excerpt_fa = VALUES(excerpt_fa),
      excerpt_en = VALUES(excerpt_en),
      content_fa = VALUES(content_fa),
      content_en = VALUES(content_en),
      author_fa = VALUES(author_fa),
      author_en = VALUES(author_en),
      date = VALUES(date),
      read_time = VALUES(read_time),
      category_fa = VALUES(category_fa),
      category_en = VALUES(category_en),
      cover_image = VALUES(cover_image),
      seo_title_fa = VALUES(seo_title_fa),
      seo_title_en = VALUES(seo_title_en),
      seo_desc_fa = VALUES(seo_desc_fa),
      seo_desc_en = VALUES(seo_desc_en),
      seo_keywords_fa = VALUES(seo_keywords_fa),
      seo_keywords_en = VALUES(seo_keywords_en),
      views = VALUES(views)`,
    params
  );
  return getAllPosts();
}

export async function deletePost(id: string): Promise<BlogPost[]> {
  await query('DELETE FROM posts WHERE id = ?', [id]);
  return getAllPosts();
}

// --- Contact Messages ---

interface MessageRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  service: string;
  budget: string | null;
  message: string;
  lang: 'fa' | 'en';
  status: 'new' | 'contacted' | 'resolved';
  created_at: string;
}

function rowToContactMessage(row: MessageRow): ContactMessage {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    company: row.company || undefined,
    service: row.service,
    budget: row.budget || '',
    message: row.message,
    lang: row.lang,
    createdAt: row.created_at,
    status: row.status,
  };
}

export async function addMessage(message: ContactMessage): Promise<ContactMessage[]> {
  await query(
    `INSERT INTO contact_messages (id, name, email, phone, company, service, budget, message, lang, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      message.id,
      message.name,
      message.email,
      message.phone,
      message.company || null,
      message.service,
      message.budget || '',
      message.message,
      message.lang,
      message.status,
      message.createdAt,
    ]
  );
  return getAllMessages();
}

export async function getAllMessages(): Promise<ContactMessage[]> {
  const rows = await query<MessageRow[]>(
    'SELECT * FROM contact_messages ORDER BY created_at DESC'
  );
  return rows.map(rowToContactMessage);
}