'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, Menu } from 'lucide-react';
import { useCart } from '@/lib/store/cartContext';
import { MobileMenu } from './MobileMenu';
import { SearchModal } from './SearchModal';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { BRAND } from '@/lib/constants/brand';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalCartItems, wishlist, setIsSearchOpen, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-sand-50/95 backdrop-blur-md shadow-xs border-b border-sand-200 py-3'
            : 'bg-sand-50/80 backdrop-blur-xs py-4 sm:py-5 border-b border-sand-200/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Mobile Menu Button & Desktop Nav */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 text-charcoal-900 hover:text-wine-700 transition-colors cursor-pointer"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <nav className="hidden lg:flex items-center gap-8 text-xs tracking-widest uppercase font-medium text-charcoal-800">
                <Link
                  href="/"
                  className="hover:text-wine-700 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-wine-700 hover:after:w-full after:transition-all after:duration-300"
                >
                  Home
                </Link>
                <Link
                  href="/new-arrivals"
                  className="hover:text-wine-700 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-wine-700 hover:after:w-full after:transition-all after:duration-300"
                >
                  New Arrivals
                </Link>
                <Link
                  href="/categories"
                  className="hover:text-wine-700 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-wine-700 hover:after:w-full after:transition-all after:duration-300"
                >
                  Categories
                </Link>
                <Link
                  href="/about"
                  className="hover:text-wine-700 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-wine-700 hover:after:w-full after:transition-all after:duration-300"
                >
                  About
                </Link>
              </nav>
            </div>

            {/* Center: Brand Logo */}
            <div className="text-center">
              <Link
                href="/"
                className="font-serif text-2xl sm:text-3xl lg:text-3.5xl tracking-widest text-charcoal-900 font-semibold inline-block hover:opacity-95 transition-opacity"
              >
                Nazaara <span className="text-wine-700">Jewels</span>
              </Link>
            </div>

            {/* Right: Actions (Search, Wishlist, Cart) */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-charcoal-800 hover:text-wine-700 transition-colors relative cursor-pointer"
                aria-label="Search collection"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  window.location.href = '/shop?sort=bestselling';
                }}
                className="p-2 text-charcoal-800 hover:text-wine-700 transition-colors relative hidden sm:block cursor-pointer"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-wine-700 text-sand-50 text-[10px] rounded-full flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-charcoal-800 hover:text-wine-700 transition-colors relative cursor-pointer"
                aria-label="Open Cart Drawer"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalCartItems > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-wine-700 text-sand-50 text-[10px] rounded-full flex items-center justify-center font-bold animate-in zoom-in duration-200">
                    {totalCartItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Modals & Drawers */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <SearchModal />
      <CartDrawer />
    </>
  );
}
