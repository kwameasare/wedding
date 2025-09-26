"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Providers } from "@/components/Providers";

export function GuestCodeBoundary({ children }: { children: React.ReactNode }) {
  const params = useSearchParams();
  const [guestCode, setGuestCode] = useState<string | null>(null);

  useEffect(() => {
    const code = params?.get("code") ?? null;
    setGuestCode(code);
  }, [params]);

  return <Providers guestCode={guestCode}>{children}</Providers>;
}
