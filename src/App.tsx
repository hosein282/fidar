import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Language, ServiceItem, PortfolioProject, BlogPost, SEOMetaConfig } from './types';
import { INITIAL_SERVICES, INITIAL_PORTFOLIO, INITIAL_BLOG_POSTS, INITIAL_SEO_META } from './data/mockData';
import { HomePage } from './pages/HomePage';
import { BlogPage } from './pages/BlogPage';
import { PhpExporter } from './components/PhpExporter';
import { AdminPanel } from './components/AdminPanel';
import { ErrorBoundary } from './components/ErrorBoundary';
import { sanitizePosts } from './utils/sanitize';

export default function App() {
  const [showExporterModal, setShowExporterModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);

  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [portfolio, setPortfolio] = useState<PortfolioProject[]>(INITIAL_PORTFOLIO);
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS.map(sanitizePosts)[0] ? INITIAL_BLOG_POSTS : INITIAL_BLOG_POSTS);
  const [seoConfig, setSeoConfig] = useState<SEOMetaConfig>(INITIAL_SEO_META);

  // Fetch initial data safely from API
  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setServices(data); })
      .catch(() => {});

    fetch('/api/portfolio')
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setPortfolio(data); })
      .catch(() => {});

    fetch('/api/blog')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const safeData = sanitizePosts(data);
          if (safeData.length > 0) setPosts(safeData);
        }
      })
      .catch(() => {});

    fetch('/api/seo')
      .then((res) => res.json())
      .then((data) => { if (data && data.siteTitle) setSeoConfig(data); })
      .catch(() => {});
  }, []);

  return (
    <ErrorBoundary fallbackTitle="خطا در اجرای برنامه">
      <div>
        <Routes>
          {/* Root redirect to Persian default */}
          <Route path="/" element={<Navigate to="/fa" replace />} />
          
          {/* Language Landing Page */}
          <Route 
            path="/:lang" 
            element={
              <HomePage
                services={services}
                portfolio={portfolio}
                posts={posts}
                seoConfig={seoConfig}
                onOpenAdmin={() => setShowAdminModal(true)}
                onOpenExporter={() => setShowExporterModal(true)}
              />
            } 
          />

          {/* Dedicated Blog & News Directory */}
          <Route 
            path="/:lang/blog" 
            element={
              <BlogPage
                posts={posts}
                seoConfig={seoConfig}
                onOpenAdmin={() => setShowAdminModal(true)}
                onOpenExporter={() => setShowExporterModal(true)}
              />
            } 
          />

          {/* Dedicated Blog & News Article Reader Detail Page */}
          <Route 
            path="/:lang/blog/:id" 
            element={
              <BlogPage
                posts={posts}
                seoConfig={seoConfig}
                onOpenAdmin={() => setShowAdminModal(true)}
                onOpenExporter={() => setShowExporterModal(true)}
              />
            } 
          />

          {/* Fallback routes without language prefix */}
          <Route path="/blog" element={<Navigate to="/fa/blog" replace />} />
          <Route path="/blog/:id" element={<Navigate to="/fa/blog/:id" replace />} />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/fa" replace />} />
        </Routes>

        {/* Global PHP & MySQL Source Code Exporter Modal */}
        {showExporterModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            <div className="max-w-5xl w-full max-h-[90vh] overflow-y-auto">
              <PhpExporter
                lang="fa"
                onClose={() => setShowExporterModal(false)}
              />
            </div>
          </div>
        )}

        {/* Global Admin CMS Modal */}
        {showAdminModal && (
          <ErrorBoundary fallbackTitle="خطا در پنل مدیریت">
            <AdminPanel
              lang="fa"
              onClose={() => setShowAdminModal(false)}
              seoConfig={seoConfig}
              onUpdateSeo={(updated) => setSeoConfig(updated)}
              posts={posts}
              onUpdatePosts={(updatedPosts) => setPosts(sanitizePosts(updatedPosts))}
            />
          </ErrorBoundary>
        )}
      </div>
    </ErrorBoundary>
  );
}


