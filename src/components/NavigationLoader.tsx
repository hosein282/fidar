'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const NAVIGATION_START_EVENT = 'fidar:navigation-start';

export function startNavigationLoading() {
  window.dispatchEvent(new Event(NAVIGATION_START_EVENT));
}

/** Displays a blocking indicator while an internal App Router navigation is pending. */
export function NavigationLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const currentLocation = `${pathname}?${searchParams.toString()}`;
  const previousLocation = useRef(currentLocation);

  useEffect(() => {
    if (previousLocation.current !== currentLocation) {
      previousLocation.current = currentLocation;
      setIsLoading(false);
    }
  }, [currentLocation]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as Element | null;
      const link = target?.closest('a[href]') as HTMLAnchorElement | null;
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return;

      const destination = new URL(link.href, window.location.href);
      const current = new URL(window.location.href);
      const isSamePage =
        destination.pathname === current.pathname &&
        destination.search === current.search;

      if (destination.origin === current.origin && !isSamePage) {
        setIsLoading(true);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    const showLoader = () => setIsLoading(true);
    window.addEventListener(NAVIGATION_START_EVENT, showLoader);
    return () => window.removeEventListener(NAVIGATION_START_EVENT, showLoader);
  }, []);

  return isLoading ? <PageLoadingOverlay lang={pathname?.startsWith('/en') ? 'en' : 'fa'} /> : null;
}

export function PageLoadingOverlay({ lang }: { lang?: 'fa' | 'en' }) {
  const pathname = usePathname();
  const isEnglish = lang ? lang === 'en' : pathname?.startsWith('/en');

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/45 backdrop-blur-sm"
      role="status"
      aria-live="assertive"
      aria-label="در حال بارگذاری صفحه"
    >
      <div className="flex min-w-44 flex-col items-center gap-4 rounded-2xl bg-white px-7 py-6 text-center shadow-2xl">
        <svg className="h-10 w-10 animate-spin text-primary" viewBox="0 0 24 24" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="3" />
          <path className="opacity-90" fill="currentColor" d="M12 3a9 9 0 0 1 9 9h-3a6 6 0 0 0-6-6V3z" />
        </svg>
        <p className="text-sm font-bold text-slate-800">
          {isEnglish ? 'Loading page...' : 'در حال بارگذاری صفحه...'}
        </p>
      </div>
    </div>
  );
}
