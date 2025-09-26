import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { PersonalizationInitializer } from "@/components/PersonalizationInitializer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Harbor of Love — Wedding Weekend",
  description:
    "An interactive, personalized celebration hub for our wedding weekend. RSVP, explore your itinerary, share memories, and play."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-gradient-to-br from-blush-100 via-white to-sage-100">
        <a href="#main" className="skip-link">
          Skip to personalized content
        </a>
        <Suspense fallback={<div className="p-6 text-center">Loading your personalized experience…</div>}>
          <PersonalizationInitializer>{children}</PersonalizationInitializer>
        </Suspense>
      </body>
    </html>
  );
}
