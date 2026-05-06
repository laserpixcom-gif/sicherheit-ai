import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import StatsSection from '@/components/StatsSection';
import BentoThreats from '@/components/BentoThreats';
import StickyThreatRadar from '@/components/StickyThreatRadar';
import HorizontalToolScroll from '@/components/HorizontalToolScroll';
import RadarSection from '@/components/RadarSection';
import NewsSection from '@/components/NewsSection';
import ScoreSection from '@/components/ScoreSection';
import ToolsSection from '@/components/ToolsSection';
import TerminalSection from '@/components/TerminalSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';
import ScrollAnimator from '@/components/ScrollAnimator';

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <>
      <ScrollAnimator />
      <Hero />
      <Ticker />
      <StatsSection />

      {/* NEW: 3 immersive scroll sections */}
      <BentoThreats />
      <StickyThreatRadar />
      <HorizontalToolScroll />

      <RadarSection />
      <NewsSection locale={locale} />
      <ScoreSection />
      <ToolsSection locale={locale} />
      <TerminalSection locale={locale} />
      <NewsletterSection />
      <Footer locale={locale} />
    </>
  );
}
