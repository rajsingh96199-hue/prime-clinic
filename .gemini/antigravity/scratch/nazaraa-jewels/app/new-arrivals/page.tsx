'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowLeft, SlidersHorizontal } from 'lucide-react';
import { CartProvider } from '@/lib/store/cartContext';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { MOCK_PRODUCTS } from '@/lib/constants/products';
import { BRAND } from '@/lib/constants/brand';

export default function NewArrivalsPage() {
  const [sortOption, setSortOption] = useState<
    'featured' | 'newest' | 'price-low' | 'price-high'
  >('featured');

  const newArrivals = useMemo(() => {
    let list = MOCK_PRODUCTS.filter((p) => p.isNewArrival);

    switch (sortOption) {
      case 'price-low':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      case 'featured':
      default:
        list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return list;
  }, [sortOption]);

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen bg-sand-50 selection:bg-wine-700 selection:text-sand-50">
        <AnnouncementBar />
        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center gap-2 text-xs text-taupe-500 mb-6">
            <Link href="/" className="hover:text-wine-800 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-charcoal-900 font-medium">New Arrivals</span>
          </div>

          {/* Hero Header */}
          <div className="border-b border-sand-300/80 pb-8 mb-10">
            <div className="flex items-center gap-2 text-wine-800 text-xs uppercase tracking-widest font-semibold mb-2">
              <Sparkles className="w-4 h-4 text-wine-700" />
              <span>Fresh Drops & Latest Designs</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal-900 font-normal">
              New Arrivals
            </h1>
            <p className="mt-3 text-sm sm:text-base text-charcoal-700 max-w-2xl font-light">
              Explore the latest luxury statement earrings, sculptural kadas, sparkling tennis bracelets, and delicate chains from {BRAND.name}.
            </p>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sand-200 mb-8">
            <p className="text-xs text-taupe-500">
              Showing <span className="font-semibold text-charcoal-900">{newArrivals.length}</span> curated new pieces
            </p>

            <div className="flex items-center gap-3">
              <span className="text-xs text-charcoal-700 font-medium">Sort By:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="text-xs bg-sand-50 border border-sand-300 rounded-xs px-3 py-1.5 text-charcoal-800 focus:outline-none focus:border-wine-700 cursor-pointer"
              >
                <option value="featured">Curated Drops</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {newArrivals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-sand-100/50 border border-sand-200 p-8">
              <p className="font-serif text-xl text-charcoal-900 font-medium">
                New collections arriving soon.
              </p>
              <p className="text-xs text-taupe-500 mt-2">
                Stay tuned for our upcoming seasonal drops and exclusive releases.
              </p>
              <Link
                href="/categories"
                className="inline-block mt-6 px-6 py-2.5 bg-wine-700 text-sand-50 text-xs uppercase tracking-widest font-semibold hover:bg-wine-800 transition-colors"
              >
                Explore Categories
              </Link>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
}
