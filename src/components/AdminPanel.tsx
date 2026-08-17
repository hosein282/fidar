import React, { useState, useEffect } from 'react';
import { Language, ContactMessage, SEOMetaConfig, BlogPost } from '../types';
import { LayoutDashboard, Lock, Key, Mail, Sparkles, Wand2, Database, RefreshCw, X, Check, Globe, FileText, Plus, Edit, Trash2, Save, Search } from 'lucide-react';

interface AdminPanelProps {
  lang: Language;
  onClose: () => void;
  seoConfig: SEOMetaConfig;
  onUpdateSeo: (seo: SEOMetaConfig) => void;
  posts: BlogPost[];
  onUpdatePosts: (posts: BlogPost[]) => void;
  isStandalone?: boolean;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  lang,
  onClose,
  seoConfig,
  onUpdateSeo,
  posts,
  onUpdatePosts,
  isStandalone = false
}) => {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'articles' | 'messages' | 'ai-assistant'>('articles');

  // Messages state
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Articles & News Management state
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [isSavingArticle, setIsSavingArticle] = useState(false);
  const [articleSuccessMsg, setArticleSuccessMsg] = useState('');
  const [articleErrorMsg, setArticleErrorMsg] = useState('');

  // AI Assistant state
  const [aiInput, setAiInput] = useState('');
  const [aiTargetLang, setAiTargetLang] = useState<'fa' | 'en'>('en');
  const [aiTranslated, setAiTranslated] = useState('');
  const [aiTranslating, setAiTranslating] = useState(false);

  // AI SEO Generator state
  const [seoTopic, setSeoTopic] = useState('');
  const [aiSeoResult, setAiSeoResult] = useState<{ title: string; desc: string; keywords: string[] } | null>(null);
  const [generatingSeo, setGeneratingSeo] = useState(false);

  const isFa = lang === 'fa';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'biesss2026' || password === 'admin') {
      setIsLoggedIn(true);
      setErrorMsg('');
      fetchMessages();
    } else {
      setErrorMsg(isFa ? 'رمز عبور اشتباه است (رمز پیش‌فرض: biesss2026)' : 'Incorrect password (default: biesss2026)');
    }
  };

  const fetchMessages = async () => {
    setLoadingMessages(true);
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      setMessages(data);
    } catch {
      // fallback
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleCreateNewPost = (type: 'article' | 'news' = 'article') => {
    setEditingPost({
      id: `${type}-${Date.now()}`,
      postType: type,
      title: { fa: '', en: '' },
      slug: { fa: '', en: '' },
      excerpt: { fa: '', en: '' },
      content: { fa: '', en: '' },
      author: {
        fa: type === 'news' ? 'روابط عمومی فیدار بندار' : 'تیم فنی فیدار بندار',
        en: type === 'news' ? 'Fidar Bondar Press Team' : 'Biesss Engineering'
      },
      date: new Date().toISOString().split('T')[0],
      readTime: type === 'news' ? '3 min' : '5 min',
      category: {
        fa: type === 'news' ? 'اخبار و اطلاعیه‌ها' : 'مقالات تخصصی',
        en: type === 'news' ? 'News & Announcements' : 'Technical Articles'
      },
      coverImage: type === 'news'
        ? 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
        : 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      seoTitle: { fa: '', en: '' },
      seoDescription: { fa: '', en: '' },
      seoKeywords: { fa: ['PHP', 'MySQL', 'سئو'], en: ['PHP', 'MySQL', 'SEO'] },
      views: 0
    });
    setArticleSuccessMsg('');
    setArticleErrorMsg('');
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setArticleSuccessMsg('');
    setArticleErrorMsg('');

    if (!editingPost || !editingPost.title?.fa || !editingPost.title.fa.trim()) {
      setArticleErrorMsg(isFa ? 'خطا: عنوان عنوان فارسی اجباری است.' : 'Error: Persian title is required.');
      return;
    }

    setIsSavingArticle(true);
    const targetType = editingPost.postType || 'article';
    const targetEndpoint = targetType === 'news' ? '/api/news' : '/api/articles';

    const finalPost: BlogPost = {
      id: editingPost.id || `${targetType}-${Date.now()}`,
      postType: targetType,
      title: {
        fa: editingPost.title.fa.trim(),
        en: editingPost.title?.en?.trim() || editingPost.title.fa.trim()
      },
      slug: {
        fa: editingPost.slug?.fa?.trim() || editingPost.title.fa.trim().toLowerCase().replace(/\s+/g, '-'),
        en: editingPost.slug?.en?.trim() || (editingPost.title?.en || editingPost.title.fa).trim().toLowerCase().replace(/\s+/g, '-')
      },
      excerpt: {
        fa: editingPost.excerpt?.fa?.trim() || '',
        en: editingPost.excerpt?.en?.trim() || ''
      },
      content: {
        fa: editingPost.content?.fa?.trim() || editingPost.excerpt?.fa?.trim() || '',
        en: editingPost.content?.en?.trim() || editingPost.excerpt?.en?.trim() || ''
      },
      author: editingPost.author || {
        fa: targetType === 'news' ? 'روابط عمومی فیدار بندار' : 'تیم فنی فیدار بندار',
        en: targetType === 'news' ? 'Fidar Bondar Press Team' : 'Biesss Engineering'
      },
      date: editingPost.date || new Date().toISOString().split('T')[0],
      readTime: editingPost.readTime || '5 min',
      category: editingPost.category || {
        fa: targetType === 'news' ? 'اخبار و اطلاعیه‌ها' : 'مقالات تخصصی',
        en: targetType === 'news' ? 'News & Announcements' : 'Technical Articles'
      },
      coverImage: editingPost.coverImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      seoTitle: {
        fa: editingPost.seoTitle?.fa?.trim() || editingPost.title.fa.trim(),
        en: editingPost.seoTitle?.en?.trim() || (editingPost.title?.en || editingPost.title.fa).trim()
      },
      seoDescription: {
        fa: editingPost.seoDescription?.fa?.trim() || editingPost.excerpt?.fa?.trim() || '',
        en: editingPost.seoDescription?.en?.trim() || editingPost.excerpt?.en?.trim() || ''
      },
      seoKeywords: editingPost.seoKeywords || { fa: [], en: [] },
      views: editingPost.views || 0
    };

    try {
      const res = await fetch(targetEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalPost)
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.posts)) {
        onUpdatePosts(data.posts);
        setArticleSuccessMsg(
          isFa
            ? `${targetType === 'news' ? 'خبر' : 'مقاله'} با موفقیت در دیتابیس ثبت گردید.`
            : 'Successfully saved to MySQL database.'
        );
        setEditingPost(null);
      } else if (data.success && (Array.isArray(data.articles) || Array.isArray(data.news))) {
        // Fetch fresh all posts
        const freshBlog = await fetch('/api/blog');
        const freshPosts = await freshBlog.json();
        if (Array.isArray(freshPosts)) onUpdatePosts(freshPosts);
        setArticleSuccessMsg(isFa ? 'محتوا با موفقیت ثبت گردید.' : 'Saved successfully.');
        setEditingPost(null);
      } else {
        // Fallback to /api/blog
        const blogRes = await fetch('/api/blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalPost)
        });
        const blogData = await blogRes.json();
        if (blogData.success && Array.isArray(blogData.posts)) {
          onUpdatePosts(blogData.posts);
          setArticleSuccessMsg(isFa ? 'اطلاعات در دیتابیس ذخیره شد.' : 'Saved to database.');
          setEditingPost(null);
        } else {
          setArticleErrorMsg(blogData.error || (isFa ? 'خطا در ثبت اطلاعات در دیتابیس.' : 'Error saving to database.'));
        }
      }
    } catch {
      // Local state fallback
      const updated = [...posts];
      const idx = updated.findIndex(p => p.id === finalPost.id);
      if (idx >= 0) updated[idx] = finalPost;
      else updated.unshift(finalPost);
      onUpdatePosts(updated);
      setArticleSuccessMsg(isFa ? 'محتوا در حافظه محلی ذخیره شد.' : 'Saved locally.');
      setEditingPost(null);
    } finally {
      setIsSavingArticle(false);
    }
  };

  const handleDeleteArticle = async (id: string) => {
    if (!window.confirm(isFa ? 'آیا از حذف این خبر/مقاله از دیتابیس اطمینان دارید؟' : 'Are you sure you want to delete this post?')) return;
    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success && Array.isArray(data.posts)) {
        onUpdatePosts(data.posts);
      }
    } catch {
      onUpdatePosts(posts.filter(p => p.id !== id));
    }
  };

  const handleAutoSeoForArticle = async () => {
    if (!editingPost?.title?.fa) return;
    setGeneratingSeo(true);
    try {
      const res = await fetch('/api/ai/seo-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: editingPost.title.fa, lang: 'fa' })
      });
      const data = await res.json();
      if (data.success) {
        setEditingPost(prev => prev ? ({
          ...prev,
          seoTitle: { fa: data.seoTitle, en: prev.seoTitle?.en || data.seoTitle },
          seoDescription: { fa: data.seoDesc, en: prev.seoDescription?.en || data.seoDesc },
          seoKeywords: { fa: data.keywords || [], en: prev.seoKeywords?.en || ['SEO', 'PHP', 'News'] }
        }) : null);
      }
    } catch {
      //
    } finally {
      setGeneratingSeo(false);
    }
  };

  const handleAiTranslate = async () => {
    if (!aiInput.trim()) return;
    setAiTranslating(true);
    setAiTranslated('');
    try {
      const res = await fetch('/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: aiInput, targetLang: aiTargetLang })
      });
      const data = await res.json();
      if (data.translatedText) {
        setAiTranslated(data.translatedText);
      }
    } catch (err: any) {
      setAiTranslated('Translation failed.');
    } finally {
      setAiTranslating(false);
    }
  };

  const handleAiSeoGenerate = async () => {
    if (!seoTopic.trim()) return;
    setGeneratingSeo(true);
    setAiSeoResult(null);
    try {
      const res = await fetch('/api/ai/seo-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: seoTopic, lang: isFa ? 'fa' : 'en' })
      });
      const data = await res.json();
      if (data.success) {
        setAiSeoResult({
          title: data.seoTitle,
          desc: data.seoDesc,
          keywords: data.keywords || []
        });
      }
    } catch (err: any) {
      //
    } finally {
      setGeneratingSeo(false);
    }
  };

  return (
    <div className={isStandalone ? "min-h-screen bg-surface" : "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"}>
      <div className={isStandalone ? "bg-white min-h-screen max-w-7xl mx-auto px-6 sm:px-10 py-8 space-y-8 text-slate-900" : "bg-white border border-slate-200 rounded-2xl max-w-5xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl text-slate-900"}>
        
        {!isStandalone && (
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900"
        >
          <X className="w-5 h-5" />
        </button>
        )}

        {!isLoggedIn ? (
          /* Password Login Form */
          <div className="max-w-md mx-auto py-10 space-y-6 text-center">
            <div className="w-14 h-14 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto text-blue-600">
              <Lock className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                {isFa ? 'ورود به پنل مدیریت دیتابیس PHP' : 'CMS Administration Login'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {isFa ? 'جهت مدیریت اخبار، مقالات دیتابیس، پیام‌ها و تنظیمات سئوی گوگل' : 'Access database news, articles, inquiries & SEO configurations.'}
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-left dir-ltr">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  {isFa ? 'رمز عبور (پیش‌فرض: biesss2026)' : 'Passcode (Default: biesss2026)'}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white"
                  placeholder="biesss2026"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm transition shadow-sm"
              >
                {isFa ? 'ورود به پنل' : 'Authenticate'}
              </button>
            </form>
          </div>
        ) : (
          /* Logged In CMS Panel */
          <div className="space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-600">
                  <LayoutDashboard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {isFa ? 'پنل مدیریت محتوای دیتابیس' : 'Biesss Database CMS Control Panel'}
                  </h3>
                  <span className="text-xs text-blue-600 font-mono font-semibold">
                    {isFa ? 'اتصال مستقیم به دیتابیس MySQL • فعال' : 'MySQL Database PDO Active'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsLoggedIn(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-700 hover:bg-slate-200 font-medium"
              >
                {isFa ? 'خروج' : 'Logout'}
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 gap-4 overflow-x-auto">
              <button
                onClick={() => setActiveTab('articles')}
                className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${
                  activeTab === 'articles' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>{isFa ? `مدیریت اخبار و مقالات (${posts.length})` : `Articles & News (${posts.length})`}</span>
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${
                  activeTab === 'messages' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>{isFa ? `پیام‌های دریافتی (${messages.length})` : `Inquiries (${messages.length})`}</span>
              </button>

              <button
                onClick={() => setActiveTab('ai-assistant')}
                className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${
                  activeTab === 'ai-assistant' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>{isFa ? 'دستیار سئوی Gemini AI' : 'Gemini AI Assistant'}</span>
              </button>
            </div>

            {/* ========================================================= */}
            {/* ARTICLES & NEWS CMS TAB */}
            {/* ========================================================= */}
            {activeTab === 'articles' && (
              <div className="space-y-6">
                
                {articleSuccessMsg && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-medium flex items-center gap-2">
                    <Check className="w-5 h-5 text-emerald-600" />
                    <span>{articleSuccessMsg}</span>
                  </div>
                )}

                {articleErrorMsg && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs sm:text-sm font-medium flex items-center gap-2">
                    <X className="w-5 h-5 text-red-600" />
                    <span>{articleErrorMsg}</span>
                  </div>
                )}

                {/* Top Action Bar */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="text-xs text-slate-500">
                    {isFa ? 'مدیریت تفکیک‌شده مقالات (جدول: articles) و اخبار (جدول: news) در دیتابیس MySQL:' : 'Separately manage articles and news in MySQL database:'}
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => handleCreateNewPost('article')}
                      className="px-3.5 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isFa ? 'افزودن مقاله جدید (articles)' : 'Add Article'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCreateNewPost('news')}
                      className="px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isFa ? 'افزودن خبر جدید (news)' : 'Add News'}</span>
                    </button>
                  </div>
                </div>

                {/* EDITING FORM MODAL / PANEL */}
                {editingPost ? (
                  <form onSubmit={handleSaveArticle} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <Edit className="w-4 h-4 text-blue-600" />
                        <span>
                          {editingPost.id && !editingPost.id.startsWith('article-') && !editingPost.id.startsWith('news-')
                            ? (isFa ? 'ویرایش محتوا و سئو' : 'Edit Post & SEO') 
                            : (isFa 
                                ? `افزودن ${editingPost.postType === 'news' ? 'خبر' : 'مقاله'} جدید` 
                                : `New ${editingPost.postType === 'news' ? 'News' : 'Article'}`
                              )}
                        </span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => setEditingPost(null)}
                        className="text-xs text-slate-500 hover:text-slate-900 font-bold"
                      >
                        {isFa ? 'انصراف' : 'Cancel'}
                      </button>
                    </div>

                    {/* Content Type Selector */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isFa ? 'نوع محتوا و جدول ذخیره‌سازی در MySQL *' : 'Content Type & MySQL Table *'}
                      </label>
                      <select
                        value={editingPost.postType || 'article'}
                        onChange={(e) => setEditingPost({
                          ...editingPost,
                          postType: e.target.value as 'article' | 'news',
                          category: {
                            fa: e.target.value === 'news' ? 'اخبار و اطلاعیه‌ها' : 'مقالات تخصصی',
                            en: e.target.value === 'news' ? 'News & Announcements' : 'Technical Articles'
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-sm font-bold focus:outline-none focus:border-blue-600"
                      >
                        <option value="article">{isFa ? '📚 مقاله تخصصی (ذخیره در جدول articles)' : '📚 Article (Table: articles)'}</option>
                        <option value="news">{isFa ? '📰 خبر / اطلاعیه شرکت (ذخیره در جدول news)' : '📰 News (Table: news)'}</option>
                      </select>
                    </div>

                    {/* Basic Article Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {isFa ? 'عنوان (فارسی) *' : 'Title (Persian) *'}
                        </label>
                        <input
                          type="text"
                          required
                          value={editingPost.title?.fa || ''}
                          onChange={(e) => setEditingPost({
                            ...editingPost,
                            title: { ...editingPost.title, fa: e.target.value, en: editingPost.title?.en || e.target.value }
                          })}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-600"
                          placeholder={isFa ? 'عنوان مقاله یا خبر را وارد کنید...' : 'Enter title...'}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {isFa ? 'عنوان (انگلیسی)' : 'Title (English)'}
                        </label>
                        <input
                          type="text"
                          value={editingPost.title?.en || ''}
                          onChange={(e) => setEditingPost({
                            ...editingPost,
                            title: { fa: editingPost.title?.fa || '', en: e.target.value }
                          })}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-600 dir-ltr"
                          placeholder="English title..."
                        />
                      </div>
                    </div>

                    {/* Excerpt */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {isFa ? 'خلاصه خبر (فارسی)' : 'Excerpt (Persian)'}
                        </label>
                        <textarea
                          rows={2}
                          value={editingPost.excerpt?.fa || ''}
                          onChange={(e) => setEditingPost({
                            ...editingPost,
                            excerpt: { ...editingPost.excerpt, fa: e.target.value, en: editingPost.excerpt?.en || '' }
                          })}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                          placeholder={isFa ? 'توضیحات کوتاه خلاصه خبر جهت نمایش در کارت...' : 'Short summary...'}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {isFa ? 'خلاصه خبر (انگلیسی)' : 'Excerpt (English)'}
                        </label>
                        <textarea
                          rows={2}
                          value={editingPost.excerpt?.en || ''}
                          onChange={(e) => setEditingPost({
                            ...editingPost,
                            excerpt: { fa: editingPost.excerpt?.fa || '', en: e.target.value }
                          })}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600 dir-ltr"
                          placeholder="Short summary in English..."
                        />
                      </div>
                    </div>

                    {/* Full Content */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {isFa ? 'متن کامل خبر یا مقاله (فارسی) *' : 'Full Article Content (Persian) *'}
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={editingPost.content?.fa || ''}
                          onChange={(e) => setEditingPost({
                            ...editingPost,
                            content: { ...editingPost.content, fa: e.target.value, en: editingPost.content?.en || '' }
                          })}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                          placeholder={isFa ? 'محتوای کامل خبر و تحلیل‌های مربوطه...' : 'Full content...'}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {isFa ? 'متن کامل خبر یا مقاله (انگلیسی)' : 'Full Article Content (English)'}
                        </label>
                        <textarea
                          rows={4}
                          value={editingPost.content?.en || ''}
                          onChange={(e) => setEditingPost({
                            ...editingPost,
                            content: { fa: editingPost.content?.fa || '', en: e.target.value }
                          })}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-blue-600 dir-ltr"
                          placeholder={isFa ? 'محتوای کامل خبر به زبان انگلیسی...' : 'Full content in English...'}
                        />
                      </div>
                    </div>

                    {/* Category & Cover Image */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {isFa ? 'دسته‌بندی (فارسی)' : 'Category (Persian)'}
                        </label>
                        <input
                          type="text"
                          value={editingPost.category?.fa || ''}
                          onChange={(e) => setEditingPost({
                            ...editingPost,
                            category: { fa: e.target.value, en: editingPost.category?.en || 'News' }
                          })}
                          className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                          placeholder={isFa ? 'اخبار سئو / برنامه‌نویسی PHP' : 'Category'}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {isFa ? 'تصویر شاخص (URL)' : 'Cover Image URL'}
                        </label>
                        <input
                          type="text"
                          value={editingPost.coverImage || ''}
                          onChange={(e) => setEditingPost({ ...editingPost, coverImage: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600 dir-ltr"
                          placeholder="https://images.unsplash.com/..."
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {isFa ? 'اسلاگ آدرس (Slug)' : 'URL Slug'}
                        </label>
                        <input
                          type="text"
                          value={editingPost.slug?.fa || ''}
                          onChange={(e) => setEditingPost({
                            ...editingPost,
                            slug: { fa: e.target.value, en: editingPost.slug?.en || e.target.value }
                          })}
                          className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600 dir-ltr"
                          placeholder="php-mysql-seo-news"
                        />
                      </div>
                    </div>

                    {/* ========================================================= */}
                    {/* SEO CONTENT METADATA SECTION */}
                    {/* ========================================================= */}
                    <div className="p-4 rounded-xl bg-white border border-blue-200 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                          <Globe className="w-4 h-4 text-blue-600" />
                          <span>{isFa ? 'بخش سئو و تنظیمات گوگل (SEO Metadata)' : 'Google SEO & Metadata Fields'}</span>
                        </span>

                        <button
                          type="button"
                          onClick={handleAutoSeoForArticle}
                          disabled={generatingSeo}
                          className="px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 text-xs font-bold flex items-center gap-1"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                          <span>{generatingSeo ? (isFa ? 'در حال تولید...' : 'Generating...') : (isFa ? 'تولید خودکار سئو با AI' : 'Auto SEO with AI')}</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            {isFa ? 'عنوان سئو (SEO Title Google)' : 'SEO Title (Google)'}
                          </label>
                          <input
                            type="text"
                            value={editingPost.seoTitle?.fa || ''}
                            onChange={(e) => setEditingPost({
                              ...editingPost,
                              seoTitle: { fa: e.target.value, en: editingPost.seoTitle?.en || e.target.value }
                            })}
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                            placeholder={isFa ? 'عنوان نمایش داده شده در نتایج گوگل...' : 'SEO Title'}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            {isFa ? 'کلمات کلیدی سئو (با کاما جدا کنید)' : 'Keywords (Comma separated)'}
                          </label>
                          <input
                            type="text"
                            value={Array.isArray(editingPost.seoKeywords?.fa) ? editingPost.seoKeywords.fa.join(', ') : ''}
                            onChange={(e) => {
                              const kws = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                              setEditingPost({
                                ...editingPost,
                                seoKeywords: { fa: kws, en: editingPost.seoKeywords?.en || kws }
                              });
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                            placeholder={isFa ? 'سئو, PHP 8, اخبار دیتابیس' : 'SEO, PHP, MySQL'}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {isFa ? 'توضیحات متای سئو (SEO Meta Description)' : 'SEO Meta Description'}
                        </label>
                        <textarea
                          rows={2}
                          value={editingPost.seoDescription?.fa || ''}
                          onChange={(e) => setEditingPost({
                            ...editingPost,
                            seoDescription: { fa: e.target.value, en: editingPost.seoDescription?.en || e.target.value }
                          })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                          placeholder={isFa ? 'توضیحات ۱۵۰ کاراکتری جهت افزایش CTR در نتیجه گوگل...' : 'Meta description'}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingPost(null)}
                        className="px-4 py-2 rounded-lg bg-slate-200 text-slate-700 font-bold text-xs"
                      >
                        {isFa ? 'انصراف' : 'Cancel'}
                      </button>
                      
                      <button
                        type="submit"
                        disabled={isSavingArticle}
                        className="px-6 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        <span>{isSavingArticle ? (isFa ? 'در حال ثبت در دیتابیس...' : 'Saving to Database...') : (isFa ? 'ثبت خبر/مقاله در دیتابیس MySQL' : 'Save to MySQL Database')}</span>
                      </button>
                    </div>
                  </form>
                ) : null}

                {/* LIST OF ARTICLES IN DATABASE */}
                <div className="space-y-3">
                  {posts.map((post) => (
                    <div key={post.id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      
                      <div className="flex items-start gap-4">
                        <img
                          src={post.coverImage}
                          alt={post.title.fa}
                          width={64}
                          height={64}
                          loading="lazy"
                          decoding="async"
                          className="w-16 h-16 rounded-lg object-cover border border-slate-200 shrink-0"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              post.postType === 'news'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : 'bg-blue-100 text-blue-800 border border-blue-200'
                            }`}>
                              {post.postType === 'news' ? (isFa ? '📰 خبر (news)' : '📰 News') : (isFa ? '📚 مقاله (articles)' : '📚 Article')}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                              {post.category?.fa || (isFa ? 'عمومی' : 'General')}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">  {typeof post.date === 'string' ? post.date : new Date(post.date).toLocaleDateString()}</span>
                          </div>
                          
                          <h4 className="text-sm font-bold text-slate-900">
                            {post.title.fa}
                          </h4>
                          
                          <p className="text-xs text-slate-500 line-clamp-1">
                            {post.excerpt.fa}
                          </p>

                          {post.seoTitle?.fa && (
                            <div className="text-[11px] text-blue-600 font-semibold flex items-center gap-1">
                              <Globe className="w-3 h-3" />
                              <span>SEO Title: {post.seoTitle.fa}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <button
                          onClick={() => setEditingPost(post)}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1"
                        >
                          <Edit className="w-3.5 h-3.5 text-blue-600" />
                          <span>{isFa ? 'ویرایش و سئو' : 'Edit & SEO'}</span>
                        </button>

                        <button
                          onClick={() => handleDeleteArticle(post.id)}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold"
                          title={isFa ? 'حذف از دیتابیس' : 'Delete'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {isFa ? 'پیام‌های ثبت شده در دیتابیس contact_messages:' : 'Incoming inquiries from contact forms:'}
                  </span>
                  <button onClick={fetchMessages} className="text-xs text-blue-600 font-bold flex items-center gap-1">
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{isFa ? 'بروزرسانی' : 'Refresh'}</span>
                  </button>
                </div>

                {messages.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200">
                    {isFa ? 'پیام جدیدی در دیتابیس یافت نشد.' : 'No messages found in MySQL store.'}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.map((msg) => (
                      <div key={msg.id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span className="font-bold text-slate-900 text-sm">{msg.name} ({msg.company || 'شخصی'})</span>
                          <span className="text-xs text-slate-400">{new Date(msg.createdAt).toLocaleString()}</span>
                        </div>
                        <div className="text-xs text-blue-600 font-mono font-semibold">
                          {msg.email} | {msg.phone} | {msg.service}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-3 rounded-lg border border-slate-200">
                          {msg.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Gemini AI Assistant Tab */}
            {activeTab === 'ai-assistant' && (
              <div className="space-y-8">
                
                {/* AI Translation Box */}
                <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Wand2 className="w-4 h-4 text-blue-600" />
                    <span>{isFa ? 'ترجمه هوشمند دو زبانه (فارسی <-> انگلیسی)' : 'Smart Bilingual Content Translator'}</span>
                  </h4>

                  <div>
                    <textarea
                      rows={3}
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-blue-600 focus:bg-white"
                      placeholder={isFa ? 'متن خود را وارد کنید...' : 'Enter text to translate...'}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <select
                      value={aiTargetLang}
                      onChange={(e) => setAiTargetLang(e.target.value as any)}
                      className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium"
                    >
                      <option value="en">Translate to English</option>
                      <option value="fa">ترجمه به فارسی</option>
                    </select>

                    <button
                      onClick={handleAiTranslate}
                      disabled={aiTranslating}
                      className="px-4 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{aiTranslating ? (isFa ? 'در حال ترجمه...' : 'Translating...') : (isFa ? 'ترجمه با Gemini' : 'Translate with Gemini')}</span>
                    </button>
                  </div>

                  {aiTranslated && (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 font-sans leading-relaxed">
                      {aiTranslated}
                    </div>
                  )}
                </div>

                {/* AI SEO Keyword Generator Box */}
                <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>{isFa ? 'تولید هوشمند متادیتای سئو و کلمات کلیدی گوگل' : 'AI SEO Title, Description & Keywords Generator'}</span>
                  </h4>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={seoTopic}
                      onChange={(e) => setSeoTopic(e.target.value)}
                      className="flex-1 p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-blue-600 focus:bg-white"
                      placeholder={isFa ? 'موضوع مقاله یا خدمت جدید... (مثلا: طراحی فروشگاه PHP)' : 'Enter topic...'}
                    />
                    <button
                      onClick={handleAiSeoGenerate}
                      disabled={generatingSeo}
                      className="px-4 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-50 shadow-sm"
                    >
                      <span>{generatingSeo ? (isFa ? 'در حال تولید...' : 'Generating...') : (isFa ? 'تولید متادیتا' : 'Generate SEO')}</span>
                    </button>
                  </div>

                  {aiSeoResult && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                      <div>
                        <span className="text-[11px] text-slate-500 block font-bold">SEO Title:</span>
                        <span className="text-xs sm:text-sm text-blue-900 font-semibold">{aiSeoResult.title}</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-500 block font-bold">SEO Description:</span>
                        <span className="text-xs text-slate-700">{aiSeoResult.desc}</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-500 block font-bold mb-1">Keywords:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {aiSeoResult.keywords.map(kw => (
                            <span key={kw} className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-medium">
                              #{kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
