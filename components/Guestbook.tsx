"use client";

import { FormEvent, useState } from "react";
import { usePersonalization } from "@/lib/personalization";

export function Guestbook() {
  const { addGuestbookEntry, guestbookEntries, guest } = usePersonalization();
  const [mood, setMood] = useState<"teary" | "cheering" | "nostalgic" | "playful">("cheering");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    addGuestbookEntry({
      name: guest.name,
      message: formData.get("message")?.toString() ?? "",
      mood,
      createdAt: new Date().toISOString()
    });
    event.currentTarget.reset();
  }

  return (
    <section className="space-y-6">
      <form className="section-card space-y-4" onSubmit={handleSubmit}>
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Leave a love note</h2>
          <p className="text-sm text-slate-600">Your words will appear on the reception projection wall and in our time capsule.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {["teary", "cheering", "nostalgic", "playful"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setMood(option as typeof mood)}
              className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${mood === option ? "bg-blush-500 text-white" : "bg-white text-slate-600"}`}
            >
              {option}
            </button>
          ))}
        </div>
        <textarea
          name="message"
          rows={4}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-blush-500 focus:outline-none focus:ring-2 focus:ring-blush-200"
          placeholder="Tell us a favorite memory or future wish…"
          required
        />
        <button
          type="submit"
          className="rounded-full bg-blush-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blush-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400"
        >
          Share to guestbook
        </button>
      </form>
      {guestbookEntries.length > 0 && (
        <div className="section-card">
          <h3 className="text-lg font-semibold text-slate-900">Messages from our circle</h3>
          <ul className="space-y-4">
            {guestbookEntries.map((entry, index) => (
              <li key={`${entry.name}-${index}`} className="rounded-2xl bg-white/70 p-4">
                <p className="text-sm font-semibold text-slate-800">{entry.name}</p>
                <p className="text-sm text-slate-600">{entry.message}</p>
                <p className="text-xs uppercase tracking-wide text-slate-400">Mood: {entry.mood}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
