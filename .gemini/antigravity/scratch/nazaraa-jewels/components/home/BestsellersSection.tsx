'use client';

import React from 'react';
import { MOCK_PRODUCTS } from '@/lib/constants/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Heart } from 'lucide-react';

export function BestsellersSection() {
  const bestsellers = MOCK_PRODUCTS.filter((p) => p.isBestseller);

  return (
    <section id="bestsellers" className="py-20 sm:py-28 bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-wine-800 mb-1">
            <Heart className="w-3.5 h-3.5 text-wine-700 fill-current" />
            <span>Community Favourites</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-4.5xl text-charcoal-900 font-normal">
            Loved by you.
          </h2>
          <p className="mt-3 text-sm text-taupe-500">
            Our most adored, restocked, and five-star rated jewellery staples.
          </p>
        </div>

        {/* Responsive Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
