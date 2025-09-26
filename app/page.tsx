import Image from "next/image";
import Link from "next/link";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GuestIdentityCard } from "@/components/GuestIdentityCard";
import { CountdownDisplay } from "@/components/CountdownDisplay";
import { storyTimeline } from "@/lib/data/story";

const heroGallery = [
  {
    src: "https://images.unsplash.com/photo-1520854221052-1c5f48f56422?auto=format&fit=crop&w=900&q=80",
    alt: "A just-married couple twirls on a dock at sunset"
  },
  {
    src: "https://images.unsplash.com/photo-1530023367847-a683933f4177?auto=format&fit=crop&w=900&q=80",
    alt: "Guests cheering with sparklers as the couple walks past"
  },
  {
    src: "https://images.unsplash.com/photo-1499955085172-a104c9463ece?auto=format&fit=crop&w=900&q=80",
    alt: "Table with flowers, candles, and handwritten notes"
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
      <main id="main" className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-4 py-12">
        <section className="relative overflow-hidden rounded-[3rem] bg-slate-900 text-white shadow-2xl">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1800&q=80"
              alt="Oceanfront wedding ceremony setup with chairs facing the water"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 1200px, 100vw"
            />
            <div className="absolute inset-0 bg-slate-900/60" />
          </div>
          <div className="relative grid gap-10 p-10 md:grid-cols-[1.25fr_0.75fr] md:p-16">
            <div className="flex flex-col gap-6">
              <p className="text-xs uppercase tracking-[0.4em] text-sage-200">June 21, 2025 · Newport, Rhode Island</p>
              <h1 className="font-playfair text-4xl font-semibold md:text-5xl lg:text-6xl">Harbor of Love</h1>
              <p className="max-w-xl text-lg text-sage-100">
                A day of heart-bursting vows, cinematic light, and the people who make our story whole. Glide through your
                personalized schedule, drop a wish, and help us soundtrack the night.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/rsvp" className="rounded-full bg-blush-400 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg">
                  Start RSVP
                </Link>
                <Link
                  href="/itinerary"
                  className="rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  View your itinerary
                </Link>
              </div>
              <CountdownDisplay />
            </div>
            <div className="grid gap-4">
              {heroGallery.map((image) => (
                <div key={image.src} className="relative h-40 overflow-hidden rounded-3xl shadow-lg sm:h-48">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 420px, 80vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        <GuestIdentityCard />
        <section className="section-card">
          <h2 className="text-2xl font-semibold text-slate-900">Our day in frames</h2>
          <p className="text-sm text-slate-600">
            Preview the moods we&apos;re dreaming up — sun-washed vows, sparkling nightcaps, and all the joyful little in-betweens.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {galleryImages.map((image) => (
              <figure key={image.src} className={`relative overflow-hidden rounded-3xl ${image.span}`}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={750}
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 90vw"
                />
              </figure>
            ))}
          </div>
        </section>
        <section className="section-card">
          <h2 className="text-2xl font-semibold text-slate-900">Celebration flow</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.3em] text-sage-600">Warm welcome</p>
              <h3 className="text-lg font-semibold text-slate-800">Golden-hour gathering</h3>
              <p className="text-sm text-slate-600">
                Arrive at the harbor lawn, sign the sailcloth guestbook, and grab a fizz as live sketches capture the moment.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.3em] text-sage-600">Ceremony glow</p>
              <h3 className="text-lg font-semibold text-slate-800">Vows with a view</h3>
              <p className="text-sm text-slate-600">
                Hear our story woven into music, poetry, and promises — complete with a confetti cannon finale.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.3em] text-sage-600">Night to remember</p>
              <h3 className="text-lg font-semibold text-slate-800">Immersive dance party</h3>
              <p className="text-sm text-slate-600">
                Wander between the vinyl lounge, neon arcade, and dessert garden as the playlist evolves with your requests.
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
