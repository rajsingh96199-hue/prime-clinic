'use client';

import React from 'react';
import { X, ArrowRight, MessageCircle, Mail } from 'lucide-react';
import Link from 'next/link';
import { InstagramIcon } from '@/components/ui/Icons';
import { CATEGORIES } from '@/lib/constants/products';
import { BRAND } from '@/lib/constants/brand';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
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
      <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-sand-50 border-r border-sand-300 shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-sand-200">
            <Link
              href="/"
              onClick={onClose}
              className="font-serif text-2xl tracking-wider text-charcoal-900 font-semibold"
            >
              Nazaara <span className="text-wine-700">Jewels</span>
            </Link>
            <button
              onClick={onClose}
              className="p-2 text-charcoal-700 hover:text-wine-800 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="py-6 space-y-4">
            <Link
              href="/"
              onClick={onClose}
              className="block text-base font-medium tracking-wide text-charcoal-900 hover:text-wine-700 py-1"
            >
              Home
            </Link>

            <Link
              href="/new-arrivals"
              onClick={onClose}
              className="flex items-center justify-between text-base font-medium tracking-wide text-charcoal-900 hover:text-wine-700 py-1"
            >
              <span>New Arrivals</span>
              <span className="text-[10px] bg-wine-100 text-wine-800 px-2 py-0.5 rounded-xs font-semibold uppercase tracking-wider">
                Fresh Drop
              </span>
            </Link>

            <div>
              <Link
                href="/categories"
                onClick={onClose}
                className="flex items-center justify-between text-base font-medium tracking-wide text-charcoal-900 hover:text-wine-700 py-1"
              >
                <span>Categories</span>
                <ArrowRight className="w-4 h-4 text-taupe-400" />
              </Link>

              {/* Sub-categories (8 Primary Categories) */}
              <div className="pl-4 space-y-2 pt-2 pb-2 mt-1 border-l-2 border-sand-200">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    onClick={onClose}
                    className="block text-sm text-taupe-500 hover:text-wine-800 transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/about"
              onClick={onClose}
              className="block text-base font-medium tracking-wide text-charcoal-900 hover:text-wine-700 py-1"
            >
              About
            </Link>
          </nav>
        </div>

        {/* Footer Info & Working Socials/Contact */}
        <div className="pt-6 border-t border-sand-200 space-y-4">
          <p className="text-xs text-taupe-500 leading-relaxed">
            {BRAND.tagline} {BRAND.shortPhilosophy}
          </p>
          
          <div className="flex flex-col gap-2.5 pt-1 text-xs">
            <a
              href={BRAND.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-medium text-charcoal-800 hover:text-wine-700 transition-colors"
            >
              <InstagramIcon className="w-4 h-4 text-wine-700 shrink-0" />
              <span>{BRAND.instagram.handle}</span>
            </a>

            <a
              href={BRAND.whatsapp.getLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-medium text-charcoal-800 hover:text-wine-700 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-wine-700 shrink-0" />
              <span>WhatsApp: {BRAND.whatsapp.number}</span>
            </a>

            <a
              href={BRAND.email.mailto}
              className="flex items-center gap-2 font-medium text-charcoal-800 hover:text-wine-700 transition-colors"
            >
              <Mail className="w-4 h-4 text-wine-700 shrink-0" />
              <span>{BRAND.email.address}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
