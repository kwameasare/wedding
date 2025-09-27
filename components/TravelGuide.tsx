"use client";

import { usePersonalization } from "@/lib/personalization";

export function TravelGuide() {
  const { guest, getTravelOptions } = usePersonalization();
  const options = getTravelOptions();
  const firstName = guest.name.split(" ")[0] ?? guest.name;

  return (
    <section className="space-y-6">
      <div className="section-card">
        <h2 className="text-2xl font-semibold text-slate-900">Glide into the celebration</h2>
        <p className="text-sm text-slate-600">
          {firstName}, here&apos;s everything you need for a smooth arrival — whether you&apos;re pulling up in a rideshare, biking in,
          or cruising with friends.
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
