'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { BRAND_IMAGES } from '@/lib/constants/images';
import { BRAND } from '@/lib/constants/brand';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-sand-100">
      {/* Background Image Container with Editorial Color Grading */}
      <div className="absolute inset-0 z-0">
        <Image
          src={BRAND_IMAGES.hero.primary}
          alt={`${BRAND.name} editorial luxury fashion jewellery collection`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center sm:object-[center_35%]"
        />
        {/* Warm editorial gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-sand-50/95 via-sand-50/70 to-transparent sm:w-2/3" />
        <div className="absolute inset-0 bg-gradient-to-t from-sand-50 via-transparent to-sand-50/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="max-w-xl">
          {/* Brand Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-wine-50 border border-wine-200/80 text-wine-800 text-xs tracking-widest uppercase mb-5"
          >
            <Sparkles className="w-3.5 h-3.5 text-wine-700" />
            <span>{BRAND.name} • Everyday Elegance</span>
          </motion.div>

          {/* Major Serif Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-6.5xl text-charcoal-900 leading-[1.1] tracking-tight font-normal"
          >
            Jewellery that <br className="hidden sm:inline" />
            <span className="italic font-light text-wine-900">speaks for you.</span>
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="mt-5 text-base sm:text-lg text-charcoal-800 font-light leading-relaxed max-w-md"
          >
            {BRAND.subtagline}
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <Link href="/new-arrivals">
              <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-md">
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            <Link href="/categories">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-sand-50/70 backdrop-blur-xs">
                <span>Explore Categories</span>
              </Button>
            </Link>
          </motion.div>

          {/* Micro Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 pt-6 border-t border-charcoal-900/10 flex items-center gap-6 text-[11px] sm:text-xs text-charcoal-700 uppercase tracking-wider"
          >
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-wine-700" />
              <span>Anti-Tarnish Quality</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-wine-700" />
              <span>18K Gold Plated</span>
            </div>
            <div className="flex items-center gap-1.5 hidden sm:flex">
              <span className="w-1.5 h-1.5 rounded-full bg-wine-700" />
              <span>Hypoallergenic</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
