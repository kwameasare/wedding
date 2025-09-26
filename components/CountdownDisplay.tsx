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
    <div
      aria-live="polite"
      className="mt-6 grid grid-cols-4 gap-2 text-center text-slate-800"
      data-now={now}
    >
      {Object.entries(countdown).map(([label, value]) => (
        <div key={label} className="rounded-2xl bg-white/80 p-3 shadow">
          <p className="text-2xl font-bold">{value.toString().padStart(2, "0")}</p>
          <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
        </div>
      ))}
    </div>
  );
}
