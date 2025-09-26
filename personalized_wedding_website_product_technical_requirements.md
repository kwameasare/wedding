# Personalized Wedding Website – Product & Technical Requirements

> Goal: Deliver an engaging, interactive, and **personalized** wedding website that tells the couple’s story, handles logistics, and gives **every guest** a delightful, tailored experience from invite to post‑wedding memories.

---

## 1) Vision & North Star
- **North Star Metric:** % of guests who complete RSVP with preferences + at least 3 personalized interactions (e.g., music request, trivia, travel helper, memory upload).
- **Experience Pillars:**
  1. **Personal Connection** – The site knows each guest and adapts.
  2. **Playful Utility** – Helpful + fun: travel, schedule, games, wishes.
  3. **Zero‑Friction Logistics** – RSVP, seating, dietary, reminders.
  4. **Evergreen Memories** – Live stream, media uploads, highlights.

---

## 2) Key Audiences & Personas
- **The Couple/Admins** – Manage content, approvals, seating, comms.
- **Guests** – Local, Out‑of‑Town, VIP/Family, Bridal Party, Vendors.
- **Accessibility Users** – Screen readers, high-contrast, captions.

---

## 3) Core User Journeys
1. **Invited Guest (Personal Link)** → Land on personalized homepage → See greeting + role (e.g., “Bridesmaid”) → RSVP + dietary + plus‑one → Travel/accommodation helper → Add to calendar → Choose gift → Music request → Join trivia → Day‑of smart itinerary → Post‑wedding media upload & thank‑you.
2. **Open Visitor (No Invite)** → See public info → Request access/RSVP (if permitted) or limited view.
3. **Admin** → Set content, themes, registry → Review RSVPs → Generate seating → Send segmented comms → Approve photos/messages → Export reports.

---

## 4) Personalization Engine
- **Identity:** Per‑guest **magic link** (JWT token) or **6–8 char invite code**.
- **Signals:** Relationship (family, friend, colleague), side (Bride/Groom), city/timezone, dietary preferences, accommodation needs, language, interests (captured during RSVP), accessibility needs.
- **Outputs:**
  - Personalized greeting, story highlights, and timeline (e.g., rehearsal details only for bridal party).
  - **Smart Itinerary** (day‑of schedule adjusted to role + venue transport time).
  - **Gift Hints** (registry items filtered by guest budget range set at RSVP).
  - **Music Match** (pre‑wedding playlist built from guest submissions; “your song is queued 9:15 PM”).
  - **Content Blocks** (e.g., show local travel guide only to out‑of‑town guests).
  - **Language** auto‑selection & fallback; right‑to‑left support.

---

## 5) Feature List (MVP → Growth)
### MVP (Phase 1)
1. **Home (Personalized)**: Hero, countdown, couple intro, dynamic greeting.
2. **Our Story**: Timeline with photos/videos; guest‑specific callouts (how we met the guest, optional).
3. **RSVP Flow**: Name/Code lookup → attendance per event, meal choices, dietary flags, allergy details, plus‑one info, kids policy acknowledgement.
4. **Smart Itinerary**: Events (rehearsal, ceremony, reception) → shows relevant ones to the guest; “Leave at” time with map link.
5. **Venues & Travel**: Maps, parking/ride‑share codes, hotel blocks with booking links.
6. **Registry/Gifts**: Multi‑store links + cash funds; currency awareness.
7. **FAQs**: Dress code (visual swatches), weather tips, contact cards.
8. **Digital Guestbook**: Text, emojis, voice notes.
9. **Accessibility**: A11y toolbar, captions for video, alt text, color contrast.
10. **Admin CMS**: Content editor, guest import, RSVP dashboard, email/WhatsApp/SMS campaigns (segmented), seat plan export (CSV/PDF).

