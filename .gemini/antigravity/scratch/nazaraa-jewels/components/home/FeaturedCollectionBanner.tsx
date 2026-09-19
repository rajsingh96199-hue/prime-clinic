'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { BRAND_IMAGES } from '@/lib/constants/images';
import { Button } from '@/components/ui/Button';

export function FeaturedCollectionBanner() {
  return (
    <section id="featured-collection" className="relative py-24 sm:py-32 overflow-hidden bg-sand-200">
      {/* Background Lifestyle Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={BRAND_IMAGES.featuredCollection.banner}
          alt={BRAND_IMAGES.featuredCollection.alt}
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Editorial overlay balancing wine & sand tones */}
        <div className="absolute inset-0 bg-charcoal-900/60 backdrop-brightness-75" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-sand-50">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-sand-50/15 border border-sand-100/30 text-sand-100 text-xs tracking-widest uppercase mb-6 backdrop-blur-xs">
          <Sparkles className="w-3.5 h-3.5 text-wine-200" />
          <span>Curated Spotlight</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-sand-50 font-normal leading-tight tracking-wide">
          The Everyday Edit
        </h2>

        <p className="mt-4 text-base sm:text-xl text-sand-200/95 font-light max-w-xl mx-auto leading-relaxed">
          Pieces that take you effortlessly from coffee runs to candlelit celebrations.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="#new-arrivals">
            <Button
              variant="primary"
              size="lg"
              className="bg-wine-700 hover:bg-wine-600 text-sand-50 border-none shadow-xl min-w-[200px]"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
