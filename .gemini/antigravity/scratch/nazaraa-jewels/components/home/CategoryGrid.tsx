'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants/products';

export function CategoryGrid() {
  return (
    <section id="shop-category" className="py-20 sm:py-28 bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-wine-800">
              The Categories
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-4.5xl text-charcoal-900 mt-1 font-normal">
              Find your everyday favourite.
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm text-taupe-500 max-w-sm">
            Curated silhouettes crafted to transition effortlessly from casual mornings to elevated evenings.
          </p>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES.map((category, idx) => {
            const isTall = idx === 0 || idx === 4;

            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className={`group relative overflow-hidden bg-sand-200 border border-sand-300/60 shadow-xs flex flex-col justify-end p-6 sm:p-8 transition-all duration-500 ${
                  isTall ? 'min-h-[380px] sm:min-h-[440px]' : 'min-h-[340px] sm:min-h-[380px]'
                }`}
              >
                {/* Background Image */}
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle Editorial Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/30 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

                {/* Content */}
                <div className="relative z-10 text-sand-50 transform transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-widest text-sand-200/90 font-medium">
                      {category.tagline}
                    </span>
                    <span className="p-2 rounded-full bg-sand-50/20 text-sand-50 backdrop-blur-xs group-hover:bg-wine-700 group-hover:text-sand-50 transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-sand-50 mt-2 font-medium tracking-wide">
                    {category.name}
                  </h3>

                  <p className="text-xs text-sand-200/80 mt-1 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-sand-100/20 flex items-center justify-between text-[11px] uppercase tracking-wider text-sand-200/70">
                    <span>{category.itemCount} Designs</span>
                    <span className="text-sand-50 font-semibold group-hover:text-wine-200 transition-colors">
                      Discover &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
