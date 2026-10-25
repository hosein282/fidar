import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ProductsPage } from '@/src/components/pages/ProductsPage';
import { INITIAL_SEO_META } from '@/src/data/mockData';
import { Language } from '@/src/types';
import { buildCanonicalMetadata } from '@/src/lib/seo';

interface PageProps {
  params: Promise<{ lang: string }>;
}

// ISR: Revalidate every 5 minutes — keeps the page fresh without hammering MySQL
export const revalidate = 300;

// SSG: Pre-render the About Us page for both locales at build time
export function generateStaticParams() {
  return [{ lang: 'fa' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === 'en';
  const path = isEn ? '/en/about' : '/fa/products';

  const base = buildCanonicalMetadata(path);

  return {
    ...base,
    title: isEn
      ? 'products — Engineering, Manufacturing & Refurbishment | Fidar Sazeh Bandar'
      : 'محصولات — مهندسی، ساخت و بازسازی تجهیزات | فیدار سازه بندار',
    description: isEn
      ? 'Fidar Sazeh Bandar is a knowledge-based engineering group specialized in material handling systems, heavy port machinery, vessel repair and equipment retrofit — from design and manufacturing to refurbishment and upgrade.'
      : 'فیدار سازه بندار مجموعه‌ای دانش‌بنیان و تخصصی در حوزه تجهیزات انتقال مواد، ماشین‌آلات سنگین بندرگاهی، تعمیرات شناورها و بازسازی تجهیزات است؛ از طراحی و تولید تا ارتقا و به‌روزرسانی.',
    alternates: {
      canonical: path,
      languages: {
        'fa-IR': '/fa/products',
        'en-US': '/en/products',
        'x-default': '/fa/products',
      },
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { lang } = await params;
  const currentLang = lang === 'en' ? 'en' : 'fa';

  if (currentLang !== 'fa' && currentLang !== 'en') {
    notFound();
  }

  return (
    <ProductsPage
    seoConfig={INITIAL_SEO_META}
    lang={currentLang as Language}
    />
  );
}