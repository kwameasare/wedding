import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmartItinerary } from "@/components/SmartItinerary";
import { GuestIdentityCard } from "@/components/GuestIdentityCard";

export const metadata = {
  title: "Your Itinerary — Harbor of Love"
};

export default function ItineraryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-12">
        <GuestIdentityCard />
        <SmartItinerary />
        <section className="section-card">
          <h2 className="text-xl font-semibold text-slate-900">Table assignment & QR pass</h2>
          <p className="text-sm text-slate-600">
            Seating charts unlock two weeks before the ceremony. You&apos;ll receive a QR check-in pass here and via SMS. Need accessibility seating? Let us know in your RSVP notes and our concierge will confirm placement.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
