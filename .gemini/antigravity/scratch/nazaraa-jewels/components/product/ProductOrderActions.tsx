'use client';

import React, { useState } from 'react';
import { ShoppingBag, Heart, Zap, Check } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/lib/store/cartContext';
import { Button } from '@/components/ui/Button';

export function ProductOrderActions({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted, setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity);
    setTimeout(() => setIsAdding(false), 1200);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setIsCartOpen(true);
  };

  return (
    <div className="space-y-4 pt-4">
      {/* Quantity & Wishlist Row */}
      <div className="flex items-center gap-4">
        <div className="flex items-center border border-sand-300 bg-sand-50">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3.5 py-2.5 text-charcoal-800 hover:bg-sand-200 transition-colors text-sm"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="px-4 py-2.5 text-xs font-semibold text-charcoal-900 min-w-[2.5rem] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3.5 py-2.5 text-charcoal-800 hover:bg-sand-200 transition-colors text-sm"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 border transition-colors text-xs font-semibold tracking-wider uppercase cursor-pointer ${
            wishlisted
              ? 'bg-wine-100 border-wine-300 text-wine-800'
              : 'bg-sand-50 border-sand-300 text-charcoal-800 hover:text-wine-800 hover:border-wine-800'
          }`}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current text-wine-700' : ''}`} />
          <span>{wishlisted ? 'In Wishlist' : 'Add to Wishlist'}</span>
        </button>
      </div>

      {/* Primary Action Buttons: Add to Bag & Buy Now */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="primary"
          size="lg"
          className="flex-1 flex items-center justify-center gap-2 shadow-sm"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {isAdding ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added to Bag!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>{product.inStock ? 'Add to Bag' : 'Out of Stock'}</span>
            </>
          )}
        </Button>

        <Button
          variant="secondary"
          size="lg"
          className="flex-1 flex items-center justify-center gap-2 border-sand-400 bg-sand-200 hover:bg-sand-300"
          onClick={handleBuyNow}
          disabled={!product.inStock}
        >
          <Zap className="w-4 h-4 text-wine-800" />
          <span>Buy Now</span>
        </Button>
      </div>
    </div>
  );
}
