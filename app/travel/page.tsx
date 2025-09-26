import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TravelGuide } from "@/components/TravelGuide";
import { GuestIdentityCard } from "@/components/GuestIdentityCard";

export const metadata = {
  title: "Travel & Stay — Harbor of Love"
};

export default function TravelPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-12">
        <GuestIdentityCard />
        <TravelGuide />
        <section className="section-card">
          <h2 className="text-xl font-semibold text-slate-900">Local experiences</h2>
          <p className="text-sm text-slate-600">
            We&apos;ve curated sunrise swims, art walks, and foodie tours. Check back a week before for dynamic weather packing lists tailored to your city of origin.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
