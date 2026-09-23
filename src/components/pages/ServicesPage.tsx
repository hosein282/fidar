'use client';

import React, { useEffect, useState, lazy, Suspense, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Language, SEOMetaConfig } from '../../types';
import { Header } from '../Header';
import { ContactSection } from '../ContactSection';
import { Footer } from '../Footer';
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { SERVICES } from '../../data/mockData.ts'

import {
    Ship, Anchor, Wind, Fan, Wrench, RefreshCw, Languages, SearchCheck,
    ChevronDown, MapPin, Compass, CalendarDays, Phone,
} from 'lucide-react';


interface ServicesPageProps {
    seoConfig: SEOMetaConfig;
    onOpenAdmin?: () => void;
    lang?: Language;
}

// =========================================================
// All Services of the Fidar Bondar project (bilingual)
// =========================================================


const ServicesPageComponent: React.FC<ServicesPageProps> = ({
    seoConfig,
    onOpenAdmin = () => { },
    lang = 'fa',

}) => {
    const router = useRouter();

    const currentLang: Language = (lang === 'en' || lang === 'fa') ? lang : 'fa';
    const isFa = currentLang === 'fa';


    const [activeModal, setActiveModal] = useState<'admin' | 'exporter' | null>(null);
    const [openAccordion, setOpenAccordion] = useState<number>(0);
    const [active, setActive] = useState(0);

    const [activeIndex, setActiveIndex] = useState(0); // پیش‌فرض: کارت دوم (Storing)
    const [isDesktop, setIsDesktop] = useState(false);
    const touchStartX = useRef<number | null>(null);

    // ── وضعیت بارگذاری ویدیوی هیرو (لودینگ + thumbnail) ──
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [videoReady, setVideoReady] = useState(false);
    const [videoFailed, setVideoFailed] = useState(false);

    // Sync HTML lang and dir attribute + scroll to top on load
    useEffect(() => {
        document.documentElement.setAttribute('dir', isFa ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', currentLang);
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % SERVICES.length);
        }, 3000);
        return () => clearInterval(interval);

    }, [currentLang, isFa]);


    useEffect(() => {
        // Tailwind `lg` breakpoint — the desktop carousel becomes visible at 1024px.
        const BREAKPOINT_LG = 1024;
        const update = () => setIsDesktop(window.innerWidth >= BREAKPOINT_LG);

        update();

        // `window.matchMedia` is only available on some browsers — fall back to a
        // plain resize listener everywhere else.
        if (typeof window.matchMedia === 'function') {
            const mq = window.matchMedia(`(min-width: ${BREAKPOINT_LG}px)`);
            const handle = () => setIsDesktop(mq.matches);
            handle();
            mq.addEventListener("change", handle);
            return () => mq.removeEventListener("change", handle);
        }

        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    // اگر ویدیو پیش از hydration آماده شده باشد، لودینگ را فوراً پنهان کن
    useEffect(() => {
        const v = videoRef.current;
        if (v && v.readyState >= 3) setVideoReady(true);
    }, []);

    const goNext = () => {
        setActiveIndex((i) => (i + 1) % SERVICES.length);
    };

    const goPrev = () => {
        // (i - 1) alone produces -1 when i === 0 — wrap around properly instead.
        setActiveIndex((i) => (i - 1 + SERVICES.length) % SERVICES.length);
    };

    const handleClick = (id: string) => {

        router.push((`/${lang}/services/${id}`));
    }

    const goTo = (i: number) => setActiveIndex(i);

    // ── محاسبه translateX برای دسکتاپ ──
    // در دسکتاپ: 6 کارت رندر می‌شود (3 کارت اصلی + 3 کلون) اما ما از CSS برای چیدمان استفاده می‌کنیم.
    // برای سادگی و خوانایی، از یک روش ساده‌تر استفاده می‌کنیم: هر کارت 60% عرض دارد،
    // و برای اینکه کارت فعال در وسط باشد، offset محاسبه می‌شود.
    const getTranslateX = () => {
        if (!isDesktop) return "0%";
        // کارت فعال در مرکز: 50% - (60% / 2) = 20% از هر طرف
        // با احتساب اینکه هر کارت 60% عرض دارد و gap/px-4 داریم
        const offset = 20 - activeIndex * 60;
        return `${offset}%`;
    };

    const handleLanguageSwitch = (newLang: Language) => {
        router.push(`/${newLang}/services`);
    };
    // داخل کامپوننت:
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(true);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScrollability = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;

        const { scrollLeft, scrollWidth, clientWidth } = el;

        setCanScrollLeft((-scrollLeft + clientWidth) < (scrollWidth-50));
        setCanScrollRight(scrollLeft > 4 ||  scrollLeft<0);
    }, []);

    useEffect(() => {
        checkScrollability();
        const el = scrollRef.current;
        if (!el) return;

        el.addEventListener('scroll', checkScrollability);
        window.addEventListener('resize', checkScrollability);

        return () => {
            el.removeEventListener('scroll', checkScrollability);
            window.removeEventListener('resize', checkScrollability);
        };
    }, [checkScrollability]);

    const scrollByAmount = (dir: 'left' | 'right') => {
        const el = scrollRef.current;
        if (!el) return;
        const amount = el.clientWidth;
        el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
    };


    return (
        <div className="min-h-[screen] bg-surface text-slate-900 font-sans selection:bg-primary selection:text-white ">

            {/* Sticky Fidar Bondar Header */}
            <Header
                lang={currentLang}
                onLanguageChange={handleLanguageSwitch}
                seoConfig={seoConfig} onOpenAdmin={function (): void {
                    throw new Error('Function not implemented.');
                }}
            />

            <main className='scroll-smooth overflow-x-clip'>
                {/* 1. Page Hero — full-screen banner + breadcrumb */}
                <section className="w-full flex justify-center relative top-0 left-0 z-40">
                    <div className="bg-primary relative flex flex-col w-full h-screen md:h-[50vh]  px-5 pb-8 pt-14 lg:p-14">

                        <div className="rounded-4xl lg:items-center w-full flex-1 relative flex overflow-hidden [word-break:break-word] justify-center">

                            {/* ── Video Layer (پس‌زمینه) ── */}
                            <div className="absolute inset-0 z-0">
                                {/* Thumbnail — تا لحظه‌ی آماده‌شدن ویدیو نمایش داده می‌شود و بعد کراس‌فید می‌شود */}
                                <Image
                                    src="/assets/images/video_placeholder.png"
                                    alt=""
                                    fill
                                    priority
                                    sizes="100vw"
                                    className={`object-cover object-center transition-opacity duration-700 ${videoReady && !videoFailed ? 'opacity-0' : 'opacity-100'}`}
                                />
                                <video
                                    ref={videoRef}
                                    className={`w-full h-full object-cover object-center transition-opacity duration-700 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
                                    src="/assets/videos/Sito_-_Banner_Wood_-_Strip.m4v"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="auto"
                                    controlsList="nofullscreen"

                                    poster="/assets/images/video_placeholder.png"
                                    onCanPlay={() => setVideoReady(true)}
                                    onLoadedData={() => setVideoReady(true)}
                                    onPlaying={() => setVideoReady(true)}
                                    onError={() => { setVideoFailed(true); setVideoReady(true); }}
                                />
                            </div>

                            {/* ── Loading Overlay (اسپینر + نوار پیشرفت) تا وقتی ویدیو بافر می‌شود ── */}
                            <div className={`absolute inset-0 z-10 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${videoReady && !videoFailed ? 'opacity-0' : 'opacity-100'}`}>
                                <div className="flex flex-col items-center gap-4 rounded-2xl bg-black/30 px-8 py-6 backdrop-blur-md shadow-2xl ring-1 ring-white/15">
                                    <div className="relative w-14 h-14">
                                        <div className="absolute inset-0 rounded-full border-[3px] border-white/20" />
                                        <div className="absolute inset-0 rounded-full border-[3px] border-white/20 border-t-primary animate-spin" />
                                    </div>
                                    <span className="text-white/90 text-sm font-bold tracking-wide">
                                        {isFa ? 'در حال بارگذاری ویدیو…' : 'Loading video…'}
                                    </span>
                                </div>

                                {/* نوار پیشرفت لودینگ */}
                                <div className="absolute bottom-0 inset-x-0 h-1 bg-white/15 overflow-hidden">
                                    <div className="h-full w-1/3 bg-primary/90 animate-pulse" />
                                </div>
                            </div>

                            {/* ── Content Layer (روی ویدیو) ── */}
                            <div className="relative z-20 w-full flex justify-center px-8 lg:px-20">
                                <div className="w-full md:container md:mx-auto pb-16 pt-12 lg:items-center flex flex-col lg:flex-row justify-between gap-32">
                                    <div className="flex flex-col gap-5 w-full text-white text-5xl">
                                        {/* محتوای شما اینجا */}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* 2. "This is us" — Statement */}
                <section className="relative w-full bg-surface">
                    <div className="w-full  flex  justify-center px-8 lg:px-20">
                        <div className="w-full md:container md:mx-auto">
                            <div className={`gap-5 lg:gap-10 flex flex-col lg:flex-row-reverse items-center py-20 lg:py-28`} >
                                <Image className='object-contain  ' src={"/assets/images/logo_type.webp"} alt='' width={300} height={100} />
                                <div className="!leading-snug flex-[0_0_60%] text-center text-slate-900 text-base lg:text-xl  font-normal max-w-5xl mx-auto">
                                    {isFa ? (
                                        <>

                                            <p>فیدار سازه بندار یک مجموعه مهندسی و ساخت تخصصی در حوزه تجهیزات انتقال مواد، ماشین آلات بندری و تجهیزات صنعتی سنگین است که با تکیه بر دانش مهندسی ، تجربه اجرایی و توان ساخت، راهکارهای جامع از طراحی و تولید تا بازسازی و ارتقای تجهیزات ارائه میدهد.</p>


                                        </>
                                    ) : (
                                        <p>We are a knowledge-based engineering and manufacturing group. With advanced technology, engineering precision and future-oriented design, we optimize port terminals and heavy industries through next-generation material handling equipment.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



                {/* Logo and Slug */}
                <section className="flex flex-col w-full py-16 lg:py-28 gap-5 items-center bg-primary-dark">
                    {/* Header */}
                    <h2 className="text-center text-3xl lg:text-4xl leading-tight font-medium px-8 lg:px-20 max-w-4xl text-primary text-light">
                        {isFa ?
                            "خدمات فیدار سازه بندار" :
                            "Services Of Fidar Saze Bondar"
                        }

                    </h2>

                    <p className="text-base  font-light px-8 lg:px-20 max-w-4xl text-center text-light text-surface">
                        {isFa ?
                            'در فیدارسازه بندار، طراحی و ساخت بر پایه مهندسی دقیق، شناخت عمیق تجهیزات و توجه به الزامات عملکردی پروژه انجام می شود. محصولات ما حاصل ترکیب توان طراحی مهندسی، دقت ساخت و رویکرد توسعه محور است' :
                            "Seamless integration of material handling, storage, and distribution is key to ensuring continuous production, minimizing wait times, and optimizing every process step. Biesse Technic solutions dynamically and intelligently manage materials, delivering coordinated, high-performance workflows."
                        }

                    </p>

                    {/* ─── DESKTOP CAROUSEL ─── */}
                    <div className="w-full flex-col items-center gap-10 relative mt-14 hidden lg:flex" >
                        <div className="relative w-full overflow-hidden">
                            <div
                                className={`px-0 w-full flex ${isFa ? "flex-row-reverse" : "flex-row"}  items-end h-full transition-transform duration-500 delay-50 ease-out `}
                                style={{ transform: `translateX(${getTranslateX()})` }}
                            >
                                {SERVICES.map((item, index) => (
                                    <div
                                        key={item.nameEn}
                                        className="flex-[0_0_60%] lg:w-[60%] px-4  cursor-pointer"
                                        onClick={() => handleClick(isFa ? item.slugFa : item.slugEn)}
                                    >
                                        <div className="pb-4 px-4 xl:px-0 w-full h-full flex items-end lg:h-[65vh]">
                                            <div className={` ${index === activeIndex ? " h-full" : "h-1/2"} flex flex-col lg:flex-row items-start  transition-all duration-500 ease-out rounded-3xl min-h-80 overflow-hidden bg-neutral w-full   bg-surface`}>
                                                {/* Image */}
                                                <div className="relative w-full lg:self-stretch overflow-hidden lg:w-1/2 h-64 lg:h-auto">
                                                    <Image
                                                        src={item.imgUrl}
                                                        alt={isFa ? item.nameFa : item.nameEn}
                                                        fill
                                                        sizes="(max-width: 1280px) 100vw, 50vw"
                                                        className="object-cover"
                                                    />
                                                </div>

                                                {/* Text */}
                                                <div className="w-full h-full lg:w-1/2 flex flex-col items-start gap-4 justify-between lg:gap-5 pt-4 pb-10 lg:py-14 px-7 xl:px-10 2xl:px-20">
                                                    <h3 className="leading-relaxed break-normal text-2xl lg:text-4xl text-primary font-bold">
                                                        {isFa ? item.nameFa : item.nameEn}
                                                    </h3>

                                                    {item.descEn && (
                                                        <div className={`overflow-hidden delay-200 origin-top
                                                        ${index === activeIndex ? 'opacity-100 transform-y-0' : 'opacity-0 transform-y-50'}
                                                        
                                                        `}>
                                                            <p className="text-base lg:text-lg  font-light line-clamp-[8] break-normal text-dark">
                                                                {isFa ? item.descFa : item.descEn}
                                                            </p>
                                                        </div>
                                                    )}
                                                    <div
                                                        aria-label={`${isFa ? `نمابش اطلاعات ${item.nameFa}` : `Show Details of ${item.nameEn}`}`}
                                                        className={`flex justify-center items-center bg-primary h-10 w-50 text-white my-4 rounded-4xl duration-300 delay-200  self-end 
                                                         ${index === activeIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20 -events-none'}
                                                        `}>
                                                        {isFa ? "اطلاعات بیشتر" : "Read More"}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Next Button */}
                            {(activeIndex + 1) < (SERVICES.length) && <button
                                type="button"
                                onClick={goNext}
                                aria-label="Next slide"
                                className="rounded-full flex items-center justify-center transition-all active:scale-95 w-11 h-11 bg-white shadow-md text-primary hover:shadow-lg absolute right-8 bottom-60"
                            >
                                <ArrowRight />
                            </button>}

                            {activeIndex > 0 && <button
                                type="button"
                                onClick={goPrev}
                                aria-label="Prev slide"
                                className="rounded-full flex items-center justify-center transition-all active:scale-95 w-11 h-11 bg-white shadow-md text-primary hover:shadow-lg absolute left-8 bottom-60"
                            >
                                <ArrowLeft />
                            </button>}
                        </div>

                        {/* Dots */}
                        <div className="flex justify-center gap-2 px-8 lg:px-20 z-10 bottom-0">
                            {SERVICES.map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    aria-label={`Go to slide ${i + 1}`}
                                    onClick={() => goTo(i)}
                                    style={{ maxWidth: 50 }}
                                    className="py-2 w-full cursor-pointer"
                                >
                                    <div
                                        className={`h-[5px] rounded-full transition-colors bg-light ${i === activeIndex ? "" : "bg-opacity-50"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ─── MOBILE SWIPER ─── */}
                    <div className='lg:hidden w-full relative'>
                        <div className="flex flex-col items-center mt-14">

                            {/* فلش راست — فقط اگر بتوان به راست اسکرول کرد */}


                            {/* ── Scroll Container ── */}
                            <div
                                ref={scrollRef}
                                className={`relative w-full overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none flex ${isFa ? "flex-row" : "flex-row-reverse"}`}
                            >
                                {SERVICES.map((item) => (
                                    <div
                                        key={item.nameEn}
                                        onClick={() => handleClick(isFa ? item.slugFa : item.slugEn)}
                                        className="flex-[0_0_100%] min-w-0 snap-center snap-always shrink-0"
                                    >
                                        <div className="pb-4 px-4 w-full flex items-end">
                                            <div className="flex flex-col h-[70vh] items-center justify-between rounded-3xl min-h-80 overflow-hidden bg-surface w-full">

                                                {/* Image */}
                                                <div className="relative w-full flex-1 overflow-hidden">
                                                    <Image
                                                        src={item.imgUrl}
                                                        alt={isFa ? item.nameFa : item.nameEn}
                                                        fill
                                                        className="object-contain object-center"
                                                    />
                                                </div>

                                                {/* Text */}
                                                <div className="w-full flex flex-col items-start gap-4 pt-4 pb-10 px-6">
                                                    <h3 className="leading-none break-normal text-2xl lg:text-4xl text-primary font-normal">
                                                        {isFa ? item.nameFa : item.nameEn}
                                                    </h3>

                                                    {(isFa ? item.descFa : item.descEn) && (
                                                        <div className="flex flex-col items-start gap-4 lg:gap-5 w-full overflow-hidden">
                                                            <p className="text-base lg:text-lg leading-snug font-light line-clamp-[8] break-normal text-dark">
                                                                {isFa ? item.descFa : item.descEn}
                                                            </p>
                                                        </div>
                                                    )}

                                                </div>
                                                <button className='bg-primary  h-10 w-50 text-white mb-4 rounded-4xl mr-6'>
                                                    {isFa ? "اطلاعات بیشتر" : "Read More"}
                                                </button>
                                            </div>

                                        </div>

                                    </div>
                                ))}
                            </div>

                        </div>
                        <ChevronRight className={`text-surface transition-all duration-200 absolute -right-1 top-[50%] 
                                                        ${canScrollRight ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 -events-none'}`} />
                        <ChevronLeft className={`text-surface transition-all duration-200 absolute -left-1 top-[50%] 
                                                        ${canScrollLeft ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 -events-none'}`} />
                    </div>


                </section>







            </main>

            {/* Footer */}
            <Footer
                lang={currentLang}
                onOpenAdmin={function (): void {
                    throw new Error('Function not implemented.');
                }}
            />


        </div>
    );
};
export default ServicesPageComponent;

export { ServicesPageComponent as ServicesPage };