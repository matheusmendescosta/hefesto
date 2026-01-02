"use client";

import { Quote } from "@/dto/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useQuote = (quoteId: string) => {
  const { data: session } = useSession();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!session || !session.user) {
      return;
    }

    // setIsLoading(true);
    // setError(null);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/quote/${quoteId}`, {
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch quote");
        }
        return response.json();
      })
      .then((data) => {
        setQuote(data.quote);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [session, quoteId]);

  return {
    quote,
    isLoading,
    error,
  };
};
