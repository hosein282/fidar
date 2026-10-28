'use client';

import React, { useEffect, useState, lazy, Suspense, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Language, SEOMetaConfig } from '../../types';
import { Header } from '../Header';
import { ContactSection } from '../ContactSection';
import { Footer } from '../Footer';
import { startNavigationLoading } from '../NavigationLoader';
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { MATERIALS } from '../../data/mockData.ts'

import {
    Ship, Anchor, Wind, Fan, Wrench, RefreshCw, Languages, SearchCheck,
    ChevronDown, MapPin, Compass, CalendarDays, Phone,
} from 'lucide-react';


interface ProductsPageProps {
    seoConfig: SEOMetaConfig;
    onOpenAdmin?: () => void;
    onOpenExporter?: () => void;
    lang?: Language;
}

const slides = [
    {
        icon: Ship,
        color: 'bg-primary-dark',
        image: "https://images.ctfassets.net/bdj0rlksezwc/46Qovx76Xp99zEZk9uh2CR/3ba0f915f8f10f7013a6a7f6b64505c3/istockphoto-1338523355-1024x1024.jpg",
        title: { fa: 'ترانستینر هیبرید RTG', en: 'Hybrid RTG Cranes' },
        desc: {
            fa: 'جرثقیل‌های کانتینری هیبرید نسل جدید برای بهینه‌سازی عملیات ترمینال‌های بندری',
            en: 'Next-generation hybrid container cranes engineered to optimize port terminal operations.',
        },
    },
    {
        icon: Anchor,
        color: 'bg-primary',
        image: "/assets/images/slides/Vetro_A_0_bassa.webp",
        title: { fa: 'تجهیزات جانبی بندرگاهی', en: 'Port Auxiliary Equipment' },
        desc: {
            fa: 'تجهیزات مکمل و جانبی بندر برای تسریع گردش کار در پایانه‌ها',
            en: 'Complementary terminal equipment that accelerates workflow inside ports and yards.',
        },
    },
    {
        icon: Wind,
        color: 'bg-primary-dark',
        image: "/assets/images/slides/legno_forma_A.RGB_color.0000_bassa.webp",
        title: { fa: 'فن‌های صنعتی', en: 'Industrial Fans' },
        desc: {
            fa: 'فن‌های پرقدرت تهویه و انتقال هوا برای صنایع سنگین و محیط‌های صنعتی',

            en: 'High-capacity ventilation & air-moving fans for heavy industry environments.',
        },
    },
    {
        icon: Fan,
        color: 'bg-primary',
        image: "/assets/images/slides/Pietra_designB0-rossoverona.webp",
        title: { fa: 'بلوئر صنعتی', en: 'Industrial Blowers' },
        desc: {
            fa: 'دمنده‌های صنعتی اختصاصی با راندمان بالا جهت فرآیندهای انتقال مواد',
            en: 'Custom high-efficiency industrial blowers for material handling processes.',
        },
    },
    {
        icon: Wrench,
        color: 'bg-primary-dark',
        image: "/assets/images/slides/polimeri_formaA_02-viola-lr.webp",
        title: { fa: 'تعمیرات تخصصی شناورها', en: 'Specialized Vessel Repair' },
        desc: {
            fa: 'تعمیر، بازسازی و نوسازی تخصصی شناورها و سازه‌های دریایی',
            en: 'Expert repair, refurbishment and renewal of vessels and marine structures.',
        },
    },
    {
        icon: RefreshCw,
        color: 'bg-primary',
        image: "https://images.ctfassets.net/bdj0rlksezwc/46Qovx76Xp99zEZk9uh2CR/3ba0f915f8f10f7013a6a7f6b64505c3/istockphoto-1338523355-1024x1024.jpg",
        title: { fa: 'بازسازی و به‌روزرسانی تجهیزات', en: 'Equipment Retrofit & Upgrade' },
        desc: {
            fa: 'به‌روزرسانی الکتریکال و مکانیکال انواع تجهیزات بندری و صنعتی',
            en: 'Electrical & mechanical upgrades for port and industrial equipment fleets.',
        },
    }

];

// =========================================================
// All Products of the Fidar Bondar project (bilingual)
// =========================================================


