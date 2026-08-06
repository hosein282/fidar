import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

interface HomePageProps {
  services: ServiceItem[];
  portfolio: PortfolioProject[];
  posts: BlogPost[];
  seoConfig: SEOMetaConfig;
  onOpenAdmin: () => void;
  onOpenExporter: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  services,
  portfolio,
  posts,
  seoConfig,
  onOpenAdmin,
  onOpenExporter,
}) => {
  const { lang: urlLang } = useParams<{ lang?: string }>();
  const navigate = useNavigate();

  const currentLang: Language = (urlLang === 'en' || urlLang === 'fa') ? urlLang : 'fa';
  const isFa = currentLang === 'fa';

  useEffect(() => {
    document.documentElement.setAttribute('dir', isFa ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', currentLang);
  }, [currentLang, isFa]);

  const handleLanguageSwitch = (newLang: Language) => {
    navigate(`/${newLang}`);
  };

  return (
    <div className="min-h-screen bg-[#e6e6e6] text-slate-900 font-sans selection:bg-[#006063] selection:text-white">
      
      {/* 1. Sticky Biesse Header */}
      <Header
        lang={currentLang}
        onLanguageChange={handleLanguageSwitch}
        onOpenAdmin={onOpenAdmin}
        onOpenExporter={onOpenExporter}
        seoConfig={seoConfig}
      />

      {/* Main Flow */}
      <main>
        {/* 2. Biesse Hero Banner & Video */}
        <Hero
          lang={currentLang}
          onOpenExporter={onOpenExporter}
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
          posts={posts}
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
        onOpenExporter={onOpenExporter}
        onOpenAdmin={onOpenAdmin}
      />

    </div>
  );
};
