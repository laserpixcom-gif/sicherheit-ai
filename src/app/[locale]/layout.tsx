export function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }];
}

import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Nav from '@/components/Nav';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import PageTransition from '@/components/PageTransition';
import '../globals.css';

export const metadata: Metadata = {
  title: 'sicherheit.ai — KI-Sicherheit & Cybersecurity für Deutschland',
  description: 'Deutschlands führende Plattform für KI-Sicherheit und Cybersecurity.',
};

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
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
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
