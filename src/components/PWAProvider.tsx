"use client";

import { SerwistProvider } from "@serwist/turbopack/react";
import { Capacitor } from "@capacitor/core";

export function PWAProvider({ children }: { children: React.ReactNode }) {
  const disable =
    process.env.NODE_ENV === "development" || Capacitor.isNativePlatform();

  return (
    <SerwistProvider swUrl="/serwist/sw.js" disable={disable} cacheOnNavigation>
      {children}
    </SerwistProvider>
  );
}
