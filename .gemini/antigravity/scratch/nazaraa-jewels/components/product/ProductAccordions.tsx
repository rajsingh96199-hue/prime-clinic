'use client';

import React, { useState } from 'react';
import { ChevronDown, Sparkles, ShieldCheck, HeartHandshake, Package } from 'lucide-react';
import { Product } from '@/types/product';
import { BRAND } from '@/lib/constants/brand';

export function ProductAccordions({ product }: { product: Product }) {
  const [openTab, setOpenTab] = useState<string | null>('craftsmanship');

  const toggleTab = (id: string) => {
    setOpenTab((prev) => (prev === id ? null : id));
  };

  const tabs = [
    {
      id: 'craftsmanship',
      title: 'Craftsmanship & Description',
      icon: Sparkles,
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-charcoal-700 leading-relaxed">
          <p>{product.description}</p>
          <p className="text-taupe-500">
            Hand-finished with precision focus on structural balance, smooth comfort edges, and everyday featherlight wear.
          </p>
        </div>
      ),
    },
    {
      id: 'specifications',
      title: 'Material & Specifications',
      icon: ShieldCheck,
      content: (
        <div className="space-y-2 text-xs sm:text-sm text-charcoal-700">
          <p>
            <strong className="text-charcoal-900 font-semibold">Material Base:</strong> {product.material}
          </p>
          <p>
            <strong className="text-charcoal-900 font-semibold">Colour Finish:</strong> {product.colour}
          </p>
          <p>
            <strong className="text-charcoal-900 font-semibold">SKU:</strong> {product.sku}
          </p>
          <p>
            <strong className="text-charcoal-900 font-semibold">Skin Safety:</strong> 100% Nickel-free, Lead-free, Hypoallergenic
          </p>
        </div>
      ),
    },
    {
      id: 'care',
      title: 'Jewellery Care Guide',
      icon: HeartHandshake,
      content: (
        <div className="space-y-2 text-xs sm:text-sm text-charcoal-700">
          <p>{product.careInstructions}</p>
          <ul className="list-disc pl-4 space-y-1 text-taupe-500">
            <li>Put on jewellery after applying makeup, perfumes, and lotions.</li>
            <li>Wipe gently with a soft cloth after each wear.</li>
            <li>Store in the provided velvet pouch in a dry environment.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'shipping',
      title: 'Shipping & Delivery Timelines',
      icon: Package,
      content: (
        <div className="space-y-2 text-xs sm:text-sm text-charcoal-700">
          <p>
            • <strong>Dispatched within 24–48 hours</strong> from our studio.
          </p>
          <p>
            • <strong>Standard Delivery:</strong> 3–5 business days across India.
          </p>
          <p>
            • <strong>Free Express Shipping:</strong> Automatically applied on orders above ₹{BRAND.shipping.freeThreshold}.
          </p>
          <p>
            • <strong>Packaging:</strong> Arrives in an elegant protective velvet pouch.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="divide-y divide-sand-200 border-t border-b border-sand-200 mt-8">
      {tabs.map((tab) => {
        const isOpen = openTab === tab.id;
        const Icon = tab.icon;

        return (
          <div key={tab.id} className="py-4">
            <button
              onClick={() => toggleTab(tab.id)}
              className="w-full flex items-center justify-between text-left font-serif text-base sm:text-lg text-charcoal-900 hover:text-wine-800 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-wine-700" />
                <span>{tab.title}</span>
              </span>
              <ChevronDown
                className={`w-4 h-4 text-taupe-400 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-wine-700' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="mt-3 pt-2 text-charcoal-700 animate-in fade-in duration-200">
                {tab.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
