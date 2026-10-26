'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Language, BlogPost } from '../types';
import { ChevronLeft, ChevronRight, X, Code2, Calendar, Clock, Eye, ArrowLeft, ArrowRight } from 'lucide-react';
import { sanitizeBlogPost } from '../utils/sanitize';
import { format } from 'date-fns-jalali';
import { format as fr } from 'date-fns';
import Image from 'next/image';

interface BlogSectionProps {
  lang: Language;
  posts: BlogPost[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({ lang, posts = [] }) => {
  const router = useRouter();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [showSchemaModal, setShowSchemaModal] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const isFa = lang === 'fa';
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  const safePosts = useMemo(() => (Array.isArray(posts) ? posts : []).map(sanitizeBlogPost), [posts]);

  const [scrollLeft, setScrollLeft] = useState(false);
  const [scrollRight, setScrollRight] = useState(false);

  const checkScrollability = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const { scrollLeft: left, scrollWidth, clientWidth, offsetWidth } = el;

    if (isFa) {
      setScrollLeft((-left + clientWidth) < (scrollWidth - 50));
      setScrollRight(left > 16 || left < -30);
    } else {
      setScrollRight((left + offsetWidth) < (scrollWidth - 50));
      setScrollLeft(left > 16 || left < -30);
    }
  }, [isFa]);

  useEffect(() => {
    checkScrollability();

    const el = scrollContainerRef.current;
    if (!el) return;

    el.addEventListener('scroll', checkScrollability);
    window.addEventListener('resize', checkScrollability);

    return () => {
      el.removeEventListener('scroll', checkScrollability);
      window.removeEventListener('resize', checkScrollability);
    };
  }, [checkScrollability, safePosts]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 200;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollToCenteredItem = useCallback((direction: 'prev' | 'next') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const items = Array.from(container.children) as HTMLElement[];
    if (items.length === 0) return;

    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.width / 2;

    let currentIndex = 0;
    let minDiff = Infinity;
    items.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.left - containerRect.left + rect.width / 2;
      const diff = Math.abs(itemCenter - centerX);
      if (diff < minDiff) {
        minDiff = diff;
        currentIndex = index;
      }
    });

    const targetIndex = Math.max(
      0,
      Math.min(items.length - 1, direction === 'next' ? currentIndex + 1 : currentIndex - 1)
    );

    const target = items[targetIndex];
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const targetCenter = rect.left - containerRect.left + rect.width / 2;

