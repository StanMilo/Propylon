import { useState, useEffect, useCallback } from "react";
import { fetchBills } from "../services/oireachtasService";
import type { Bill, PaginationInfo } from "../types/oireachtas";

interface UseBillsReturn {
  bills: Bill[];
  allBills: Bill[];
  pagination: PaginationInfo | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  changePage: (page: number) => void;
  changePageSize: (pageSize: number) => void;
  changeBillType: (billType: string) => void;
}

export const useBills = (
  initialPage = 0,
  initialPageSize = 10,
  initialBillType = "all"
): UseBillsReturn => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [allBills, setAllBills] = useState<Bill[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [billType, setBillType] = useState(initialBillType);

  const fetchBillsData = useCallback(
    async (pageNum: number, size: number, type: string, showLoading = true) => {
      try {
        if (showLoading) {
          setLoading(true);
        }
        setError(null);

        const response = await fetchBills(pageNum, size, type);

        setBills(response.data);
        setPagination(response.pagination);

        setAllBills((prev) => {
          const existingKeys = new Set(
            prev.map((bill) => `${bill.bill.billNo}/${bill.bill.billYear}`)
          );
          const newBills = response.data.filter((bill) => {
            const billKey = `${bill.bill.billNo}/${bill.bill.billYear}`;
            return !existingKeys.has(billKey);
          });
          return [...prev, ...newBills];
        });

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch bills");
        console.error("Error fetching bills:", err);
        setLoading(false);
      }
    },
    []
  );

  // Fetch data when filters change
  useEffect(() => {
    fetchBillsData(page, pageSize, billType, true);
  }, [page, pageSize, billType, fetchBillsData]);

  const refetch = () => {
    fetchBillsData(page, pageSize, billType, true);
  };

  const changePage = (newPage: number) => {
    setPage(newPage);
  };

  const changePageSize = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0); // Reset to first page
  };

  const changeBillType = (newBillType: string) => {
    setBillType(newBillType);
    setPage(0); // Reset to first page
  };

  return {
    bills,
    allBills,
    pagination,
    loading,
    error,
    refetch,
    changePage,
    changePageSize,
    changeBillType,
  };
};
