'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Language, ServiceItem, PortfolioProject, BlogPost, SEOMetaConfig } from '../types';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { AboutSection } from '../components/AboutSection';
import { MaterialsShowcase } from '../components/MaterialsShowcase';
import { BlogSection } from '../components/BlogSection';
import { LocationsSection } from '../components/LocationsSection';
import { SustainabilitySection } from '../components/SustainabilitySection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { AdminPanel } from '../components/AdminPanel';
import { PhpExporter } from '../components/PhpExporter';

interface HomePageProps {
  services: ServiceItem[];
  portfolio: PortfolioProject[];
  posts: BlogPost[];
  seoConfig: SEOMetaConfig;
  onOpenAdmin?: () => void;
  onOpenExporter?: () => void;
  lang?: Language;
}

const HomePageComponent: React.FC<HomePageProps> = ({
  services,
  portfolio,
  posts,
  seoConfig,
  onOpenAdmin = () => {},
  onOpenExporter = () => {},
  lang = 'fa',
}) => {
  const router = useRouter();

  const currentLang: Language = (lang === 'en' || lang === 'fa') ? lang : 'fa';
  const isFa = currentLang === 'fa';
  const [activeModal, setActiveModal] = useState<'admin' | 'exporter' | null>(null);
  const [pagePosts, setPagePosts] = useState(posts);

  useEffect(() => {
    document.documentElement.setAttribute('dir', isFa ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', currentLang);
  }, [currentLang, isFa]);

  useEffect(() => {
    setPagePosts(posts);
  }, [posts]);

  const handleLanguageSwitch = (newLang: Language) => {
    router.push(`/${newLang}`);
  };

  const handleOpenAdmin = () => {
    setActiveModal('admin');
    onOpenAdmin?.();
  };

  const handleOpenExporter = () => {
    setActiveModal('exporter');
    onOpenExporter?.();
  };

  return (
    <div className="min-h-screen bg-[#e6e6e6] text-slate-900 font-sans selection:bg-[#006063] selection:text-white">
      
      {/* 1. Sticky Biesse Header */}
      <Header
        lang={currentLang}
        onLanguageChange={handleLanguageSwitch}
        onOpenAdmin={handleOpenAdmin}
        onOpenExporter={handleOpenExporter}
        seoConfig={seoConfig}
      />

      {/* Main Flow */}
      <main>
        {/* 2. Biesse Hero Banner & Video */}
        <Hero
          lang={currentLang}
          onOpenExporter={handleOpenExporter}
        />

        {/* 3. About Section */}
        <AboutSection
          lang={currentLang}
        />

        {/* 4. Materials Showcase (Wood, Glass, Stone, Materia, Metal) */}
        <MaterialsShowcase
          lang={currentLang}
        />

        {/* 5. What's Next / Biesse News Carousel */}
        <BlogSection
          lang={currentLang}
          posts={pagePosts}
        />

        {/* 6. Global Locations & Branches */}
        <LocationsSection
          lang={currentLang}
        />

        {/* 7. Sustainability & Co.T.A.N.E.C. */}
        <SustainabilitySection
          lang={currentLang}
        />

        {/* 8. Contact Section */}
        <ContactSection
          lang={currentLang}
        />
      </main>

      {/* 9. Biesse Footer */}
      <Footer
        lang={currentLang}
        onOpenExporter={handleOpenExporter}
        onOpenAdmin={handleOpenAdmin}
      />

      {activeModal && (
        <div className="fixed inset-0 z-[220] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-6xl max-h-[90vh] overflow-auto rounded-3xl bg-white p-2 sm:p-4 shadow-2xl">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute left-4 top-4 z-10 rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900"
              aria-label="Close"
            >
              ×
            </button>
            {activeModal === 'admin' ? (
              <AdminPanel
                lang={currentLang}
                onClose={() => setActiveModal(null)}
                seoConfig={seoConfig}
                onUpdateSeo={() => {}}
                posts={pagePosts}
                onUpdatePosts={setPagePosts}
              />
            ) : (
              <PhpExporter lang={currentLang} onClose={() => setActiveModal(null)} />
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default HomePageComponent;
export { HomePageComponent as HomePage };
