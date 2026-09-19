import { CartProvider } from '@/lib/store/cartContext';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/home/HeroSection';
import { BrandStorySection } from '@/components/home/BrandStorySection';
import { WhyNazaraaSection } from '@/components/home/WhyNazaraaSection';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen bg-sand-50 selection:bg-wine-700 selection:text-sand-50">
        {/* Top Announcement Bar */}
        <AnnouncementBar />

        {/* Sticky Main Navigation */}
        <Navbar />

        {/* Main Editorial Flow */}
        <main className="flex-1">
          {/* 1. Hero Section */}
          <HeroSection />

          {/* 2. Our Philosophy */}
          <BrandStorySection />

          {/* 3. Why Nazaara Jewels (4 Core Pillars) */}
          <WhyNazaraaSection />
        </main>

        {/* Brand Footer */}
        <Footer />
      </div>
    </CartProvider>
  );
}
