import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface MaterialsShowcaseProps {
  lang: Language;
}

interface MaterialData {
  id: 'wood' | 'glass' | 'stone' | 'materia' | 'metal';
  nameEn: string;
  nameFa: string;
  color: string;
  descEn: string;
  descFa: string;
  btnEn: string;
  btnFa: string;
  imgUrl: string;
}

const MATERIALS: MaterialData[] = [
  {
    id: 'wood',
    nameEn: 'Wood',
    nameFa: 'چوب',
    color: 'rgb(215, 144, 48)',
    descEn: 'We manufacture machines designed to simplify the production process for our customers who work with wood in the furniture and window and door industry.',
    descFa: 'ما ماشین‌آلاتی برای ساده‌سازی فرآیند تولید برای مشتریانی که با چوب در صنعت مبلمان و در و پنجره فعالیت می‌کنند، تولید می‌کنیم.',
    btnEn: 'Discover Biesse Machinery Wood',
    btnFa: 'کشف ماشین‌آلات چوب بیئس',
    imgUrl: '/assets/images/WOOD-singolo-2.png'
  },
  {
    id: 'glass',
    nameEn: 'Glass',
    nameFa: 'شیشه',
    color: 'rgb(74, 195, 224)',
    descEn: 'We engineer high-precision machines for processing glass in architectural, interior design, and automotive applications.',
    descFa: 'ما ماشین‌آلات پیشرفته برای فراوری و برش شیشه در صنایع معماری، طراحی داخلی و ساخت خودرو تولید می‌کنیم.',
    btnEn: 'Discover Biesse Machinery Glass',
    btnFa: 'کشف ماشین‌آلات شیشه بیئس',
    imgUrl: '/assets/images/test-GLASS-icon-2.png'
  },
  {
    id: 'stone',
    nameEn: 'Stone',
    nameFa: 'سنگ',
    color: 'rgb(240, 82, 61)',
    descEn: 'Our stone processing technology offers maximum versatility and cutting-edge precision for natural and synthetic stone creation.',
    descFa: 'تکنولوژی برش و پردازش سنگ بیئس، حداکثر انعطاف‌پذیری و دقت فوق‌العاده را برای سنگ‌های طبیعی و مصنوعی فراهم می‌سازد.',
    btnEn: 'Discover Biesse Machinery Stone',
    btnFa: 'کشف ماشین‌آلات سنگ بیئس',
    imgUrl: '/assets/images/STONE_singolo-2.png'
  },
  {
    id: 'materia',
    nameEn: 'Materia',
    nameFa: 'متریال',
    color: 'rgb(130, 130, 214)',
    descEn: 'Solutions for processing advanced materials, plastics and composites, meeting the demands of high-tech industries.',
    descFa: 'راهکارهای هوشمند برای پردازش متریال‌های پیشرفته، پلاستیک‌ها و کامپوزیت‌های با فناوری بالا.',
    btnEn: 'Discover Biesse Materia',
    btnFa: 'کشف متریال‌های پیشرفته بیئس',
    imgUrl: '/assets/images/MATERIA-singolo-2.png'
  },
  {
    id: 'metal',
    nameEn: 'Metal',
    nameFa: 'فلز',
    color: 'rgb(101, 85, 74)',
    descEn: 'Advanced metalworking systems engineered for heavy-duty industrial manufacturing and ultimate precision.',
    descFa: 'سیستم‌های پیشرفته متال‌ورکینگ صنعتی، طراحی‌شده برای برش و تراش سنگین فلزات با دقت میکرونی.',
    btnEn: 'Discover Biesse Metal',
    btnFa: 'کشف ماشین‌آلات فلز بیئس',
    imgUrl: 'https://images.ctfassets.net/bdj0rlksezwc/4XcQgGguNlL4P9DamLvITc/6985bffeadc3e564669328ce2965d3a3/icona_metal.png?w=2370&h=3500&q=50&fm=png'
  }
];

