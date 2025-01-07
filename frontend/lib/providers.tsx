"use client";

import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRef } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClientRef = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
          staleTime: Infinity,
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={queryClientRef.current}>
      {children}
      <Toaster />
    </QueryClientProvider>
  );
}
