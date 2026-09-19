'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  IndianRupee,
  ShoppingBag,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  Package,
  TrendingUp,
  CheckCircle2,
  Truck,
  RotateCw,
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { getOrders, getDashboardMetrics } from '@/lib/services/orderService';
import { MOCK_PRODUCTS } from '@/lib/constants/products';
import { Order } from '@/types/order';
import { formatINR } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { BRAND } from '@/lib/constants/brand';

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState({
    totalRevenue: 7196,
    totalOrders: 3,
    pendingOrders: 1,
    processingOrders: 1,
    shippedOrders: 1,
    deliveredOrders: 1,
    cancelledOrders: 0,
  });

  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const lowStockProducts = MOCK_PRODUCTS.filter((p) => p.stockQuantity < 15);

  useEffect(() => {
    async function loadData() {
      const data = await getDashboardMetrics();
      const orders = await getOrders();
      setMetrics(data as any);
      setRecentOrders(orders);
    }
    loadData();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6 sm:p-10 max-w-7xl w-full mx-auto space-y-8">
        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand-300 pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-wine-800 font-semibold">
              {BRAND.name} Overview
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
              Store Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/products"
              className="px-4 py-2 bg-wine-700 hover:bg-wine-800 text-sand-50 text-xs uppercase tracking-widest font-semibold transition-colors shadow-xs"
            >
              + Add / Edit Products
            </Link>
            <Link
              href="/admin/orders"
              className="px-4 py-2 bg-sand-200 hover:bg-sand-300 text-charcoal-900 text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              Manage Orders
            </Link>
          </div>
        </div>

        {/* 6 Metric KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6">
          {/* Revenue */}
          <div className="bg-sand-100 p-5 border border-sand-200 flex flex-col justify-between">
            <div className="flex items-center justify-between text-taupe-500 mb-2">
              <span className="text-[11px] uppercase tracking-wider font-medium">
                Total Revenue
              </span>
              <IndianRupee className="w-4 h-4 text-wine-700" />
            </div>
            <p className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-semibold">
              {formatINR(metrics.totalRevenue)}
            </p>
            <p className="text-[10px] text-emerald-700 flex items-center gap-1 mt-2 font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>Razorpay Verified</span>
            </p>
          </div>

          {/* Total Orders */}
          <div className="bg-sand-100 p-5 border border-sand-200 flex flex-col justify-between">
            <div className="flex items-center justify-between text-taupe-500 mb-2">
              <span className="text-[11px] uppercase tracking-wider font-medium">
                Total Orders
              </span>
              <ShoppingBag className="w-4 h-4 text-wine-700" />
            </div>
            <p className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-semibold">
              {metrics.totalOrders}
            </p>
            <p className="text-[10px] text-taupe-500 mt-2">All time customer orders</p>
          </div>

          {/* Pending */}
          <div className="bg-sand-100 p-5 border border-sand-200 flex flex-col justify-between">
            <div className="flex items-center justify-between text-taupe-500 mb-2">
              <span className="text-[11px] uppercase tracking-wider font-medium">
                Pending
              </span>
              <Clock className="w-4 h-4 text-amber-700" />
            </div>
            <p className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-semibold">
              {metrics.pendingOrders}
            </p>
            <p className="text-[10px] text-amber-700 mt-2 font-medium">Awaiting confirmation</p>
          </div>

          {/* Processing */}
          <div className="bg-sand-100 p-5 border border-sand-200 flex flex-col justify-between">
            <div className="flex items-center justify-between text-taupe-500 mb-2">
              <span className="text-[11px] uppercase tracking-wider font-medium">
                Processing
              </span>
              <RotateCw className="w-4 h-4 text-blue-700" />
            </div>
            <p className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-semibold">
              {metrics.processingOrders}
            </p>
            <p className="text-[10px] text-blue-700 mt-2 font-medium">Packing in studio</p>
          </div>

          {/* Shipped */}
          <div className="bg-sand-100 p-5 border border-sand-200 flex flex-col justify-between">
            <div className="flex items-center justify-between text-taupe-500 mb-2">
              <span className="text-[11px] uppercase tracking-wider font-medium">
                Shipped
              </span>
              <Truck className="w-4 h-4 text-purple-700" />
            </div>
            <p className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-semibold">
              {metrics.shippedOrders}
            </p>
            <p className="text-[10px] text-purple-700 mt-2 font-medium">In transit to buyer</p>
          </div>

          {/* Delivered */}
          <div className="bg-sand-100 p-5 border border-sand-200 flex flex-col justify-between">
            <div className="flex items-center justify-between text-taupe-500 mb-2">
              <span className="text-[11px] uppercase tracking-wider font-medium">
                Delivered
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            </div>
            <p className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-semibold">
              {metrics.deliveredOrders}
            </p>
            <p className="text-[10px] text-emerald-700 mt-2 font-medium">Fulfilled successfully</p>
          </div>
        </div>

        {/* 2 Grid Sections: Recent Orders & Inventory Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Recent Orders (8 cols) */}
          <div className="lg:col-span-8 bg-sand-100/70 p-6 border border-sand-200 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl text-charcoal-900 font-medium">
                Recent Customer Orders
              </h2>
              <Link
                href="/admin/orders"
                className="text-xs text-wine-800 hover:text-wine-900 font-semibold flex items-center gap-1"
              >
                <span>View All Orders</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-sand-300 text-taupe-500 uppercase tracking-wider">
                    <th className="pb-3 font-medium">Order ID</th>
                    <th className="pb-3 font-medium">Customer</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Payment</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-200">
                  {recentOrders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="hover:bg-sand-50/50">
                      <td className="py-3 font-mono font-medium text-charcoal-900">
                        <Link
                          href="/admin/orders"
                          className="hover:underline text-wine-900"
                        >
                          {order.orderNumber}
                        </Link>
                      </td>
                      <td className="py-3 text-charcoal-800">
                        {order.customer.name}
                        <span className="block text-[11px] text-taupe-400">
                          {order.customer.phone}
                        </span>
                      </td>
                      <td className="py-3 font-semibold text-charcoal-900">
                        {formatINR(order.totalAmount)}
                      </td>
                      <td className="py-3">
                        <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 font-semibold rounded-xs uppercase text-[10px]">
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="inline-block px-2 py-0.5 bg-sand-200 text-charcoal-900 font-medium rounded-xs capitalize text-[11px]">
                          {order.orderStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Low Stock Alerts (4 cols) */}
          <div className="lg:col-span-4 bg-sand-100/70 p-6 border border-sand-200 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl text-charcoal-900 font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Inventory Alerts</span>
              </h2>
              <Link
                href="/admin/products"
                className="text-xs text-wine-800 hover:text-wine-900 font-semibold"
              >
                Catalog →
              </Link>
            </div>

            <p className="text-xs text-taupe-500 font-light">
              Products with stock below safety threshold (15 units):
            </p>

            <div className="space-y-3 pt-2">
              {lowStockProducts.map((p) => (
                <div
                  key={p.id}
                  className="p-3 bg-sand-50 border border-sand-200 flex items-center justify-between text-xs"
                >
                  <div className="min-w-0 pr-2">
                    <p className="font-medium text-charcoal-900 truncate">{p.name}</p>
                    <p className="text-[11px] text-taupe-400">SKU: {p.sku}</p>
                  </div>
                  <span className="px-2 py-1 bg-amber-50 text-amber-800 border border-amber-200 font-bold text-[11px] shrink-0 rounded-xs">
                    {p.stockQuantity} left
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
