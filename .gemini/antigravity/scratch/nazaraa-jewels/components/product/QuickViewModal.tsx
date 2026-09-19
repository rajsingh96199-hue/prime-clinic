'use client';

import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, ShieldCheck, RefreshCw, Truck } from 'lucide-react';
import Image from 'next/image';
import { Product } from '@/types/product';
import { useCart } from '@/lib/store/cartContext';
import { formatINR, calculateDiscount } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const discount = calculateDiscount(product.price, product.comparePrice);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-charcoal-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-4xl bg-sand-50 border border-sand-300 shadow-2xl overflow-hidden rounded-xs z-10 max-h-[90vh] flex flex-col md:flex-row">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-charcoal-700 hover:text-wine-800 bg-sand-100/80 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Image Gallery */}
        <div className="w-full md:w-1/2 p-6 flex flex-col items-center justify-between bg-sand-100/50">
          <div className="relative w-full aspect-4/5 bg-sand-200 overflow-hidden shadow-xs">
            <Image
              src={product.images[selectedImageIndex]?.url || product.images[0].url}
              alt={product.name}
              fill
              className="object-cover transition-all duration-300"
            />
            {product.isNewArrival && (
              <Badge variant="wine" className="absolute top-3 left-3">
                New
              </Badge>
            )}
            {product.isBestseller && !product.isNewArrival && (
              <Badge variant="charcoal" className="absolute top-3 left-3">
                Bestseller
              </Badge>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 mt-4 w-full justify-center">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-16 h-20 bg-sand-200 overflow-hidden border-2 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-wine-700 opacity-100'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Information */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-taupe-500 font-medium">
                {product.categoryName} • SKU: {product.sku}
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-900 mt-1">
                {product.name}
              </h3>

              {/* Reviews & Rating */}
              <div className="flex items-center gap-2 mt-2 text-xs text-taupe-500">
                <div className="flex items-center text-wine-700">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="ml-1 font-semibold text-charcoal-900">
                    {product.rating}
                  </span>
                </div>
                <span>•</span>
                <span>{product.reviewCount} customer reviews</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-2xl font-serif font-semibold text-wine-900">
                {formatINR(product.price)}
              </span>
              {product.comparePrice && (
                <span className="text-sm text-taupe-400 line-through">
                  {formatINR(product.comparePrice)}
                </span>
              )}
              {discount && (
                <Badge variant="discount">{discount}% OFF</Badge>
              )}
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-charcoal-800 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Specs */}
            <div className="bg-sand-100 p-4 space-y-2 text-xs border border-sand-200 rounded-xs">
              <p>
                <strong className="text-charcoal-900">Material:</strong>{' '}
                <span className="text-charcoal-700">{product.material}</span>
              </p>
              <p>
                <strong className="text-charcoal-900">Colour:</strong>{' '}
                <span className="text-charcoal-700">{product.colour}</span>
              </p>
              <p>
                <strong className="text-charcoal-900">Care:</strong>{' '}
                <span className="text-charcoal-700">{product.careInstructions}</span>
              </p>
            </div>

            {/* Quality Perks */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-taupe-500 pt-2">
              <div className="flex flex-col items-center gap-1 p-2 bg-sand-100/50">
                <ShieldCheck className="w-4 h-4 text-wine-700" />
                <span>Anti-Tarnish</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 bg-sand-100/50">
                <Truck className="w-4 h-4 text-wine-700" />
                <span>Free Ship &gt; ₹999</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 bg-sand-100/50">
                <RefreshCw className="w-4 h-4 text-wine-700" />
                <span>Easy 7-Day Return</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 mt-6 border-t border-sand-200 space-y-3">
            <div className="flex gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-sand-300 bg-sand-50">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-charcoal-700 hover:bg-sand-200 transition-colors"
                >
                  -
                </button>
                <span className="px-3 py-2 text-xs font-semibold text-charcoal-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-charcoal-700 hover:bg-sand-200 transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <Button
                variant="primary"
                className="flex-1 flex items-center justify-center gap-2"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </Button>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 border border-sand-300 transition-colors ${
                  wishlisted
                    ? 'bg-wine-100 border-wine-300 text-wine-700'
                    : 'bg-sand-50 text-charcoal-700 hover:text-wine-700 hover:border-wine-700'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
