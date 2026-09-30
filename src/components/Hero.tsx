import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Language, MaterialData } from '../types';
import { ChevronDown, ArrowDown, Play, Sparkles, CheckCircle2, MoveRight, MoveLeft } from 'lucide-react';
import Image from "next/image"
import { MATERIALS } from '../data/mockData';
import Link from 'next/link';
interface HeroProps {
  lang: Language;
}

// Fixed rotation order + typing so the auto-carousel can advance predictably.
// const MATERIAL_IDS = ['wood', 'glass', 'stone', 'materia'] as const;
// type MaterialId = typeof MATERIAL_IDS[number];

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const slideDuration = 3800;
  const isFa = lang === 'fa';
  const [activeMaterial, setActiveMaterial] = useState<number>(0);
  const [readyNextMaterial, setReadyNextMaterial] = useState<number | null>(null);
  const loadedMaterialIds = useRef(new Set<number>([MATERIALS[0].id]));
  const preloadRequests = useRef(new Map<number, Promise<boolean>>());
  const latestSlideRequest = useRef(0);

  // Keep only the upcoming slide warm in the browser cache. Since these files
  // are already WebP, using the original URL here avoids downloading every
  // slide during the initial page load.
  const preloadMaterial = useCallback((materialId: number) => {
    if (loadedMaterialIds.current.has(materialId)) {
      return Promise.resolve(true);
    }

    const existingRequest = preloadRequests.current.get(materialId);
    if (existingRequest) {
      return existingRequest;
    }

    const material = MATERIALS.find((item) => item.id === materialId);
    if (!material || typeof window === 'undefined') {
      return Promise.resolve(false);
    }

    const request = new Promise<boolean>((resolve) => {
      const image = new window.Image();
      image.onload = async () => {
        // Loading the bytes alone is not enough on slower devices; decode the
        // bitmap before allowing the current slide to be replaced.
        try {
          await image.decode();
        } catch {
          // Some browsers reject `decode()` for already-decoded images.
        }
        loadedMaterialIds.current.add(materialId);
        resolve(true);
      };
      image.onerror = () => resolve(false);
      image.src = material.imgUrl;
    });

    preloadRequests.current.set(materialId, request);
    return request;
  }, []);

  const showMaterial = useCallback(async (materialId: number) => {
    const requestId = ++latestSlideRequest.current;
    const isReady = await preloadMaterial(materialId);

    // A later click or timer tick may have requested another slide while this
    // image was loading, so never let an old request replace the newer choice.
    if (isReady && requestId === latestSlideRequest.current) {
      setActiveMaterial(materialId);
    }
  }, [preloadMaterial]);

  // Preload just one upcoming slide after the current slide is visible. The
  // zoom starts only after that image is ready, so it finishes exactly when
  // the slide can be safely replaced.
  useEffect(() => {
    const nextMaterialId = (activeMaterial + 1) % MATERIALS.length;
    setReadyNextMaterial(null);

    let isCurrentSlide = true;
    const preloadNext = () => {
      void preloadMaterial(nextMaterialId).then((isReady) => {
        if (isCurrentSlide && isReady) {
          setReadyNextMaterial(nextMaterialId);
        }
      });
    };
    const idleCallback = window.requestIdleCallback?.(preloadNext, { timeout: 1200 });

    if (idleCallback === undefined) {
      const timeout = window.setTimeout(preloadNext, 250);
      return () => {
        isCurrentSlide = false;
        window.clearTimeout(timeout);
      };
    }

    return () => {
      isCurrentSlide = false;
      window.cancelIdleCallback?.(idleCallback);
    };
  }, [activeMaterial, preloadMaterial]);

  // Do not replace the current image until the next one has decoded into the
  // cache. The duration matches `.slow-zoom`, so the zoom ends at transition.
  useEffect(() => {
    const nextMaterialId = (activeMaterial + 1) % MATERIALS.length;
    if (readyNextMaterial !== nextMaterialId) {
      return;
    }

    const timer = window.setTimeout(() => {
      void showMaterial(nextMaterialId);
    }, slideDuration);
    return () => window.clearTimeout(timer);
  }, [activeMaterial, readyNextMaterial, showMaterial, slideDuration]);



  const active = MATERIALS.find(m => m.id === activeMaterial);

  return (

    <section className="relative w-full  min-h-[110vh] lg:min-h-[90vh] lg:min-h-vh bg-primary-dark  text-white overflow-hidden flex flex-col justify-between ">

      {/* Hero Background Video & Media Container */}
      <div className="absolute inset-0 z-0 flex flex-col lg:flex-row  ">

        {/* Left Side Video / Hero Visual */}
        <div className="relative  h-full lg:h-full w-full lg:w-[60%] overflow-hidden bg-black ">
          <div key={active?.nameFa} className={`hidden lg:flex   absolute top-8 ${isFa ? "slidex left-8" : "slidex-ltr right-8"}  lg:top-[50%] z-100`}>
            {/* <Link href={`/${lang}/products/${isFa?active?.slugFa : active?.slugEn}`} aria-label='Show Product Details'> */}

            <h1 className=" text-4xl font-black sm:text-4xl lg:text-4xl drop-shadow-2xl  z-110 tracking-tight leading-tight text-white">
              {isFa ?
                active?.nameFa
                :
                active?.nameEn
              }
            </h1>
            {/* </Link> */}
            <div className={`z-10 mt-2 mr-8 ${isFa ? "mr-8" : "ml-8"}`}> {isFa ? <MoveLeft size={32} /> : <MoveRight size={32} />}</div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
          <h1 className={`lg:hidden absolute  bottom-8 ${isFa ? "right-8" : "left-8"} text-3xl sm:text-4xl lg:text-4xl font-medium z-10 tracking-tight leading-tight text-white drop-shadow-2xl`}>
            {isFa ? (
              <>
                تکنولوژی پیشرفته، دقت مهندسی، طراحی آینده گرا
              </>
            ) : (
              <>
                Advanced Technology, Engineering Precision <br /><span className="">Future-Oriented Design</span>
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
        <div className="relative h-4/10 min-h-4/10 lg:h-full rounded-b-4xl lg:rounded-b-none  w-full lg:w-[40%]  bg-slate-900 overflow-hidden flex items-center justify-start ">
          <div
            key={active?.nameFa}
            className={`lg:hidden absolute top-4 ${isFa ? "mr-8 pl-4" : "ml-4 pr-2"
              } lg:top-[50%] z-100`}
          >
            {/* <Link href={`/${lang}/products/${isFa?active?.slugFa : active?.slugEn}`} aria-label='Show Product Details'> */}
            <h1 className="w-fit text-3xl font-black  [text-shadow:0_2px_8px_rgba(0,0,0,0.8)] lg:text-4xl  leading-loose text-white">
              {isFa ? active?.nameFa : active?.nameEn}
              {isFa ? <MoveLeft
                size={28}
                className="inline-block align-middle ms-3"
              /> : <MoveRight
                size={28}
                className="inline-block align-middle ms-3"
              />}
            </h1>
            {/* </Link> */}
          </div>
          <div className="relative  inset-0 bg-gradient-to-b  from-black/60 via-transparent to-black/80 z-10">

            <Image
              key={activeMaterial}
              src={active?.imgUrl || MATERIALS[0].imgUrl}
              alt={`Fidar Saze Bondar ${isFa ? active?.nameFa : active?.nameEn}`}
              width={1200}
              height={1400}
              priority={activeMaterial === MATERIALS[0].id}
              decoding="async"
              fetchPriority={activeMaterial === MATERIALS[0].id ? 'high' : 'auto'}
              sizes="(min-width: 1024px) 40vw, 100vw"
              unoptimized
              className={`md:h-dvh h-fit w-min object-cover relative z-10 opacity-1 scale-110 bg-gradient-to-b from-black/60 via-black/30 to-transparent z-0 ${readyNextMaterial !== null ? 'slow-zoom' : ''}`}
              style={{ '--slide-duration': `${slideDuration}ms` } as React.CSSProperties}

            />
          </div>

        </div>
        <ul className={`absolute flex justify-center items-center gap-3 bottom-16 lg:bottom-16 ${isFa ? "left-8" : "right-8"}`}>
          {MATERIALS.map(((m) => (
            <li key={m.id} className={`h-2 w-2 border-amber-50 border-1  z-40 rounded-full ${m.id === active?.id ? "bg-sky-100" : ""} `}></li>
          )))}
        </ul>

      </div>

      {/* Floating Hero Overlay Headline */}
      <div className="hidden relative z-20 max-w-[1440px] mx-auto px-6 sm:px-12 pt-20 lg:pt-32 pb-12 w-full flex-1 lg:flex flex-col justify-between">

        {/* Overlapping Typography */}
        <div className="space-y-6 max-w-3xl">
          {/* <div className="hidden lg:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/80 border border-teal-300/30 text-white text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            <span>{isFa ? 'صنعت دیجیتال و توسعه وب‌سایت دوزبانه' : 'Industrial Digital Solutions & Dual Web Systems'}</span>
          </div> */}

          <h1 className="hidden lg:block text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-tight text-white drop-shadow-md">
            {isFa ? (
              <>
                تکنولوژی پیشرفته، دقت مهندسی، طراحی آینده گرا

                {/* خطوط تولید و دستگاه‌ها برای پردازش <span className="underline decoration-primary font-bold">صنعتی و دیجیتال</span> */}
              </>
            ) : (
              <>
                Advanced Technology, Engineering Precision<br /><span className="decoration-primary font-bold">Future-Oriented Design</span>


              </>
            )}
          </h1>

          {/* <p className="hidden lg:flex text-slate-200 text-lg sm:text-2xl font-light max-w-2xl leading-relaxed">
            {isFa ? (
              "ما عملیات ترمینال های بندری را با استفاده از تکنولوژی پیشرفته و طراحی نسل جدید تجهیزات انتقال مواد بندگارهی بهینه می کنیم"
            ) : (
              'Empowering wood, glass, stone, and software materials into high-performance enterprise applications.'
            )}
          </p> */}

          {/* <div className="hidden lg:flex pt-4 flex flex-wrap gap-4">
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
          </div> */}
        </div>

        {/* Bottom Carousel / Material Tab Selectors & Scroll Bounce */}
        <div className="hidden lg:flex pt-12  flex-col sm:flex-row items-center justify-between gap-6 px-4">

          {/* Material Interactive Pills */}
          <div className="hidden lg:flex  items-center gap-2 sm:gap-4 overflow-x-visible max-w-full pb-2 no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {MATERIALS.map((mat) => {
              const isActive = activeMaterial === mat.id;
              return (
                <button
                  key={mat.id}
                  onClick={() => void showMaterial(mat.id)}
                  aria-label={`${isFa ? mat.nameFa : mat.nameEn}`}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${isActive
                    ? 'bg-white text-black shadow-lg scale-105'
                    : 'bg-black/50 text-white hover:bg-black/80 border border-white/20'
                    }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: mat.color }}
                  />
                  <span>{isFa ? mat.nameFa : mat.nameEn}</span>
                </button>
              );
            })}
          </div>




        </div>


      </div>
      {/* Bounce Scroll Down Indicator */}


      <ArrowDown className={`absolute ${isFa ? "right-4" : "left-4"} bottom-15 w-5 h-5 text-surface transition animate-bounce`} />
    </section>
  );
};
