import { Suspense } from "react";
import { GuestCodeBoundary } from "@/components/guest/GuestCodeBoundary";

export function PersonalizationInitializer({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading guest magic link…</div>}>
      <GuestCodeBoundary>{children}</GuestCodeBoundary>
    </Suspense>
  );
}
