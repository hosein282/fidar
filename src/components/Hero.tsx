import React, { useState } from 'react';
import { Language } from '../types';
import { ChevronDown, ArrowDown, Play, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  lang: Language;
  onOpenExporter: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenExporter }) => {
  const isFa = lang === 'fa';
  const [activeMaterial, setActiveMaterial] = useState<'wood' | 'glass' | 'stone' | 'materia' | 'metal'>('wood');

  const materials = [
    { id: 'wood', title: { fa: 'چوب (Wood)', en: 'Wood' }, color: 'var(--color-wood)', sub: 'PHP 8 Engine & Core Logic' },
    { id: 'glass', title: { fa: 'شیشه (Glass)', en: 'Glass' }, color: 'var(--color-glass)', sub: 'MySQL PDO Database' },
    { id: 'stone', title: { fa: 'سنگ (Stone)', en: 'Stone' }, color: 'var(--color-stone)', sub: 'Google SEO & Hreflang' },
    { id: 'materia', title: { fa: 'متریال (Materia)', en: 'Materia' }, color: 'var(--color-materia)', sub: 'CMS Control Panel' },
    { id: 'metal', title: { fa: 'فلز (Metal)', en: 'Metal' }, color: 'var(--color-metal)', sub: 'High Security & Anti-SQLi' },
  ];

  return (
    <section className="relative w-full  min-h-[90vh] lg:min-h-vh bg-surface text-white overflow-hidden flex flex-col justify-between">
      
      {/* Hero Background Video & Media Container */}
      <div className="absolute inset-0 z-0 flex flex-col lg:flex-row">
        
        {/* Left Side Video / Hero Visual */}
        <div className="relative h-1/2 lg:h-full w-full lg:w-[60%] overflow-hidden bg-black">
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center opacity-80"
            src="https://videos.ctfassets.net/bdj0rlksezwc/CCGyT8oUYqXWT6BpX3lIv/c963fce731aaa0cf086eee849f9b0e6f/Clip_-1.mp4"
          />
        </div>

        {/* Right Side Material Model Image */}
        <div className="relative h-1/2 lg:h-full w-full lg:w-[40%] bg-slate-900 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10" />
          <img
            src={
              activeMaterial === 'wood'
                ? "/assets/images/WOOD-singolo-2.png?w=613&h=906&q=50&fm=png"
                : activeMaterial === 'glass'
                ? "https://images.ctfassets.net/bdj0rlksezwc/1Zf5PLBjCtV8N3qa37DSXW/823afea9546810ed75f7aeaf71abced3/test-GLASS-icon-2.png?w=755&h=1114&q=50&fm=png"
                : activeMaterial === 'stone'
                ? "https://images.ctfassets.net/bdj0rlksezwc/5cReCtVRkYfgs8oEjG07DX/dcf3d34fffd150803f95d51a5d1c9d33/STONE_singolo-2.png?w=400&h=1200&q=50&fm=png"
                : activeMaterial === 'materia'
                ? "https://images.ctfassets.net/bdj0rlksezwc/6pjxB7QmujUujmiFNbmR7H/8f6522b3bd6acfd961940efc1f559891/MATERIA-singolo-2.png?w=400&h=1200&q=50&fm=png"
                : "https://images.ctfassets.net/bdj0rlksezwc/4XcQgGguNlL4P9DamLvITc/6985bffeadc3e564669328ce2965d3a3/icona_metal.png?w=400&h=1200&q=50&fm=png"
            }
            alt="Fidar Bondar Machine Model"
            width={613}
            height={906}
            loading="eager"
            decoding="async"
            className="max-h-[80%] max-w-[80%] object-contain relative z-10 transition-all duration-700 ease-out transform hover:scale-105"
          />
        </div>

      </div>

      {/* Floating Hero Overlay Headline */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-6 sm:px-12 pt-20 lg:pt-32 pb-12 w-full flex-1 flex flex-col justify-between">
        
        {/* Overlapping Typography */}
        <div className="space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/80 border border-teal-300/30 text-white text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            <span>{isFa ? 'صنعت دیجیتال و توسعه وب‌سایت دوزبانه' : 'Industrial Digital Solutions & Dual Web Systems'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-tight text-white drop-shadow-md">
            {isFa ? (
              <>
                خطوط تولید، دستگاه‌ها و کامپوننت‌ها برای پردازش <span className="underline decoration-primary font-bold">صنعتی و دیجیتال</span>
              </>
            ) : (
              <>
                Lines, machines and components for machining <span className="underline decoration-primary font-bold">digital systems</span>
              </>
            )}
          </h1>

          <p className="text-slate-200 text-lg sm:text-2xl font-light max-w-2xl leading-relaxed">
            {isFa ? (
              'ارائه معمار‌ی‌های پیشرفته PHP 8، اتصال مستقیم به دیتابیس MySQL PDO، پشتیبانی کامل از زبان‌های فارسی و انگلیسی و سئوی برتر گوگل.'
            ) : (
              'Empowering wood, glass, stone, and software materials into high-performance enterprise applications.'
            )}
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={onOpenExporter}
              className="px-8 py-3.5 rounded-lg bg-primary hover:bg-black text-white font-bold text-sm transition shadow-lg flex items-center gap-2 hover:rounded-[30px]"
            >
              <span>{isFa ? 'دریافت کدهای PHP و MySQL' : 'Export PHP & MySQL Source'}</span>
            </button>
            
            <a
              href="#materials"
              className="px-8 py-3.5 rounded-lg bg-white/20 backdrop-blur-md border border-white/40 hover:bg-white hover:text-black text-white font-bold text-sm transition"
            >
              <span>{isFa ? 'بررسی متریال‌ها و خدمات' : 'Discover Materials'}</span>
            </a>
          </div>
        </div>

        {/* Bottom Carousel / Material Tab Selectors & Scroll Bounce */}
        <div className="pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Material Interactive Pills */}
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto max-w-full pb-2 no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {materials.map((mat) => {
              const isActive = activeMaterial === mat.id;
              return (
                <button
                  key={mat.id}
                  onClick={() => setActiveMaterial(mat.id as any)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? 'bg-white text-black shadow-lg scale-105'
                      : 'bg-black/50 text-white hover:bg-black/80 border border-white/20'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: mat.color }}
                  />
                  <span>{isFa ? mat.title.fa : mat.title.en}</span>
                </button>
              );
            })}
          </div>

          {/* Bounce Scroll Down Indicator */}

          <a
            href="#about"
            className="flex items-center gap-2 text-white/80 hover:text-white text-xs font-bold transition animate-bounce"
          >
            {/* <span>{isFa ? 'اسکرول به پایین' : 'Scroll down'}</span> */}
            <ArrowDown className="w-5 h-5 text-primary" />
          </a>

        </div>

      </div>

    </section>
  );
};
