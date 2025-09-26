import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RSVPForm } from "@/components/RSVPForm";
import { GuestIdentityCard } from "@/components/GuestIdentityCard";

export const metadata = {
  title: "RSVP — Harbor of Love"
};

export default function RSVPPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-12">
        <GuestIdentityCard />
        <RSVPForm />
        <section className="section-card">
          <h2 className="text-xl font-semibold text-slate-900">Need help?</h2>
          <p className="text-sm text-slate-600">
            If your link expired or you need to edit your RSVP later, text our concierge at <a href="sms:+15551234567" className="text-blush-600">+1 (555) 123-4567</a>. We&apos;ll send a refreshed magic link.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
