import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Cursor } from "@/components/ui/cursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arora Bakery — Crafted with Love | Khanna, Punjab",
  description:
    "A luxurious artisanal bakery in Khanna, Punjab. Freshly baked everyday — cakes, pastries, breads and desserts, crafted with love since 1987.",
  openGraph: {
    title: "Arora Bakery — Crafted with Love",
    description:
      "Luxurious artisanal bakery in Khanna, Punjab. Freshly baked everyday since 1987.",
    type: "website",
    locale: "en_IN",
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
      className={`${inter.variable} ${cormorant.variable} h-full`}
    >
      <body className={`flex min-h-full flex-col antialiased`}>        <Cursor>
          <SmoothScroll>{children}</SmoothScroll>
        </Cursor>
      </body>
    </html>
  );
}