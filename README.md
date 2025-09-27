# Harbor of Love — Personalized Wedding Experience

An immersive, personalized wedding hub built with Next.js, Tailwind CSS, and a Go + SQLite backend. Guests arrive via a magic link invite code to unlock bespoke greetings, RSVP flows, smart itineraries, travel helpers, interactive entertainment, and a digital guestbook. Admins use a production-ready dashboard to onboard guests, generate invitation URLs, and review evolving celebration insights.

## Getting started

1. **Install frontend dependencies**
   ```bash
   npm install
   ```
2. **Start the Go backend** (runs on port 8080 by default)
   ```bash
   go run ./backend
   ```
   The service stores guest records in `wedding.db` (SQLite) alongside the repository. Adjust `DATABASE_URL` to point to a different file or use advanced SQLite connection strings.
3. **Launch the Next.js app**
   ```bash
   npm run dev
   ```
4. Visit http://localhost:3000 and open the **Admin** tab to add guests. Each saved profile returns a personalized URL (`/?code=XXXXXX`) that you can share immediately.

> **Tip:** To seed the database from the command line, POST to `http://localhost:8080/api/guests` with the guest payload shown in `components/AdminDashboard.tsx`.

## Highlights

- **Personalization engine** persisting guest identity, RSVPs, music requests, and guestbook notes with high-contrast accessibility toggle.
- **Production-ready guest directory** backed by SQLite with REST APIs for fetching and creating guest profiles.
- **Admin dashboard** generates invitation links, captures dietary/accessibility intel, and visualizes guest insights in real time.
- **RSVP workflow** captures attendance per event, dietary details, plus-one info, and communications consent in under two minutes.
- **Smart itinerary** filters relevant events, surfaces accessibility notes, and calculates “leave by” reminders per guest.
- **Arrival, registry, and entertainment modules** adapt content for each guest’s role, budget hints, and interests.
- **Engagement layer** featuring trivia game, song requests with dedications, and an interactive digital guestbook.
- **Accessibility features** including skip links, high-contrast mode, semantic content structure, and focus-visible styling.

## Project structure

- `app/` — Next.js App Router pages for each experience surface (home, RSVP, itinerary, admin, etc.).
- `components/` — Reusable UI and interactive client components.
- `backend/` — Go service exposing guest CRUD endpoints with SQLite persistence.
- `lib/data/` — Canonical datasets for events, gifts, travel, and story moments.
- `lib/models/` — Shared TypeScript models for guests and normalization helpers.
- `lib/personalization.tsx` — Client-side personalization context handling persistence and tailored content helpers.

## Extending

Hook the personalization context into additional backend endpoints for RSVPs, seating charts, or vendor communications. Integrate storage for photo uploads and real-time dashboards to graduate from demo to production.
