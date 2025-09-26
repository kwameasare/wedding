import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GiftRecommendations } from "@/components/GiftRecommendations";
import { GuestIdentityCard } from "@/components/GuestIdentityCard";
import { giftRegistry } from "@/lib/data/gifts";

export const metadata = {
  title: "Registry & Gifting — Harbor of Love"
};

export default function RegistryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-12">
        <GuestIdentityCard />
        <GiftRecommendations />
        <section className="section-card">
          <h2 className="text-xl font-semibold text-slate-900">Full registry</h2>
          <p className="text-sm text-slate-600">Browse every item, including group gifts and cash funds.</p>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {giftRegistry.map((gift) => (
              <li key={gift.id} className="rounded-3xl bg-white/70 p-4 shadow-sm">
                <p className="font-semibold text-slate-800">{gift.title}</p>
                <p className="text-sm text-slate-600">{gift.description}</p>
                <a href={gift.link} target="_blank" rel="noreferrer" className="text-sm text-blush-600">
                  View item
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
