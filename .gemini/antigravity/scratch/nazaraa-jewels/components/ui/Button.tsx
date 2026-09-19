'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'wineOutline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine-700/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer uppercase text-xs sm:text-sm';

    const variants = {
      primary:
        'bg-wine-700 text-sand-50 hover:bg-wine-800 active:bg-wine-900 shadow-sm border border-transparent',
      secondary:
        'bg-sand-200 text-charcoal-900 hover:bg-sand-300 active:bg-sand-400 border border-sand-300',
      outline:
        'bg-transparent text-charcoal-900 border border-charcoal-800/40 hover:border-charcoal-900 hover:bg-sand-100',
      wineOutline:
        'bg-transparent text-wine-700 border border-wine-700 hover:bg-wine-700 hover:text-sand-50',
      ghost:
        'bg-transparent text-charcoal-900 hover:bg-sand-100 hover:text-wine-700',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs tracking-wider',
      md: 'px-5 py-2.5 text-xs sm:text-sm tracking-widest',
      lg: 'px-8 py-3.5 text-sm sm:text-base tracking-widest font-semibold',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Please wait...</span>
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
