import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Guestbook } from "@/components/Guestbook";
import { GuestIdentityCard } from "@/components/GuestIdentityCard";

export const metadata = {
  title: "Digital Guestbook — Harbor of Love"
};

export default function GuestbookPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-12">
        <GuestIdentityCard />
        <Guestbook />
        <section className="section-card">
          <h2 className="text-xl font-semibold text-slate-900">Upload memories</h2>
          <p className="text-sm text-slate-600">
            Photo & video uploads open on wedding day with live moderation. Voice note booths will be available near the dessert table.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