### Growth (Phase 2+)
1. **Gamified Trivia & Quests**: “How well do you know the couple?” with points, leaderboard, prize draw.
2. **Photo/Video Kiosk**: Live gallery with moderation; auto‑curation highlights.
3. **Live Stream + Live Reactions**: Emoji rain, moderated chat, captioning.
4. **AR Filters / Photobooth** (WebAR compatible devices).
5. **Seating Assistant**: Preferences + constraints → suggest seating plan.
6. **Vendor Concierge** (private): Run‑sheet, contacts, asset downloads.
7. **After‑Party/Next‑Day Brunch** logic (personalized invites).
8. **Thank‑You Note Generator**: Drafts based on guest gift + interactions.
9. **PWA Offline**: Cache itinerary, QR pass, venue map.
10. **A/B Personalization** tests; experiment framework.

---

## 6) Information Architecture & Sitemap
- **Public:** Home, Our Story, Events (high‑level), Registry, Travel, FAQ, Contact.
- **Personalized Area (Auth via magic link/Login):** Dashboard, RSVP, Your Itinerary, Your Seat/QR Pass, Music Request, Games, Upload Memories, Messages.
- **Admin:** Dashboard, Content, Guests, Seating, Messaging, Registry, Media Moderation, Settings.

---

## 7) Detailed Requirements
### 7.1 Guest Account & Identity
- Unique invite link or code, optional email/phone verification.
- Profile fields: name, relation, side, city/country, dietary, accessibility needs, music taste, budget hint, language preference.
- Consent checkboxes (privacy & comms).

### 7.2 RSVP & Attendance
- RSVP per event with limits (e.g., rehearsal only for bridal party).
- Plus‑one policy and controlled fields (name, dietary, seat grouping).
- Real‑time capacity checks; waitlist; auto‑confirmations.
- Exports (CSV, XLSX) + webhook to Google Sheets/Airtable optional.

### 7.3 Seating & Check‑in
- Seat plan import/export; drag‑and‑drop editor (admin).
- **Guest view:** “Your Table” with diagram; **QR pass** for door check‑in.
- Check‑in scanner (mobile web) → updates attendance in real time.

### 7.4 Travel & Stay
- Venue cards with live maps; transit time from guest city (if known).
- Hotel blocks with code; shuttle times personalized on itinerary.
- Ride‑share discount code banners for day‑of only.

### 7.5 Registry
- Multiple stores, cash funds; reserve/mark purchased; currency awareness.
- Gift ideas personalized by guest budget hint and interests.

### 7.6 Music & Entertainment
- Pre‑event “Request a Song” with dedications; dedupe logic.
- DJ view: exportable list by tempo/era; highlight “must‑play for VIPs.”
- Trivia engine: question pools, timed rounds, mobile friendly.

### 7.7 Memories & Media
- Guest uploads (photo/video/voice). Auto‑compress + EXIF scrub.
- Moderation queue; AI assist (flag NSFW, duplicates, blurry).
- Auto‑generated highlight reel post‑event; downloadable packs.

### 7.8 Notifications & Comms
- Channels: Email, SMS/WhatsApp (via provider), push (PWA).
- Templates: Save‑the‑Date, Invite with magic link, RSVP reminders, travel advisories, weather updates, day‑of nudges, thank‑you follow‑ups.
- Segmentation: by role, city, RSVP status, dietary, language.

### 7.9 Accessibility & Inclusivity
- WCAG 2.2 AA compliance: semantic HTML, focus states,
  keyboard navigation, ARIA labels, captioned media.
- Dyslexia‑friendly toggle; font scaling; high contrast theme.
- Multilingual content; RTL support; local date/time formats.

### 7.10 Security & Privacy
- PII minimization; data retention policy (e.g., 6–12 months post‑event).
- Consent ledger; GDPR‑style export/delete of guest data.
- TLS everywhere; HSTS; CSP; secure cookies; rate limiting; WAF.
- Role‑based admin; audit trails; encrypted at rest (KMS).

### 7.11 Performance & Reliability
- Targets: LCP <2.5s on 4G; TTI <3s; 99.9% during event week;
  scale to concurrent 2–5k users (live stream spikes).
- CDN cached assets; image optimization; edge functions for geo.
- Synthetic monitoring; real user monitoring (RUM).

### 7.12 Analytics & Success Metrics
- Funnel: Invite sent → Site opened → RSVP started → RSVP completed → Preferences filled → Seat view → Day‑of check‑in → Media upload.
- Engagement: Avg interactions per guest, playlist submissions, trivia participation, share rate.
- Ops: Bounce rates, page performance, error rates.

