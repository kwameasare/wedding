import Image from "next/image";
import Link from "next/link";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GuestIdentityCard } from "@/components/GuestIdentityCard";
import { CountdownDisplay } from "@/components/CountdownDisplay";
import { storyTimeline } from "@/lib/data/story";

const heroMoments = [
  {
    number: "I",
    title: "The Day We Met",
    date: "24 Jun 2017",
    description: "A jazz-soaked rooftop where laughter lingered long after the music ended.",
    image: "https://images.unsplash.com/photo-1520854221052-1c5f48f56422?auto=format&fit=crop&w=900&q=80"
  },
  {
    number: "II",
    title: "Stories Intertwined",
    date: "02 Apr 2020",
    description: "Quiet mornings, shared sketches, and promises tucked between coffee rings.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
  },
  {
    number: "III",
    title: "The Next Chapter",
    date: "21 Jun 2025",
    description: "An oceanfront vow surrounded by the people who shaped our forever.",
    image: "https://images.unsplash.com/photo-1520854221050-0f4caff449fb?auto=format&fit=crop&w=900&q=80"
  }
];

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=80",
    alt: "Close-up of intertwined hands with wedding bands",
    span: "md:row-span-2"
  },
  {
    src: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80",
    alt: "Friends laughing with confetti falling",
    span: ""
  },
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80",
    alt: "Couple embracing during golden hour",
    span: ""
  },
  {
    src: "https://images.unsplash.com/photo-1520854221050-0f4caff449fb?auto=format&fit=crop&w=1000&q=80",
    alt: "The couple walking along a pier with the ocean behind",
    span: "md:row-span-2"
  },
  {
    src: "https://images.unsplash.com/photo-1489659639091-8b687bc4386e?auto=format&fit=crop&w=1000&q=80",
    alt: "Wedding cake surrounded by flowers",
    span: ""
  },
  {
    src: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80",
    alt: "Guests dancing with colorful lights",
    span: ""
  }
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-4 py-16">
        <section className="section-card overflow-hidden">
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
            <div className="flex flex-col gap-6">
              <p className="text-[0.65rem] uppercase tracking-[0.5em] text-champagne-500">June 21 · Newport, Rhode Island</p>
              <h1 className="font-playfair text-6xl uppercase leading-[1.1] tracking-[0.18em] text-ink-900">Harbor of Love</h1>
              <p className="max-w-xl text-[0.95rem] text-ink-600">
                An intimate, artfully curated celebration for the people who have held our story. Wander this space to discover
                bespoke timings, indulgent touches, and playful surprises created especially for you.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/rsvp"
                  className="rounded-full border border-champagne-400 px-8 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-ink-900 transition hover:bg-champagne-100"
                >
                  Begin RSVP
                </Link>
                <Link
                  href="/itinerary"
                  className="rounded-full border border-pearl-200 px-8 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-ink-600 transition hover:text-ink-900"
                >
                  View Itinerary
                </Link>
              </div>
              <CountdownDisplay />
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {heroMoments.map((moment) => (
                <article key={moment.number} className="flex flex-col items-center gap-4 text-center">
                  <div className="relative h-60 w-full overflow-hidden rounded-[120px] border border-pearl-200 bg-pearl-50">
                    <Image
                      src={moment.image}
                      alt={moment.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 220px, (min-width: 640px) 30vw, 80vw"
                    />
                  </div>
                  <p className="text-[0.6rem] uppercase tracking-[0.5em] text-champagne-500">{moment.number}</p>
                  <h2 className="font-playfair text-2xl uppercase tracking-[0.2em] text-ink-900">{moment.title}</h2>
                  <p className="text-xs uppercase tracking-[0.35em] text-ink-400">{moment.date}</p>
                  <p className="text-sm text-ink-600">{moment.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <GuestIdentityCard />
        <section className="section-card">
          <div className="flex flex-col gap-3">
            <p className="text-[0.65rem] uppercase tracking-[0.5em] text-champagne-500">Moodboard</p>
            <h2 className="font-playfair text-4xl uppercase tracking-[0.2em] text-ink-900">A gallery of quiet luxury</h2>
            <p className="max-w-2xl text-[0.95rem] text-ink-600">
              Sun-warmed neutrals, sculptural florals, and playful seaside light. These are the textures and tones that will
              greet you across the weekend.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {galleryImages.map((image) => (
              <figure key={image.src} className={`relative overflow-hidden rounded-[2.5rem] border border-pearl-200 ${image.span}`}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={750}
                  className="h-full w-full object-cover saturate-75"
                  sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 90vw"
                />
              </figure>
            ))}
          </div>
        </section>
        <section className="section-card">
          <div className="flex flex-col gap-3">
            <p className="text-[0.65rem] uppercase tracking-[0.5em] text-champagne-500">Celebration Flow</p>
            <h2 className="font-playfair text-4xl uppercase tracking-[0.2em] text-ink-900">Designed for ease and wonder</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <p className="text-[0.6rem] uppercase tracking-[0.45em] text-ink-400">Arrivals</p>
              <h3 className="text-lg font-semibold text-ink-900">Golden-hour welcome</h3>
              <p className="text-sm text-ink-600">
                Champagne silhouettes, live sketch artists, and curated playlists ease you into seaside serenity.
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-[0.6rem] uppercase tracking-[0.45em] text-ink-400">Vows</p>
              <h3 className="text-lg font-semibold text-ink-900">Ceremony overlooking the harbor</h3>
              <p className="text-sm text-ink-600">
                Our promises unfurl as the tide sways — with readings and music chosen for the role you play in our lives.
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-[0.6rem] uppercase tracking-[0.45em] text-ink-400">Evening</p>
              <h3 className="text-lg font-semibold text-ink-900">Soirée under the stars</h3>
              <p className="text-sm text-ink-600">
                Glide between candlelit lounges, a vinyl bar, and a bespoke dessert atelier as the night hums on.
              </p>
            </div>
          </div>
        </section>
        <section className="relative section-card overflow-hidden">
          <div className="flex flex-col gap-3">
            <p className="text-[0.65rem] uppercase tracking-[0.5em] text-champagne-500">Our story</p>
            <h2 className="font-playfair text-4xl uppercase tracking-[0.2em] text-ink-900">Threads we share with you</h2>
          </div>
          <div className="relative mt-10 grid gap-8 md:grid-cols-2">
            {storyTimeline.map((moment) => (
              <article key={moment.year} className="timeline-item p-8">
                <p className="text-[0.6rem] uppercase tracking-[0.45em] text-ink-400">{moment.year}</p>
                <h3 className="mt-3 text-2xl font-semibold text-ink-900">{moment.title}</h3>
                <p className="mt-3 text-sm text-ink-600">{moment.description}</p>
                {moment.guestHighlight && (
                  <p className="mt-4 text-[0.6rem] uppercase tracking-[0.45em] text-champagne-500">{moment.guestHighlight}</p>
                )}
              </article>
            ))}
          </div>
        </section>
        <section className="section-card">
          <div className="flex flex-col gap-3">
            <p className="text-[0.65rem] uppercase tracking-[0.5em] text-champagne-500">Your personal touches</p>
            <h2 className="font-playfair text-4xl uppercase tracking-[0.2em] text-ink-900">Shape the celebration</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3 rounded-[2rem] border border-pearl-200 bg-white/90 p-8 shadow-[0_18px_45px_rgba(24,22,20,0.05)]">
              <h3 className="text-lg font-semibold text-ink-900">Trivia Soirée</h3>
              <p className="text-sm text-ink-600">Test how well you know our story — we&apos;ll toast the highest score at midnight.</p>
              <Link
                href="/games"
                className="inline-flex rounded-full border border-champagne-300 px-6 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-ink-800"
              >
                Play now
              </Link>
            </div>
            <div className="space-y-3 rounded-[2rem] border border-pearl-200 bg-white/90 p-8 shadow-[0_18px_45px_rgba(24,22,20,0.05)]">
              <h3 className="text-lg font-semibold text-ink-900">Curate the soundtrack</h3>
              <p className="text-sm text-ink-600">Submit a track and we&apos;ll weave it into the set when the moment feels right.</p>
              <Link
                href="/music"
                className="inline-flex rounded-full border border-champagne-300 px-6 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-ink-800"
              >
                Share a song
              </Link>
            </div>
            <div className="space-y-3 rounded-[2rem] border border-pearl-200 bg-white/90 p-8 shadow-[0_18px_45px_rgba(24,22,20,0.05)]">
              <h3 className="text-lg font-semibold text-ink-900">Digital guestbook</h3>
              <p className="text-sm text-ink-600">Offer a wish, memory, or photo that we&apos;ll revisit each anniversary.</p>
              <Link
                href="/guestbook"
                className="inline-flex rounded-full border border-champagne-300 px-6 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-ink-800"
              >
                Leave a note
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
