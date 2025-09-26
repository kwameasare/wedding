# Harbor of Love — Personalized Wedding Experience

An immersive, personalized wedding hub built with Next.js and Tailwind CSS. Guests arrive via a magic link invite code to unlock bespoke greetings, RSVP flows, smart itineraries, travel helpers, interactive entertainment, and a digital guestbook. Admins get a sandbox dashboard previewing analytics, exports, and segmented communications.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000?code=AMY823 to explore a bridesmaid experience. Swap the code (`RAJ507`, `MIA242`, `JON110`, `LIV912`) to see tailored itineraries, arrival perks, and registry suggestions. Without a code, the site defaults to a visitor view.

## Highlights

- **Personalization engine** persisting guest identity, RSVPs, music requests, and guestbook notes with high-contrast accessibility toggle.
- **RSVP workflow** captures attendance per event, dietary details, plus-one info, and communications consent in under two minutes.
- **Smart itinerary** filters relevant events, surfaces accessibility notes, and calculates “leave by” reminders per guest.
- **Arrival, registry, and entertainment modules** adapt content for each guest’s role, budget hints, and interests.
- **Engagement layer** featuring trivia game, song requests with dedications, and an interactive digital guestbook.
- **Admin sandbox** summarizing RSVP stats, dietary flags, mock exports, and segmented messaging previews.
- **Accessibility features** including skip links, high-contrast mode, semantic content structure, and focus-visible styling.

## Project structure

- `app/` — Next.js App Router pages for each experience surface (home, RSVP, itinerary, admin, etc.).
- `components/` — Reusable UI and interactive client components.
- `lib/data/` — Mock personalization datasets for guests, events, gifts, travel, and story moments.
- `lib/personalization.ts` — Client-side personalization context handling persistence and tailored content helpers.

## Extending

Hook the personalization context into real APIs for RSVPs, seating charts, or Twilio/SendGrid communications. Integrate storage for photo uploads and real-time dashboards to graduate from demo to production.
