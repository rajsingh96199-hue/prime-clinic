# 💎 Nazaara Jewels — Modern E-Commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.3.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Payment_Gateway-0C2340?style=for-the-badge&logo=razorpay)](https://razorpay.com/)

> **"Jewellery that speaks for you. Timeless pieces, effortless style, made for every version of you."**

**Nazaara Jewels** is a full-stack, editorial e-commerce platform crafted for premium imitation, anti-tarnish, and contemporary fashion jewellery. Built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **Supabase (PostgreSQL with RLS)**, and **Razorpay Payments**, it offers an end-to-end luxury shopping and store management experience.

---

## 📑 Table of Contents

- [✨ Key Highlights & Features](#-key-highlights--features)
  - [🛍️ Customer Storefront](#-customer-storefront)
  - [🛡️ Admin Management Portal](#️-admin-management-portal)
  - [⚡ Technical & Architectural Highlights](#-technical--architectural-highlights)
- [📞 Brand & Official Contact Details](#-brand--official-contact-details)
- [🏗️ Project Architecture & Directory Structure](#️-project-architecture--directory-structure)
- [🎨 Design System & Aesthetics](#-design-system--aesthetics)
- [🗄️ Database Schema & Models (Supabase)](#️-database-schema--models-supabase)
- [🔌 API Endpoints & Server Logic](#-api-endpoints--server-logic)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Clone & Install](#1-clone--install)
  - [2. Environment Variables Setup](#2-environment-variables-setup)
  - [3. Supabase Database Migration](#3-supabase-database-migration)
  - [4. Start Development Server](#4-start-development-server)
- [🏷️ Coupons & Shipping Rules](#️-coupons--shipping-rules)
- [📦 Available Scripts](#-available-scripts)
- [🚀 Deployment](#-deployment)

---

## ✨ Key Highlights & Features

### 🛍️ Customer Storefront

1. **Focused Editorial Homepage (`/`)**
   - **Announcement Bar**: Dynamic banner with free shipping threshold counters and promo codes.
   - **Hero Section**: High-impact editorial imagery ("Jewellery that speaks for you.") with direct CTAs to `Shop Collection` and `Explore Categories`.
   - **Our Philosophy**: "Made to be noticed every day." — storytelling highlighting individuality, everyday fashion, and self-confidence.
   - **Why Nazaara Jewels (4 Core Pillars)**:
     - `01 Designed for everyday`: Feather-light, comfortable, and skin-friendly.
     - `02 Affordable luxury`: 18K gold plating and premium stones without traditional markups.
     - `03 Made to style`: Proportionally balanced chains, stackable kadas, and statement earrings.
     - `04 Carefully packed`: Individually inspected pieces in protective velvet pouches.
   - **Luxury Footer**: Direct navigation, WhatsApp, Instagram, Gmail, and category links.

2. **Dedicated New Arrivals Page (`/new-arrivals`)**
   - Displays fresh drops where `isNewArrival = true`.
   - Complete product cards with image zoom, pricing, compare price, discount percentage badges, inventory limits, and instant add-to-bag.

3. **Dedicated Categories Page (`/categories`)**
   - Displays the **8 Primary Jewellery Categories**:
     1. **Earrings** (`/categories/earrings`)
     2. **Pendants** (`/categories/pendants`)
     3. **Kadas** (`/categories/kadas`)
     4. **Bracelets** (`/categories/bracelets`)
     5. **Enamel Kadas** (`/categories/enamel-kadas`)
     6. **Rings** (`/categories/rings`)
     7. **Wrist Chain** (`/categories/wrist-chain`)
     8. **Neck Chain** (`/categories/neck-chain`)

4. **Dedicated Brand Story & About Page (`/about`)**
   - Brand origins, philosophy, jewellery positioning, quality standards, and direct contact CTAs.

5. **Catalog & Intelligent Filtering (`/shop`)**
   - Multi-category faceted filtering across the 8 categories.
   - Dynamic price range selector and "In Stock Only" toggle.
   - Keyword search across product names, descriptions, and materials.
   - Sorting: *Featured*, *Newest*, *Price: Low to High*, *Price: High to Low*, *Bestsellers*.

6. **Rich Product Detail Page (`/products/[slug]`)**
   - Multi-angle image gallery with interactive thumbnail selector and zoom view.
   - Dynamic pricing displays with strike-through compare prices and percentage savings badges.
   - Expandable accordion drawers for *Materials & Care Instructions*, *Shipping & Delivery Information*, and *Returns & Exchange Policy*.
   - Direct **WhatsApp Consultation Button** with prefilled product SKU inquiry message.
   - Related product recommendations based on category and popularity.

7. **Interactive Bag Drawer (`/cart`)**
   - Slide-over bag drawer accessible from any page header.
   - Free shipping progress bar (threshold: ₹999).
   - Promo coupon engine (`NAZARAA10`, `FESTIVE15`).
   - Personalised gift packaging note input.

8. **Secure Online Checkout (`/checkout`)**
   - **100% Online Payment via Razorpay Gateway** (UPI, Credit/Debit Cards, Net Banking, Wallets).
   - **Cash on Delivery (COD) is completely eliminated** on both frontend and backend API.
   - Strictly server-side calculated pricing to prevent client tampering.

9. **Order Confirmation & Tracking (`/order-success/[orderNumber]`)**
   - Formatted order receipt and invoice summary.
   - 4-step delivery progress stepper (*Order Placed* ➔ *Processing* ➔ *Shipped* ➔ *Delivered*).
   - Direct WhatsApp order support button with prefilled order number.

---

### 🛡️ Admin Management Portal

Located at `/admin` (protected via `/admin/login`):

1. **Secure Admin Authentication (`/admin/login`)**
   - Authentication gateway with passcode/token verification.
   - Unauthenticated visitors are automatically redirected to login.
   - No public unrestricted registration flow.

2. **Executive Dashboard (`/admin/dashboard`)**
   - KPI Cards: Total Revenue (₹ INR), Total Orders, Pending Orders, Processing Orders, Shipped Orders, Delivered Orders.
   - **Low Stock Warning Panel**: Real-time monitoring of items below 15 units.
   - **Recent Orders Table**: Live order overview.

3. **Product Catalog & Price/Offer Manager (`/admin/products`)**
   - Full CRUD operations (Add, Edit, Delete).
   - Manage regular price, compare/original price, offer discount tags, stock quantity, 8 categories, and merchandising flags.

4. **Order Lifecycle & Status Manager (`/admin/orders`)**
   - Search orders by customer name, email, phone number, or Order ID (`NZR-YYYYMMDD-XXXX`).
   - Status filters: *All*, *Pending*, *Confirmed*, *Processing*, *Shipped*, *Delivered*, *Cancelled*.
   - Direct WhatsApp customer communication shortcut.
   - Live Order Status and Payment Status updater (`pending`, `paid`, `failed`, `refunded`).

5. **Category Manager (`/admin/categories`)**
   - Manage the 8 jewellery categories and display active counts.

---

## 📞 Brand & Official Contact Details

| Channel | Details |
| :--- | :--- |
| **Brand Name** | **Nazaara Jewels** |
| **WhatsApp Number** | `+91 8657466854` |
| **WhatsApp Link** | [`https://wa.me/918657466854?text=...`](https://wa.me/918657466854) |
| **Instagram** | [`@nazaara.jewels`](https://www.instagram.com/nazaara.jewels/) |
| **Email** | [`nazaara.jewelss@gmail.com`](mailto:nazaara.jewelss@gmail.com) |
| **Website** | `https://nazaarajewels.com` |

---

## 🏗️ Project Architecture & Directory Structure

```
nazaraa-jewels/
├── app/                                 # Next.js App Router root
│   ├── about/page.tsx                   # Dedicated brand story & about page
│   ├── admin/                           # Admin portal routes
│   │   ├── categories/page.tsx          # Category management
│   │   ├── dashboard/page.tsx           # Metrics & low stock dashboard
│   │   ├── login/page.tsx               # Secure admin login gateway
│   │   ├── orders/page.tsx              # Order fulfillment & status manager
│   │   ├── products/page.tsx            # Product catalog CRUD & pricing
│   │   └── page.tsx                     # Admin entrance / redirect
│   ├── api/                             # Server API routes
│   │   └── checkout/
│   │       ├── create-order/route.ts    # Order creation (rejects COD, Razorpay only)
│   │       └── verify-payment/route.ts  # Razorpay payment verification
│   ├── cart/page.tsx                    # Full-page shopping cart
│   ├── categories/
│   │   ├── page.tsx                     # 8 primary categories visual directory
│   │   └── [slug]/page.tsx              # Dynamic category catalog page
│   ├── checkout/page.tsx                # Online-only checkout & Razorpay
│   ├── new-arrivals/page.tsx            # Dedicated new arrivals page
│   ├── order-success/[orderNumber]/     # Order confirmation & WhatsApp support
│   │   └── page.tsx
│   ├── products/[slug]/page.tsx         # Detailed product page & WhatsApp inquiry
│   ├── shop/page.tsx                    # Full catalog with faceted search
│   ├── globals.css                      # Tailwind v4 theme & base styles
│   ├── layout.tsx                       # Root HTML & typography layout
│   ├── page.tsx                         # Focused editorial homepage
│   ├── robots.ts                        # Search engine crawlers config
│   └── sitemap.ts                       # Dynamic sitemap generator
├── components/                          # Modular UI components
│   ├── admin/                           # Admin layout & sidebar
│   │   ├── AdminLayout.tsx              # Admin authentication guard shell
│   │   └── AdminSidebar.tsx             # Admin navigation bar with Sign Out
│   ├── cart/                            # Cart & bag components
│   │   └── CartDrawer.tsx               # Slide-over cart bag with free shipping bar
│   ├── home/                            # Homepage sections
│   │   ├── BrandStorySection.tsx        # Our Philosophy section
│   │   ├── HeroSection.tsx              # Hero banner ("Jewellery that speaks for you.")
│   │   ├── InstagramFeedSection.tsx     # Curated @nazaara.jewels gallery
│   │   ├── NewsletterSection.tsx        # Email capture section
│   │   └── WhyNazaraaSection.tsx        # Why Nazaara Jewels (4 core pillars)
│   ├── layout/                          # Global layout elements
│   │   ├── AnnouncementBar.tsx          # Rotating top announcement bar
│   │   ├── Footer.tsx                   # Luxury footer with WhatsApp/Instagram/Gmail
│   │   ├── MobileMenu.tsx               # Mobile navigation drawer
│   │   ├── Navbar.tsx                   # Main header (Home, New Arrivals, Categories, About)
│   │   └── SearchModal.tsx              # Instant product search popup
│   ├── product/                         # Product-specific components
│   │   ├── ProductAccordions.tsx        # Care, shipping, and specifications tabs
│   │   ├── ProductCard.tsx              # Luxury product card with hover states
│   │   ├── ProductGallery.tsx           # Multi-photo gallery & zoom
│   │   ├── ProductOrderActions.tsx      # Add to bag / buy now button group
│   │   └── QuickViewModal.tsx           # Fast popup product preview
│   └── ui/                              # Reusable atomic UI elements
├── lib/                                 # Business logic, state, and utilities
│   ├── constants/                       # Static mock data & image assets
│   │   ├── brand.ts                     # Single source of truth for brand info
│   │   ├── images.ts                    # Curated photography
│   │   └── products.ts                  # The 8 categories & product catalog
│   ├── services/                        # Database / mock service abstractions
│   │   ├── orderService.ts              # Order creation, status updates & metrics
│   │   └── productService.ts            # Product fetching, filtering & queries
│   ├── store/                           # Client-side global state
│   │   ├── adminAuthContext.tsx         # Admin authentication session provider
│   │   └── cartContext.tsx              # Bag, wishlist, coupon & modal provider
│   ├── supabase/                        # Database connection & schemas
│   │   ├── client.ts                    # Browser-side Supabase client
│   │   ├── schema.sql                   # PostgreSQL schema & RLS policies
│   │   └── server.ts                    # Server-side Supabase client
│   └── utils.ts                         # Formatting (INR Currency, discounts, cn)
├── types/                               # TypeScript interfaces
│   ├── order.ts                         # Orders, customer info, status types
│   └── product.ts                       # Product, category (8 slugs), and image schemas
└── package.json                         # Project dependencies and scripts
```

---

## 🎨 Design System & Aesthetics

| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Wine Deep / Primary** | `#6e1b2e` | Primary brand accents, primary buttons, badges |
| **Wine Light** | `#fcf7f8` / `#f7ebed` | Subtle highlight backgrounds, pill badges |
| **Sand Background** | `#faf7f2` | Primary page background tone |
| **Sand Surface** | `#f4efea` / `#eae1d6` | Cards, input fields, borders, dividers |
| **Charcoal Foreground** | `#181615` | High-contrast luxury headings and body text |
| **Taupe Secondary** | `#7a726a` | Secondary descriptions, metadata, SKU labels |
| **Ivory / Cream** | `#fcfaf7` | Modal sheets, drawer backgrounds |

### Typography

- **Headings & Display**: `Cormorant Garamond` (Google Font serif) for timeless elegance.
- **Body & UI Controls**: `Plus Jakarta Sans` (Google Font sans-serif) for modern clarity.

---

## 🗄️ Database Schema & Models (Supabase)

The complete SQL migration script is located in [`lib/supabase/schema.sql`](file:///c:/Users/Raj/.gemini/antigravity/scratch/nazaraa-jewels/lib/supabase/schema.sql).

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
# Navigate to the project directory
cd nazaraa-jewels

# Install all dependencies
npm install
```

### 2. Environment Variables Setup

Create a `.env.local` file:

```env
# -------------------------------------------------------------
# SUPABASE CONFIGURATION (Optional - Fallbacks to mock catalog)
# -------------------------------------------------------------
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# -------------------------------------------------------------
# RAZORPAY PAYMENT GATEWAY (Optional - Test keys supported)
# -------------------------------------------------------------
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key

# -------------------------------------------------------------
# APPLICATION URL
# -------------------------------------------------------------
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Start Development Server

```bash
npm run dev
```

- **Storefront**: [http://localhost:3000](http://localhost:3000)
- **New Arrivals**: [http://localhost:3000/new-arrivals](http://localhost:3000/new-arrivals)
- **Categories**: [http://localhost:3000/categories](http://localhost:3000/categories)
- **About Brand**: [http://localhost:3000/about](http://localhost:3000/about)
- **Admin Portal**: [http://localhost:3000/admin](http://localhost:3000/admin) (Login: `Nazaara@Admin2026`)

---

## 🏷️ Coupons & Shipping Rules

### Active Promo Codes

| Code | Discount | Description |
| :--- | :--- | :--- |
| `NAZARAA10` | **10% OFF** | Welcome promo code for first-time shoppers |
| `FESTIVE15` | **15% OFF** | Special festive celebration promotion |

### Shipping Calculation

- **Free Shipping**: Applied automatically when order subtotal (after discounts) is **₹999 or higher**.
- **Standard Shipping**: Flat **₹99** across India for orders below ₹999.

---

## 📄 License

This project is proprietary and crafted for **Nazaara Jewels**. All rights reserved.
