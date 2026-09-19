'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ArrowUp, Mail, MessageCircle } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/Icons';
import { BRAND } from '@/lib/constants/brand';
import { CATEGORIES } from '@/lib/constants/products';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-sand-100 border-t border-sand-300 text-charcoal-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-sand-300/80">
          {/* Col 1: Brand Info (2 cols wide on large) */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="font-serif text-2xl sm:text-3xl tracking-wider text-charcoal-900 font-semibold inline-block"
            >
              Nazaara <span className="text-wine-700">Jewels</span>
            </Link>
            <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed max-w-sm font-light">
              {BRAND.tagline} {BRAND.subtagline}
            </p>

            {/* Social & Direct Contact Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={BRAND.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-sand-50 border border-sand-300 hover:border-wine-700 hover:text-wine-700 transition-colors rounded-xs text-charcoal-800"
                aria-label={`Follow ${BRAND.instagram.handle} on Instagram`}
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={BRAND.whatsapp.getLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-sand-50 border border-sand-300 hover:border-wine-700 hover:text-wine-700 transition-colors rounded-xs text-charcoal-800"
                aria-label="Chat with Nazaara Jewels on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={BRAND.email.mailto}
                className="p-2.5 bg-sand-50 border border-sand-300 hover:border-wine-700 hover:text-wine-700 transition-colors rounded-xs text-charcoal-800"
                aria-label="Send email to Nazaara Jewels"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-wine-800 font-semibold">
              Navigation
            </p>
            <ul className="space-y-2.5 text-xs text-charcoal-700">
              <li>
                <Link href="/" className="hover:text-wine-700 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="hover:text-wine-700 transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-wine-700 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-wine-700 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-wine-700 transition-colors">
                  Shopping Bag
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Jewellery Categories */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-wine-800 font-semibold">
              Categories
            </p>
            <ul className="grid grid-cols-1 gap-2 text-xs text-charcoal-700">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="hover:text-wine-700 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/categories"
                  className="text-wine-800 font-medium hover:underline inline-block pt-1"
                >
                  View All 8 Collections →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Customer Support */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-wine-800 font-semibold">
              Customer Support
            </p>
            <ul className="space-y-3 text-xs text-charcoal-700">
              <li>
                <span className="block text-[11px] text-taupe-500 uppercase tracking-wider">WhatsApp</span>
                <a
                  href={BRAND.whatsapp.getLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-charcoal-900 hover:text-wine-700 transition-colors inline-block pt-0.5"
                >
                  {BRAND.whatsapp.number}
                </a>
              </li>
              <li>
                <span className="block text-[11px] text-taupe-500 uppercase tracking-wider">Email</span>
                <a
                  href={BRAND.email.mailto}
                  className="font-medium text-charcoal-900 hover:text-wine-700 transition-colors inline-block pt-0.5"
                >
                  {BRAND.email.address}
                </a>
              </li>
              <li>
                <span className="block text-[11px] text-taupe-500 uppercase tracking-wider">Instagram</span>
                <a
                  href={BRAND.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-charcoal-900 hover:text-wine-700 transition-colors inline-block pt-0.5"
                >
                  {BRAND.instagram.handle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-taupe-500">
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>

          <div className="flex items-center gap-1 text-[11px]">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-wine-700 fill-current mx-0.5" />
            <span>for effortless everyday beauty & confidence.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-charcoal-800 hover:text-wine-700 transition-colors p-1 cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
