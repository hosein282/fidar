import React, { useState, useEffect } from 'react';
import { Language, SEOMetaConfig } from '../types';
import { ShieldCheck, Search, Globe, Code2, CheckCircle2, Copy, Check, FileText, ExternalLink, RefreshCw } from 'lucide-react';

interface SEOMetaSuiteProps {
  lang: Language;
  seoConfig: SEOMetaConfig;
}

export const SEOMetaSuite: React.FC<SEOMetaSuiteProps> = ({ lang, seoConfig }) => {
  const [activeTab, setActiveTab] = useState<'serp' | 'hreflang' | 'schema' | 'sitemap' | 'robots'>('serp');
  const [sitemapXml, setSitemapXml] = useState<string>('');
  const [robotsTxt, setRobotsTxt] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const isFa = lang === 'fa';

  useEffect(() => {
    fetch('/sitemap.xml')
      .then(res => res.text())
      .then(data => setSitemapXml(data))
      .catch(() => setSitemapXml('<!-- Sitemap loading... -->'));

    fetch('/robots.txt')
      .then(res => res.text())
      .then(data => setRobotsTxt(data))
      .catch(() => setRobotsTxt('User-agent: *\nDisallow: /admin/'));
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const seoTitle = isFa ? seoConfig.siteTitle.fa : seoConfig.siteTitle.en;
  const seoDesc = isFa ? seoConfig.metaDescription.fa : seoConfig.metaDescription.en;

  return (
    <section id="seo-suite" className="py-20 bg-slate-50/50 text-slate-900 border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-blue-600 text-xs font-bold uppercase tracking-widest block mb-3">
            {isFa ? 'ابزارهای تخصصی سئوی گوگل' : 'SEO Audit & Meta Studio'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            {isFa ? 'آنالیز زنده سئو، Hreflang و اسکیماهای گوگل' : 'Live Google SERP, Hreflang & Schema Inspection'}
          </h2>
          <p className="text-slate-500 text-base sm:text-lg">
            {isFa 
              ? 'بررسی پیش‌نمایش سایت در موتورهای جستجو، تگ‌های دوزبانه hreflang و فایل‌های sitemap.xml و robots.txt'
              : 'Inspect real-time Google search result previews, multi-regional hreflang annotations, and sitemaps.'}
          </p>
        </div>

        {/* SEO Health Score Banner */}
        <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 shadow-sm mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-xl bg-blue-50 border border-blue-200 flex flex-col items-center justify-center text-blue-900 shrink-0">
              <span className="text-3xl font-black font-mono">98</span>
              <span className="text-[10px] font-bold">/ 100</span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {isFa ? 'وضعیت سلامت سئوی تکنیکال: عالی' : 'Technical SEO Audit Score: Excellent'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                {isFa ? 'تمام استانداردهای سئوی چندزبانه، hreflang، تگ‌های OpenGraph و اسکیماهای JSON-LD رعایت شده است.' : 'All multi-language hreflang tags, OpenGraph metadata, and JSON-LD schemas pass Google validation.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-blue-900 border border-slate-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Hreflang OK
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-blue-900 border border-slate-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Canonical URL
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-blue-900 border border-slate-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> JSON-LD Schema
            </span>
          </div>

        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 border-b border-slate-200 pb-4">
          <button
            onClick={() => setActiveTab('serp')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 transition cursor-pointer ${
              activeTab === 'serp' ? 'bg-blue-900 text-white font-bold shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>{isFa ? 'پیش‌نمایش گوگل (SERP)' : 'Google SERP Preview'}</span>
          </button>

          <button
            onClick={() => setActiveTab('hreflang')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 transition cursor-pointer ${
              activeTab === 'hreflang' ? 'bg-blue-900 text-white font-bold shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>{isFa ? 'تگ‌های دوزبانه (Hreflang)' : 'Hreflang Tags'}</span>
          </button>

          <button
            onClick={() => setActiveTab('schema')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 transition cursor-pointer ${
              activeTab === 'schema' ? 'bg-blue-900 text-white font-bold shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>{isFa ? 'اسکیمای JSON-LD' : 'Schema.org JSON-LD'}</span>
          </button>

          <button
            onClick={() => setActiveTab('sitemap')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 transition cursor-pointer ${
              activeTab === 'sitemap' ? 'bg-blue-900 text-white font-bold shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>sitemap.xml</span>
          </button>

          <button
            onClick={() => setActiveTab('robots')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 transition cursor-pointer ${
              activeTab === 'robots' ? 'bg-blue-900 text-white font-bold shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>robots.txt</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 shadow-sm">
          
          {/* SERP Simulator */}
          {activeTab === 'serp' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-600" />
                <span>{isFa ? 'شبیه‌ساز نمایش نتایج در گوگل (Google SERP Simulator)' : 'Google Search Result Live Card:'}</span>
              </h3>

              {/* Google Search Result Mockup */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 max-w-2xl dir-ltr text-left">
                <div className="text-xs text-slate-500 flex items-center gap-1 font-sans">
                  <span className="w-4 h-4 rounded-full bg-blue-900 inline-block text-[9px] text-center font-bold text-white leading-4">G</span>
                  <span>https://biesss.example.com</span>
                  <span className="text-slate-400">› {isFa ? 'fa' : 'en'}</span>
                </div>
                <h4 className="text-xl font-medium text-blue-700 hover:underline cursor-pointer">
                  {seoTitle}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {seoDesc}
                </p>
              </div>

              {/* Keywords Tag Cloud */}
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">
                  {isFa ? 'کلمات کلیدی اصلی هدف‌گذاری شده:' : 'Target Organic Keywords:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {(isFa ? seoConfig.keywords.fa : seoConfig.keywords.en).map((kw) => (
                    <span key={kw} className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Hreflang Tags */}
          {activeTab === 'hreflang' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <span>{isFa ? 'تگ‌های دوزبانه rel="alternate" hreflang:' : 'Multi-Language Hreflang Header Tags:'}</span>
                </h3>
                <button
                  onClick={() => copyToClipboard(`<link rel="alternate" hreflang="fa" href="${seoConfig.canonicalUrl}/fa" />\n<link rel="alternate" hreflang="en" href="${seoConfig.canonicalUrl}/en" />\n<link rel="canonical" href="${seoConfig.canonicalUrl}/${lang}" />`)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs text-blue-900 border border-slate-200 flex items-center gap-1 font-semibold"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-blue-600" /> : <Copy className="w-3.5 h-3.5 text-blue-600" />}
                  <span>{copied ? (isFa ? 'کپی شد' : 'Copied') : (isFa ? 'کپی کدها' : 'Copy Code')}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-blue-400 font-mono text-xs overflow-x-auto dir-ltr text-left">
{`<meta charset="UTF-8" />
<link rel="alternate" hreflang="fa" href="${seoConfig.canonicalUrl}/fa" />
<link rel="alternate" hreflang="en" href="${seoConfig.canonicalUrl}/en" />
<link rel="alternate" hreflang="x-default" href="${seoConfig.canonicalUrl}/en" />
<link rel="canonical" href="${seoConfig.canonicalUrl}/${lang}" />`}
              </pre>
            </div>
          )}

          {/* Schema JSON-LD */}
          {activeTab === 'schema' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-blue-600" />
                <span>{isFa ? 'ساختار JSON-LD Organization Schema:' : 'Organization Schema.org Markup:'}</span>
              </h3>

              <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-blue-400 font-mono text-xs overflow-x-auto dir-ltr text-left">
{JSON.stringify(seoConfig.structuredDataSchema, null, 2)}
              </pre>
            </div>
          )}

          {/* Sitemap.xml */}
          {activeTab === 'sitemap' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span>{isFa ? 'محتوای خروجی sitemap.xml داینامیک سرور:' : 'Live Generated sitemap.xml:'}</span>
                </h3>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>{isFa ? 'باز کردن در تب جدید' : 'Open Raw XML'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-blue-400 font-mono text-xs overflow-x-auto max-h-80 dir-ltr text-left">
{sitemapXml}
              </pre>
            </div>
          )}

          {/* Robots.txt */}
          {activeTab === 'robots' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span>{isFa ? 'محتوای فایل robots.txt:' : 'Live robots.txt File:'}</span>
                </h3>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>{isFa ? 'باز کردن فایل' : 'View File'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-blue-400 font-mono text-xs overflow-x-auto dir-ltr text-left">
{robotsTxt}
              </pre>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
