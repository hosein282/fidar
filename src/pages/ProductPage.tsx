'use client';

import React, { useEffect, useState, lazy, Suspense, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Language, SEOMetaConfig,MaterialData } from '../types';
import { Header } from '../components/Header';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import {MATERIALS} from '../data/mockData.ts'


interface ProductsPageProps {
    seoConfig: SEOMetaConfig;
    item : MaterialData;
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




    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1280px)");
        const handle = () => setIsDesktop(mq.matches);
        handle();
        mq.addEventListener("change", handle);
        return () => mq.removeEventListener("change", handle);
    }, []);



    const goTo = (i: number) => setActiveIndex(i);



    const handleLanguageSwitch = (newLang: Language) => {
        router.push(`/${newLang}/products`);
    };


    return (
        <div className="min-h-[screen] bg-surface text-slate-900 font-sans selection:bg-primary selection:text-white">

            {/* Sticky Fidar Bondar Header */}
            <Header
                lang={currentLang}
                onLanguageChange={handleLanguageSwitch}
                seoConfig={seoConfig} onOpenAdmin={function (): void {
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
                                    src="/assets/videos/Sito_-_Banner_Wood_-_Strip.m4v"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="auto"
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
                <section className="relative w-full bg-surface">
                    <div className="w-full  flex  justify-center px-8 lg:px-20">
                        <div className="w-full md:container md:mx-auto">
                            <div className={`gap-5 lg:gap-10 flex flex-col lg:flex-col items-center py-20 lg:py-28`} >
                                <Image className='object-contain  ' src={"/assets/images/logo_type.png"} alt='' width={300} height={100} />
                                <div className="!leading-snug flex-[0_0_60%] text-center text-slate-900 text-xl lg:text-2xl  font-normal max-w-5xl mx-auto">
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
                <section className="flex flex-col w-full py-16 lg:py-28 gap-5 items-center bg-primary">
                    {/* Header */}
                    <h2 className="text-center text-3xl lg:text-4xl leading-tight font-medium px-8 lg:px-20 max-w-4xl text-light">
                        {isFa ?
                            "محصولات فیدار سازه بندار" :
                            " Products Of Fidar Saze Bondar"
                        }

                    </h2>

                    <p className="text-lg leading-snug font-light px-8 lg:px-20 max-w-4xl text-center text-light">

                        {isFa ?
                            "فیدارسازه بندار با تخصص در طراحی و ساخت تجهیزات انتقال مواد بندرگاهی، راهکارهای مهندسی شده ای برای جابجایی ایمن، دقیق و بهره ور بار در محیط های عملیاتی سخت ارائه می دهد. محصولات ما شامل انواع جرثقیل های بندرگاهی ، تجهیزات جابجایی کانتی نر و سیستم های مرتبط با عملیات تخلیه و بارگیری است که با بهره گیری از دانش مهندسی، طراحی دقیق و فرآیند ساخت کنترل شده، برای عملکرد پایدار و طولانی مدت توسعه می یابند." :
                            "Seamless integration of material handling, storage, and distribution is key to ensuring continuous production, minimizing wait times, and optimizing every process step. Biesse Technic solutions dynamically and intelligently manage materials, delivering coordinated, high-performance workflows."

                        }

                    </p>

                    {/* ─── DESKTOP CAROUSEL ─── */}
                    <div className="w-full flex-col items-center gap-10 relative mt-14 hidden xl:flex ">
                        <div className="relative w-full overflow-x-hidden ">
                            <div
                                className={`px-0 w-full flex ${isFa ? "flex-row-reverse" : "flex-row"} items-center justify-center h-full transition-transform duration-500 delay-50 ease-out`}
                            >

                                    <div
                                        key={item.nameEn}
                                        className="flex-[0_0_60%] xl:w-[60%] px-4 mx-5"
                                    >
                                        <div className="pb-4 px-4 xl:px-0 w-full h-full flex items-end xl:h-[60vh]">
                                            <div className={` flex flex-col lg:flex-row items-start  transition-all duration-500 ease-out rounded-3xl min-h-80 overflow-hidden bg-neutral w-full   bg-surface`}>
                                                {/* Image */}
                                                <div className="relative w-full lg:self-stretch overflow-hidden lg:w-1/2 h-64 lg:h-auto">
                                                    <Image
                                                        src={item.imgUrl}
                                                        alt={isFa ? item.nameFa : item.nameEn}
                                                        fill
                                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                                        className="object-cover"
                                                    />
                                                </div>

                                                {/* Text */}
                                                <div className="w-full lg:w-1/2 flex flex-col items-start gap-4 lg:gap-5 pt-4 pb-10 lg:py-14 px-7 xl:px-10 2xl:px-20">
                                                    <h3 className="leading-none break-normal text-2xl lg:text-4xl text-primary font-normal">
                                                        {isFa ? item.nameFa : item.nameEn}
                                                    </h3>

                                                    {item.descEn && (
                                                        <div className="flex flex-col items-start gap-4 lg:gap-5 w-full overflow-hidden">
                                                            <p className="text-base lg:text-lg leading-snug font-light line-clamp-[8] break-normal text-dark">
                                                                {isFa ? item.descFa : item.descEn}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>

                        
                        </div>

                       
                    </div>

                    {/* ─── MOBILE SWIPER ─── */}
                    <div className="w-full flex flex-col items-center relative mt-14 lg:hidden">
                        {/* ── Scroll Container ── */}
                        <div className="relative w-full overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none flex">
                                <div
                                    key={item.nameEn}
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
                                        </div>
                                    </div>
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
export default ProductPageComponent;

export { ProductPageComponent as ProductPage };