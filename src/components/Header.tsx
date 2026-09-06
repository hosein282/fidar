import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Language, SEOMetaConfig } from '../types';
import { Globe, Search, User, MapPin, Wrench, MessageSquare, Share2, Menu, X, Code2, LayoutDashboard, ChevronDown, Edit3 } from 'lucide-react';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenAdmin: () => void;
  onOpenExporter: () => void;
  seoConfig: SEOMetaConfig;
}

/**
 * Minimal language switcher dropdown — shows only "FA" or "EN" in its normal
 * state and opens a tiny menu with Persian / English options.
 */
const LangSwitcher: React.FC<{
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  className?: string;
}> = ({ lang, onLanguageChange, className = '' }) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Close the menu when clicking outside of it.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const current = lang === 'fa' ? 'FA' : 'EN';

  return (
    <div ref={rootRef} className={`relative select-none ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex min-w-[54px] items-center justify-center gap-1 rounded-md border border-slate-300 bg-white px-2.5 py-1 text-[11px] font-bold tracking-wide text-slate-800 uppercase transition hover:border-primary hover:text-primary"
      >
        {current}
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-1 z-[130] min-w-[92px] rounded-lg border border-gray-200 bg-white p-1 shadow-xl"
        >
          <button
            type="button"
            role="option"
            aria-selected={lang === 'fa'}
            onClick={() => { setOpen(false); onLanguageChange('fa'); }}
            className={`flex w-full items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-bold uppercase transition ${lang === 'fa' ? 'bg-slate-100 text-primary' : 'text-slate-700 hover:bg-slate-50'
              }`}
          >
            <Globe className="w-3 h-3 text-slate-400" />
            <span>fa</span>
            {lang === 'fa' && <span className="ml-auto text-[10px] text-green-600">✓</span>}
          </button>
          <button
            type="button"
            role="option"
            aria-selected={lang === 'en'}
            onClick={() => { setOpen(false); onLanguageChange('en'); }}
            className={`flex w-full items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-bold uppercase transition ${lang === 'en' ? 'bg-slate-100 text-primary' : 'text-slate-700 hover:bg-slate-50'
              }`}
          >
            <Globe className="w-3 h-3 text-slate-400" />
            <span>en</span>
            {lang === 'en' && <span className="ml-auto text-[10px] text-green-600">✓</span>}
          </button>
        </div>
      )}
    </div>
  );
};

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  onOpenAdmin,
  onOpenExporter,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const [headerVisible, setHeaderVisible] = useState(true);
  // const [lastScrollY, setLastScrollY] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;

  //     // Always show header at top of page (< 50px)
  //     if (currentScrollY <= 50) {
  //       setHeaderVisible(true);
  //     } else if (currentScrollY > lastScrollY && currentScrollY > 500) {
  //       // Scrolling DOWN -> hide header
  //       setHeaderVisible(false);
  //     } else if (currentScrollY + 60 < lastScrollY) {
  //       // Scrolling UP -> show header immediately
  //       setHeaderVisible(true);
  //     }

  //     setLastScrollY(currentScrollY);
  //   };

  //   window.addEventListener('scroll', handleScroll, { passive: true });
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [lastScrollY]);

  const isFa = lang === 'fa';

  return (
    <>
      {/* Floating Sticky Action Widget Bar on Right Edge (Always 100% Visible 3 Buttons) */}
      <div className="hidden fixed z-[110] right-3 sm:right-5 top-1/2 -translate-y-1/2 flex flex-col gap-3 items-end dir-ltr select-none">
        {/* Button 1: Technical Support / PHP Exporter */}
        <div className="relative group/btn flex items-center">
          <span className="absolute right-14 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 translate-x-2 transition-all duration-200 bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-xl shadow-2xl whitespace-nowrap border border-slate-700">
            {isFa ? 'پشتیبانی فنی / دریافت PHP' : 'Technical support'}
          </span>
          <button
            type="button"
            onClick={onOpenExporter}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black hover:bg-primary text-white border border-white/20 shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer active:scale-95"
            aria-label="Technical Support"
          >
            <Wrench className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        {/* Button 2: Request Info / Contact Form */}
        <div className="relative group/btn flex items-center">
          <span className="absolute right-14 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 translate-x-2 transition-all duration-200 bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-xl shadow-2xl whitespace-nowrap border border-slate-700">
            {isFa ? 'ثبت درخواست مشاوره' : 'Info request'}
          </span>
          <a
            href="#contact"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black hover:bg-primary text-white border border-white/20 shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer active:scale-95"
            aria-label="Info Request"
          >
            <Edit3 className="w-5 h-5 stroke-[2]" />
          </a>
        </div>

        {/* Button 3: CMS Database Admin */}
        <div className="relative group/btn flex items-center">
          <span className="absolute right-14 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 translate-x-2 transition-all duration-200 bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-xl shadow-2xl whitespace-nowrap border border-slate-700">
            {isFa ? 'مدیریت دیتابیس / CMS' : 'CMS Admin'}
          </span>
          {/* <button
            type="button"
            onClick={onOpenAdmin}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black hover:bg-primary text-white border border-white/20 shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer active:scale-95"
            aria-label="CMS Admin"
          >
            <Share2 className="w-5 h-5 stroke-[2]" />
          </button> */}
        </div>
      </div>

      {/* Main Header Wrapper */}
      <header id="header"  className={`sticky top-0 z-[100] w-full bg-surface border-b border-gray-300 shadow-sm transition-transform duration-300 ease-in-out `}>

        {/* Top Utility Nav Bar (Exact Fidar Bondar top bar) */}
        <div className="bg-surface px-4 sm:px-10 pt-3 pb-2 hidden lg:block border-b border-gray-200">
          <div className="max-w-[1440px] mx-auto flex justify-between items-center text-xs font-medium text-slate-800">

            {/* Left Tagline */}
            <div className="flex items-center gap-2 text-slate-500">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>{isFa ? 'سامانه بین‌المللی تولید دستگاه‌ها و کدهای وب فیدار بندار' : 'Fidar Bondar Group • Industrial Processing & Digital Architecture'}</span>
            </div>

            {/* Right Top Links */}
            <div className="flex items-center gap-5">
              <a href="#about" className="hover:underline hover:text-primary flex items-center gap-1">
                <span>{isFa ? 'درباره شرکت' : 'Company'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </a>
              <a href="#sustainability" className="hover:underline hover:text-primary flex items-center gap-1">
                <span>{isFa ? 'پایداری و نوآوری' : 'Sustainability'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </a>
              <a href="#locations" className="hover:underline hover:text-primary flex items-center gap-1">
                <span>{isFa ? 'شعب و نمایندگی‌ها' : 'Governance & Investor'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </a>
              <Link href={`/${lang}/blog`} className="hover:underline hover:text-primary">
                <span>{isFa ? 'اخبار و مقالات' : 'News'}</span>
              </Link>
              <a href="#contact" className="hover:underline hover:text-primary">
                <span>{isFa ? 'تماس با ما' : 'Contact us'}</span>
              </a>

              {/* Language Selector Dropdown — minimal FA/EN */}
              <LangSwitcher lang={lang} onLanguageChange={onLanguageChange} />
            </div>

          </div>
        </div>

        {/* Main Logo & Navigation Bar */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10 py-2 flex items-center justify-between gap-6">

          {/* Fidar Bondar Brand SVG Logo */}
          <Link href={`/${lang}`} className="flex items-center gap-3 shrink-0">
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 219 65" className="h-10 sm:h-12 text-primary">
              <path fill="currentColor" d="m56.966 37.417-19.879-19.85c-.878-.876-1.76-1.758-3.518-1.758H15.971a1.764 1.764 0 0 1-1.76-1.758V1.759C14.21.793 13.42 0 12.448 0H.148s-.01 0-.01.009v1.75c0 1.732.875 2.63 1.762 3.512l21.111 21.08c.879.878 1.762 1.76 3.518 1.76h17.594c.967 0 1.761.788 1.761 1.758v21.08c0 .966-.79 1.759-1.761 1.759l-33.932-.009c-1.118 0-1.677 1.347-.887 2.135L19.484 65H33.56c1.735 0 2.64-.882 3.518-1.759l19.879-19.849a4.233 4.233 0 0 0 0-5.975h.009Z"></path>
              <path fill="currentColor" d="M124.546 25.674c-8.021 0-12.714 5.373-12.714 13.803 0 8.429 4.698 13.749 12.714 13.749 6.015 0 10.66-3.11 11.924-7.956.053-.212-.16-.42-.367-.42h-4.539c-.213 0-.315.159-.422.367-1.215 2.583-2.9 3.898-6.596 3.898-5.013 0-7.439-3.264-7.439-7.743 0-.106.106-.261.261-.261h19.577a.36.36 0 0 0 .368-.368v-1.262c0-8.009-4.431-13.803-12.767-13.803v-.004Zm6.965 11.694h-14.036a.359.359 0 0 1-.368-.368c.053-3.69 2.005-7.269 7.386-7.269s7.333 3.584 7.386 7.27a.358.358 0 0 1-.368.367ZM154.304 37.373l-4.378-.687c-2.586-.42-4.17-1.262-4.17-3.264 0-2.109 1.478-3.792 5.701-3.792 4.747 0 6.543 2.263 6.543 4.638 0 .212.159.367.368.367h4.272a.36.36 0 0 0 .369-.367c0-5.64-5.067-8.59-11.557-8.59-4.645 0-10.708 2.215-10.708 7.744 0 4.319 2.794 6.48 6.964 7.114l6.122.948c3.114.474 5.013 1.315 5.013 3.69 0 2.635-2.165 4.004-6.65 4.004-4.747 0-6.912-2.423-6.912-4.532a.358.358 0 0 0-.368-.367h-4.272a.36.36 0 0 0-.368.367c0 4.846 4.326 8.59 11.924 8.59 6.65 0 11.504-2.53 11.504-8.43s-4.698-6.693-9.392-7.429l-.005-.004ZM180.738 37.373l-4.379-.687c-2.585-.42-4.169-1.262-4.169-3.264 0-2.109 1.477-3.792 5.7-3.792 4.747 0 6.544 2.263 6.544 4.638 0 .212.159.367.367.367h4.272c.214 0 .369-.159.369-.367 0-5.64-5.066-8.59-11.557-8.59-4.644 0-10.708 2.215-10.708 7.744 0 4.319 2.794 6.48 6.964 7.114l6.123.948c3.114.474 5.012 1.315 5.012 3.69 0 2.635-2.165 4.004-6.649 4.004-4.747 0-6.912-2.423-6.912-4.532a.359.359 0 0 0-.368-.367h-4.272a.36.36 0 0 0-.368.367c0 4.846 4.325 8.59 11.923 8.59 6.651 0 11.504-2.53 11.504-8.43s-4.697-6.693-9.392-7.429l-.004-.004ZM93.097 33.682c-.314-.159-.314-.42 0-.58 3.377-1.528 4.854-4.372 4.854-7.428-.053-4.74-2.902-9.852-10.816-9.852h-16.25a.359.359 0 0 0-.367.368V52.33c0 .213.16.368.368.368h16.622c7.706 0 11.237-5.059 11.237-10.011 0-3.637-1.163-7.061-5.648-9.01v.005ZM75.474 20.194c0-.212.16-.367.368-.367h10.34c4.747 0 6.752 2.476 6.752 6.427 0 3.951-2.266 5.373-6.223 5.373H75.84a.359.359 0 0 1-.368-.368V20.194ZM86.71 48.593H75.788a.359.359 0 0 1-.368-.368v-12.12c0-.212.16-.367.368-.367h11.29c4.485 0 6.703 2.316 6.703 6.533 0 4.217-2.848 6.322-7.071 6.322ZM107.928 15.822h-4.964a.367.367 0 0 0-.368.368v5.271c0 .203.164.368.368.368h4.964a.368.368 0 0 0 .368-.368V16.19a.368.368 0 0 0-.368-.368ZM107.607 26.201h-4.276a.368.368 0 0 0-.368.368v25.767c0 .203.165.367.368.367h4.276a.368.368 0 0 0 .369-.367V26.569a.368.368 0 0 0-.369-.368ZM205.697 25.674c-8.02 0-12.715 5.373-12.715 13.803 0 8.429 4.698 13.749 12.715 13.749 6.015 0 10.66-3.11 11.924-7.956.053-.212-.16-.42-.369-.42h-4.537c-.213 0-.316.159-.422.367-1.215 2.583-2.902 3.898-6.596 3.898-5.013 0-7.439-3.264-7.439-7.743 0-.106.106-.261.261-.261h19.577a.36.36 0 0 0 .368-.368v-1.262c0-8.009-4.432-13.803-12.767-13.803v-.004Zm6.965 11.694h-14.037a.358.358 0 0 1-.367-.368c.053-3.69 2.004-7.269 7.386-7.269 5.381 0 7.332 3.584 7.386 7.27 0 .212-.16.367-.368.367Z"></path>
            </svg> */}
            <Image
              src="/assets/images/logo.png"
              width={140}
              height={60}
              alt="Fidar Bondar Sazeh فیدار بندار سازه"
            />
          </Link>


          {/* Center Navigation Categories */}
          <nav className="hidden lg:flex items-center gap-8 text-black text-lg xl:text-xl font-bold">
            <a href="#materials" className="hover:text-primary transition hover:underline">
              {isFa ? 'خطوط تولید' : 'Lines'}
            </a>
            <a href="#services" className="hover:text-primary transition hover:underline">
              {isFa ? 'دستگاه‌ها' : 'Machines'}
            </a>
            <a href="#portfolio" className="hover:text-primary transition hover:underline">
              {isFa ? 'کامپوننت‌ها و دیتابیس' : 'Components'}
            </a>
            <div className="btn--watermark shadow-sm relative group bg-white px-4 py-1.5 rounded-md border border-gray-300">
              <a href="#contact" className="hover:text-primary flex items-center gap-1 text-primary">
                <span>{isFa ? 'پشتیبانی مشتریان' : 'Customer Care'}</span>
                <ChevronDown className="w-4 h-4" />
              </a>
            </div>
          </nav>

          {/* Right Action Icons (Store Locator, Search, User/Admin Login) */}
          <div className="flex items-center gap-3">



            {/* PHP Exporter Code Button */}
            {/* <button
              onClick={onOpenExporter}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-300 text-primary hover:bg-primary hover:text-white transition shadow-sm text-xs font-bold"
              title={isFa ? 'دانلود سورس کد PHP و دیتابیس MySQL' : 'Export PHP/MySQL Source Code'}
            >
              <Code2 className="w-4 h-4" />
              <span>{isFa ? 'سورس PHP' : 'PHP Code'}</span>
            </button> */}

            {/* Store/Branch Locator Icon */}
            {/* <a
              href="#locations"
              className="w-9 h-9 rounded-full bg-white border border-gray-300 flex items-center justify-center text-slate-800 hover:text-primary hover:border-primary transition shadow-sm"
              title={isFa ? 'شعب و نمایندگی‌ها' : 'Branches'}
            >
              <MapPin className="w-4 h-4" />
            </a> */}

            {/* CMS Admin Login Icon */}
            {/* <button
              onClick={onOpenAdmin}
              className="w-9 h-9 rounded-full bg-white border border-gray-300 flex items-center justify-center text-slate-800 hover:text-primary hover:border-primary transition shadow-sm"
              title={isFa ? 'ورود به پنل مدیریت دیتابیس' : 'Admin Login'}
            >
              <User className="w-4 h-4" />
            </button> */}

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-white border border-gray-300 text-slate-800 hover:text-primary"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 px-6 py-6 space-y-4 shadow-xl">
            <div className="flex justify-start">
              <LangSwitcher lang={lang} onLanguageChange={onLanguageChange} />
            </div>
            <nav className="flex flex-col space-y-3 text-slate-900 font-bold text-base">

              <a href="#materials" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary">
                {isFa ? 'خطوط تولید (Lines)' : 'Lines'}
              </a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary">
                {isFa ? 'دستگاه‌ها  (Machines)' : 'Machines'}
              </a>
              <a href="#portfolio" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary">
                {isFa ? 'کامپوننت‌ها و دیتابیس (Components)' : 'Components'}
              </a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary">
                {isFa ? 'پشتیبانی مشتریان (Customer Care)' : 'Customer Care'}
              </a>
              <a href="#blog" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary">
                {isFa ? 'اخبار و مقالات دیتابیس (News)' : 'News & Articles'}
              </a>



            </nav>


            <div className="pt-4 border-t border-gray-200 flex flex-col gap-2">

              <button
                onClick={() => { setMobileMenuOpen(false); onOpenExporter(); }}
                className="w-full py-2.5 rounded-lg text-xs font-bold bg-slate-100 text-primary border border-gray-300 flex items-center justify-center gap-2"
              >
                <Code2 className="w-4 h-4" />
                <span>{isFa ? 'دانلود سورس کد PHP و MySQL' : 'Export PHP & MySQL'}</span>
              </button>

              {/* <button
                onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
                className="w-full py-2.5 rounded-lg text-xs font-bold bg-primary text-white flex items-center justify-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4 text-white" />
                <span>{isFa ? 'ورود به پنل مدیریت محتوای دیتابیس' : 'CMS Database Admin'}</span>
              </button> */}

            </div>
          </div>
        )}

      </header>
    </>
  );
};
