"use client";

import { usePersonalization } from "@/lib/personalization";
import { EventCard } from "@/components/EventCard";
import { DateTime } from "luxon";

export function SmartItinerary() {
  const { guest, getPersonalizedEvents } = usePersonalization();
  const events = getPersonalizedEvents();

  return (
    <section className="space-y-6">
      <div className="section-card">
        <h2 className="text-2xl font-semibold text-slate-900">Your smart itinerary</h2>
        <p className="text-sm text-slate-600">
          We calculated local transit based on your home base ({guest.city || "New York"}). Expect reminders exactly when it&apos;s time to leave.
        </p>
      </div>
      <div className="space-y-4">
        {events.map((event) => {
          const leaveBy = DateTime.fromISO(event.start)
            .minus({ minutes: guest.isOutOfTown ? 45 : 20 })
            .toFormat("h:mm a");
          return (
            <div key={event.id} className="space-y-3">
              <EventCard event={event} />
              <p className="text-sm text-slate-500">
                Suggested leave time: <span className="font-semibold text-slate-700">{leaveBy}</span> ({guest.isOutOfTown ? "includes shuttle buffer" : "based on local traffic"}).
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
