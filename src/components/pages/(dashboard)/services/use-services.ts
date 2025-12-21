"use client";

import { Service } from "@/dto/user";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

export const useServices = () => {
  const { data: session } = useSession();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadServices = useCallback(() => {
    if (!session || !session.user) {
      return;
    }
    // setIsLoading(true);
    // setError(null);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`, {
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setServices(data.services);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [session]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  return {
    services,
    isLoading,
    error,
  };
};
