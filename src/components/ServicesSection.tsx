import React, { useState } from 'react';
import { Language, ServiceItem } from '../types';
import { Code2, TrendingUp, Palette, Globe, CheckCircle2, ChevronRight, X, Cpu, Database, ArrowLeft, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  lang: Language;
  services: ServiceItem[];
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ lang, services }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const isFa = lang === 'fa';
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-6 h-6 text-blue-600" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-blue-600" />;
      case 'Palette': return <Palette className="w-6 h-6 text-blue-600" />;
      case 'Globe': return <Globe className="w-6 h-6 text-blue-600" />;
      default: return <Cpu className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-slate-50/50 text-slate-900 border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-3 block">
            {isFa ? 'خدمات کلیدی بیس دیجیتال' : 'Biesss Core Capabilities'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            {isFa ? 'خدمات توسعه وب PHP، دیتابیس MySQL و سئو' : 'Bilingual PHP, MySQL & SEO Engineering'}
          </h2>
          <p className="text-slate-500 text-base sm:text-lg">
            {isFa 
              ? 'معماری مدرن، سرعت خیره‌کننده، سئوی استاندارد گوگل و دیتابیس‌های بهینه‌شده جهت رشد کسب‌وکار آنلاین.'
              : 'End-to-end bespoke digital agency services tailored for global scalability and search engine dominance.'}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-8 rounded-xl bg-white border border-slate-200 hover:border-blue-600/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                {/* Header Info */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center transition">
                    {getIcon(service.icon)}
                  </div>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                    {service.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-800 transition">
                  {isFa ? service.title.fa : service.title.en}
                </h3>

                {/* Description */}
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {isFa ? service.shortDesc.fa : service.shortDesc.en}
                </p>

                {/* Features Checklist */}
                <ul className="space-y-2.5 mb-8">
                  {(isFa ? service.features.fa : service.features.en).slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Tech & CTA */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {service.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[11px] font-mono border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-bold text-blue-900 hover:text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  <span>{isFa ? 'جزئیات تکمیلی' : 'Learn More'}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 left-4 p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                {getIcon(selectedService.icon)}
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                {isFa ? selectedService.title.fa : selectedService.title.en}
              </h3>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {isFa ? selectedService.fullDesc.fa : selectedService.fullDesc.en}
            </p>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                {isFa ? 'ویژگی‌های کلیدی پروژه:' : 'Key Capabilities & Standards:'}
              </h4>
              <ul className="space-y-2">
                {(isFa ? selectedService.features.fa : selectedService.features.en).map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <a
                href="#estimator"
                onClick={() => setSelectedService(null)}
                className="px-6 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm shadow-sm"
              >
                {isFa ? 'استعلام قیمت این خدمت' : 'Estimate Cost for This Service'}
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
