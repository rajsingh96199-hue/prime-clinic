/**
 * Nazaara Jewels — Centralized Brand Configuration & Single Source of Truth
 * Use these constants throughout the application.
 */

export const BRAND = {
  name: 'Nazaara Jewels',
  tagline: 'Jewellery that speaks for you.',
  subtagline: 'Timeless pieces, effortless style, made for every version of you.',
  shortPhilosophy: 'Made to be noticed every day.',
  
  // Official Contact Details
  whatsapp: {
    number: '+91 8657466854',
    raw: '918657466854',
    defaultMessage:
      'Hi Nazaara Jewels! I’m interested in your jewellery collection and would like to know more about your products.',
    getLink: (customMessage?: string) => {
      const msg = customMessage || BRAND.whatsapp.defaultMessage;
      return `https://wa.me/${BRAND.whatsapp.raw}?text=${encodeURIComponent(msg)}`;
    },
    getOrderSupportLink: (orderNumber: string) => {
      const msg = `Hi Nazaara Jewels! I need help with my Order #${orderNumber}.`;
      return `https://wa.me/${BRAND.whatsapp.raw}?text=${encodeURIComponent(msg)}`;
    },
    getProductInquiryLink: (productName: string, sku: string) => {
      const msg = `Hi Nazaara Jewels! I would like to inquire about "${productName}" (SKU: ${sku}).`;
      return `https://wa.me/${BRAND.whatsapp.raw}?text=${encodeURIComponent(msg)}`;
    },
  },

  instagram: {
    handle: '@nazaara.jewels',
    url: 'https://www.instagram.com/nazaara.jewels/',
  },

  email: {
    address: 'nazaara.jewelss@gmail.com',
    mailto: 'mailto:nazaara.jewelss@gmail.com',
    supportMailto: (subject: string) =>
      `mailto:nazaara.jewelss@gmail.com?subject=${encodeURIComponent(subject)}`,
  },

  phone: '+91 8657466854',
  website: 'https://nazaarajewels.com',

  // Policies & Highlights
  shipping: {
    freeThreshold: 999,
    standardFee: 99,
  },

  coupons: {
    welcome: 'NAZARAA10',
    festive: 'FESTIVE15',
  },
} as const;
