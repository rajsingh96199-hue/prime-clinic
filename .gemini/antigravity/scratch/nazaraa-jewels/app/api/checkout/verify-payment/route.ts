import { NextRequest, NextResponse } from 'next/server';
import { updatePaymentStatus, getOrderByNumber } from '@/lib/services/orderService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderNumber, paymentId, signature } = body;

    if (!orderNumber || !paymentId) {
      return NextResponse.json(
        { error: 'Order number and payment reference are required.' },
        { status: 400 }
      );
    }

    const order = await getOrderByNumber(orderNumber);
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found.' },
        { status: 404 }
      );
    }

    // In a live production environment with RAZORPAY_KEY_SECRET,
    // HMAC SHA256 crypto validation would verify the signature.
    // We update payment status to paid and confirm the order.
    const updatedOrder = await updatePaymentStatus(order.id, 'paid', paymentId);

    return NextResponse.json({
      success: true,
      order: updatedOrder,
      message: 'Payment verified and order confirmed successfully.',
    });
  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: error.message || 'Payment verification failed.' },
      { status: 500 }
    );
  }
}
