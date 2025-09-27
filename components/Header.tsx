"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePersonalization } from "@/lib/personalization";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/story", label: "Our Story" },
  { href: "/rsvp", label: "RSVP" },
  { href: "/itinerary", label: "Your Itinerary" },
  { href: "/travel", label: "Travel" },
  { href: "/registry", label: "Gifts" },
  { href: "/music", label: "Music" },
  { href: "/games", label: "Play" },
  { href: "/guestbook", label: "Guestbook" },
  { href: "/admin", label: "Admin" }
];

export function Header() {
  const pathname = usePathname();
  const { guest, toggleTheme, theme } = usePersonalization();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-pearl-200/80 bg-pearl-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-4" aria-label="Go to personalized home">
          <span className="font-playfair text-xl uppercase tracking-[0.6em] text-ink-900">S & D</span>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-xs tracking-[0.38em] text-ink-500">Harbor of Love</span>
            <span className="text-[0.7rem] uppercase tracking-[0.4em] text-ink-400">Welcome {guest.name.split(" ")[0]}</span>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative pb-1 text-[0.7rem] font-semibold uppercase tracking-[0.4em] transition ${
                pathname === link.href ? "text-ink-900" : "text-ink-500 hover:text-ink-800"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-pearl-200 px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-ink-500 transition hover:border-champagne-300 hover:text-ink-800"
          >
            {theme === "contrast" ? "Default View" : "High Contrast"}
          </button>
        </nav>
        <button
          type="button"
          className="inline-flex items-center rounded-full border border-pearl-200 p-2 text-ink-600 md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>
      <Dialog open={open} onClose={setOpen} className="md:hidden">
        <div className="fixed inset-0 z-50 bg-black/30" aria-hidden="true" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-80 max-w-full bg-pearl-50 p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <p className="font-semibold tracking-[0.4em] text-ink-600">Navigate</p>
            <button
              type="button"
              className="rounded-full border border-pearl-200 p-2 text-ink-600"
              onClick={() => setOpen(false)}
              aria-label="Close navigation"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-2xl border border-pearl-200 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] transition ${
                  pathname === link.href ? "bg-champagne-100 text-ink-900" : "bg-white text-ink-500"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-2xl border border-pearl-200 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-ink-600"
            >
              {theme === "contrast" ? "Default View" : "High Contrast"}
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
