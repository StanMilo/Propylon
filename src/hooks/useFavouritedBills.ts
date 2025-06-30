import { useState, useEffect } from "react";
import { API_BASE_URL } from "../constants/api";
import type { Bill, PaginationInfo } from "../types/oireachtas";

interface UseFavouritedBillsReturn {
  bills: Bill[];
  pagination: PaginationInfo | null;
  loading: boolean;
  error: string | null;
}

export const useFavouritedBills = (
  billKeysString: string,
  page: number = 0,
  pageSize: number = 10
): UseFavouritedBillsReturn => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavouritedBills = async () => {
      if (!billKeysString || billKeysString === "") {
        console.log("No favourited bills to fetch");
        setBills([]);
        setPagination(null);
        return;
      }

      const billKeys = billKeysString
        .split(",")
        .filter((key) => key.trim() !== "");

      if (billKeys.length === 0) {
        console.log("No valid bill keys found");
        setBills([]);
        setPagination(null);
        return;
      }

      console.log("Fetching favourited bills with keys:", billKeys);
      console.log(
        "Request URL:",
        `${API_BASE_URL}/bills/individual?billIds=${billKeys.join(",")}`
      );

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${API_BASE_URL}/bills/individual?billIds=${billKeys.join(",")}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch favourited bills: ${response.status}`
          );
        }

        const data = await response.json();
        console.log("API Response:", data);
        console.log("Total bills returned:", data.results?.length || 0);

        const allFavouritedBills = data.results || [];

        const startIndex = page * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedBills = allFavouritedBills.slice(startIndex, endIndex);

        const totalCount = allFavouritedBills.length;
        const totalPages = Math.ceil(totalCount / pageSize);

        setBills(paginatedBills);
        setPagination({
          page,
          pageSize,
          totalCount,
          totalPages,
          hasNextPage: page < totalPages - 1,
          hasPrevPage: page > 0,
        });
      } catch (err) {
        console.error("Error fetching favourited bills:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch favourited bills"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFavouritedBills();
  }, [billKeysString, page, pageSize]);

  return { bills, pagination, loading, error };
};
