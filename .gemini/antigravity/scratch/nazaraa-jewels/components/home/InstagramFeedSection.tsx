'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/Icons';
import { BRAND_IMAGES } from '@/lib/constants/images';
import { BRAND } from '@/lib/constants/brand';

export function InstagramFeedSection() {
  return (
    <section className="py-20 sm:py-28 bg-sand-100/60 border-t border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-wine-800 mb-1">
              <InstagramIcon className="w-3.5 h-3.5 text-wine-700" />
              <span>{BRAND.instagram.handle}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-4.5xl text-charcoal-900 font-normal">
              Follow the {BRAND.name} look.
            </h2>
          </div>
          <a
            href={BRAND.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-charcoal-900 font-semibold hover:text-wine-700 transition-colors"
          >
            <span>Follow on Instagram</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* 6 Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {BRAND_IMAGES.instagramFeed.map((item, idx) => (
            <a
              key={idx}
              href={BRAND.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square bg-sand-200 overflow-hidden border border-sand-300/60 shadow-xs cursor-pointer block"
            >
              {/* Tile Image */}
              <Image
                src={item.url}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-charcoal-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center text-sand-50">
                <InstagramIcon className="w-6 h-6 text-sand-50 mb-1.5" />
                <span className="text-[11px] font-medium tracking-wide">
                  {BRAND.instagram.handle}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-sand-200/80 mt-1">
                  View on Instagram &rarr;
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
