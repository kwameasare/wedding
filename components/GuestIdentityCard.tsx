"use client";

import { usePersonalization } from "@/lib/personalization";

export function GuestIdentityCard() {
  const { guest } = usePersonalization();

  return (
    <section className="section-card relative overflow-hidden">
      <div className="flex flex-col gap-4">
        <p className="text-[0.65rem] uppercase tracking-[0.5em] text-champagne-500">Your soirée profile</p>
        <h1 className="font-playfair text-4xl uppercase leading-tight tracking-[0.2em] text-ink-900">
          {guest.name}, we&apos;re so glad you&apos;re here.
        </h1>
        <p className="text-[0.95rem] text-ink-600">
          Joining us as our cherished <span className="font-semibold text-ink-900">{guest.relation.toLowerCase()}</span> on the
          {" "}
          {guest.side === "both" ? "whole crew" : `${guest.side} side`}. Your portal is curated with the timing, touches, and
          thoughtful gestures we planned with you in mind.
        </p>
        <div className="flex flex-wrap gap-3 text-xs">
          <span className="rounded-full border border-pearl-200 px-5 py-2 uppercase tracking-[0.35em] text-ink-600">
            Role · {guest.role}
          </span>
          {guest.city && (
            <span className="rounded-full border border-pearl-200 px-5 py-2 uppercase tracking-[0.35em] text-ink-600">
              Home · {guest.city}
            </span>
          )}
          {guest.dietary && guest.dietary.length > 0 && (
            <span className="rounded-full border border-pearl-200 px-5 py-2 uppercase tracking-[0.35em] text-ink-600">
              Dietary · {guest.dietary.join(" · ")}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
