import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/lib/constants/brand";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BRAND.name} | Premium Fashion & Imitation Jewellery`,
  description: `${BRAND.tagline} ${BRAND.subtagline} Explore handcrafted earrings, pendants, kadas, bracelets, enamel kadas, rings, wrist chains, and neck chains.`,
  keywords: [
    "Nazaara Jewels",
    "imitation jewellery",
    "fashion jewellery",
    "everyday jewellery",
    "anti-tarnish jewellery",
    "Indian fashion jewellery",
    "kadas",
    "enamel kadas",
    "wrist chain",
    "neck chain",
    "statement earrings",
    "affordable luxury",
  ],
  openGraph: {
    title: `${BRAND.name} — ${BRAND.shortPhilosophy}`,
    description:
      "Modern, minimal, and premium fashion jewellery crafted for effortless everyday style and confidence.",
    url: BRAND.website,
    siteName: BRAND.name,
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-sand-50 text-charcoal-900 font-sans selection:bg-wine-700 selection:text-sand-50">
        {children}
      </body>
    </html>
  );
}
