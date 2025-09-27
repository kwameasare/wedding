"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { events } from "@/lib/data/events";
import { usePersonalization } from "@/lib/personalization";
import { GuestRole, type GuestProfile, normalizeGuestProfile } from "@/lib/models/guest";

const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8080";

type AdminTab = "overview" | "guests" | "messages";

type GuestFormState = {
  name: string;
  relation: string;
  side: "bride" | "groom" | "both";
  role: GuestRole;
  city: string;
  timezone: string;
  language: "en" | "es" | "fr";
  dietary: string;
  accessibility: string;
  interests: string;
  budgetHint: "cherish" | "splurge" | "experience";
  isOutOfTown: boolean;
  eventsInvited: string;
  hotelPreference: string;
  travelNotes: string;
  kidsAllowed: boolean;
};

const emptyForm: GuestFormState = {
  name: "",
  relation: "",
  side: "both",
  role: "friend",
  city: "",
  timezone: "America/New_York",
  language: "en",
  dietary: "",
  accessibility: "",
  interests: "",
  budgetHint: "cherish",
  isOutOfTown: false,
  eventsInvited: "ceremony,lawn-party,reception",
  hotelPreference: "",
  travelNotes: "",
  kidsAllowed: false
};

function parseList(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

export function AdminDashboard() {
  const { guest } = usePersonalization();
  const [tab, setTab] = useState<AdminTab>("overview");
  const [guests, setGuests] = useState<GuestProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<GuestFormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [origin, setOrigin] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const fetchGuests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${backendBase}/api/guests`);
      if (!response.ok) {
        throw new Error(`Unable to load guests (${response.status})`);
      }
      const data = (await response.json()) as GuestProfile[];
      setGuests(data.map((entry) => normalizeGuestProfile(entry)));
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to load guests");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchGuests();
  }, [fetchGuests]);

  const totals = useMemo(() => {
    const dietary = guests.filter((entry) => (entry.dietary?.length ?? 0) > 0).length;
    const interestSet = new Set<string>();
    guests.forEach((entry) => {
      entry.interests.forEach((interest) => interestSet.add(interest));
    });

    return {
      profiles: guests.length,
      dietary,
      uniqueInterests: interestSet.size
    };
  }, [guests]);

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    const value = target instanceof HTMLInputElement && target.type === "checkbox" ? target.checked : target.value;
    const name = target.name as keyof GuestFormState;
    setForm((prev) => ({
      ...prev,
      [name]: value as never
    }));
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSubmitting(true);
      setError(null);
      setGeneratedUrl(null);

      const payload = {
        name: form.name.trim(),
        relation: form.relation.trim(),
        side: form.side,
        role: form.role,
        city: form.city.trim(),
        timezone: form.timezone.trim(),
        language: form.language,
        dietary: parseList(form.dietary),
        accessibility: parseList(form.accessibility),
        interests: parseList(form.interests),
        budgetHint: form.budgetHint,
        isOutOfTown: form.isOutOfTown,
        eventsInvited: parseList(form.eventsInvited),
        hotelPreference: form.hotelPreference.trim() || undefined,
        travelNotes: form.travelNotes.trim() || undefined,
        kidsAllowed: form.kidsAllowed
      };

      try {
        const response = await fetch(`${backendBase}/api/guests`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          const errorBody = await response.json().catch(() => null);
          const message = errorBody?.error || `Unable to create guest (${response.status})`;
          throw new Error(message);
        }

        const data = (await response.json()) as { guest: GuestProfile };
        const normalized = normalizeGuestProfile(data.guest);
        const url = `${origin || ""}/?code=${normalized.code}`;
        setGeneratedUrl(url);
        setForm({ ...emptyForm });
        await fetchGuests();
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Failed to create guest");
      } finally {
        setSubmitting(false);
      }
    },
    [form, origin, fetchGuests]
  );

  return (
    <section className="section-card space-y-6">
      <header className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.3em] text-blush-500">Admin mode</p>
        <h2 className="text-2xl font-semibold text-slate-900">Command center</h2>
        <p className="text-sm text-slate-600">
          Logged in as {guest.name}. Monitor personalized experiences, onboard new guests, and share magic links with a single
          click.
        </p>
      </header>
      <div className="flex flex-wrap gap-3">
        {[
          { key: "overview", label: "Overview" },
          { key: "guests", label: "Guest Directory" },
          { key: "messages", label: "Comms" }
        ].map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setTab(item.key as AdminTab)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${tab === item.key ? "bg-slate-900 text-white" : "bg-white text-slate-600"}`}
          >
            {item.label}
          </button>
        ))}
      </div>
      {tab === "overview" && (
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow">
            <p className="text-xs uppercase tracking-wide text-slate-500">Guest profiles</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{totals.profiles}</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow">
            <p className="text-xs uppercase tracking-wide text-slate-500">Dietary notes tracked</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{totals.dietary}</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow">
            <p className="text-xs uppercase tracking-wide text-slate-500">Signature moments</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{Math.max(totals.uniqueInterests, events.length)}</p>
          </div>
        </div>
      )}
      {tab === "guests" && (
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="grid gap-4 rounded-3xl bg-white p-6 shadow">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-slate-900">Add a guest</h3>
              <p className="text-sm text-slate-600">
                Capture guest preferences and we&apos;ll generate their invitation link instantly.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Full name
                <input
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  className="rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-blush-500 focus:outline-none"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Relation to couple
                <input
                  name="relation"
                  value={form.relation}
                  onChange={handleInputChange}
                  className="rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-blush-500 focus:outline-none"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Side
                <select
                  name="side"
                  value={form.side}
                  onChange={handleInputChange}
                  className="rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-blush-500 focus:outline-none"
                >
                  <option value="bride">Bride</option>
                  <option value="groom">Groom</option>
                  <option value="both">Both</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Role
                <select
                  name="role"
                  value={form.role}
                  onChange={handleInputChange}
                  className="rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-blush-500 focus:outline-none"
                >
                  <option value="friend">Friend</option>
                  <option value="family">Family</option>
                  <option value="bridesmaid">Bridesmaid</option>
                  <option value="groomsman">Groomsman</option>
                  <option value="vip">VIP</option>
                  <option value="vendor">Vendor</option>
                  <option value="visitor">Visitor</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                City &amp; state
                <input
                  name="city"
                  value={form.city}
                  onChange={handleInputChange}
                  className="rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-blush-500 focus:outline-none"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Timezone
                <input
                  name="timezone"
                  value={form.timezone}
                  onChange={handleInputChange}
                  className="rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-blush-500 focus:outline-none"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Preferred language
                <select
                  name="language"
                  value={form.language}
                  onChange={handleInputChange}
                  className="rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-blush-500 focus:outline-none"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Gift approach
                <select
                  name="budgetHint"
                  value={form.budgetHint}
                  onChange={handleInputChange}
                  className="rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-blush-500 focus:outline-none"
                >
                  <option value="cherish">Cherish</option>
                  <option value="splurge">Splurge</option>
                  <option value="experience">Experience</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 md:col-span-2">
                Dietary preferences (comma separated)
                <input
                  name="dietary"
                  value={form.dietary}
                  onChange={handleInputChange}
                  placeholder="vegan, gluten-free"
                  className="rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-blush-500 focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 md:col-span-2">
                Accessibility notes (comma separated)
                <input
                  name="accessibility"
                  value={form.accessibility}
                  onChange={handleInputChange}
                  placeholder="caption-preferred"
                  className="rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-blush-500 focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 md:col-span-2">
                Interests to surprise them with (comma separated)
                <input
                  name="interests"
                  value={form.interests}
                  onChange={handleInputChange}
                  placeholder="indie pop, craft coffee"
                  className="rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-blush-500 focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 md:col-span-2">
                Events invited to (comma separated IDs)
                <input
                  name="eventsInvited"
                  value={form.eventsInvited}
                  onChange={handleInputChange}
                  placeholder="ceremony,lawn-party,reception"
                  className="rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-blush-500 focus:outline-none"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Hotel preference
                <input
                  name="hotelPreference"
                  value={form.hotelPreference}
                  onChange={handleInputChange}
                  className="rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-blush-500 focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Travel notes
                <textarea
                  name="travelNotes"
                  value={form.travelNotes}
                  onChange={handleInputChange}
                  className="min-h-[80px] rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-blush-500 focus:outline-none"
                />
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  name="isOutOfTown"
                  checked={form.isOutOfTown}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-slate-300 text-blush-500 focus:ring-blush-500"
                />
                Traveling in for the celebration
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  name="kidsAllowed"
                  checked={form.kidsAllowed}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-slate-300 text-blush-500 focus:ring-blush-500"
                />
                Bringing little ones
              </label>
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                disabled={submitting}
              >
                {submitting ? "Saving guest…" : "Create guest magic link"}
              </button>
              {generatedUrl && (
                <p className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  Share this personalized link: <span className="font-semibold text-slate-900">{generatedUrl}</span>
                </p>
              )}
              {error && (
                <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
              )}
            </div>
          </form>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="rounded-3xl bg-white p-6 text-sm text-slate-600 shadow">Loading guest directory…</div>
            ) : guests.length === 0 ? (
              <div className="rounded-3xl bg-white p-6 text-sm text-slate-600 shadow">No guests have been added yet.</div>
            ) : (
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-2 font-semibold text-slate-700">Name</th>
                    <th className="px-4 py-2 font-semibold text-slate-700">Code</th>
                    <th className="px-4 py-2 font-semibold text-slate-700">Role</th>
                    <th className="px-4 py-2 font-semibold text-slate-700">Events</th>
                    <th className="px-4 py-2 font-semibold text-slate-700">Dietary</th>
                    <th className="px-4 py-2 font-semibold text-slate-700">Magic link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white/70">
                  {guests.map((entry) => {
                    const inviteUrl = `${origin || ""}/?code=${entry.code}`;
                    return (
                      <tr key={entry.code}>
                        <td className="px-4 py-2 font-medium text-slate-800">{entry.name}</td>
                        <td className="px-4 py-2 text-slate-600">{entry.code}</td>
                        <td className="px-4 py-2 capitalize text-slate-600">{entry.role}</td>
                        <td className="px-4 py-2 text-slate-600">{entry.eventsInvited.join(", ")}</td>
                        <td className="px-4 py-2 text-slate-600">{(entry.dietary ?? []).join(", ") || "None"}</td>
                        <td className="px-4 py-2 text-slate-600">
                          <a href={inviteUrl} className="text-blush-600 underline" target="_blank" rel="noreferrer">
                            {inviteUrl}
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
      {tab === "messages" && (
        <div className="space-y-4">
          <div className="rounded-3xl bg-white p-6 shadow">
            <h3 className="text-lg font-semibold text-slate-900">Segmented reminders</h3>
            <p className="text-sm text-slate-600">
              Draft WhatsApp nudges for arrival support. Preview: “{`{name}`}, valet opens at 2:15 PM at 15 Marina Way. Text ARRIVE if
              you&apos;d like a host to meet you curbside.”
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
