'use client';

import React from 'react';
import { Sparkles, Layers, Gem, PackageCheck } from 'lucide-react';
import { BRAND } from '@/lib/constants/brand';

const BENEFITS = [
  {
    icon: Sparkles,
    number: '01',
    title: 'Designed for everyday',
    description:
      'Feather-light, comfortable, and skin-friendly pieces created to seamlessly elevate your everyday outfits.',
  },
  {
    icon: Gem,
    number: '02',
    title: 'Affordable luxury',
    description:
      'High-grade 18K gold plating and lustrous stones delivered without traditional exorbitant fine-jewellery markups.',
  },
  {
    icon: Layers,
    number: '03',
    title: 'Made to style',
    description:
      'Proportionally balanced chains, stackable kadas, and statement earrings curated for effortless mixing and matching.',
  },
  {
    icon: PackageCheck,
    number: '04',
    title: 'Carefully packed',
    description:
      'Every piece is individually inspected and placed in protective velvet pouches, ready for gifting or safe keeping.',
  },
];

export function WhyNazaraaSection() {
  return (
    <section id="why-nazaara" className="py-20 sm:py-28 bg-sand-100 border-t border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-wine-800">
            The {BRAND.name} Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-4.5xl text-charcoal-900 mt-2 font-normal">
            Why {BRAND.name}
          </h2>
          <p className="mt-3 text-sm text-taupe-500">
            Thoughtful design, lasting elegance, and exceptional care at every step.
          </p>
        </div>

        {/* 4 Clean Value Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {BENEFITS.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="relative bg-sand-50/80 p-6 sm:p-8 border border-sand-200/80 transition-all duration-300 hover:shadow-sm hover:border-wine-700/30 flex flex-col justify-between"
              >
                <div>
                  {/* Subtle top indicator */}
                  <div className="flex items-center justify-between text-taupe-400 mb-6">
                    <span className="font-serif text-sm tracking-widest text-wine-800 font-semibold">
                      {benefit.number}
                    </span>
                    <Icon className="w-5 h-5 text-wine-700" />
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-charcoal-900 font-medium tracking-wide">
                    {benefit.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-charcoal-700 mt-3 leading-relaxed font-light">
                    {benefit.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-sand-200/60">
                  <span className="text-[10px] uppercase tracking-widest text-taupe-500">
                    Quality Promised
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
