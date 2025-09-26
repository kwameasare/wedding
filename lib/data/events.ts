export interface EventDetail {
  id: string;
  name: string;
  description: string;
  start: string;
  end: string;
  location: string;
  address: string;
  dressCode: string;
  mapsLink: string;
  tags: string[];
  shuttleTimes?: string[];
  accessibilityNotes?: string;
}

export const events: EventDetail[] = [
  {
    id: "welcome",
    name: "Welcome Sunset Mixer",
    description:
      "Kick off the celebrations with mocktails, acoustic covers, and a sailboat send-off as the sun dips over Harbor Point.",
    start: "2025-06-19T18:00:00-04:00",
    end: "2025-06-19T20:00:00-04:00",
    location: "Harbor Roof Garden",
    address: "88 Seabreeze Ave, Newport, RI",
    dressCode: "Coastal chic (bring a light sweater)",
    mapsLink: "https://maps.google.com/?q=88+Seabreeze+Ave+Newport+RI",
    tags: ["welcome", "bridal-party", "vip"],
    shuttleTimes: ["5:15 PM from Harbor Lights Hotel", "5:30 PM from Cliffside Inn"],
    accessibilityNotes: "Elevator access available via west entrance."
  },
  {
    id: "rehearsal",
    name: "Rehearsal & Family Dinner",
    description:
      "An intimate run-through followed by a family-style dinner featuring our favorite Mediterranean dishes.",
    start: "2025-06-20T16:00:00-04:00",
    end: "2025-06-20T19:30:00-04:00",
    location: "Seafarer Chapel",
    address: "12 Lighthouse Rd, Newport, RI",
    dressCode: "Dressy casual",
    mapsLink: "https://maps.google.com/?q=12+Lighthouse+Rd+Newport+RI",
    tags: ["bridal-party", "family"],
    accessibilityNotes: "Ramp access on the east side with reserved seating."
  },
  {
    id: "ceremony",
    name: "Wedding Ceremony",
    description:
      "Vows under the willow tree with a string quartet and ocean breeze soundtrack.",
    start: "2025-06-21T15:30:00-04:00",
    end: "2025-06-21T16:30:00-04:00",
    location: "Harbor Point Lawn",
    address: "1 Marina Way, Newport, RI",
    dressCode: "Garden formal (think breathable pastels)",
    mapsLink: "https://maps.google.com/?q=1+Marina+Way+Newport+RI",
    tags: ["all"],
    shuttleTimes: ["2:30 PM from Harbor Lights Hotel", "2:45 PM from Cliffside Inn"],
    accessibilityNotes: "Accessible seating row and hearing loop available."
  },
  {
    id: "reception",
    name: "Reception & Silent Disco",
    description:
      "Locally-inspired dinner, toasts, and a silent disco finale with three curated channels.",
    start: "2025-06-21T17:30:00-04:00",
    end: "2025-06-22T00:30:00-04:00",
    location: "Harbor Point Pavilion",
    address: "1 Marina Way, Newport, RI",
    dressCode: "Black-tie creative (sparkle welcome)",
    mapsLink: "https://maps.google.com/?q=1+Marina+Way+Newport+RI",
    tags: ["all"],
    accessibilityNotes: "Quiet room available near the library alcove."
  },
  {
    id: "afterparty",
    name: "After-Party: Arcade Takeover",
    description:
      "VIP arcade takeover with late-night bao buns, bubble tea, and Mario Kart brackets.",
    start: "2025-06-21T23:00:00-04:00",
    end: "2025-06-22T02:00:00-04:00",
    location: "PixelWave Arcade",
    address: "55 Thames St, Newport, RI",
    dressCode: "Comfy + neon accents",
    mapsLink: "https://maps.google.com/?q=55+Thames+St+Newport+RI",
    tags: ["vip", "bridal-party"],
    accessibilityNotes: "Wheelchair accessible entrance on William Street."
  },
  {
    id: "brunch",
    name: "Recovery Brunch & Sail",
    description:
      "Recharge with smoothie bowls, sunrise yoga, and optional harbor sail loops every 45 minutes.",
    start: "2025-06-22T10:00:00-04:00",
    end: "2025-06-22T13:00:00-04:00",
    location: "Cliffside Conservatory",
    address: "200 Ocean Ave, Newport, RI",
    dressCode: "Breezy linens & sandals",
    mapsLink: "https://maps.google.com/?q=200+Ocean+Ave+Newport+RI",
    tags: ["family", "out-of-town"],
    accessibilityNotes: "Accessible restrooms and nursing lounge available."
  }
];
