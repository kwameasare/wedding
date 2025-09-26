import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { storyTimeline } from "@/lib/data/story";
import { GuestIdentityCard } from "@/components/GuestIdentityCard";

export const metadata = {
  title: "Our Story — Harbor of Love"
};

export default function StoryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-4 py-12">
        <GuestIdentityCard />
        <section className="section-card">
          <h2 className="text-2xl font-semibold text-slate-900">How we got here</h2>
          <p className="text-sm text-slate-600">
            Every milestone is paired with a moment you shaped. Hover on desktop or tap on mobile to reveal personal shoutouts.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {storyTimeline.map((moment) => (
              <article key={moment.year} className="rounded-3xl bg-white/80 p-6 shadow transition hover:-translate-y-1 hover:shadow-xl">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{moment.year}</p>
                <h3 className="text-xl font-semibold text-slate-900">{moment.title}</h3>
                <p className="text-sm text-slate-600">{moment.description}</p>
                {moment.guestHighlight && (
                  <p className="mt-3 text-xs uppercase tracking-wide text-blush-500">{moment.guestHighlight}</p>
                )}
              </article>
            ))}
          </div>
        </section>
        <section className="section-card">
          <h2 className="text-2xl font-semibold text-slate-900">What&apos;s next</h2>
          <p className="text-sm text-slate-600">
            After the wedding we&apos;re launching a digital zine featuring your photos, recipes from the dinner, and AI-crafted thank-you notes referencing your gifts and guestbook entries.
          </p>
          <p className="mt-3 text-sm text-slate-600">
            Want in? Make sure you RSVP and consent to emails so we can send the unlock codes.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
