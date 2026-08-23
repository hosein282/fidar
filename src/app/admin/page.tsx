'use client';

import { useState, useEffect } from 'react';
import { AdminPanel } from '@/src/components/AdminPanel';
import { INITIAL_SEO_META } from '@/src/data/mockData';
import { BlogPost } from '@/src/types';

export default function AdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/blog');
        const data = await res.json();
        if (Array.isArray(data)) {
          setPosts(data);
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-slate-500 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <AdminPanel
      lang="fa"
      onClose={() => {}}
      seoConfig={INITIAL_SEO_META}
      onUpdateSeo={() => {}}
      posts={posts}
      onUpdatePosts={setPosts}
      isStandalone
    />
  );
}