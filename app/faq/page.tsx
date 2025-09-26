import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GuestIdentityCard } from "@/components/GuestIdentityCard";

const faqs = [
  {
    question: "What should I wear?",
    answer:
      "Ceremony is garden formal—think breathable pastels or summer suits. Reception is black-tie creative, so sequins and sneakers are both welcome!"
  },
  {
    question: "Is the venue accessible?",
    answer:
      "Yes! Step-free paths, accessible seating rows, hearing loops, and dedicated quiet rooms are available. Let us know specific needs in your RSVP."
  },
  {
    question: "Can I bring kids?",
    answer:
      "Little ones are invited to the brunch and daytime festivities if your invite specifies kids are welcome. We&apos;ll have a cozy kids corner with crafts."
  },
  {
    question: "Where should I stay?",
    answer:
      "Out-of-town guests have hotel blocks at Harbor Lights and Cliffside Inn. See the Travel page for booking codes and shuttle details."
  }
];

export const metadata = {
  title: "FAQ — Harbor of Love"
};

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-12">
        <GuestIdentityCard />
        <section className="section-card space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Frequently asked</h2>
          <dl className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-3xl bg-white/80 p-4 shadow">
                <dt className="font-semibold text-slate-900">{faq.question}</dt>
                <dd className="text-sm text-slate-600">{faq.answer}</dd>
              </div>
            ))}
          </dl>
          <p className="text-sm text-slate-600">
            Still curious? Email <a href="mailto:celebrate@harboroflove.com" className="text-blush-600">celebrate@harboroflove.com</a> or text <a href="sms:+15551234567" className="text-blush-600">+1 (555) 123-4567</a>.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
