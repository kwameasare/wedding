"use client";

import { FormEvent, useMemo, useState } from "react";
import { usePersonalization } from "@/lib/personalization";
import { events } from "@/lib/data/events";
import { motion } from "framer-motion";

const mealChoices = [
  { id: "garden", label: "Garden Greens & Burrata (Vegetarian)" },
  { id: "sea", label: "Sea Salt Crusted Halibut" },
  { id: "harissa", label: "Harissa Spiced Cauliflower (Vegan)" }
];

export function RSVPForm() {
  const { guest, saveRSVP, rsvp } = usePersonalization();
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const invitedEvents = useMemo(
    () => events.filter((event) => guest.eventsInvited.includes(event.id)),
    [guest.eventsInvited]
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const attendingEvents: Record<string, boolean> = {};
    invitedEvents.forEach((item) => {
      attendingEvents[item.id] = formData.get(item.id) === "on";
    });

    const kidsCount = Number(formData.get("kidsCount") ?? 0);

    const record = {
      attendingEvents,
      mealChoice: formData.get("mealChoice")?.toString(),
      dietaryNotes: formData.get("dietaryNotes")?.toString(),
      plusOneName: formData.get("plusOneName")?.toString(),
      plusOneDietary: formData.get("plusOneDietary")?.toString(),
      kidsCount: Number.isFinite(kidsCount) ? kidsCount : 0,
      message: formData.get("message")?.toString(),
      consentEmail: formData.get("consentEmail") === "on",
      consentSms: formData.get("consentSms") === "on"
    };

    if (!record.mealChoice) {
      setError("Please select a meal option so our chef can plan your plate.");
      setStatus("error");
      return;
    }

    setError(null);
    saveRSVP(record);
    setStatus("saved");
  }

  return (
    <form className="section-card space-y-6" onSubmit={handleSubmit} aria-describedby="rsvp-helper">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">RSVP for Your Moments</h2>
        <p id="rsvp-helper" className="text-sm text-slate-600">
          RSVP in under two minutes. Your personalized schedule will adapt instantly.
        </p>
      </div>
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-slate-700">Events you&apos;re invited to</legend>
        {invitedEvents.map((eventItem) => (
          <label key={eventItem.id} className="flex items-start gap-3 rounded-2xl bg-white/70 p-4 shadow-sm">
            <input
              type="checkbox"
              name={eventItem.id}
              defaultChecked={rsvp?.attendingEvents?.[eventItem.id] ?? true}
              className="mt-1 h-5 w-5 rounded border-slate-300 text-blush-500 focus:ring-blush-500"
            />
            <span>
              <span className="font-medium text-slate-800">{eventItem.name}</span>
              <br />
              <span className="text-sm text-slate-500">{eventItem.description}</span>
            </span>
          </label>
        ))}
      </fieldset>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Meal Preference</span>
          <select
            name="mealChoice"
            defaultValue={rsvp?.mealChoice ?? ""}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-blush-500 focus:outline-none focus:ring-2 focus:ring-blush-200"
            required
          >
            <option value="" disabled>
              Select your entrée
            </option>
            {mealChoices.map((choice) => (
              <option key={choice.id} value={choice.id}>
                {choice.label}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Dietary notes we should know</span>
          <input
            type="text"
            name="dietaryNotes"
            placeholder="Nut allergies, halal, keep the matcha coming…"
            defaultValue={rsvp?.dietaryNotes ?? guest.dietary?.join(", ") ?? ""}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-blush-500 focus:outline-none focus:ring-2 focus:ring-blush-200"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Plus-one name</span>
          <input
            type="text"
            name="plusOneName"
            defaultValue={rsvp?.plusOneName ?? ""}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-blush-500 focus:outline-none focus:ring-2 focus:ring-blush-200"
            placeholder="If you&apos;ve been granted a plus-one, let us know who!"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Plus-one dietary needs</span>
          <input
            type="text"
            name="plusOneDietary"
            defaultValue={rsvp?.plusOneDietary ?? ""}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-blush-500 focus:outline-none focus:ring-2 focus:ring-blush-200"
          />
        </label>
        {guest.kidsAllowed && (
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">How many kiddos are tagging along?</span>
            <input
              type="number"
              name="kidsCount"
              min={0}
              defaultValue={rsvp?.kidsCount ?? 0}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-blush-500 focus:outline-none focus:ring-2 focus:ring-blush-200"
            />
          </label>
        )}
      </div>
      <label className="space-y-2">
        <span className="text-sm font-semibold text-slate-700">Leave us a note</span>
        <textarea
          name="message"
          rows={4}
          defaultValue={rsvp?.message ?? ""}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-blush-500 focus:outline-none focus:ring-2 focus:ring-blush-200"
          placeholder="Toast ideas, travel updates, or secret handshakes we should know."
        />
      </label>
      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold text-slate-700">Stay in the loop</legend>
        <label className="flex items-center gap-3 text-sm text-slate-600">
          <input type="checkbox" name="consentEmail" defaultChecked={rsvp?.consentEmail ?? true} className="h-4 w-4" />
          Email me wedding updates and digital surprises.
        </label>
        <label className="flex items-center gap-3 text-sm text-slate-600">
          <input type="checkbox" name="consentSms" defaultChecked={rsvp?.consentSms ?? true} className="h-4 w-4" />
          Text me day-of reminders & QR pass.
        </label>
      </fieldset>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="rounded-full bg-blush-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blush-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400"
        >
          Submit RSVP
        </button>
        {status === "saved" && (
          <motion.p
            className="text-sm text-sage-700"
            role="status"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
          >
            RSVP locked! We sent a confirmation to your inbox (and yes, the DJ saw your notes).
          </motion.p>
        )}
      </div>
    </form>
  );
}
