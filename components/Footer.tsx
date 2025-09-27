import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-pearl-200 bg-white/70">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-2">
            <p className="font-playfair text-2xl uppercase tracking-[0.4em] text-ink-900">Harbor of Love</p>
            <p className="text-sm text-ink-500">
              Crafted for cherished company — a calm, gracious space to prepare for the day we say yes forever.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-500">Personal concierge</h3>
            <p className="text-sm text-ink-600">
              Text <a href="tel:+15551234567">+1 (555) 123-4567</a> or email <a href="mailto:celebrate@harboroflove.com">celebrate@harboroflove.com</a> for anything you need.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-500">Details</h3>
            <ul className="space-y-1 text-sm text-ink-600">
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
        <p className="mt-12 text-[0.65rem] uppercase tracking-[0.4em] text-ink-400">© {new Date().getFullYear()} Harbor of Love</p>
      </div>
    </footer>
  );
}
