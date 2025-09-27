"use client";

import { useEffect, useState } from "react";
import { usePersonalization } from "@/lib/personalization";

export function CountdownDisplay() {
  const { countdown } = usePersonalization();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div aria-live="polite" className="mt-8 grid grid-cols-4 gap-3 text-center text-ink-700" data-now={now}>
      {Object.entries(countdown).map(([label, value]) => (
        <div key={label} className="rounded-[1.75rem] border border-pearl-200 bg-white/80 px-4 py-5 shadow-[0_10px_30px_rgba(24,22,20,0.06)]">
          <p className="font-playfair text-3xl tracking-[0.2em] text-ink-900">{value.toString().padStart(2, "0")}</p>
          <p className="mt-2 text-[0.6rem] uppercase tracking-[0.4em] text-ink-400">{label}</p>
        </div>
      ))}
    </div>
  );
}
