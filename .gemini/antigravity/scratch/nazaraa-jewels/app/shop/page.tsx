'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, Search, ChevronRight, Sparkles, RefreshCcw } from 'lucide-react';
import { CartProvider } from '@/lib/store/cartContext';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { ShopFilters, FilterState } from '@/components/shop/ShopFilters';
import { MobileFilterDrawer } from '@/components/shop/MobileFilterDrawer';
import { MOCK_PRODUCTS, CATEGORIES } from '@/lib/constants/products';
import { CategorySlug } from '@/types/product';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get('category') as CategorySlug) || 'all';

  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    priceRange: 'all',
    inStockOnly: false,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<
    'featured' | 'newest' | 'price-low' | 'price-high' | 'bestselling'
  >('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'all',
      priceRange: 'all',
      inStockOnly: false,
    });
    setSearchQuery('');
  };

  const filteredAndSortedProducts = useMemo(() => {
    let list = [...MOCK_PRODUCTS];

    // Category
    if (filters.category !== 'all') {
      list = list.filter((p) => p.category === filters.category);
    }

    // Availability
    if (filters.inStockOnly) {
      list = list.filter((p) => p.inStock);
    }

    // Price Range
    if (filters.priceRange === 'under-1000') {
      list = list.filter((p) => p.price < 1000);
    } else if (filters.priceRange === '1000-2000') {
      list = list.filter((p) => p.price >= 1000 && p.price <= 2000);
    } else if (filters.priceRange === 'above-2000') {
      list = list.filter((p) => p.price > 2000);
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortOption) {
      case 'price-low':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
      case 'bestselling':
        list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
      case 'featured':
      default:
        list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return list;
  }, [filters, searchQuery, sortOption]);

  const activeCategoryObject =
    filters.category !== 'all'
      ? CATEGORIES.find((c) => c.slug === filters.category)
      : null;

  return (
    <div className="flex flex-col min-h-screen bg-sand-50">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-taupe-500 mb-6 uppercase tracking-wider">
          <Link href="/" className="hover:text-wine-800 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-charcoal-900 font-medium">Shop</span>
          {activeCategoryObject && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-wine-800 font-semibold">
                {activeCategoryObject.name}
              </span>
            </>
          )}
        </nav>

        {/* Page Header */}
        <div className="border-b border-sand-300/80 pb-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-wine-800 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-wine-700" />
                <span>The Complete Collection</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal-900 font-normal">
                {activeCategoryObject
                  ? activeCategoryObject.name
                  : 'All Jewellery'}
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-taupe-500 max-w-xl">
                {activeCategoryObject
                  ? activeCategoryObject.description
                  : 'Timeless pieces designed for everyday elegance, made with 18K gold finishes and hypoallergenic materials.'}
              </p>
            </div>

            {/* Total Results Count */}
            <div className="text-xs text-taupe-500 tracking-wider uppercase">
              Showing {filteredAndSortedProducts.length} pieces
            </div>
          </div>
        </div>

        {/* Controls Bar: Search, Mobile Filter Trigger, Sort Dropdown */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 bg-sand-100/70 p-3.5 border border-sand-200">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-taupe-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, pearl, metal..."
              className="w-full pl-9 pr-4 py-2 bg-sand-50 border border-sand-300 text-charcoal-900 text-xs focus:outline-none focus:border-wine-700 placeholder:text-taupe-400"
            />
          </div>

          {/* Right Action: Mobile Filter & Sort */}
          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-sand-50 border border-sand-300 text-charcoal-800 text-xs font-medium hover:border-wine-700 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-wine-700" />
              <span>Filters</span>
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-2 text-xs">
              <span className="hidden sm:inline text-taupe-500 uppercase tracking-wider text-[11px]">
                Sort by:
              </span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                aria-label="Sort products"
                className="px-3 py-2 bg-sand-50 border border-sand-300 text-charcoal-900 text-xs focus:outline-none focus:border-wine-700 cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="bestselling">Best Selling</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Body: Desktop Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar (3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 bg-sand-100/40 p-6 border border-sand-200/80 sticky top-24">
            <ShopFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
            />
          </aside>

          {/* Product Grid (9 cols) */}
          <div className="lg:col-span-9">
            {filteredAndSortedProducts.length === 0 ? (
              <div className="bg-sand-100/50 border border-sand-200 p-12 text-center my-8">
                <Sparkles className="w-8 h-8 text-taupe-400 mx-auto mb-3" />
                <h3 className="font-serif text-2xl text-charcoal-900 font-normal">
                  No jewellery matches your criteria
                </h3>
                <p className="text-xs text-taupe-500 mt-2 max-w-sm mx-auto">
                  Try adjusting your price range, clearing search terms, or exploring other categories.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-wine-700 text-sand-50 text-xs uppercase tracking-widest font-semibold hover:bg-wine-800 transition-colors cursor-pointer"
                >
                  <RefreshCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        <MobileFilterDrawer
          isOpen={isMobileFilterOpen}
          onClose={() => setIsMobileFilterOpen(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
          totalResults={filteredAndSortedProducts.length}
        />
      </main>

      <Footer />
    </div>
  );
}

export default function ShopPage() {
  return (
    <CartProvider>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-sand-50 text-charcoal-700 text-sm">
            Loading jewellery catalog...
          </div>
        }
      >
        <ShopContent />
      </Suspense>
    </CartProvider>
  );
}
