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
}

export const guestDirectory: Record<string, GuestProfile> = {
  "AMY823": {
    code: "AMY823",
    name: "Amy Chen",
    relation: "College roommate",
    side: "bride",
    role: "bridesmaid",
    city: "San Francisco, CA",
    timezone: "America/Los_Angeles",
    language: "en",
    dietary: ["pescatarian"],
    interests: ["indie pop", "matcha", "travel"],
    budgetHint: "splurge",
    isOutOfTown: true,
    eventsInvited: ["ceremony", "lawn-party", "reception", "afterparty"],
    kidsAllowed: false
  },
  "RAJ507": {
    code: "RAJ507",
    name: "Raj Patel",
    relation: "Childhood friend",
    side: "groom",
    role: "groomsman",
    city: "Toronto, Canada",
    timezone: "America/Toronto",
    language: "en",
    dietary: ["vegetarian"],
    accessibility: ["caption-preferred"],
    interests: ["bollywood", "board games"],
    budgetHint: "cherish",
    isOutOfTown: true,
    eventsInvited: ["ceremony", "lawn-party", "reception", "afterparty"],
    kidsAllowed: false
  },
  "MIA242": {
    code: "MIA242",
    name: "Mia González",
    relation: "Cousin",
    side: "bride",
    role: "family",
    city: "Madrid, Spain",
    timezone: "Europe/Madrid",
    language: "es",
    dietary: ["gluten-free"],
    interests: ["latin pop", "photography"],
    budgetHint: "experience",
    isOutOfTown: true,
    eventsInvited: ["ceremony", "lawn-party", "reception"],
    kidsAllowed: true
  },
  "JON110": {
    code: "JON110",
    name: "Jonathan Reed",
    relation: "Work friend",
    side: "groom",
    role: "friend",
    city: "Boston, MA",
    timezone: "America/New_York",
    language: "en",
    dietary: [],
    interests: ["jazz", "craft coffee"],
    budgetHint: "cherish",
    isOutOfTown: false,
    eventsInvited: ["ceremony", "lawn-party", "reception"],
    kidsAllowed: false
  },
  "LIV912": {
    code: "LIV912",
    name: "Olivia Martin",
    relation: "Photographer",
    side: "both",
    role: "vendor",
    city: "New York, NY",
    timezone: "America/New_York",
    language: "en",
    dietary: ["vegan"],
    interests: ["acoustic", "art"],
    budgetHint: "experience",
    isOutOfTown: false,
    eventsInvited: ["ceremony", "lawn-party", "reception"],
    kidsAllowed: false
  }
};

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
  interests: ["romance", "celebrations"],
  budgetHint: "cherish",
  isOutOfTown: false,
  eventsInvited: ["ceremony", "lawn-party", "reception"],
  kidsAllowed: false
};
