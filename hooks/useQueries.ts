import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

type Lang = "en" | "bn";

// Language query
export const useLanguage = () => {
  const queryClient = useQueryClient();

  const { data: lang = "bn", isPending: isLoading } = useQuery({
    queryKey: ["language"],
    queryFn: () => {
      // Get from cache to preserve persisted data
      const cached = queryClient.getQueryData(["language"]);
      return (cached as Lang) || "bn";
    },
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 0,
  });

  const setLanguage = useCallback(
    (newLang: Lang) => {
      queryClient.setQueryData(["language"], newLang);
    },
    [queryClient],
  );

  return { lang: lang as Lang, setLanguage, isLoading };
};

// Flyer modal query
export const useFlyerModal = () => {
  const queryClient = useQueryClient();

  const { data: isOpen = false, isPending: isLoading } = useQuery({
    queryKey: ["flyerModal"],
    queryFn: () => {
      // Get from cache to preserve persisted data
      const cached = queryClient.getQueryData(["flyerModal"]);
      return typeof cached === "boolean" ? cached : false;
    },
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 0,
  });

  const setFlyerOpen = useCallback(
    (open: boolean) => {
      queryClient.setQueryData(["flyerModal"], open);
    },
    [queryClient],
  );

  // PersistQueryClientProvider ensures data is hydrated before first render
  return { isOpen, setFlyerOpen, isLoading };
};
