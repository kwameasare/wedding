"use client";

import { useMemo, useState } from "react";
import { guestDirectory } from "@/lib/data/guests";
import { events } from "@/lib/data/events";
import { usePersonalization } from "@/lib/personalization";

const mockRsvps = Object.values(guestDirectory).map((guest, index) => ({
  guest,
  status: index % 2 === 0 ? "confirmed" : "pending",
  meal: index % 3 === 0 ? "harissa" : index % 3 === 1 ? "sea" : "garden",
  plusOne: index % 2 === 0,
  dietaryNotes: guest.dietary?.join(", ") ?? "None"
}));

export function AdminDashboard() {
  const { guest } = usePersonalization();
  const [tab, setTab] = useState<"overview" | "guests" | "messages">("overview");
  const totals = useMemo(() => {
    const attending = mockRsvps.filter((rsvp) => rsvp.status === "confirmed").length;
    const dietary = mockRsvps.filter((rsvp) => (rsvp.guest.dietary?.length ?? 0) > 0).length;
    return { attending, dietary, total: mockRsvps.length };
  }, []);

  return (
    <section className="section-card space-y-6">
      <header className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.3em] text-blush-500">Admin mode</p>
        <h2 className="text-2xl font-semibold text-slate-900">Command center</h2>
        <p className="text-sm text-slate-600">
          Logged in as {guest.name}. This sandbox dashboard shows what the full CMS offers: RSVP analytics, seating exports, and segmented communications.
        </p>
      </header>
      <div className="flex flex-wrap gap-3">
        {[
          { key: "overview", label: "Overview" },
          { key: "guests", label: "Guest RSVPs" },
          { key: "messages", label: "Comms" }
        ].map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setTab(item.key as typeof tab)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${tab === item.key ? "bg-slate-900 text-white" : "bg-white text-slate-600"}`}
          >
            {item.label}
          </button>
        ))}
      </div>
      {tab === "overview" && (
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow">
            <p className="text-xs uppercase tracking-wide text-slate-500">Confirmed RSVPs</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{totals.attending}</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow">
            <p className="text-xs uppercase tracking-wide text-slate-500">Dietary Flags</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{totals.dietary}</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow">
            <p className="text-xs uppercase tracking-wide text-slate-500">Events Tracked</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{events.length}</p>
          </div>
        </div>
      )}
      {tab === "guests" && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-2 font-semibold text-slate-700">Name</th>
                <th className="px-4 py-2 font-semibold text-slate-700">Status</th>
                <th className="px-4 py-2 font-semibold text-slate-700">Meal</th>
                <th className="px-4 py-2 font-semibold text-slate-700">Dietary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white/70">
              {mockRsvps.map((entry) => (
                <tr key={entry.guest.code}>
                  <td className="px-4 py-2 font-medium text-slate-800">{entry.guest.name}</td>
                  <td className="px-4 py-2 capitalize text-slate-600">{entry.status}</td>
                  <td className="px-4 py-2 uppercase text-slate-600">{entry.meal}</td>
                  <td className="px-4 py-2 text-slate-600">{entry.dietaryNotes || "None"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {tab === "messages" && (
        <div className="space-y-4">
          <div className="rounded-3xl bg-white p-6 shadow">
            <h3 className="text-lg font-semibold text-slate-900">Segmented reminders</h3>
            <p className="text-sm text-slate-600">
              Draft WhatsApp nudges for arrival support. Preview: “{`{name}`}, valet opens at 2:15 PM at 15 Marina Way. Text ARRIVE if you&apos;d like a host to meet you curbside.”
            </p>
            <button className="mt-4 inline-flex rounded-full bg-blush-500 px-4 py-2 text-sm font-semibold text-white">
              Send test message
            </button>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow">
            <h3 className="text-lg font-semibold text-slate-900">Exports</h3>
            <p className="text-sm text-slate-600">
              Download seating chart PDFs, vendor briefs, and CSV exports. (In this demo, imagine a download triggered here!)
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
