'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Check,
  Package,
  Sparkles,
  Tag,
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { MOCK_PRODUCTS, CATEGORIES } from '@/lib/constants/products';
import { Product, CategorySlug } from '@/types/product';
import { formatINR } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategorySlug | 'all'>('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    sku: '',
    category: 'earrings' as CategorySlug,
    price: 1499,
    comparePrice: 1999,
    offerTag: '',
    stockQuantity: 20,
    shortDescription: '',
    description: '',
    material: '18K Gold Plated Brass, Hypoallergenic',
    colour: 'Warm Gold',
    careInstructions: 'Avoid contact with perfumes and moisture.',
    imageUrl: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
    isNewArrival: true,
    isBestseller: false,
    isFeatured: true,
  });

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchQ =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQ;
    });
  }, [products, selectedCategory, searchQuery]);

  const openCreateModal = () => {
    setFormData({
      name: '',
      slug: '',
      sku: `NZ-${Date.now().toString().slice(-4)}`,
      category: 'earrings',
      price: 1499,
      comparePrice: 1999,
      offerTag: '25% OFF',
      stockQuantity: 20,
      shortDescription: '',
      description: '',
      material: '18K Gold Plated Brass, Hypoallergenic',
      colour: 'Warm Gold',
      careInstructions: 'Avoid contact with perfumes and moisture.',
      imageUrl: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
      isNewArrival: true,
      isBestseller: false,
      isFeatured: true,
    });
    setEditingProduct(null);
    setIsCreating(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      slug: p.slug,
      sku: p.sku,
      category: p.category,
      price: p.price,
      comparePrice: p.comparePrice || 0,
      offerTag: p.offerTag || '',
      stockQuantity: p.stockQuantity,
      shortDescription: p.shortDescription,
      description: p.description,
      material: p.material,
      colour: p.colour,
      careInstructions: p.careInstructions,
      imageUrl: p.images[0]?.url || '',
      isNewArrival: Boolean(p.isNewArrival),
      isBestseller: Boolean(p.isBestseller),
      isFeatured: Boolean(p.isFeatured),
    });
    setIsCreating(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const categoryObj = CATEGORIES.find((c) => c.slug === formData.category);
    const categoryName = categoryObj ? categoryObj.name : 'Earrings';
    const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === editingProduct.id
            ? {
                ...item,
                name: formData.name,
                slug,
                sku: formData.sku,
                category: formData.category,
                categoryName,
                price: Number(formData.price),
                comparePrice: Number(formData.comparePrice) || undefined,
                offerTag: formData.offerTag || undefined,
                stockQuantity: Number(formData.stockQuantity),
                inStock: Number(formData.stockQuantity) > 0,
                shortDescription: formData.shortDescription || formData.description.slice(0, 80),
                description: formData.description,
                material: formData.material,
                colour: formData.colour,
                careInstructions: formData.careInstructions,
                images: [{ url: formData.imageUrl, alt: formData.name }],
                isNewArrival: formData.isNewArrival,
                isBestseller: formData.isBestseller,
                isFeatured: formData.isFeatured,
              }
            : item
        )
      );
    } else {
      const newProduct: Product = {
        id: `nz-${Date.now().toString().slice(-6)}`,
        name: formData.name,
        slug,
        sku: formData.sku,
        category: formData.category,
        categoryName,
        price: Number(formData.price),
        comparePrice: Number(formData.comparePrice) || undefined,
        offerTag: formData.offerTag || undefined,
        stockQuantity: Number(formData.stockQuantity),
        inStock: Number(formData.stockQuantity) > 0,
        shortDescription: formData.shortDescription || formData.description.slice(0, 80),
        description: formData.description,
        material: formData.material,
        colour: formData.colour,
        careInstructions: formData.careInstructions,
        images: [{ url: formData.imageUrl, alt: formData.name }],
        isNewArrival: formData.isNewArrival,
        isBestseller: formData.isBestseller,
        isFeatured: formData.isFeatured,
        rating: 5.0,
        reviewCount: 1,
      };

      setProducts((prev) => [newProduct, ...prev]);
    }

    setIsCreating(false);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to remove this product from the catalog?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 sm:p-10 max-w-7xl w-full mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand-300 pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-wine-800 font-semibold">
              Inventory & Merchandising
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
              Product Catalog
            </h1>
          </div>
          <Button onClick={openCreateModal} variant="primary" size="md">
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Add New Jewellery</span>
          </Button>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 text-xs">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search product title or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-sand-100 border border-sand-300 rounded-xs text-charcoal-900 focus:outline-none focus:border-wine-700"
            />
            <Search className="w-4 h-4 text-taupe-400 absolute left-3 top-2.5" />
          </div>

          {/* 8 Categories Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 whitespace-nowrap uppercase tracking-wider text-[11px] rounded-xs ${
                selectedCategory === 'all'
                  ? 'bg-wine-700 text-sand-50 font-semibold'
                  : 'bg-sand-50 text-charcoal-700 border border-sand-300 hover:bg-sand-100'
              }`}
            >
              All Categories
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1.5 whitespace-nowrap uppercase tracking-wider text-[11px] rounded-xs ${
                  selectedCategory === cat.slug
                    ? 'bg-wine-700 text-sand-50 font-semibold'
                    : 'bg-sand-50 text-charcoal-700 border border-sand-300 hover:bg-sand-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-sand-100/60 border border-sand-200 overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-sand-200 text-taupe-500 uppercase tracking-wider border-b border-sand-300">
              <tr>
                <th className="py-3 px-4">Item</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Pricing & Offers</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Badges</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-200">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-sand-200/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-14 bg-sand-200 border border-sand-300 shrink-0 overflow-hidden">
                        {p.images[0]?.url && (
                          <Image
                            src={p.images[0].url}
                            alt={p.name}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-serif text-sm text-charcoal-900 font-semibold">
                          {p.name}
                        </p>
                        <p className="text-[11px] text-taupe-500 line-clamp-1">{p.material}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 uppercase text-[11px] font-medium text-charcoal-700">
                    {p.categoryName}
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-taupe-500">{p.sku}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="font-serif font-semibold text-charcoal-900 text-sm">
                        {formatINR(p.price)}
                      </span>
                      {p.comparePrice && (
                        <span className="text-[11px] text-taupe-400 line-through">
                          {formatINR(p.comparePrice)}
                        </span>
                      )}
                    </div>
                    {p.offerTag && (
                      <span className="text-[10px] text-wine-800 font-bold uppercase tracking-wider block">
                        Offer: {p.offerTag}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-xs font-bold text-[10px] ${
                        p.stockQuantity > 10
                          ? 'bg-emerald-100 text-emerald-800'
                          : p.stockQuantity > 0
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {p.stockQuantity} in stock
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {p.isNewArrival && <Badge variant="wine">New Drop</Badge>}
                      {p.isBestseller && <Badge variant="charcoal">Bestseller</Badge>}
                      {p.isFeatured && <Badge variant="sand">Featured</Badge>}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 text-charcoal-700 hover:text-wine-800 bg-sand-50 border border-sand-300 hover:border-wine-700 transition-colors cursor-pointer"
                        title="Edit Product & Pricing"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-1.5 text-taupe-400 hover:text-red-700 bg-sand-50 border border-sand-300 hover:border-red-400 transition-colors cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Create / Edit Modal */}
        {isCreating && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-sand-50 border border-sand-300 shadow-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
              <div className="flex items-center justify-between border-b border-sand-200 pb-4">
                <h2 className="font-serif text-2xl text-charcoal-900 font-semibold">
                  {editingProduct ? 'Edit Product Details & Pricing' : 'Add New Jewellery Design'}
                </h2>
                <button
                  onClick={() => setIsCreating(false)}
                  className="p-1.5 text-charcoal-700 hover:text-wine-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-charcoal-800 font-semibold mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Baroque Pearl Drop Earrings"
                      className="w-full p-2.5 bg-sand-50 border border-sand-300 text-xs focus:outline-none focus:border-wine-700"
                    />
                  </div>

                  <div>
                    <label className="block text-charcoal-800 font-semibold mb-1">SKU *</label>
                    <input
                      type="text"
                      required
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      className="w-full p-2.5 bg-sand-50 border border-sand-300 text-xs focus:outline-none focus:border-wine-700"
                    />
                  </div>

                  <div>
                    <label className="block text-charcoal-800 font-semibold mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value as CategorySlug })
                      }
                      className="w-full p-2.5 bg-sand-50 border border-sand-300 text-xs focus:outline-none focus:border-wine-700 cursor-pointer"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-charcoal-800 font-semibold mb-1">
                      Current Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full p-2.5 bg-sand-50 border border-sand-300 text-xs focus:outline-none focus:border-wine-700"
                    />
                  </div>

                  <div>
                    <label className="block text-charcoal-800 font-semibold mb-1">
                      Original / Compare Price (₹)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={formData.comparePrice}
                      onChange={(e) =>
                        setFormData({ ...formData, comparePrice: Number(e.target.value) })
                      }
                      placeholder="e.g. 1999"
                      className="w-full p-2.5 bg-sand-50 border border-sand-300 text-xs focus:outline-none focus:border-wine-700"
                    />
                  </div>

                  <div>
                    <label className="block text-charcoal-800 font-semibold mb-1">
                      Offer / Discount Tag
                    </label>
                    <input
                      type="text"
                      value={formData.offerTag}
                      onChange={(e) => setFormData({ ...formData, offerTag: e.target.value })}
                      placeholder="e.g. 25% OFF or Festive Special"
                      className="w-full p-2.5 bg-sand-50 border border-sand-300 text-xs focus:outline-none focus:border-wine-700"
                    />
                  </div>

                  <div>
                    <label className="block text-charcoal-800 font-semibold mb-1">
                      Stock Quantity *
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={formData.stockQuantity}
                      onChange={(e) =>
                        setFormData({ ...formData, stockQuantity: Number(e.target.value) })
                      }
                      className="w-full p-2.5 bg-sand-50 border border-sand-300 text-xs focus:outline-none focus:border-wine-700"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-charcoal-800 font-semibold mb-1">
                      Main Image URL *
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full p-2.5 bg-sand-50 border border-sand-300 text-xs focus:outline-none focus:border-wine-700"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-charcoal-800 font-semibold mb-1">
                      Short Description (1-2 sentences)
                    </label>
                    <input
                      type="text"
                      value={formData.shortDescription}
                      onChange={(e) =>
                        setFormData({ ...formData, shortDescription: e.target.value })
                      }
                      placeholder="Handcrafted baroque freshwater pearls suspended from 18k huggies."
                      className="w-full p-2.5 bg-sand-50 border border-sand-300 text-xs focus:outline-none focus:border-wine-700"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-charcoal-800 font-semibold mb-1">
                      Full Editorial Description
                    </label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Full craftsmanship details and styling story..."
                      className="w-full p-2.5 bg-sand-50 border border-sand-300 text-xs focus:outline-none focus:border-wine-700"
                    />
                  </div>

                  <div>
                    <label className="block text-charcoal-800 font-semibold mb-1">
                      Material Base & Plating
                    </label>
                    <input
                      type="text"
                      value={formData.material}
                      onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                      placeholder="18K Gold Plated Brass, Anti-Tarnish"
                      className="w-full p-2.5 bg-sand-50 border border-sand-300 text-xs focus:outline-none focus:border-wine-700"
                    />
                  </div>

                  <div>
                    <label className="block text-charcoal-800 font-semibold mb-1">Colour Finish</label>
                    <input
                      type="text"
                      value={formData.colour}
                      onChange={(e) => setFormData({ ...formData, colour: e.target.value })}
                      placeholder="Warm Gold / Pearl White"
                      className="w-full p-2.5 bg-sand-50 border border-sand-300 text-xs focus:outline-none focus:border-wine-700"
                    />
                  </div>
                </div>

                {/* Flags Checkboxes */}
                <div className="pt-4 border-t border-sand-200 flex flex-wrap items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isNewArrival}
                      onChange={(e) =>
                        setFormData({ ...formData, isNewArrival: e.target.checked })
                      }
                      className="accent-wine-700"
                    />
                    <span className="font-medium text-charcoal-800">Mark as New Arrival Drop</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isBestseller}
                      onChange={(e) =>
                        setFormData({ ...formData, isBestseller: e.target.checked })
                      }
                      className="accent-wine-700"
                    />
                    <span className="font-medium text-charcoal-800">Mark as Bestseller</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="accent-wine-700"
                    />
                    <span className="font-medium text-charcoal-800">Feature on Homepage</span>
                  </label>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreating(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    {editingProduct ? 'Update Product' : 'Save & Publish Product'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
