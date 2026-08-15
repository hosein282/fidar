'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Language, BlogPost, SEOMetaConfig } from '../types';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AdminPanel } from '../components/AdminPanel';
import { PhpExporter } from '../components/PhpExporter';
import { sanitizeBlogPost } from '../utils/sanitize';
import { 
  Search, Calendar, Clock, Eye, Code2, ArrowLeft, ArrowRight, 
  Tag, Filter, ChevronRight, X, Share2, Sparkles, BookOpen, Newspaper, Trophy
} from 'lucide-react';

interface BlogPageProps {
  posts: BlogPost[];
  seoConfig: SEOMetaConfig;
  onOpenAdmin?: () => void;
  onOpenExporter?: () => void;
  lang?: Language;
  postId?: string;
}

const BlogPageComponent: React.FC<BlogPageProps> = ({
  posts,
  seoConfig,
  onOpenAdmin = () => {},
  onOpenExporter = () => {},
  lang = 'fa',
  postId,
}) => {
  const router = useRouter();

  const currentLang: Language = (lang === 'en' || lang === 'fa') ? lang : 'fa';
  const isFa = currentLang === 'fa';
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showSchemaModal, setShowSchemaModal] = useState(false);
  const [activeModal, setActiveModal] = useState<'admin' | 'exporter' | null>(null);
  const [pagePosts, setPagePosts] = useState(posts);

  const safePosts = (Array.isArray(pagePosts) ? pagePosts : []).map(sanitizeBlogPost);

  // Sync HTML lang and dir attribute
  useEffect(() => {
    document.documentElement.setAttribute('dir', isFa ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', currentLang);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentLang, postId]);

  useEffect(() => {
    setPagePosts(posts);
  }, [posts]);

  const activePost = postId ? safePosts.find(p => p.id === postId) : null;

  const handleLanguageSwitch = (newLang: Language) => {
    if (postId) {
      router.push(`/${newLang}/blog/${postId}`);
    } else {
      router.push(`/${newLang}/blog`);
    }
  };

  const handleOpenAdmin = () => {
    setActiveModal('admin');
    onOpenAdmin?.();
  };

  const handleOpenExporter = () => {
    setActiveModal('exporter');
    onOpenExporter?.();
  };

  // Filter posts
  const filteredPosts = safePosts.filter(post => {
    const title = (isFa ? post.title?.fa : post.title?.en) || '';
    const excerpt = (isFa ? post.excerpt?.fa : post.excerpt?.en) || '';
    const category = (isFa ? post.category?.fa : post.category?.en) || '';
    
    const matchesSearch = 
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedCategory === 'all') return matchesSearch;
    if (selectedCategory === 'news') return matchesSearch && (post.postType === 'news' || category.toLowerCase().includes('news') || category.includes('خبر') || category.includes('STORY'));
    if (selectedCategory === 'article') return matchesSearch && (post.postType === 'article' || category.toLowerCase().includes('article') || category.includes('مقاله') || category.includes('آموزش'));
    if (selectedCategory === 'events') return matchesSearch && (category.toLowerCase().includes('event') || category.includes('رویداد'));

    return matchesSearch;
  });

  const categories = [
    { id: 'all', nameFa: 'همه مطالب', nameEn: 'All Articles' },
    { id: 'news', nameFa: 'اخبار و مشتریان', nameEn: 'News & Stories' },
    { id: 'article', nameFa: 'مقالات تخصصی', nameEn: 'Technical Guides' },
    { id: 'events', nameFa: 'رویدادها و نمایشگاه‌ها', nameEn: 'Events' },
  ];

  return (
    <div className="min-h-screen bg-surface text-slate-900 font-sans selection:bg-primary selection:text-white flex flex-col justify-between">
      <div>
        {/* Main Header */}
        <Header
          lang={currentLang}
          onLanguageChange={handleLanguageSwitch}
          onOpenAdmin={handleOpenAdmin}
          onOpenExporter={handleOpenExporter}
          seoConfig={seoConfig}
        />

        {/* Page Main Content */}
        <main className="pb-24">
          
          {/* Active Post Single View */}
          {activePost ? (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
              
              {/* Breadcrumb Navigation */}
              <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 mb-8 overflow-x-auto whitespace-nowrap">
                <Link href={`/${currentLang}`} className="hover:text-primary transition">
                  {isFa ? 'صفحه اصلی' : 'Home'}
                </Link>
                <span>/</span>
                <Link href={`/${currentLang}/blog`} className="hover:text-primary transition">
                  {isFa ? 'اخبار و مقالات' : 'News & Articles'}
                </Link>
                <span>/</span>
                <span className="text-slate-900 font-bold truncate max-w-[200px] sm:max-w-[300px]">
                  {isFa ? activePost.title?.fa : activePost.title?.en}
                </span>
              </nav>

              {/* Back to Blog List Button */}
              <button
                onClick={() => router.push(`/${currentLang}/blog`)}
                className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-300 hover:border-primary hover:text-primary text-xs sm:text-sm font-bold shadow-sm transition"
              >
                <ArrowIcon className="w-4 h-4" />
                <span>{isFa ? 'بازگشت به فهرست اخبار و مقالات' : 'Back to News List'}</span>
              </button>

              {/* Main Article Container */}
              <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
                
                {/* Meta Header */}
                <div className="space-y-4 border-b border-slate-100 pb-6">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="text-primary font-bold px-3 py-1 bg-teal-50 rounded-full border border-teal-200">
                      {isFa ? activePost.category?.fa : activePost.category?.en}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {activePost.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {activePost.readTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      {activePost.views || 0} {isFa ? 'بازدید' : 'views'}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                    {isFa ? activePost.title?.fa : activePost.title?.en}
                  </h1>

                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-light">
                    {isFa ? activePost.excerpt?.fa : activePost.excerpt?.en}
                  </p>
                </div>

                {/* Article Cover Image */}
                <div className="rounded-2xl overflow-hidden h-72 sm:h-96 lg:h-[440px] bg-slate-100 border border-slate-200 shadow-inner">
                  <img 
                    src={activePost.coverImage} 
                    alt={isFa ? activePost.title?.fa : activePost.title?.en} 
                    width={1200}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Main Article Text */}
                <div className="prose max-w-none text-slate-800 text-base sm:text-lg leading-relaxed whitespace-pre-line font-normal space-y-4">
                  {isFa ? activePost.content?.fa : activePost.content?.en}
                </div>

                {/* Keywords Tags */}
                <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  <Tag className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold text-slate-500">{isFa ? 'برچسب‌ها:' : 'Keywords:'}</span>
                  {(isFa ? activePost.seoKeywords?.fa : activePost.seoKeywords?.en)?.map((kw, idx) => (
                    <span key={idx} className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded-lg transition font-mono">
                      #{kw}
                    </span>
                  ))}
                </div>

                {/* Footer Controls: Author & Schema Modal */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                      {(isFa ? activePost.author?.fa : activePost.author?.en)?.charAt(0) || 'B'}
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">{isFa ? 'نویسنده و ناشر' : 'Author & Publisher'}</div>
                      <div className="text-sm font-bold text-slate-900">
                        {isFa ? activePost.author?.fa : activePost.author?.en}
                      </div>
                    </div>
                  </div>

                  {/* <button
                    onClick={() => setShowSchemaModal(true)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-primary hover:text-white text-primary border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Code2 className="w-4 h-4" />
                    <span>{isFa ? 'مشاهده اسکیما JSON-LD سئو' : 'View Schema.org JSON-LD'}</span>
                  </button> */}
                </div>

              </article>

              {/* Related Posts Section */}
              <div className="mt-16 space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 border-r-4 border-primary pr-3">
                  {isFa ? 'سایر اخبار و مقالات مرتبط' : 'Related News & Articles'}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {safePosts
                    .filter(p => p.id !== activePost.id)
                    .slice(0, 2)
                    .map(relPost => (
                      <div 
                        key={relPost.id}
                        onClick={() => router.push(`/${currentLang}/blog/${relPost.id}`)}
                        className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer flex gap-4 group"
                      >
                        <img 
                          src={relPost.coverImage} 
                          alt="Related" 
                          width={96}
                          height={96}
                          loading="lazy"
                          decoding="async"
                          className="w-24 h-24 rounded-xl object-cover shrink-0 group-hover:scale-105 transition"
                        />
                        <div className="space-y-2 flex-1">
                          <span className="text-[10px] uppercase font-bold text-primary tracking-widest block">
                            {isFa ? relPost.category?.fa : relPost.category?.en}
                          </span>
                          <h4 className="font-bold text-slate-900 text-sm line-clamp-2 group-hover:text-primary transition">
                            {isFa ? relPost.title?.fa : relPost.title?.en}
                          </h4>
                          <span className="text-xs text-slate-400 block font-mono">
                            {relPost.date}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

            </div>
          ) : (
            /* Blog List / News Directory View */
            <div className="space-y-12">
              
              {/* Blog Top Banner Hero */}
              <div className="bg-primary-dark text-white py-16 sm:py-24 px-4 sm:px-8 relative overflow-hidden">
                <div className="max-w-7xl mx-auto space-y-6 relative z-10 text-center sm:text-right">
                  
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-mono font-bold border border-white/20">
                    <Newspaper className="w-3.5 h-3.5 text-teal-300" />
                    <span>{isFa ? 'پرتال اخبار و مقالات فیدار بندار' : 'Fidar Bondar News & Articles Hub'}</span>
                  </div>

                  <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight ${isFa ? 'text-right' : 'text-left'}`}>
                    {isFa ? 'اخبار، دستاوردها و مقالات تخصصی فیدار بندار' : 'Fidar Bondar News, Events & Technical Insights'}
                  </h1>

                  <p className="text-teal-100/90 text-sm sm:text-lg max-w-3xl font-light leading-relaxed">
                    {isFa ? (
                      'آخرین رویدادهای صنعتی، داستان موفقیت مشتریان، تکنولوژی‌های پیشرفته ماشین‌آلات و راهنماهای جامع سئو و برنامه‌نویسی.'
                    ) : (
                      'Explore the latest industrial events, customer success stories, advanced machinery tech, and technical engineering guides.'
                    )}
                  </p>

                  {/* Search Bar */}
                  <div className="pt-4 max-w-2xl">
                    <div className="relative">
                      <Search className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={isFa ? 'جستجو در اخبار، موضوعات و مقالات...' : 'Search articles, news, and topics...'}
                        className="w-full pr-12 pl-4 py-3.5 rounded-2xl bg-white text-slate-900 placeholder-slate-400 text-sm sm:text-base border border-transparent focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-xl"
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* Main Directory Area */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                
                {/* Category Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  <Filter className="w-4 h-4 text-primary shrink-0" />
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-300'
                      }`}
                    >
                      {isFa ? cat.nameFa : cat.nameEn}
                    </button>
                  ))}
                </div>

                {/* Featured First Post Card */}
                {filteredPosts.length > 0 && selectedCategory === 'all' && !searchQuery && (
                  <div 
                    onClick={() => router.push(`/${currentLang}/blog/${filteredPosts[0].id}`)}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 cursor-pointer group hover:border-primary transition duration-300"
                  >
                    <div className="lg:col-span-7 h-64 sm:h-80 lg:h-auto overflow-hidden relative">
                      <img 
                        src={filteredPosts[0].coverImage} 
                        alt="Featured" 
                        width={1200}
                        height={800}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <span className="absolute top-4 right-4 bg-primary text-white text-xs font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                        {isFa ? 'ویژه / Featured' : 'Featured'}
                      </span>
                    </div>
                    <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <span className="text-xs font-mono font-bold text-primary tracking-widest uppercase block">
                          {isFa ? filteredPosts[0].category?.fa : filteredPosts[0].category?.en}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-primary transition leading-snug">
                          {isFa ? filteredPosts[0].title?.fa : filteredPosts[0].title?.en}
                        </h2>
                        <p className="text-slate-600 text-sm sm:text-base line-clamp-3 font-light leading-relaxed">
                          {isFa ? filteredPosts[0].excerpt?.fa : filteredPosts[0].excerpt?.en}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {filteredPosts[0].date}
                        </span>
                        <span className="flex items-center gap-1 text-primary font-bold group-hover:underline">
                          <span>{isFa ? 'مطالعه کامل' : 'Read Article'}</span>
                          <ArrowIcon className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Posts Grid */}
                {filteredPosts.length === 0 ? (
                  <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
                    <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
                    <h3 className="text-xl font-bold text-slate-700">
                      {isFa ? 'مقاله‌ای یافت نشد' : 'No articles found'}
                    </h3>
                    <p className="text-slate-500 text-sm max-w-md mx-auto">
                      {isFa ? 'عبارت دیگری را جستجو کنید یا فیلتر دسته‌بندی را تغییر دهید.' : 'Try a different search term or select another category.'}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => {
                      const titleStr = (isFa ? post.title?.fa : post.title?.en) || '';
                      const excerptStr = (isFa ? post.excerpt?.fa : post.excerpt?.en) || '';
                      const catStr = (isFa ? post.category?.fa : post.category?.en) || '';

                      return (
                        <article
                          key={post.id}
                          onClick={() => router.push(`/${currentLang}/blog/${post.id}`)}
                          className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl hover:border-primary transition duration-300 flex flex-col justify-between cursor-pointer group"
                        >
                          <div>
                            <div className="h-52 overflow-hidden bg-slate-100 relative">
                              <img 
                                src={post.coverImage} 
                                alt={titleStr} 
                                width={1200}
                                height={800}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                              />
                              <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                {catStr}
                              </span>
                            </div>

                            <div className="p-6 space-y-3">
                              <h3 className="text-lg font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-primary transition">
                                {titleStr}
                              </h3>
                              <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 font-light leading-relaxed">
                                {excerptStr}
                              </p>
                            </div>
                          </div>

                          <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between text-xs text-slate-500 font-mono">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              {post.date}
                            </span>
                            <span className="flex items-center gap-1 text-primary font-bold group-hover:translate-x-1 transition-transform">
                              <span>{isFa ? 'مطالعه' : 'Read'}</span>
                              <ArrowIcon className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}

              </div>

            </div>
          )}

        </main>
      </div>

      {/* Schema Modal */}
      {showSchemaModal && activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in text-slate-900">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative space-y-4 shadow-2xl dir-rtl">
            <button
              onClick={() => setShowSchemaModal(false)}
              className="absolute top-4 left-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2 text-primary font-bold text-lg">
              <Code2 className="w-5 h-5" />
              <span>{isFa ? 'کدهای JSON-LD Schema مقاله' : 'Generated Schema.org JSON-LD'}</span>
            </div>

            <pre className="p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto dir-ltr text-left">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": isFa ? activePost.seoTitle?.fa : activePost.seoTitle?.en,
  "description": isFa ? activePost.seoDescription?.fa : activePost.seoDescription?.en,
  "author": {
    "@type": "Organization",
    "name": isFa ? activePost.author?.fa : activePost.author?.en
  },
  "datePublished": activePost.date,
  "image": activePost.coverImage,
  "inLanguage": [currentLang],
  "keywords": (isFa ? activePost.seoKeywords?.fa : activePost.seoKeywords?.en)?.join(", ")
}, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer
        lang={currentLang}
        onOpenExporter={handleOpenExporter}
        onOpenAdmin={handleOpenAdmin}
      />

      {activeModal && (
        <div className="fixed inset-0 z-[220] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-6xl max-h-[90vh] overflow-auto rounded-3xl bg-white p-2 sm:p-4 shadow-2xl">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute left-4 top-4 z-10 rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900"
              aria-label="Close"
            >
              ×
            </button>
            {activeModal === 'admin' ? (
              <AdminPanel
                lang={currentLang}
                onClose={() => setActiveModal(null)}
                seoConfig={seoConfig}
                onUpdateSeo={() => {}}
                posts={pagePosts}
                onUpdatePosts={setPagePosts}
              />
            ) : (
              <PhpExporter lang={currentLang} onClose={() => setActiveModal(null)} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPageComponent;
export { BlogPageComponent as BlogPage };
