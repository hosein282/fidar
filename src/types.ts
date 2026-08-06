export type Language = 'fa' | 'en';

export interface BilingualText {
  fa: string;
  en: string;
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: BilingualText;
  shortDesc: BilingualText;
  fullDesc: BilingualText;
  features: { fa: string[]; en: string[] };
  technologies: string[];
  category: string;
}

export interface PortfolioProject {
  id: string;
  title: BilingualText;
  client: BilingualText;
  category: 'web' | 'portal' | 'seo' | 'ecommerce' | 'custom';
  image: string;
  summary: BilingualText;
  challenge: BilingualText;
  solution: BilingualText;
  metrics: {
    label: BilingualText;
    value: string;
  }[];
  techStack: string[];
  url?: string;
}

export type PostType = 'article' | 'news';

export interface BlogPost {
  id: string;
  postType?: PostType;
  slug: BilingualText;
  title: BilingualText;
  excerpt: BilingualText;
  content: BilingualText;
  author: BilingualText;
  date: string;
  readTime: string;
  category: BilingualText;
  coverImage: string;
  seoTitle: BilingualText;
  seoDescription: BilingualText;
  seoKeywords: { fa: string[]; en: string[] };
  views: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  budget: string;
  message: string;
  lang: Language;
  createdAt: string;
  status: 'new' | 'contacted' | 'resolved';
}

export interface SEOMetaConfig {
  siteTitle: BilingualText;
  metaDescription: BilingualText;
  keywords: { fa: string[]; en: string[] };
  ogImage: string;
  canonicalUrl: string;
  twitterHandle: string;
  indexingEnabled: boolean;
  structuredDataSchema: Record<string, any>;
}

export interface EstimatorFeature {
  id: string;
  name: BilingualText;
  priceUSD: number;
  category: 'core' | 'seo' | 'backend' | 'design' | 'security';
  recommended?: boolean;
}

export interface GeneratedPHPFile {
  filename: string;
  language: 'php' | 'sql' | 'htaccess' | 'json';
  code: string;
  description: BilingualText;
}
