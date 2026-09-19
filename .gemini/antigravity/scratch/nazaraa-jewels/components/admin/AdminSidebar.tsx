'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  ExternalLink,
  Sparkles,
  LogOut,
} from 'lucide-react';
import { useAdminAuth } from '@/lib/store/adminAuthContext';
import { BRAND } from '@/lib/constants/brand';

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAdminAuth();

  const navItems = [
    {
      href: '/admin/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      href: '/admin/products',
      label: 'Products',
      icon: Package,
    },
    {
      href: '/admin/categories',
      label: 'Categories',
      icon: Layers,
    },
    {
      href: '/admin/orders',
      label: 'Orders',
      icon: ShoppingBag,
    },
  ];

  return (
    <aside className="w-64 bg-sand-100 border-r border-sand-300 flex flex-col justify-between p-6 shrink-0 min-h-screen">
      <div>
        {/* Brand */}
        <div className="pb-6 border-b border-sand-200">
          <Link href="/admin/dashboard" className="block">
            <span className="font-serif text-2xl tracking-wider text-charcoal-900 font-semibold">
              Nazaara <span className="text-wine-700">Admin</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-wine-800 font-medium block mt-0.5">
              Control Panel & Merchandising
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="mt-6 space-y-1.5 text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xs transition-colors font-medium tracking-wide ${
                  isActive
                    ? 'bg-wine-700 text-sand-50 font-semibold shadow-xs'
                    : 'text-charcoal-700 hover:bg-sand-200 hover:text-wine-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Storefront Link & Logout */}
      <div className="pt-6 border-t border-sand-200 space-y-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between text-xs text-charcoal-700 hover:text-wine-800 p-2.5 bg-sand-50 border border-sand-300 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-wine-700" />
            <span>View Live Store</span>
          </span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 p-2 text-xs font-semibold text-red-700 hover:bg-red-50 border border-red-200 transition-colors rounded-xs cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>

        <p className="text-[10px] text-taupe-500 text-center">
          {BRAND.name} Control Panel v2.0
        </p>
      </div>
    </aside>
  );
}
