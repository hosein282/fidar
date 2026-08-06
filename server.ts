import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { INITIAL_SERVICES, INITIAL_PORTFOLIO, INITIAL_BLOG_POSTS, INITIAL_SEO_META } from './src/data/mockData';
import { generatePHPProjectFiles } from './src/lib/phpCodeTemplates';
import { ContactMessage, SEOMetaConfig, BlogPost, ServiceItem, PortfolioProject } from './src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

// Dynamic In-Memory Data Stores (Acts as MySQL simulator for the live demo preview)
let servicesStore: ServiceItem[] = [...INITIAL_SERVICES];
let portfolioStore: PortfolioProject[] = [...INITIAL_PORTFOLIO];
let blogStore: BlogPost[] = [...INITIAL_BLOG_POSTS];
let seoStore: SEOMetaConfig = { ...INITIAL_SEO_META };
let contactMessagesStore: ContactMessage[] = [
  {
    id: 'msg-101',
    name: 'رضا علوی',
    email: 'reza@example.com',
    phone: '09123456789',
    company: 'پارسیان تک',
    service: 'tous-web-php',
    budget: '$1,000 - $3,000',
    message: 'درخواست مشاوره برای ساخت وب‌سایت دوزبانه با PHP و دیتابیس MySQL برای شرکت صادراتی.',
    lang: 'fa',
    createdAt: new Date().toISOString(),
    status: 'new'
  }
];

