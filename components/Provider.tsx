"use client";

import { useState } from "react";
import { ThemeProvider } from "next-themes";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { Header } from "@/components/Header";
import { useLanguage, useFlyerModal } from "@/hooks/useQueries";

function AppContent({ children }: { children: React.ReactNode }) {
  const { isLoading: langLoading } = useLanguage();
  const { isLoading: flyerLoading } = useFlyerModal();
  const isLoading = langLoading || flyerLoading;

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />
      <Header />
      {children}
    </>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            gcTime: Infinity,
            retry: 1,
          },
        },
      }),
  );

  const [persister] = useState(() =>
    createAsyncStoragePersister({
      storage: typeof window !== "undefined" ? window.localStorage : null,
    }),
  );

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      }}
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AppContent>{children}</AppContent>
      </ThemeProvider>
    </PersistQueryClientProvider>
  );
}
