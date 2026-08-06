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
    <section id="about" className="relative w-full">
      {/* Parallax Fixed Background Wrapper */}
      <div
        className="relative bg-cover bg-no-repeat bg-fixed bg-center"
        style={{
          backgroundImage:
            'url("https://images.ctfassets.net/bdj0rlksezwc/4Q0Jk77ESs6av66irZR7bp/f63a9ea14a8a3a1ec8691054209470fa/Rectangle_86.png")',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Top Sticky Teal Gradient Overlay */}
        <div className="absolute h-full w-full pointer-events-none z-10">
          <div className="sticky top-0 mt-[-1px] z-20 overflow-hidden h-[10vh] lg:h-[22vh] bg-gradient-to-b from-[#005254] via-[#005254] via-[40%] lg:via-[25%] to-transparent" />
        </div>

        <div className="flex flex-col overflow-hidden  relative z-20">

          {/* =========================================================
              1. Statement Block with Custom Teal SVG Backdrop
             ========================================================= */}
          <div
            className={`relative w-[92%] sm:w-[90%] 3xl:w-[80%] my-8 ${isFa ? 'mr-0 ml-auto' : 'ml-0 mr-auto'
              }`}
          >
            {/* Desktop SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 1185 561"
              className={`hidden md:block w-full h-auto text-[#005254] transition-transform duration-300 ${isFa ? 'scale-x-[-1]' : ''
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
              className={`md:hidden w-full h-auto text-[#005254] transition-transform duration-300 ${isFa ? 'scale-x-[-1]' : ''
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
              className={`absolute top-0 left-0 z-10 flex h-full p-6 sm:p-10 lg:p-16 3xl:pl-24 w-full items-center ${isFa ? 'text-right' : 'text-left'
                }`}
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-light lg:w-[75%] leading-relaxed 2xl:leading-snug text-[#e6e6e6]">
                {isFa
                  ? 'ما فرآیندهای تولید را ساده می‌کنیم تا پتانسیل هر متریال را ارتقا دهیم'
                  : 'We simplify production processes to enhance the potential of each material'}
              </h3>
            </div>
          </div>

          {/* =========================================================
              2. About Biesse Card Block with Neutral SVG Backdrop
             ========================================================= */}
          <div className="relative w-full mt-16 lg:mt-36 lg:w-[90%] md:mx-auto">
            {/* Desktop Backdrop SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 1142 557"
              className={`hidden md:block absolute top-0 ${isFa ? '-left-30' : '-left-0'} w-screen h-full text-[#e6e6e6] transition-transform duration-300 ${isFa ? 'scale-x-[-1]' : ''
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
              className={`md:hidden absolute top-0 left-0 w-full h-full text-[#e6e6e6] transition-transform duration-300 ${isFa ? 'scale-x-[-1]' : ''
                }`}
            >
              <path
                fill="currentColor"
                d="M153.231 3.596A18.339 18.339 0 0 1 164.138 0H371.66C381.789 0 390 8.211 390 18.34v548.32c0 10.129-8.211 18.34-18.34 18.34H18.34C8.211 585 0 576.789 0 566.66V126.201a18.34 18.34 0 0 1 7.433-14.744L153.23 3.597Z"
              />
            </svg>

            <div className={`flex h-fit relative text-slate-900 ${isFa ? 'flex-row dir-rtl' : 'flex-row dir-ltr'}`}>
              <div className="hidden md:flex flex-col w-[45%]">
                <div className="mt-[100%]" />
                <div className={`flex-[1_0_auto] bg-[#e6e6e6] ${isFa ? 'ml-[-1px]' : 'mr-[-1px]'}`} />
              </div>

              <div className="w-full md:w-[55%] xl:w-[60%] mt-[25%] sm:mt-[30%] md:mt-12 xl:mt-16 p-6 sm:p-10 lg:p-14 pt-0 md:pt-8  rounded-b-2xl md:rounded-none">
                <h3 className="flex-shrink-0 text-3xl sm:text-4xl xl:text-5xl font-extrabold text-[#005254]">
                  {isFa ? 'درباره بیئس' : 'About Biesse'}
                </h3>

                <div className="mt-4 xl:mt-10 text-base sm:text-lg xl:text-2xl font-light text-slate-800 leading-relaxed">
                  {isFa
                    ? 'ما یک شرکت بین‌المللی هستیم که خطوط تولید، ماشین‌آلات و قطعات را برای تبدیل مواد اولیه به محصولات نهایی تولید می‌کنیم.'
                    : 'We are an international company, manufacturing lines, machines and components for transforming materials into products'}
                </div>

                <div className="flex-shrink-0 mt-8 xl:mt-12">
                  <a href="#contact">
                    <button
                      className="inline-flex items-center gap-3 rounded-lg transition-all whitespace-nowrap bg-[#005254] text-white hover:bg-black px-8 py-3.5 sm:px-10 sm:h-14 sm:text-lg font-medium hover:rounded-[30px] shadow-lg cursor-pointer"
                      type="button"
                    >
                      <span>{isFa ? 'کشف بیئس' : 'Discover Biesse'}</span>
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


