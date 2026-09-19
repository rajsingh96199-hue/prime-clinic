'use client';

import React from 'react';
import { CategorySlug } from '@/types/product';
import { CATEGORIES } from '@/lib/constants/products';
import { BRAND } from '@/lib/constants/brand';
import { Check } from 'lucide-react';

export interface FilterState {
  category: CategorySlug | 'all';
  priceRange: 'all' | 'under-1000' | '1000-2000' | 'above-2000';
  inStockOnly: boolean;
}

interface ShopFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onReset: () => void;
}

export function ShopFilters({ filters, onFilterChange, onReset }: ShopFiltersProps) {
  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.priceRange !== 'all' ||
    filters.inStockOnly;

  return (
    <div className="space-y-8 text-xs">
      {/* Reset all button */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pb-4 border-b border-sand-200">
          <span className="font-semibold text-charcoal-900 uppercase tracking-wider">
            Active Filters
          </span>
          <button
            onClick={onReset}
            className="text-wine-800 hover:text-wine-900 underline font-medium cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Category Filter (8 Categories) */}
      <div>
        <h3 className="font-serif text-base text-charcoal-900 font-semibold mb-3 tracking-wide">
          Categories
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => onFilterChange({ category: 'all' })}
            className={`w-full flex items-center justify-between text-left py-1 transition-colors cursor-pointer ${
              filters.category === 'all'
                ? 'font-bold text-wine-800'
                : 'text-charcoal-700 hover:text-wine-700'
            }`}
          >
            <span>All Jewellery</span>
            {filters.category === 'all' && <Check className="w-3.5 h-3.5 text-wine-700" />}
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onFilterChange({ category: cat.slug })}
              className={`w-full flex items-center justify-between text-left py-1 transition-colors cursor-pointer ${
                filters.category === cat.slug
                  ? 'font-bold text-wine-800'
                  : 'text-charcoal-700 hover:text-wine-700'
              }`}
            >
              <span>{cat.name}</span>
              {filters.category === cat.slug && (
                <Check className="w-3.5 h-3.5 text-wine-700" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="pt-6 border-t border-sand-200">
        <h3 className="font-serif text-base text-charcoal-900 font-semibold mb-3 tracking-wide">
          Price Range
        </h3>
        <div className="space-y-2">
          {[
            { id: 'all', label: 'All Prices' },
            { id: 'under-1000', label: 'Under ₹1,000' },
            { id: '1000-2000', label: '₹1,000 - ₹2,000' },
            { id: 'above-2000', label: 'Above ₹2,000' },
          ].map((range) => (
            <label
              key={range.id}
              className="flex items-center gap-2 text-charcoal-700 hover:text-wine-800 cursor-pointer py-0.5"
            >
              <input
                type="radio"
                name="priceRange"
                checked={filters.priceRange === range.id}
                onChange={() => onFilterChange({ priceRange: range.id as any })}
                className="accent-wine-700 text-wine-700"
              />
              <span>{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="pt-6 border-t border-sand-200">
        <h3 className="font-serif text-base text-charcoal-900 font-semibold mb-3 tracking-wide">
          Availability
        </h3>
        <label className="flex items-center gap-2 text-charcoal-700 hover:text-wine-800 cursor-pointer py-0.5">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onFilterChange({ inStockOnly: e.target.checked })}
            className="accent-wine-700 text-wine-700 rounded-xs"
          />
          <span>In Stock Only</span>
        </label>
      </div>

      {/* Brand Standards Box */}
      <div className="pt-6 border-t border-sand-200 bg-sand-100/60 p-4 border rounded-xs space-y-2 text-[11px] text-taupe-500">
        <p className="font-serif text-charcoal-900 font-semibold text-xs">
          The {BRAND.name} Standard
        </p>
        <p>• 18K Anti-Tarnish Finish</p>
        <p>• 100% Skin-Safe & Hypoallergenic</p>
        <p>• Free Express Shipping &gt; ₹{BRAND.shipping.freeThreshold}</p>
      </div>
    </div>
  );
}
