"use client";

import { usePersonalization } from "@/lib/personalization";

export function GuestIdentityCard() {
  const { guest } = usePersonalization();

  return (
    <section className="gradient-border section-card relative overflow-hidden">
      <div className="flex flex-col gap-3">
        <p className="text-sm uppercase tracking-[0.3em] text-blush-500">Your Harbor Pass</p>
        <h1 className="text-3xl font-semibold text-slate-900">
          {guest.name}, we&apos;re so glad you&apos;re here!
        </h1>
        <p className="text-slate-600">
          You&apos;re joining us as our cherished <span className="font-medium text-blush-600">{guest.relation.toLowerCase()}</span> on the {guest.side === "both" ? "whole crew" : `${guest.side} side`}. Dive into tailored events, travel tips, and surprises curated just for you.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-blush-100 px-4 py-2 text-blush-600">Role: {guest.role}</span>
          {guest.city && (
            <span className="rounded-full bg-sage-100 px-4 py-2 text-sage-700">Home Base: {guest.city}</span>
          )}
          {guest.dietary && guest.dietary.length > 0 && (
            <span className="rounded-full bg-slate-900 px-4 py-2 text-white">Dietary: {guest.dietary.join(", ")}</span>
          )}
        </div>
      </div>
    </section>
  );
}
