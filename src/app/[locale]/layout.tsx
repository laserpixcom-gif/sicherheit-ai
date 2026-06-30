export function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }];
}

import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Nav from '@/components/Nav';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import PageTransition from '@/components/PageTransition';
import IntroAnimation from '@/components/IntroAnimation';
import JsonLd, { organizationSchema, websiteSchema } from '@/components/JsonLd';
import '../globals.css';

const BASE_URL = 'https://sicherheit.ai';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isDE = locale === 'de';
  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: 'sicherheit.ai — KI-Sicherheit & Cybersecurity für Deutschland',
      template: '%s | sicherheit.ai',
    },
    description: isDE
      ? 'Deutschlands führende Plattform für KI-Sicherheit und Cybersecurity. Aktuelle Threat Intelligence, Glossar und interaktive Tools.'
      : "Germany's leading platform for AI security and cybersecurity.",
    openGraph: {
      siteName: 'sicherheit.ai',
      locale: isDE ? 'de_DE' : 'en_US',
      type: 'website',
      images: [{ url: `${BASE_URL}/api/og?title=sicherheit.ai`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@sicherheitai',
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
    },
    // DACH-Fokus: nur DE wird indexiert. EN bleibt erreichbar (follow),
    // aber noindex, um das knappe Crawl-Budget der jungen Domain auf DE zu bündeln.
    robots: {
      index: isDE,
      follow: true,
      googleBot: { index: isDE, follow: true, 'max-image-preview': 'large' },
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="dns-prefetch" href="https://sicherheit.ai" />
        <link rel="preconnect" href="https://sicherheit.ai" />
      </head>
      <body>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <IntroAnimation />
            <div id="scroll-progress" className="scroll-progress" style={{ width: '0%' }} />
            <ScrollProgress />
            <CustomCursor />
            <Nav locale={locale} />
            <PageTransition>
              {children}
            </PageTransition>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
