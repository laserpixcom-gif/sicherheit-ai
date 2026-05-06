'use client';

import { useEffect } from 'react';

export default function ScrollAnimator() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const els = document.querySelectorAll('.animate-in');
    els.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
