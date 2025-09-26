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
    id: "harbor-lights",
    type: "hotel",
    title: "Harbor Lights Hotel (Preferred Block)",
    description: "Oceanfront rooms, sunrise yoga deck, and complimentary bikes.",
    link: "https://example.com/harbor-lights",
    code: "LOVE2025",
    outOfTownOnly: true
  },
  {
    id: "cliffside-inn",
    type: "hotel",
    title: "The Cliffside Inn",
    description: "Boutique Victorian charm with gourmet breakfast and spa tubs.",
    link: "https://example.com/cliffside",
    code: "CLIFFLOVE",
    outOfTownOnly: true
  },
  {
    id: "local-guide",
    type: "experience",
    title: "Local's Guide to Newport",
    description: "Our must-visit list of cafés, art walks, and ocean swims.",
    link: "https://example.com/newport-guide"
  },
  {
    id: "toronto-shuttle",
    type: "transport",
    title: "Toronto Crew Shuttle",
    description: "Group shuttle from BOS airport Friday 1 PM, returning Monday 12 PM.",
    cityTag: "Toronto",
    outOfTownOnly: true
  },
  {
    id: "boston-local",
    type: "transport",
    title: "Boston Commuter Tips",
    description: "Parking vouchers available at the Long Wharf garage; MBTA ferry also an option.",
    cityTag: "Boston"
  }
];
