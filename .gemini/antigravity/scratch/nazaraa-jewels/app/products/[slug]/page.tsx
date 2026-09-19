import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight, Star, ShieldCheck, Truck, RefreshCw, Sparkles, Gem, MessageCircle } from 'lucide-react';
import { CartProvider } from '@/lib/store/cartContext';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductOrderActions } from '@/components/product/ProductOrderActions';
import { ProductAccordions } from '@/components/product/ProductAccordions';
import { ProductCard } from '@/components/product/ProductCard';
import { Badge } from '@/components/ui/Badge';
import { getProductBySlug, getProducts, getRelatedProducts } from '@/lib/services/productService';
import { formatINR, calculateDiscount } from '@/lib/utils';
import { BRAND } from '@/lib/constants/brand';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: `Product Not Found | ${BRAND.name}`,
    };
  }

  const discount = calculateDiscount(product.price, product.comparePrice);

  return {
    title: `${product.name} | ${BRAND.name}`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} — ${BRAND.name}`,
      description: product.shortDescription,
      images: product.images.map((img) => ({ url: img.url, alt: img.alt })),
      type: 'article',
    },
    alternates: {
      canonical: `${BRAND.website}/products/${product.slug}`,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const discount = calculateDiscount(product.price, product.comparePrice);
  const relatedProducts = await getRelatedProducts(product.id, product.category, 4);

  // Schema.org Product Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images.map((i) => i.url),
    description: product.description,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: BRAND.name,
    },
    offers: {
      '@type': 'Offer',
      url: `${BRAND.website}/products/${product.slug}`,
      priceCurrency: 'INR',
      price: product.price,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <CartProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-col min-h-screen bg-sand-50 selection:bg-wine-700 selection:text-sand-50">
        <AnnouncementBar />
        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
          {/* Breadcrumb Bar */}
          <nav className="flex items-center gap-1.5 text-xs text-taupe-500 mb-8 uppercase tracking-wider overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-wine-800 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link href="/categories" className="hover:text-wine-800 transition-colors">
              Categories
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link
              href={`/categories/${product.category}`}
              className="hover:text-wine-800 transition-colors"
            >
              {product.categoryName}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-charcoal-900 font-medium truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </nav>

          {/* Main Product Presentation Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left 7 Columns: Interactive Image Gallery */}
            <div className="lg:col-span-7">
              <ProductGallery
                images={product.images}
                productName={product.name}
                isNewArrival={product.isNewArrival}
                isBestseller={product.isBestseller}
                discountPercentage={discount}
              />
            </div>

            {/* Right 5 Columns: Specification & Actions */}
            <div className="lg:col-span-5 space-y-6">
              {/* Category & Title */}
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs uppercase tracking-widest text-wine-800 font-semibold">
                    {product.categoryName}
                  </span>
                  <span className="text-[11px] text-taupe-400">
                    SKU: {product.sku}
                  </span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal mt-2 leading-tight">
                  {product.name}
                </h1>

                {/* Rating & Stock */}
                <div className="flex items-center gap-3 mt-3 text-xs text-taupe-500">
                  <div className="flex items-center text-wine-700">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1 font-semibold text-charcoal-900">
                      {product.rating}
                    </span>
                  </div>
                  <span>•</span>
                  <span>{product.reviewCount} customer reviews</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-medium">
                    {product.stockQuantity > 5 ? 'In Stock' : `Only ${product.stockQuantity} left`}
                  </span>
                </div>
              </div>

              {/* Price Row */}
              <div className="pt-2 border-t border-sand-200 flex items-baseline gap-3">
                <span className="font-serif text-3xl sm:text-3.5xl font-semibold text-wine-900">
                  {formatINR(product.price)}
                </span>
                {product.comparePrice && (
                  <span className="text-base text-taupe-400 line-through">
                    {formatINR(product.comparePrice)}
                  </span>
                )}
                {discount && (
                  <Badge variant="discount">{discount}% OFF</Badge>
                )}
                <span className="text-[11px] text-taupe-400 ml-auto">
                  Inclusive of all taxes
                </span>
              </div>

              {/* Short Editorial Copy */}
              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-light">
                {product.shortDescription}
              </p>

              {/* Material Highlights Pill Row */}
              <div className="bg-sand-100 p-4 border border-sand-200 text-xs space-y-1.5">
                <p>
                  <strong className="text-charcoal-900">Finish:</strong>{' '}
                  <span className="text-charcoal-700">{product.material}</span>
                </p>
                <p>
                  <strong className="text-charcoal-900">Colour:</strong>{' '}
                  <span className="text-charcoal-700">{product.colour}</span>
                </p>
              </div>

              {/* Order Actions (Quantity, Add to Bag, Buy Now, Wishlist) */}
              <ProductOrderActions product={product} />

              {/* WhatsApp Inquiry Link */}
              <a
                href={BRAND.whatsapp.getProductInquiryLink(product.name, product.sku)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-sand-100 hover:bg-sand-200 border border-sand-300 text-charcoal-800 text-xs uppercase tracking-wider font-semibold transition-colors rounded-xs"
              >
                <MessageCircle className="w-4 h-4 text-wine-700" />
                <span>Ask about this piece on WhatsApp</span>
              </a>

              {/* Quality & Trust Badges */}
              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-sand-200 text-xs text-charcoal-800">
                <div className="flex items-center gap-2 p-2.5 bg-sand-100/60 border border-sand-200/80">
                  <ShieldCheck className="w-4 h-4 text-wine-700 shrink-0" />
                  <span>Anti-Tarnish Finish</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-sand-100/60 border border-sand-200/80">
                  <Gem className="w-4 h-4 text-wine-700 shrink-0" />
                  <span>18K Gold Plated</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-sand-100/60 border border-sand-200/80">
                  <Truck className="w-4 h-4 text-wine-700 shrink-0" />
                  <span>Free Shipping &gt; ₹{BRAND.shipping.freeThreshold}</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-sand-100/60 border border-sand-200/80">
                  <RefreshCw className="w-4 h-4 text-wine-700 shrink-0" />
                  <span>7-Day Easy Exchange</span>
                </div>
              </div>

              {/* Accordions */}
              <ProductAccordions product={product} />
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-20 pt-16 border-t border-sand-300/80">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs uppercase tracking-widest text-wine-800 font-semibold">
                    Complete The Look
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-900 mt-1 font-normal">
                    You May Also Adore
                  </h2>
                </div>
                <Link
                  href={`/categories/${product.category}`}
                  className="text-xs text-wine-800 hover:text-wine-900 font-medium hidden sm:inline-block"
                >
                  View More in {product.categoryName} →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((rel) => (
                  <ProductCard key={rel.id} product={rel} />
                ))}
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
}