    container.scrollTo({
      left: container.scrollLeft + (targetCenter - centerX),
      behavior: 'smooth',
    });
  }, []);

  return (
    <section id="blog" className="h-dvh py-20 bg-primary-dark text-white relative overflow-hidden flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white px-4">
            {isFa ? 'مقالات، رویدادها و اخبار' : 'What\'s Next'}
          </h2>
        </div>

        <div className="relative group">
          <div
            ref={scrollContainerRef}
            dir={isFa ? 'rtl' : 'ltr'}
            className="scroll-container flex w-screen gap-6 sm:gap-8 overflow-x-auto scrollbar-none justify-start items-center pb-8 px-8 pt-2"
          >
            {safePosts.map((post) => {
              const titleStr = (isFa ? post.title?.fa : post.title?.en) || post.title?.fa || 'بدون عنوان';
              const catStr = (isFa ? post.category?.fa : post.category?.en) || (post.postType === 'news' ? 'CUSTOMER STORY' : 'EVENTS');
              const dateStr = post.date || '03/25/2025';

              return (
                <article
                  key={post.id}
                  onClick={() => router.push(`/${lang}/blog/${post.id}`)}
                  className="w-70 sm:w-[320px] shrink-0 flex flex-col items-center cursor-pointer text-center"
                >
                  <div className="w-full h-75 sm:h-[340px] rounded-[32px] overflow-hidden group bg-emerald-950/40 shadow-xl border border-white/10 relative">
                    <Image
                      src={post.coverImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'}
                      alt={titleStr}
                      width={600}
                      height={600}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="mt-5">
                    <span className="inline-block px-5 py-1.5 rounded-full border border-white/70 text-white text-[10px] sm:text-[11px] font-thin tracking-widest uppercase hover:bg-white hover:text-primary-dark transition-colors">
                      {catStr}
                    </span>
                  </div>

                  <h3 className="text-white font-bold text-base sm:text-lg leading-snug mt-3 line-clamp-2 px-2 hover:underline decoration-white/60">
                    {titleStr}
                  </h3>

                  <p className={`${isFa ? '' : 'font-mono'} text-white/80 text-xs mt-2`}>
                    {(() => {
                      const parsed = Date.parse(dateStr);
                      return Number.isNaN(parsed)
                        ? dateStr
                        : isFa
                          ? format(parsed, 'dd MMMM yyyy')
                          : fr(parsed, 'MMMM d, yyyy');
                    })()}
                  </p>
                </article>
              );
            })}
          </div>

          <button
            onClick={() => scroll(isFa ? 'left' : 'left')}
            className={`absolute top-1/2 -translate-y-1/2 left-0 lg:left-8 w-12 h-12 rounded-full bg-surface text-primary-dark flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-30 border border-slate-200 ${scrollLeft ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            aria-label={isFa ? 'مقاله قبلی' : 'Previous article'}
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          <button
            onClick={() => scroll(isFa ? 'right' : 'right')}
            className={`absolute top-1/2 -translate-y-1/2 right-0 lg:right-8 w-12 h-12 rounded-full bg-surface text-primary-dark flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-30 border border-slate-200 ${scrollRight ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            aria-label={isFa ? 'مقاله بعدی' : 'Next article'}
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in text-slate-900">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full p-6 sm:p-8 relative space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl dir-rtl">
            <button
              onClick={() => { setSelectedPost(null); setShowSchemaModal(false); }}
              aria-label='Show Blog'
              className="absolute top-5 left-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {showSchemaModal ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary-dark font-bold text-lg">
                  <Code2 className="w-5 h-5" />
                  <span>{isFa ? 'کدهای JSON-LD Schema مقاله برای موتورهای جستجو:' : 'Generated Schema.org JSON-LD for Search Engines:'}</span>
                </div>

                <p className="text-xs text-slate-500">
                  {isFa
                    ? 'این ساختار استاندارد به گوگل کمک می‌کند مقاله شما را به عنوان Rich Snippet نمایش دهد.'
                    : 'Search engines ingest this JSON-LD structure to render rich search results.'}
                </p>

                <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 font-mono text-xs overflow-x-auto dir-ltr text-left">
                  {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    "headline": isFa ? selectedPost.seoTitle.fa : selectedPost.seoTitle.en,
                    "description": isFa ? selectedPost.seoDescription.fa : selectedPost.seoDescription.en,
                    "author": {
                      "@type": "Organization",
                      "name": isFa ? selectedPost.author.fa : selectedPost.author.en
                    },
                    "datePublished": selectedPost.date,
                    "image": selectedPost.coverImage,
                    "inLanguage": [isFa ? "fa" : "en"],
                    "keywords": (isFa ? selectedPost.seoKeywords.fa : selectedPost.seoKeywords.en).join(", ")
                  }, null, 2)}
                </pre>

                <button
                  onClick={() => setShowSchemaModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200"
                >
                  {isFa ? 'بازگشت به متن مقاله' : 'Back to Article Text'}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="text-primary-dark font-bold px-3 py-1 bg-emerald-50 rounded-full border border-emerald-200">
                      {isFa ? selectedPost.category.fa : selectedPost.category.en}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {selectedPost.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {selectedPost.readTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      {selectedPost.views || 0}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug pt-2">
                    {isFa ? selectedPost.title.fa : selectedPost.title.en}
                  </h3>
                </div>

                <div className="rounded-2xl overflow-hidden h-64 sm:h-80 bg-slate-100 border border-slate-200 shadow-sm">
                  <img src={selectedPost.coverImage} alt="Article Cover" width={1200} height={800} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                </div>

                <div className="article-content prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: isFa ? selectedPost.content.fa : selectedPost.content.en,
                    }}
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    {isFa ? `نویسنده: ${selectedPost.author.fa}` : `Author: ${selectedPost.author.en}`}
                  </span>

                  <button
                    onClick={() => setShowSchemaModal(true)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-primary-dark border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Code2 className="w-4 h-4 text-primary-dark" />
                    <span>{isFa ? 'مشاهده اسکیما سئو' : 'View Schema.org'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-center">
        <Link
          href={`/${lang}/blog`}
          className="px-6 py-2.5 text-center rounded-lg border border-white/80 text-white hover:bg-white hover:text-primary-dark transition-all font-semibold text-xs sm:text-sm tracking-wide inline-flex items-center gap-2"
        >
          <span>{isFa ? 'مشاهده همه مقالات و اخبار' : 'See all news & articles'}</span>
          <ArrowIcon className="w-4 h-4" />
        </Link>
      </div>

      <style jsx>{`
        .scroll-container::-webkit-scrollbar {
          height: 6px;
        }
        .scroll-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.06);
          border-radius: 3px;
        }
        .scroll-container::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.25);
          border-radius: 3px;
        }
        .scroll-container::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </section>
  );
};