---

## 8) Content Model (Entities)
- **Guest**: id, name, email/phone, relationship, side, inviteStatus, language, city, dietary, accessibility, interests, budgetHint, role, magicLinkToken, consent.
- **Invite**: id, guestId, status, channel, sentAt, openedAt.
- **RSVP**: id, guestId, eventId, attending, mealChoice, notes, plusOneId.
- **Event**: id, name, datetime, venueId, capacity, dressCode, visibilityRules.
- **Seat**: tableId, seatNumber, guestId.
- **RegistryItem**: id, store, title, url, price, currency, reservedBy.
- **Media**: id, guestId, type, url, status, tags, createdAt.
- **Message**: id, channel, segment, templateId, sentAt, metrics.

---

## 9) Example JSON Schemas
### Guest Profile
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Guest",
  "type": "object",
  "required": ["id", "name"],
  "properties": {
    "id": {"type": "string", "format": "uuid"},
    "name": {"type": "string", "minLength": 1},
    "email": {"type": "string", "format": "email"},
    "phone": {"type": "string"},
    "relationship": {"type": "string", "enum": ["family", "friend", "colleague", "vip", "other"]},
    "side": {"type": "string", "enum": ["bride", "groom", "both", "unknown"]},
    "language": {"type": "string"},
    "city": {"type": "string"},
    "dietary": {"type": "array", "items": {"type": "string"}},
    "accessibility": {"type": "array", "items": {"type": "string"}},
    "interests": {"type": "array", "items": {"type": "string"}},
    "budgetHint": {"type": "string", "enum": ["low", "medium", "high", "no-pref"]},
    "role": {"type": "string", "enum": ["guest", "bridal-party", "family", "vip"]},
    "consent": {"type": "boolean"}
  }
}
```

### RSVP
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "RSVP",
  "type": "object",
  "required": ["guestId", "eventId", "attending"],
  "properties": {
    "id": {"type": "string", "format": "uuid"},
    "guestId": {"type": "string", "format": "uuid"},
    "eventId": {"type": "string", "format": "uuid"},
    "attending": {"type": "boolean"},
    "mealChoice": {"type": "string"},
    "dietaryNotes": {"type": "string"},
    "plusOne": {
      "type": "object",
      "properties": {
        "name": {"type": "string"},
        "dietary": {"type": "array", "items": {"type": "string"}}
      }
    }
  }
}
```

---

## 10) Personalization Rules (Examples)
- **Rule A:** If guest.city != venue.city → show “Out‑of‑Town Helper” and hotel block first.
- **Rule B:** If guest.role == bridal‑party → add rehearsal dinner & day‑of call times.
- **Rule C:** If dietary contains "vegan" → show vegan menu preview + chef note.
- **Rule D:** If language == French → default content to fr-FR.
- **Rule E:** If budgetHint == low → highlight lower‑priced registry items.

---

## 11) Design System & UX
- **Branding:** Elegant type pairing (serif + humanist sans), soft color palette with high-contrast mode.
- **Components:** Hero, Timeline, Card grid, Stepper RSVP, Tabs, Accordions, Map widget, QR Pass, Media lightbox.
- **Micro‑interactions:** Confetti on RSVP submit; music waveform on requests; countdown flips.
- **Empty States:** Friendly copy nudging engagement (e.g., “Pick one song you’ll dance to!”).

---

## 12) Technical Architecture (Reference)
- **Frontend:** React/Next.js (SSR/ISR), Tailwind; PWA support; i18n.
- **Backend:** Node.js/NestJS or Go (Fiber/Gin) with REST/GraphQL;
  Postgres (core), Redis (sessions/queues), S3/Blob for media.
- **Auth:** Magic links (JWT, short TTL); optional OTP via SMS/WhatsApp.
- **Integrations:** Email (Postmark/SES), SMS/WhatsApp (Twilio/Meta), Maps (Google/Mapbox), Payment (Stripe/Flutterwave), Livestream (Mux/YouTube unlisted).
- **Infrastructure:** CDN + Edge functions; Docker; IaC (Terraform); Observability (OpenTelemetry traces, logs, metrics); CI/CD with preview environments.
- **Security:** OWASP ASVS L2 controls; secrets manager; RBAC.

