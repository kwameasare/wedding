import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { PersonalizationInitializer } from "@/components/PersonalizationInitializer";

const body = Manrope({ subsets: ["latin"], variable: "--font-body" });
const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Harbor of Love — Wedding Weekend",
  description:
    "An interactive, personalized celebration hub for our wedding weekend. RSVP, explore your itinerary, share memories, and play."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body className="min-h-screen bg-pearl-50 text-ink-800">
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
