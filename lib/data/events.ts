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
    id: "ceremony",
    name: "Waterfront Ceremony",
    description:
      "Vows under the willow tree, a string quartet soundtrack, and the harbor sparkling behind us.",
    start: "2025-06-21T15:30:00-04:00",
    end: "2025-06-21T16:30:00-04:00",
    location: "Harbor Point Lawn",
    address: "1 Marina Way, Newport, RI",
    dressCode: "Garden formal (think breathable pastels)",
    mapsLink: "https://maps.google.com/?q=1+Marina+Way+Newport+RI",
    tags: ["all"],
    accessibilityNotes: "Accessible seating row and hearing loop available."
  },
  {
    id: "lawn-party",
    name: "Golden Hour Lawn Party",
    description:
      "Immediately after the ceremony we&apos;ll wander the lawn for live sketches, Polaroid portraits, and lawn games with seasonal sips and small bites.",
    start: "2025-06-21T16:30:00-04:00",
    end: "2025-06-21T17:30:00-04:00",
    location: "Harbor Point Lawn",
    address: "1 Marina Way, Newport, RI",
    dressCode: "Stay in your ceremony look — add the denim jacket or loafers you love.",
    mapsLink: "https://maps.google.com/?q=1+Marina+Way+Newport+RI",
    tags: ["all"],
    accessibilityNotes: "Shaded lounge seating and attendants available for mobility support."
  },
  {
    id: "reception",
    name: "Reception & Dance Party",
    description:
      "We&apos;ll toast, share stories, and dive into a dance floor soundtracked by our live band + DJ mashup. Expect roaming dessert carts, photo moments, and surprises all night long.",
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
  }
];
