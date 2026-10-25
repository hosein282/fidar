import { PageLoadingOverlay } from '@/src/components/NavigationLoader';

// Covers navigations started programmatically with router.push as well.
export default function Loading() {
  return <PageLoadingOverlay />;
}
