import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ProductPage } from '@/src/pages/ProductPage';
import { INITIAL_SEO_META, MATERIALS } from '@/src/data/mockData';
import { Language } from '@/src/types';
import { buildCanonicalMetadata } from '@/src/lib/seo';

interface PageProps {
  params: Promise<{ lang: string ,slug : string}>;
}

// ISR: Revalidate every 5 minutes — keeps the page fresh without hammering MySQL
export const revalidate = 300;

// SSG: Pre-render the About Us page for both locales at build time
export function generateStaticParams() {
  return [{ lang: 'fa' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang , slug } = await params;
  const isEn = lang === 'en';
  const path = isEn ? '/en/products' : '/fa/products/${id}';

  const base = buildCanonicalMetadata(path);

  console.log("item : "  , decodeURIComponent(slug));

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
        'fa-IR': '/fa/products/${}id',
        'en-US': '/en/products/${id}',
        'x-default': '/fa/products/${id}',
      },
    },
  };
}

export default async function ProductIdPage({ params }: PageProps) {
  const { lang ,slug } = await params;
  const currentLang = lang === 'en' ? 'en' : 'fa';

  if (currentLang !== 'fa' && currentLang !== 'en') {
    notFound();
  }
  const product =  MATERIALS.find((e)=> lang === "fa" ? e.slugFa === decodeURIComponent(slug) : e.slugEn === slug) ?? MATERIALS[0];

  return (
    <ProductPage
    seoConfig={INITIAL_SEO_META}
    item = {product}
    lang={currentLang as Language}
    />
  );
}