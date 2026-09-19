'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import {
  Search,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Package,
  X,
  MapPin,
  IndianRupee,
  MessageCircle,
  Mail,
  RotateCw,
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { getOrders, updateOrderStatus, updatePaymentStatus } from '@/lib/services/orderService';
import { Order, OrderStatus, PaymentStatus } from '@/types/order';
import { formatINR } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      const data = await getOrders();
      setOrders(data);
    }
    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesStatus = statusFilter === 'all' || o.orderStatus === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        o.orderNumber.toLowerCase().includes(q) ||
        o.customer.name.toLowerCase().includes(q) ||
        o.customer.email.toLowerCase().includes(q) ||
        o.customer.phone.includes(q);

      return matchesStatus && matchesQuery;
    });
  }, [orders, statusFilter, searchQuery]);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    const updated = await updateOrderStatus(orderId, newStatus);
    if (updated) {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
      );
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, orderStatus: newStatus });
      }
    }
  };

  const handlePaymentStatusChange = async (orderId: string, newPaymentStatus: PaymentStatus) => {
    const updated = await updatePaymentStatus(orderId, newPaymentStatus);
    if (updated) {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, paymentStatus: newPaymentStatus } : o))
      );
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, paymentStatus: newPaymentStatus });
      }
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 sm:p-10 max-w-7xl w-full mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand-300 pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-wine-800 font-semibold">
              Fulfillment & Dispatch
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
              Order Management
            </h1>
          </div>
          <div className="text-xs text-taupe-500">
            Total Orders: <span className="font-bold text-charcoal-900">{orders.length}</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 text-xs">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search by customer name, phone, email, or order #..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-sand-100 border border-sand-300 rounded-xs text-charcoal-900 focus:outline-none focus:border-wine-700"
            />
            <Search className="w-4 h-4 text-taupe-400 absolute left-3 top-2.5" />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {[
              { id: 'all', label: 'All Orders' },
              { id: 'pending', label: 'Pending' },
              { id: 'confirmed', label: 'Confirmed' },
              { id: 'processing', label: 'Processing' },
              { id: 'shipped', label: 'Shipped' },
              { id: 'delivered', label: 'Delivered' },
              { id: 'cancelled', label: 'Cancelled' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id as any)}
                className={`px-3 py-1.5 whitespace-nowrap uppercase tracking-wider text-[11px] rounded-xs cursor-pointer ${
                  statusFilter === tab.id
                    ? 'bg-wine-700 text-sand-50 font-semibold'
                    : 'bg-sand-50 text-charcoal-700 border border-sand-300 hover:bg-sand-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-sand-100/60 border border-sand-200 overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-sand-200 text-taupe-500 uppercase tracking-wider border-b border-sand-300">
              <tr>
                <th className="py-3 px-4">Order Number</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Items Count</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Fulfillment Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-sand-200/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-semibold text-charcoal-900">
                    #{order.orderNumber}
                    <span className="block font-sans text-[10px] text-taupe-400">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-charcoal-800">
                    <p className="font-medium text-charcoal-900">{order.customer.name}</p>
                    <p className="text-[11px] text-taupe-500">{order.customer.phone}</p>
                  </td>
                  <td className="py-3 px-4">
                    {order.items.reduce((sum, i) => sum + i.quantity, 0)} pcs ({order.items.length}{' '}
                    {order.items.length === 1 ? 'item' : 'items'})
                  </td>
                  <td className="py-3 px-4 font-serif font-semibold text-charcoal-900 text-sm">
                    {formatINR(order.totalAmount)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-xs font-bold text-[10px] uppercase ${
                        order.paymentStatus === 'paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.paymentStatus === 'failed'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                      className="p-1 bg-sand-50 border border-sand-300 rounded-xs text-charcoal-800 text-[11px] font-medium capitalize cursor-pointer focus:outline-none focus:border-wine-700"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="px-2.5 py-1.5 bg-sand-50 border border-sand-300 hover:border-wine-700 hover:text-wine-800 text-charcoal-800 text-xs font-medium transition-colors flex items-center gap-1 ml-auto cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Details Drawer Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-charcoal-900/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-sand-50 border-l border-sand-300 shadow-2xl w-full max-w-lg h-full p-6 sm:p-8 overflow-y-auto space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-sand-200 pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-wine-800 font-semibold">
                    Order Details
                  </span>
                  <h2 className="font-mono text-xl text-charcoal-900 font-bold mt-0.5">
                    #{selectedOrder.orderNumber}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1.5 text-charcoal-700 hover:text-wine-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Update Controls */}
              <div className="p-4 bg-sand-100 border border-sand-200 space-y-3">
                <p className="font-semibold text-charcoal-900 text-xs uppercase tracking-wider">
                  Update Order Lifecycle:
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-taupe-500 text-[11px] mb-1">
                      Fulfillment Status
                    </label>
                    <select
                      value={selectedOrder.orderStatus}
                      onChange={(e) =>
                        handleStatusChange(selectedOrder.id, e.target.value as OrderStatus)
                      }
                      className="w-full p-2 bg-sand-50 border border-sand-300 text-charcoal-900 capitalize font-medium text-xs cursor-pointer"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-taupe-500 text-[11px] mb-1">Payment Status</label>
                    <select
                      value={selectedOrder.paymentStatus}
                      onChange={(e) =>
                        handlePaymentStatusChange(selectedOrder.id, e.target.value as PaymentStatus)
                      }
                      className="w-full p-2 bg-sand-50 border border-sand-300 text-charcoal-900 capitalize font-medium text-xs cursor-pointer"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="failed">Failed</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div className="space-y-3 border-b border-sand-200 pb-4 text-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base text-charcoal-900 font-semibold">
                    Customer Information
                  </h3>
                  {/* WhatsApp Customer Action */}
                  <a
                    href={`https://wa.me/91${selectedOrder.customer.phone}?text=${encodeURIComponent(
                      `Hi ${selectedOrder.customer.name}! Regarding your Nazaara Jewels order #${selectedOrder.orderNumber}:`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-semibold hover:bg-emerald-200 transition-colors rounded-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Customer</span>
                  </a>
                </div>
                <div className="bg-sand-100/60 p-3 border border-sand-200 space-y-1">
                  <p className="font-semibold text-charcoal-900">{selectedOrder.customer.name}</p>
                  <p className="text-charcoal-700">Email: {selectedOrder.customer.email}</p>
                  <p className="text-charcoal-700">Phone: +91 {selectedOrder.customer.phone}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-charcoal-900 mt-2 mb-1">Shipping Destination</h4>
                  <p className="text-taupe-500 leading-relaxed bg-sand-100/60 p-3 border border-sand-200">
                    {selectedOrder.shippingAddress.addressLine}, {selectedOrder.shippingAddress.city},{' '}
                    {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}
                  </p>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3 border-b border-sand-200 pb-4">
                <h3 className="font-serif text-base text-charcoal-900 font-semibold">
                  Items Ordered
                </h3>
                <div className="space-y-3 divide-y divide-sand-200">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 bg-sand-200 border border-sand-300 shrink-0 overflow-hidden">
                          {item.imageUrl && (
                            <Image
                              src={item.imageUrl}
                              alt={item.productName}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-charcoal-900">{item.productName}</p>
                          <p className="text-[11px] text-taupe-400">
                            Qty: {item.quantity} × {formatINR(item.unitPrice)} • SKU: {item.sku}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold text-charcoal-900">{formatINR(item.totalPrice)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gift Note */}
              {selectedOrder.giftNote && (
                <div className="p-3 bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                  <p className="font-bold">Customer Gift Note:</p>
                  <p className="italic">&ldquo;{selectedOrder.giftNote}&rdquo;</p>
                </div>
              )}

              {/* Financial Totals */}
              <div className="space-y-1.5 text-xs text-charcoal-700 pt-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatINR(selectedOrder.subtotal)}</span>
                </div>
                {selectedOrder.discountAmount > 0 && (
                  <div className="flex justify-between text-wine-800 font-medium">
                    <span>Discount ({selectedOrder.couponCode || 'Promo'})</span>
                    <span>-{formatINR(selectedOrder.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span>{selectedOrder.shippingAmount === 0 ? 'FREE' : formatINR(selectedOrder.shippingAmount)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-sand-300 text-base font-serif font-bold text-charcoal-900">
                  <span>Total Amount Paid</span>
                  <span className="text-wine-900">{formatINR(selectedOrder.totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
