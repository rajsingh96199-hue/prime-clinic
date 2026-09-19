'use client';

import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/store/cartContext';
import { MOCK_PRODUCTS, CATEGORIES } from '@/lib/constants/products';
import { formatINR } from '@/lib/utils';
import { CategorySlug } from '@/types/product';

export function SearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useCart();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategorySlug | 'all'>('all');

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchesQuery =
        query.trim() === '' ||
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.categoryName.toLowerCase().includes(query.toLowerCase()) ||
        product.material.toLowerCase().includes(query.toLowerCase());

      const matchesCat =
        selectedCategory === 'all' || product.category === selectedCategory;

      return matchesQuery && matchesCat;
    });
  }, [query, selectedCategory]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-charcoal-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={() => setIsSearchOpen(false)}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl bg-sand-50 shadow-2xl border border-sand-200 overflow-hidden rounded-xs z-10">
        {/* Search Header */}
        <div className="p-4 sm:p-6 border-b border-sand-200 bg-sand-100/60">
          <div className="flex items-center justify-between gap-3">
            <div className="relative flex-1 flex items-center">
              <Search className="w-5 h-5 text-charcoal-700/60 absolute left-3" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search earrings, pearls, rings, 18k chains..."
                className="w-full pl-11 pr-4 py-3 bg-sand-50 border border-sand-300 text-charcoal-900 placeholder:text-taupe-500 focus:outline-none focus:border-wine-700 text-sm tracking-wide"
              />
            </div>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2 text-charcoal-700 hover:text-wine-700 hover:bg-sand-200 transition-colors rounded-xs"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Categories Filter */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 whitespace-nowrap transition-colors rounded-xs ${
                selectedCategory === 'all'
                  ? 'bg-wine-700 text-sand-50 font-medium'
                  : 'bg-sand-50 text-charcoal-700 border border-sand-300 hover:border-wine-700'
              }`}
            >
              All Pieces
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1 whitespace-nowrap transition-colors rounded-xs ${
                  selectedCategory === cat.slug
                    ? 'bg-wine-700 text-sand-50 font-medium'
                    : 'bg-sand-50 text-charcoal-700 border border-sand-300 hover:border-wine-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 divide-y divide-sand-200">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Sparkles className="w-8 h-8 text-taupe-400 mx-auto mb-2 opacity-60" />
              <p className="font-serif text-lg text-charcoal-900">
                No jewellery found matching &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-taupe-500 mt-1">
                Try searching for &ldquo;pearl&rdquo;, &ldquo;gold&rdquo;, or browse our categories.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-taupe-500 pb-2">
                <span>Found {filteredProducts.length} items</span>
                <span className="text-[11px] uppercase tracking-widest text-wine-800">
                  Curated Collection
                </span>
              </div>
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`#product-${product.slug}`}
                  onClick={() => setIsSearchOpen(false)}
                  className="flex items-center gap-4 p-2 hover:bg-sand-100 transition-colors group rounded-xs"
                >
                  <div className="relative w-16 h-16 bg-sand-200 overflow-hidden shrink-0">
                    <Image
                      src={product.images[0].url}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs uppercase tracking-wider text-taupe-500">
                      {product.categoryName}
                    </p>
                    <h4 className="font-serif text-sm sm:text-base text-charcoal-900 group-hover:text-wine-800 transition-colors truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs text-wine-800 font-semibold mt-0.5">
                      {formatINR(product.price)}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-taupe-400 group-hover:text-wine-700 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
