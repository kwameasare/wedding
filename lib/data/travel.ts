export interface TravelOption {
  id: string;
  type: "hotel" | "transport" | "experience";
  title: string;
  description: string;
  link?: string;
  code?: string;
  outOfTownOnly?: boolean;
  cityTag?: string;
}

export const travelOptions: TravelOption[] = [
  {
    id: "arrival-window",
    type: "transport",
    title: "Arrival Window & Check-in",
    description:
      "Venue gates open at 2:30 PM for a relaxed arrival. Scan your invite QR at the welcome desk for instant entry and a keepsake wristband."
  },
  {
    id: "parking",
    type: "transport",
    title: "Parking & Drop-off",
    description:
      "Complimentary valet and self-park open at 2:15 PM at 15 Marina Way. Accessible drop-off is right beside the willow tree entrance — just flash your digital invite."
  },
  {
    id: "rideshare",
    type: "transport",
    title: "Rideshare & Carpool",
    description:
      "Set your pin to 1 Marina Way. We&apos;ve coordinated a dedicated pick-up loop with lighting and signage so every Lyft, Uber, and carpool finds you fast."
  },
  {
    id: "bike-bay",
    type: "experience",
    title: "Two-Wheel Welcome",
    description:
      "Riding over? Secure bike valet and tune-up station are on the south lawn, with complimentary sparkling water waiting for you."
  },
  {
    id: "accessibility",
    type: "experience",
    title: "Accessibility Concierge",
    description:
      "Need a quiet arrival space, sensory kit, or mobility escort? Text our team at (401) 555-2025 ahead of time or on arrival and we&apos;ll meet you curbside."
  }
];
