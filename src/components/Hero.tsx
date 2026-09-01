import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import { ChevronDown, ArrowDown, Play, Sparkles, CheckCircle2, MoveRight, MoveLeft } from 'lucide-react';
import Image from "next/image"
interface HeroProps {
  lang: Language;
  onOpenExporter: () => void;
}

// Fixed rotation order + typing so the auto-carousel can advance predictably.
const MATERIAL_IDS = ['wood', 'glass', 'stone', 'materia', 'metal'] as const;
type MaterialId = typeof MATERIAL_IDS[number];

export const Hero: React.FC<HeroProps> = ({ lang, onOpenExporter }) => {
  const isFa = lang === 'fa';
  const [activeMaterial, setActiveMaterial] = useState<MaterialId>('wood');

  // Auto-rotate the material image every 3 seconds with a slow zoom effect.
  // Re-running on every change also restarts the timer when a user manually
  // picks a material with the pills below.
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveMaterial((prev) => {
        const idx = MATERIAL_IDS.indexOf(prev);
        return MATERIAL_IDS[(idx + 1) % MATERIAL_IDS.length];
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [activeMaterial]);

  const materials: { id: MaterialId; title: { fa: string; en: string }; color: string; sub: string, img: string }[] = [
    { id: 'wood', title: { fa: 'چوب', en: 'Wood' }, color: 'var(--color-wood)', sub: 'PHP 8 Engine & Core Logic', img: '/assets/images/slides/legno_forma_A.RGB_color.0000_bassa.webp' },
    { id: 'glass', title: { fa: 'شیشه', en: 'Glass' }, color: 'var(--color-glass)', sub: 'MySQL PDO Database', img: '/assets/images/slides/Vetro_A_0_bassa.webp' },
    { id: 'stone', title: { fa: 'سنگ', en: 'Stone' }, color: 'var(--color-stone)', sub: 'Google SEO & Hreflang', img: '/assets/images/slides/Pietra_designB0-rossoverona.webp' },
    { id: 'materia', title: { fa: 'متریال', en: 'Materia' }, color: 'var(--color-materia)', sub: 'CMS Control Panel', img: '/assets/images/slides/polimeri_formaA_02-viola-lr.webp' },
    { id: 'metal', title: { fa: 'فلز', en: 'Metal' }, color: 'var(--color-metal)', sub: 'High Security & Anti-SQLi', img: '/assets/images/slides/METAL_Image_shape_A1.jpg' },
  ];

const active = materials.find(m => m.id === activeMaterial);

  return (
    
    <section className="relative w-full  min-h-[110vh] lg:min-h-[90vh] lg:min-h-vh bg-primary-dark  text-white overflow-hidden flex flex-col justify-between ">

      {/* Hero Background Video & Media Container */}
      <div className="absolute inset-0 z-0 flex flex-col lg:flex-row  ">

        {/* Left Side Video / Hero Visual */}
        <div className="relative  h-full lg:h-full w-full lg:w-[60%] overflow-hidden bg-black ">
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
          <h1 className={`md:hidden absolute  bottom-8 ${isFa ? "right-8" : "left-8"} text-3xl sm:text-4xl lg:text-4xl font-medium z-10 tracking-tight leading-tight text-white drop-shadow-2xl`}>
            {isFa ? (
              <>
                خطوط تولید، دستگاه‌ها برای پردازش <span className="font-bold">صنعتی و دیجیتال</span>
              </>
            ) : (
              <>
                Lines, machines and components for machining <span className="underline decoration-primary font-bold">digital systems</span>
              </>
            )}
          </h1>
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
        <div className="relative h-full lg:h-full rounded-b-4xl lg:rounded-b-none  w-full lg:w-[40%]  bg-slate-900 overflow-hidden flex items-center justify-center ">

          <div key={active?.title.fa} className={`slidex flex absolute top-8 ${isFa ? "right-8" : "left-8"}  lg:top-[50%] z-100`}>
            <h1 className=" text-5xl font-black sm:text-4xl lg:text-4xl drop-shadow-2xl  z-110 tracking-tight leading-tight text-white">
              {isFa ?
                active?.title.fa
                :
                active?.title.en
              }
            </h1>
            <div className={`z-10 mt-2 mr-8 ${isFa ? "mr-8" : "ml-8"}`}> {isFa ? <MoveLeft size={32} /> : <MoveRight size={32} />}</div>
          </div>
          <div className="relative  inset-0 bg-gradient-to-b  from-black/60 via-transparent to-black/80 z-10">

            <Image
              key={activeMaterial}
              src={active?.img || materials[0].img}
              alt="Fidar Bondar Machine Model"
              width={613}
              height={906}
              priority={true}
              decoding="async"
              className="md:h-dvh h-full sm:w-full object-cover relative z-10 slow-zoom   "
            />
          </div>


        </div>

      </div>

      {/* Floating Hero Overlay Headline */}
      <div className="hidden relative z-20 max-w-[1440px] mx-auto px-6 sm:px-12 pt-20 lg:pt-32 pb-12 w-full flex-1 lg:flex flex-col justify-between">

        {/* Overlapping Typography */}
        <div className="space-y-6 max-w-3xl">
          <div className="hidden lg:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/80 border border-teal-300/30 text-white text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            <span>{isFa ? 'صنعت دیجیتال و توسعه وب‌سایت دوزبانه' : 'Industrial Digital Solutions & Dual Web Systems'}</span>
          </div>

          <h1 className="hidden lg:block text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-tight text-white drop-shadow-md">
            {isFa ? (
              <>
                خطوط تولید و دستگاه‌ها برای پردازش <span className="underline decoration-primary font-bold">صنعتی و دیجیتال</span>
              </>
            ) : (
              <>
                Lines, machines and components for machining <span className="underline decoration-primary font-bold">digital systems</span>
              </>
            )}
          </h1>

          <p className="hidden lg:flex text-slate-200 text-lg sm:text-2xl font-light max-w-2xl leading-relaxed">
            {isFa ? (
              'ارائه معمار‌ی‌های پیشرفته PHP 8، اتصال مستقیم به دیتابیس MySQL PDO، پشتیبانی کامل از زبان‌های فارسی و انگلیسی و سئوی برتر گوگل.'
            ) : (
              'Empowering wood, glass, stone, and software materials into high-performance enterprise applications.'
            )}
          </p>

          <div className="hidden lg:flex pt-4 flex flex-wrap gap-4">
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
        <div className="hidden lg:flex pt-12  flex-col sm:flex-row items-center justify-between gap-6">

          {/* Material Interactive Pills */}
          <div className="hidden lg:flex  items-center gap-2 sm:gap-4 overflow-x-auto max-w-full pb-2 no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {materials.map((mat) => {
              const isActive = activeMaterial === mat.id;
              return (
                <button
                  key={mat.id}
                  onClick={() => setActiveMaterial(mat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${isActive
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
