"use client";

import { usePersonalization } from "@/lib/personalization";

export function GiftRecommendations() {
  const { guest, getPersonalizedGifts } = usePersonalization();
  const gifts = getPersonalizedGifts();

  return (
    <section className="space-y-4">
      <div className="section-card">
        <h2 className="text-2xl font-semibold text-slate-900">Gifts curated for {guest.name.split(" ")[0]}</h2>
        <p className="text-sm text-slate-600">
          We suggested items that match your <span className="font-semibold text-slate-800">{guest.budgetHint}</span> vibe and interests like {guest.interests.join(", ")}. Feel free to explore the full registry below.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {gifts.map((gift) => (
          <article key={gift.id} className="section-card">
            <h3 className="text-xl font-semibold text-slate-900">{gift.title}</h3>
            <p className="text-sm text-slate-600">{gift.description}</p>
            <p className="text-xs uppercase tracking-wide text-blush-500">Category: {gift.category}</p>
            <a
              href={gift.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              View Gift Details
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
