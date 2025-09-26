"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePersonalization } from "@/lib/personalization";
import { Bars3Icon, XMarkIcon, SparklesIcon } from "@heroicons/react/24/outline";
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
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-white/60 shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2" aria-label="Go to personalized home">
          <SparklesIcon className="h-7 w-7 text-blush-500" />
          <div>
            <p className="font-semibold text-slate-800">Harbor of Love</p>
            <p className="text-xs text-slate-500">Welcome {guest.name.split(" ")[0]}!</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400 ${pathname === link.href ? "bg-blush-500 text-white shadow" : "text-slate-700 hover:bg-white/70"}`}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 hover:bg-slate-100"
          >
            {theme === "contrast" ? "Default View" : "High Contrast"}
          </button>
        </nav>
        <button
          type="button"
          className="inline-flex items-center rounded-full border border-slate-200 p-2 text-slate-600 md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>
      <Dialog open={open} onClose={setOpen} className="md:hidden">
        <div className="fixed inset-0 z-50 bg-black/30" aria-hidden="true" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-80 max-w-full bg-white p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-slate-800">Navigate</p>
            <button
              type="button"
              className="rounded-full border border-slate-200 p-2 text-slate-600"
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
                className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${pathname === link.href ? "bg-blush-500 text-white" : "bg-slate-100 text-slate-700"}`}
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700"
            >
              {theme === "contrast" ? "Default View" : "High Contrast"}
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
