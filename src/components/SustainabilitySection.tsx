import React from 'react';
import { Language } from '../types';
import { ExternalLink, ArrowRight, ArrowLeft } from 'lucide-react';

interface SustainabilitySectionProps {
  lang: Language;
}

export const SustainabilitySection: React.FC<SustainabilitySectionProps> = ({ lang }) => {
  const isFa = lang === 'fa';
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  return (
    <section id="sustainability" className="relative w-full bg-[#e6e6e6] text-slate-900 py-12 sm:py-20 px-4 sm:px-8">
      
      {/* SVG ClipPath Definition for Biesse Signature Card Geometry */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="biesse-brand-card-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.04,0 L 0.88,0 L 1,0.18 L 1,0.92 Q 1,1 0.96,1 L 0.12,1 L 0,0.82 L 0,0.08 Q 0,0 0.04,0 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Main Sustainability Hero Card Container */}
      <div className="max-w-[1320px] mx-auto">
        <div 
          className="relative w-full min-h-[500px] sm:min-h-[580px] lg:min-h-[640px] flex flex-col items-center justify-center text-center p-8 sm:p-16 lg:p-24 transition-transform duration-500 hover:scale-[1.005]"
          style={{
            clipPath: 'url(#biesse-brand-card-clip)'
          }}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
            style={{
              backgroundImage: 'url("https://images.ctfassets.net/bdj0rlksezwc/7z1ounD96FpGSL6bNv3MLD/6c60ee36a4a5d60088884b6f06346c90/AdobeStock_675117344_Preview-transformed_out.jpeg?w=2000&h=1336&q=50&fm=jpg")'
            }}
          />

          {/* Dark Green Gradient Tint Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-[#00383a]/75 to-black/70 z-10" />

          {/* Card Content */}
          <div className="relative z-20 max-w-4xl mx-auto space-y-6 sm:space-y-8 text-white">
            {/* Top Eyebrow Subtitle */}
            <p className="text-base sm:text-xl lg:text-2xl font-light tracking-wide text-slate-100">
              {isFa ? 'عملکرد مسئولانه در صنعت' : 'Acting in a responsible manner'}
            </p>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.2] sm:leading-[1.15] tracking-tight text-white drop-shadow-md hover:text-teal-200 transition-colors cursor-pointer">
              <a href="#contact" className="block">
                {isFa ? (
                  'کشف نتایج به دست آمده در زمینه پایداری اقتصادی، اجتماعی و زیست‌محیطی.'
                ) : (
                  'Discover the results that have been achieved in terms of economic, social and environmental sustainability.'
                )}
              </a>
            </h2>

            {/* Bottom Arrow Indicator */}
            <div className="pt-4 flex justify-center">
              <a 
                href="#contact" 
                className="p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all duration-300 border border-white/20 hover:scale-110 group"
              >
                <ArrowIcon className="w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Services & Training Programs Section */}
      <div className="mt-16 sm:mt-24 py-16 px-6 sm:px-12 max-w-[1320px] mx-auto text-center space-y-8 border-t border-gray-300">
        <h2 className="text-3xl sm:text-5xl font-light text-[#006063]">
          {isFa ? 'خدمات اختصاصی و برنامه‌های آموزشی بیئس را کشف کنید!' : 'Discover our tailored services and training programs!'}
        </h2>

        <p className="text-slate-700 text-base sm:text-xl font-light max-w-4xl mx-auto leading-relaxed">
          {isFa ? (
            'آیا می‌خواهید عملکرد خود را بهینه کنید، مهارت‌های تیم خود را توسعه دهید یا طول عمر تجهیزات و کدهای خود را تضمین کنید؟ ما در تمام مراحل با طیف جامعی از خدمات فنی از شما پشتیبانی می‌کنیم: نصب دستگاه‌ها، آموزش‌های اختصاصی، خدمات پشتیبانی دیتابیس و نگهداری منظم.'
          ) : (
            'Do you want to optimize your performance, develop your skills, or ensure the longevity of your equipment? We support you every step of the way with a comprehensive range of technical services: machine installation, tailored training, technical assistance, spare parts, and regular maintenance.'
          )}
        </p>

        <div className="pt-2">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-lg bg-[#006063] hover:bg-black text-white font-bold text-sm sm:text-base transition-all shadow-md hover:rounded-[30px]"
          >
            <span>{isFa ? 'دسترسی به خدمات و برنامه‌های آموزشی' : 'Access our services and training programs.'}</span>
            <ArrowIcon className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* European Funds & Innovation Section */}
      <div className="bg-slate-200/80 rounded-2xl py-12 px-6 sm:px-12 mt-12 max-w-[1320px] mx-auto text-center space-y-6 border border-gray-300">
        <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest block">
          {isFa ? 'پروژه‌های تحقیق و توسعه اروپا' : 'European Research & Innovation Projects'}
        </span>

        <h3 className="text-2xl sm:text-4xl font-light text-[#006063]">
          Co.T.A.N.E.C. - {isFa ? 'پروژه فناوری‌های زیستی و مواد ترموست' : 'Operation carried out through European funds'}
        </h3>

        <p className="text-slate-600 text-xs sm:text-base font-light max-w-3xl mx-auto leading-relaxed">
          {isFa ? (
            'پروژه‌ای با همکاری شرکت‌های بزرگ صنعتی جهت توسعه مواد بیوکامپوزیت جدید ترموست و بهینه‌سازی قطعات پیشرفته خودرو و سازه‌های دریایی.'
          ) : (
            'The project, collaboration of large companies and SMEs operating in the automotive and nautical sectors, aims to develop new materials thermosetting biocomposites intended for the creation of automotive parts, as well as building blocks for boats.'
          )}
        </p>

        <div>
          <a
            href="https://assets.ctfassets.net/bdj0rlksezwc/3s8enF8NaXeKs16zk0FtNj/99b5a108d83672c49c5a17201c3cc842/biesse_poster.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-[#006063] text-white font-bold text-xs sm:text-sm transition shadow-sm"
          >
            <span>{isFa ? 'کسب اطلاعات بیشتر و پوستر رسمی' : 'Discover more'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

    </section>
  );
};