// Lazy Initialize Gemini SDK Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });
    }
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // ----------------------------------------------------
  // API ROUTES (Must come before Vite middleware)
  // ----------------------------------------------------

  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', engine: 'PHP-MySQL-Bilingual-Engine-V1' });
  });

  // Services API
  app.get('/api/services', (req: Request, res: Response) => {
    res.json(servicesStore);
  });

  // Portfolio API
  app.get('/api/portfolio', (req: Request, res: Response) => {
    res.json(portfolioStore);
  });

  // Blog API
  app.get('/api/blog', (req: Request, res: Response) => {
    res.json(blogStore);
  });

  app.get('/api/blog/:slug', (req: Request, res: Response) => {
    const { slug } = req.params;
    const post = blogStore.find(p => p.slug.fa === slug || p.slug.en === slug || p.id === slug);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    // Increment view count
    post.views += 1;
    res.json(post);
  });

  // Save (Create or Update) Blog/News Post to Database
  app.post('/api/blog', (req: Request, res: Response) => {
    const postData: BlogPost = req.body;
    if (!postData || !postData.title?.fa) {
      return res.status(400).json({ success: false, error: 'Article title (Persian) is required.' });
    }

    const existingIndex = blogStore.findIndex(p => p.id === postData.id);
    if (existingIndex >= 0) {
      blogStore[existingIndex] = { ...blogStore[existingIndex], ...postData };
    } else {
      const newPost: BlogPost = {
        ...postData,
        id: postData.id || `post-${Date.now()}`,
        views: postData.views || 0,
        date: postData.date || new Date().toISOString().split('T')[0]
      };
      blogStore.unshift(newPost);
    }

    res.json({
      success: true,
      message: 'Article saved to MySQL database successfully.',
      posts: blogStore
    });
  });

  // Delete Blog/News Post from Database
  app.delete('/api/blog/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    blogStore = blogStore.filter(p => p.id !== id);
    res.json({
      success: true,
      message: 'Article deleted from database.',
      posts: blogStore
    });
  });

  // SEO Settings API
  app.get('/api/seo', (req: Request, res: Response) => {
    res.json(seoStore);
  });

  app.post('/api/seo', (req: Request, res: Response) => {
    const updated = req.body;
    if (updated) {
      seoStore = { ...seoStore, ...updated };
    }
    res.json({ success: true, seo: seoStore });
  });

  // Contact Messages API
  app.get('/api/messages', (req: Request, res: Response) => {
    res.json(contactMessagesStore);
  });

  app.post('/api/contact', (req: Request, res: Response) => {
    const { name, email, phone, company, service, budget, message, lang } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Name, email and message are required.' });
    }

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(phone || '').trim(),
      company: String(company || '').trim(),
      service: String(service || 'general'),
      budget: String(budget || 'unspecified'),
      message: String(message).trim(),
      lang: (lang === 'en' ? 'en' : 'fa'),
      createdAt: new Date().toISOString(),
      status: 'new'
    };

    contactMessagesStore.unshift(newMessage);
    res.json({
      success: true,
      message: lang === 'en' ? 'Thank you! Your inquiry has been received.' : 'پیام شما با موفقیت ثبت شد. به‌زودی با شما تماس می‌گیریم.',
      data: newMessage
    });
  });

  // Export PHP & MySQL Codebase API
  app.get('/api/export-php', (req: Request, res: Response) => {
    const files = generatePHPProjectFiles();
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      filesCount: files.length,
      files
    });
  });

  // AI Content Translator (Persian <-> English)
  app.post('/api/ai/translate', async (req: Request, res: Response) => {
    try {
      const { text, targetLang } = req.body;
      if (!text) {
        return res.status(400).json({ error: 'Text is required for translation.' });
      }

      const ai = getGeminiClient();
      if (!ai) {
        return res.status(503).json({
          error: 'GEMINI_API_KEY environment variable is not configured.',
          fallback: text
        });
      }

      const prompt = targetLang === 'en'
        ? `Translate the following Persian web content into natural, professional English suitable for a digital agency website:\n\n"${text}"`
        : `Translate the following English web content into fluent, natural Persian (فارسی روان و تخصصی حوزه وب و سئو):\n\n"${text}"`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt
      });

      res.json({
        success: true,
        translatedText: response.text?.trim() || text
      });
    } catch (error: any) {
      console.error('AI Translate error:', error);
      res.status(500).json({ error: error.message || 'Translation failed.' });
    }
  });

  // AI SEO Generator (Generates Keywords, Meta Title & Meta Description)
  app.post('/api/ai/seo-generate', async (req: Request, res: Response) => {
    try {
      const { topic, lang } = req.body;
      if (!topic) {
        return res.status(400).json({ error: 'Topic is required.' });
      }

      const ai = getGeminiClient();
      if (!ai) {
        return res.status(503).json({
          error: 'GEMINI_API_KEY is not configured.',
          seoTitle: `${topic} | Biesss Digital`,
          seoDesc: `Comprehensive guide and services for ${topic}.`
        });
      }

      const isFa = lang === 'fa';
      const prompt = isFa
        ? `برای موضوع زیر یک عنوان سئو (SEO Title زیر ۶۰ کاراکتر)، توضیحات متای سئو (SEO Description زیر ۱۶۰ کاراکتر) و ۵ کلمه کلیدی سئویی جهت رتبه‌گیری در گوگل تولید کن. پاسخ را دقیقا به صورت یک JSON معتبر شامل کلیدهای "title", "description", "keywords" (آرایه رشته) خروجی بده:\nموضوع: ${topic}`
        : `For the following topic, create an optimized SEO Title (<60 chars), SEO Description (<160 chars), and 5 targeted search keywords for Google ranking. Return valid JSON only with keys "title", "description", "keywords" (array of strings):\nTopic: ${topic}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json({
        success: true,
        seoTitle: parsed.title || topic,
        seoDesc: parsed.description || '',
        keywords: parsed.keywords || []
      });
    } catch (error: any) {
      console.error('AI SEO error:', error);
      res.status(500).json({ error: error.message || 'SEO generation failed.' });
    }
  });

  // Dynamic Dynamic XML Sitemap Endpoint
  app.get('/sitemap.xml', (req: Request, res: Response) => {
    const baseUrl = seoStore.canonicalUrl || 'https://biesss.example.com';
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

    // Static pages
    const pages = ['', 'services', 'portfolio', 'blog', 'contact', 'estimator'];
    pages.forEach(p => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/${p}</loc>\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="fa" href="${baseUrl}/fa/${p}" />\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/${p}" />\n`;
      xml += `    <changefreq>daily</changefreq>\n`;
      xml += `    <priority>${p === '' ? '1.0' : '0.8'}</priority>\n`;
      xml += `  </url>\n`;
    });

    // Blog posts dynamic sitemap URLs
    blogStore.forEach(post => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/blog/${post.slug.en}</loc>\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="fa" href="${baseUrl}/fa/blog/${post.slug.fa}" />\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/blog/${post.slug.en}" />\n`;
      xml += `    <lastmod>${post.date}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  });

  // Dynamic Robots.txt Endpoint
  app.get('/robots.txt', (req: Request, res: Response) => {
    const baseUrl = seoStore.canonicalUrl || 'https://biesss.example.com';
    const content = `User-agent: *
Disallow: /admin/
Disallow: /api/
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`;
    res.header('Content-Type', 'text/plain');
    res.send(content);
  });

  // ----------------------------------------------------
  // VITE MIDDLEWARE / PRODUCTION STATIC SERVING
  // ----------------------------------------------------
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening at http://0.0.0.0:${PORT}`);
  });
}

startServer();
