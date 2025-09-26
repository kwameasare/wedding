import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 bg-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h2 className="font-semibold text-lg">Harbor of Love</h2>
            <p className="mt-2 text-sm text-slate-300">
              Designed with love, inclusivity, and playfulness so every guest feels like the VIP they are.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Need a hand?</h3>
            <p className="mt-2 text-sm text-slate-300">
              Text our concierge team at <a href="tel:+15551234567" className="text-white">+1 (555) 123-4567</a> or email <a href="mailto:celebrate@harboroflove.com" className="text-white">celebrate@harboroflove.com</a>.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-1 text-sm text-slate-300">
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/travel">Travel Guide</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy & Data Requests</Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-10 text-xs text-slate-500">© {new Date().getFullYear()} Harbor of Love. Crafted sustainably & accessibly.</p>
      </div>
    </footer>
  );
}
