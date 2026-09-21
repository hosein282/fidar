'use client';

import React, { useEffect, useState, lazy, Suspense, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Language, SEOMetaConfig, MaterialData } from '../../types';
import { Header } from '../Header';
import { ContactSection } from '../ContactSection';
import { Footer } from '../Footer';
import { ArrowRight, ArrowLeft, ChevronRight, ChevronLeft } from 'lucide-react';
import { MATERIALS } from '../../data/mockData.ts'


interface ProductsPageProps {
    seoConfig: SEOMetaConfig;
    item: MaterialData;
    onOpenAdmin?: () => void;
    onOpenExporter?: () => void;
    lang?: Language;
}


const ProductPageComponent: React.FC<ProductsPageProps> = ({
    seoConfig,
    item,
    lang = 'fa',

}) => {
    const router = useRouter();

    const currentLang: Language = (lang === 'en' || lang === 'fa') ? lang : 'fa';
    const isFa = currentLang === 'fa';


    const [activeIndex, setActiveIndex] = useState(0); // پیش‌فرض: کارت دوم (Storing)
    const [isDesktop, setIsDesktop] = useState(false);
    const touchStartX = useRef<number | null>(null);

    const goNext = () => {
        setActiveIndex((i) => (i + 1) % item.slides.length);
    };

    const goPrev = () => {
        // (i - 1) alone produces -1 when i === 0 — wrap around properly instead.
        setActiveIndex((i) => (i - 1 + item.slides.length) % MATERIALS.length);
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
        router.push(`/${newLang}/products`);
    };


    return (
        <div className="min-h-[screen] bg-surface  text-slate-900 font-sans selection:bg-primary selection:text-white">

            {/* Sticky Fidar Bondar Header */}
            <Header
                lang={currentLang}
                onLanguageChange={handleLanguageSwitch}
                seoConfig={seoConfig}
                onOpenAdmin={function (): void {
                    throw new Error('Function not implemented.');
                }}
               />

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
                                <Image className='object-contain  ' src={"/assets/images/logo_type.webp"} alt='' width={300} height={100} />
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
                    {(item.slides.length > 0) && < div className="w-full flex-col items-center gap-10 relative mt-14 hidden lg:flex ">
                        <div className="relative w-full overflow-x-hidden ">
                            <div
                                className={`px-0 w-full flex ${isFa ? "flex-row-reverse" : "flex-row"}  items-end h-full transition-transform duration-500 delay-50 ease-out `}
                                style={{ transform: `translateX(${getTranslateX()})` }}
                            >
                                {item.slides.map((prod, index) => (

                                    <div
                                        key={prod.nameEn}
                                        className="flex-[0_0_60%] lg:w-[60%] px-4  "
                                    >
                                        <div className="pb-4 px-4 xl:px-0 w-full h-full flex items-end lg:h-[60vh]">
                                            <div className={` ${index === activeIndex ? " h-full" : "h-1/2"} flex flex-col lg:flex-row items-start  transition-all duration-500 ease-out rounded-3xl min-h-80 overflow-hidden bg-neutral w-full   bg-primary`}>
                                                {/* Image */}
                                                <div className="relative w-full lg:self-stretch overflow-hidden lg:w-1/2 h-64 lg:h-auto">
                                                    <Image
                                                        src={prod.imgUrl}
                                                        alt={isFa ? prod.nameFa : prod.nameEn}
                                                        fill
                                                        sizes="(max-width: 1280px) 100vw, 50vw"
                                                        className="object-cover"
                                                    />
                                                </div>

                                                {/* Text */}
                                                <div className="w-full lg:w-1/2 flex flex-col items-start gap-4 lg:gap-5 pt-4 pb-10 lg:py-14 px-7 xl:px-10 2xl:px-20">
                                                    <h3 className="leading-relaxed break-normal text-xl lg:text-3xl  font-normal">
                                                        {isFa ? prod.nameFa : prod.nameEn}
                                                    </h3>

                                                    {prod.descEn && (
                                                        <div className="flex flex-col items-start gap-4 lg:gap-5 w-full overflow-hidden">
                                                            <p className="text-base lg:text-lg leading-snug font-light line-clamp-[8] break-normal text-dark">
                                                                {isFa ? prod.descFa : prod.descEn}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Next Button */}
                            <button
                                type="button"
                                onClick={goNext}
                                aria-label="Next slide"
                                className="rounded-full flex items-center justify-center transition-all active:scale-95 w-11 h-11 bg-white shadow-md text-primary hover:shadow-lg absolute right-8 bottom-60"
                            >
                                <ArrowRight />
                            </button>

                            <button
                                type="button"
                                onClick={goPrev}
                                aria-label="Prev slide"
                                className="rounded-full flex items-center justify-center transition-all active:scale-95 w-11 h-11 bg-white shadow-md text-primary hover:shadow-lg absolute left-8 bottom-60"
                            >
                                <ArrowLeft />
                            </button>
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


                    }

                    {/* ─── MOBILE SWIPER ─── */}
                    <div className='lg:hidden w-full relative'>
                        <div className=" flex flex-col items-center  mt-14 ">
                            {item.slides.length > 0 &&
                                <div>
                                    <ChevronRight className=' absolute -right-px top-[50%] ' color='grey' />
                                    <ChevronLeft className=' absolute -left-px top-[50%] ' color='grey' />
                                </div>
                            }

                            {/* ── Scroll Container ── */}
                            <div className="relative w-full overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none flex">

                                {item.slides.map((item) => (
                                    <div
                                        key={item.nameEn}
                                        className="flex-[0_0_100%] min-w-0 snap-center snap-always shrink-0"
                                    >
                                        <div className="pb-4 px-4 w-full flex items-end">
                                            <div className="flex flex-col h-[70vh] items-center justify-between rounded-3xl min-h-80 overflow-hidden bg-primary w-full">

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
                                                    <h3 className="leading-none break-normal text-2xl lg:text-4xl  font-normal">
                                                        {isFa ? item.nameFa : item.nameEn}
                                                    </h3>

                                                    {(isFa ? item.descFa : item.descEn) && (
                                                        <div className="flex flex-col items-start gap-4 lg:gap-5 w-full overflow-hidden">
                                                            <p className="text-base lg:text-lg  leading-snug font-light line-clamp-[8] break-normal text-dark">
                                                                {isFa ? item.descFa : item.descEn}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
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
                }} 
                />


        </div>
    );
};
export default ProductPageComponent;

export { ProductPageComponent as ProductPage };