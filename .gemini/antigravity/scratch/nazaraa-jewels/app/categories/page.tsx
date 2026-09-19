'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CartProvider } from '@/lib/store/cartContext';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CATEGORIES } from '@/lib/constants/products';
import { BRAND } from '@/lib/constants/brand';

export default function CategoriesPage() {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen bg-sand-50 selection:bg-wine-700 selection:text-sand-50">
        <AnnouncementBar />
        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-taupe-500 mb-6">
            <Link href="/" className="hover:text-wine-800 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-charcoal-900 font-medium">Categories</span>
          </div>

          {/* Header */}
          <div className="border-b border-sand-300/80 pb-8 mb-12">
            <div className="flex items-center gap-2 text-wine-800 text-xs uppercase tracking-widest font-semibold mb-2">
              <Sparkles className="w-4 h-4 text-wine-700" />
              <span>Curated Fine Collections</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal-900 font-normal">
              Jewellery Categories
            </h1>
            <p className="mt-3 text-sm sm:text-base text-charcoal-700 max-w-2xl font-light">
              Explore {BRAND.name}&apos;s 8 core jewellery categories, each crafted with anti-tarnish durability, 18K gold finishes, and modern elegance.
            </p>
          </div>

          {/* 8 Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group relative flex flex-col bg-sand-100 border border-sand-200/80 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-wine-700/40"
              >
                {/* Image Container */}
                <div className="relative aspect-4/5 w-full bg-sand-200 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={`${category.name} collection - ${BRAND.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                  
                  {/* Item Count Tag */}
                  <div className="absolute top-3 right-3 bg-sand-50/90 backdrop-blur-xs px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase text-charcoal-800 border border-sand-200">
                    {category.itemCount} Designs
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-wine-800 font-semibold">
                      {category.tagline}
                    </span>
                    <h2 className="font-serif text-2xl text-charcoal-900 font-medium group-hover:text-wine-800 transition-colors mt-0.5">
                      {category.name}
                    </h2>
                    <p className="text-xs text-charcoal-700 mt-2 line-clamp-2 font-light">
                      {category.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-sand-200 flex items-center justify-between text-xs text-wine-800 font-semibold group-hover:text-wine-900">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
}
