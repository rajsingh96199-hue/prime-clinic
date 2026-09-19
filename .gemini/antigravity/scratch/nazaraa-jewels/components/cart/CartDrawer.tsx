'use client';

import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/store/cartContext';
import { formatINR } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    shippingFee,
    finalTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    remainingForFreeShipping,
    totalCartItems,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;

    const res = applyCoupon(couponInput);
    setCouponMessage({ text: res.message, isError: !res.success });
    if (res.success) setCouponInput('');
  };

  const progressToFreeShipping = Math.min(
    100,
    ((subtotal - discountAmount) / 999) * 100
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-sand-50 border-l border-sand-300 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-sand-200 bg-sand-100/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-wine-800" />
              <h2 className="font-serif text-xl sm:text-2xl text-charcoal-900 tracking-wide">
                Your Bag ({totalCartItems})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-charcoal-700 hover:text-wine-800 hover:bg-sand-200 transition-colors rounded-xs cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-sand-100 px-6 py-3 border-b border-sand-200 text-xs">
            {remainingForFreeShipping > 0 ? (
              <p className="text-charcoal-800">
                Add <span className="font-semibold text-wine-800">{formatINR(remainingForFreeShipping)}</span> more for <span className="font-medium text-charcoal-900">Free Shipping</span>
              </p>
            ) : (
              <p className="text-wine-800 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-wine-700" />
                <span>You have unlocked Free Shipping!</span>
              </p>
            )}
            <div className="w-full bg-sand-200 h-1.5 mt-2 rounded-full overflow-hidden">
              <div
                className="bg-wine-700 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-sand-200">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-sand-200 flex items-center justify-center mb-4 text-taupe-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl text-charcoal-900">Your bag is empty</h3>
                <p className="text-xs text-taupe-500 mt-2 max-w-xs">
                  Discover our everyday pieces and find something uniquely made for you.
                </p>
                <Button
                  variant="primary"
                  className="mt-6"
                  onClick={() => {
                    setIsCartOpen(false);
                    window.location.href = '/shop';
                  }}
                >
                  Start Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="pt-4 first:pt-0 flex gap-4">
                    {/* Thumbnail */}
                    <Link
                      href={`/products/${item.product.slug}`}
                      onClick={() => setIsCartOpen(false)}
                      className="relative w-20 h-24 bg-sand-200 shrink-0 overflow-hidden block"
                    >
                      <Image
                        src={item.product.images[0].url}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/products/${item.product.slug}`}
                            onClick={() => setIsCartOpen(false)}
                            className="font-serif text-sm sm:text-base text-charcoal-900 hover:text-wine-800 leading-snug line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-taupe-400 hover:text-wine-800 transition-colors p-1 cursor-pointer"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-taupe-500 mt-0.5 uppercase tracking-wider">
                          {item.product.categoryName}
                        </p>
                        <p className="text-xs text-charcoal-800 font-semibold mt-1">
                          {formatINR(item.product.price)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-sand-200/60">
                        <div className="flex items-center border border-sand-300 bg-sand-50 rounded-xs">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-sand-200 text-charcoal-700 transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 py-0.5 text-xs font-medium text-charcoal-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-sand-200 text-charcoal-700 transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-xs font-semibold text-wine-800">
                          {formatINR(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Promo Code Trigger */}
                <div className="pt-4 border-t border-sand-200">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-2.5 bg-wine-50 border border-wine-200 text-xs">
                      <div className="flex items-center gap-1.5 text-wine-800 font-medium">
                        <Tag className="w-3.5 h-3.5 text-wine-700" />
                        <span>{appliedCoupon.code} ({appliedCoupon.discountPercent}% OFF)</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-[11px] text-wine-900 hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Promo code (e.g. NAZARAA10)"
                        className="flex-1 px-3 py-1.5 bg-sand-50 border border-sand-300 text-xs focus:outline-none focus:border-wine-700 uppercase"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-sand-200 hover:bg-sand-300 text-charcoal-900 text-xs font-semibold uppercase tracking-wider cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {couponMessage && (
                    <p className={`text-[11px] mt-1.5 ${couponMessage.isError ? 'text-red-600' : 'text-emerald-700'}`}>
                      {couponMessage.text}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-sand-200 bg-sand-100/70 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-charcoal-700">
                  <span>Subtotal</span>
                  <span className="font-medium text-charcoal-900">{formatINR(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-wine-800 font-medium">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-{formatINR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-charcoal-700">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? 'FREE' : formatINR(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-charcoal-900 pt-2 border-t border-sand-200">
                  <span>Estimated Total</span>
                  <span className="text-wine-800 text-base font-serif font-bold">
                    {formatINR(finalTotal)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="flex-1 py-3 px-3 border border-sand-300 bg-sand-50 hover:bg-sand-200 text-center text-xs uppercase tracking-widest font-semibold text-charcoal-900 transition-colors"
                >
                  View Bag
                </Link>
                <Button
                  variant="primary"
                  className="flex-2 flex items-center justify-center gap-2 py-3"
                  onClick={() => {
                    setIsCartOpen(false);
                    window.location.href = '/checkout';
                  }}
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              <p className="text-[10px] text-center text-taupe-500 tracking-wider">
                100% Anti-Tarnish Guarantee • Dispatched within 24h
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
