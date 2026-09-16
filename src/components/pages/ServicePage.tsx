'use client';

import React, { useEffect, useState, lazy, Suspense, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Language, SEOMetaConfig, MaterialData } from '../../types';
import { Header } from '../Header';
import { ContactSection } from '../ContactSection';
import { Footer } from '../Footer';
import {   ChevronRight, ChevronLeft } from 'lucide-react';
import {  SERVICES } from '../../data/mockData.ts'


interface ServicesPageProps {
    seoConfig: SEOMetaConfig;
    item: MaterialData;
    onOpenAdmin?: () => void;
    onOpenExporter?: () => void;
    lang?: Language;
}


const ServicePageComponent: React.FC<ServicesPageProps> = ({
    seoConfig,
    item,
    lang = 'fa',

}) => {
    const router = useRouter();

    const currentLang: Language = (lang === 'en' || lang === 'fa') ? lang : 'fa';
    const isFa = currentLang === 'fa';


    const [activeIndex, setActiveIndex] = useState(0); // پیش‌فرض: کارت دوم (Storing)
    const [isDesktop, setIsDesktop] = useState(false);

    const goNext = () => {
        setActiveIndex((i) => (i + 1) % item.slides.length);
    };

    const goPrev = () => {
        // (i - 1) alone produces -1 when i === 0 — wrap around properly instead.
        setActiveIndex((i) => (i - 1 + item.slides.length) % SERVICES.length);
    };


    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1280px)");
        const handle = () => setIsDesktop(mq.matches);
        handle();
        mq.addEventListener("change", handle);
        return () => mq.removeEventListener("change", handle);
    }, []);

    const getTranslateX = () => {
        if (!isDesktop) return "0%";
        // کارت فعال در مرکز: 50% - (60% / 2) = 20% از هر طرف
        // با احتساب اینکه هر کارت 60% عرض دارد و gap/px-4 داریم
        const offset = 20 - activeIndex * 60;
        return `${offset}%`;
    };

    const goTo = (i: number) => setActiveIndex(i);



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

        setCanScrollLeft((-scrollLeft + clientWidth) !== scrollWidth);
        setCanScrollRight(scrollLeft !== 0);
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
        el.scrollBy({ left: dir === 'left' ? (-amount) : amount, behavior: 'smooth' });
    };

    return (
        <div className="min-h-[screen] bg-surface lg:mt-18 text-slate-900 font-sans selection:bg-primary selection:text-white">

            {/* Sticky Fidar Bondar Header */}
            <Header
                lang={currentLang}
                onLanguageChange={handleLanguageSwitch}
                seoConfig={seoConfig}
                onOpenAdmin={function (): void {
                    throw new Error('Function not implemented.');
                }} onOpenExporter={function (): void {
                    throw new Error('Function not implemented.');
                }} />

            <main className='scroll-smooth '>
                {/* 1. Page Hero — full-screen banner + breadcrumb */}
                <section className="w-full flex justify-center relative top-0 left-0 z-40">
                    <div className="bg-primary relative flex flex-col w-full h-screen md:h-[50vh]  px-5 pb-8 pt-14 lg:p-14">

                        <div className="rounded-4xl lg:items-center w-full flex-1 relative flex overflow-hidden [word-break:break-word] justify-center">

                            {/* ── Video Layer (پس‌زمینه) ── */}
                            <div className="absolute inset-0 z-0">
                                <video
                                    className="w-full h-full object-cover object-center"
                                    src={item.videoUrl}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="auto"
                                    poster='/assets/images/video_placeholder.png'
                                    controlsList="nofullscreen"
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
                {/* <section className="relative w-full bg-surface">
                    <div className="w-full  flex  justify-center px-8 lg:px-20">
                        <div className="w-full md:container md:mx-auto">
                            <div className={`gap-5 lg:gap-10 flex flex-col lg:flex-col items-center py-20 lg:py-28`} >
                                <Image className='object-contain  ' src={"/assets/images/logo_type.png"} alt='' width={300} height={100} />
                                <div className="!leading-snug flex-[0_0_60%] text-center text-slate-900 text-xl lg:text-2xl  font-normal max-w-5xl mx-auto">
                                    {isFa ? (
                                        <>
                                            <p>
                                                {item.descFa}
                                            </p>
                                        </>
                                    ) : (
                                        <p>
                                            {item.descEn}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}



                {/* Logo and Slug */}
                <section className="flex flex-col w-full py-16 lg:py-28 gap-5 items-center bg-surface">
                    {/* Header */}
                    <h2 className="text-center text-2xl lg:text-4xl leading-tight font-medium px-8 lg:px-20 max-w-4xl text-light">
                        {isFa ?
                            item.nameFa :
                            item.nameEn
                        }

                    </h2>

                    <p className="text-sm lg:text-lg whitespace-pre-line leading-loose font-light px-8 lg:px-20 max-w-4xl text-center text-light">

                        <span>
                            {isFa ? item.descFa : item.descEn}
                        </span>



                    </p>

                    {/* ─── DESKTOP  ─── */}


                    {/* ─── MOBILE SWIPER ─── */}
                    <div className=' w-full relative'>
                        <div className={`flex flex-col items-center mt-14  `}>

                            {/* فلش راست — فقط اگر بتوان به راست اسکرول کرد */}
                            
                                <button
                                    type="button"
                                    onClick={() => scrollByAmount('right')}
                                    aria-label="Next"
                                    className={`absolute right-0 shadow-lg top-[55%] z-10 cursor-pointer p-3 transition-all duration-200 bg-slate-50 rounded-full ${canScrollRight ? 'opacity-100 ' : "opacity-0 "}`}
                                >
                                    <ChevronRight color='orange' />
                                </button>
                            

                            {/* فلش چپ — فقط اگر بتوان به چپ اسکرول کرد */}
                           
                                <button
                                    type="button"
                                    onClick={() => scrollByAmount('left')}
                                    aria-label="Previous"
                                    className={`absolute left-0 shadow-lg top-[55%] z-10 cursor-pointer p-3  transition-all duration-200 bg-slate-50 rounded-full ${canScrollLeft ? 'opacity-100 ' : "opacity-0 "}`}>
                                    <ChevronLeft color='orange' />
                                </button>
                         

                            {/* ── Scroll Container ── */}
                            <div
                                ref={scrollRef}
                                className={`relative w-full overflow-x-auto snap-x snap-proximity scroll-smooth scrollbar-none flex ${item.slides.length === 1 ? "justify-center" : ""} `}
                            >
                                {item.slides.map((slide, index) => (
                                    <div
                                        key={index}
                                        className={`flex-[0_0_100%] md:flex-[0_0_50%] ${item.slides.length > 1 ? "lg:flex-[0_0_33%]" : "lg:flex-[0_0_50%]"} min-w-0 snap-center snap-always shrink-0 rounded-4xl `}
                                    >
                                        <div className="pb-4 px-4 w-full flex items-end">
                                            <div className="flex flex-col h-[60vh] items-center shadow-lg justify-between rounded-3xl min-h-80 overflow-hidden bg-surface w-full">

                                                {/* Image */}
                                                <div className="relative w-full flex-2  overflow-hidden  ">
                                                    <Image
                                                        src={slide.imgUrl}
                                                        alt={isFa ? slide.nameFa : slide.nameEn}
                                                        fill={true}
                                                        
                                                        className="object-cover object-center"
                                                    />
                                                </div>

                                                {/* Text */}
                                                {/* <div className="w-full flex flex-col items-start gap-4 pt-4 pb-10 px-7">
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
                                                                    </div> */}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>







            </main>

            {/* Footer */}
            <Footer
                lang={currentLang}
                onOpenAdmin={function (): void {
                    throw new Error('Function not implemented.');
                }} onOpenExporter={function (): void {
                    throw new Error('Function not implemented.');
                }} />


        </div>
    );
};
export default ServicePageComponent;

export { ServicePageComponent as ServicePage };