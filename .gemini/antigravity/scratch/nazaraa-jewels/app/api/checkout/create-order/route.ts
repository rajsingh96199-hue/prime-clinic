import { NextRequest, NextResponse } from 'next/server';
import { getProductBySlug } from '@/lib/services/productService';
import { createOrder } from '@/lib/services/orderService';
import { OrderItemSnapshot } from '@/types/order';
import { BRAND } from '@/lib/constants/brand';

const VALID_COUPONS: Record<string, number> = {
  NAZARAA10: 10,
  FESTIVE15: 15,
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customer,
      shippingAddress,
      items,
      couponCode,
      paymentMethod,
      giftNote,
    } = body;

    // 0. COD Protection — Explicitly reject COD requests if submitted
    if (paymentMethod === 'cod') {
      return NextResponse.json(
        { error: 'Cash on Delivery (COD) is not supported. Please choose secure online payment via Razorpay.' },
        { status: 400 }
      );
    }

    // 1. Validate Customer Info
    if (!customer?.name || !customer?.email || !customer?.phone) {
      return NextResponse.json(
        { error: 'Customer name, email, and phone number are required.' },
        { status: 400 }
      );
    }

    // 2. Validate Shipping Address
    if (
      !shippingAddress?.addressLine ||
      !shippingAddress?.city ||
      !shippingAddress?.state ||
      !shippingAddress?.pincode
    ) {
      return NextResponse.json(
        { error: 'Complete shipping address including pincode is required.' },
        { status: 400 }
      );
    }

    // 3. Validate Items & Recalculate Prices Strictly Server-Side
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Shopping bag cannot be empty.' },
        { status: 400 }
      );
    }

    const orderItems: OrderItemSnapshot[] = [];
    let serverSubtotal = 0;

    for (const item of items) {
      const product = await getProductBySlug(item.slug);
      if (!product) {
        return NextResponse.json(
          { error: `Product not found: ${item.slug}` },
          { status: 404 }
        );
      }

      const qty = Math.max(1, Number(item.quantity) || 1);
      const unitPrice = product.price; // ALWAYS use verified server price
      const lineTotal = unitPrice * qty;

      serverSubtotal += lineTotal;

      orderItems.push({
        productId: product.id,
        productName: product.name,
        slug: product.slug,
        sku: product.sku,
        imageUrl: product.images[0]?.url || '',
        unitPrice,
        quantity: qty,
        totalPrice: lineTotal,
      });
    }

    // 4. Server-Side Discount Calculation
    let discountAmount = 0;
    let validatedCoupon = '';
    if (couponCode && typeof couponCode === 'string') {
      const cleanCode = couponCode.trim().toUpperCase();
      const percent = VALID_COUPONS[cleanCode];
      if (percent) {
        discountAmount = Math.round((serverSubtotal * percent) / 100);
        validatedCoupon = cleanCode;
      }
    }

    const discountedSubtotal = Math.max(0, serverSubtotal - discountAmount);

    // 5. Server-Side Shipping Calculation (Free on orders >= ₹999)
    const shippingAmount = discountedSubtotal >= BRAND.shipping.freeThreshold ? 0 : BRAND.shipping.standardFee;
    const totalAmount = discountedSubtotal + shippingAmount;

    // 6. Create Order Record (Strictly razorpay)
    const newOrder = await createOrder({
      customer: {
        name: customer.name.trim(),
        email: customer.email.trim().toLowerCase(),
        phone: customer.phone.trim(),
      },
      shippingAddress: {
        name: shippingAddress.name || customer.name.trim(),
        phone: shippingAddress.phone || customer.phone.trim(),
        addressLine: shippingAddress.addressLine.trim(),
        city: shippingAddress.city.trim(),
        state: shippingAddress.state.trim(),
        pincode: shippingAddress.pincode.trim(),
      },
      items: orderItems,
      subtotal: serverSubtotal,
      discountAmount,
      couponCode: validatedCoupon || undefined,
      shippingAmount,
      totalAmount,
      paymentMethod: 'razorpay',
      paymentStatus: 'pending',
      orderStatus: 'pending',
      giftNote: giftNote ? String(giftNote).slice(0, 500) : undefined,
    });

    // 7. Prepare Razorpay configuration response
    const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_nazaara_demo';

    return NextResponse.json({
      success: true,
      order: newOrder,
      razorpay: {
        key: razorpayKey,
        amount: totalAmount * 100, // in paise
        currency: 'INR',
        name: BRAND.name,
        description: `Order #${newOrder.orderNumber}`,
        orderId: newOrder.id,
      },
    });
  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error while processing order.' },
      { status: 500 }
    );
  }
}
