import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GuestIdentityCard } from "@/components/GuestIdentityCard";
import { CountdownDisplay } from "@/components/CountdownDisplay";
import Link from "next/link";
import { storyTimeline } from "@/lib/data/story";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-4 py-12">
        <section className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
          <div className="gradient-border section-card">
            <p className="text-sm uppercase tracking-[0.3em] text-blush-500">June 21, 2025 · Newport, Rhode Island</p>
            <h1 className="font-playfair text-4xl font-semibold text-slate-900 md:text-5xl">
              Harbor of Love
            </h1>
            <p className="text-lg text-slate-600">
              A weekend of vows, voyages, and vibrant memories. Unlock your personalized plan, share a wish, and join the magic.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/rsvp" className="rounded-full bg-blush-500 px-6 py-3 text-sm font-semibold text-white shadow-lg">
                Start RSVP
              </Link>
              <Link
                href="/itinerary"
                className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-white"
              >
                View your itinerary
              </Link>
            </div>
            <CountdownDisplay />
          </div>
          <GuestIdentityCard />
        </section>
        <section className="section-card">
          <h2 className="text-2xl font-semibold text-slate-900">Weekend highlights</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.3em] text-sage-600">Playful Utility</p>
              <h3 className="text-lg font-semibold text-slate-800">Concierge-level logistics</h3>
              <p className="text-sm text-slate-600">
                Shuttles, QR passes, reminders, and check-in flows crafted to be effortless.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.3em] text-sage-600">Personal Connection</p>
              <h3 className="text-lg font-semibold text-slate-800">Story threads just for you</h3>
              <p className="text-sm text-slate-600">
                See how you&apos;re woven into our timeline, from meet-cute to now.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.3em] text-sage-600">Evergreen Memories</p>
              <h3 className="text-lg font-semibold text-slate-800">Live gallery & thank-yous</h3>
              <p className="text-sm text-slate-600">
                Upload memories, cheer on live reactions, and get bespoke thank-you notes.
              </p>
            </div>
          </div>
        </section>
        <section className="relative section-card overflow-hidden">
          <h2 className="text-2xl font-semibold text-slate-900">How you fit into our story</h2>
          <div className="relative mt-8 flex flex-col gap-10 md:pl-8">
            <div className="timeline absolute inset-0" aria-hidden="true" />
            <div className="relative flex flex-col gap-8">
              {storyTimeline.map((moment) => (
                <article key={moment.year} className="timeline-item rounded-3xl bg-white/80 p-6 shadow">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{moment.year}</p>
                  <h3 className="text-xl font-semibold text-slate-900">{moment.title}</h3>
                  <p className="text-sm text-slate-600">{moment.description}</p>
                  {moment.guestHighlight && (
                    <p className="text-xs uppercase tracking-wide text-blush-500">{moment.guestHighlight}</p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section-card">
          <h2 className="text-2xl font-semibold text-slate-900">Unlock interactive fun</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-slate-900 p-6 text-slate-100">
              <h3 className="text-xl font-semibold">Trivia Quest</h3>
              <p className="mt-2 text-sm">
                Beat your fellow guests in our couple trivia game to earn drink tokens.
              </p>
              <Link href="/games" className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900">
                Play now
              </Link>
            </div>
            <div className="rounded-3xl bg-sage-100 p-6 text-slate-800">
              <h3 className="text-xl font-semibold">Request the soundtrack</h3>
              <p className="mt-2 text-sm">Tell the DJ what will get you dancing and we&apos;ll queue it up.</p>
              <Link href="/music" className="mt-4 inline-flex rounded-full bg-sage-600 px-4 py-2 text-sm font-semibold text-white">
                Submit a song
              </Link>
            </div>
            <div className="rounded-3xl bg-white p-6 text-slate-800 shadow">
              <h3 className="text-xl font-semibold">Digital guestbook</h3>
              <p className="mt-2 text-sm">Drop a memory or upload a photo to appear on our live wall.</p>
              <Link href="/guestbook" className="mt-4 inline-flex rounded-full bg-blush-500 px-4 py-2 text-sm font-semibold text-white">
                Share a note
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
