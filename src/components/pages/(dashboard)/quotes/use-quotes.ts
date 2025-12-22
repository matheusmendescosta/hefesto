"use client";

import { Quote } from "@/dto/user";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

export const useQuotes = () => {
  const { data: session } = useSession();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadQuotes = useCallback(() => {
    if (!session || !session.user) {
      return;
    }
    // setIsLoading(true);
    // setError(null);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/quotes`, {
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch quotes");
        }
        return response.json();
      })
      .then((data) => {
        setQuotes(data.quotes);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [session]);

  useEffect(() => {
    loadQuotes();
  }, [loadQuotes]);

  return {
    quotes,
    isLoading,
    error,
  };
};
