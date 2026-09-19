'use client';

import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '@/lib/constants/products';
import { ProductCard } from '@/components/product/ProductCard';
import { CategorySlug } from '@/types/product';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function NewArrivalsSection() {
  const [activeFilter, setActiveFilter] = useState<CategorySlug | 'all'>('all');

  const filteredProducts = MOCK_PRODUCTS.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  return (
    <section id="new-arrivals" className="py-20 sm:py-28 bg-sand-100/70 border-t border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-wine-800 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-wine-700" />
              <span>Latest Drops</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-4.5xl text-charcoal-900 font-normal">
              New, just for you.
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 mt-6 md:mt-0 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 text-xs tracking-wider uppercase transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-wine-700 text-sand-50 font-medium'
                  : 'bg-sand-50 text-charcoal-700 border border-sand-300 hover:border-wine-700'
              }`}
            >
              All Drops
            </button>
            <button
              onClick={() => setActiveFilter('earrings')}
              className={`px-3.5 py-1.5 text-xs tracking-wider uppercase transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'earrings'
                  ? 'bg-wine-700 text-sand-50 font-medium'
                  : 'bg-sand-50 text-charcoal-700 border border-sand-300 hover:border-wine-700'
              }`}
            >
              Earrings
            </button>
            <button
              onClick={() => setActiveFilter('pendants')}
              className={`px-3.5 py-1.5 text-xs tracking-wider uppercase transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'pendants'
                  ? 'bg-wine-700 text-sand-50 font-medium'
                  : 'bg-sand-50 text-charcoal-700 border border-sand-300 hover:border-wine-700'
              }`}
            >
              Pendants
            </button>
            <button
              onClick={() => setActiveFilter('kadas')}
              className={`px-3.5 py-1.5 text-xs tracking-wider uppercase transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'kadas'
                  ? 'bg-wine-700 text-sand-50 font-medium'
                  : 'bg-sand-50 text-charcoal-700 border border-sand-300 hover:border-wine-700'
              }`}
            >
              Kadas
            </button>
            <button
              onClick={() => setActiveFilter('rings')}
              className={`px-3.5 py-1.5 text-xs tracking-wider uppercase transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'rings'
                  ? 'bg-wine-700 text-sand-50 font-medium'
                  : 'bg-sand-50 text-charcoal-700 border border-sand-300 hover:border-wine-700'
              }`}
            >
              Rings
            </button>
            <button
              onClick={() => setActiveFilter('bracelets')}
              className={`px-3.5 py-1.5 text-xs tracking-wider uppercase transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'bracelets'
                  ? 'bg-wine-700 text-sand-50 font-medium'
                  : 'bg-sand-50 text-charcoal-700 border border-sand-300 hover:border-wine-700'
              }`}
            >
              Bracelets
            </button>
          </div>
        </div>

        {/* Responsive Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/new-arrivals"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-charcoal-900 font-semibold hover:text-wine-700 transition-colors pb-1 border-b border-charcoal-900 hover:border-wine-700"
          >
            <span>View All New Arrivals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
