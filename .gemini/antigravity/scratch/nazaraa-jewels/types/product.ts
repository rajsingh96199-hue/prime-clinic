export type CategorySlug =
  | 'earrings'
  | 'pendants'
  | 'kadas'
  | 'bracelets'
  | 'enamel-kadas'
  | 'rings'
  | 'wrist-chain'
  | 'neck-chain';

export interface Category {
  id: string;
  name: string;
  slug: CategorySlug;
  description: string;
  image: string;
  itemCount: number;
  tagline: string;
  isActive?: boolean;
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategorySlug;
  categoryName: string;
  sku: string;
  price: number;
  comparePrice?: number;
  offerTag?: string;
  description: string;
  shortDescription: string;
  material: string;
  colour: string;
  careInstructions: string;
  images: ProductImage[];
  isNewArrival?: boolean;
  isBestseller?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
}
