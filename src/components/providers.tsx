"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useAuthStore } from "@/lib/auth-store";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange={false}
      >
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "rgba(15, 23, 42, 0.9)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(20px)",
              borderRadius: "12px",
            },
          }}
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
