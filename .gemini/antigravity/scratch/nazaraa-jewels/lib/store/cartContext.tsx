'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { MOCK_PRODUCTS } from '@/lib/constants/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  description: string;
}

const VALID_COUPONS: Record<string, Coupon> = {
  NAZARAA10: {
    code: 'NAZARAA10',
    discountPercent: 10,
    description: '10% Off Welcome Discount',
  },
  FESTIVE15: {
    code: 'FESTIVE15',
    discountPercent: 15,
    description: '15% Off Festive Promotion',
  },
};

const FREE_SHIPPING_THRESHOLD = 999;
const STANDARD_SHIPPING_FEE = 99;

interface CartContextType {
  cart: CartItem[];
  wishlist: string[];
  appliedCoupon: Coupon | null;
  giftNote: string;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  totalCartItems: number;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  finalTotal: number;
  freeShippingThreshold: number;
  remainingForFreeShipping: number;
  addToCart: (product: Product, quantity?: number) => boolean;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => boolean;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  setGiftNote: (note: string) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'nazaraa_cart_v2';
const WISHLIST_STORAGE_KEY = 'nazaraa_wishlist_v2';
const COUPON_STORAGE_KEY = 'nazaraa_coupon_v2';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [giftNote, setGiftNote] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      const storedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);

      if (storedCart) {
        setCart(JSON.parse(storedCart));
      } else {
        setCart([{ product: MOCK_PRODUCTS[0], quantity: 1 }]);
      }

      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      } else {
        setWishlist([MOCK_PRODUCTS[1].id]);
      }

      if (storedCoupon) {
        setAppliedCoupon(JSON.parse(storedCoupon));
      }
    } catch (e) {
      console.error('Error hydrating cart', e);
    } finally {
      setHasHydrated(true);
    }
  }, []);

  // Persist state
  useEffect(() => {
    if (!hasHydrated) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart', e);
    }
  }, [cart, hasHydrated]);

  useEffect(() => {
    if (!hasHydrated) return;
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Error saving wishlist', e);
    }
  }, [wishlist, hasHydrated]);

  useEffect(() => {
    if (!hasHydrated) return;
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Error saving coupon', e);
    }
  }, [appliedCoupon, hasHydrated]);

  const addToCart = (product: Product, quantity = 1): boolean => {
    let success = true;
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      const currentQty = existing ? existing.quantity : 0;
      const newQty = currentQty + quantity;

      if (newQty > product.stockQuantity) {
        alert(`Sorry, only ${product.stockQuantity} pieces available in stock.`);
        success = false;
        return prev;
      }

      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        );
      }
      return [...prev, { product, quantity }];
    });

    if (success) {
      setIsCartOpen(true);
    }
    return success;
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number): boolean => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return true;
    }

    const item = cart.find((i) => i.product.id === productId);
    if (item && quantity > item.product.stockQuantity) {
      alert(`Only ${item.product.stockQuantity} items in stock.`);
      return false;
    }

    setCart((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
    return true;
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const applyCoupon = (rawCode: string) => {
    const cleanCode = rawCode.trim().toUpperCase();
    const coupon = VALID_COUPONS[cleanCode];

    if (!coupon) {
      return {
        success: false,
        message: 'Invalid promo code. Try NAZARAA10 for 10% off.',
      };
    }

    setAppliedCoupon(coupon);
    return {
      success: true,
      message: `Coupon ${coupon.code} applied (${coupon.discountPercent}% OFF)!`,
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const discountAmount = appliedCoupon
    ? Math.round((subtotal * appliedCoupon.discountPercent) / 100)
    : 0;

  const discountedSubtotal = Math.max(0, subtotal - discountAmount);

  const shippingFee =
    cart.length === 0 || discountedSubtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : STANDARD_SHIPPING_FEE;

  const finalTotal = discountedSubtotal + shippingFee;

  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - discountedSubtotal
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        appliedCoupon,
        giftNote,
        isCartOpen,
        isSearchOpen,
        totalCartItems,
        subtotal,
        discountAmount,
        shippingFee,
        finalTotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        remainingForFreeShipping,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isWishlisted,
        applyCoupon,
        removeCoupon,
        setGiftNote,
        setIsCartOpen,
        setIsSearchOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
