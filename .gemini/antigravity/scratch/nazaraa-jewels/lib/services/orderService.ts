import { Order, OrderStatus, PaymentStatus } from '@/types/order';

// In-memory / initial seed orders for demonstration and admin metrics
let ORDERS_STORE: Order[] = [
  {
    id: 'ord-001',
    orderNumber: 'NZR-20260902-8491',
    customer: {
      name: 'Ananya Sharma',
      email: 'ananya.sharma@gmail.com',
      phone: '9876543210',
    },
    shippingAddress: {
      name: 'Ananya Sharma',
      phone: '9876543210',
      addressLine: 'Apt 402, Sea Breeze Heights, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
    },
    items: [
      {
        productId: 'nz-001',
        productName: 'Aria Baroque Pearl Drop Earrings',
        slug: 'aria-baroque-pearl-drop-earrings',
        sku: 'NZ-EAR-001',
        imageUrl: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=400&q=80',
        unitPrice: 1499,
        quantity: 1,
        totalPrice: 1499,
      },
      {
        productId: 'nz-011',
        productName: 'Mira Emerald Solitaire Signet Ring',
        slug: 'mira-emerald-solitaire-signet-ring',
        sku: 'NZ-RNG-011',
        imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80',
        unitPrice: 1299,
        quantity: 1,
        totalPrice: 1299,
      },
    ],
    subtotal: 2798,
    discountAmount: 280,
    couponCode: 'NAZARAA10',
    shippingAmount: 0,
    totalAmount: 2518,
    paymentMethod: 'razorpay',
    paymentStatus: 'paid',
    orderStatus: 'processing',
    paymentReference: 'pay_Nzr918492Kla',
    createdAt: '2026-09-02T10:15:00Z',
    updatedAt: '2026-09-02T10:16:00Z',
  },
  {
    id: 'ord-002',
    orderNumber: 'NZR-20260901-7124',
    customer: {
      name: 'Pooja Hegde',
      email: 'pooja.h@outlook.com',
      phone: '9123456780',
    },
    shippingAddress: {
      name: 'Pooja Hegde',
      phone: '9123456780',
      addressLine: 'Villa 12, Palm Meadows, Whitefield',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560066',
    },
    items: [
      {
        productId: 'nz-005',
        productName: 'Rhea Sculptural Textured Gold Kada',
        slug: 'rhea-sculptural-textured-gold-kada',
        sku: 'NZ-KAD-005',
        imageUrl: 'https://images.unsplash.com/photo-1611591475828-59154f9d651c?auto=format&fit=crop&w=400&q=80',
        unitPrice: 1899,
        quantity: 1,
        totalPrice: 1899,
      },
      {
        productId: 'nz-015',
        productName: 'Serena Layered Flat Herringbone Neck Chain',
        slug: 'serena-layered-flat-herringbone-neck-chain',
        sku: 'NZ-NCK-015',
        imageUrl: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=400&q=80',
        unitPrice: 1499,
        quantity: 1,
        totalPrice: 1499,
      },
    ],
    subtotal: 3398,
    discountAmount: 0,
    shippingAmount: 0,
    totalAmount: 3398,
    paymentMethod: 'razorpay',
    paymentStatus: 'paid',
    orderStatus: 'shipped',
    paymentReference: 'pay_Plq817263Jhs',
    createdAt: '2026-09-01T14:20:00Z',
    updatedAt: '2026-09-01T16:00:00Z',
  },
  {
    id: 'ord-003',
    orderNumber: 'NZR-20260901-3891',
    customer: {
      name: 'Rhea Chakraborty',
      email: 'rhea.c@gmail.com',
      phone: '9988776655',
    },
    shippingAddress: {
      name: 'Rhea Chakraborty',
      phone: '9988776655',
      addressLine: '14/B, Alipore Road',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700027',
    },
    items: [
      {
        productId: 'nz-002',
        name: 'Celeste Ribbed Gold Chunky Hoops',
        productName: 'Celeste Ribbed Gold Chunky Hoops',
        slug: 'celeste-ribbed-gold-chunky-hoops',
        sku: 'NZ-EAR-002',
        imageUrl: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=400&q=80',
        unitPrice: 1199,
        quantity: 1,
        totalPrice: 1199,
      } as any,
    ],
    subtotal: 1199,
    discountAmount: 120,
    couponCode: 'NAZARAA10',
    shippingAmount: 0,
    totalAmount: 1079,
    paymentMethod: 'razorpay',
    paymentStatus: 'paid',
    orderStatus: 'delivered',
    paymentReference: 'pay_Kla981726Rzx',
    createdAt: '2026-09-01T18:45:00Z',
    updatedAt: '2026-09-03T11:20:00Z',
  },
];

export async function getOrders(): Promise<Order[]> {
  return [...ORDERS_STORE].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getOrderByNumber(orderNumber: string): Promise<Order | null> {
  return ORDERS_STORE.find((o) => o.orderNumber === orderNumber) || null;
}

export async function createOrder(
  orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>
): Promise<Order> {
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const orderNumber = `NZR-${timestamp}-${randomSuffix}`;

  const newOrder: Order = {
    ...orderData,
    id: `ord-${Date.now()}`,
    orderNumber,
    paymentMethod: 'razorpay',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  ORDERS_STORE.unshift(newOrder);
  return newOrder;
}

export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order | null> {
  const order = ORDERS_STORE.find((o) => o.id === orderId);
  if (!order) return null;

  order.orderStatus = status;
  order.updatedAt = new Date().toISOString();
  return order;
}

export async function updatePaymentStatus(orderId: string, status: PaymentStatus, ref?: string): Promise<Order | null> {
  const order = ORDERS_STORE.find((o) => o.id === orderId);
  if (!order) return null;

  order.paymentStatus = status;
  if (ref) order.paymentReference = ref;
  if (status === 'paid' && order.orderStatus === 'pending') {
    order.orderStatus = 'confirmed';
  }
  order.updatedAt = new Date().toISOString();
  return order;
}

export async function getDashboardMetrics() {
  const orders = await getOrders();
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.orderStatus === 'pending').length;
  const processingOrders = orders.filter((o) => o.orderStatus === 'processing' || o.orderStatus === 'confirmed').length;
  const shippedOrders = orders.filter((o) => o.orderStatus === 'shipped').length;
  const deliveredOrders = orders.filter((o) => o.orderStatus === 'delivered').length;
  const cancelledOrders = orders.filter((o) => o.orderStatus === 'cancelled').length;

  return {
    totalRevenue,
    totalOrders,
    pendingOrders,
    processingOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,
  };
}
