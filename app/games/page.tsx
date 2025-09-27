import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TriviaGame } from "@/components/TriviaGame";
import { GuestIdentityCard } from "@/components/GuestIdentityCard";

export const metadata = {
  title: "Games & Surprises — Harbor of Love"
};

export default function GamesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-12">
        <GuestIdentityCard />
        <TriviaGame />
        <section className="section-card">
          <h2 className="text-xl font-semibold text-slate-900">Quest roadmap</h2>
          <p className="text-sm text-slate-600">
            More quests unlock at the welcome mixer. Scan the mural to start an AR treasure hunt, or find the secret word to trigger confetti on the livestream.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
