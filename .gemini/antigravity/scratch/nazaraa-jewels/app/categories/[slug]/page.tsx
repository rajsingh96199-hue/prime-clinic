import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { CartProvider } from '@/lib/store/cartContext';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { getCategoryBySlug, getProducts, getCategories } from '@/lib/services/productService';
import { CategorySlug } from '@/types/product';
import { BRAND } from '@/lib/constants/brand';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: `Category Not Found | ${BRAND.name}`,
    };
  }

  return {
    title: `${category.name} | ${BRAND.name}`,
    description: `${category.description} Explore handcrafted ${category.name.toLowerCase()} at ${BRAND.name}.`,
    openGraph: {
      title: `${category.name} — ${BRAND.name}`,
      description: category.description,
      images: [{ url: category.image }],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProducts({ category: slug as CategorySlug });

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen bg-sand-50 selection:bg-wine-700 selection:text-sand-50">
        <AnnouncementBar />
        <Navbar />

        <main className="flex-1 w-full">
          {/* Category Hero Banner */}
          <div className="relative py-20 sm:py-28 overflow-hidden bg-sand-200">
            <Image
              src={category.image}
              alt={`${category.name} - ${BRAND.name}`}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-sand-50/95 via-sand-50/80 to-transparent" />
            <div className="absolute inset-0 bg-sand-900/10" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-xl">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-taupe-500 mb-4">
                  <Link href="/" className="hover:text-wine-800 transition-colors">
                    Home
                  </Link>
                  <span>/</span>
                  <Link href="/categories" className="hover:text-wine-800 transition-colors">
                    Categories
                  </Link>
                  <span>/</span>
                  <span className="text-charcoal-900 font-medium">{category.name}</span>
                </div>

                <span className="text-xs uppercase tracking-widest text-wine-800 font-semibold flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-wine-700" />
                  <span>{category.tagline}</span>
                </span>

                <h1 className="font-serif text-4xl sm:text-5xl lg:text-5.5xl text-charcoal-900 font-normal">
                  {category.name}
                </h1>

                <p className="mt-4 text-sm sm:text-base text-charcoal-800 font-light leading-relaxed">
                  {category.description}
                </p>
              </div>
            </div>
          </div>

          {/* Products Grid Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="flex items-center justify-between pb-6 border-b border-sand-200 mb-8">
              <p className="text-xs text-taupe-500">
                Showing <span className="font-semibold text-charcoal-900">{products.length}</span> pieces in {category.name}
              </p>

              <Link
                href="/categories"
                className="text-xs text-wine-800 hover:text-wine-900 font-medium flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>All Categories</span>
              </Link>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-sand-100/50 border border-sand-200 p-8">
                <p className="font-serif text-xl text-charcoal-900 font-medium">
                  No pieces found in this category right now.
                </p>
                <p className="text-xs text-taupe-500 mt-2">
                  We are continually handcrafting and adding new designs.
                </p>
                <Link
                  href="/new-arrivals"
                  className="inline-block mt-6 px-6 py-2.5 bg-wine-700 text-sand-50 text-xs uppercase tracking-widest font-semibold hover:bg-wine-800 transition-colors"
                >
                  View New Arrivals
                </Link>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
}