const ProductsPageComponent: React.FC<ProductsPageProps> = ({
    seoConfig,
    onOpenAdmin = () => { },
    onOpenExporter = () => { },
    lang = 'fa',

}) => {
    const router = useRouter();

    const currentLang: Language = (lang === 'en' || lang === 'fa') ? lang : 'fa';
    const isFa = currentLang === 'fa';


    const [activeIndex, setActiveIndex] = useState(1); // شروع از آیتم دوم
    const [isDesktop, setIsDesktop] = useState(false);
    const [active, setActive] = useState(0);

    // Sync HTML lang and dir attribute + scroll to top on load
    useEffect(() => {
        document.documentElement.setAttribute('dir', isFa ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', currentLang);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % MATERIALS.length);
        }, 5000);
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

    const goNext = () => {
        setActiveIndex((i) => (i + 1) % MATERIALS.length);
    };

    const goPrev = () => {
        // (i - 1) alone produces -1 when i === 0 — wrap around properly instead.
        setActiveIndex((i) => (i - 1 + MATERIALS.length) % MATERIALS.length);
    };

    const handleClick = (id: string) => {
        startNavigationLoading();
        router.push((`/${lang}/products/${id}`));
    }

    const goTo = (i: number) => setActiveIndex(i);

    const getTranslateX = () => {
        if (!isDesktop) return "0%";

        const offset = 20 - activeIndex * 60;
        return `${offset}%`;
    };

    const handleLanguageSwitch = (newLang: Language) => {
        router.push(`/${newLang}/products`);
    };


    const mobileScrollerRef = useRef<HTMLDivElement>(null);

    const [scrollLeft, setScrollLeft] = useState(false);
    const [scrollRight, setScrollRight] = useState(false);


    const checkScrollability = useCallback(() => {
        const el = mobileScrollerRef.current;
        if (!el) return;

        const { scrollLeft, scrollWidth, clientWidth } = el;

        setScrollLeft((-scrollLeft + clientWidth) < (scrollWidth - 50));
        setScrollRight(scrollLeft > 4 || scrollLeft < 0);
    }, []);

    useEffect(() => {
        checkScrollability();

        const el = mobileScrollerRef.current;

        if (!el) return;

        el.addEventListener('scroll', checkScrollability);
        window.addEventListener('resize', checkScrollability);

        return () => {
            el.removeEventListener('scroll', checkScrollability);
            window.removeEventListener('resize', checkScrollability);
        }
    }, [checkScrollability])


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
                                <video
                                    className="w-full h-full object-cover object-center"
                                    src="/assets/videos/Sito_-_Banner_Wood_-_Strip.m4v"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="auto"
                                    controlsList="nofullscreen"

                                    poster='/assets/images/video_placeholder.png'
                                />
                            </div>

                            {/* ── Content Layer (روی ویدیو) ── */}
                            <div className="relative z-20 w-full flex justify-center px-8 lg:px-20">
                                <div className="w-full md:container md:mx-auto pb-16 pt-12 lg:items-center flex flex-col lg:flex-row justify-between gap-32">
                                    <div className="flex flex-col gap-5 w-full">
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
                                <div className="leading-relaxed flex-[0_0_60%] text-center text-slate-900 text-base lg:text-xl  font-normal max-w-5xl mx-auto ">
                                    {isFa ? (
                                        <>

                                            <p><b>فیدار سازه بندار</b> یک مجموعه مهندسی و ساخت تخصصی در حوزه <b>تجهیزات انتقال مواد</b>، <b>ماشین آلات بندری</b> و <b>تجهیزات صنعتی سنگین</b> است که با تکیه بر دانش مهندسی ، تجربه اجرایی و توان ساخت، راهکارهای جامع از طراحی و تولید تا بازسازی و ارتقای تجهیزات ارائه میدهد.</p>


                                        </>
                                    ) : (
                                        <p>We are a knowledge-based engineering and manufacturing group. With <b>advanced technology</b>, <b>engineering precision</b> and <b>future-oriented design</b>, we optimize port terminals and heavy industries through next-generation material handling equipment.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Genuine Mastery — full-width parallax band */}
                <section className="relative lg:h-[70vh] h-[85vh] overflow-hidden lg:block bg-surface ">
                    <div className="absolute inset-0">
                        {MATERIALS.map((slide, index) => (<div key={slide.nameEn}
                            className={`absolute inset-0 transition-all duration-800 delay-50 ease-in-out ${index === active ? "translate-y-0 opacity-100" : index < active ? "-translate-y-full " : "translate-y-full "}`}
                        >

                            <Image src={slide.imgUrl} alt="" fill priority={index === 0} className="object-cover" sizes="100vw"
                            />

                            <div className="absolute inset-0 bg-black/40" />
                        </div>
                        ))}

                    </div>
                    <div className="relative z-20 h-full w-full overflow-hidden ">
                        <div className="flex h-full w-full flex-col transition-transform duration-1000 ease-in-out"
                            style={{ transform: `translateY(-${active * 100}%)`, }}
                        >
                            {MATERIALS.map((slide, index) => (
                                <div key={index}
                                    className="h-full w-full shrink-0 items-center  hidden lg:flex " >
                                    <div className=" w-full items-center pl-4 pr-4 ">
                                        <h2 className="text-4xl font-normal leading-tight text-white lg:text-5xl"> {isFa ? slide.nameFa : slide.nameEn} </h2>
                                    </div>
                                    <div className="flex h-full w-screen flex-col justify-end ">

                                        <div className="flex h-1/4 w-full justify-end " >
                                            <div
                                                className="relative z-10 h-6 w-6 bg-surface self-end"
                                                style={
                                                    isFa ?
                                                        {
                                                            WebkitMaskImage:
                                                                "radial-gradient(circle at 100% 0%, transparent 0 24px, black 24px)",
                                                            maskImage:
                                                                "radial-gradient(circle at 100% 0%, transparent 0 24px, black 24px)",
                                                        }
                                                        : {
                                                            WebkitMaskImage:
                                                                "radial-gradient(circle at 0% 0%, transparent 0 24px, black 24px)",
                                                            maskImage:
                                                                "radial-gradient(circle at 0% 0%, transparent 0 24px, black 24px)",
                                                        }
                                                }
                                            />
                                            <div className="w-1/4 bg-surface" />

                                        </div>

                                        <div className={`flex h-[51%]  items-center  -mt-px -mb-px bg-surface py-9 pl-24 px-14 ${isFa ? "rounded-r-3xl" : "rounded-l-3xl"}`}>
                                            <p className="text-2xl font-normal  leading-loose text-slate-900 lg:text-xl"> {isFa ? slide.descFa : slide.descEn} </p>
                                        </div>

                                        <div className="flex h-1/4 w-full justify-end">
                                            <div
                                                className="relative z-10 h-6 w-6 bg-surface"
                                                style={isFa ? {
                                                    WebkitMaskImage:
                                                        "radial-gradient(circle at 100% 100%, transparent 0 24px, black 24px)",
                                                    maskImage:
                                                        "radial-gradient(circle at 100% 100%, transparent 0 24px, black 24px)",
                                                }
                                                    : {
                                                        WebkitMaskImage:
                                                            "radial-gradient(circle at 0% 100%, transparent 0 24px, black 24px)",
                                                        maskImage:
                                                            "radial-gradient(circle at 0% 100%, transparent 0 24px, black 24px)",
                                                    }
                                                }
                                            />
                                            <div className="w-1/4 bg-surface" />

                                        </div>
                                    </div>
                                </div>))}
                            {MATERIALS.map((slide, index) => (
                                <div key={index}
                                    className="h-full w-full shrink-0 items-center drop-shadow-2xl  sm:flex flex-col" >
                                    <div className=" w-full items-center pl-4 pr-10 absolute top-[8%]">
                                        <h2 className="text-3xl font-black leading-tight text-white lg:text-5xl"> {isFa ? slide.nameFa : slide.nameEn} </h2>
                                    </div>
                                    <div className="flex h-full w-full flex-col">

                                        <div className={`flex h-2/4 w-full ${isFa ? "justify-end" : "justify-start"} `} >
                                            <div
                                                className="relative z-10 h-6 w-6 bg-surface opacity-75 self-end"
                                                style={{
                                                    WebkitMaskImage:
                                                        "radial-gradient(circle at 100% 0%, transparent 0 24px, black 24px)",
                                                    maskImage:
                                                        "radial-gradient(circle at 100% 0%, transparent 0 24px, black 24px)",
                                                }}
                                            />

                                        </div>

                                        <div className="flex h-3/8 lg:h-2/4  items-center rounded-r-3xl -mt-px -mb-px py-9 pl-14 pr-14 lg:pr-24 bg-surface opacity-75">

                                            <p className="text-xl font-normal  leading-tight text-slate-900 lg:text-4xl"> {isFa ? slide.descFa : slide.descEn} </p>
                                        </div>

                                        <div className={`flex h-1/4 w-full  ${isFa ? "justify-end" : "justify-start"} `}>
                                            <div
                                                className="relative z-10 h-6 w-6 bg-surface opacity-75"
                                                style={{
                                                    WebkitMaskImage:
                                                        "radial-gradient(circle at 100% 100%, transparent 0 24px, black 24px)",
                                                    maskImage:
                                                        "radial-gradient(circle at 100% 100%, transparent 0 24px, black 24px)",
                                                }}
                                            />

                                        </div>
                                    </div>
                                </div>))}
                        </div>
                    </div>



                    {/* Dots */}
                    <div className={`absolute bottom-8 -mt-px z-30 flex gap-3 ${isFa ? "right-14" : "left-14"} `}>
                        {MATERIALS.map((_, index) => (<button key={index} type="button" onClick={() => setActive(index)} aria-label={`Go to slide ${index + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 ${active === index ? "w-10 bg-white" : "w-2 bg-white/50"}`} />))}
                    </div>

                </section>



                {/* Logo and Slug */}
                <section className="flex flex-col w-full py-16 lg:py-28 gap-5 items-center bg-primary">
                    {/* Header */}
                    <h2 className="text-center text-3xl lg:text-4xl leading-tight font-bold px-8 lg:px-20 max-w-4xl text-light">
                        {isFa ?
                            "محصولات فیدار سازه بندار" :
                            " Products Of Fidar Saze Bondar"
                        }

                    </h2>

                    <div className="text-lg   px-8 lg:px-20 max-w-4xl text-center text-light">
                        {isFa ?
                            <p>
                                در <b>فیدارسازه بندار</b>، طراحی و ساخت بر پایه مهندسی دقیق، شناخت عمیق تجهیزات و توجه به الزامات عملکردی پروژه انجام می شود.<br></br> محصولات ما حاصل ترکیب <b>توان طراحی مهندسی</b>، <b>دقت ساخت</b> و <b>رویکرد توسعه محور</b> است
                            </p>
                            :
                            <p>
                                "Seamless integration of material handling, storage, and distribution is key to ensuring continuous production, minimizing wait times, and optimizing every process step. Biesse Technic solutions dynamically and intelligently manage materials, delivering coordinated, high-performance workflows."
                            </p>
                        }
                    </div>




                    {/* ─── DESKTOP CAROUSEL ─── */}
                    <div className="w-full flex-col items-center gap-10 relative mt-14 hidden lg:flex" >
                        <div className="relative w-full overflow-hidden">
                            <div
                                className={`px-0 w-full flex ${isFa ? "flex-row-reverse" : "flex-row"}  items-end h-full transition-transform duration-500 delay-50 ease-out `}
                                style={{ transform: `translateX(${getTranslateX()})` }}
                            >
                                {MATERIALS.map((item, index) => (

                                    <div
                                        key={item.nameEn}
                                        className="flex-[0_0_60%] lg:w-[60%] px-4 cursor-pointer "
                                        onClick={() => handleClick(isFa ? item.slugFa : item.slugEn)}
                                    >
                                        <div className="pb-4 px-4 xl:px-0 w-full h-full flex items-end lg:h-[60vh]">
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
                                                            <p className="text-base lg:text-lg leading-snug font-light line-clamp-[8] break-normal text-dark">
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
                            {(activeIndex + 1) < (MATERIALS.length) && <button
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
                            {MATERIALS.map((_, i) => (
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
                    <div className='lg:hidden w-full relative '>
                        <div className=" flex flex-col items-center  mt-14 ">

                            {/* ── Scroll Container ── */}
                            <div ref={mobileScrollerRef} className={`relative w-full overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none flex ${isFa ? "flex-row" : "flex-row-reverse"}`}>

                                {MATERIALS.map((item) => (
                                    <div
                                        key={item.nameEn}
                                        onClick={() => handleClick(isFa ? item.slugFa : item.slugEn)}

                                        className="flex-[0_0_100%] min-w-0 snap-center snap-always shrink-0 "
                                    >
                                        <div className="pb-4 px-4 w-full flex ">
                                            <div className="flex flex-col h-[70vh] items-center justify-between rounded-3xl min-h-80 overflow-hidden bg-surface w-full">

                                                {/* Image */}
                                                <div className="relative w-full flex-1 overflow-hidden">
                                                    <Image
                                                        src={item.imgUrl}
                                                        alt={isFa ? item.nameFa : item.nameEn}
                                                        fill
                                                        className="object-cover object-center"
                                                    />
                                                </div>

                                                {/* Text */}
                                                <div className="w-full flex flex-col items-start gap-4 pt-4 pb-10 px-7">
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
                                                <button className='bg-primary h-10 w-50 text-white mb-4 rounded-4xl'>
                                                    {isFa ? "اطلاعات بیشتر" : "Read More"}

                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                            <ChevronRight className={`text-surface transition-all duration-200 absolute -right-1 top-[50%] 
                            ${scrollRight ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 -events-none'}`} />
                            <ChevronLeft className={`text-surface transition-all duration-200 absolute -left-1 top-[50%] 
                            ${scrollLeft ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 -events-none'}`} />
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer
                lang={currentLang}
                onOpenAdmin={function (): void {
                    throw new Error('Function not implemented.');
                }} />


        </div >
    );
};
export default ProductsPageComponent;

export { ProductsPageComponent as ProductsPage };
