import React, { useState, useEffect, useRef } from 'react';
import { Language, MaterialData } from '../types';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { MATERIALS } from '../data/mockData';
import { useRouter } from 'next/navigation';

interface MaterialsShowcaseProps {
  lang: Language;
}

export const MaterialsShowcase: React.FC<MaterialsShowcaseProps> = ({ lang }) => {
  const isFa = lang === 'fa';
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll listener to activate tabs based on scroll position in 500vh container
  useEffect(() => {
    const handleScroll = () => {

      if (!containerRef.current) return;


      if (window.innerWidth <= 768 && mobileRef.current !== null) {
        const mobileRect = mobileRef.current?.getBoundingClientRect();
        const totalScrollableHeightMob = mobileRect.height - window.innerHeight;

        if (totalScrollableHeightMob <= 0) {
          const header = document.getElementById('header');

          if (mobileRect.bottom < 0) {
            header!.style.opacity = '1';
            header!.style.transform = 'translateY(0)';
            header!.style.pointerEvents = 'auto';
            return;
          }
          if ((mobileRect.top < 100)) {
            header!.style.transform = 'translateY(-100%)'; // حرکت به بالا برای افکت بهتر
            header!.style.pointerEvents = 'none';
            return;
          }
        }
      }
      const rect = containerRef.current.getBoundingClientRect();

      const totalScrollableHeight = rect.height - window.innerHeight;

      const header = document.getElementById('header');

      if (rect.top <= 100) {
        header!.style.transform = 'translateY(-100%)'; // حرکت به بالا برای افکت بهتر
        header!.style.pointerEvents = 'none';
      } else {
        header!.style.opacity = '1';
        header!.style.transform = 'translateY(0)';
        header!.style.pointerEvents = 'auto';
      }
      if (rect.bottom <= 140) {
        header!.style.opacity = '1';
        header!.style.transform = 'translateY(0)';
        header!.style.pointerEvents = 'auto';
      }

      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollableHeight, 0), 0.999);
      const index = Math.floor(progress * MATERIALS.length);
      setActiveIndex(index);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile/tablet (< lg): the tabs drive which material is shown in the
  // full-screen panel directly (no scroll-detection needed).

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const totalScrollableHeight = rect.height - window.innerHeight;
    const targetScroll = sectionTop + (index / MATERIALS.length) * totalScrollableHeight + 10;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const router = useRouter();
  const handleMoreClick = (id: string) => {
    router.push((`/${lang}/products/${id}`));
  }

  const current = MATERIALS[activeIndex];
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  return (
    <div id="materials">
      {/* =========================================================
          MOBILE / TABLET VIEW — full-screen animated panel.
          Same look/animations as the original — but instead of
          scroll-jacking, the tabs switch the material directly.
         ========================================================= */}
      <div ref={mobileRef} className="lg:hidden  relative z-30 h-screen w-full">
        <div
          className="w-full h-full relative flex flex-col justify-between items-center pt-1 pb-2 px-6 select-none text-slate-900 transition-colors duration-500"
          style={{ backgroundColor: current.color }}
        >
          {/* Top Tabs Row */}
          <div className="w-screen flex flex-wrap justify-between items-center z-10 px-4 gap-1.5 overflow-x-auto pb-4 mt-2 no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {MATERIALS.map((mat, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={mat.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`shrink-0 transition-all duration-300 flex-1 text-sm font-bold py-2 px-3 rounded-full cursor-pointer text-center whitespace-nowrap ${isActive
                    ? 'bg-slate-900 text-white shadow-lg scale-105'
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
              key={`img-${current.id}`}
              src={current.imgUrl}
              alt={current.nameEn}
              width={900}
              height={1200}
              loading="eager"
              decoding="async"
              className="max-h-full max-w-full object-contain transition-all duration-500 drop-shadow-xl material-in"
            />
          </div>

          {/* Text & Button */}
          <div key={`txt-${current.id}`} className="w-full text-center space-y-4 max-w-md mx-auto material-in">
            <h3 className="text-2xl font-extrabold text-slate-900">
              {isFa ? current.nameFa : current.nameEn}
            </h3>

            <p className="text-sm font-normal text-slate-800 leading-relaxed px-2">
              {isFa ? current.descFa : current.descEn}
            </p>

            <div className="pt-2">
              <a href="#contact">
                <button
                  onClick={() => handleMoreClick(isFa ? current.slugFa : current.slugEn)}

                  className="rounded-xl transition-all duration-300 w-full bg-slate-900 text-white py-3.5 px-6 font-bold mb-2 text-sm shadow-xl active:scale-95 flex items-center justify-center gap-2"
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

      {/* =========================================================
          DESKTOP VIEW — scroll-driven / scroll-jacking (lg+)
         ========================================================= */}
      <div ref={containerRef} className="relative z-30 h-[500vh] bg-black hidden lg:block ">
        {/* Sticky Desktop View Container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">

          {/* =========================================================
            DESKTOP VIEW (lg:flex)
           ========================================================= */}
          <div
            className={`w-full h-full relative items-center hidden lg:flex  flex-row-reverse transition-colors duration-700 select-none  ${isFa ? 'pr-[10vw] pl-6  ' : 'pl-[10vw] pr-6  '
              }`}
            style={{ backgroundColor: current.color }}
          >
            {/* Vertical Sidebar Tabs (10vw) */}
            <div
              className={`absolute w-[12vw] top-0 flex  justify-between z-20 select-none flex-col  h-full  py-18 ${isFa ? 'right-4' : 'left-0'
                }`}
            >
              {MATERIALS.map((mat, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={mat.id}
                    onClick={() => handleTabClick(idx)}
                    className={` 
                      ${isActive ? "border-2 border-slate-900 pointer-events-none" : ""} ${isFa ? 'rotate-90' : 'rotate-[-90deg]'}
                       h-22 w-full p-1  flex rounded-full items-center py-0 justify-center transition-all duration-300 font-bold cursor-pointer text-slate-900 ${isActive ? 'opacity-100 font-extrabold' : 'opacity-60 hover:opacity-100'
                      }`}
                    type="button"
                  >
                    <span
                      className={`text-lg 2xl:text-base tracking-wide select-none '
                        }`}//${isFa ? 'rotate-90' : 'rotate-[-90deg]}
                    >
                      {isFa ? mat.nameFa : mat.nameEn}
                    </span>
                  </button>
                );
              })}

              {/* Selected pill border frame indicator perfectly centered on active tab */}
              {/* <div
                className=""
                style={{
                  height: '235px',
                  width: '44px',
                  top: `calc(3.5rem + (${activeIndex} + 0.5) * ((100% - 7rem) / 5))`,
                  transform: 'translate(-50%, -50%)'
                }}
              /> */}
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
                      width={900}
                      height={1200}
                      loading="lazy"
                      decoding="async"
                      className="max-h-[65vh] w-auto object-contain drop-shadow-2xl"
                    />
                  </div>
                );
              })}
            </div>


            {/* Middle Text Content & SVG Logo Column */}
            <div className={`flex flex-1 flex-col z-10 max-w-xl xl:max-w-2xl text-slate-900  ${isFa ? "mr-14" : "ml-14"}`}>
              {/* Fidar Bondar Brand SVG Header */}
              <div className="flex items-end mb-1 w-full relative">
                <img src={'assets/images/logo_type.png'} alt={isFa ? current.nameFa : current.nameEn}
                  className='w-40'
                ></img>
              </div>

              <div className="max-h-[42vh] w-full mb-8 overflow-hidden text-xl 2xl:text-2xl leading-relaxed text-slate-900 font-bold">
                <p className="transition-all duration-500">
                  {isFa ? current.nameFa : current.nameEn}
                </p>
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
                      onClick={() => handleMoreClick(isFa ? current.slugFa : current.slugEn)}
                      className="rounded-lg transition-all duration-300 whitespace-nowrap bg-black text-white hover:bg-primary-dark px-10 h-12 md:px-12 md:h-14 md:text-xl font-medium hover:rounded-[30px] shadow-2xl cursor-pointer flex items-center gap-3 active:scale-95"
                      type="button"
                    >
                      <span>{isFa ? current.btnFa : current.btnEn}</span>
                      <ArrowIcon className="w-5 h-5" />
                    </button>
                  </a>
                </div>
              </div>
            </div>


          </div>

        </div>
      </div>
    </div>
  );
};

