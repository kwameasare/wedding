"use client";

import { useEffect } from "react";
import { PersonalizationProvider } from "@/lib/personalization";

export function Providers({
  children,
  guestCode
}: {
  children: React.ReactNode;
  guestCode?: string | null;
}) {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = "en";
    }
  }, []);

  return <PersonalizationProvider initialCode={guestCode}>{children}</PersonalizationProvider>;
}
