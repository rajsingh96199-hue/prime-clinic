'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { BRAND } from '@/lib/constants/brand';

const ANNOUNCEMENTS = [
  {
    text: `Complimentary Express Shipping on Orders Above ₹${BRAND.shipping.freeThreshold}`,
    cta: 'Shop Now',
    href: '/new-arrivals',
  },
  {
    text: `Use Code ${BRAND.coupons.welcome} for 10% Off Your First Order`,
    cta: 'Explore Collection',
    href: '/categories',
  },
  {
    text: '18K Gold Plated • Hypoallergenic • Anti-Tarnish Quality',
    cta: 'Our Philosophy',
    href: '/about',
  },
];

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = ANNOUNCEMENTS[currentIndex];

  return (
    <div className="bg-wine-900 text-sand-50 text-[11px] sm:text-xs py-2 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center tracking-wider font-medium relative">
        <div className="flex items-center gap-2 transition-all duration-500">
          <Sparkles className="w-3 h-3 text-wine-200 hidden sm:inline-block" />
          <span>{current.text}</span>
          <Link
            href={current.href}
            className="underline underline-offset-4 decoration-wine-400 hover:text-wine-200 inline-flex items-center gap-1 font-semibold ml-1 transition-colors"
          >
            {current.cta}
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
