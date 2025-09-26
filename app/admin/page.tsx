import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdminDashboard } from "@/components/AdminDashboard";

export const metadata = {
  title: "Admin Dashboard — Harbor of Love"
};

export default function AdminPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-12">
        <AdminDashboard />
        <section className="section-card">
          <h2 className="text-xl font-semibold text-slate-900">Integrations & automations</h2>
          <p className="text-sm text-slate-600">
            Sync RSVPs to Airtable or Google Sheets with one click, trigger Twilio SMS reminders, and generate vendor briefs. Observability dashboards monitor livestream and CDN health during event week.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