export const MaterialsShowcase: React.FC<MaterialsShowcaseProps> = ({ lang }) => {
  const isFa = lang === 'fa';
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll listener to activate tabs based on scroll position in 500vh container
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollableHeight = rect.height - window.innerHeight;
      if (totalScrollableHeight <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollableHeight, 0), 0.999);
      const index = Math.floor(progress * MATERIALS.length);
      setActiveIndex(index);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const totalScrollableHeight = rect.height - window.innerHeight;
    const targetScroll = sectionTop + (index / MATERIALS.length) * totalScrollableHeight + 10;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const current = MATERIALS[activeIndex];
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  return (
    <div id="materials" ref={containerRef} className="relative z-30 h-[500vh] bg-black">
      {/* Sticky Desktop & Mobile View Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* =========================================================
            DESKTOP VIEW (lg:flex)
           ========================================================= */}
        <div
          className={`w-full h-full relative items-center hidden lg:flex transition-colors duration-700 select-none ${
            isFa ? 'pr-[10vw] pl-6 flex-row-reverse dir-rtl' : 'pl-[10vw] pr-6 flex-row dir-ltr'
          }`}
          style={{ backgroundColor: current.color }}
        >
          {/* Vertical Sidebar Tabs (10vw) */}
          <div
            className={`absolute top-0 flex justify-between z-20 select-none flex-col w-[10vw] h-full py-14 ${
              isFa ? 'right-0' : 'left-0'
            }`}
          >
            {MATERIALS.map((mat, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={mat.id}
                  onClick={() => handleTabClick(idx)}
                  className={`flex-1 w-full flex items-center justify-center transition-all duration-300 font-bold cursor-pointer text-slate-900 ${
                    isActive ? 'scale-110 opacity-100 font-extrabold' : 'opacity-60 hover:opacity-100'
                  }`}
                  type="button"
                >
                  <span
                    className={`inline-block truncate text-lg 3xl:text-xl tracking-wide select-none ${
                      isFa ? 'rotate-90' : 'rotate-[-90deg]'
                    }`}
                  >
                    {isFa ? mat.nameFa : mat.nameEn}
                  </span>
                </button>
              );
            })}

            {/* Selected pill border frame indicator perfectly centered on active tab */}
            <div
              className="transition-all duration-300 border-2 rounded-full border-slate-900 pointer-events-none absolute left-1/2"
              style={{
                height: '135px',
                width: '44px',
                top: `calc(3.5rem + (${activeIndex} + 0.5) * ((100% - 7rem) / 5))`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          </div>

          {/* Middle Text Content & SVG Logo Column */}
          <div className="flex flex-1 flex-col z-10 max-w-xl xl:max-w-2xl text-slate-900">
            {/* Biesse Brand SVG Header */}
            <div className="flex items-end mb-8 w-full relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ fillRule: 'evenodd' as const, clipRule: 'evenodd' as const, strokeLinejoin: 'round' as const, strokeMiterlimit: 2 }}
                viewBox="0 0 308 123"
                className="mb-[1px] h-20 xl:h-24 2xl:h-28 [&_path]:!fill-slate-900"
              >
                <path
                  d="M825.223 441.348c1.035 0 2.07-.688 2.414-1.723l63.484-219.078c.692-1.723 2.766-1.723 3.445 0l63.489 219.078c.34 1.035 1.379 1.723 2.414 1.723h42.431c1.03 0 1.73-.688 1.73-1.723V200.191c0-1.035-.7-1.722-1.73-1.722h-20.697c-1.031 0-1.726.687-1.726 1.722v218.731c0 1.726-2.762 2.762-3.45 0l-64.168-218.731c-.351-1.035-1.035-1.722-2.07-1.722h-35.891c-1.035 0-1.714.687-2.07 1.722L808.66 418.922c-.683 2.762-3.445 1.726-3.445 0V200.191c0-1.035-.688-1.722-1.723-1.722h-20.699c-1.035 0-1.73.687-1.73 1.722v239.434c0 1.035.695 1.723 1.73 1.723h42.43M1172.28 277.469c0 1.039-.68 1.73-1.72 1.73h-55.54c-43.82 0-49.34-15.875-49.34-31.054 0-15.872 11.39-32.426 44.5-32.426 45.2 0 62.1 29.324 62.1 53.476v8.274Zm-51.05 99.019c47.26 0 75.2-20.703 75.2-62.105v-72.102c0-14.488 1.04-22.769 15.53-22.769h3.8c1.03 0 1.72-.688 1.72-1.723v-17.598c0-1.035-.69-1.722-1.72-1.722h-3.8c-23.8 0-31.4 7.246-35.88 20.695-.69 2.07-2.07 1.731-3.1.695-5.18-5.175-20.01-24.843-62.8-24.843-45.53 0-68.65 21.738-68.65 53.129 0 31.742 23.12 51.753 72.11 51.753h41.4c11.04 0 17.24 0 17.24 14.485 0 17.945-2.41 41.402-51.05 41.402-34.5 0-48.64-14.484-48.64-41.742 0-1.035-.7-1.723-1.73-1.723h-20.71c-1.03 0-1.71.688-1.71 1.723 0 42.09 31.39 62.445 72.79 62.445M1373.78 259.188h20.35c1.03 0 1.73-.692 1.73-1.727-3.46-24.152-24.15-62.445-77.97-62.445-54.17 0-85.57 36.57-85.57 90.738 0 54.164 31.4 90.734 85.57 90.734 53.82 0 74.51-38.297 77.97-62.445 0-1.035-.7-1.723-1.73-1.723h-20.35c-1.04 0-1.73.688-2.07 1.723-6.91 26.219-25.19 41.742-53.82 41.742-38.3 0-61.42-28.633-61.42-70.031 0-41.402 23.12-70.035 61.42-70.035 28.63 0 46.91 15.519 53.82 41.742.34 1.035 1.03 1.727 2.07 1.727M1562.48 295.758c0 30.359-13.8 59.687-53.82 60.027-38.64 0-53.82-18.285-53.82-59.683v-95.911c0-1.035-.69-1.722-1.73-1.722h-20.69c-1.04 0-1.73.687-1.73 1.722v239.434c0 1.035.69 1.723 1.73 1.723h20.69c1.04 0 1.73-.688 1.73-1.723v-83.84c0-1.722 2.07-2.07 3.11-1.035 5.86 5.863 20.35 21.738 50.71 21.738 52.78-.347 77.97-36.57 77.97-80.73v-95.567c0-1.035-.68-1.722-1.72-1.722h-20.7c-1.04 0-1.73.687-1.73 1.722v95.567M1637 373.035c1.04 0 1.73-.687 1.73-1.722V200.191c0-1.035-.69-1.722-1.73-1.722h-20.69c-1.04 0-1.73.687-1.73 1.722v171.122c0 1.035.69 1.722 1.73 1.722H1637Zm3.45 68.313c1.03 0 1.73-.688 1.73-1.723V412.02c0-1.036-.7-1.723-1.73-1.723h-27.6c-1.04 0-1.72.687-1.72 1.723v27.605c0 1.035.68 1.723 1.72 1.723h27.6M1803.63 292.305c0 33.812-13.8 63.48-53.82 63.48-38.64 0-53.82-22.078-53.82-63.48v-92.114c0-1.035-.69-1.722-1.72-1.722h-20.7c-1.03 0-1.73.687-1.73 1.722v171.122c0 1.035.7 1.722 1.73 1.722h16.91c1.03 0 1.72-.344 2.07-1.722l3.44-18.973c.35-2.07 2.42-2.07 3.45-.695 4.84 6.558 23.46 25.187 53.82 24.843 52.79-.691 74.52-33.121 74.52-84.183v-92.114c0-1.035-.68-1.722-1.72-1.722h-20.7c-1.04 0-1.73.687-1.73 1.722v92.114M2276.96 371.313c.34 1.035 1.38 1.722 2.41 1.722h21.74c1.04 0 1.73-.687 1.38-1.722l-66.58-197.344c-9.66-28.633-15.87-43.813-46.58-43.813h-35.53c-1.04 0-1.73.688-1.73 1.723v17.254c0 1.035.69 1.722 1.73 1.722h35.18c14.85 0 18.29 8.625 22.78 23.114 1.72 5.523 2.76 11.039-1.73 24.5l-58.65 172.844c-.35 1.035.35 1.722 1.38 1.722h21.74c1.04 0 2.07-.687 2.41-1.722l48.3-150.766c.7-1.723 2.76-1.723 3.45 0l48.3 150.766M1934.73 356.133c-39.34 0-57.62-36.227-57.62-56.922 0-1.035.7-1.731 1.73-1.731h110.74c1.04 0 1.73.696 1.73 1.731 0 24.836-16.22 56.922-56.58 56.922Zm-55.89-79.352c-1.03 0-1.73-.687-1.73-1.722 0-30.016 21.39-59.34 57.62-59.34 27.94 0 43.47 14.144 50.02 26.91.69 1.379 1.73 1.723 2.76 1.723h22.08c1.04 0 2.41-.344 2.07-1.723-10.35-31.399-39.67-47.613-76.93-47.613-50.03 0-83.84 36.918-83.84 90.738 0 54.164 32.09 91.078 83.84 91.078s82.8-37.262 82.8-91.078c0-2.418-.35-6.211-.69-7.246-.34-1.039-1.04-1.727-2.07-1.727h-135.93M2040.64 371.313c0 1.035.7 1.722 1.73 1.722h17.25c1.03 0 1.37-.687 1.73-1.722l3.44-18.973c.34-2.07 2.41-2.07 3.45-.695 4.48 5.523 18.29 24.843 50.37 24.843h14.49c1.04 0 1.72-.691 1.72-1.726v-20.699c0-1.036-.68-1.723-1.72-1.723h-14.49c-38.64 0-53.82-19.324-53.82-60.035v-92.114c0-1.035-.69-1.722-1.73-1.722h-20.69c-1.03 0-1.73.687-1.73 1.722v171.122M1720.67 602.813h-92.7c-1.39 0-2.44 1.046-2.44 2.441.35 24.394 13.24 48.09 48.79 48.09s48.44-23.696 48.79-48.09c0-1.395-1.04-2.441-2.44-2.441Zm-46 77.367c-52.97 0-83.99-35.547-83.99-91.309 0-55.758 31.02-90.957 83.99-90.957 39.73 0 70.4 20.563 78.76 52.621.35 1.395-1.04 2.789-2.44 2.789h-29.97c-1.39 0-2.09-1.043-2.79-2.437-8.01-17.078-19.17-25.789-43.56-25.789-33.11 0-49.14 21.605-49.14 51.226 0 .699.7 1.746 1.74 1.746h129.3c1.39 0 2.44 1.043 2.44 2.438v8.363c0 52.973-29.28 91.309-84.34 91.309M1184.68 602.813h-92.7c-1.4 0-2.44 1.046-2.44 2.441.34 24.394 13.24 48.09 48.79 48.09 35.54 0 48.44-23.696 48.79-48.09 0-1.395-1.05-2.441-2.44-2.441Zm-46.01 77.367c-52.97 0-83.98-35.547-83.98-91.309 0-55.758 31.01-90.957 83.98-90.957 39.73 0 70.4 20.563 78.77 52.621.34 1.395-1.05 2.789-2.44 2.789h-29.97c-1.4 0-2.1-1.043-2.79-2.437-8.02-17.078-19.17-25.789-43.57-25.789-33.1 0-49.13 21.605-49.13 51.226 0 .699.69 1.746 1.74 1.746h129.29c1.4 0 2.44 1.043 2.44 2.438v8.363c0 52.973-29.27 91.309-84.34 91.309M1335.23 602.813l-28.93 4.531c-17.07 2.789-27.53 8.363-27.53 21.605 0 13.942 9.76 25.094 37.64 25.094 31.37 0 43.21-14.984 43.21-30.668 0-1.395 1.05-2.441 2.44-2.441h28.23c1.4 0 2.44 1.046 2.44 2.441 0 37.289-33.45 56.805-76.32 56.805-30.67 0-70.75-14.637-70.75-51.231 0-28.574 18.48-42.863 46.01-47.047l40.42-6.273c20.56-3.137 33.11-8.711 33.11-24.395 0-17.425-14.29-26.484-43.91-26.484-31.37 0-45.65 16.027-45.65 29.969 0 1.394-1.05 2.441-2.44 2.441h-28.23c-1.4 0-2.44-1.047-2.44-2.441 0-32.063 28.58-56.805 78.76-56.805 43.91 0 75.97 16.727 75.97 55.762 0 37.289-31.01 44.258-62.03 49.137M1509.83 602.813l-28.93 4.531c-17.07 2.789-27.53 8.363-27.53 21.605 0 13.942 9.76 25.094 37.64 25.094 31.36 0 43.21-14.984 43.21-30.668 0-1.395 1.05-2.441 2.44-2.441h28.23c1.4 0 2.44 1.046 2.44 2.441 0 37.289-33.46 56.805-76.32 56.805-30.67 0-70.75-14.637-70.75-51.231 0-28.574 18.47-42.863 46.01-47.047l40.42-6.273c20.56-3.137 33.11-8.711 33.11-24.395 0-17.425-14.29-26.484-43.91-26.484-31.37 0-45.66 16.027-45.66 29.969 0 1.394-1.04 2.441-2.43 2.441h-28.23c-1.4 0-2.44-1.047-2.44-2.441 0-32.063 28.57-56.805 78.76-56.805 43.91 0 75.97 16.727 75.97 55.762 0 37.289-31.02 44.258-62.03 49.137M888.801 528.582H816.66c-1.394 0-2.441 1.047-2.441 2.438v80.156c0 1.394 1.047 2.441 2.441 2.441h74.578c29.625 0 44.262-15.336 44.262-43.215 0-27.879-18.82-41.82-46.699-41.82ZM814.57 716.426c0 1.39 1.043 2.437 2.438 2.437h68.305c31.367 0 44.609-16.379 44.609-42.515 0-26.137-14.984-35.547-41.121-35.547h-71.793c-1.395 0-2.438 1.043-2.438 2.437v73.188Zm116.399-89.219c-2.09 1.047-2.09 2.789 0 3.836 22.304 10.105 32.062 28.926 32.062 49.137-.347 31.367-19.168 65.168-71.441 65.168H784.25c-1.395 0-2.441-1.043-2.441-2.438V503.84c0-1.395 1.046-2.442 2.441-2.442h109.777c50.879 0 74.231 33.457 74.231 66.215 0 24.047-7.668 46.7-37.289 59.594M1028.9 745.348h-32.763c-1.395 0-2.438-1.043-2.438-2.438v-34.851c0-1.391 1.043-2.438 2.438-2.438h32.763c1.39 0 2.44 1.047 2.44 2.438v34.851c0 1.395-1.05 2.438-2.44 2.438M1026.81 676.695h-28.232c-1.394 0-2.441-1.047-2.441-2.441V503.84c0-1.395 1.047-2.442 2.441-2.442h28.232c1.39 0 2.44 1.047 2.44 2.442v170.414c0 1.394-1.05 2.441-2.44 2.441"
                  fill="#231f20"
                  fillRule="nonzero"
                  transform="matrix(.13333 0 0 -.13333 0 122.83)"
                />
              </svg>
            </div>

            {/* Description Paragraph with Fade Transition */}
            <div className="h-full flex w-full flex-col justify-stretch">
              <div className="max-h-[42vh] w-full overflow-hidden text-xl 2xl:text-2xl leading-relaxed text-slate-900 font-light">
                <p className="transition-all duration-500">
                  {isFa ? current.descFa : current.descEn}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <a href="#contact">
                  <button
                    className="rounded-lg transition-all duration-300 whitespace-nowrap bg-black text-white hover:bg-[#005254] px-10 h-12 md:px-12 md:h-14 md:text-xl font-medium hover:rounded-[30px] shadow-2xl cursor-pointer flex items-center gap-3 active:scale-95"
                    type="button"
                  >
                    <span>{isFa ? current.btnFa : current.btnEn}</span>
                    <ArrowIcon className="w-5 h-5" />
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Right Image Display Column with Parallax Animated Stack */}
          <div className="h-full w-full overflow-hidden p-0 m-0 flex justify-center items-center relative flex-1">
            {MATERIALS.map((mat, idx) => {
              const isActive = activeIndex === idx;
              const offset = idx - activeIndex;
              return (
                <div
                  key={mat.id}
                  className="absolute transition-all duration-700 ease-out flex justify-center items-center max-w-lg"
                  style={{
                    opacity: isActive ? 1 : 0,
                    zIndex: isActive ? 10 : 0,
                    transform: `translateY(${offset * 80}px) scale(${isActive ? 1 : 0.85})`,
                    pointerEvents: isActive ? 'auto' : 'none'
                  }}
                >
                  <img
                    src={mat.imgUrl}
                    alt={mat.nameEn}
                    className="max-h-[65vh] w-auto object-contain drop-shadow-2xl"
                  />
                </div>
              );
            })}
          </div>
        </div>


        {/* =========================================================
            MOBILE VIEW (lg:hidden)
           ========================================================= */}
        <div
          className="w-full h-full relative flex flex-col justify-between items-center pt-6 pb-12 px-6 lg:hidden transition-colors duration-500 select-none text-slate-900 overflow-y-auto"
          style={{ backgroundColor: current.color }}
        >
          {/* Top Tabs Row */}
          <div className="w-full flex justify-between items-center z-10 px-2 gap-1 overflow-x-auto pb-2">
            {MATERIALS.map((mat, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={mat.id}
                  onClick={() => handleTabClick(idx)}
                  className={`truncate transition-all duration-300 flex-1 text-sm font-bold py-2 px-3 rounded-full cursor-pointer text-center ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-lg'
                      : 'bg-black/10 text-slate-900 hover:bg-black/20'
                  }`}
                  type="button"
                >
                  {isFa ? mat.nameFa : mat.nameEn}
                </button>
              );
            })}
          </div>

          {/* Image Box */}
          <div className="w-full flex justify-center items-center my-4 h-[35vh] relative">
            <img
              src={current.imgUrl}
              alt={current.nameEn}
              className="max-h-full max-w-full object-contain transition-all duration-500 drop-shadow-xl"
            />
          </div>

          {/* Text & Button */}
          <div className="w-full text-center space-y-4 max-w-md mx-auto">
            <h3 className="text-2xl font-extrabold text-slate-900">
              {isFa ? current.nameFa : current.nameEn}
            </h3>

            <p className="text-sm font-normal text-slate-800 leading-relaxed px-2">
              {isFa ? current.descFa : current.descEn}
            </p>

            <div className="pt-2">
              <a href="#contact">
                <button
                  className="rounded-xl transition-all duration-300 w-full bg-slate-900 text-white py-3.5 px-6 font-bold text-sm shadow-xl active:scale-95 flex items-center justify-center gap-2"
                  type="button"
                >
                  <span>{isFa ? current.btnFa : current.btnEn}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

