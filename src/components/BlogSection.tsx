'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Language, BlogPost } from '../types';
import { ChevronLeft, ChevronRight, X, Code2, Calendar, Clock, Eye, ArrowLeft, ArrowRight } from 'lucide-react';
import { sanitizeBlogPost } from '../utils/sanitize';

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

  const safePosts = (Array.isArray(posts) ? posts : []).map(sanitizeBlogPost);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = isFa
        ? (direction === 'left' ? -340 : 340)
        : (direction === 'left' ? -340 : 340);
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="blog" className="py-20 bg-primary-dark text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Top Header: Title + "See all" Button */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            {isFa ? 'مقالات، رویدادها و اخبار' : 'What\'s Next'}
          </h2>

          <Link
            href={`/${lang}/blog`}
            className="px-6 py-2.5 rounded-lg border border-white/80 text-white hover:bg-white hover:text-primary-dark transition-all font-semibold text-xs sm:text-sm tracking-wide inline-flex items-center gap-2"
          >
            <span>{isFa ? 'مشاهده همه اخبار و مقالات' : 'See all news & articles'}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>

        {/* Carousel Wrapper */}
        <div className="relative group">
          
          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 sm:gap-8 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-8 pt-2 transition-all"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {safePosts.map((post) => {
              const titleStr = (isFa ? post.title?.fa : post.title?.en) || post.title?.fa || 'بدون عنوان';
              const catStr = (isFa ? post.category?.fa : post.category?.en) || (post.postType === 'news' ? 'CUSTOMER STORY' : 'EVENTS');
              const dateStr =  post.date || '03/25/2025';

              return (
                <article
                  key={post.id}
                  onClick={() => router.push(`/${lang}/blog/${post.id}`)}
                  className="w-70 sm:w-[320px] shrink-0 snap-start flex flex-col items-center group cursor-pointer text-center"
                >
                  {/* Card Image with Fidar Bondar rounded-3xl corners */}
                  <div className="w-full h-75 sm:h-[340px] rounded-[32px] overflow-hidden bg-emerald-950/40 shadow-xl border border-white/10 relative">
                    <img
                      src={post.coverImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'}
                      alt={titleStr}
                      width={1200}
                      height={800}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Outlined Pill Tag under Image */}
                  <div className="mt-5">
                    <span className="inline-block px-5 py-1.5 rounded-full border border-white/70 text-white text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase hover:bg-white hover:text-primary-dark transition-colors">
                      {catStr}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-base sm:text-lg leading-snug mt-3 line-clamp-2 px-2 group-hover:underline decoration-white/60">
                    {titleStr}
                  </h3>

                  {/* Date */}
                  <p className="text-white/80 font-mono text-xs mt-2">
                    {dateStr}
                  </p>
                </article>
              );
            })}
          </div>

          {/* Floating Circle Arrow Nav Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-primary-dark flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-10 border border-slate-200"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-primary-dark flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-10 border border-slate-200"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>

        </div>

      </div>

      {/* Article Detail & Schema Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in text-slate-900">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full p-6 sm:p-8 relative space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl dir-rtl">
            
            <button
              onClick={() => { setSelectedPost(null); setShowSchemaModal(false); }}
              className="absolute top-5 left-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {showSchemaModal ? (
              /* JSON-LD Schema Viewer */
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
              /* Full Article Reader */
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

                <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {isFa ? selectedPost.content.fa : selectedPost.content.en}
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

    </section>
  );
};
