import React, { useState } from 'react';
import { Language, PortfolioProject } from '../types';
import { ExternalLink, Layers, CheckCircle2, TrendingUp, Cpu, X, ArrowLeft, ArrowRight } from 'lucide-react';

interface PortfolioSectionProps {
  lang: Language;
  projects: PortfolioProject[];
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ lang, projects }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const isFa = lang === 'fa';
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const categories = [
    { id: 'all', label: isFa ? 'همه پروژه‌ها' : 'All Works' },
    { id: 'web', label: isFa ? 'وب‌سایت‌های PHP' : 'PHP Web Studio' },
    { id: 'portal', label: isFa ? 'پورتال‌های سازمانی' : 'Enterprise Portals' },
    { id: 'ecommerce', label: isFa ? 'فروشگاه‌های اختصاصی' : 'E-Commerce' },
  ];

  return (
    <section id="portfolio" className="py-20 bg-slate-50/50 text-slate-900 border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-blue-600 text-xs font-bold uppercase tracking-widest block mb-3">
            {isFa ? 'نمونه کارهای برگزیده' : 'Selected Case Studies'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            {isFa ? 'پروژه‌های اجرایی با PHP و MySQL' : 'Enterprise PHP & MySQL Implementations'}
          </h2>
          <p className="text-slate-500 text-base sm:text-lg">
            {isFa 
              ? 'نمونه‌هایی از پروژه‌های دوزبانه طراحی شده با بالاترین استانداردهای سئو، سرعت و امنیت.'
              : 'Showcasing real-world web applications built with robust database architecture & high Core Web Vitals.'}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-blue-900 text-white font-bold shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-xl bg-white border border-slate-200 hover:border-blue-600/40 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Image Showcase */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={isFa ? project.title.fa : project.title.en}
                    width={1200}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/95 text-blue-900 text-[11px] font-mono font-bold shadow-sm border border-slate-200">
                    {project.category.toUpperCase()}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="text-xs text-slate-400 font-medium">
                    {isFa ? `کارفرما: ${project.client.fa}` : `Client: ${project.client.en}`}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-800 transition">
                    {isFa ? project.title.fa : project.title.en}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-2">
                    {isFa ? project.summary.fa : project.summary.en}
                  </p>

                  {/* Metrics Badges */}
                  <div className="pt-2 flex flex-wrap gap-2">
                    {project.metrics.slice(0, 2).map((m, idx) => (
                      <div key={idx} className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                        <span className="text-slate-500 font-medium">{isFa ? m.label.fa : m.label.en}: </span>
                        <span className="font-bold text-blue-900 font-mono">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full py-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-blue-900 border border-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition"
                >
                  <span>{isFa ? 'مشاهده مطالعه موردی' : 'View Full Case Study'}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full p-6 sm:p-8 relative space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 left-4 p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-mono font-bold border border-blue-200">
                {selectedProject.category.toUpperCase()}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {isFa ? selectedProject.title.fa : selectedProject.title.en}
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm">
                {isFa ? `مشتری: ${selectedProject.client.fa}` : `Client: ${selectedProject.client.en}`}
              </p>
            </div>

            <div className="rounded-xl overflow-hidden h-56 bg-slate-100 border border-slate-200">
              <img src={selectedProject.image} alt="Project Banner" width={1200} height={800} loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {selectedProject.metrics.map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-2xl font-black text-blue-900 font-mono">{m.value}</div>
                  <div className="text-xs text-slate-500 mt-1">{isFa ? m.label.fa : m.label.en}</div>
                </div>
              ))}
            </div>

            {/* Challenge & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2">
                <h4 className="text-sm font-bold text-amber-900">
                  {isFa ? 'چالش اصلی:' : 'The Challenge:'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {isFa ? selectedProject.challenge.fa : selectedProject.challenge.en}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2">
                <h4 className="text-sm font-bold text-blue-900">
                  {isFa ? 'راهکارفیدار بنداردیجیتال (PHP/MySQL):' : 'Biesss Solution:'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {isFa ? selectedProject.solution.fa : selectedProject.solution.en}
                </p>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="pt-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">
                {isFa ? 'تکنولوژی‌های استفاده شده:' : 'Tech Stack Employed:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map(t => (
                  <span key={t} className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-mono border border-slate-200">
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
