import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ProductPage } from '@/src/components/pages/ProductPage';
import { INITIAL_SEO_META, MATERIALS_DETAILS } from '@/src/data/mockData';
import { Language } from '@/src/types';
import { buildCanonicalMetadata } from '@/src/lib/seo';

interface PageProps {
  params: Promise<{ lang: string, slug: string }>;
}

// ISR: Revalidate every 5 minutes — keeps the page fresh without hammering MySQL
export const revalidate = 300;

// Products that are not listed in generateStaticParams (future additions) will
// still be server-rendered on demand and cached afterwards (ISR behaviour).
export const dynamicParams = true;

// SSG: Pre-render every product (all slugs) for both locales at build time
export function generateStaticParams() {
  const langs = ['fa', 'en'] as const;

  return langs.flatMap((lang) =>
    MATERIALS_DETAILS.map((item) => ({
      lang,
      slug: lang === 'fa' ? item.slugFa : item.slugEn,
    }))
  );
}

// Next.js already URL-decodes dynamic params; decodeURIComponent is kept as a
// safety net for clients/servers that still deliver percent-encoded segments.
function decodeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

function findProduct(lang: string, slug: string) {
  return MATERIALS_DETAILS.find((e) =>
    lang === 'fa' ? e.slugFa === decodeSlug(slug) : e.slugEn === decodeSlug(slug)
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const isEn = lang === 'en';
  const currentLang: Language = isEn ? 'en' : 'fa';
  const path = `/${lang}/products/${slug}`;

  const product = findProduct(currentLang, slug);

  // Unknown slug → keep neutral metadata; the page itself will render 404.
  if (!product) {
    return buildCanonicalMetadata(path);
  }

  const base = buildCanonicalMetadata(path);

  return {
    ...base,
    title: `${isEn ? product.nameEn : product.nameFa} | Fidar Sazeh Bandar`,
    description: isEn ? product.descEn : product.descFa,
    alternates: {
      canonical: path,
      languages: {
        'fa-IR': `/fa/products/${product.slugFa}`,
        'en-US': `/en/products/${product.slugEn}`,
        'x-default': `/fa/products/${product.slugFa}`,
      },
    },
  };
}

export default async function ProductIdPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const currentLang: Language = lang === 'en' ? 'en' : 'fa';

  // Reject any other locale → 404
  if (lang !== 'fa' && lang !== 'en') {
    notFound();
  }

  const product = findProduct(currentLang, slug);

  // Unknown slug → real 404 instead of silently showing the first product
  if (!product) {
    notFound();
  }

  return (
    <ProductPage
      seoConfig={INITIAL_SEO_META}
      item={product}
      lang={currentLang}
    />
  );
}