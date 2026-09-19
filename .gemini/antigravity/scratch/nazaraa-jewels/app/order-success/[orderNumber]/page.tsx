import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  Mail,
} from 'lucide-react';
import { CartProvider } from '@/lib/store/cartContext';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { getOrderByNumber } from '@/lib/services/orderService';
import { formatINR } from '@/lib/utils';
import { BRAND } from '@/lib/constants/brand';

interface OrderSuccessPageProps {
  params: Promise<{ orderNumber: string }>;
}

export default async function OrderSuccessPage({ params }: OrderSuccessPageProps) {
  const { orderNumber } = await params;
  const order = await getOrderByNumber(orderNumber);

  if (!order) {
    notFound();
  }

  const estimatedDeliveryDate = new Date();
  estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 4);
  const formattedDelivery = estimatedDeliveryDate.toLocaleDateString('en-IN', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen bg-sand-50 selection:bg-wine-700 selection:text-sand-50">
        <AnnouncementBar />
        <Navbar />

        <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
          {/* Success Hero Header */}
          <div className="text-center space-y-3 pb-8 border-b border-sand-300">
            <div className="w-16 h-16 rounded-full bg-wine-100 text-wine-800 flex items-center justify-center mx-auto mb-2 animate-in zoom-in-90 duration-300">
              <CheckCircle2 className="w-10 h-10 text-wine-700" />
            </div>
            <span className="text-xs uppercase tracking-widest text-wine-800 font-semibold">
              Thank You for Your Order
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-charcoal-900 font-normal">
              Your jewellery is confirmed!
            </h1>
            <p className="text-xs sm:text-sm text-taupe-500 max-w-md mx-auto">
              We have received your order <strong>#{order.orderNumber}</strong>. A confirmation receipt has been sent to <strong>{order.customer.email}</strong>.
            </p>
          </div>

          {/* Delivery Timeline Card */}
          <div className="my-8 bg-sand-100 p-6 border border-sand-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="p-3 bg-sand-50 text-wine-800 rounded-xs">
                <Truck className="w-6 h-6 text-wine-700" />
              </div>
              <div className="text-xs">
                <p className="uppercase tracking-wider text-taupe-500 font-medium">
                  Estimated Delivery Date
                </p>
                <p className="font-serif text-lg text-charcoal-900 font-semibold mt-0.5">
                  {formattedDelivery}
                </p>
              </div>
            </div>
            <div className="text-xs text-taupe-500 text-right sm:text-right w-full sm:w-auto">
              <span className="inline-block px-3 py-1 bg-wine-50 text-wine-800 border border-wine-200 uppercase tracking-wider font-semibold">
                Status: {order.orderStatus.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Order Snapshot & Receipt */}
          <div className="bg-sand-100/60 border border-sand-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-sand-200 pb-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-taupe-500">Order Number</p>
                <p className="font-mono text-sm sm:text-base font-bold text-charcoal-900 mt-0.5">
                  #{order.orderNumber}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-widest text-taupe-500">Payment</p>
                <p className="text-xs font-semibold text-emerald-800 uppercase mt-0.5">
                  Online (Razorpay Verified)
                </p>
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-4 divide-y divide-sand-200">
              {order.items.map((item) => (
                <div key={item.productId} className="pt-4 first:pt-0 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 bg-sand-200 border border-sand-300 overflow-hidden shrink-0">
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
                      <p className="font-serif text-base text-charcoal-900 font-medium">
                        {item.productName}
                      </p>
                      <p className="text-xs text-taupe-500">
                        Qty: {item.quantity} • SKU: {item.sku}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-charcoal-900 text-sm">
                    {formatINR(item.totalPrice)}
                  </p>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="pt-4 border-t border-sand-200 space-y-2 text-xs text-charcoal-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatINR(order.subtotal)}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-wine-800">
                  <span>Discount ({order.couponCode || 'Promo'})</span>
                  <span>-{formatINR(order.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Shipping</span>
                <span>{order.shippingAmount === 0 ? 'FREE' : formatINR(order.shippingAmount)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-sand-300 text-base font-serif font-bold text-charcoal-900">
                <span>Total Paid</span>
                <span className="text-wine-900">{formatINR(order.totalAmount)}</span>
              </div>
            </div>

            {/* Shipping Address Snapshot */}
            <div className="pt-4 border-t border-sand-200 text-xs text-charcoal-700 space-y-1">
              <p className="font-semibold text-charcoal-900 uppercase tracking-wider text-[11px]">
                Shipping To:
              </p>
              <p className="font-medium text-charcoal-900">{order.shippingAddress.name} (+91 {order.shippingAddress.phone})</p>
              <p className="text-taupe-500">
                {order.shippingAddress.addressLine}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </p>
            </div>
          </div>

          {/* WhatsApp Support & Help CTA */}
          <div className="mt-8 p-6 bg-sand-100 border border-sand-300 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <p className="font-serif text-lg text-charcoal-900 font-medium">
                Need assistance with your delivery?
              </p>
              <p className="text-xs text-taupe-500">
                Our support team is ready on WhatsApp to update you with real-time tracking.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={BRAND.whatsapp.getOrderSupportLink(order.orderNumber)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="sm" className="shadow-xs">
                  <MessageCircle className="w-4 h-4 mr-1.5" />
                  <span>Chat on WhatsApp</span>
                </Button>
              </a>
              <a href={BRAND.email.supportMailto(`Order #${order.orderNumber} Inquiry`)}>
                <Button variant="outline" size="sm" className="bg-sand-50">
                  <Mail className="w-4 h-4 mr-1.5" />
                  <span>Email</span>
                </Button>
              </a>
            </div>
          </div>

          {/* Continue Shopping */}
          <div className="mt-10 text-center">
            <Link href="/categories">
              <Button variant="outline" size="lg" className="bg-sand-50">
                <span>Continue Exploring Collections</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
}
