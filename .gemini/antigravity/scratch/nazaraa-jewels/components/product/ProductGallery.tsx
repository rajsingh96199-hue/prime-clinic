'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ProductImage } from '@/types/product';
import { Badge } from '@/components/ui/Badge';
import { ZoomIn } from 'lucide-react';

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
  isNewArrival?: boolean;
  isBestseller?: boolean;
  discountPercentage?: number | null;
}

export function ProductGallery({
  images,
  productName,
  isNewArrival,
  isBestseller,
  discountPercentage,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const activeImage = images[selectedIndex] || images[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails (Left side on desktop, Bottom on mobile) */}
      {images.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[580px] scrollbar-none shrink-0">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-16 h-20 sm:w-20 sm:h-24 bg-sand-200 border-2 transition-all cursor-pointer shrink-0 ${
                selectedIndex === idx
                  ? 'border-wine-700 opacity-100 shadow-xs'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={img.url}
                alt={img.alt || `${productName} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Large Staging Image with Zoom */}
      <div
        className="relative flex-1 aspect-4/5 bg-sand-200 border border-sand-300 shadow-sm overflow-hidden cursor-crosshair group"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={activeImage.url}
          alt={activeImage.alt || productName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={`object-cover transition-transform duration-200 ease-out ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          style={
            isZoomed
              ? {
                  transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                }
              : undefined
          }
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
          {isNewArrival && <Badge variant="wine">New Drop</Badge>}
          {isBestseller && !isNewArrival && <Badge variant="charcoal">Bestseller</Badge>}
          {discountPercentage && (
            <Badge variant="discount">{discountPercentage}% OFF</Badge>
          )}
        </div>

        {/* Zoom Hint Icon */}
        <div className="absolute bottom-4 right-4 p-2 bg-sand-50/80 backdrop-blur-xs text-charcoal-700 rounded-full opacity-75 group-hover:opacity-0 transition-opacity">
          <ZoomIn className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
