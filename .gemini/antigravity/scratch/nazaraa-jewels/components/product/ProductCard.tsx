'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/lib/store/cartContext';
import { formatINR, calculateDiscount } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { QuickViewModal } from './QuickViewModal';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const discount = calculateDiscount(product.price, product.comparePrice);
  const wishlisted = isWishlisted(product.id);
  const hasSecondaryImage = product.images.length > 1;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleWishlist(product.id);
  };

  return (
    <>
      <div
        id={`product-${product.slug}`}
        className={`group relative flex flex-col bg-transparent transition-all duration-300 ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container with Luxury 4:5 Aspect Ratio */}
        <div className="relative aspect-4/5 w-full overflow-hidden bg-sand-200 border border-sand-300/60 shadow-xs">
          <Link href={`/products/${product.slug}`} className="block w-full h-full">
            {/* Primary Image */}
            <Image
              src={product.images[0].url}
              alt={product.images[0].alt || product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover object-center transition-all duration-700 ease-out ${
                hasSecondaryImage && isHovered
                  ? 'opacity-0 scale-105'
                  : 'opacity-100 group-hover:scale-105'
              }`}
            />

            {/* Secondary Image for Hover Flip */}
            {hasSecondaryImage && (
              <Image
                src={product.images[1].url}
                alt={product.images[1].alt || `${product.name} alternate view`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className={`object-cover object-center transition-all duration-700 ease-out ${
                  isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                }`}
              />
            )}
          </Link>

          {/* Badges (Top Left) */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
            {product.isNewArrival && <Badge variant="wine">New</Badge>}
            {product.isBestseller && !product.isNewArrival && (
              <Badge variant="charcoal">Bestseller</Badge>
            )}
            {discount && <Badge variant="discount">{discount}% OFF</Badge>}
          </div>

          {/* Wishlist Button (Top Right) */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full transition-all duration-200 ${
              wishlisted
                ? 'bg-wine-700 text-sand-50 shadow-md'
                : 'bg-sand-50/90 text-charcoal-700 hover:text-wine-700 hover:bg-sand-50 shadow-xs opacity-90 sm:opacity-0 sm:group-hover:opacity-100'
            }`}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform active:scale-125 ${
                wishlisted ? 'fill-current' : ''
              }`}
            />
          </button>

          {/* Desktop Hover Quick Actions Overlay (Bottom) */}
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-charcoal-900/60 via-charcoal-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 translate-y-2 group-hover:translate-y-0 z-10">
            <button
              onClick={handleQuickAdd}
              disabled={isAdded}
              className={`flex-1 py-2 px-3 text-xs tracking-widest uppercase font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                isAdded
                  ? 'bg-wine-800 text-sand-50'
                  : 'bg-sand-50 text-charcoal-900 hover:bg-wine-700 hover:text-sand-50 shadow-md'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Quick Add</span>
                </>
              )}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsQuickViewOpen(true);
              }}
              className="p-2 bg-sand-50 text-charcoal-900 hover:bg-wine-700 hover:text-sand-50 transition-colors shadow-md cursor-pointer"
              title="Quick View"
              aria-label="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="pt-3 pb-1 flex flex-col justify-between flex-1">
          <div>
            <Link
              href={`/categories/${product.category}`}
              className="text-[11px] uppercase tracking-widest text-taupe-500 font-medium hover:text-wine-800 transition-colors"
            >
              {product.categoryName}
            </Link>
            <Link href={`/products/${product.slug}`} className="block">
              <h3 className="font-serif text-base sm:text-lg text-charcoal-900 hover:text-wine-800 transition-colors leading-snug line-clamp-1 mt-0.5">
                {product.name}
              </h3>
            </Link>
          </div>

          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="text-sm sm:text-base font-semibold text-charcoal-900 font-serif">
              {formatINR(product.price)}
            </span>
            {product.comparePrice && (
              <span className="text-xs text-taupe-400 line-through">
                {formatINR(product.comparePrice)}
              </span>
            )}
          </div>

          {/* Mobile Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            className="mt-2.5 sm:hidden w-full py-1.5 px-2 text-[11px] font-semibold tracking-wider uppercase border border-charcoal-800/40 text-charcoal-900 bg-sand-100 hover:bg-wine-700 hover:text-sand-50 transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            {isAdded ? (
              <>
                <Check className="w-3 h-3 text-wine-700" />
                <span>In Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3 h-3" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
