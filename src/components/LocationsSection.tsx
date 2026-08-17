import React, { useState } from 'react';
import { Language } from '../types';
import { MapPin, Building2, Globe2, ArrowRight, ArrowLeft } from 'lucide-react';

interface LocationsSectionProps {
  lang: Language;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({ lang }) => {
  const isFa = lang === 'fa';
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;
  const [activeRegion, setActiveRegion] = useState<'EMEA' | 'AMER' | 'APAC'>('EMEA');

  const branches = {
    EMEA: [
      { name: 'Fidar Bondar Headquarters', city: 'Pesaro, Italy' },
      { name: 'HSD Spindle Technology', city: 'Gradara, Italy' },
      { name: 'Fidar Bondar in France', city: 'Lyon, France' },
      { name: 'Fidar Bondar in Germany', city: 'Nersingen, Germany' },
      { name: 'Fidar Bondar in Middle East', city: 'Dubai, United Arab Emirates' },
      { name: 'Fidar Bondar in Spain', city: 'Barcelona, Spain' },
      { name: 'Fidar Bondar in United Kingdom', city: 'Daventry, United Kingdom' },
      { name: 'Fidar Bondar in Turkey', city: 'Istanbul, Turkey' },
    ],
    AMER: [
      { name: 'Fidar Bondar America Headquarters', city: 'Charlotte, NC, USA' },
      { name: 'Fidar Bondar Canada', city: 'Montreal, Canada' },
      { name: 'Fidar Bondar Brasil', city: 'Curitiba, Brazil' },
      { name: 'Fidar Bondar Mexico', city: 'Mexico City, Mexico' },
    ],
    APAC: [
      { name: 'Fidar Bondar Asia Pacific', city: 'Singapore' },
      { name: 'Fidar Bondar China', city: 'Shanghai, China' },
      { name: 'Fidar Bondar India', city: 'Bangalore, India' },
      { name: 'Fidar Bondar Australia', city: 'Sydney, Australia' },
      { name: 'Fidar Bondar Japan', city: 'Tokyo, Japan' },
    ]
  };

  return (
    <section id="locations" className="relative w-full bg-primary py-20 sm:py-32 text-white">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 space-y-12">
        
        {/* Headlines */}
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-6xl lg:text-8xl font-light leading-tight">
            {isFa ? 'اصالت ایرانی وسعت بین‌المللی.' : 'Iranian origins, international vocation.'}
          </h2>
          <h3 className="text-2xl sm:text-4xl font-normal text-teal-100">
            {isFa ? 'دفاتر و شعب ما در سراسر جهان' : 'Our locations'}
          </h3>
        </div>

        {/* Dark Interactive Branch Card */}
        <div className="bg-black text-white rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 border border-teal-500/30 shadow-2xl">
          
          {/* Left Region Selector & List */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            
            {/* Region Tabs */}
            <div className="border-b border-gray-800 pb-4 flex gap-6 text-xl sm:text-2xl font-bold">
              {(['EMEA', 'AMER', 'APAC'] as const).map((reg) => (
                <button
                  key={reg}
                  onClick={() => setActiveRegion(reg)}
                  className={`pb-2 transition-all relative ${
                    activeRegion === reg
                      ? 'text-white border-b-2 border-primary'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>

            {/* Branch List Scrollable */}
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2 light-scrollbar">
              {branches[activeRegion].map((b, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-primary transition flex items-center justify-between group cursor-pointer"
                >
                  <div>
                    <div className="font-bold text-sm sm:text-base text-white group-hover:text-teal-300 uppercase">
                      {b.name}
                    </div>
                    <div className="text-xs text-slate-400 font-light">
                      {b.city}
                    </div>
                  </div>
                  <MapPin className="w-4 h-4 text-slate-500 group-hover:text-teal-300" />
                </div>
              ))}
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-lg border border-white hover:bg-white hover:text-black text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:rounded-[30px]"
              >
                <span>{isFa ? 'یافتن نزدیک‌ترین شعبه یا دفتر پشتیبانی' : 'Discover your nearest branch'}</span>
                <ArrowIcon className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Right Global Network Map Graphic */}
          <div className="lg:col-span-7 bg-slate-900 rounded-2xl p-6 border border-slate-800 flex flex-col justify-center items-center text-center relative overflow-hidden min-h-[300px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-transparent" />
            <Globe2 className="w-32 h-32 text-teal-400/40 mb-4 animate-pulse" />
            <span className="text-2xl font-bold text-white mb-2">
              {isFa ? 'شبکه جهانی پشتیبانی فیدار بندار' : 'Fidar Bondar Global Service Network'}
            </span>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              {isFa ? (
                'بیش از ۳۰ شعبه مستقیم و ۳۰۰ نماینده فروش و خدمات پس از فروش جهت ارائه خدمات تکنیکال به مشتریان صنایع چوب، شیشه و نرم‌افزار.'
              ) : (
                'Over 30 direct branches and 300 agents ensuring instant technical assistance and spare parts worldwide.'
              )}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
