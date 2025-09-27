export interface StoryMoment {
  year: string;
  title: string;
  description: string;
  guestHighlight?: string;
}

export const storyTimeline: StoryMoment[] = [
  {
    year: "2013",
    title: "Meet-Cute in Kyoto",
    description:
      "We bumped into each other reaching for the same mochi skewer at Nishiki Market and ended up spending the afternoon exploring side streets together.",
    guestHighlight: "If we met you during our travels, look for hidden Polaroids just for you on the day-of gallery!"
  },
  {
    year: "2016",
    title: "Building a Life in Brooklyn",
    description:
      "From rooftop dinners to rain-soaked subway serenades, our little apartment became the hosting hub for chosen family dinners.",
    guestHighlight: "Bridesmaids helped us assemble the first mismatched dining set—thanks for believing in our hosting dreams!"
  },
  {
    year: "2019",
    title: "Yes to Adventure",
    description:
      "He proposed on a sunrise hike in Big Sur with a thermos of chai and a playlist curated by you, our favorite humans.",
    guestHighlight: "Submit songs that remind you of us—our DJ will spin them during golden hour."
  },
  {
    year: "2023",
    title: "A Home with Room for Everyone",
    description:
      "We bought a fixer-upper where every wall is being painted with the fingerprints of our community (literally—we hosted a paint party).",
    guestHighlight: "Check out the digital guestbook prompts to help us fill a future time capsule!"
  }
];
