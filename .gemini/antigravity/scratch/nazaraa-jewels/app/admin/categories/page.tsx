'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, X, Check, Layers } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { CATEGORIES } from '@/lib/constants/products';
import { Category, CategorySlug } from '@/types/product';
import { Button } from '@/components/ui/Button';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    tagline: '',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
    itemCount: 15,
  });

  const openCreateModal = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      tagline: '',
      image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
      itemCount: 0,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      tagline: cat.tagline,
      image: cat.image,
      itemCount: cat.itemCount,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = (formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')) as CategorySlug;

    const payload: Category = {
      id: editingCategory ? editingCategory.id : `cat-${Date.now()}`,
      name: formData.name,
      slug,
      description: formData.description,
      tagline: formData.tagline || 'Everyday elegance',
      image: formData.image,
      itemCount: Number(formData.itemCount) || 0,
    };

    if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) => (c.id === editingCategory.id ? payload : c))
      );
    } else {
      setCategories((prev) => [...prev, payload]);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (catId: string) => {
    if (confirm('Delete this category? Products in this category will remain available.')) {
      setCategories((prev) => prev.filter((c) => c.id !== catId));
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 sm:p-10 max-w-7xl w-full mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand-300 pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-wine-800 font-semibold">
              Taxonomy & Collections
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
              Categories ({categories.length})
            </h1>
          </div>
          <Button variant="primary" onClick={openCreateModal} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </Button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-sand-100/70 border border-sand-200 overflow-hidden flex flex-col justify-between"
            >
              <div className="relative h-44 bg-sand-200">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 flex gap-1.5">
                  <button
                    onClick={() => openEditModal(cat)}
                    className="p-1.5 bg-sand-50/90 hover:bg-sand-50 text-charcoal-900 transition-colors shadow-xs"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="p-1.5 bg-sand-50/90 hover:bg-red-50 text-red-700 transition-colors shadow-xs"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-5 space-y-2 text-xs flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-wine-800 font-semibold">
                    {cat.tagline}
                  </span>
                  <h3 className="font-serif text-xl text-charcoal-900 font-semibold mt-0.5">
                    {cat.name}
                  </h3>
                  <p className="text-taupe-500 mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-sand-200 flex items-center justify-between text-taupe-500 font-medium">
                  <span>Slug: /{cat.slug}</span>
                  <span className="bg-sand-200 px-2 py-0.5 text-charcoal-800 rounded-xs">
                    {cat.itemCount} Items
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create / Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-sand-50 border border-sand-300 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-sand-200 pb-3">
                <h2 className="font-serif text-xl text-charcoal-900 font-semibold">
                  {editingCategory ? 'Edit Category' : 'Create Category'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 text-charcoal-700 hover:text-wine-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-charcoal-800 font-semibold mb-1">Category Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Earrings"
                    className="w-full p-2.5 bg-sand-50 border border-sand-300 focus:outline-none focus:border-wine-700"
                  />
                </div>

                <div>
                  <label className="block text-charcoal-800 font-semibold mb-1">Tagline</label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="e.g. Effortless radiance"
                    className="w-full p-2.5 bg-sand-50 border border-sand-300 focus:outline-none focus:border-wine-700"
                  />
                </div>

                <div>
                  <label className="block text-charcoal-800 font-semibold mb-1">Hero Image URL *</label>
                  <input
                    type="url"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full p-2.5 bg-sand-50 border border-sand-300 focus:outline-none focus:border-wine-700"
                  />
                </div>

                <div>
                  <label className="block text-charcoal-800 font-semibold mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2.5 bg-sand-50 border border-sand-300 focus:outline-none focus:border-wine-700"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-sand-200">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-sand-300 bg-sand-100 text-charcoal-800 uppercase tracking-wider"
                  >
                    Cancel
                  </button>
                  <Button type="submit" variant="primary">
                    Save Category
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
