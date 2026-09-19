import { Product, Category, CategorySlug } from '@/types/product';
import { MOCK_PRODUCTS, CATEGORIES } from '@/lib/constants/products';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

export interface ProductFilterOptions {
  category?: CategorySlug | 'all';
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  isNewArrival?: boolean;
  query?: string;
  sort?: 'featured' | 'newest' | 'price-low' | 'price-high' | 'bestselling';
}

export async function getProducts(options: ProductFilterOptions = {}): Promise<Product[]> {
  const {
    category = 'all',
    minPrice,
    maxPrice,
    inStockOnly = false,
    isNewArrival,
    query = '',
    sort = 'featured',
  } = options;

  // If Supabase is configured and connected, fetch from DB
  if (isSupabaseConfigured && supabase) {
    try {
      let dbQuery = supabase
        .from('products')
        .select(`
          *,
          category:categories(name, slug),
          images:product_images(image_url, alt_text, display_order)
        `)
        .eq('is_active', true);

      if (category !== 'all') {
        dbQuery = dbQuery.eq('category.slug', category);
      }
      if (inStockOnly) {
        dbQuery = dbQuery.gt('stock_quantity', 0);
      }
      if (isNewArrival) {
        dbQuery = dbQuery.eq('is_new_arrival', true);
      }
      if (minPrice !== undefined) {
        dbQuery = dbQuery.gte('price', minPrice);
      }
      if (maxPrice !== undefined) {
        dbQuery = dbQuery.lte('price', maxPrice);
      }
      if (query.trim()) {
        dbQuery = dbQuery.ilike('name', `%${query}%`);
      }

      if (sort === 'newest') {
        dbQuery = dbQuery.order('created_at', { ascending: false });
      } else if (sort === 'price-low') {
        dbQuery = dbQuery.order('price', { ascending: true });
      } else if (sort === 'price-high') {
        dbQuery = dbQuery.order('price', { ascending: false });
      } else if (sort === 'bestselling') {
        dbQuery = dbQuery.order('is_bestseller', { ascending: false });
      }

      const { data, error } = await dbQuery;

      if (!error && data && data.length > 0) {
        return data.map((item: any) => ({
          id: item.id,
          name: item.name,
          slug: item.slug,
          category: item.category?.slug || 'earrings',
          categoryName: item.category?.name || 'Earrings',
          sku: item.sku,
          price: Number(item.price),
          comparePrice: item.compare_price ? Number(item.compare_price) : undefined,
          offerTag: item.offer_tag,
          description: item.description,
          shortDescription: item.short_description || item.description,
          material: item.material || '18K Gold Plated Brass',
          colour: item.colour || 'Gold',
          careInstructions: item.care_instructions || 'Store in velvet pouch.',
          images: item.images?.length
            ? item.images.sort((a: any, b: any) => a.display_order - b.display_order).map((img: any) => ({
                url: img.image_url,
                alt: img.alt_text || item.name,
              }))
            : [{ url: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80', alt: item.name }],
          isNewArrival: item.is_new_arrival,
          isBestseller: item.is_bestseller,
          isFeatured: item.is_featured,
          inStock: item.stock_quantity > 0,
          stockQuantity: item.stock_quantity,
          rating: 4.9,
          reviewCount: 32,
        }));
      }
    } catch (e) {
      console.warn('Supabase query failed, falling back to mock catalog', e);
    }
  }

  // Graceful fallback to rich mock data
  let result = [...MOCK_PRODUCTS];

  if (category !== 'all') {
    result = result.filter((p) => p.category === category);
  }

  if (inStockOnly) {
    result = result.filter((p) => p.inStock);
  }

  if (isNewArrival) {
    result = result.filter((p) => p.isNewArrival);
  }

  if (minPrice !== undefined) {
    result = result.filter((p) => p.price >= minPrice);
  }

  if (maxPrice !== undefined) {
    result = result.filter((p) => p.price <= maxPrice);
  }

  if (query.trim()) {
    const q = query.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q)
    );
  }

  switch (sort) {
    case 'price-low':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
      break;
    case 'bestselling':
      result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
      break;
    case 'featured':
    default:
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
      break;
  }

  return result;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug) || null;
}

export async function getCategories(): Promise<Category[]> {
  return CATEGORIES.filter((c) => c.isActive !== false);
}

export async function getAllCategories(): Promise<Category[]> {
  return CATEGORIES;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return CATEGORIES.find((c) => c.slug === slug) || null;
}

export async function getRelatedProducts(
  productId: string,
  category: CategorySlug,
  limit = 4
): Promise<Product[]> {
  const all = await getProducts();
  return all
    .filter((p) => p.id !== productId && (p.category === category || p.isBestseller))
    .slice(0, limit);
}
