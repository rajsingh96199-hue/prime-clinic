import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'wine' | 'sand' | 'charcoal' | 'outline' | 'discount';
}

export function Badge({
  className,
  variant = 'wine',
  children,
  ...props
}: BadgeProps) {
  const variants = {
    wine: 'bg-wine-700 text-sand-50 font-medium',
    sand: 'bg-sand-200 text-charcoal-900 border border-sand-300 font-medium',
    charcoal: 'bg-charcoal-900 text-sand-50 font-medium',
    outline: 'border border-charcoal-900/30 text-charcoal-800 bg-sand-50/80 backdrop-blur-xs font-normal',
    discount: 'bg-wine-100 text-wine-800 border border-wine-200 font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 text-[10px] sm:text-xs tracking-wider uppercase',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
