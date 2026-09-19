'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, MessageCircle, Mail, ArrowRight, ShieldCheck, Heart, Gem, Package } from 'lucide-react';
import { CartProvider } from '@/lib/store/cartContext';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { InstagramIcon } from '@/components/ui/Icons';
import { BRAND } from '@/lib/constants/brand';
import { BRAND_IMAGES } from '@/lib/constants/images';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen bg-sand-50 selection:bg-wine-700 selection:text-sand-50">
        <AnnouncementBar />
        <Navbar />

        <main className="flex-1 w-full">
          {/* Hero Story Banner */}
          <section className="relative py-20 sm:py-28 bg-sand-100 border-b border-sand-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center space-y-4">
                <span className="text-xs uppercase tracking-widest text-wine-800 font-semibold flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-wine-700" />
                  <span>The Story Behind The Sparkle</span>
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-900 font-normal leading-tight">
                  Jewellery that speaks for you.
                </h1>
                <p className="text-base sm:text-lg text-charcoal-700 font-light leading-relaxed max-w-2xl mx-auto">
                  {BRAND.name} was born from a singular belief: true luxury is effortless, everyday, and deeply personal.
                </p>
              </div>
            </div>
          </section>

          {/* Section 1: Brand Introduction & Editorial Narrative */}
          <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Images */}
              <div className="lg:col-span-6 relative">
                <div className="relative aspect-4/5 w-full bg-sand-200 border border-sand-300 shadow-md overflow-hidden">
                  <Image
                    src={BRAND_IMAGES.brandStory.portrait}
                    alt={`${BRAND.name} artisanal craft`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-4 sm:right-6 w-1/2 aspect-square bg-sand-100 border-4 border-sand-50 shadow-xl overflow-hidden hidden sm:block">
                  <Image
                    src={BRAND_IMAGES.brandStory.detail}
                    alt="Jewellery detail"
                    fill
                    sizes="25vw"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-wine-800">
                  Our Origins & Vision
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal leading-snug">
                  Made to be noticed without waiting for an occasion.
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-charcoal-800 font-light leading-relaxed">
                  <p>
                    For generations, fine jewellery was relegated to locker vaults—worn only on weddings, galas, and rare festivals out of fear of wear or loss. We set out to change that paradigm.
                  </p>
                  <p>
                    <strong>{BRAND.name}</strong> bridges the gap between delicate high-jewellery aesthetics and resilient, modern durability. We create anti-tarnish, hypoallergenic, 18K gold-plated pieces that you can wear to brunch, work, evening gatherings, and everywhere in between.
                  </p>
                  <p>
                    Each design is selected with intentional proportions—lightweight on the skin, smooth to the touch, and engineered for effortless stacking.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Core Design & Quality Pillars */}
          <section className="py-20 bg-sand-100 border-t border-b border-sand-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-xs font-semibold uppercase tracking-widest text-wine-800">
                  What Sets Us Apart
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 mt-2 font-normal">
                  The {BRAND.name} Philosophy
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-sand-50 p-8 border border-sand-200 space-y-4">
                  <div className="w-10 h-10 bg-wine-50 text-wine-800 flex items-center justify-center rounded-xs">
                    <Gem className="w-5 h-5 text-wine-700" />
                  </div>
                  <h3 className="font-serif text-2xl text-charcoal-900 font-medium">
                    18K Gold Plated
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-light">
                    Every design features rich 18K gold plating with specialized protective coating, providing radiant warmth and anti-tarnish durability for daily living.
                  </p>
                </div>

                <div className="bg-sand-50 p-8 border border-sand-200 space-y-4">
                  <div className="w-10 h-10 bg-wine-50 text-wine-800 flex items-center justify-center rounded-xs">
                    <ShieldCheck className="w-5 h-5 text-wine-700" />
                  </div>
                  <h3 className="font-serif text-2xl text-charcoal-900 font-medium">
                    Skin-Friendly & Hypoallergenic
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-light">
                    100% free of lead, nickel, and harsh reactive metals. Formulated specifically for sensitive Indian skin types without irritation or green marks.
                  </p>
                </div>

                <div className="bg-sand-50 p-8 border border-sand-200 space-y-4">
                  <div className="w-10 h-10 bg-wine-50 text-wine-800 flex items-center justify-center rounded-xs">
                    <Package className="w-5 h-5 text-wine-700" />
                  </div>
                  <h3 className="font-serif text-2xl text-charcoal-900 font-medium">
                    Bespoke Velvet Packaging
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-light">
                    Every piece arrives in a plush velvet pouch, crafted to keep your jewellery free from friction and ready to be gifted with love.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Direct Connect & Support CTAs */}
          <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-sand-100 border border-sand-300 p-8 sm:p-14 text-center max-w-4xl mx-auto space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-wine-800">
                Connect With Us
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
                Have questions or need styling advice?
              </h2>
              <p className="text-sm sm:text-base text-charcoal-700 max-w-xl mx-auto font-light leading-relaxed">
                We are always available to help you select the perfect piece or create a custom layered stack for any outfit.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <a
                  href={BRAND.whatsapp.getLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" size="lg" className="shadow-md">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    <span>WhatsApp: {BRAND.whatsapp.number}</span>
                  </Button>
                </a>

                <a
                  href={BRAND.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="bg-sand-50">
                    <InstagramIcon className="w-4 h-4 mr-2" />
                    <span>Instagram {BRAND.instagram.handle}</span>
                  </Button>
                </a>

                <a href={BRAND.email.mailto}>
                  <Button variant="ghost" size="lg">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{BRAND.email.address}</span>
                  </Button>
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
}
