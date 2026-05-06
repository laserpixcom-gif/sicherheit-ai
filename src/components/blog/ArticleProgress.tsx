'use client';

import { useEffect } from 'react';

export default function ArticleProgress() {
  useEffect(() => {
    const bar = document.getElementById('article-progress');
    if (!bar) return;

    const onScroll = () => {
      const article = document.getElementById('article-body');
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const total = article.offsetHeight;
      const scrolled = -rect.top + window.innerHeight * 0.2;
      const pct = Math.min(100, Math.max(0, (scrolled / total) * 100));
      bar.style.width = pct + '%';
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      id="article-progress"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '2px',
        width: '0%',
        background: 'linear-gradient(90deg, var(--cyan), var(--magenta))',
        zIndex: 9998,
        transition: 'width 0.1s linear',
        transformOrigin: 'left',
      }}
    />
  );
}
