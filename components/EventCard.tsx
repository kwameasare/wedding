import { DateTime } from "luxon";
import type { EventDetail } from "@/lib/data/events";

export function EventCard({ event }: { event: EventDetail }) {
  const start = DateTime.fromISO(event.start);
  const end = DateTime.fromISO(event.end);
  return (
    <article className="section-card">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-sage-600">{start.toFormat("EEE, MMM d")}</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-900">{event.name}</h3>
        </div>
        <p className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase text-white">
          {start.toFormat("h:mm a")} – {end.toFormat("h:mm a")}
        </p>
      </header>
      <p className="text-slate-600">{event.description}</p>
      <dl className="grid gap-4 text-sm text-slate-600 md:grid-cols-2">
        <div>
          <dt className="font-semibold text-slate-700">Location</dt>
          <dd>
            {event.location}
            <br />
            <a href={event.mapsLink} target="_blank" rel="noreferrer" className="text-blush-600">
              {event.address}
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-700">Dress Code</dt>
          <dd>{event.dressCode}</dd>
        </div>
        {event.shuttleTimes && (
          <div>
            <dt className="font-semibold text-slate-700">Shuttle</dt>
            <dd className="space-y-1">
              {event.shuttleTimes.map((time) => (
                <p key={time}>{time}</p>
              ))}
            </dd>
          </div>
        )}
        {event.accessibilityNotes && (
          <div>
            <dt className="font-semibold text-slate-700">Accessibility</dt>
            <dd>{event.accessibilityNotes}</dd>
          </div>
        )}
      </dl>
    </article>
  );
}
