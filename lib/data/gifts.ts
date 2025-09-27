export interface GiftItem {
  id: string;
  title: string;
  description: string;
  priceRange: "cherish" | "splurge" | "experience";
  category: string;
  link: string;
  imageAlt: string;
}

export const giftRegistry: GiftItem[] = [
  {
    id: "artisan-tea",
    title: "Artisan Tea Ceremony Set",
    description: "A handcrafted ceramic set for slow Saturday mornings together.",
    priceRange: "cherish",
    category: "Home Rituals",
    link: "https://example.com/tea-ceremony",
    imageAlt: "Ceramic tea set with pastel glaze"
  },
  {
    id: "sail-getaway",
    title: "Weekend Sail Getaway",
    description: "Help us charter a sailboat for an anniversary escape in 2026.",
    priceRange: "experience",
    category: "Adventures",
    link: "https://example.com/sail-getaway",
    imageAlt: "Couple sailing on the ocean"
  },
  {
    id: "vinyl-club",
    title: "Vinyl Discovery Club (12 months)",
    description: "Curated records to soundtrack our newlywed year.",
    priceRange: "splurge",
    category: "Music",
    link: "https://example.com/vinyl",
    imageAlt: "Vinyl records stacked in a crate"
  },
  {
    id: "garden-kit",
    title: "Indoor Herb Garden Kit",
    description: "Smart hydroponic garden to spice up our cooking adventures.",
    priceRange: "cherish",
    category: "Home Rituals",
    link: "https://example.com/herb",
    imageAlt: "Hydroponic herb garden in kitchen"
  },
  {
    id: "honeymoon-fund",
    title: "Honeymoon Fund: Kyoto Food Tour",
    description: "Fuel our taste buds on a guided market tour during the honeymoon.",
    priceRange: "experience",
    category: "Cash Fund",
    link: "https://example.com/honeymoon",
    imageAlt: "Colorful Japanese street market"
  }
];
