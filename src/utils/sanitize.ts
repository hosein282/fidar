import { BlogPost, BilingualText } from '../types';

function parseBilingual(val: any, defaultFa = '', defaultEn = ''): BilingualText {
  if (!val) {
    return { fa: defaultFa, en: defaultEn || defaultFa };
  }
  if (typeof val === 'string') {
    return { fa: val, en: val };
  }
  return {
    fa: String(val.fa || defaultFa),
    en: String(val.en || val.fa || defaultEn || defaultFa)
  };
}

function parseKeywords(val: any): { fa: string[]; en: string[] } {
  if (!val) return { fa: ['PHP', 'MySQL', 'سئو'], en: ['PHP', 'MySQL', 'SEO'] };
  if (Array.isArray(val)) {
    const list = val.map(String).filter(Boolean);
    return { fa: list, en: list };
  }
  if (typeof val === 'object' && val !== null) {
    const fa = Array.isArray(val.fa) ? val.fa.map(String).filter(Boolean) : [];
    const en = Array.isArray(val.en) ? val.en.map(String).filter(Boolean) : fa;
    return { fa, en };
  }
  if (typeof val === 'string') {
    const parts = val.split(',').map(s => s.trim()).filter(Boolean);
    return { fa: parts, en: parts };
  }
  return { fa: ['PHP', 'MySQL', 'سئو'], en: ['PHP', 'MySQL', 'SEO'] };
}

export function sanitizeBlogPost(item: any): BlogPost {
  if (!item || typeof item !== 'object') {
    return {
      id: `post-${Math.random().toString(36).substring(2, 9)}`,
      postType: 'article',
      slug: { fa: 'post', en: 'post' },
      title: { fa: 'بدون عنوان', en: 'Untitled' },
      excerpt: { fa: '', en: '' },
      content: { fa: '', en: '' },
      author: { fa: 'تیم بیئس', en: 'Biesse Team' },
      date: new Date().toISOString().split('T')[0],
      readTime: '5 min',
      category: { fa: 'مقالات تخصصی', en: 'Technical Articles' },
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      seoTitle: { fa: 'بدون عنوان', en: 'Untitled' },
      seoDescription: { fa: '', en: '' },
      seoKeywords: { fa: ['PHP', 'MySQL', 'سئو'], en: ['PHP', 'MySQL', 'SEO'] },
      views: 0
    };
  }

  // Handle flat MySQL columns if returned directly (title_fa, title_en, etc.)
  const titleFa = item.title_fa || (typeof item.title === 'string' ? item.title : item.title?.fa) || 'بدون عنوان';
  const titleEn = item.title_en || (typeof item.title === 'object' ? item.title?.en : item.title) || titleFa;

  const slugFa = item.slug_fa || (typeof item.slug === 'string' ? item.slug : item.slug?.fa) || titleFa.toLowerCase().replace(/\s+/g, '-');
  const slugEn = item.slug_en || (typeof item.slug === 'object' ? item.slug?.en : item.slug) || titleEn.toLowerCase().replace(/\s+/g, '-');

  const excerptFa = item.excerpt_fa || (typeof item.excerpt === 'string' ? item.excerpt : item.excerpt?.fa) || '';
  const excerptEn = item.excerpt_en || (typeof item.excerpt === 'object' ? item.excerpt?.en : item.excerpt) || excerptFa;

  const contentFa = item.content_fa || (typeof item.content === 'string' ? item.content : item.content?.fa) || excerptFa;
  const contentEn = item.content_en || (typeof item.content === 'object' ? item.content?.en : item.content) || contentFa;

  const rawPostType = item.postType || item.post_type || (String(item.id || '').startsWith('news-') ? 'news' : 'article');
  const postType = rawPostType === 'news' ? 'news' : 'article';

  const defaultCatFa = postType === 'news' ? 'اخبار و اطلاعیه‌ها' : 'مقالات تخصصی';
  const defaultCatEn = postType === 'news' ? 'News & Announcements' : 'Technical Articles';

  return {
    id: String(item.id || item.post_id || `post-${Date.now()}`),
    postType,
    slug: { fa: String(slugFa), en: String(slugEn) },
    title: { fa: String(titleFa), en: String(titleEn) },
    excerpt: { fa: String(excerptFa), en: String(excerptEn) },
    content: { fa: String(contentFa), en: String(contentEn) },
    author: parseBilingual(
      item.author,
      postType === 'news' ? 'روابط عمومی بیئس' : 'تیم فنی بیئس',
      postType === 'news' ? 'Biesse Press' : 'Biesss Engineering'
    ),
    date: String(item.date || item.created_at || new Date().toISOString().split('T')[0]),
    readTime: String(item.readTime || item.read_time || (postType === 'news' ? '3 min' : '5 min')),
    category: parseBilingual(item.category, defaultCatFa, defaultCatEn),
    coverImage: String(
      item.coverImage || item.cover_image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
    ),
    seoTitle: parseBilingual(item.seoTitle || item.seo_title, titleFa, titleEn),
    seoDescription: parseBilingual(item.seoDescription || item.seo_description, excerptFa, excerptEn),
    seoKeywords: parseKeywords(item.seoKeywords || item.seo_keywords),
    views: typeof item.views === 'number' ? item.views : (parseInt(item.views, 10) || 0)
  };
}

export function sanitizePosts(rawPosts: any): BlogPost[] {
  if (!Array.isArray(rawPosts)) return [];
  return rawPosts.map(sanitizeBlogPost);
}
