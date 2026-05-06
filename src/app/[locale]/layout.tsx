import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Nav from '@/components/Nav';
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
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <div id="scroll-progress" className="scroll-progress" />
            <Nav locale={locale} />
            <main>{children}</main>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
