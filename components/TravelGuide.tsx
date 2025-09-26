"use client";

import { usePersonalization } from "@/lib/personalization";

export function TravelGuide() {
  const { guest, getTravelOptions } = usePersonalization();
  const options = getTravelOptions();

  return (
    <section className="space-y-6">
      <div className="section-card">
        <h2 className="text-2xl font-semibold text-slate-900">{guest.isOutOfTown ? "Welcome to Newport" : "Local Legends Toolkit"}</h2>
        <p className="text-sm text-slate-600">
          {guest.isOutOfTown
            ? "We pulled together arrival tips, hotel codes, and shuttles so your trip feels like a vacation from the moment you land."
            : "Here’s the insider scoop to make commuting a breeze and unlock day-of perks."}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {options.map((option) => (
          <article key={option.id} className="section-card">
            <h3 className="text-xl font-semibold text-slate-900">{option.title}</h3>
            <p className="text-sm text-slate-600">{option.description}</p>
            {option.code && <p className="text-xs uppercase tracking-wide text-sage-600">Code: {option.code}</p>}
            {option.link && (
              <a href={option.link} target="_blank" rel="noreferrer" className="inline-flex rounded-full bg-blush-500 px-4 py-2 text-sm font-semibold text-white">
                Book or Explore
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