---

## 13) Admin & Operations
- **Dashboards:** RSVP status by event, dietary breakdown, travel needs, seating progress, comms performance, live check‑in.
- **Workflows:** Content approval, media moderation, bulk imports, segmented messaging.
- **Exports:** Seating chart PDF, guest labels, vendor brief packs.

---

## 14) Acceptance Criteria (MVP Highlights)
1. Guests with valid link/code see **their name** and relevant events only.
2. RSVP completion ≤ 2 minutes on mobile; errors clearly surfaced.
3. Admin can filter RSVPs by dietary and export CSV.
4. Seat QR renders and validates on door scanner (≤ 500ms lookup).
5. Out‑of‑town guests receive hotel info within top 2 sections.
6. Accessibility audit passes WCAG 2.2 AA checks.

---

## 15) QA Test Scenarios (Samples)
- **Positive:** Valid magic link → RSVP attend yes → meal vegan → plus‑one added → confirmation email sent (200 OK; payload includes guest + rsvp ids).
- **Negative:** Expired link → 401 with renewal path; malformed code → generic error without PII leak.
- **A11y:** Keyboard‑only RSVP completion; screen reader labels verified.
- **Load:** 5k concurrent for livestream page; p95 < 1.5s for itinerary API.

---

## 16) Content & Copy Framework
- Tone: Warm, inclusive, playful.
- Microcopy library for RSVP states, reminders, and day‑of nudges.
- Multilingual string keys with context notes for translators.

---

## 17) Data Retention & Compliance
- Purge schedules (media 12 months, PII 6–12 months post‑event or on request).
- Guest self‑service data delete/export.

---

## 18) Roadmap & Phasing
- **Phase 1 (4–6 weeks):** Core content, RSVP, personalization basics, travel, registry, admin CMS, comms, a11y.
- **Phase 2 (3–4 weeks):** Seating, QR check‑in, music requests, media uploads.
- **Phase 3 (3–6 weeks):** Games, livestream, AR, thank‑you generator, PWA offline.

---

## 19) Success Metrics & Reporting Cadence
- Weekly dashboards + retro on funnel drop‑offs.
- Event‑week war room: real‑time metrics for check‑ins, errors, CDN health.

---

## 20) Deliverables Checklist
- IA & wireframes; design system tokens; content migration plan.
- Configurable theme (colors, typography, patterns).
- Admin guides + run‑book (incident & comms playbook).
- Post‑event export (media + messages + analytics snapshot).

---

## 21) Sample Communications (Templates)
- **Invite (Email/SMS):** “Hi {{name}}! You’re on the list 💐 Tap your personal link to RSVP and see your plan.”
- **Reminder:** “{{name}}, ceremony countdown: {{D-7}}. Need a hotel? We’ve saved options for you.”
- **Day‑Of:** “{{name}}, it’s time to head out! Your QR pass & shuttle time are ready.”
- **Thank‑You:** “{{name}}, your note & photo made our day. Here’s a highlight reel featuring you!”

---

## 22) Future Ideas
-
  - Family tree visualizer with stories.
  - Kids corner: printable activity packs.
  - Geo‑fenced surprises at venue (silent disco channel unlocks).

---

### Appendix A – Example API (Illustrative)
```http
POST /api/rsvp
{
  "guestId": "uuid",
  "eventId": "uuid",
  "attending": true,
  "mealChoice": "vegan",
  "plusOne": {"name": "Alex", "dietary": ["nut-free"]}
}

200 OK
{
  "success": true,
  "data": {"rsvpId": "uuid"},
  "error": null,
  "meta": {"transactionId": "txn-123", "timestamp": "2025-09-26T00:00:00Z", "version": "v1"}
}
```

### Appendix B – Seating Constraints (Examples)
- Keep families at same/adjacent tables; avoid ex‑partners together; bridal party near head table; kids close to kids corner.

### Appendix C – Risk Register (Sample)
- Live stream provider outage → Backup YouTube unlisted + local record.
- SMS deliverability issues → Email fallback + in‑site banner.
- High upload volume → Queue + auto‑resize + deferred processing.

---

**End of Document**

