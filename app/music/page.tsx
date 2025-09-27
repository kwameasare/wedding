import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MusicRequestForm } from "@/components/MusicRequestForm";
import { GuestIdentityCard } from "@/components/GuestIdentityCard";

export const metadata = {
  title: "Music & Entertainment — Harbor of Love"
};

export default function MusicPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-12">
        <GuestIdentityCard />
        <MusicRequestForm />
        <section className="section-card">
          <h2 className="text-xl font-semibold text-slate-900">Silent disco surprise</h2>
          <p className="text-sm text-slate-600">
            During the silent disco, you&apos;ll unlock a channel themed to your role—bridal party gets throwback bops, family gets feel-good classics.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
