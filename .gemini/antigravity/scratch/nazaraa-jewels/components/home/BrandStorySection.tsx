'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { BRAND_IMAGES } from '@/lib/constants/images';
import { BRAND } from '@/lib/constants/brand';
import { Button } from '@/components/ui/Button';

export function BrandStorySection() {
  return (
    <section id="our-philosophy" className="py-20 sm:py-28 bg-sand-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Editorial Double Image Composition (Left 6 cols) */}
          <div className="lg:col-span-6 relative">
            {/* Main Portrait */}
            <div className="relative aspect-3/4 w-4/5 sm:w-3/4 bg-sand-200 border border-sand-300 shadow-md overflow-hidden">
              <Image
                src={BRAND_IMAGES.brandStory.portrait}
                alt={`${BRAND.name} brand philosophy and elegance`}
                fill
                sizes="(max-width: 1024px) 80vw, 40vw"
                className="object-cover"
              />
            </div>

            {/* Overlapping Detail Shot */}
            <div className="absolute -bottom-6 -right-2 sm:right-4 w-3/5 sm:w-1/2 aspect-4/5 bg-sand-100 border-4 border-sand-50 shadow-xl overflow-hidden z-10">
              <Image
                src={BRAND_IMAGES.brandStory.detail}
                alt="Jewellery styling and layering detail"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>

            {/* Soft decorative badge */}
            <div className="absolute top-6 -left-4 sm:left-6 z-20 bg-sand-50/95 backdrop-blur-xs border border-sand-300 px-4 py-2.5 shadow-sm">
              <p className="text-[10px] uppercase tracking-widest text-wine-800 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-wine-700" />
                <span>{BRAND.name}</span>
              </p>
            </div>
          </div>

          {/* Storytelling Text (Right 6 cols) */}
          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-wine-800">
              Our Philosophy
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal-900 leading-[1.15] font-normal">
              Made to be <br />
              <span className="italic font-light text-wine-900">noticed every day.</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-charcoal-800 leading-relaxed font-light">
              <p>
                At <strong>{BRAND.name}</strong>, we believe jewellery is not meant to stay locked in dark boxes waiting for rare celebrations. It is an everyday expression of individuality, confidence, and effortless style.
              </p>
              <p>
                Every piece is thoughtfully curated to complement modern life—from morning work routines and casual café conversations to evenings filled with laughter and golden light.
              </p>
              <p className="text-xs sm:text-sm text-taupe-500 border-l-2 border-wine-700 pl-4 italic">
                &ldquo;Fine aesthetics without the fragile anxiety. Jewellery designed to live, layer, and glow with every version of you.&rdquo;
              </p>
            </div>

            {/* Value Highlights */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-sand-200 text-xs">
              <div>
                <p className="font-serif text-base text-charcoal-900 font-semibold">18K Gold Plated</p>
                <p className="text-taupe-500 mt-0.5">Lustrous warmth crafted for long-lasting daily wear.</p>
              </div>
              <div>
                <p className="font-serif text-base text-charcoal-900 font-semibold">Hypoallergenic</p>
                <p className="text-taupe-500 mt-0.5">Gentle, skin-friendly, nickel-free composition.</p>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link href="/about">
                <Button variant="wineOutline">
                  <span>Read Brand Story</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button variant="ghost">
                  <span>Browse Collections</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
