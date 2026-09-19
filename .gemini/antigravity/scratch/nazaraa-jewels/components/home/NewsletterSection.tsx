'use client';

import React, { useState } from 'react';
import { Mail, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { BRAND } from '@/lib/constants/brand';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section className="py-20 sm:py-24 bg-sand-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-sand-100/90 border border-sand-300/80 p-8 sm:p-14 text-center shadow-xs">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sand-200 text-wine-800 mb-4">
            <Sparkles className="w-5 h-5" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
            A little sparkle in your inbox.
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-taupe-500 max-w-md mx-auto leading-relaxed">
            Subscribe for exclusive preview access to new drops, private styling edits, and 10% off your initial order.
          </p>

          {isSubmitted ? (
            <div className="mt-8 p-4 bg-wine-50 border border-wine-200 text-wine-900 text-xs sm:text-sm flex items-center justify-center gap-2 max-w-md mx-auto animate-in zoom-in-95 duration-200">
              <Check className="w-4 h-4 text-wine-700" />
              <span>Welcome to the {BRAND.name} circle! Your 10% code is <strong>{BRAND.coupons.welcome}</strong>.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
            >
              <div className="relative w-full">
                <Mail className="w-4 h-4 text-taupe-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-10 pr-4 py-3 bg-sand-50 border border-sand-300 text-charcoal-900 placeholder:text-taupe-400 text-xs sm:text-sm focus:outline-none focus:border-wine-700"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                className="w-full sm:w-auto px-8 py-3 shrink-0 cursor-pointer"
              >
                Join Us
              </Button>
            </form>
          )}

          <p className="text-[11px] text-taupe-400 mt-4">
            We value your privacy. Unsubscribe anytime with one click.
          </p>
        </div>
      </div>
    </section>
  );
}
