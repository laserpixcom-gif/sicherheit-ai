import { MetadataRoute } from 'next';
import { STATIC_POSTS } from '@/lib/posts';
import { GLOSSARY_TERMS } from '@/lib/glossary';

const BASE_URL = 'https://sicherheit.ai';
const LOCALES = ['de', 'en'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticSlugs = ['', '/blog', '/glossar', '/tools', '/ai-act', '/ki-sicherheitscheck', '/ueber-uns', '/kontakt'];
  const staticPriorities: Record<string, number> = {
    '': 1.0, '/blog': 0.9, '/ai-act': 0.85, '/glossar': 0.8,
    '/tools': 0.7, '/ki-sicherheitscheck': 0.92, '/ueber-uns': 0.6, '/kontakt': 0.55,
  };
  const staticFreq: Record<string, 'daily' | 'weekly' | 'monthly'> = {
    '': 'daily', '/blog': 'daily', '/ai-act': 'weekly', '/glossar': 'weekly',
    '/tools': 'monthly', '/ki-sicherheitscheck': 'monthly', '/ueber-uns': 'monthly', '/kontakt': 'monthly',
  };

  const staticPages = staticSlugs.flatMap(slug =>
    LOCALES.map(locale => ({
      url: `${BASE_URL}/${locale}${slug}`,
      lastModified: now,
      changeFrequency: staticFreq[slug],
      priority: staticPriorities[slug],
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map(l => [l, `${BASE_URL}/${l}${slug}`])
        ),
      },
    }))
  );

  const blogPages = STATIC_POSTS.flatMap(post =>
    LOCALES.map(locale => ({
      url: `${BASE_URL}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.82,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map(l => [l, `${BASE_URL}/${l}/blog/${post.slug}`])
        ),
      },
    }))
  );

  // One page per glossary term — individual URLs for SEO
  const glossarPages = GLOSSARY_TERMS.flatMap(term =>
    LOCALES.map(locale => ({
      url: `${BASE_URL}/${locale}/glossar/${term.id}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map(l => [l, `${BASE_URL}/${l}/glossar/${term.id}`])
        ),
      },
    }))
  );

  return [...staticPages, ...blogPages, ...glossarPages];
}
