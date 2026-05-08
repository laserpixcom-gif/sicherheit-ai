import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import StatsSection from '@/components/StatsSection';
import BentoThreats from '@/components/BentoThreats';
import RobotSection from '@/components/RobotSection';
import HorizontalToolScroll from '@/components/HorizontalToolScroll';
import RadarSection from '@/components/RadarSection';
import NewsSection from '@/components/NewsSection';
import ScoreSection from '@/components/ScoreSection';
import ToolsSection from '@/components/ToolsSection';
import TerminalSection from '@/components/TerminalSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';
import ScrollAnimator from '@/components/ScrollAnimator';
import { setRequestLocale } from 'next-intl/server';
import { getLatestPosts } from '@/lib/posts';

export const revalidate = 3600; // ISR: alle 60 Minuten neu generieren

export function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }];
}

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const latestPosts = await getLatestPosts(5);

  return (
    <>
      <ScrollAnimator />
      <Hero />
      <Ticker />
      <RobotSection />
      <StatsSection />

      <BentoThreats />
      <HorizontalToolScroll />

      <RadarSection />
      <NewsSection locale={locale} posts={latestPosts} />
      <ScoreSection />
      <ToolsSection locale={locale} />
      <TerminalSection locale={locale} />
      <NewsletterSection />
      <Footer locale={locale} />
    </>
  );
}
