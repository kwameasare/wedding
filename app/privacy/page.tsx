import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Privacy & Data Requests — Harbor of Love"
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-4 py-12">
        <section className="section-card">
          <h1 className="text-3xl font-semibold text-slate-900">Privacy & Trust</h1>
          <p className="text-sm text-slate-600">
            We steward your information with love and security. RSVP data lives in encrypted databases, media uploads are scrubbed of location metadata, and we purge PII within 12 months of the celebration or sooner upon request.
          </p>
        </section>
        <section className="section-card space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">Your rights</h2>
          <ul className="list-disc space-y-2 pl-6 text-sm text-slate-600">
            <li>Request a copy of your data (RSVP details, communications, uploads).</li>
            <li>Ask us to delete or anonymize your information at any point.</li>
            <li>Opt-in or opt-out of SMS, email, and WhatsApp communications.</li>
          </ul>
          <p className="text-sm text-slate-600">
            Email <a href="mailto:privacy@harboroflove.com" className="text-blush-600">privacy@harboroflove.com</a> with the subject “Data Request” and we&apos;ll respond within 48 hours. For urgent requests during event week, text +1 (555) 987-6543.
          </p>
        </section>
        <section className="section-card space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">Security snapshot</h2>
          <ul className="list-disc space-y-2 pl-6 text-sm text-slate-600">
            <li>Magic links expire after 48 hours with auto-rotate.</li>
            <li>All admin actions require MFA and are logged for audit.</li>
            <li>Observability dashboards alert us to suspicious activity in real time.</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
