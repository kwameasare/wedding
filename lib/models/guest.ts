export type GuestRole =
  | "bridesmaid"
  | "groomsman"
  | "family"
  | "friend"
  | "vip"
  | "vendor"
  | "visitor";

export interface GuestProfile {
  code: string;
  name: string;
  relation: string;
  side: "bride" | "groom" | "both";
  role: GuestRole;
  city: string;
  timezone: string;
  language: "en" | "es" | "fr";
  dietary?: string[];
  accessibility?: string[];
  interests: string[];
  budgetHint: "cherish" | "splurge" | "experience";
  isOutOfTown: boolean;
  eventsInvited: string[];
  hotelPreference?: string;
  travelNotes?: string;
  kidsAllowed?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const defaultGuest: GuestProfile = {
  code: "VISITOR",
  name: "Guest",
  relation: "Friend of the couple",
  side: "both",
  role: "visitor",
  city: "",
  timezone: "America/New_York",
  language: "en",
  dietary: [],
  accessibility: [],
  interests: ["romance", "celebrations"],
  budgetHint: "cherish",
  isOutOfTown: false,
  eventsInvited: ["ceremony", "lawn-party", "reception"],
  kidsAllowed: false
};

export function normalizeGuestProfile(raw?: Partial<GuestProfile> | null): GuestProfile {
  if (!raw) {
    return { ...defaultGuest };
  }

  return {
    ...defaultGuest,
    ...raw,
    dietary: raw.dietary ?? [],
    accessibility: raw.accessibility ?? [],
    interests: raw.interests ?? defaultGuest.interests,
    eventsInvited: raw.eventsInvited ?? defaultGuest.eventsInvited,
    kidsAllowed: raw.kidsAllowed ?? defaultGuest.kidsAllowed,
    isOutOfTown: raw.isOutOfTown ?? defaultGuest.isOutOfTown
  };
}
