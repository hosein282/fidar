import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, Layers, Database, Cpu, Zap, ShieldCheck, ArrowRight, Code2 } from 'lucide-react';

interface ParallaxExperienceProps {
  lang: Language;
}

export const ParallaxExperience: React.FC<ParallaxExperienceProps> = ({ lang }) => {
  const isFa = lang === 'fa';
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion Parallax Scroll setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const yContent = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);
  const opacityHero = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.6, 1, 1, 0.6]);

  // Interactive Background Color & Image Morphing State
  const [activeTab, setActiveTab] = useState(0);

  const morphThemes = [
    {
      id: 0,
      title: isFa ? 'معماری سرعت بالا و کدهای تمیز PHP 8' : 'High-Performance Clean PHP 8 Architecture',
      subtitle: isFa ? 'پردازش آنی درخواست‌ها بدون لود سنگین' : 'Instant Request Execution & Zero Overhead',
      desc: isFa
        ? 'سیستم‌های توسعه یافته بر پایه معماری شیوه‌گرا (OOP) و PDO در PHP 8 با بالاترین راندمان مصرف رم و پردازنده بر روی سرورهای لینوکس.'
        : 'Engineered with Object-Oriented PHP 8 and PDO for maximum CPU efficiency and low memory consumption on Linux servers.',
      bgColor: 'from-slate-900 via-blue-950 to-slate-900',
      accentColor: 'from-blue-500 to-indigo-600',
      textColor: 'text-blue-400',
      bgImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80',
      badge: 'PHP 8.3 & PDO'
    },
    {
      id: 1,
      title: isFa ? 'دیتابیس متصل و مدیریت محتوای پویا' : 'Dynamic Database Integration & CMS Engine',
      subtitle: isFa ? 'مدیریت اخبار، مقالات و متادیتاهای سئو از دیتابیس' : 'Real-time News, Articles & SEO Management via MySQL',
      desc: isFa
        ? 'تمامی اطلاعات سایت مستقیماً از جداول بهینه‌سازی شده دیتابیس خوانده و با سرعت میلی‌ثانیه‌ای در صفحه رندر می‌شوند.'
        : 'All site contents, news, and SEO metadata are dynamically fetched from indexed MySQL tables in milliseconds.',
      bgColor: 'from-slate-950 via-teal-950 to-slate-950',
      accentColor: 'from-emerald-400 to-teal-500',
      textColor: 'text-emerald-400',
      bgImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1600&q=80',
      badge: 'MySQL Engine'
    },
    {
      id: 2,
      title: isFa ? 'سئوی کامل ساختاریافته Google Schema' : 'Google Schema & Advanced Technical SEO',
      subtitle: isFa ? 'صدرنشینی در نتایج گوگل با میکرو دیتای استاندارد' : 'Rank #1 on Google with Automated Structured Data',
      desc: isFa
        ? 'تولید خودکار اسکیماهای JSON-LD استاندارد برای اخبار، مقالات و صفحات سازمانی جهت نمایش ریچ‌اسنیپت در موتورهای جستجو.'
        : 'Automatic generation of JSON-LD schemas for articles and pages ensuring rich snippets and premier rankings on Google.',
      bgColor: 'from-slate-950 via-indigo-950 to-slate-900',
      accentColor: 'from-cyan-400 to-blue-500',
      textColor: 'text-cyan-400',
      bgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
      badge: 'Google SEO'
    }
  ];

  // Auto morph cycle every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % morphThemes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [morphThemes.length]);

  const currentTheme = morphThemes[activeTab];

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      
      {/* ========================================================= */}
      {/* 1. PARALLAX FEATURE SECTION */}
      {/* ========================================================= */}
      <section className="relative py-28 bg-slate-950 text-white overflow-hidden border-b border-slate-800">
        
        {/* Parallax Background Grid & Images */}
        <motion.div 
          style={{ y: yBg }}
          className="absolute inset-0 opacity-20 pointer-events-none"
        >
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />
          <img
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=2000&q=80"
            alt="Parallax Background"
            className="w-full h-full object-cover filter blur-sm scale-110"
          />
        </motion.div>

        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <motion.div style={{ opacity: opacityHero, y: yContent }} className="space-y-16">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                <span>{isFa ? 'تجربه بصری پارالاکس و معماری داده' : 'Parallax Data Architecture'}</span>
              </span>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {isFa ? 'معماری مدرن وب با خواندن پویا از دیتابیس' : 'Dynamic Database Engine & Responsive Parallax'}
              </h2>

              <p className="text-slate-400 text-base sm:text-lg">
                {isFa 
                  ? 'طراحی یکپارچه بر پایه استانداردهای جهانی وب، جداول رابطه ای MySQL و بارگذاری فوق‌العاده سریع داده‌ها.'
                  : 'Seamlessly unified based on global web standards, relational MySQL tables, and ultra-fast page rendering.'}
              </p>
            </div>

            {/* Floating Parallax Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Card 1 */}
              <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md hover:border-blue-500/50 transition-all duration-300 shadow-xl group">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                  <Database className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {isFa ? 'اتصال زنده به دیتابیس MySQL' : 'Live MySQL Database Sync'}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {isFa
                    ? 'همه نوشته‌ها، اخبار و داده‌های سئو مستقیما از دیتابیس فراخوانی شده و آماده درج توسط مدیر در پنل اختصاصی هستند.'
                    : 'All articles, news items, and SEO metadata are queried directly from database tables with real-time CMS update capability.'}
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md hover:border-emerald-500/50 transition-all duration-300 shadow-xl group">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {isFa ? 'سرعت و کارایی PHP 8 PDO' : 'PHP 8 PDO High Performance'}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {isFa
                    ? 'استفاده از PDO Parameterized Queries جهت جلوگیری از SQL Injection و افزایش ۱۰۰٪ امنیت سامانه.'
                    : 'Utilizes PDO parameterized queries to eliminate SQL injection risks and ensure complete application security.'}
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md hover:border-indigo-500/50 transition-all duration-300 shadow-xl group">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {isFa ? 'افزایش رتبه سئوی گوگل' : 'Google SEO & Core Vitals'}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {isFa
                    ? 'تولید متادیتا، اسکیماهای استاندارد و کلمات کلیدی ارگانیک برای هر خبر یا مقاله توسط مدیر سایت.'
                    : 'Full SEO title, meta description, and organic keywords customization for every single article and news post.'}
                </p>
              </div>

            </div>

          </motion.div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. DYNAMIC BACKGROUND IMAGE & COLOR MORPHING SECTION */}
      {/* ========================================================= */}
      <section className="relative py-28 transition-all duration-1000 overflow-hidden text-white border-b border-slate-800">
        
        {/* Background Image Layer with Crossfade Morphing */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {morphThemes.map((theme, index) => (
            <div
              key={theme.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                activeTab === index ? 'opacity-30 scale-105' : 'opacity-0 scale-100'
              }`}
              style={{ transition: 'opacity 1000ms ease-in-out, transform 1000ms ease-in-out' }}
            >
              <img
                src={theme.bgImage}
                alt={theme.title}
                className="w-full h-full object-cover filter brightness-75 contrast-125"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${theme.bgColor} mix-blend-multiply`} />
            </div>
          ))}

          {/* Fallback Overlay Gradient */}
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 border border-white/20 ${currentTheme.textColor}`}>
              <Layers className="w-4 h-4" />
              <span>{isFa ? 'تغییر پویا و هوشمند تم رنگی با اسکرول' : 'Dynamic Background & Color Morphing'}</span>
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              {isFa ? 'تغییر هوشمند تصویر زمینه و تم رنگی بخش‌ها' : 'Scroll & Interactive Theme Color Morphing'}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base">
              {isFa
                ? 'با کلیک روی لایه‌ها یا اسکرول، تم تصویری و رنگی صفحه به صورت کاملاً نرم و انیمیشنی تغییر می‌کند.'
                : 'Experience smooth background images and color palette transitions as you explore our technical capabilities.'}
            </p>
          </div>

          {/* Interactive Morph Pills */}
          <div className="flex justify-center flex-wrap gap-3">
            {morphThemes.map((theme, index) => (
              <button
                key={theme.id}
                onClick={() => setActiveTab(index)}
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                  activeTab === index
                    ? 'bg-white text-slate-900 shadow-xl scale-105 ring-2 ring-white/50'
                    : 'bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${theme.accentColor}`} />
                <span>{theme.badge}</span>
              </button>
            ))}
          </div>

          {/* Active Morph Showcase Display Card */}
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-xl shadow-2xl max-w-4xl mx-auto space-y-8 transition-all duration-500">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <span className={`text-xs font-bold uppercase tracking-wider block mb-1 ${currentTheme.textColor}`}>
                  {currentTheme.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {currentTheme.title}
                </h3>
              </div>

              <div className="shrink-0">
                <span className={`px-4 py-2 rounded-xl text-xs font-mono font-bold bg-slate-800 border border-slate-700 ${currentTheme.textColor}`}>
                  {currentTheme.badge}
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {currentTheme.desc}
            </p>

            {/* Simulated Live PHP Query Code Box */}
            <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden font-mono text-xs text-left dir-ltr">
              <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-blue-400" />
                  <span>database_query.php</span>
                </span>
                <span className="text-[11px] text-emerald-400">Status: 200 OK (0.002s)</span>
              </div>

              <pre className="p-4 text-blue-300 overflow-x-auto leading-relaxed">
                <code>{`// Fetch active news and article from MySQL database PDO
$stmt = $pdo->prepare("SELECT id, title_fa, slug, content_fa, seo_title, seo_desc 
                       FROM posts WHERE status = 'published' ORDER BY created_at DESC");
$stmt->execute();
$articles = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Output dynamic JSON response
header('Content-Type: application/json; charset=utf-8');
echo json_encode(['success' => true, 'articles' => $articles]);`}</code>
              </pre>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
};
