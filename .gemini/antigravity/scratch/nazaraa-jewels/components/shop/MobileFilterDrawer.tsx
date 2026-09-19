'use client';

import React from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { ShopFilters, FilterState } from './ShopFilters';
import { Button } from '@/components/ui/Button';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onReset: () => void;
  totalResults: number;
}

export function MobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onReset,
  totalResults,
}: MobileFilterDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-900/60 backdrop-blur-xs"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-sand-50 border-l border-sand-300 shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-sand-200">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-wine-800" />
              <h2 className="font-serif text-xl text-charcoal-900 font-semibold">
                Filter & Sort
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-charcoal-700 hover:text-wine-800 transition-colors"
              aria-label="Close filters"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Body */}
          <div className="py-6">
            <ShopFilters
              filters={filters}
              onFilterChange={onFilterChange}
              onReset={onReset}
            />
          </div>
        </div>

        {/* Footer Apply CTA */}
        <div className="pt-4 border-t border-sand-200">
          <Button variant="primary" className="w-full" onClick={onClose}>
            Show {totalResults} Pieces
          </Button>
        </div>
      </div>
    </div>
  );
}
