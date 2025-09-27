"use client";

import { FormEvent, useState } from "react";
import { usePersonalization } from "@/lib/personalization";

export function MusicRequestForm() {
  const { submitMusicRequest, musicRequests, guest } = usePersonalization();
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    submitMusicRequest({
      song: formData.get("song")?.toString() ?? "",
      artist: formData.get("artist")?.toString() ?? "",
      dedication: formData.get("dedication")?.toString(),
      energy: (formData.get("energy") as "chill" | "dance" | "wild") ?? "dance"
    });
    event.currentTarget.reset();
    setStatus("submitted");
  }

  return (
    <section className="space-y-6">
      <form className="section-card space-y-4" onSubmit={handleSubmit}>
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Request a Song</h2>
          <p className="text-sm text-slate-600">
            Let&apos;s soundtrack the night together. We&apos;ll text you when your pick is up next!
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-1 text-sm text-slate-700">
            Song title
            <input
              type="text"
              name="song"
              required
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-blush-500 focus:outline-none focus:ring-2 focus:ring-blush-200"
              placeholder="e.g., Electric Feel"
            />
          </label>
          <label className="space-y-1 text-sm text-slate-700">
            Artist
            <input
              type="text"
              name="artist"
              required
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-blush-500 focus:outline-none focus:ring-2 focus:ring-blush-200"
              placeholder="MGMT"
            />
          </label>
          <label className="space-y-1 text-sm text-slate-700">
            Dedicate to someone?
            <input
              type="text"
              name="dedication"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-blush-500 focus:outline-none focus:ring-2 focus:ring-blush-200"
              placeholder="For the newlyweds / For Amy / Our college crew"
            />
          </label>
          <label className="space-y-1 text-sm text-slate-700">
            Energy zone
            <select
              name="energy"
              defaultValue="dance"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-blush-500 focus:outline-none focus:ring-2 focus:ring-blush-200"
            >
              <option value="chill">Chill cocktail vibes</option>
              <option value="dance">Dance floor heat</option>
              <option value="wild">After-party chaos</option>
            </select>
          </label>
        </div>
        <button
          type="submit"
          className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
        >
          Submit request
        </button>
        {status === "submitted" && (
          <p className="text-sm text-sage-700" role="status">
            Got it! Our DJ just added it to {guest.name.split(" ")[0]}’s playlist queue.
          </p>
        )}
      </form>
      {musicRequests.length > 0 && (
        <div className="section-card">
          <h3 className="text-lg font-semibold text-slate-900">Your submissions</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            {musicRequests.map((request, index) => (
              <li key={`${request.song}-${index}`} className="rounded-2xl bg-white/70 p-3">
                <p className="font-semibold text-slate-800">{request.song}</p>
                <p>{request.artist}</p>
                <p className="text-xs uppercase tracking-wide text-blush-500">Energy: {request.energy}</p>
                {request.dedication && <p className="text-xs text-slate-500">Dedication: {request.dedication}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
