'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  Gift,
  ArrowLeft,
  Truck,
  Sparkles,
  RefreshCw,
  ChevronRight,
} from 'lucide-react';
import { CartProvider, useCart } from '@/lib/store/cartContext';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/Button';
import { MOCK_PRODUCTS } from '@/lib/constants/products';
import { formatINR } from '@/lib/utils';

function CartPageContent() {
  const {
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
    giftNote,
    setGiftNote,
    remainingForFreeShipping,
    totalCartItems,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ text: string; isError: boolean } | null>(null);
  const [isGiftNoteOpen, setIsGiftNoteOpen] = useState(Boolean(giftNote));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;

    const res = applyCoupon(couponInput);
    setCouponFeedback({ text: res.message, isError: !res.success });
    if (res.success) setCouponInput('');
  };

  const progressToFreeShipping = Math.min(
    100,
    ((subtotal - discountAmount) / 999) * 100
  );

  const bestsellers = MOCK_PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-sand-50">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Breadcrumb Bar */}
        <nav className="flex items-center gap-1.5 text-xs text-taupe-500 mb-8 uppercase tracking-wider">
          <Link href="/" className="hover:text-wine-800 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/shop" className="hover:text-wine-800 transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-charcoal-900 font-medium">Shopping Bag</span>
        </nav>

        {/* Page Title */}
        <div className="border-b border-sand-300/80 pb-6 mb-8 flex items-baseline justify-between">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal-900 font-normal">
              Your Shopping Bag
            </h1>
            <p className="text-xs sm:text-sm text-taupe-500 mt-1">
              {totalCartItems} {totalCartItems === 1 ? 'piece' : 'pieces'} curated in your bag
            </p>
          </div>
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-charcoal-800 hover:text-wine-800 transition-colors font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {cart.length === 0 ? (
          /* Empty Bag State */
          <div className="py-12">
            <div className="bg-sand-100/60 border border-sand-200 p-12 sm:p-16 text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-sand-200 text-taupe-400 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal">
                Your bag is currently empty
              </h2>
              <p className="text-xs sm:text-sm text-taupe-500 mt-2 max-w-md mx-auto leading-relaxed">
                Discover pieces made for everyday beauty—from baroque pearl drops to liquid gold herringbone chains.
              </p>
              <Link href="/shop" className="inline-block mt-8">
                <Button variant="primary" size="lg">
                  <span>Explore Catalogue</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Bestseller Recommendations */}
            <div className="mt-16 pt-12 border-t border-sand-200">
              <div className="text-center mb-8">
                <span className="text-xs font-semibold uppercase tracking-widest text-wine-800">
                  Trending Now
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal mt-1">
                  Loved by our community
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {bestsellers.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Populated Cart Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left 7 Columns: Product Item List & Gift Option */}
            <div className="lg:col-span-7 space-y-6">
              {/* Free Shipping Notification Bar */}
              <div className="bg-sand-100 p-4 border border-sand-200 text-xs">
                {remainingForFreeShipping > 0 ? (
                  <div className="flex items-center justify-between">
                    <span className="text-charcoal-800">
                      Add <strong className="text-wine-800">{formatINR(remainingForFreeShipping)}</strong> more to qualify for <strong>Free Express Shipping</strong>
                    </span>
                    <Truck className="w-4 h-4 text-wine-700" />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-wine-800 font-medium">
                    <ShieldCheck className="w-4 h-4 text-wine-700" />
                    <span>Complimentary Express Shipping Unlocked!</span>
                  </div>
                )}
                <div className="w-full bg-sand-200 h-1.5 mt-2 rounded-full overflow-hidden">
                  <div
                    className="bg-wine-700 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>

              {/* Items Table */}
              <div className="divide-y divide-sand-200 border-t border-b border-sand-200">
                {cart.map((item) => (
                  <div key={item.product.id} className="py-6 flex gap-4 sm:gap-6">
                    {/* Thumbnail */}
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="relative w-24 h-30 sm:w-28 sm:h-36 bg-sand-200 shrink-0 border border-sand-300 overflow-hidden block"
                    >
                      <Image
                        src={item.product.images[0].url}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </Link>

                    {/* Details & Controls */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[11px] uppercase tracking-wider text-taupe-500 font-medium">
                              {item.product.categoryName} • SKU: {item.product.sku}
                            </span>
                            <Link
                              href={`/products/${item.product.slug}`}
                              className="font-serif text-base sm:text-xl text-charcoal-900 hover:text-wine-800 leading-snug block mt-0.5"
                            >
                              {item.product.name}
                            </Link>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-taupe-400 hover:text-wine-800 transition-colors p-1.5 cursor-pointer"
                            title="Remove item"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 mt-2 text-xs">
                          <span className="font-semibold text-charcoal-900 font-serif text-base">
                            {formatINR(item.product.price)}
                          </span>
                          {item.product.comparePrice && (
                            <span className="text-taupe-400 line-through">
                              {formatINR(item.product.comparePrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bottom Row: Quantity Controls & Subtotal */}
                      <div className="flex items-center justify-between pt-3 border-t border-sand-200/70 mt-3">
                        <div className="flex items-center border border-sand-300 bg-sand-50">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="px-2.5 py-1 text-charcoal-700 hover:bg-sand-200 transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 py-1 text-xs font-semibold text-charcoal-900 min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="px-2.5 py-1 text-charcoal-700 hover:bg-sand-200 transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-serif text-base sm:text-lg font-semibold text-wine-900">
                          {formatINR(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gift Message Accordion */}
              <div className="bg-sand-100/70 border border-sand-200 p-4">
                <button
                  onClick={() => setIsGiftNoteOpen(!isGiftNoteOpen)}
                  className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-charcoal-900 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-wine-700" />
                    <span>Is this order a gift? Add a complimentary card note</span>
                  </span>
                  <span className="text-wine-800 text-xs font-normal underline">
                    {isGiftNoteOpen ? 'Close' : 'Add Note'}
                  </span>
                </button>

                {isGiftNoteOpen && (
                  <div className="mt-3 pt-3 border-t border-sand-200 animate-in fade-in duration-200">
                    <textarea
                      rows={3}
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      placeholder="Write your personal gift message here (printed on luxury textured card)..."
                      className="w-full p-3 bg-sand-50 border border-sand-300 text-xs text-charcoal-900 placeholder:text-taupe-400 focus:outline-none focus:border-wine-700"
                    />
                    <p className="text-[11px] text-taupe-500 mt-1">
                      Every gift order is packed in a signature gift box with no price tags visible.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right 5 Columns: Order Summary Card */}
            <div className="lg:col-span-5 bg-sand-100 p-6 sm:p-8 border border-sand-200/80 sticky top-24 space-y-6">
              <h2 className="font-serif text-2xl text-charcoal-900 font-semibold border-b border-sand-200 pb-4">
                Order Summary
              </h2>

              {/* Promo Code Form */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-800 mb-2">
                  Promo / Gift Code
                </label>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-wine-50 border border-wine-200 text-xs">
                    <div className="flex items-center gap-2 text-wine-800 font-medium">
                      <Tag className="w-4 h-4 text-wine-700" />
                      <span>{appliedCoupon.code} applied ({appliedCoupon.discountPercent}% OFF)</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-wine-900 underline hover:text-wine-700 cursor-pointer font-medium"
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
                      placeholder="Enter promo code (e.g. NAZARAA10)"
                      className="flex-1 px-3 py-2.5 bg-sand-50 border border-sand-300 text-xs text-charcoal-900 placeholder:text-taupe-400 uppercase focus:outline-none focus:border-wine-700"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-wine-700 hover:bg-wine-800 text-sand-50 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponFeedback && (
                  <p
                    className={`text-[11px] mt-2 ${
                      couponFeedback.isError ? 'text-red-600' : 'text-emerald-700 font-medium'
                    }`}
                  >
                    {couponFeedback.text}
                  </p>
                )}
              </div>

              {/* Calculations List */}
              <div className="space-y-2.5 text-xs text-charcoal-700 border-t border-sand-200 pt-4">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-charcoal-900">{formatINR(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-wine-800 font-medium">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-{formatINR(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className={shippingFee === 0 ? 'text-emerald-700 font-semibold' : ''}>
                    {shippingFee === 0 ? 'FREE' : formatINR(shippingFee)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Taxes</span>
                  <span className="text-taupe-500">Included in prices</span>
                </div>

                <div className="flex items-baseline justify-between text-sm sm:text-base font-semibold text-charcoal-900 border-t border-sand-300 pt-3 mt-2">
                  <span>Total Amount</span>
                  <span className="font-serif text-2xl font-bold text-wine-900">
                    {formatINR(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="pt-2">
                <Link href="/checkout" className="block">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full flex items-center justify-center gap-2 py-4 text-sm"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>

              {/* Trust Badges in Summary */}
              <div className="pt-4 border-t border-sand-200/80 space-y-2 text-[11px] text-taupe-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-wine-700" />
                  <span>100% Anti-Tarnish Lifetime E-Coating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-wine-700" />
                  <span>Dispatched in 24h via Express Air</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 text-wine-700" />
                  <span>7-Day Hassle-Free Return / Exchange</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function CartPage() {
  return (
    <CartProvider>
      <CartPageContent />
    </CartProvider>
  );
}
