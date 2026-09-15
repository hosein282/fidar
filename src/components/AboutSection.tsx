import React from 'react';
import { Language } from '../types';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const isFa = lang === 'fa';
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  return (
    <section id="about" className="relative w-full h-max">
      {/* Parallax Fixed Background Wrapper */}
      <div
        className="relative bg-cover bg-no-repeat bg-fixed bg-center"
        style={{
          backgroundImage:
            'url("/assets/images/scroll-bg.webp")',
          backgroundAttachment: 'fixed',
          backgroundSize : '120% 100%',
          backgroundPositionX: '0'
        }}
      >
        {/* Top Sticky Teal Gradient Overlay */}
        <div className="absolute h-full w-full pointer-events-none z-40">
          <div className="sticky top-0 mt-[-1px] z-20 overflow-hidden h-[10vh] lg:h-[22vh] bg-gradient-to-b from-primary-dark via-primary-dark via-[40%] lg:via-[25%] to-transparent" />
        </div>

        <div className="flex flex-col overflow-hidden  relative z-20">

          {/* =========================================================
              1. Statement Block with Custom Teal SVG Backdrop
             ========================================================= */}
          <div
            className={`relative w-[92%] mb-40 sm:w-[90%] 3xl:w-[80%] ${isFa ? 'mr-0 ml-auto' : 'ml-0 mr-auto'
              }`}
          >
            {/* Desktop SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 1185 561"
              className={`hidden md:block w-full h-auto text-primary-dark transition-transform duration-300 ${isFa ? 'scale-x-[-1]' : ''
                }`}
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M512.172-187H-32c-27.614 0-50 22.386-50 50v648c0 27.614 22.386 50 50 50h797.104c27.614 0 50-22.386 50-50V410.724c0-27.614 22.386-50 50-50H1135c27.61 0 50-22.386 50-50V-137c0-27.614-22.39-50-50-50H512.172Z"
                clipRule="evenodd"
              />
            </svg>

            {/* Mobile SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 390 353"
              className={`md:hidden w-full h-auto -mt-4 text-primary-dark transition-transform duration-300 ${isFa ? 'scale-x-[-1]' : ''
                }`}
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M390 18.341C390 8.211 381.788 0 371.659 0H-56.659C-66.789 0-75 8.212-75 18.34V333.94c0 10.129 8.212 18.34 18.341 18.34h292.393c10.13 0 18.341-8.211 18.341-18.34v-36.359c0-10.13 8.212-18.341 18.341-18.341h99.243c10.129 0 18.341-8.212 18.341-18.341V18.341Z"
                clipRule="evenodd"
              />
            </svg>

            {/* Statement Text overlay */}
            <div
              className={`absolute top-0 left-0 z-10 flex h-full  sm:p-10 lg:p-12 3xl:pl-24 w-full items-center ${isFa ? 'text-right' : 'text-left'
                }`}
            >
              <h3 className="text-xl sm:text-lg md:text-3xl lg:text-xl xl:text-5xl 2xl:text-4xl  lg:leading-18 font-light max-w-[90%] px-6 lg:w-[85%]  text-surface">
                {isFa
                  ?
                  "ما عملیات ترمینال های بندری را با استفاده از تکنولوژی پیشرفته و طراحی نسل جدید تجهیزات انتقال مواد بندگارهی بهینه می کنیم"
                  
                  : 'We optimize port terminal operations using advanced technology and next-generation design of port material handling equipment.'}
              </h3>
            </div>
          </div>

          {/* =========================================================
              2. About Biesse Card Block with Neutral SVG Backdrop
             ========================================================= */}
          <div className="relative w-full mt-16 lg:mt-36 lg:w-[100%] md:mx-auto">
            {/* Desktop Backdrop SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 1142 557"
              className={`hidden md:block absolute top-0 ${isFa ? 'left-0' : '-right-8'} w-dvw h- text-surface transition-transform duration-300 ${isFa ? 'scale-x-[-1]' : ''
                }`}
            >
              <path
                fill="currentColor"
                d="M489.362 7.83A40.002 40.002 0 0 1 513.133 0H1102c22.09 0 40 17.909 40 40v612H0V419.87a99.999 99.999 0 0 1 40.573-80.426L489.362 7.83Z"
              />
            </svg>

            {/* Mobile Backdrop SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 390 493"
              className={`md:hidden absolute top-0  w-full   text-surface transition-transform duration-300 ${isFa ? 'scale-x-[-1]' : ''
                }`}
            >
              <path
                fill="currentColor"
                d="M153.231 3.596A18.339 18.339 0 0 1 164.138 0H371.66C381.789 0 390 8.211 390 18.34v548.32c0 10.129-8.211 18.34-18.34 18.34H18.34C8.211 585 0 576.789 0 566.66V126.201a18.34 18.34 0 0 1 7.433-14.744L153.23 3.597Z"
              />
            </svg>

            <div className={`flex h-fit relative text-slate-900 ${isFa ? 'flex-row dir-rtl' : 'flex-row dir-ltr'}`}>
              <div className="hidden md:flex flex-col w-[40%] ">
                <div className="mt-[100%]" />
                <div className={`flex-[1_0_auto]  ${isFa ? '-ml-px' : '-mr-px'}`} />
              </div>

              <div className={`${isFa ? 'xl:ml-[8%] md:mr-8' : 'ml-[20%]'} lg:w-8/10 w-full md:w-[55%] xl:w-[60%] mr-24 mt-[15%] sm:mt-[15%] md:mt-[1%] xl:mt-16 p-6 sm:p-10 lg:p-14 pt-0 md:pt-8  rounded-b-2xl md:rounded-none`}>
                <h3 className="shrink-0 text-2xl sm:text-3xl xl:text-5xl font-extrabold text-primary-dark">
                  {isFa ? 'درباره فیدار سازه بندار' : 'About Fidar Bondar'}
                </h3>

                <div className="mt-4 xl:mt-8  text-base sm:text-sm lg:text-xl  font-light text-slate-800 leading-relaxed  ">
                  {isFa
                    ? 
                    'فیدارسازه بندار یک مجموعه دانش بنیان مهندسی و ساخت تخصصی در حوزه تجهیزات انتقال مواد و ماشین آلات سنگین بندرگاهی است که با تکیه بر دانش مهندسی، تجربه اجرایی و رویکردی مبتنی بر دقت، کیفیت و نوآوری فعالیت میکند.'
                    
                    : 'Fidar Sazeh Bandar is a knowledge-based engineering and manufacturing group specializing in material handling equipment and heavy port machinery, operating with a foundation of engineering expertise, executive experience, and an approach centered on precision, quality, and innovation.'}
                </div>

                <div className="shrink-0 mt-8 xl:mt-12">
                  <a href={`/${lang}/about`}>
                    <button
                      className="inline-flex items-center gap-3 rounded-lg transition-all whitespace-nowrap bg-primary-dark text-white hover:bg-black px-8 py-3.5 sm:px-10 sm:h-14 sm:text-lg font-medium hover:rounded-[30px] shadow-lg cursor-pointer"
                      type="button"
                    >
                      <span>{isFa ? 'درباره فیدار سازه بندار' : 'Discover Fidar Bondar'}</span>
                      <ArrowIcon className="w-5 h-5" />
                    </button>
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};


